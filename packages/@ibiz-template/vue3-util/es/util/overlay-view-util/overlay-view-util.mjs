import { resolveComponent, h } from 'vue';

"use strict";
function createOverlayView(props) {
  return (modal) => {
    const viewShell = resolveComponent("IBizViewShell");
    return h(viewShell, {
      ...props,
      modal
    });
  };
}
async function openViewModal(props, opts) {
  const overlay = ibiz.overlay.createModal(
    createOverlayView(props),
    void 0,
    opts
  );
  overlay.present();
  const result = await overlay.onWillDismiss();
  return result || { ok: false };
}
async function openViewFloatWindow(props, opts) {
  const overlay = ibiz.overlay.createFloatWindow(
    createOverlayView(props),
    void 0,
    opts
  );
  overlay.present();
  const result = await overlay.onWillDismiss();
  return result || { ok: false };
}
async function openViewDrawer(props, opts) {
  const overlay = ibiz.overlay.createDrawer(
    createOverlayView(props),
    void 0,
    opts
  );
  await overlay.present();
  const result = await overlay.onWillDismiss();
  return result || { ok: false };
}
async function openViewPopover(event, props, opts) {
  const overlay = ibiz.overlay.createPopover(
    createOverlayView(props),
    void 0,
    opts
  );
  overlay.present(event.target);
  const result = await overlay.onWillDismiss();
  return result || { ok: false };
}
const PlacementMap = {
  DRAWER_LEFT: "left",
  DRAWER_RIGHT: "right",
  DRAWER_TOP: "top",
  DRAWER_BOTTOM: "bottom"
};
function getDrawerPlacement(openMode) {
  return PlacementMap[openMode] || "right";
}

export { createOverlayView, getDrawerPlacement, openViewDrawer, openViewFloatWindow, openViewModal, openViewPopover };
