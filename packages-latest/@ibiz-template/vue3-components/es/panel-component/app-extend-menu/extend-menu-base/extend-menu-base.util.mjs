import { ref, h, onMounted, onUnmounted } from 'vue';

"use strict";
function useCascaderPopover(props, ns, menuAlign, renderCascaderContent) {
  let hoverCount = 0;
  let closeTimer = null;
  const overlayInstances = /* @__PURE__ */ new Map();
  const activeMenuIdStack = ref([]);
  const rotatedArrowElements = /* @__PURE__ */ new Map();
  const getOverlayNum = () => {
    return overlayInstances.size;
  };
  const getPopoverPlacement = (level) => {
    switch (props.position) {
      case "TOP":
        return level > 0 ? "right-start" : "bottom-start";
      case "BOTTOM":
        return level > 0 ? "right-end" : "top-start";
      case "RIGHT":
        return "left-start";
      case "LEFT":
        return "right-start";
      default:
        return void 0;
    }
  };
  const clearCloseTimer = () => {
    if (closeTimer) {
      clearTimeout(closeTimer);
      closeTimer = null;
    }
  };
  const resetArrowRotation = (ns2, key) => {
    const arrow = rotatedArrowElements.get(key);
    if (!arrow)
      return;
    arrow.classList.remove(ns2.is("rotate-arrow", true));
    rotatedArrowElements.delete(key);
  };
  const rotateArrowIcon = (el, ns2, key) => {
    if (el) {
      el.classList.add(ns2.is("rotate-arrow", true));
      rotatedArrowElements.set(key, el);
    }
  };
  const closePopoverAtLevel = (key) => {
    const overlay = overlayInstances.get(key);
    if (overlay) {
      overlay.dismiss();
      overlayInstances.delete(key);
      resetArrowRotation(ns, key);
    }
  };
  const closeSubsequentPopovers = (currentLevel) => {
    let level = currentLevel;
    while (overlayInstances.get(level + 1)) {
      level++;
    }
    for (let i = level; i >= currentLevel; i--) {
      closePopoverAtLevel(i);
    }
  };
  const closeAllPopovers = () => {
    for (const key of overlayInstances.keys()) {
      closePopoverAtLevel(key);
    }
    overlayInstances.clear();
    activeMenuIdStack.value = [];
    hoverCount = 0;
  };
  const scheduleDelayedClose = () => {
    clearCloseTimer();
    closeTimer = setTimeout(() => {
      if (hoverCount <= 0) {
        closeAllPopovers();
      }
    }, 300);
  };
  const clearAllCascader = () => {
    closeAllPopovers();
    clearCloseTimer();
  };
  const handleMenuItemMouseEnter = (_menu, event) => {
    if (activeMenuIdStack.value.includes(_menu.id))
      return;
    activeMenuIdStack.value.push(_menu.id);
    closeSubsequentPopovers(_menu.level);
    if (_menu.children) {
      openCascaderPopover(_menu, event);
    }
    clearCloseTimer();
  };
  const handleMenuItemMouseLeave = (_menu) => {
    const index = activeMenuIdStack.value.indexOf(_menu.id);
    if (index !== -1) {
      activeMenuIdStack.value.splice(index, 1);
    }
    scheduleDelayedClose();
  };
  const onPopoverMouseEnter = () => {
    hoverCount++;
    clearCloseTimer();
  };
  const onPopoverMouseLeave = (_menu, _event) => {
    hoverCount = Math.max(0, hoverCount - 1);
    scheduleDelayedClose();
  };
  const openCascaderPopover = (menu, evt, opts) => {
    var _a;
    const overlay = ibiz.overlay.createPopover(
      () => h(renderCascaderContent(menu), {
        onMouseenter: onPopoverMouseEnter,
        onMouseleave: onPopoverMouseLeave
      }),
      void 0,
      {
        width: "auto",
        height: "auto",
        noArrow: true,
        placement: getPopoverPlacement(menu.level),
        offsetOpts: 10,
        ...opts,
        modalClass: "".concat(ns.b("cascader-popover"), " ").concat(ns.is(
          menuAlign.value,
          true
        ), " ").concat((opts == null ? void 0 : opts.modalClass) || "")
      }
    );
    overlayInstances.set(menu.level, overlay);
    overlay == null ? void 0 : overlay.present(evt.currentTarget);
    rotateArrowIcon(
      (_a = evt.currentTarget) == null ? void 0 : _a.parentElement,
      ns,
      menu.level
    );
  };
  return {
    getOverlayNum,
    openCascaderPopover,
    clearAllCascader,
    handleMenuItemMouseEnter,
    handleMenuItemMouseLeave
  };
}
function useBorderLayout(menuRef, ns, position, menuAlign, getOverlayNum, renderBorderContent) {
  let overlay;
  const getElementAbsolutePosition = (element) => {
    let x = 0;
    let y = 0;
    let current = element;
    while (current) {
      x += current.offsetLeft;
      y += current.offsetTop;
      current = current.offsetParent;
    }
    return {
      x,
      y,
      width: element.offsetWidth,
      height: element.offsetHeight
    };
  };
  const resolvePopoverPlacement = () => {
    switch (position) {
      case "TOP":
        return "bottom";
      case "BOTTOM":
        return "top";
      case "RIGHT":
        return "left";
      case "LEFT":
        return "right";
      default:
        return void 0;
    }
  };
  let popoverEl;
  const closeBorderPopover = () => {
    overlay == null ? void 0 : overlay.dismiss();
    overlay = null;
    document.removeEventListener("mousemove", handleMouseTrackOut);
    popoverEl = void 0;
  };
  const handleMouseTrackOut = (e) => {
    if (!popoverEl) {
      popoverEl = document.querySelector(
        ".".concat(ns.b("border-popover"))
      );
    }
    const pos = getElementAbsolutePosition(popoverEl);
    const isInside = e.pageX >= pos.x && e.pageX <= pos.x + pos.width && e.pageY >= pos.y && e.pageY <= pos.y + pos.height;
    if (!isInside && getOverlayNum() <= 0) {
      closeBorderPopover();
    }
  };
  const handlePlaceholderMouseEnter = async (evt) => {
    var _a;
    if (overlay)
      return;
    overlay = ibiz.overlay.createPopover(
      () => h(renderBorderContent()),
      void 0,
      {
        width: "auto",
        height: "auto",
        noArrow: true,
        placement: resolvePopoverPlacement(),
        offsetOpts: -1,
        modalClass: "".concat(ns.b("border-popover"), " ").concat(ns.is(menuAlign.value, true))
      }
    );
    const triggerEl = (_a = evt.currentTarget) == null ? void 0 : _a.querySelector(
      ".".concat(ns.be("placehold", "line"))
    );
    await (overlay == null ? void 0 : overlay.present(triggerEl));
    setTimeout(() => {
      document.addEventListener("mousemove", handleMouseTrackOut);
    }, 200);
  };
  let placeholderEl = null;
  let resizeObserver = null;
  let frameLoopId = null;
  const minWidth = 20;
  const minHeight = 20;
  const computeTop = (top, height) => {
    return position === "BOTTOM" ? top + height - minHeight : top;
  };
  const computeLeft = (left, width) => {
    return position === "RIGHT" ? left + width - minWidth : left;
  };
  const computeWidth = (width) => {
    return ["RIGHT", "LEFT"].includes(position) ? minWidth : width;
  };
  const computeHeight = (height) => {
    return ["TOP", "BOTTOM"].includes(position) ? minHeight : height;
  };
  function createFixedPlaceholder(el) {
    const container = document.createElement("div");
    container.classList.add(ns.b("placehold"));
    container.classList.add(ns.is(position.toLowerCase(), !!position));
    const line = document.createElement("div");
    line.classList.add(ns.be("placehold", "line"));
    const arrow = document.createElement("div");
    arrow.classList.add(ns.be("placehold", "arrow"));
    container.appendChild(line);
    container.appendChild(arrow);
    document.body.appendChild(container);
    placeholderEl = container;
    placeholderEl.addEventListener("mouseenter", handlePlaceholderMouseEnter);
    arrow.innerHTML = '\n      <svg xmlns="http://www.w3.org/2000/svg"\n           viewBox="0 0 1024 1024"\n           width="1em"\n           height="1em"\n           fill="currentColor">\n        <path fill="currentColor"\n              d="M340.864 149.312a30.592 30.592 0 0 0 0 42.752L652.736 512 340.864 831.872a30.592 30.592 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z">\n        </path>\n      </svg>\n    ';
    updatePlaceholderPosition(el);
  }
  function updatePlaceholderPosition(el) {
    if (!placeholderEl)
      return;
    const rect = el.getBoundingClientRect();
    placeholderEl.style.top = "".concat(computeTop(rect.top, rect.height), "px");
    placeholderEl.style.left = "".concat(computeLeft(rect.left, rect.width), "px");
    placeholderEl.style.width = "".concat(computeWidth(rect.width), "px");
    placeholderEl.style.height = "".concat(computeHeight(rect.height), "px");
  }
  function startTracking() {
    const el = menuRef.value;
    if (!el)
      return;
    createFixedPlaceholder(el);
    resizeObserver = new ResizeObserver(() => updatePlaceholderPosition(el));
    resizeObserver.observe(el);
    const updateLoop = () => {
      updatePlaceholderPosition(el);
      frameLoopId = requestAnimationFrame(updateLoop);
    };
    frameLoopId = requestAnimationFrame(updateLoop);
  }
  function stopTrackingAndDestroy() {
    if (resizeObserver) {
      const el = menuRef.value;
      if (el)
        resizeObserver.unobserve(el);
      resizeObserver.disconnect();
      resizeObserver = null;
    }
    if (frameLoopId !== null) {
      cancelAnimationFrame(frameLoopId);
      frameLoopId = null;
    }
    if (placeholderEl && placeholderEl.parentNode) {
      placeholderEl.removeEventListener(
        "mouseenter",
        handlePlaceholderMouseEnter
      );
      placeholderEl.parentNode.removeChild(placeholderEl);
      placeholderEl = null;
    }
  }
  onMounted(startTracking);
  onUnmounted(stopTrackingAndDestroy);
  return { closeBorderPopover };
}
function getMenus(items, _parentItem, level = 0) {
  return items.map((item) => {
    var _a;
    const data = {
      ...item,
      value: item.id,
      label: item.caption,
      parentId: _parentItem == null ? void 0 : _parentItem.id,
      level
    };
    if ((_a = item.appMenuItems) == null ? void 0 : _a.length) {
      data.children = getMenus(item.appMenuItems, item, level + 1);
    }
    return data;
  });
}
function findMenuItem(_id, items) {
  let temp;
  if (items) {
    items.some((item) => {
      if (!item.id)
        return true;
      if (item.id === _id) {
        temp = item;
        return true;
      }
      if (item.appMenuItems && item.appMenuItems.length > 0) {
        temp = findMenuItem(_id, item.appMenuItems);
        if (!temp) {
          return false;
        }
        return true;
      }
      return false;
    });
  }
  return temp;
}
function getMenuLayout(layout) {
  if ((layout == null ? void 0 : layout.layout) === "FLEX") {
    const { align, valign } = layout;
    return {
      justifyContent: align,
      alignItems: valign
    };
  }
  return {};
}

export { findMenuItem, getMenuLayout, getMenus, useBorderLayout, useCascaderPopover };
