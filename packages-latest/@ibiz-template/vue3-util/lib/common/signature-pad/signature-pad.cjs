'use strict';

var vue = require('vue');
var lodashEs = require('lodash-es');
require('../../use/index.cjs');
var signature_pad = require('./util/signature_pad.cjs');
require('./signature-pad.css');
var namespace = require('../../use/namespace/namespace.cjs');

"use strict";
const IBizSignaturePad = /* @__PURE__ */ vue.defineComponent({
  name: "IBizSignaturePad",
  props: {
    options: {
      type: Object
    }
  },
  setup(props) {
    const ns = namespace.useNamespace("signature-pad");
    const signaturePadRef = vue.ref();
    const canvasRef = vue.ref();
    const signaturePad = vue.ref();
    const getSignatureOptions = () => {
      const _options = {};
      if (props.options) {
        const {
          dotsize,
          minwidth,
          maxwidth,
          pencolor,
          velocityfilterweight,
          compositeoperation,
          mindistance,
          backgroundcolor,
          throttle,
          canvascontextoptions
        } = props.options;
        if (dotsize) {
          Object.assign(_options, {
            dotSize: Number(dotsize)
          });
        }
        if (minwidth) {
          Object.assign(_options, {
            minWidth: Number(minwidth)
          });
        }
        if (maxwidth) {
          Object.assign(_options, {
            maxWidth: Number(maxwidth)
          });
        }
        if (velocityfilterweight) {
          Object.assign(_options, {
            velocityFilterWeight: Number(velocityfilterweight)
          });
        }
        if (mindistance) {
          Object.assign(_options, {
            minDistance: Number(mindistance)
          });
        }
        if (throttle) {
          Object.assign(_options, {
            throttle: Number(throttle)
          });
        }
        if (pencolor) {
          Object.assign(_options, {
            penColor: String(pencolor)
          });
        }
        if (compositeoperation) {
          Object.assign(_options, {
            compositeOperation: String(compositeoperation)
          });
        }
        if (backgroundcolor) {
          Object.assign(_options, {
            backgroundColor: String(backgroundcolor)
          });
        }
        if (canvascontextoptions) {
          let canvasContextOptions = canvascontextoptions;
          if (lodashEs.isString(canvascontextoptions)) {
            try {
              canvasContextOptions = JSON.parse(canvascontextoptions);
            } catch (error) {
              ibiz.log.error(error);
              canvasContextOptions = void 0;
            }
          }
          Object.assign(_options, {
            canvasContextOptions: {
              ...canvasContextOptions
            }
          });
        }
      }
      return _options;
    };
    const preventScroll = (_e) => {
      _e.preventDefault();
    };
    const initSignaturePad = (_callback) => {
      vue.nextTick(() => {
        const canvas = canvasRef.value;
        const signatures = signaturePadRef.value;
        if (!canvas)
          return;
        const dpr = window.devicePixelRatio || 1;
        const rect = signatures.getBoundingClientRect();
        const canvasWidth = rect.width < 300 ? 300 : rect.width;
        const canvasHeight = rect.height < 150 ? 150 : rect.height;
        canvas.width = canvasWidth * dpr;
        canvas.height = canvasHeight * dpr;
        canvas.style.width = "".concat(canvasWidth, "px");
        canvas.style.height = "".concat(canvasHeight, "px");
        signaturePad.value = new signature_pad.default(canvas, {
          ...getSignatureOptions()
        });
        const ctx = canvas.getContext("2d");
        ctx.scale(dpr, dpr);
        canvas.addEventListener("touchstart", preventScroll, {
          passive: false
        });
        canvas.addEventListener("touchmove", preventScroll, {
          passive: false
        });
        _callback == null ? void 0 : _callback();
      });
    };
    const updateSignaturePad = (_callback) => initSignaturePad(_callback);
    const handleResize = () => {
      if (signaturePad.value) {
        signaturePad.value.off();
        updateSignaturePad();
      }
    };
    vue.onMounted(() => {
      initSignaturePad();
      window.addEventListener("resize", handleResize);
    });
    vue.onUnmounted(() => {
      window.removeEventListener("resize", handleResize);
    });
    return {
      ns,
      canvasRef,
      signaturePadRef,
      signaturePad,
      updateSignaturePad
    };
  },
  render() {
    return vue.createVNode("div", {
      "class": this.ns.b(),
      "ref": "signaturePadRef"
    }, [vue.createVNode("div", {
      "class": this.ns.e("container")
    }, [vue.createVNode("canvas", {
      "ref": "canvasRef"
    }, null)])]);
  }
});

exports.IBizSignaturePad = IBizSignaturePad;
