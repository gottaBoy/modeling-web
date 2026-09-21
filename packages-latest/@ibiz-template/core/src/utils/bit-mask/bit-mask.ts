/* eslint-disable default-param-last */
/* eslint-disable no-bitwise */

import { RuntimeError } from '../../error';

/**
 * @description 检查权限码是否有效，权限码是否是2的幂
 * @example
 * ```typescript
 *  validate(1) // => true
 *  validate(3) // => false
 * ```
 * @static
 * @param {number} permission
 */
function validate(permission: number): boolean {
  return !!permission && !(permission & (permission - 1));
}

/**
 * @description 检查权限码是否有效,无效抛错
 * @param {number} permission
 */
function validateAndThrow(permission: number): void {
  const isPowerOf2 = validate(permission);
  if (!isPowerOf2) {
    throw new RuntimeError(
      ibiz.i18n.t('core.utils.powerOfTwo', { permission }),
    );
  }
}

/**
 * @description 设置权限，数字转二进制后进行|运算, 设置对应bit位为1（bit位为1代表有权限，bit位为0代表没有权限）
 * @example
 * ```typescript
 *  setPermission(0, 1) // => 1
 *  setPermission(1, 4) // => 5
 * ```
 * @param {number} [allPermissions=0]
 * @param {number} permission
 * @returns {*}  {number}
 */
function setPermission(allPermissions: number = 0, permission: number): number {
  validateAndThrow(permission);
  return allPermissions | permission;
}

/**
 * @description 移出权限，数字转二进制后进行取反并且进行&运算, 设置对应bit位为0（bit位为1代表有权限，bit位为0代表没有权限）
 * @param {number} [allPermissions=0] 当前所有权限
 * @param {number} permission 要移出的权限
 * @returns {*}  {number}
 */
function removePermission(
  allPermissions: number = 0,
  permission: number,
): number {
  validateAndThrow(permission);
  return allPermissions & ~permission;
}

/**
 * @description 检查是否有某个权限，数字转二进制后进行&运算，为1则有权限，为0则没有权限
 * @example
 * ```typescript
 *  checkPermission(0, 1) // => false
 *  checkPermission(5, 4) // => true
 * ```
 * @param {number} [allPermissions=0]
 * @param {number} permission
 * @returns {*}  {boolean}
 */
function checkPermission(
  allPermissions: number = 0,
  permission: number,
): boolean {
  validateAndThrow(permission);
  return (allPermissions & permission) !== 0;
}

export const BitMask = {
  validate,
  setPermission,
  removePermission,
  checkPermission,
};
