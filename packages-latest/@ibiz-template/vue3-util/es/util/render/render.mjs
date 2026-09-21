import { isNil } from 'ramda';
import { PredefinedControlRender } from '@ibiz-template/runtime';

"use strict";
function renderString(value) {
  if (isNil(value)) {
    return "";
  }
  if (typeof value === "string") {
    return value;
  }
  if (typeof value === "object") {
    return JSON.stringify(value);
  }
  try {
    const str = value.toString();
    return str;
  } catch (error) {
    ibiz.log.error(value, ibiz.i18n.t("vue3Util.util.convertString"), error);
  }
  return "";
}
const hasEmptyPanelRenderer = (c) => {
  const controlRenders = c == null ? void 0 : c.model.controlRenders;
  if (!controlRenders || controlRenders.length === 0) {
    return false;
  }
  return !!controlRenders.find(
    (item) => item.id === PredefinedControlRender.EMPTYPANEL
  );
};

export { hasEmptyPanelRenderer, renderString };
