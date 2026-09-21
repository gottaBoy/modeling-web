import { IColState } from '../../common';
export interface IFormDetailState extends IColState {
    /**
     * 显示更多模式 {0：无、 1：受控内容、 2：管理容器}
     * @author lxm
     * @date 2023-03-17 02:16:43
     * @type {(0 | 1 | 2)}
     */
    showMoreMode: 0 | 1 | 2 | number;
    /**
     * 类名集合
     * @author lxm
     * @date 2023-07-24 12:51:22
     * @type {string[]}
     */
    class: IFormDetailClass;
}
export interface IFormDetailClass {
    /**
     * 容器样式
     * @author lxm
     * @date 2023-08-02 06:25:51
     * @type {string[]}
     */
    container: string[];
    /**
     * 容器动态样式
     * @author lxm
     * @date 2023-08-02 06:25:57
     * @type {string[]}
     */
    containerDyna: string[];
    /**
     * 标题样式
     * @author lxm
     * @date 2023-08-02 06:26:05
     * @type {string[]}
     */
    label: string[];
    /**
     * 标题动态样式
     * @author lxm
     * @date 2023-08-02 06:26:11
     * @type {string[]}
     */
    labelDyna: string[];
}
//# sourceMappingURL=i-form-detail.state.d.ts.map