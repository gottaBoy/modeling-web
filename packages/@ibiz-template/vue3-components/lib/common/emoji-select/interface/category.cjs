'use strict';

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class Category {
  constructor(name, icon, text) {
    __publicField(this, "name");
    __publicField(this, "icon");
    __publicField(this, "text");
    this.name = name;
    this.icon = icon;
    this.text = text;
  }
  get label() {
    return this.name;
  }
}

exports.Category = Category;
