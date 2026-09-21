/* eslint-disable default-param-last */
/* eslint-disable no-bitwise */
import { RuntimeError } from '../../error';
/**
 * 检查权限码是否有效
 *
 * @description 检查权限码是否是2的幂
 * @example
 * ```typescript
 *  validate(1) // => true
 *  validate(3) // => false
 * ```
 * @author lxm
 * @date 2023-11-10 10:49:57
 * @static
 * @param {number} permission
 */
function validate(permission) {
    return !!permission && !(permission & (permission - 1));
}
/**
 * 检查权限码是否有效,无效抛错
 * @author lxm
 * @date 2023-11-10 10:56:00
 * @private
 * @static
 * @param {number} permission
 */
function validateAndThrow(permission) {
    const isPowerOf2 = validate(permission);
    if (!isPowerOf2) {
        throw new RuntimeError(ibiz.i18n.t('core.utils.powerOfTwo', { permission }));
    }
}
/**
 * 设置权限
 *
 * @description 数字转二进制后进行|运算, 设置对应bit位为1（bit位为1代表有权限，bit位为0代表没有权限）
 * @example
 * ```typescript
 *  setPermission(0, 1) // => 1
 *  setPermission(1, 4) // => 5
 * ```
 * @author lxm
 * @date 2023-11-10 10:50:22
 * @static
 * @param {number} [allPermissions=0] 当前所有权限
 * @param {number} permission 要设置的权限
 * @return {*}  {number}
 */
function setPermission(allPermissions = 0, permission) {
    validateAndThrow(permission);
    return allPermissions | permission;
}
/**
 * 移出权限
 * @description 数字转二进制后进行取反并且进行&运算, 设置对应bit位为0（bit位为1代表有权限，bit位为0代表没有权限）
 * @example
 * ```typescript
 *  removePermission(9, 1) // => 8
 *  removePermission(17, 16) // => 1
 * ```
 * @author lxm
 * @date 2023-11-10 10:50:45
 * @static
 * @param {number} [allPermissions=0] 当前所有权限
 * @param {number} permission 要移出的权限
 * @return {*}  {number}
 */
function removePermission(allPermissions = 0, permission) {
    validateAndThrow(permission);
    return allPermissions & ~permission;
}
/**
 * 检查是否有某个权限
 *
 * @description 数字转二进制后进行&运算，为1则有权限，为0则没有权限
 * @example
 * ```typescript
 *  checkPermission(0, 1) // => false
 *  checkPermission(5, 4) // => true
 * ```
 * @author lxm
 * @date 2023-11-10 10:50:46
 * @static
 * @param {number} [allPermissions=0]
 * @param {number} permission
 * @return {*}  {number}
 */
function checkPermission(allPermissions = 0, permission) {
    validateAndThrow(permission);
    return (allPermissions & permission) !== 0;
}
export const BitMask = {
    validate,
    setPermission,
    removePermission,
    checkPermission,
};
