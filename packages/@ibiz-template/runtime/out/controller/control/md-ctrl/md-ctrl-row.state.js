/**
 * 多数据部件行状态
 *
 * @author chitanda
 * @date 2023-06-19 18:06:44
 * @export
 * @class MobMDCtrlRowState
 */
export class MobMDCtrlRowState {
    /**
     * Creates an instance of MDCtrlRowState.
     *
     * @author chitanda
     * @date 2023-06-19 18:06:12
     * @param {ControlVO} data 行数据
     * @param {IMobMDCtrlController} controller 多数据部件控制器
     */
    constructor(data, controller) {
        this.data = data;
        this.controller = controller;
        /**
         * 行为状态
         *
         * @author chitanda
         * @date 2023-06-19 18:06:27
         * @type {{ [p: string]: IButtonContainerState }}
         */
        this.uaColStates = {};
        this.data = data;
    }
}
