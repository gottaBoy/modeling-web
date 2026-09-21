'use strict';

var vue = require('vue');

"use strict";
function isElement(element, nodeName) {
  return !!(element && element.nodeType === 1 && element.nodeName === nodeName);
}
function getMermaidSvg(element) {
  let current = element;
  while (current) {
    if (current.classList.contains("cherry-previewer")) {
      return null;
    }
    const parent = current.parentElement;
    if (isElement(current, "svg") && parent && parent.dataset.type === "mermaid") {
      return current;
    }
    current = current.parentElement;
  }
  return null;
}
function svgToBase64(svgElement) {
  const clonedSvg = svgElement.cloneNode(true);
  const width = svgElement.width.baseVal.value || svgElement.clientWidth;
  const height = svgElement.height.baseVal.value || svgElement.clientHeight;
  clonedSvg.setAttribute("width", width);
  clonedSvg.setAttribute("height", height);
  clonedSvg.style.backgroundColor = "white";
  const svgString = new XMLSerializer().serializeToString(clonedSvg);
  const base64 = btoa(unescape(encodeURIComponent(svgString)));
  return "data:image/svg+xml;base64,".concat(base64);
}
function useImgPreviewRender(ns) {
  const imgPreviewUrl = vue.ref("");
  const imgPreviewUrlList = vue.ref([]);
  const imgPreviewRef = vue.ref();
  const isImgPreview = vue.ref(false);
  let mdPreviewerDom = null;
  const openImgPreview = async (url) => {
    var _a;
    isImgPreview.value = true;
    imgPreviewUrl.value = url;
    imgPreviewUrlList.value = [url];
    await vue.nextTick();
    if (imgPreviewRef.value) {
      const {
        container
      } = imgPreviewRef.value.$refs;
      if (container) {
        (_a = container.children[0]) == null ? void 0 : _a.click();
      }
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === "Escape" || event.keyCode === 27) {
      event.stopPropagation();
      event.preventDefault();
      imgPreviewUrlList.value = [];
      isImgPreview.value = false;
      removeKeydownListener();
    }
  };
  const addKeydownListener = async () => {
    var _a;
    await vue.nextTick();
    const container = (_a = imgPreviewRef.value) == null ? void 0 : _a.$refs.container;
    if (!container)
      return;
    const imgViewerWrapper = container.querySelector(".el-image-viewer__wrapper");
    imgViewerWrapper == null ? void 0 : imgViewerWrapper.addEventListener("keydown", handleKeyPress);
  };
  const removeKeydownListener = () => {
    var _a;
    const container = (_a = imgPreviewRef.value) == null ? void 0 : _a.$refs.container;
    if (!container)
      return;
    const imgViewerWrapper = container.querySelector(".el-image-viewer__wrapper");
    imgViewerWrapper == null ? void 0 : imgViewerWrapper.removeEventListener("keydown", handleKeyPress);
  };
  const handlePreviewerImgClick = (event) => {
    const target = event == null ? void 0 : event.target;
    if (isElement(target, "IMG") && target) {
      openImgPreview(target.src);
      return;
    }
    const mermaidSvg = getMermaidSvg(target);
    if (mermaidSvg) {
      openImgPreview(svgToBase64(mermaidSvg));
    }
  };
  const onPreviewClose = () => {
    imgPreviewUrlList.value = [];
    isImgPreview.value = false;
  };
  const renderImgPreview = () => {
    return vue.createVNode(vue.resolveComponent("el-image"), {
      "class": ns.e("img-preview"),
      "ref": imgPreviewRef,
      "zoom-rate": 1.1,
      "src": imgPreviewUrl.value,
      "preview-src-list": imgPreviewUrlList.value,
      "hide-on-click-modal": true,
      "onShow": addKeydownListener,
      "onClose": onPreviewClose,
      "fit": "cover"
    }, null);
  };
  const onMDEditorCreated = (mdeditor) => {
    var _a, _b;
    mdPreviewerDom = ((_b = (_a = mdeditor == null ? void 0 : mdeditor.previewer) == null ? void 0 : _a.previewerBubble) == null ? void 0 : _b.previewerDom) || null;
    mdPreviewerDom == null ? void 0 : mdPreviewerDom.addEventListener("click", handlePreviewerImgClick);
  };
  vue.onBeforeUnmount(() => {
    if (mdPreviewerDom) {
      mdPreviewerDom.removeEventListener("click", handlePreviewerImgClick);
      mdPreviewerDom = null;
    }
    removeKeydownListener();
  });
  return {
    isImgPreview,
    renderImgPreview,
    onMDEditorCreated
  };
}

exports.useImgPreviewRender = useImgPreviewRender;
