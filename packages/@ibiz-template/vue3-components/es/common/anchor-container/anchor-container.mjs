import { defineComponent, ref, watch, onUnmounted, createVNode } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import { IBizAnchorBarList } from './anchor-bar-list/anchor-bar-list.mjs';
import './anchor-container.css';

"use strict";
const IBizAnchorContainer = /* @__PURE__ */ defineComponent({
  name: "IBizAnchorContainer",
  components: {
    IBizAnchorBarList
  },
  props: {
    // 锚点列表，项值格式为{id:xx,text:xx}
    anchorList: {
      type: Array,
      default: []
    },
    // 锚点目标元素
    anchorTargetEle: {
      type: Object,
      required: true
    },
    // 锚点导航栏配置
    navBarConfig: {
      type: Object,
      default: () => {
      }
    }
  },
  setup(props) {
    const ns = useNamespace("anchor-container");
    const timer = ref();
    const isClick = ref(false);
    const selected = ref("");
    const {
      navBarPos = "USER",
      navBarSysCss,
      navBarWidth,
      navBarStyle,
      navbarHeight
    } = props.navBarConfig;
    const onSelect = (key) => {
      clearInterval(timer.value);
      const el = document.querySelector("#".concat(key));
      isClick.value = true;
      selected.value = key;
      if (el) {
        el.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
        timer.value = setTimeout(() => {
          isClick.value = false;
        }, 1e3);
      }
    };
    const handleScroll = () => {
      if (isClick.value)
        return;
      let closestDistance = Infinity;
      let tempSelect = "";
      for (let i = 0; i < props.anchorList.length; i++) {
        const childElement = document.querySelector("#".concat(props.anchorList[i].id));
        if (childElement) {
          const rect = childElement.getBoundingClientRect();
          const parentRect = props.anchorTargetEle.$el.getBoundingClientRect();
          const relativeTop = rect.top - parentRect.top;
          const isInView = rect.bottom > parentRect.top && rect.top < parentRect.bottom;
          if (isInView && relativeTop >= 0 && relativeTop < closestDistance) {
            closestDistance = relativeTop;
            tempSelect = props.anchorList[i].id;
          }
        }
      }
      selected.value = tempSelect;
    };
    const style = () => {
      const tempStyle = {};
      if (navBarWidth) {
        if (navBarWidth === 1) {
          Object.assign(tempStyle, {
            width: "auto"
          });
        } else {
          Object.assign(tempStyle, {
            width: "".concat(navBarWidth, "px"),
            minWidth: "".concat(navBarWidth, "px"),
            maxWidth: "".concat(navBarWidth, "px")
          });
        }
      }
      if (navbarHeight) {
        if (navbarHeight === 1) {
          Object.assign(tempStyle, {
            height: "auto"
          });
        } else {
          Object.assign(tempStyle, {
            height: "".concat(navbarHeight, "px"),
            minHeight: "".concat(navbarHeight, "px")
          });
        }
      }
      return tempStyle;
    };
    const target = watch(() => {
      if (props.anchorTargetEle && props.anchorTargetEle.$el) {
        return props.anchorTargetEle.$el;
      }
      return null;
    }, (newVal) => {
      if (newVal) {
        newVal.addEventListener("scroll", handleScroll);
        newVal.classList.add("no-slider");
        target();
      }
    }, {
      immediate: true
    });
    onUnmounted(() => {
      var _a, _b;
      if ((_a = props.anchorTargetEle) == null ? void 0 : _a.$el) {
        ((_b = props.anchorTargetEle) == null ? void 0 : _b.$el).removeEventListener("scroll", handleScroll);
      }
    });
    return {
      ns,
      selected,
      navBarPos,
      navBarStyle,
      navBarSysCss,
      style,
      onSelect
    };
  },
  render() {
    var _a, _b;
    return createVNode("div", {
      "class": [this.ns.b(), this.ns.is("".concat(this.navBarPos.toLowerCase()), true), this.ns.is("broadside", this.navBarPos !== "USER" && this.navBarPos !== "USER2"), this.ns.is("usermode", this.navBarPos === "USER" || this.navBarPos === "USER2"), this.ns.b("".concat(this.navBarStyle || "default").toLowerCase())]
    }, [createVNode("div", {
      "class": [this.ns.e("anchor"), this.navBarSysCss],
      "style": this.style()
    }, [createVNode(IBizAnchorBarList, {
      "anchorList": this.anchorList,
      "navBarStyle": this.navBarStyle,
      "navBarPos": this.navBarPos,
      "selected": this.selected,
      "onSelect": this.onSelect
    }, null)]), createVNode("div", {
      "class": this.ns.e("content")
    }, [(_b = (_a = this.$slots).default) == null ? void 0 : _b.call(_a)])]);
  }
});

export { IBizAnchorContainer };
