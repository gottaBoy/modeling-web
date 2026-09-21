'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var qxUtil = require('qx-util');
require('./cropping.css');

"use strict";
const IBizCropping = /* @__PURE__ */ vue.defineComponent({
  name: "IBizCropping",
  props: {
    // 传递一个文件对象进来
    img: {
      type: Object
    },
    // 未传递img时，使用传递的url获取图片
    url: {
      type: String
    },
    // 截取区域宽度
    cropareaWidth: {
      type: Number,
      default: 400
    },
    // 截取区域高度
    cropareaHeight: {
      type: Number,
      default: 200
    }
  },
  emits: ["change"],
  setup(props, {
    emit
  }) {
    const ns = vue3Util.useNamespace("cropping");
    const scaleNumber = vue.ref(1);
    const allowMove = vue.ref(false);
    const imgRef = vue.ref();
    const imgMovePosition = vue.ref({
      x: 0,
      // 鼠标X轴移动距离
      y: 0,
      // 鼠标Y轴移动距离
      tx: 0,
      // 图片X轴已有偏移量
      ty: 0
      // 图片Y轴已有偏移量
    });
    const uuid = qxUtil.createUUID();
    const cropImgUrl = vue.computed(() => {
      var _a;
      if ((_a = props.img) == null ? void 0 : _a.raw) {
        return URL.createObjectURL(props.img.raw);
      }
      if (props.url) {
        return props.url;
      }
      return "";
    });
    const onReduce = () => {
      if (scaleNumber.value > 1) {
        scaleNumber.value = (scaleNumber.value * 10 - 1) / 10;
      }
    };
    const onAdd = () => {
      if (scaleNumber.value < 3) {
        scaleNumber.value = (scaleNumber.value * 10 + 1) / 10;
      }
    };
    const onMouseDown = (e) => {
      const x = e.offsetX;
      const y = e.offsetY;
      imgMovePosition.value.x = x;
      imgMovePosition.value.y = y;
      allowMove.value = true;
    };
    const onMouseMove = (e) => {
      if (!allowMove.value || !imgRef.value) {
        return;
      }
      const x = e.offsetX;
      const y = e.offsetY;
      const croparea = document.getElementById(uuid);
      if (!croparea)
        return;
      const {
        left: cropLeft,
        top: cropTop
      } = croparea.getBoundingClientRect();
      const {
        left: imgLeft,
        top: imgTop,
        width: imgWidth,
        height: imgHeight
      } = imgRef.value.getBoundingClientRect();
      let moveX = false;
      let moveY = false;
      if (imgWidth > props.cropareaWidth) {
        moveX = true;
      }
      if (imgHeight > props.cropareaHeight) {
        moveY = true;
      }
      const spaceX = x - imgMovePosition.value.x;
      const spaceY = y - imgMovePosition.value.y;
      if (moveX && imgLeft + spaceX < cropLeft && imgLeft + imgWidth + spaceX > cropLeft + props.cropareaWidth) {
        imgMovePosition.value.tx += spaceX;
      }
      if (moveY && imgTop + spaceY < cropTop && imgTop + imgHeight + spaceY > cropTop + props.cropareaHeight) {
        imgMovePosition.value.ty += spaceY;
      }
      imgMovePosition.value.x = x;
      imgMovePosition.value.y = y;
    };
    const onMouseUp = () => {
      allowMove.value = false;
    };
    const onMouseLeave = () => {
      allowMove.value = false;
    };
    const style = vue.computed(() => {
      const imgStyle = {
        maxWidth: "".concat(props.cropareaWidth, "px"),
        maxHeight: "".concat(props.cropareaHeight, "px"),
        objectFit: "contain",
        transform: "translate(calc(".concat(imgMovePosition.value.tx, "px - 50%),calc(").concat(imgMovePosition.value.ty, "px - 50%)) scale(").concat(scaleNumber.value, ")")
      };
      return imgStyle;
    });
    const onWheel = async (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (e.deltaY > 0) {
        onReduce();
      } else {
        onAdd();
      }
      const croparea = document.getElementById(uuid);
      if (!croparea)
        return;
      await vue.nextTick();
      const {
        left: cropLeft,
        top: cropTop
      } = croparea.getBoundingClientRect();
      const {
        left: imgLeft,
        top: imgTop,
        width: imgWidth,
        height: imgHeight
      } = imgRef.value.getBoundingClientRect();
      const distanceX = imgLeft - cropLeft;
      const distanceY = imgTop - cropTop;
      if (imgWidth > props.cropareaWidth) {
        if (imgLeft > cropLeft) {
          imgMovePosition.value.tx -= distanceX;
        }
        if (imgLeft + imgWidth < cropLeft + props.cropareaWidth) {
          imgMovePosition.value.tx += cropLeft + props.cropareaWidth - imgLeft - imgWidth;
        }
      } else {
        imgMovePosition.value.tx = 0;
      }
      if (imgHeight > props.cropareaHeight) {
        if (imgTop > cropTop) {
          imgMovePosition.value.ty -= distanceY;
        }
        if (imgTop + imgHeight < cropTop + props.cropareaHeight) {
          imgMovePosition.value.ty += cropTop + props.cropareaHeight - imgTop - imgHeight;
        }
      } else {
        imgMovePosition.value.ty = 0;
      }
    };
    const onCancel = () => {
      emit("change", "");
    };
    const onConfirm = async () => {
      let cropDataUrl = "";
      const croparea = document.getElementById(uuid);
      if (croparea && imgRef.value) {
        const {
          left: cropLeft,
          top: cropTop
        } = croparea.getBoundingClientRect();
        const {
          left: imgLeft,
          top: imgTop,
          width: imgWidth,
          height: imgHeight
        } = imgRef.value.getBoundingClientRect();
        const distanceX = imgLeft - cropLeft;
        const distanceY = imgTop - cropTop;
        const cropcanvas = await ibiz.util.html2canvas.getCanvas(imgRef.value, {
          x: -distanceX,
          // 指定截取区域的左上角 x 坐标
          y: -distanceY,
          // 指定截取区域的左上角 y 坐标
          width: props.cropareaWidth,
          // 指定截取区域的宽度
          height: props.cropareaHeight
          // 指定截取区域的高度
        });
        const ctx = cropcanvas.getContext("2d");
        const imageData = ctx.getImageData(0, 0, cropcanvas.width, cropcanvas.height);
        const data = imageData.data;
        const width = cropcanvas.width;
        const height = cropcanvas.height;
        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            const index = (y * width + x) * 4;
            if (x < distanceX || x > imgWidth + distanceX - 2 || y < distanceY || y > imgHeight + distanceY - 2) {
              data[index + 3] = 0;
            }
          }
        }
        ctx.putImageData(imageData, 0, 0);
        cropDataUrl = cropcanvas.toDataURL("image/png");
      }
      emit("change", cropDataUrl);
    };
    return {
      ns,
      cropImgUrl,
      scaleNumber,
      style,
      uuid,
      imgRef,
      onReduce,
      onAdd,
      onMouseDown,
      onMouseMove,
      onMouseUp,
      onMouseLeave,
      onCancel,
      onConfirm,
      onWheel
    };
  },
  render() {
    return vue.createVNode("div", {
      "class": this.ns.b()
    }, [vue.createVNode("div", {
      "class": this.ns.e("content")
    }, [vue.createVNode("div", {
      "class": this.ns.em("content", "crop")
    }, [vue.createVNode("div", {
      "id": this.uuid,
      "class": this.ns.em("content", "croparea"),
      "style": {
        height: "".concat(this.cropareaHeight, "px"),
        width: "".concat(this.cropareaWidth, "px")
      },
      "onMousedown": this.onMouseDown,
      "onMousemove": this.onMouseMove,
      "onMouseup": this.onMouseUp,
      "onMouseleave": this.onMouseLeave,
      "onWheel": this.onWheel
    }, null), vue.createVNode("img", {
      "style": this.style,
      "ref": "imgRef",
      "class": this.ns.em("content", "img"),
      "src": this.cropImgUrl,
      "alt": ""
    }, null)]), vue.createVNode("div", {
      "class": this.ns.em("content", "scale-slider")
    }, [vue.createVNode("ion-icon", {
      "class": this.ns.em("content", "scale-icon"),
      "name": "remove-outline",
      "onClick": this.onReduce
    }, null), vue.createVNode(vue.resolveComponent("el-slider"), {
      "modelValue": this.scaleNumber,
      "onUpdate:modelValue": ($event) => this.scaleNumber = $event,
      "max": 3,
      "min": 1,
      "step": 0.1
    }, null), vue.createVNode("ion-icon", {
      "class": this.ns.em("content", "scale-icon"),
      "name": "add-outline",
      "onClick": this.onAdd
    }, null)])]), vue.createVNode("div", {
      "class": this.ns.e("footer")
    }, [vue.createVNode("div", {
      "class": this.ns.em("footer", "cancel"),
      "onClick": this.onCancel
    }, [ibiz.i18n.t("editor.common.cancel")]), vue.createVNode("div", {
      "class": this.ns.em("footer", "confirm"),
      "onClick": this.onConfirm
    }, [ibiz.i18n.t("editor.common.confirm")])])]);
  }
});

exports.IBizCropping = IBizCropping;
