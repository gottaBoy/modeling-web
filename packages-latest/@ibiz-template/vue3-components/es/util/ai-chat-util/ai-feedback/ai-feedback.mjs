import { isVNode, defineComponent, createVNode, resolveComponent, reactive, onMounted } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import './ai-feedback.css';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const AIFeedback = /* @__PURE__ */ defineComponent({
  name: "IBizAIFeedback",
  props: {
    content: {
      type: String
    },
    modal: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const ns = useNamespace("ai-feedback");
    const feedback = reactive({
      description: "",
      feedbackItems: []
    });
    const FEEDBACK_CATEGORIES = [{
      title: ibiz.i18n.t("util.aiChartUtil.regardingIssue"),
      children: [ibiz.i18n.t("util.aiChartUtil.understandProblem"), ibiz.i18n.t("util.aiChartUtil.forgotContext"), ibiz.i18n.t("util.aiChartUtil.notFollowingRequire")]
    }, {
      title: ibiz.i18n.t("util.aiChartUtil.regardingResponse"),
      children: [ibiz.i18n.t("util.aiChartUtil.incorrectAswer"), ibiz.i18n.t("util.aiChartUtil.logicalConfusion"), ibiz.i18n.t("util.aiChartUtil.poorTimeliness"), ibiz.i18n.t("util.aiChartUtil.poorReadability"), ibiz.i18n.t("util.aiChartUtil.incompleteAnswer"), ibiz.i18n.t("util.aiChartUtil.unprofessional")]
    }, {
      title: ibiz.i18n.t("util.aiChartUtil.report"),
      children: [ibiz.i18n.t("util.aiChartUtil.pornographicVulgar"), ibiz.i18n.t("util.aiChartUtil.politicallySensitive"), ibiz.i18n.t("util.aiChartUtil.illegalCriminal"), ibiz.i18n.t("util.aiChartUtil.discriminationPrejudice"), ibiz.i18n.t("util.aiChartUtil.violationPrivacy"), ibiz.i18n.t("util.aiChartUtil.contentInfringement")]
    }];
    const onInitFeedback = () => {
      feedback.feedbackItems = FEEDBACK_CATEGORIES.map((category) => ({
        title: category.title,
        value: void 0,
        children: [...category.children]
      }));
      if (props.content) {
        const contentArray = props.content.split(";").filter((item) => item.trim());
        if (contentArray.length > 0) {
          const feedbackValues = contentArray.slice(0, FEEDBACK_CATEGORIES.length);
          feedbackValues.forEach((value, index) => {
            feedback.feedbackItems[index].value = value;
          });
          const descriptionParts = contentArray.slice(FEEDBACK_CATEGORIES.length);
          feedback.description = descriptionParts.join(";");
        }
      }
    };
    const onCancel = () => {
      props.modal.dismiss();
    };
    const onConfirm = () => {
      const contentArray = feedback.feedbackItems.map((item) => item.value || "").filter((item) => !!item);
      contentArray.push(feedback.description);
      props.modal.dismiss({
        ok: true,
        data: [{
          feedbackContent: contentArray.join(";")
        }]
      });
    };
    onMounted(() => {
      onInitFeedback();
    });
    return {
      ns,
      feedback,
      onCancel,
      onConfirm
    };
  },
  render() {
    let _slot2, _slot3;
    return createVNode("div", {
      "class": this.ns.b()
    }, [createVNode("div", {
      "class": this.ns.e("header")
    }, [ibiz.i18n.t("util.aiChartUtil.feedback")]), createVNode("div", {
      "class": this.ns.e("content")
    }, [this.feedback.feedbackItems.map((item) => {
      let _slot;
      return createVNode("div", {
        "class": this.ns.e("group")
      }, [createVNode("div", {
        "class": this.ns.em("group", "title")
      }, [item.title]), createVNode(resolveComponent("el-radio-group"), {
        "modelValue": item.value,
        "onUpdate:modelValue": ($event) => item.value = $event,
        "class": this.ns.em("group", "content")
      }, _isSlot(_slot = item.children.map((child, index) => {
        return createVNode(resolveComponent("el-radio"), {
          "key": index,
          "label": child
        }, _isSlot(child) ? child : {
          default: () => [child]
        });
      })) ? _slot : {
        default: () => [_slot]
      })]);
    }), createVNode("div", {
      "class": this.ns.e("description")
    }, [createVNode("div", {
      "class": this.ns.em("description", "title")
    }, [ibiz.i18n.t("util.aiChartUtil.description")]), createVNode(resolveComponent("el-input"), {
      "rows": 3,
      "type": "textarea",
      "modelValue": this.feedback.description,
      "onUpdate:modelValue": ($event) => this.feedback.description = $event,
      "placeholder": ibiz.i18n.t("util.aiChartUtil.placeholder")
    }, null)])]), createVNode("div", {
      "class": this.ns.e("footer")
    }, [createVNode(resolveComponent("el-button"), {
      "onClick": this.onCancel
    }, _isSlot(_slot2 = ibiz.i18n.t("app.cancel")) ? _slot2 : {
      default: () => [_slot2]
    }), createVNode(resolveComponent("el-button"), {
      "type": "primary",
      "onClick": this.onConfirm
    }, _isSlot(_slot3 = ibiz.i18n.t("app.confirm")) ? _slot3 : {
      default: () => [_slot3]
    })])]);
  }
});

export { AIFeedback };
