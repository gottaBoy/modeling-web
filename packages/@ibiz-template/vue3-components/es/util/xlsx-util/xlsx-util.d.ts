import { BookType } from 'xlsx';
/**
 * 导出excel文件
 *
 * @author zk
 * @date 2023-07-18 07:07:36
 * @export
 * @param {{
 *   multiHeader: [];
 *   header: string[];
 *   data: string[][];
 *   filename: string;
 *   merges: [];
 *   autoWidth: boolean;
 *   bookType: BookType;
 * }} {
 *   multiHeader = [],
 *   header,
 *   data,
 *   filename,
 *   merges = [],
 *   autoWidth = true,
 *   bookType = 'xlsx',
 * }
 */
export declare function exportJsonToExcel({ multiHeader, header, data, filename, merges, autoWidth, bookType, }: {
    multiHeader: [];
    header: string[];
    data: string[][];
    filename: string;
    merges: [];
    autoWidth: boolean;
    bookType: BookType;
}): void;
/**
 * 读取excel文件
 *
 * @author zk
 * @date 2023-07-18 07:07:26
 * @export
 * @param {File} file
 * @param {number} sheetIndex
 * @return {*}
 */
export declare function readExcelFile(file: File, sheetIndex: number): Promise<IData[]>;
