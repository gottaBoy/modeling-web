'use strict';

var runtime = require('@ibiz-template/runtime');

"use strict";
class CodeEditorController extends runtime.EditorController {
  /**
   * 语言类型
   * @author lxm
   * @date 2023-07-21 04:52:16
   * @readonly
   */
  get language() {
    return this.editorParams.codeType || this.editorParams.language || "typescript";
  }
  /**
   * 主题
   * @author lxm
   * @date 2023-07-21 04:53:37
   * @readonly
   */
  get theme() {
    return this.editorParams.theme || "vs-dark";
  }
}

exports.CodeEditorController = CodeEditorController;
