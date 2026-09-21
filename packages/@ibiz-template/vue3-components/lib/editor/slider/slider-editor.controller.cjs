'use strict';

var runtime = require('@ibiz-template/runtime');

"use strict";
class SliderEditorController extends runtime.EditorController {
  async onInit() {
    super.onInit();
    if (this.model.precision) {
      ibiz.log.warn("\u6ED1\u52A8\u8F93\u5165\u6761\u4E0D\u652F\u6301\u914D\u7F6E\u7CBE\u5EA6");
    }
  }
}

exports.SliderEditorController = SliderEditorController;
