'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
require('./carousel-card.css');

"use strict";
const IBizCarouselCard = /* @__PURE__ */ vue.defineComponent({
  name: "IBizCarouselCard",
  props: {
    swipeData: {
      type: Object,
      required: true
    },
    isAuto: {
      type: Boolean,
      default: true
    },
    timeSpan: {
      type: Number,
      default: 3e3
    }
  },
  setup(props) {
    const ns = vue3Util.useNamespace("carousel-card");
    const nowIndex = vue.ref(3);
    const mainDom = vue.ref();
    const listDom = vue.ref();
    const gap = 0;
    const imgWidth = vue.ref(600);
    const containerWidth = vue.ref(0);
    const diffLen = vue.computed(() => {
      return (containerWidth.value - imgWidth.value - gap * 2) / 2;
    });
    let timer = null;
    const imgDoms = document.getElementsByClassName("swiper-slide-card");
    const scale = 0.8;
    const aniTime = 500;
    const resImgArr = vue.computed(() => {
      if (props.swipeData.length > 2) {
        return [...props.swipeData.slice(-2), ...props.swipeData, ...props.swipeData.slice(0, 2)];
      }
      return [...props.swipeData];
    });
    const setScale = () => {
      for (let i = 0; i < imgDoms.length; i++) {
        if (props.swipeData.length === 2) {
          imgDoms[0].style.left = "".concat(containerWidth.value / 4 - imgWidth.value / 2, "px");
          imgDoms[1].style.left = "".concat(containerWidth.value / 4 * 3 - imgWidth.value / 2, "px");
        } else if (props.swipeData.length === 1) {
          imgDoms[i].style.left = "".concat(containerWidth.value / 2 - imgWidth.value / 2, "px");
        } else {
          imgDoms[i].style.left = "".concat((i - 1) * (imgWidth.value + gap), "px");
        }
        if (i === nowIndex.value - 1) {
          imgDoms[i].style.transform = "scale(1)";
        } else {
          imgDoms[i].style.transform = "scale(".concat(scale, ")");
        }
      }
    };
    const nextSlider = (anitime) => {
      if (props.swipeData.length === 2) {
        nowIndex.value = nowIndex.value ? 0 : 1;
        setScale();
      } else if (props.swipeData.length === 1) {
      } else {
        if (nowIndex.value >= 2) {
          mainDom.value.style.transition = "left ".concat(anitime / 1e3, "s");
          mainDom.value.style.left = "".concat(parseInt(mainDom.value.style.left, 10) - (gap + imgWidth.value), "px");
        }
        if (nowIndex.value === props.swipeData.length + 1) {
          nowIndex.value = props.swipeData.length + 2;
          setScale();
          setTimeout(() => {
            nowIndex.value = 2;
            setScale();
            mainDom.value.style.transitionProperty = "none";
            mainDom.value.style.left = "".concat(-(imgWidth.value - diffLen.value), "px");
          }, anitime);
        } else {
          nowIndex.value++;
          setScale();
        }
      }
    };
    const prevSlider = (anitime) => {
      if (props.swipeData.length === 2) {
        nowIndex.value = nowIndex.value ? 0 : 1;
        setScale();
      } else if (props.swipeData.length === 1) {
      } else {
        nowIndex.value--;
        mainDom.value.style.transition = "left ".concat(anitime / 1e3, "s");
        mainDom.value.style.left = "".concat(parseInt(mainDom.value.style.left, 10) + (gap + imgWidth.value), "px");
        if (nowIndex.value === 1) {
          setScale();
          setTimeout(() => {
            nowIndex.value = props.swipeData.length + 1;
            setScale();
            mainDom.value.style.transitionProperty = "none";
            mainDom.value.style.left = "".concat(-(parseInt(imgDoms[nowIndex.value].style.left, 10) - diffLen.value - gap), "px");
          }, anitime);
        } else {
          setScale();
        }
      }
    };
    const startAutoplay = () => {
      timer = window.setInterval(() => nextSlider(aniTime), props.timeSpan);
    };
    const stopAutoplay = () => {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    };
    setScale();
    vue.onMounted(() => {
      if (props.isAuto) {
        startAutoplay();
      }
    });
    vue.onBeforeUnmount(() => {
      stopAutoplay();
    });
    vue.nextTick(() => {
      containerWidth.value = listDom.value.clientWidth;
      imgWidth.value = imgDoms[0].clientWidth;
      if (mainDom.value) {
        mainDom.value.style.left = "".concat(-(2 * imgWidth.value + gap - diffLen.value), "px");
        mainDom.value.style.width = "".concat((props.swipeData.length + 2) * (imgWidth.value + gap / 2), "px");
      }
      setScale();
    });
    const btnClick = (pos) => {
      if (pos === "left") {
        prevSlider(aniTime);
      } else if (pos === "right") {
        nextSlider(aniTime);
      }
    };
    const dotClick = (targetIndex) => {
      nowIndex.value = targetIndex + 2 + 1;
      if (nowIndex.value === props.swipeData.length + 2) {
        nowIndex.value = 2;
      }
      mainDom.value.style.transition = "left ".concat(aniTime / 1e3, "s");
      mainDom.value.style.left = "".concat(-((nowIndex.value - 1) * imgWidth.value + gap - diffLen.value), "px");
      setScale();
    };
    return {
      ns,
      btnClick,
      mainDom,
      listDom,
      imgWidth,
      resImgArr,
      dotClick,
      nowIndex
    };
  },
  render() {
    const renderPic = (item) => {
      if (item.cssClass) {
        if (item.cssClass.indexOf("fa-") !== -1) {
          return vue.createVNode("i", {
            "class": [item.cssClas, "swiper-slide-card"]
          }, null);
        }
        return vue.createVNode("ion-icon", {
          "class": "swiper-slide-card",
          "name": item.cssClass
        }, null);
      }
      if (item.imgUrl) {
        return vue.createVNode("img", {
          "class": "swiper-slide-card",
          "style": "width: ".concat(this.imgWidth, "px"),
          "alt": item.name,
          "src": item.imgUrl
        }, null);
      }
    };
    let newIndex = this.nowIndex;
    if (this.nowIndex < this.swipeData.length) {
      newIndex = this.nowIndex + this.swipeData.length;
    }
    return vue.createVNode("div", {
      "class": this.ns.b()
    }, [vue.createVNode("div", {
      "class": this.ns.e("swiper-list"),
      "ref": "listDom"
    }, [vue.createVNode("div", {
      "class": this.ns.e("swiper-main"),
      "ref": "mainDom"
    }, [this.resImgArr.map((item) => {
      return renderPic(item);
    })]), vue.createVNode("div", {
      "id": "prev-card",
      "class": this.ns.e("leftBtn"),
      "style": "width:".concat(this.imgWidth, "px"),
      "onClick": () => this.btnClick("left")
    }, null), vue.createVNode("div", {
      "id": "next-card",
      "class": this.ns.e("rightBtn"),
      "style": "width:".concat(this.imgWidth, "px"),
      "onClick": () => this.btnClick("right")
    }, null)]), vue.createVNode("div", {
      "class": this.ns.e("dot")
    }, [this.swipeData.map((_item, index) => {
      return vue.createVNode("div", {
        "class": [this.ns.e("dot-item"), index === newIndex - 3 ? "isActive" : ""],
        "onClick": () => this.dotClick(index)
      }, null);
    })])]);
  }
});

exports.IBizCarouselCard = IBizCarouselCard;
