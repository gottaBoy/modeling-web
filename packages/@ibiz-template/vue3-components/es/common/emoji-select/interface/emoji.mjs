"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class Emoji {
  constructor(data, category, aliases) {
    __publicField(this, "data");
    __publicField(this, "category");
    __publicField(this, "aliases");
    this.data = data;
    this.category = category;
    this.aliases = aliases;
  }
}

export { Emoji };
