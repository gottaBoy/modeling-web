/**
 * @description 设置远程样式表
 * @export
 * @param {string} url
 * @returns {*}  {Promise<void>}
 */
export async function setRemoteStyle(url: string): Promise<void> {
  try {
    const res = await ibiz.net.get(url);
    const styleDom = document.createElement('style');
    styleDom.setAttribute('title', 'app-style-css');
    styleDom.innerText = res.data as unknown as string;
    document.head.appendChild(styleDom);
  } catch (error) {
    ibiz.log.debug(ibiz.i18n.t('core.utils.remoteStylesheet'), url);
  }
}
