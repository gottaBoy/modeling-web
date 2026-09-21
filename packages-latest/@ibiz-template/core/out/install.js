import { IBizSys } from './ibizsys';
/**
 * @description 初始化全局对象
 * @export
 */
export function install() {
    if (window.ibiz) {
        throw new Error(ibiz.i18n.t('core.noReInstall'));
    }
    window.ibiz = new IBizSys();
}
