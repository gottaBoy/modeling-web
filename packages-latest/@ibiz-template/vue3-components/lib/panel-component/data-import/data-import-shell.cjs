'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var runtime = require('@ibiz-template/runtime');
require('./data-import-shell.css');

"use strict";
const DataImportShell = /* @__PURE__ */ vue.defineComponent({
  name: "IBizDataImportShell",
  props: {
    /**
     * @description 数据导入壳模型数据
     */
    modelData: {
      type: Object,
      required: true
    },
    /**
     * @description 数据导入壳控制器
     */
    controller: {
      type: runtime.PanelItemController,
      required: true
    }
  },
  setup(prop) {
    const ns = vue3Util.useNamespace("data-import-shell");
    const c = prop.controller;
    const {
      semanticClass,
      semanticStyle
    } = vue3Util.useSemanticNode(c);
    const onDismiss = () => {
      c.panel.view.closeView();
    };
    return {
      ns,
      c,
      onDismiss,
      semanticClass,
      semanticStyle
    };
  },
  render() {
    const {
      deDataImport,
      appDataEntity
    } = this.c.panel.view.state;
    const classNames = [this.ns.b(), this.ns.m(this.modelData.id), this.semanticClass("root"), ...this.controller.containerClass];
    const importComponentName = deDataImport.enableCustomized ? "DataImport2" : "DataImport";
    return vue.h(vue.resolveComponent(importComponentName), {
      dismiss: this.onDismiss,
      dataImport: deDataImport,
      appDataEntity,
      context: this.c.panel.context,
      params: this.c.panel.params,
      class: classNames,
      style: this.semanticStyle("root")
    });
  }
});

exports.DataImportShell = DataImportShell;
