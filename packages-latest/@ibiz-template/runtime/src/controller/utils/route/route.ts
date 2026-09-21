/**
 * 是否有子路由路径
 * @author lxm
 * @date 2023-11-08 10:12:54
 * @export
 * @param {number} routeDepth
 * @return {*}  {boolean}
 */
export function hasSubRoute(routeDepth: number): boolean {
  return window.location.hash.split('/').length > routeDepth * 2 + 2;
}
