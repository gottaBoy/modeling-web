import { IApiData } from '@ibiz-template/core';
/**
 * @description Excel工具类
 * @export
 * @interface IApiExcelUtil
 */
export interface IApiExcelUtil {
    /**
     * @description 导出excel文件
     * @param {{
     *     header: string[]; // 表头内容
     *     data: IApIApiData[]; // 数据内容
     *     filename: string; // 文件名称
     *     autoWidth: boolean; // 单元格是否自适应
     *   }} args 导出配置
     * @memberof IApiExcelUtil
     */
    exportJsonToExcel(args: {
        header: string[];
        data: IApiData[];
        filename: string;
        autoWidth: boolean;
    }): void;
    /**
     * @description 导出excel文件（附加样式处理）
     * @param {({
     *     fileName: string;  // 文件名
     *     header: string[];  // 表头内容
     *     data: string[][];   // 数据内容
     *     rowHeights?:(rows: string[][]) => { hpx: number }[] | { hpt: number }[];  // 行高，hpt（磅）/ hpx（像素）
     *     colWidths?:(rows: string[][]) => { wch: number }[] | { wpx: number }[];   // 列宽，wch（字符数）/ wpx（像素）
     *     multiHeader?: string[][];    // 多表头数据
     *     merges?: { s: { r: number; c: number }; e: { r: number; c: number } }[];  // 合并单元格，s: 起始坐标, e: 结束坐标
     *     cellStyle?: (       // 单元格样式
     *       rows:string[][],
     *       value: unknown,
     *       rowIndex: number,
     *       colIndex: number,
     *       isHeaderCell: boolean,
     *     ) => { fill?: IApiData; font?: IApiData; alignment?: IApiData; border?: IApiData };
     *   })} args
     * @memberof IApiExcelUtil
     */
    exportJsonToExcelWithStyle(args: {
        fileName: string;
        header: string[];
        data: string[][];
        rowHeights?: (rows: string[][]) => {
            hpx: number;
        }[] | {
            hpt: number;
        }[];
        colWidths?: (rows: string[][]) => {
            wch: number;
        }[] | {
            wpx: number;
        }[];
        multiHeader?: string[][];
        merges?: {
            s: {
                r: number;
                c: number;
            };
            e: {
                r: number;
                c: number;
            };
        }[];
        cellStyle?: (rows: string[][], value: unknown, rowIndex: number, colIndex: number, isHeaderCell: boolean) => {
            fill?: IApiData;
            font?: IApiData;
            alignment?: IApiData;
            border?: IApiData;
        };
    }): void;
}
//# sourceMappingURL=i-api-excel-util.d.ts.map