/**
 * 设置远程样式表
 *
 * @author lxm
 * @date 2023-02-09 05:46:49
 * @export
 * @param {string} url
 * @returns {*}  {Promise<void>}
 */
export async function setRemoteStyle(url) {
    try {
        const res = await ibiz.net.get(url);
        const styleDom = document.createElement('style');
        styleDom.setAttribute('title', 'app-style-css');
        styleDom.innerText = res.data;
        document.head.appendChild(styleDom);
    }
    catch (error) {
        ibiz.log.debug(ibiz.i18n.t('core.utils.remoteStylesheet'), url);
    }
}
