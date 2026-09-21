import { IControl, IEditor } from '@ibiz/model-core';
import { IEditorProvider } from '../../interface';
/** 编辑器适配器前缀 */
export declare const EDITOR_PROVIDER_PREFIX = "EDITOR";
/**
 * 注册编辑器适配器
 * @author lxm
 * @date 2023-05-06 09:14:16
 * @export
 * @param {string} key
 * @param {() => IEditorProvider} callback 生成编辑器适配器的回调
 */
export declare function registerEditorProvider(key: string, callback: () => IEditorProvider): void;
/**
 * @description 获取编辑器适配器
 * @export
 * @param {IEditor} model 编辑器模型
 * @param {IControl} [ctrl] 部件模型
 * @returns {*}  {(Promise<IEditorProvider | undefined>)}
 */
export declare function getEditorProvider(model: IEditor, ctrl?: IControl): Promise<IEditorProvider | undefined>;
//# sourceMappingURL=editor-register.d.ts.map