// Node 21 added a global navigator, which breaks the environment detection in
// zrender, the renderer behind echarts: it treats a missing navigator as the
// only signal for "running in node", then falls into its browser branch and
// reads window while the module is being imported. These tests render through
// echarts in server mode and through a hand written node renderer, so there is
// no window to find and none intended.
//
// Node 21+ exposes navigator as a configurable accessor. `delete` alone can
// leave the accessor visible, so replace it with an explicit undefined value.
// Tests that need a navigator stub can redefine this property locally.
Object.defineProperty(globalThis, 'navigator', {
  configurable: true,
  enumerable: false,
  value: undefined,
  writable: true,
});

export {};
