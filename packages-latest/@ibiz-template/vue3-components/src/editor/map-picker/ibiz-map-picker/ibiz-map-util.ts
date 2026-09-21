/**
 * @description 获取地址抬头
 * @export
 * @param {string} fullAddress
 * @returns {*}  {string}
 */
export function getAddressTitle(address: string): string {
  // 贪婪匹配到最后一个行政区划词，取其后面的内容
  const match = address.match(/^.*(?:省|市|区|县|街道|镇|乡|路)(.+)$/);
  return match?.[1] ?? address;
}
