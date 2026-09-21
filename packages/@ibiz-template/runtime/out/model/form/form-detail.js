/**
 * 查找子表单成员集合
 * @author lxm
 * @date 2023-06-13 06:57:30
 * @export
 * @param {IDEFormDetail} parent 父表单成员
 * @return {*}  {IDEFormDetail[]}
 */
export function findChildFormDetails(parent) {
    let childDetails;
    switch (parent.detailType) {
        case 'TABPANEL':
            childDetails = parent.deformTabPages;
            break;
        case 'FORMPAGE':
        case 'TABPAGE':
        case 'GROUPPANEL':
            childDetails = parent.deformDetails;
            break;
        default:
            break;
    }
    return childDetails || [];
}
/**
 * 是否是表单数据容器成员（多数据部件）
 * @author lxm
 * @date 2023-11-13 05:49:35
 * @export
 * @param {IDEFormDetail} detail
 * @return {*}  {boolean}
 */
export function isFormDataContainer(detail) {
    return detail.detailType === 'MDCTRL';
}
