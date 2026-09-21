import { ref, watch, createVNode, defineComponent } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import './index-page.css';
import { ViewList } from '../view-list/view-list.mjs';
import { GlobalToolbar } from '../global-toolbar/global-toolbar.mjs';

"use strict";
const IndexPage = /* @__PURE__ */ defineComponent({
  name: "DevToolIndexPage",
  props: {
    center: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const ns = useNamespace("index-page");
    const rootRef = ref();
    watch(rootRef, (newVal) => {
      props.center.rootElement = newVal;
    });
    return {
      ns,
      rootRef
    };
  },
  render() {
    const {
      state
    } = this.center;
    return createVNode("div", {
      "ref": "rootRef",
      "class": [this.ns.b(), this.ns.is("hidden", !state.isShow)]
    }, [createVNode("div", {
      "class": this.ns.b("header")
    }, [createVNode(GlobalToolbar, {
      "center": this.center
    }, null)]), createVNode("div", {
      "class": this.ns.b("content")
    }, [createVNode(ViewList, {
      "center": this.center
    }, null)])]);
  }
});

export { IndexPage };
