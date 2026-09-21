"use strict";
class RequiredProp {
  constructor(type, _default, validator) {
    this.required = true;
    if (_default) {
      this.default = _default;
    }
    if (validator) {
      this.validator = validator;
    }
    this.type = type;
  }
}

export { RequiredProp };
