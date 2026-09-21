import { ILanguageItem } from '../res/ilanguage-item';
import { IModelObject } from '../imodel-object';
/**
 *
 * @export
 * @interface IAppLan
 */
export interface IAppLan extends IModelObject {
    /**
     * 语言资源项集合
     *
     * @type {ILanguageItem[]}
     * 来源  getAllPSLanguageItems
     */
    languageItems?: ILanguageItem[];
    /**
     * 语言
     * @type {string}
     * 来源  getLanguage
     */
    language?: string;
}
