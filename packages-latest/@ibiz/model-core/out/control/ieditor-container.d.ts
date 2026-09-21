import { IEditor } from './ieditor';
import { ILanguageRes } from '../res/ilanguage-res';
import { IModelObject } from '../imodel-object';
/**
 *
 * 编辑器容器模型对象接口
 * @export
 * @interface IEditorContainer
 */
export interface IEditorContainer extends IModelObject {
    /**
     *
     * @type {ILanguageRes}
     * 来源  getPHPSLanguageRes
     */
    phlanguageRes?: ILanguageRes;
    /**
     * 编辑器对象
     *
     * @type {IEditor}
     * 来源  getPSEditor
     */
    editor?: IEditor;
}
