import { describe, expect, it } from 'vitest';
import {
  classifyRuntimeEvents,
  hasRecoveredWorkspaceCounterAuthentication,
  isKnownNonBlockingEvent,
} from '../scripts/deployment-smoke.mjs';

const counterUrl =
  'http://127.0.0.1:32003/api/ibizmodeling__modeldesign/work_items/count_my_todo';
const refreshUrl =
  'http://127.0.0.1:32003/api/ibizmodeling__modeldesign/uaa/refresh_token/token';

function response(status, method, url) {
  return { type: 'api-response', status, method, url };
}

describe('deployment smoke runtime policy', () => {
  it('recovers workspace counter auth only after refresh and same-request retry', () => {
    const failed = response(401, 'POST', counterUrl);
    const responses = [
      failed,
      response(200, 'GET', refreshUrl),
      response(200, 'POST', counterUrl),
    ];

    expect(hasRecoveredWorkspaceCounterAuthentication(failed, responses)).toBe(
      true,
    );
    expect(
      hasRecoveredWorkspaceCounterAuthentication(failed, [
        failed,
        response(200, 'POST', counterUrl),
      ]),
    ).toBe(false);
    expect(
      hasRecoveredWorkspaceCounterAuthentication(failed, [
        failed,
        response(200, 'GET', refreshUrl),
        response(200, 'GET', counterUrl),
      ]),
    ).toBe(false);
  });

  it('does not hide a workspace counter console event without exact 401 evidence', () => {
    const consoleEvent = {
      type: 'console',
      message: 'Failed to load resource: the server responded with a status of 500 ()',
      url: counterUrl,
    };
    expect(isKnownNonBlockingEvent(consoleEvent, [])).toBe(false);
    expect(classifyRuntimeEvents([consoleEvent], []).unexpected).toHaveLength(1);
  });

  it('keeps unrelated console diagnostics unexpected', () => {
    const event = {
      type: 'console',
      message: '[EN_US]语言未支持',
      url: 'http://127.0.0.1:32003/modeldesign/',
    };
    const summary = classifyRuntimeEvents([event], []);
    expect(summary.unexpected).toHaveLength(1);
    expect(summary.recovered).toHaveLength(0);
    expect(summary.knownNonBlocking).toHaveLength(0);
  });

  it('reports recovered API and matching 401 console separately from raw events', () => {
    const failed = response(401, 'POST', counterUrl);
    const consoleEvent = {
      type: 'console',
      message: 'Failed to load resource: the server responded with a status of 401 ()',
      url: counterUrl,
    };
    const summary = classifyRuntimeEvents(
      [failed, consoleEvent],
      [failed, response(200, 'GET', refreshUrl), response(200, 'POST', counterUrl)],
    );
    expect(summary.recovered).toHaveLength(2);
    expect(summary.unexpected).toHaveLength(0);
  });
});
