import { defineComponent, h, resolveComponent } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import { PanelItemController } from '@ibiz-template/runtime';
import './data-import-shell.css';

"use strict";
const DataImportShell = /* @__PURE__ */ defineComponent({
  name: "IBizDataImportShell",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    controller: {
      type: PanelItemController,
      required: true
    }
  },
  setup(prop) {
    const ns = useNamespace("data-import-shell");
    const c = prop.controller;
    const onDismiss = () => {
      c.panel.view.closeView();
    };
    return {
      ns,
      c,
      onDismiss
    };
  },
  render() {
    const {
      deDataImport,
      appDataEntity
    } = this.c.panel.view.state;
    const classNames = [this.ns.b(), this.ns.m(this.modelData.id), ...this.controller.containerClass];
    const importComponentName = deDataImport.enableCustomized ? "DataImport2" : "DataImport";
    return h(resolveComponent(importComponentName), {
      dismiss: this.onDismiss,
      dataImport: deDataImport,
      appDataEntity,
      context: this.c.panel.context,
      params: this.c.panel.params,
      class: classNames
    });
  }
});

export { DataImportShell };
