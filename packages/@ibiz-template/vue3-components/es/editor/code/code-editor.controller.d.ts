import { EditorController } from '@ibiz-template/runtime';
import { ICode } from '@ibiz/model-core';
/**
 * 代码框编辑器控制器
 *
 * @export
 * @class CodeEditorController
 * @extends {EditorController}
 */
export declare class CodeEditorController extends EditorController<ICode> {
    /**
     * 语言类型
     * @author lxm
     * @date 2023-07-21 04:52:16
     * @readonly
     */
    get language(): string;
    /**
     * 主题
     * @author lxm
     * @date 2023-07-21 04:53:37
     * @readonly
     */
    get theme(): string;
}
