/**
 *  门户部件控件状态
 *
 * @export
 * @class PortletPartState
 */
export class PortletPartState {
    constructor() {
        this.visible = true;
        this.keepAlive = false;
        this.layout = {
            width: '',
            height: '',
            extraStyle: {},
            extraClass: [],
            contentStyle: {},
        };
        this.class = {
            container: [],
            containerDyna: [],
        };
        /**
         * 界面行为组状态
         *
         * @type {(IButtonContainerState | null)}
         * @memberof PortletPartState
         */
        this.actionGroupState = null;
        /**
         * @description 是否高亮
         * @type {boolean}
         * @memberof PortletPartState
         */
        this.hightLight = false;
    }
}
