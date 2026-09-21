import { IBizSys } from './ibizsys';
/**
 * 初始化全局对象
 *
 * @author chitanda
 * @date 2022-07-19 17:07:37
 * @export
 */
export function install() {
    if (window.ibiz) {
        throw new Error(ibiz.i18n.t('core.noReInstall'));
    }
    window.ibiz = new IBizSys();
}
