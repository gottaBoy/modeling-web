/**
 * helper 基类
 *
 * @author chitanda
 * @date 2021-12-29 14:12:34
 * @export
 * @class HelperBase
 */
export class HelperBase {
    /**
     * Creates an instance of HelperBase.
     *
     * @author chitanda
     * @date 2021-12-29 14:12:47
     * @param {string} tag 助手标识
     */
    constructor(Handlebars, tag) {
        Handlebars.registerHelper(tag, this.onExecute);
    }
}
