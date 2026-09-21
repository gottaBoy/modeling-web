import { App, Component } from 'vue';
/**
 * 创建 vue3 实例，避免多实例情况下全局方法未成功挂载
 *
 * @author chitanda
 * @date 2024-02-04 15:02:54
 * @export
 * @param {Component} rootComponent
 * @param {IData} [rootProps]
 * @param {Plugin[]} [plugins]
 * @return {*}  {App<Element>}
 */
export declare function createVueApp(rootComponent: Component, rootProps?: IData): App<Element>;
