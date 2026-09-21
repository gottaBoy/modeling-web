'use strict';

var vue = require('vue');
require('./fullscreen-toolbar.css');
var vue3Util = require('@ibiz-template/vue3-util');
var fullscreenToolbarAlarmClock = require('./fullscreen-toolbar-alarm-clock/fullscreen-toolbar-alarm-clock.cjs');

"use strict";
const IBizFullscreenToolbar = /* @__PURE__ */ vue.defineComponent({
  name: "IBizFullscreenToolbar",
  setup() {
    const ns = vue3Util.useNamespace("fullscreen-toolbar");
    const laserPointerSvg = () => {
      return vue.createVNode("svg", {
        "viewBox": "0 0 16 16",
        "xmlns": "http://www.w3.org/2000/svg",
        "height": "1em",
        "width": "1em",
        "preserveAspectRatio": "xMidYMid meet",
        "focusable": "false"
      }, [vue.createVNode("g", {
        "id": "aoeeditor/laser-pointer",
        "stroke-width": "1",
        "fill-rule": "evenodd"
      }, [vue.createVNode("path", {
        "d": "M8.203 15.947a3 3 0 0 1-.198-5.993l-.069.005.926-1.19H3c-1.543 0-2.461-1.648-1.762-2.945l.075-.129.086-.125.083-.103.098-.093L8.97.097c.42-.3.941.15.755.593l-.04.078-2.483 4h5.75c1.488 0 2.414 1.548 1.813 2.841l-.067.133-.079.13-.066.092-3.351 5.098.002-.115a3 3 0 0 1-3 3zm0-4.8a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6zm-.685-8.785L2.215 6.149l-.024.032c-.436.59-.092 1.416.589 1.564l.11.018.11.006h6.884a.5.5 0 0 1 .442.734l-.047.073-1.174 1.51-.011-.004a3.008 3.008 0 0 1 1.826 1.592l-.001-.003L13.728 7.4l.064-.09c.408-.624-.003-1.456-.73-1.534l-.112-.006H6.304a.5.5 0 0 1-.462-.69l.037-.074 1.64-2.643z",
        "id": "aoe\u5F62\u72B6\u7ED3\u5408"
      }, null)])]);
    };
    const alarmClockSvg = () => {
      return vue.createVNode("svg", {
        "viewBox": "0 0 16 16",
        "xmlns": "http://www.w3.org/2000/svg",
        "height": "1em",
        "width": "1em",
        "preserveAspectRatio": "xMidYMid meet",
        "focusable": "false"
      }, [vue.createVNode("g", {
        "id": "aah\u5DE5\u65F6",
        "stroke-width": "1",
        "fill-rule": "evenodd"
      }, [vue.createVNode("path", {
        "d": "M9.6.2v1.2H8.099v1.427a6.486 6.486 0 0 1 4.27 2.167l.663-.528-.332-.41.933-.756 1.321 1.632-.932.755-.235-.289-.708.565A6.5 6.5 0 1 1 6.9 2.827V1.4H5.4V.2h4.2zM7.5 4a5.3 5.3 0 1 0 0 10.6A5.3 5.3 0 0 0 7.5 4zm.6 1.687v3.45l3.187.001v1.2H6.9v-4.65h1.2z",
        "id": "aah\u5F62\u72B6\u7ED3\u5408"
      }, null)])]);
    };
    const compressArrowsSvg = () => {
      return vue.createVNode("svg", {
        "viewBox": "0 0 16 16",
        "xmlns": "http://www.w3.org/2000/svg",
        "height": "1em",
        "width": "1em",
        "preserveAspectRatio": "xMidYMid meet",
        "focusable": "false"
      }, [vue.createVNode("g", {
        "id": "ahsaction/compress-arrows",
        "stroke-width": "1",
        "fill-rule": "evenodd"
      }, [vue.createVNode("path", {
        "d": "M4.069 5.246L.792 1.815a.6.6 0 1 1 .868-.83l3.204 3.356V2.92a.6.6 0 1 1 1.2 0V5.84l.002.007a.6.6 0 0 1-.601.6H2.543a.6.6 0 0 1 0-1.2h1.526zm6.175 1.01l-.007.002a.599.599 0 0 1-.6-.6V2.737a.6.6 0 1 1 1.2 0v1.526l3.43-3.277a.601.601 0 0 1 .83.868l-3.355 3.204h1.419a.6.6 0 0 1 0 1.2h-2.917zm1.586 4.802l3.276 3.431a.6.6 0 1 1-.868.829l-3.204-3.355v1.419a.6.6 0 1 1-1.2 0v-2.917l-.001-.007a.6.6 0 0 1 .6-.6h2.922a.6.6 0 1 1 0 1.2H11.83zm-6.185-.996a.6.6 0 0 1 .6.6v2.922a.6.6 0 1 1-1.2 0v-1.526l-3.43 3.277a.6.6 0 1 1-.83-.868l3.355-3.204H2.721a.6.6 0 1 1 0-1.2h2.917l.007-.001z",
        "id": "ahs\u5F62\u72B6\u7ED3\u5408"
      }, null)])]);
    };
    const laserPointerCanvas = vue.ref();
    const ctx = vue.ref();
    const isLaserEnabled = vue.ref(false);
    const mouseX = vue.ref(0);
    const mouseY = vue.ref(0);
    let lastX = 0;
    let lastY = 0;
    const dotColor = "#eb4c4a";
    const dotSize = 5;
    const draw = () => {
      ctx.value.globalCompositeOperation = "destination-out";
      ctx.value.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.value.fillRect(0, 0, laserPointerCanvas.value.width, laserPointerCanvas.value.height);
      ctx.value.globalCompositeOperation = "source-over";
      if (isLaserEnabled.value) {
        const dist = Math.sqrt((mouseX.value - lastX) ** 2 + (mouseY.value - lastY) ** 2);
        const count = Math.max(Math.round(dist / 5), 1);
        for (let i = 0; i < count; i++) {
          const ratio = i / count;
          const x = lastX + (mouseX.value - lastX) * ratio;
          const y = lastY + (mouseY.value - lastY) * ratio;
          ctx.value.beginPath();
          ctx.value.arc(x, y, dotSize, 0, Math.PI * 2);
          ctx.value.fillStyle = dotColor;
          ctx.value.fill();
        }
        lastX = mouseX.value;
        lastY = mouseY.value;
      }
      requestAnimationFrame(draw);
    };
    const laserPointerClick = () => {
      isLaserEnabled.value = !isLaserEnabled.value;
    };
    const alarmClockClick = () => {
      const fullscreen = document.getElementById("fullscreen");
      const content = document.createElement("div");
      content.id = "alarm-clock";
      content.style.zIndex = "9999";
      if (fullscreen) {
        fullscreen.appendChild(content);
        const app = vue.createApp(fullscreenToolbarAlarmClock.IBizAlarmClock);
        app.mount(content);
      }
    };
    const clearFullscreenClass = () => {
      if (ibiz.fullscreenUtil.FullscreenClass) {
        const divFull = document.querySelector(".".concat(ibiz.fullscreenUtil.FullscreenClass));
        if (divFull) {
          divFull.classList.toggle(ibiz.fullscreenUtil.FullscreenClass);
        }
      }
    };
    const compressArrowsClick = () => {
      const div = document.getElementById("fullscreen");
      if (div) {
        document.exitFullscreen();
        clearFullscreenClass();
        if (div.parentElement) {
          div.parentElement.removeChild(div);
        }
      }
    };
    const editorRef = vue.ref();
    const handleFullScreenChange = () => {
      if (document.fullscreenElement) {
      } else {
        const div = document.getElementById("fullscreen");
        if (div) {
          clearFullscreenClass();
          if (div.parentElement) {
            div.parentElement.removeChild(div);
          }
        }
      }
    };
    vue.onMounted(() => {
      ctx.value = laserPointerCanvas.value.getContext("2d");
      window.addEventListener("resize", () => {
        laserPointerCanvas.value.width = window.innerWidth;
        laserPointerCanvas.value.height = window.innerHeight;
      });
      laserPointerCanvas.value.addEventListener("mousemove", (event) => {
        mouseX.value = event.clientX;
        mouseY.value = event.clientY;
      });
      document.addEventListener("mousemove", (event) => {
        if (!isLaserEnabled.value) {
          mouseX.value = event.clientX;
          mouseY.value = event.clientY;
          lastX = event.clientX;
          lastY = event.clientY;
        }
      });
      ctx.value.clearRect(0, 0, laserPointerCanvas.value.width, laserPointerCanvas.value.height);
      ctx.value.fillStyle = "lightgray";
      ctx.value.fillRect(0, 0, laserPointerCanvas.value.width, laserPointerCanvas.value.height);
      draw();
      window.dispatchEvent(new Event("resize"));
      document.addEventListener("fullscreenchange", handleFullScreenChange);
    });
    vue.onBeforeUnmount(() => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    });
    return {
      ns,
      laserPointerSvg,
      alarmClockSvg,
      compressArrowsSvg,
      laserPointerClick,
      alarmClockClick,
      compressArrowsClick,
      laserPointerCanvas,
      isLaserEnabled,
      editorRef
    };
  },
  render() {
    return vue.createVNode("div", {
      "class": [this.ns.b()],
      "ref": "editorRef"
    }, [vue.createVNode("div", {
      "class": [this.ns.e("wrapper")]
    }, [vue.createVNode("div", {
      "class": [this.ns.e("wrapper-content")]
    }, [vue.createVNode(vue.resolveComponent("el-tooltip"), {
      "effect": "dark",
      "content": "\u6FC0\u5149\u7B14",
      "placement": "top",
      "offset": 10,
      "teleported": true,
      "append-to": this.editorRef,
      "popper-class": this.ns.e("tooltip"),
      "popper-options": {
        modifiers: [{
          name: "offset",
          options: {
            offset: [0, 20]
          }
        }]
      }
    }, {
      default: () => [vue.createVNode("div", {
        "class": this.ns.e("item"),
        "onClick": () => this.laserPointerClick()
      }, [this.laserPointerSvg()])]
    }), vue.createVNode(vue.resolveComponent("el-tooltip"), {
      "effect": "dark",
      "content": "\u5173\u706F\u8BA1\u65F6",
      "placement": "top",
      "offset": 10,
      "teleported": true,
      "append-to": this.editorRef,
      "popper-class": this.ns.e("tooltip"),
      "popper-options": {
        modifiers: [{
          name: "offset",
          options: {
            offset: [0, 20]
          }
        }]
      }
    }, {
      default: () => [vue.createVNode("div", {
        "class": this.ns.e("item"),
        "onClick": () => this.alarmClockClick()
      }, [this.alarmClockSvg()])]
    }), vue.createVNode("div", {
      "class": this.ns.e("divider")
    }, null), vue.createVNode(vue.resolveComponent("el-tooltip"), {
      "effect": "dark",
      "content": "\u9000\u51FA\u6F14\u793A\u6A21\u5F0F",
      "placement": "top",
      "offset": 10,
      "teleported": true,
      "append-to": this.editorRef,
      "popper-class": this.ns.e("tooltip"),
      "popper-options": {
        modifiers: [{
          name: "offset",
          options: {
            offset: [0, 20]
          }
        }]
      }
    }, {
      default: () => [vue.createVNode("div", {
        "class": this.ns.e("item"),
        "onClick": () => this.compressArrowsClick()
      }, [this.compressArrowsSvg()])]
    })])]), vue.createVNode("div", {
      "class": this.ns.e("canvas")
    }, [vue.createVNode("canvas", {
      "ref": "laserPointerCanvas",
      "style": "background-color: transparent;",
      "class": this.isLaserEnabled ? "cursor" : "nocursor"
    }, null)])]);
  }
});

exports.IBizFullscreenToolbar = IBizFullscreenToolbar;
