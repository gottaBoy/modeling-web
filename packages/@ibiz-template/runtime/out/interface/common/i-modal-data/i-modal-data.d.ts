/**
 * 模态打开界面，关闭时返回数据
 *
 * @author chitanda
 * @date 2022-08-17 18:08:15
 * @export
 * @interface IModalData
 */
export interface IModalData {
    /**
     * 关闭模态窗时是否操作成功
     *
     * @author chitanda
     * @date 2022-08-17 18:08:40
     * @type {boolean}
     */
    ok: boolean;
    /**
     * 返回的数据
     *
     * @author chitanda
     * @date 2022-08-17 18:08:20
     * @type {IData[]}
     */
    data?: IData[];
    /**
     * 额外参数
     *
     * @author chitanda
     * @date 2022-08-17 18:08:10
     * @type {IParams}
     */
    params?: IParams;
}
//# sourceMappingURL=i-modal-data.d.ts.map