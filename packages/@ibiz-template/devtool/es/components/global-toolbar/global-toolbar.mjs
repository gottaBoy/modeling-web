import { isVNode, ref, watch, createTextVNode, createVNode, defineComponent } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import './global-toolbar.css';
import '../select/index.mjs';
import DevtoolButton from '../devtool-button/devtool-button.mjs';
import { MessageBox } from '../message-box/message-box.mjs';
import { UserConfigEdit } from '../user-config-edit/user-config-edit.mjs';
import { DevtoolSelect } from '../select/devtool-select/devtool-select.mjs';
import { OptionComponent } from '../select/devtool-select-option/devtool-select-option.mjs';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const GlobalToolbar = /* @__PURE__ */ defineComponent({
  name: "DevToolGlobalToolbar",
  component: [DevtoolSelect, OptionComponent, DevtoolButton, MessageBox, UserConfigEdit],
  props: {
    center: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const ns = useNamespace("global-toolbar");
    const dialog1 = ref(false);
    const result = ref("");
    const changeData = ref(void 0);
    const onConfigEditClick = () => {
      changeData.value = void 0;
      result.value = "";
      dialog1.value = true;
    };
    watch(() => dialog1.value, (newVal, oldVal) => {
      if (newVal === false && oldVal === true) {
        if (result.value === "confirm" && changeData.value) {
          props.center.updateUserConfig(changeData.value);
        }
      }
    });
    const close = () => {
      props.center.triggerVisible(false);
    };
    const logLevels = ref(["TRACE", "DEBUG", "INFO", "WARN", "ERROR", "SILENT"]);
    const logLevel = ref(props.center.config.logLevel);
    const handleLevelChange = (value) => {
      ibiz.log.setLevel(value);
      const tempConfig = {
        logLevel: value
      };
      props.center.updateUserConfig(tempConfig);
    };
    watch(() => props.center.config.logLevel, (newVal, oldVal) => {
      if (newVal !== oldVal) {
        ibiz.log.setLevel(newVal);
      }
    }, {
      immediate: true
    });
    const hasClosed = (type) => {
      result.value = type;
    };
    return {
      ns,
      onConfigEditClick,
      close,
      logLevels,
      logLevel,
      handleLevelChange,
      dialog1,
      hasClosed,
      changeData
    };
  },
  render() {
    let _slot;
    return createVNode("div", {
      "class": [this.ns.b()]
    }, [createVNode("div", {
      "class": this.ns.b("left")
    }, [createTextVNode("\u65E5\u5FD7\u7EA7\u522B\uFF1A"), createVNode(DevtoolSelect, {
      "value": this.logLevel,
      "onChange": (value) => this.handleLevelChange(value),
      "options": this.logLevels
    }, _isSlot(_slot = this.logLevels.map((level) => {
      return createVNode(OptionComponent, {
        "key": level,
        "label": level,
        "value": level
      }, null);
    })) ? _slot : {
      default: () => [_slot]
    })]), createVNode("div", {
      "class": this.ns.b("right")
    }, [createVNode(DevtoolButton, {
      "title": "\u8BBE\u7F6E",
      "onClick": this.onConfigEditClick
    }, {
      default: () => [createVNode("ion-icon", {
        "name": "settings-outline"
      }, null)]
    }), createVNode(DevtoolButton, {
      "title": "\u5173\u95ED",
      "onClick": this.close
    }, {
      default: () => [createVNode("ion-icon", {
        "name": "close-outline"
      }, null)]
    })]), createVNode(MessageBox, {
      "isShowDialog": this.dialog1,
      "onHasClosed": (type) => this.hasClosed(type),
      "mask": true,
      "title": "\u7F16\u8F91\u914D\u7F6E",
      "onChangeDialog": (value) => {
        this.dialog1 = value;
      },
      "showCloseIcon": true
    }, {
      default: () => {
        return createVNode(UserConfigEdit, {
          "userConfig": this.center.userConfig || {},
          "onChange": (data) => {
            this.changeData = data;
          }
        }, null);
      }
    })]);
  }
});

export { GlobalToolbar };
