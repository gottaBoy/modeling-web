/* eslint-disable no-shadow */
/**
 * @description 预定义注入属性(后续注入属性需在此处声明)
 * @author tony001
 * @date 2026-06-09 17:06:26
 * @export
 * @enum {string}
 */
export var PredefinedAttributes;
(function (PredefinedAttributes) {
    /**
     * 样式类注入标识
     */
    PredefinedAttributes["CLASSNAMES"] = "classNames";
    /**
     * 样式注入标识
     */
    PredefinedAttributes["STYLES"] = "styles";
    /**
     * 前置导出标识
     */
    PredefinedAttributes["BEFORE_FRONT_EXPORT"] = "before-front-export";
})(PredefinedAttributes || (PredefinedAttributes = {}));
