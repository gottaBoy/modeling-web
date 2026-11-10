import assert from 'node:assert/strict';

function validToken(token) {
  assert.ok(typeof token === 'string' && token.trim() && !/[\x00-\x20\x7f]/.test(token),
    'Native model roundtrip requires a valid private session token');
  return token;
}

export async function readNativeBrowserToken(page) {
  let token;
  try {
    token = await page.evaluate(async () => {
      const core = await window.System.import('@ibiz-template/core');
      return core.getToken();
    });
  } catch {
    throw new Error('Native model roundtrip could not read the authenticated browser session');
  }
  return validToken(token);
}

// Credentials and cleanup state never become part of the serializable report.
export function nativeFieldRoundtrip({
  request, entry, basePath, fieldId, applicationId, readToken, credentials,
}) {
  const origin = new URL(entry).origin;
  assert.ok(basePath.startsWith(`/api/${applicationId}/`) && !/[?#]/.test(basePath));
  assert.match(fieldId, /^[A-Za-z0-9-]+$/);
  const url = suffix => new URL(`${basePath}${suffix}`, origin).href;
  let restoreTarget;
  let saved = false;
  const send = async (method, endpoint, options, phase) => {
    let result;
    try {
      const response = await request[method](endpoint, options);
      const status = response.status();
      result = { status, data: status === 200 ? await response.json() : undefined };
    } catch {
      // Playwright transport errors can include Authorization and request bodies.
      throw new Error(`Native model ${phase} transport or JSON decoding failed`);
    }
    if (result.status !== 200) {
      const error = new Error(`Native model ${phase} must return HTTP 200`);
      error.httpStatus = result.status;
      throw error;
    }
    return result.data;
  };
  const login = async () => {
    const data = await send('post', new URL(`/api/${applicationId}/v7/login`, origin).href,
      { data: credentials }, 'fresh session login');
    return validToken(data?.token);
  };
  const fields = async token => {
    const rows = await send('post', url('/fetchdefault'), {
      headers: { Authorization: `Bearer ${token}` }, data: {},
    }, 'field read');
    assert.ok(Array.isArray(rows), 'Native model field response must be an array');
    const matches = rows.filter(field => field.psdefieldid === fieldId);
    assert.equal(matches.length, 1, 'Native model field target must exist exactly once');
    return matches[0];
  };
  const write = async (token, value) => {
    const row = await send('put', url(`/${fieldId}`), {
      headers: { Authorization: `Bearer ${token}` }, data: { ordervalue: value },
    }, 'field write');
    assert.ok(row?.ordervalue === value, 'Native model field write must return the requested value');
  };
  return {
    async save() {
      assert.ok(!restoreTarget, 'Native model roundtrip may save only once');
      const token = validToken(await readToken());
      const original = await fields(token);
      assert.ok(Number.isSafeInteger(original.ordervalue),
        'Native model field order must be a safe integer before mutation');
      const originalValue = original.ordervalue;
      const changedValue = originalValue === 11 ? 12 : 11;
      // A failed/timeout response can still have applied the write.
      restoreTarget = { token, originalValue, changedValue };
      await write(token, changedValue);
      assert.ok((await fields(token)).ordervalue === changedValue,
        'Native model field save must persist the changed value');
      saved = true;
      return { fieldId, field: original.psdefieldname, originalValue, changedValue,
        transport: 'authenticated-http', browserEditorInteractionVerified: false };
    },
    async readback() {
      assert.ok(saved, 'Native model field save did not complete');
      const token = await login();
      restoreTarget.token = token;
      const row = await fields(token);
      assert.ok(row.ordervalue === restoreTarget.changedValue,
        'Fresh native session must see the saved value');
      return { fieldId, savedValue: row.ordervalue, originalValue: restoreTarget.originalValue };
    },
    async restore() {
      if (!restoreTarget) return { needed: false, restored: false };
      const { originalValue } = restoreTarget;
      const restore = async () => {
        await write(restoreTarget.token, originalValue);
        assert.ok((await fields(restoreTarget.token)).ordervalue === originalValue,
          'Native model field cleanup must persist the original value');
      };
      try {
        await restore();
      } catch (error) {
        if (error.httpStatus !== 401) throw error;
        restoreTarget.token = await login();
        await restore();
      }
      restoreTarget = undefined;
      return { needed: true, restored: true, fieldId, originalValue };
    },
  };
}
