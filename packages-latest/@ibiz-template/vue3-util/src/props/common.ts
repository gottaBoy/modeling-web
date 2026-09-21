/**
 * 必填props类型
 *
 * @author lxm
 * @date 2022-11-01 19:11:47
 * @export
 * @class RequiredProp
 * @template T type的类型
 * @template D 默认值的类型
 * @template V 校验函数的类型
 */
export class RequiredProp<T, D = undefined, V = undefined> {
  readonly required = true;

  type: T;

  default?: D | undefined;

  validator?: V | undefined;

  constructor(type: T, _default?: D, validator?: V) {
    if (_default) {
      this.default = _default;
    }
    if (validator) {
      this.validator = validator;
    }
    this.type = type;
  }
}
