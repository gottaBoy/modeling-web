import { clone, reject, isNil } from 'ramda';
import { getAppIndexViewName, getIndexBreadcrumb } from './nav-breadcrumb.util.mjs';

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class NavBreadcrumbService {
  constructor(navMode, context) {
    this.navMode = navMode;
    this.context = context;
    /**
     * @description 面包屑堆栈
     * @private
     * @type {BreadcrumbMsg[]}
     * @memberof NavBreadcrumbService
     */
    __publicField(this, "chache", []);
  }
  /**
   * @description 添加缓存项
   * @param {BreadcrumbMsg} item
   * @memberof NavBreadcrumbService
   */
  add(item) {
    this.chache.push(item);
    this.chache = this.chache.filter((x) => !x.isEmbed && !x.isModal);
    if (this.navMode === "store") {
      localStorage.setItem("breadcrumb", JSON.stringify(this.chache));
    }
  }
  /**
   * @description 删除缓存项
   * @param {string} fullPath
   * @return {*}  {BreadcrumbMsg[]}
   * @memberof NavBreadcrumbService
   */
  remove(fullPath) {
    const index = this.chache.findIndex((x) => x.fullPath === fullPath);
    if (index !== -1) {
      this.chache.splice(index, 1);
    }
    return clone(this.chache);
  }
  /**
   * @description 删除当前项之后缓存数据
   * @param {string} fullPath
   * @return {*}  {BreadcrumbMsg[]}
   * @memberof NavBreadcrumbService
   */
  removeAfter(fullPath) {
    if (this.chache.length === 0) {
      return [];
    }
    const index = this.chache.findIndex((x) => x.fullPath === fullPath);
    if (index !== -1) {
      const result = this.chache.splice(index + 1, this.chache.length);
      if (this.navMode === "store") {
        localStorage.setItem("breadcrumb", JSON.stringify(this.chache));
      }
      return result;
    }
    return [];
  }
  /**
   * @description 更新缓存数据
   * @param {BreadcrumbMsg} item
   * @memberof NavBreadcrumbService
   */
  update(item) {
    if (!this.chache.length && this.navMode === "store") {
      const result = localStorage.getItem("breadcrumb");
      if (result) {
        this.chache = JSON.parse(result);
      }
    }
    const index = this.chache.findIndex(
      (x) => x.fullPath && x.fullPath === item.fullPath || x.viewName.toLowerCase() === item.viewName.toLowerCase()
    );
    if (index !== -1) {
      Object.assign(this.chache[index], reject(isNil, item));
      this.chache = this.chache.filter((x) => !x.isEmbed && !x.isModal);
      if (this.navMode === "store") {
        localStorage.setItem("breadcrumb", JSON.stringify(this.chache));
      }
    }
  }
  /**
   * @description 获取缓存数据项
   * @param {IData} data
   * @return {*}  {(BreadcrumbMsg | undefined)}
   * @memberof NavBreadcrumbService
   */
  getItem(data) {
    const { viewName = "", fullPath = "" } = data;
    const indexViewName = getAppIndexViewName(this.context);
    if (viewName === indexViewName) {
      return getIndexBreadcrumb(this.context);
    }
    const item = this.chache.find(
      (x) => fullPath && x.fullPath === fullPath || viewName && x.viewName.toLowerCase() === viewName.toLowerCase()
    );
    if (item) {
      return clone(item);
    }
  }
  /**
   * @description 获取缓存数据
   * @return {*}  {BreadcrumbMsg[]}
   * @memberof NavBreadcrumbService
   */
  getChache() {
    if (this.navMode === "store") {
      const result = localStorage.getItem("breadcrumb");
      if (result) {
        return JSON.parse(result);
      }
      return [];
    }
    if (this.navMode === "router") {
      return clone(this.chache.filter((x) => !x.isEmbed));
    }
    return clone(this.chache);
  }
  /**
   * @description 设置缓存数据
   * @param {BreadcrumbMsg[]} items
   * @memberof NavBreadcrumbService
   */
  setChache(items) {
    this.chache = clone(items);
    this.chache = this.chache.filter((x) => !x.isEmbed && !x.isModal);
    if (this.navMode === "store") {
      localStorage.setItem("breadcrumb", JSON.stringify(this.chache));
    }
  }
}

export { NavBreadcrumbService };
