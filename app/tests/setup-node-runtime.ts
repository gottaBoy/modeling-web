// Node 21 added a global navigator, which breaks the environment detection in
// zrender, the renderer behind echarts: it treats a missing navigator as the
// only signal for "running in node", then falls into its browser branch and
// reads window while the module is being imported. These tests render through
// echarts in server mode and through a hand written node renderer, so there is
// no window to find and none intended.
//
// Removing the property restores the signal those libraries were written
// against. It is per test file, and tests that need a navigator stub their own.
delete (globalThis as { navigator?: unknown }).navigator;

export {};
