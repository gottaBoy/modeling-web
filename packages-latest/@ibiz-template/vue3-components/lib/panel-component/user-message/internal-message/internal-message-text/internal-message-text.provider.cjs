'use strict';

var internalMessageText = require('./internal-message-text.cjs');
require('../common/index.cjs');
var internalMessageDefault_provider = require('../common/internal-message-default/internal-message-default.provider.cjs');

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class InternalMessageTextProvider extends internalMessageDefault_provider.InternalMessageDefaultProvider {
  constructor() {
    super(...arguments);
    __publicField(this, "component", internalMessageText.InternalMessageText);
  }
}

exports.InternalMessageTextProvider = InternalMessageTextProvider;
