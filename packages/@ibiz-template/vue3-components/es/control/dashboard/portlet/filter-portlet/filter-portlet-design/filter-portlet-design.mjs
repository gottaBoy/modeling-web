import { isVNode, defineComponent, ref, reactive, createVNode, resolveComponent, createTextVNode, withDirectives, resolveDirective } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import { clone } from '@ibiz-template/core';
import './filter-portlet-design.css';
import { filterPortletByID } from '@ibiz-template/runtime';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const IBizFilterPortletDesign = /* @__PURE__ */ defineComponent({
  name: "IBizFilterPortletDesign",
  props: {
    context: {
      type: Object,
      required: true
    },
    viewParams: {
      type: Object,
      required: true
    },
    filter: {
      type: Object
    },
    items: {
      type: Array,
      default: () => []
    },
    dashboardStyle: {
      type: String
    },
    dismiss: {
      type: Function,
      required: true
    }
  },
  emits: ["lisTSelect", "formChange"],
  setup(props) {
    const ns = useNamespace("filter-portlet-design");
    const loaded = ref(false);
    const loadding = ref(false);
    const formRef = ref();
    const rules = reactive({
      title: [{
        required: true,
        message: ibiz.i18n.t("control.dashboard.filterPortletDesign.ctrlTitleError"),
        trigger: "blur"
      }]
    });
    const formData = reactive({
      title: "",
      selectAll: true,
      items: []
    });
    const condition = ref({});
    const titleMaxLength = 32;
    const model = ref();
    let appPortlets = [];
    let allFilters = [];
    const portletParams = ref({});
    const schemaFields = ref([]);
    const jsonSchemaMap = /* @__PURE__ */ new Map();
    const conditionMap = /* @__PURE__ */ new Map();
    const checkBoxList = ref([]);
    const getFilters = () => {
      let result = [];
      const app = ibiz.hub.getApp(props.context.srfappid);
      appPortlets = app.model.appPortlets || [];
      if (appPortlets.length > 0) {
        result = appPortlets.filter((x) => {
          if (x.control) {
            return x.control.controlType === "PORTLET" && x.control.portletType === "FILTER";
          }
        });
      }
      return result;
    };
    const getJsonSchema = async (appDataEntityId) => {
      if (!appDataEntityId) {
        return;
      }
      if (!jsonSchemaMap.has(appDataEntityId)) {
        loadding.value = true;
        schemaFields.value = await ibiz.util.jsonSchema.getEntitySchemaFields(appDataEntityId, props.context, props.viewParams);
        loadding.value = false;
        jsonSchemaMap.set(appDataEntityId, schemaFields.value);
      }
      schemaFields.value = jsonSchemaMap.get(appDataEntityId);
    };
    const setCheckBox = () => {
      checkBoxList.value = filterPortletByID(model.value.id, props.context, props.items, props.dashboardStyle === "BIREPORTDASHBOARD" || props.dashboardStyle === "BIREPORTDASHBOARD2");
    };
    const init = async () => {
      var _a;
      allFilters = getFilters();
      if (props.items) {
        formData.items = props.items.map((x) => x.id);
      }
      if (props.filter) {
        const item = allFilters.find((x) => x.id === props.filter.model.id);
        if (item) {
          model.value = clone(item.control);
          formData.title = props.filter.config.srftitle;
          portletParams.value = item.portletParams || {};
          const selectAll = props.filter.filterConfig.scope === "all";
          if (!selectAll) {
            formData.selectAll = false;
            formData.items = ((_a = props.filter.filterConfig.scopedata) == null ? void 0 : _a.split(",")) || [];
          }
          condition.value = props.filter.searchConds;
        }
      }
      if (!model.value && allFilters.length > 0) {
        model.value = clone(allFilters[0].control);
        formData.title = model.value.title || "";
        portletParams.value = allFilters[0].portletParams || {};
      }
      if (model.value) {
        await getJsonSchema(model.value.appDataEntityId);
        setCheckBox();
      }
      loaded.value = true;
    };
    init();
    const calcConfig = () => {
      const result = {};
      if (formData.selectAll) {
        result.scope = "all";
      } else {
        result.scope = "custom";
        const selectKeys = [];
        checkBoxList.value.forEach((item) => {
          if (formData.items.includes(item.id)) {
            selectKeys.push(item.id);
          }
        });
        result.scopedata = selectKeys.join(",");
      }
      if (Object.keys(portletParams.value).length > 0) {
        result.scopetag = portletParams.value.filtergroup;
      }
      return result;
    };
    const handleListItemClick = (item, data, disabled) => {
      if (disabled) {
        return;
      }
      model.value = clone(item);
      formData.title = item.title || "";
      portletParams.value = data;
      getJsonSchema(item.appDataEntityId);
      if (conditionMap.has(item.appDataEntityId)) {
        condition.value = conditionMap.get(item.appDataEntityId);
      } else {
        condition.value = {};
      }
      setCheckBox();
    };
    const handleConditionChange = (group) => {
      condition.value = group;
      conditionMap.set(model.value.appDataEntityId, group);
    };
    const onSwitchChange = (value) => {
      if (value && props.items) {
        formData.items = props.items.map((x) => x.id);
      }
    };
    const handleCancel = () => {
      props.dismiss({
        ok: false
      });
    };
    const handleConfirm = () => {
      if (!formRef.value) {
        return;
      }
      formRef.value.validate((valid) => {
        if (valid) {
          const config = calcConfig();
          const data = {
            config,
            model: Object.assign(model.value, {
              title: formData.title
            }),
            searchconds: condition.value
          };
          props.dismiss({
            ok: true,
            data: [data]
          });
        }
      });
    };
    const renderNoData = () => {
      return createVNode(resolveComponent("iBizNoData"), {
        "text": ibiz.i18n.t("control.common.currentNoData")
      }, null);
    };
    const renderLeftList = () => {
      if (!allFilters.length) {
        return renderNoData();
      }
      return createVNode("ul", {
        "class": [ns.b("left-list")]
      }, [allFilters.map((portlet) => {
        var _a;
        const item = portlet.control;
        const data = portlet.portletParams || {};
        let disabled = false;
        if (props.filter && props.filter.id !== item.id) {
          disabled = true;
        }
        return createVNode("li", {
          "class": [ns.be("left-list", "item"), ns.is("disabled", disabled), ns.is("actvie", item.id === ((_a = model.value) == null ? void 0 : _a.id))],
          "title": item.title,
          "onClick": () => handleListItemClick(item, data, disabled)
        }, [item.title]);
      })]);
    };
    const renderCheckBoxGroup = () => {
      let _slot;
      if (!checkBoxList.value) {
        return;
      }
      const onlyAdd = checkBoxList.value.length > 0 && formData.items.length === 1;
      return createVNode(resolveComponent("el-checkbox-group"), {
        "class": [ns.b("checkbox"), ns.is("only-add", onlyAdd)],
        "modelValue": formData.items,
        "onUpdate:modelValue": ($event) => formData.items = $event,
        "disabled": formData.selectAll
      }, _isSlot(_slot = checkBoxList.value.map((item) => {
        return createVNode(resolveComponent("el-checkbox"), {
          "label": item.id,
          "disabled": onlyAdd && formData.items.includes(item.id)
        }, {
          default: () => [item.title]
        });
      })) ? _slot : {
        default: () => [_slot]
      });
    };
    const renderForm = () => {
      if (!model.value) {
        return null;
      }
      return createVNode(resolveComponent("el-form"), {
        "ref": "formRef",
        "model": formData,
        "rules": rules,
        "label-width": "auto",
        "class": ns.b("right-form")
      }, {
        default: () => [createVNode(resolveComponent("el-form-item"), {
          "required": true,
          "label": ibiz.i18n.t("control.dashboard.filterPortletDesign.ctrlTitle"),
          "prop": "title"
        }, {
          default: () => [createVNode(resolveComponent("el-input"), {
            "modelValue": formData.title,
            "onUpdate:modelValue": ($event) => formData.title = $event,
            "maxlength": titleMaxLength,
            "placeholder": ibiz.i18n.t("control.dashboard.filterPortletDesign.ctrlPlaceholder")
          }, {
            suffix: () => createVNode("div", null, [formData.title.length, createTextVNode(" / "), titleMaxLength])
          })]
        }), createVNode(resolveComponent("el-form-item"), {
          "class": ns.be("right-form", "checks"),
          "label": ibiz.i18n.t("control.dashboard.filterPortletDesign.checkTitle"),
          "required": true,
          "props": "items"
        }, {
          default: () => [createVNode(resolveComponent("el-switch"), {
            "title": ibiz.i18n.t("control.dashboard.filterPortletDesign.selectAll"),
            "modelValue": formData.selectAll,
            "onUpdate:modelValue": ($event) => formData.selectAll = $event,
            "onChange": onSwitchChange
          }, null), renderCheckBoxGroup()]
        })]
      });
    };
    const renderRightContent = () => {
      return createVNode("div", {
        "class": [ns.b("right-content")]
      }, [createVNode("div", {
        "class": [ns.be("right-content", "title")]
      }, [ibiz.i18n.t("control.dashboard.filterPortletDesign.baseSet")]), renderForm()]);
    };
    const renderLeftContent = () => {
      const title = props.filter ? ibiz.i18n.t("app.edit") : ibiz.i18n.t("app.newlyBuild");
      return createVNode("div", {
        "class": [ns.b("left-content")]
      }, [createVNode("div", {
        "class": ns.be("left-content", "title")
      }, ["".concat(title, " ").concat(ibiz.i18n.t("control.dashboard.filterPortletDesign.filterTitle"))]), renderLeftList()]);
    };
    const renderCondition = () => {
      return withDirectives(createVNode(resolveComponent("iBizCustomFilterCondition"), {
        "class": ns.b("condition"),
        "context": props.context,
        "params": props.viewParams,
        "value": condition.value,
        "schemaFields": schemaFields.value,
        "onChange": handleConditionChange
      }, null), [[resolveDirective("loading"), loadding.value]]);
    };
    const renderFooter = () => {
      let _slot2, _slot3;
      return createVNode("div", {
        "class": ns.b("footer")
      }, [createVNode(resolveComponent("el-button"), {
        "onClick": handleCancel,
        "title": ibiz.i18n.t("app.cancel")
      }, _isSlot(_slot2 = ibiz.i18n.t("app.cancel")) ? _slot2 : {
        default: () => [_slot2]
      }), createVNode(resolveComponent("el-button"), {
        "onClick": handleConfirm,
        "title": ibiz.i18n.t("app.confirm")
      }, _isSlot(_slot3 = ibiz.i18n.t("app.confirm")) ? _slot3 : {
        default: () => [_slot3]
      })]);
    };
    return {
      ns,
      loaded,
      formRef,
      renderRightContent,
      renderLeftContent,
      renderCondition,
      renderFooter
    };
  },
  render() {
    if (!this.loaded) {
      return;
    }
    return createVNode("div", {
      "class": [this.ns.b()]
    }, [createVNode("div", {
      "class": [this.ns.e("layout-left")]
    }, [this.renderLeftContent()]), createVNode("div", {
      "class": [this.ns.e("layout-right")]
    }, [this.renderRightContent(), this.renderCondition(), this.renderFooter()])]);
  }
});

export { IBizFilterPortletDesign };
