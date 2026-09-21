'use strict';

var runtime = require('@ibiz-template/runtime');
var vue = require('vue');

"use strict";
function useSemanticNode(controller) {
  var _a, _b;
  const controlType = controller.model.controlType;
  const editorType = controller.model.editorType;
  let classItems = {};
  const classNameAttr = (_a = controller.model.controlAttributes) == null ? void 0 : _a.find(
    (item) => item.attrName === runtime.PredefinedAttributes.CLASSNAMES
  );
  if (classNameAttr && classNameAttr.attrValue) {
    if (controlType) {
      classItems = runtime.ScriptFactory.execSingleLine(classNameAttr.attrValue, {
        ...controller.getEventArgs()
      });
    } else if (editorType) {
      const editor = controller;
      classItems = runtime.ScriptFactory.execSingleLine(classNameAttr.attrValue, {
        ...editor.ctrl.getEventArgs()
      });
    } else {
      const panelItem = controller;
      classItems = runtime.ScriptFactory.execSingleLine(classNameAttr.attrValue, {
        data: [panelItem.data],
        value: panelItem.data[panelItem.model.id]
      });
    }
  }
  const attrs = vue.useAttrs();
  if (attrs.classNames) {
    classItems = {
      ...classItems,
      ...attrs.classNames
    };
  }
  const semanticClass = (key, ...args) => {
    const value = classItems == null ? void 0 : classItems[key];
    if (value === void 0) {
      return void 0;
    }
    if (typeof value === "string") {
      return value;
    }
    return value(controller, ...args);
  };
  let styleItems = {};
  const styleAttr = (_b = controller.model.controlAttributes) == null ? void 0 : _b.find(
    (item) => item.attrName === runtime.PredefinedAttributes.STYLES
  );
  if (styleAttr && styleAttr.attrValue) {
    if (controlType) {
      styleItems = runtime.ScriptFactory.execSingleLine(styleAttr.attrValue, {
        ...controller.getEventArgs()
      });
    } else if (editorType) {
      const editor = controller;
      styleItems = runtime.ScriptFactory.execSingleLine(styleAttr.attrValue, {
        ...editor.ctrl.getEventArgs()
      });
    } else {
      const panelItem = controller;
      styleItems = runtime.ScriptFactory.execSingleLine(styleAttr.attrValue, {
        data: [panelItem.data],
        value: panelItem.data[panelItem.model.id]
      });
    }
  }
  if (attrs.styles) {
    styleItems = {
      ...styleItems,
      ...attrs.styles
    };
  }
  const semanticStyle = (key, ...args) => {
    const value = styleItems == null ? void 0 : styleItems[key];
    if (value === void 0) {
      return void 0;
    }
    if (typeof value === "string") {
      const result = value.split(";").reduce((acc, item) => {
        if (item.trim().length === 0) {
          return acc;
        }
        const [styleKey, styleValue] = item.split(":");
        acc[styleKey.trim()] = styleValue.trim();
        return acc;
      }, {});
      return result;
    }
    return value(controller, ...args);
  };
  return {
    semanticClass,
    semanticStyle
  };
}

exports.useSemanticNode = useSemanticNode;
