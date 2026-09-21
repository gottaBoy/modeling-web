import { ref, watch, watchEffect, onUnmounted } from 'vue';
import { defaultNamespace } from '../../node_modules/.pnpm/@ibiz-template_core@0.7.38-alpha.57_axios@1.7.7_lodash-es@4.17.21_qs@6.13.0_qx-util@0.4.8_ramda@0.29.1/node_modules/@ibiz-template/core/out/utils/namespace/namespace.mjs';

"use strict";
function useAppDRTab(c, controlRef, counterData) {
  let resizeObserver = null;
  let lastDrTabWidth = 0;
  const visibleItems = ref([]);
  const moreItems = ref([]);
  const calcDomWidth = (text, style = {}) => {
    let domWidth = 0;
    const dom = document.createElement("span");
    const sonDom = document.createElement("span");
    sonDom.innerHTML = text;
    Object.assign(sonDom.style, style);
    Object.assign(dom.style, {
      width: "auto",
      position: "absolute",
      left: "-9999px"
    });
    dom.appendChild(sonDom);
    document.body.appendChild(dom);
    domWidth = dom.offsetWidth;
    document.body.removeChild(dom);
    return domWidth;
  };
  function updateVisibleItems() {
    const { drTabPages, showMore } = c.state;
    if (!controlRef.value || !showMore || drTabPages.length === 0) {
      visibleItems.value = drTabPages;
      moreItems.value = [];
      return;
    }
    const totalDom = controlRef.value.$el;
    const totalWidth = totalDom.offsetWidth;
    let accumulatedWidth = 0;
    visibleItems.value = [];
    moreItems.value = [];
    drTabPages.forEach((tab, index) => {
      if (!tab.hidden) {
        const caption = tab.caption || "";
        const counterNum = tab.counterId ? counterData[tab.counterId] : void 0;
        const fontSize = "var(--".concat(defaultNamespace, "-font-size-regular)");
        if (counterNum != null && !(!counterNum && counterNum !== 0) && !(tab.counterMode === 1 && counterNum <= 0)) {
          const counterStyle = {
            marginLeft: "var(--".concat(defaultNamespace, "-spacing-tight)"),
            minWidth: "20px",
            fontSize
          };
          const counterWidth = calcDomWidth(String(counterNum), counterStyle);
          accumulatedWidth += counterWidth;
        }
        const tabStyle = {
          padding: index === 0 ? "0 var(--".concat(defaultNamespace, "-spacing-base) 0 0") : "0 var(--".concat(defaultNamespace, "-spacing-base)"),
          fontSize
        };
        const tabWidth = calcDomWidth(caption, tabStyle);
        accumulatedWidth += tabWidth;
        const moreStyle = {
          padding: "0 0 0 var(--".concat(defaultNamespace, "-spacing-base)"),
          fontSize
        };
        const moreWidth = calcDomWidth(
          "".concat(ibiz.i18n.t("app.more"), " ^"),
          moreStyle
        );
        if (accumulatedWidth + moreWidth > totalWidth) {
          moreItems.value.push(tab);
        } else {
          visibleItems.value.push(tab);
        }
      }
    });
  }
  const calcDrTabWidth = () => {
    if (window.ResizeObserver) {
      const drTabDom = controlRef.value.$el;
      if (drTabDom) {
        resizeObserver = new ResizeObserver((entries) => {
          const width = entries[0].contentRect.width;
          if (width !== lastDrTabWidth) {
            updateVisibleItems();
            lastDrTabWidth = width;
          }
        });
        resizeObserver.observe(drTabDom);
      }
    }
  };
  watch(
    () => c.state.drTabPages,
    () => {
      updateVisibleItems();
    },
    { deep: true }
  );
  const stop = watchEffect(() => {
    if (controlRef.value) {
      calcDrTabWidth();
    }
  });
  onUnmounted(() => {
    if (resizeObserver) {
      resizeObserver.disconnect();
    }
    stop();
  });
  return { visibleItems, moreItems };
}

export { useAppDRTab };
