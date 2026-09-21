/* eslint-disable no-shadow */
export var PanelItemEventName;
(function (PanelItemEventName) {
    /**
     * 点击
     */
    PanelItemEventName["CLICK"] = "onClick";
    /**
     * 聚焦
     */
    PanelItemEventName["FOCUS"] = "onFocus";
    /**
     * 失焦
     */
    PanelItemEventName["BLUR"] = "onBlur";
    /**
     * 值变更
     */
    PanelItemEventName["CHANGE"] = "onChange";
    /**
     * 回车
     */
    PanelItemEventName["ENTER"] = "onEnter";
})(PanelItemEventName || (PanelItemEventName = {}));
