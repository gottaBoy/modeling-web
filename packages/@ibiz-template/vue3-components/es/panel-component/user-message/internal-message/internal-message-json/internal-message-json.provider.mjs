import { InternalMessageJSON } from './internal-message-json.mjs';
import '../common/index.mjs';
import { InternalMessageDefaultProvider } from '../common/internal-message-default/internal-message-default.provider.mjs';

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class InternalMessageJSONtProvider extends InternalMessageDefaultProvider {
  constructor() {
    super(...arguments);
    __publicField(this, "component", InternalMessageJSON);
  }
  async onClick(message, event) {
    const result = await super.onClick(message, event);
    if (!result && message.content_type === "JSON" && message.content) {
      const json = JSON.parse(message.content);
      if (json.redirecturl) {
        this.openRedirectView(message, json.redirecturl);
        return true;
      }
    }
    return true;
  }
}

export { InternalMessageJSONtProvider };
