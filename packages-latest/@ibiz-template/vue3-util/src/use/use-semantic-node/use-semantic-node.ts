import {
  ScriptFactory,
  EditorController,
  IControlController,
  PanelItemController,
  PredefinedAttributes,
} from '@ibiz-template/runtime';
import { IControl, IEditor } from '@ibiz/model-core';
import { useAttrs } from 'vue';

/** 语义化节点class */
export type UseSemanticClassReturn = (
  key: string,
  ...args: unknown[]
) => string | undefined;

/** 语义化节点style */
export type UseSemanticStyleReturn = (
  key: string,
  ...args: unknown[]
) => IData | undefined;

/**
 * 语义化节点
 * @param controller 控制器
 * @returns
 */
export function useSemanticNode(
  controller: IControlController | PanelItemController | EditorController,
): {
  semanticClass: UseSemanticClassReturn;
  semanticStyle: UseSemanticStyleReturn;
} {
  const controlType = (controller.model as IControl).controlType;
  const editorType = (controller.model as IEditor).editorType;

  // class埋点信息，可通过部件注入属性classNames设置，也可通过组件参数classNames设置，格式为字符串或函数，如 { root: 'semantic-mark-root' } 或 { root: (args) => 'semantic-mark-root' }
  let classItems: IData = {};
  const classNameAttr = controller.model.controlAttributes?.find(
    item => item.attrName === PredefinedAttributes.CLASSNAMES,
  );
  if (classNameAttr && classNameAttr.attrValue) {
    if (controlType) {
      // 存在部件类型即为部件
      classItems = ScriptFactory.execSingleLine(classNameAttr.attrValue, {
        ...(controller as IControlController).getEventArgs(),
      }) as IData;
    } else if (editorType) {
      // 存在编辑器类型即为编辑器
      const editor = controller as EditorController;
      classItems = ScriptFactory.execSingleLine(classNameAttr.attrValue, {
        ...editor.ctrl.getEventArgs(),
      }) as IData;
    } else {
      const panelItem = controller as PanelItemController;
      classItems = ScriptFactory.execSingleLine(classNameAttr.attrValue, {
        data: [panelItem.data],
        value: panelItem.data[panelItem.model.id!],
      }) as IData;
    }
  }
  const attrs = useAttrs();
  if (attrs.classNames) {
    classItems = {
      ...classItems,
      ...attrs.classNames,
    };
  }

  /**
   * 解析指定 key 的用户自定义 class：
   * - 未配置：返回 undefined
   * - 字符串：直接返回
   * - 函数：传入 controller 及 args 调用后返回
   */
  const semanticClass: UseSemanticClassReturn = (
    key: string,
    ...args: unknown[]
  ): string | undefined => {
    const value = classItems?.[key];
    if (value === undefined) {
      return undefined;
    }
    if (typeof value === 'string') {
      return value;
    }
    return value(controller, ...args);
  };

  // style埋点信息，可通过部件注入属性styles设置，也可通过组件参数styles设置，格式为字符串或函数，如 { root: 'color:var(--ibiz-color-text-0);font-size: 14px;' } 或 { root: (args) => 'color:var(--ibiz-color-text-0);font-size: 14px;' }
  let styleItems: IData = {};
  const styleAttr = controller.model.controlAttributes?.find(
    item => item.attrName === PredefinedAttributes.STYLES,
  );
  if (styleAttr && styleAttr.attrValue) {
    // 存在部件类型即为部件
    if (controlType) {
      styleItems = ScriptFactory.execSingleLine(styleAttr.attrValue, {
        ...(controller as IControlController).getEventArgs(),
      }) as IData;
    } else if (editorType) {
      // 存在编辑器类型即为编辑器
      const editor = controller as EditorController;
      styleItems = ScriptFactory.execSingleLine(styleAttr.attrValue, {
        ...editor.ctrl.getEventArgs(),
      }) as IData;
    } else {
      const panelItem = controller as PanelItemController;
      styleItems = ScriptFactory.execSingleLine(styleAttr.attrValue, {
        data: [panelItem.data],
        value: panelItem.data[panelItem.model.id!],
      }) as IData;
    }
  }
  if (attrs.styles) {
    styleItems = {
      ...styleItems,
      ...attrs.styles,
    };
  }

  /**
   * 解析指定 key 的用户自定义 style：
   * - 未配置：返回 undefined
   * - 字符串：直接返回
   * - 函数：传入 controller 及 args 调用后返回
   */
  const semanticStyle: UseSemanticStyleReturn = (
    key: string,
    ...args: unknown[]
  ): IData | undefined => {
    const value = styleItems?.[key];
    if (value === undefined) {
      return undefined;
    }
    if (typeof value === 'string') {
      const result = value.split(';').reduce((acc: IData, item) => {
        if (item.trim().length === 0) {
          return acc;
        }
        const [styleKey, styleValue] = item.split(':');
        acc[styleKey.trim()] = styleValue.trim();
        return acc;
      }, {});
      return result;
    }
    return value(controller, ...args);
  };

  return {
    semanticClass,
    semanticStyle,
  };
}
