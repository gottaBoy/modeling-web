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
declare function validate(permission: number): boolean;
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
declare function setPermission(allPermissions: number | undefined, permission: number): number;
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
declare function removePermission(allPermissions: number | undefined, permission: number): number;
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
declare function checkPermission(allPermissions: number | undefined, permission: number): boolean;
export declare const BitMask: {
    validate: typeof validate;
    setPermission: typeof setPermission;
    removePermission: typeof removePermission;
    checkPermission: typeof checkPermission;
};
export {};
//# sourceMappingURL=bit-mask.d.ts.map