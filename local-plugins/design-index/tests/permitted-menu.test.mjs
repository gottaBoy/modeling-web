import assert from 'node:assert/strict';
import test from 'node:test';
import { permittedMenu } from '../src/model.ts';

function passingMenu() {
  const raw = {
    id: 'menuitem2',
    hidden: false,
    disabled: false,
  };
  return {
    appMenu: {
      appMenuItems: [raw],
    },
    state: {
      menuItemsState: {
        menuitem2: { visible: true, permitted: true },
      },
    },
    raw,
  };
}

test('permitted menu accepts the declared item through a reactive proxy', () => {
  const menu = passingMenu();
  const proxy = new Proxy(menu.raw, {});
  assert.equal(menu.raw === proxy, false);
  assert.equal(permittedMenu(menu, proxy), true);
  assert.equal(permittedMenu(menu, { ...menu.raw }), true);
});

test('permitted menu keeps the hidden, disabled and unpermitted checks', () => {
  for (const mutation of [
    item => { item.hidden = true; },
    item => { item.disabled = true; },
    item => { item.id = ''; },
  ]) {
    const menu = passingMenu();
    mutation(menu.raw);
    assert.equal(permittedMenu(menu, new Proxy(menu.raw, {})), false);
  }

  for (const state of [
    { visible: false, permitted: true },
    { visible: true, permitted: false },
    { visible: true, permitted: undefined },
    undefined,
  ]) {
    const menu = passingMenu();
    menu.state.menuItemsState.menuitem2 = state;
    assert.equal(permittedMenu(menu, menu.raw), false);
  }
});

test('permitted menu fails closed for missing or ambiguous declarations', () => {
  const missing = passingMenu();
  missing.appMenu.appMenuItems = [];
  assert.equal(permittedMenu(missing, missing.raw), false);

  const duplicate = passingMenu();
  duplicate.appMenu.appMenuItems = [duplicate.raw, { ...duplicate.raw }];
  assert.equal(permittedMenu(duplicate, duplicate.raw), false);
});
