/**
 * excel文件工具
 * @author lxm
 * @date 2023-08-24 10:45:32
 * @export
 * @interface IExcelUtil
 */
export interface IExcelUtil {
    /**
     * 导出成Excel文件
     * @author lxm
     * @date 2023-08-24 10:45:01
     */
    exportJsonToExcel(args: {
        header: string[];
        data: IData[];
        filename: string;
        autoWidth: boolean;
    }): void;
}
//# sourceMappingURL=i-excel-util.d.ts.map