import { IMDControlController } from '@ibiz-template/runtime';
/**
 * 使用分页组件
 *
 * @author lxm
 * @date 2022-09-06 17:09:09
 * @export
 * @param {GridController} c
 * @returns {*}
 */
export declare function usePagination(c: IMDControlController): {
    onPageChange: (page: number) => void;
    onPageSizeChange: (size: number) => void;
    onPageRefresh: () => void;
};
