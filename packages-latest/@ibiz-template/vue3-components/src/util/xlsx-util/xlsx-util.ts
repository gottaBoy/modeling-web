/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/ban-types */
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import STYLE_XLSX from 'xlsx-js-style';
import { BookType } from 'xlsx';

/**
 * 将日期转换为 Excel 序列号
 *
 * Excel 内部以数字存储日期：以 1899-12-30 为起点（0），每一天递增 1。
 * 例如 1900-01-01 对应 2，2023-07-18 对应 45125。
 * date1904 为 true 时使用 Mac 版 Excel 的 1904 日期系统（起点为 1904-01-02）。
 *
 * @param v 日期对象或可被 Date.parse 解析的字符串
 * @param date1904 是否使用 1904 日期系统
 * @returns Excel 序列号（天数，含小数表示时分秒）
 */
function dateNum(
  v: number | boolean | Date | string,
  date1904: boolean = false,
) {
  // 1904 日期系统需要在 1900 系统基础上偏移 1462 天
  if (date1904) (v as number) += 1462;
  // Date.parse 返回距 1970-01-01 UTC 的毫秒数
  const epoch = Date.parse(v as string);
  // 用当前时间戳减去 Excel 起点（1899-12-30 UTC）的时间戳，再除以一天的毫秒数，得到天数
  return (
    (epoch - (new Date(Date.UTC(1899, 11, 30)) as unknown as number)) /
    (24 * 60 * 60 * 1000)
  );
}

/**
 * 将二维数组转换为 XLSX 的工作表（Worksheet）对象
 *
 * XLSX 工作表的本质是一个「单元格引用 -> 单元格对象」的字典：
 *   {
 *     'A1': { v: '姓名', t: 's' },
 *     'B1': { v: 18, t: 'n' },
 *     '!ref': 'A1:B3',     // 工作表数据范围
 *     '!merges': [...],    // 合并单元格
 *     '!cols': [...]       // 列宽
 *   }
 * 单元格引用（如 "A1"）通过列字母 + 行数字定位，由 XLSX.utils.encode_cell 编码生成。
 *
 * @param data 二维数组，外层是行，内层是列
 * @returns XLSX 工作表对象
 */
function sheetFromArrayOfArrays(data: IData[]) {
  const ws: IData = {};
  // range 记录工作表的数据范围：s(start) 为左上角，e(end) 为右下角
  // 初始值用极值，便于后续在遍历过程中取最小/最大值收敛
  const range = {
    s: {
      c: 10000000,
      r: 10000000,
    },
    e: {
      c: 0,
      r: 0,
    },
  };
  for (let R = 0; R !== data.length; ++R) {
    for (let C = 0; C !== data[R].length; ++C) {
      // 收敛数据范围边界
      if (range.s.r > R) range.s.r = R;
      if (range.s.c > C) range.s.c = C;
      if (range.e.r < R) range.e.r = R;
      if (range.e.c < C) range.e.c = C;
      // 单元格对象：v 为值，t 为类型，z 为数字格式
      const cell: {
        v: number | boolean | Date | string;
        t?: string;
        z?: string;
      } = {
        v: data[R][C],
      };
      // 空值跳过，不写入工作表
      // eslint-disable-next-line no-continue
      if (cell.v == null) continue;
      // 将 { c: 列号, r: 行号 } 编码为单元格引用字符串，如 { c:0, r:0 } -> "A1"
      const cellRef = XLSX.utils.encode_cell({
        c: C,
        r: R,
      });

      // 根据值类型设置单元格类型 t：
      //   n=number 数字, b=boolean 布尔, s=string 字符串
      if (typeof cell.v === 'number') cell.t = 'n';
      else if (typeof cell.v === 'boolean') cell.t = 'b';
      else if (cell.v instanceof Date) {
        // 日期类型在 Excel 中存储为数字，需转换为序列号
        cell.t = 'n';
        // z 为数字格式字符串，_table[14] 是 XLSX 内置的日期格式 "m/d/yy"
        cell.z = XLSX.SSF._table[14];
        cell.v = dateNum(cell.v);
      } else cell.t = 's';

      ws[cellRef] = cell;
    }
  }
  // 将最终范围编码为范围字符串（如 "A1:C5"），写入 !ref 字段
  if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
  return ws;
}

/**
 * 工作簿（Workbook）类
 *
 * 一个 Excel 文件即一个工作簿，包含：
 *   - SheetNames：所有工作表名称的数组
 *   - Sheets：以工作表名为键、工作表对象为值的字典
 */
class Workbook {
  public SheetNames: string[] = [];

  public Sheets: IData = {};
}

/**
 * 将字符串转为 ArrayBuffer
 *
 * XLSX.write 在 type: 'binary' 模式下返回二进制字符串（每个字符表示一个字节），
 * 而 Blob 需要 ArrayBuffer 或 TypedArray，故需做此转换。
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function s2ab(s: any) {
  const buf = new ArrayBuffer(s.length);
  const view = new Uint8Array(buf);
  // charCodeAt 取字符码点，& 0xff 截断为单字节
  // eslint-disable-next-line no-bitwise
  for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
  return buf;
}

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
export function exportJsonToExcel({
  multiHeader = [],
  header,
  data,
  filename,
  merges = [],
  autoWidth = true,
  bookType = 'xlsx',
}: {
  multiHeader: [];
  header: string[];
  data: string[][];
  filename: string;
  merges: [];
  autoWidth: boolean;
  bookType: BookType;
}): void {
  filename = filename || 'excel-list';
  // 复制一份数据，避免修改入参
  data = [...data];
  // 将表头插入到数据首行（数据行之上）
  data.unshift(header);
  // 多级表头按倒序逐行插入，最终顺序与传入 multiHeader 数组顺序一致
  for (let i = multiHeader.length - 1; i > -1; i--) {
    data.unshift(multiHeader[i]);
  }
  const wsName = 'SheetJS';
  const wb = new Workbook();
  // 将合并后的二维数组转换为工作表对象
  const ws = sheetFromArrayOfArrays(data);

  // 处理合并单元格：merges 元素为范围字符串（如 "A1:C1"）
  if (merges.length > 0) {
    if (!ws['!merges']) ws['!merges'] = [];
    merges.forEach(item => {
      // decode_range 将 "A1:C1" 解析为 { s: {c,r}, e: {c,r} } 结构
      ws['!merges'].push(XLSX.utils.decode_range(item));
    });
  }
  if (autoWidth) {
    /* 设置worksheet每列的最大宽度 */
    // 计算每个单元格内容的显示宽度（wch = width chars，单位为字符数）
    const colWidth = data.map(row =>
      row.map(val => {
        /* 先判断是否为null/undefined */
        if (val == null) {
          return {
            wch: 10,
          };
        }
        // charCodeAt(0) > 255 表示是非 ASCII 字符（如中文），中文占 2 个字符宽度
        if (val.toString().charCodeAt(0) > 255) {
          /* 再判断是否为中文 */
          return {
            wch: val.toString().length * 2,
          };
        }
        return {
          wch: val.toString().length,
        };
      }),
    );
    /* 以第一行为初始值 */
    const result = colWidth[0];
    // 逐列取所有行中的最大宽度，作为该列最终宽度
    for (let i = 1; i < colWidth.length; i++) {
      for (let j = 0; j < colWidth[i].length; j++) {
        if (result[j].wch < colWidth[i][j].wch) {
          result[j].wch = colWidth[i][j].wch;
        }
      }
    }
    // !cols 是工作表的列宽配置数组
    ws['!cols'] = result;
  }

  /* add worksheet to workbook */
  // 将工作表挂载到工作簿：注册名称 + 写入 Sheets 字典
  wb.SheetNames.push(wsName);
  wb.Sheets[wsName] = ws;

  // 将工作簿序列化为二进制字符串
  //   bookType: 输出格式（xlsx/csv/xls 等）
  //   bookSST: 是否使用共享字符串表（false 时字符串内联到单元格，体积稍大但兼容性好）
  //   type: 'binary' 表示返回二进制字符串
  const wbOut = XLSX.write(wb, {
    bookType,
    bookSST: false,
    type: 'binary',
  });
  if (!filename.endsWith(bookType)) filename = `${filename}.${bookType}`;
  // 将二进制字符串转 ArrayBuffer 后包装成 Blob，由 file-saver 触发浏览器下载
  saveAs(
    new Blob([s2ab(wbOut)], {
      type: 'application/octet-stream',
    }),
    `${filename}`,
  );
}

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
export async function readExcelFile(
  file: File,
  sheetIndex: number,
): Promise<IData[]> {
  // 用 FileReader 将文件读取为二进制字符串
  const readFile = (_file: File) => {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.readAsBinaryString(_file);
      reader.onload = ev => {
        resolve(ev.target?.result);
      };
    });
  };
  let data = await readFile(file);
  // XLSX.read 解析二进制数据，返回工作簿对象（含 SheetNames / Sheets）
  const workbook: XLSX.WorkBook = XLSX.read(data, { type: 'binary' });
  // 通过 sheetIndex 取出指定工作表
  const worksheet: XLSX.WorkSheet =
    workbook.Sheets[workbook.SheetNames[sheetIndex]];
  // sheet_to_json 将工作表按行转换为对象数组：
  //   默认以第一行作为键（表头），后续每行生成一个 { 列名: 值 } 对象
  data = XLSX.utils.sheet_to_json(worksheet);
  return data as IData[];
}

/**
 * 导出excel文件（带样式）
 }}
 */
export function exportJsonToExcelWithStyle({
  fileName,
  multiHeader = [],
  header,
  data,
  rowHeights,
  colWidths,
  merges = [],
  cellStyle,
}: {
  fileName: string;
  multiHeader?: string[][];
  header: string[];
  data: string[][];
  rowHeights?: (rows: string[][]) => { hpx: number }[] | { hpt: number }[];
  colWidths?: (rows: string[][]) => { wch: number }[] | { wpx: number }[];
  merges?: { s: { r: number; c: number }; e: { r: number; c: number } }[];
  cellStyle?: (
    rows: string[][],
    value: unknown,
    rowIndex: number,
    colIndex: number,
    isHeaderCell: boolean,
  ) => { fill?: IData; font?: IData; alignment?: IData; border?: IData };
}): void {
  let filename = fileName || 'excel-list';
  // 表头总行数 = 多级表头行数 + 主表头 1 行，用于区分表头/数据单元格
  const headerRowCount = multiHeader.length + 1;
  // 复制一份数据，避免修改入参
  data = [...data];
  // 将表头插入到数据首行（数据行之上）
  data.unshift(header);
  // 多级表头按倒序逐行插入
  for (let i = multiHeader.length - 1; i > -1; i--) {
    data.unshift(multiHeader[i]);
  }
  try {
    // 1. 创建工作表
    const wb = STYLE_XLSX.utils.book_new();
    const ws = STYLE_XLSX.utils.aoa_to_sheet(data);
    // 2. 应用合并单元格
    if (merges.length > 0) ws['!merges'] = merges;
    // 3. 设置列宽，行高
    let tempColWidths: { wch?: number; wpx?: number }[] = [];
    if (colWidths) {
      tempColWidths = colWidths(data);
    }
    if (tempColWidths.length === 0) {
      const colWidth = data.map(row =>
        row.map(val => {
          if (val == null) {
            return {
              wch: 10,
            };
          }
          if (val.toString().charCodeAt(0) > 255) {
            return {
              wch: val.toString().length * 2,
            };
          }
          return {
            wch: val.toString().length,
          };
        }),
      );
      const result = colWidth[0];
      for (let i = 1; i < colWidth.length; i++) {
        for (let j = 0; j < colWidth[i].length; j++) {
          if (result[j].wch < colWidth[i][j].wch) {
            result[j].wch = colWidth[i][j].wch;
          }
        }
      }
      tempColWidths = result;
    }
    ws['!cols'] = tempColWidths;
    if (rowHeights) ws['!rows'] = rowHeights(data);
    // 4. 应用单元格样式
    if (cellStyle) {
      const range = STYLE_XLSX.utils.decode_range(ws['!ref'] || '');
      for (let r = range.s.r; r <= range.e.r; r++) {
        for (let c = range.s.c; c <= range.e.c; c++) {
          const cellRef = XLSX.utils.encode_cell({ r, c });
          let cellValue = ws[cellRef];
          if (!cellValue) {
            cellValue = { v: '', t: 's' };
            ws[cellRef] = cellValue;
          }
          const style = cellStyle(data, cellValue.v, r, c, r < headerRowCount);
          if (style) {
            ws[cellRef].s = style;
          }
        }
      }
    }
    // 5. 写出文件
    const bookType = 'xlsx';
    const wsName = 'SheetJS';
    STYLE_XLSX.utils.book_append_sheet(wb, ws, wsName);
    const wbOut = STYLE_XLSX.write(wb, {
      bookType,
      bookSST: false,
      type: 'binary',
    });
    if (!filename.endsWith(bookType)) filename = `${filename}.${bookType}`;
    // 将二进制字符串转 ArrayBuffer 后包装成 Blob，由 file-saver 触发浏览器下载
    saveAs(
      new Blob([s2ab(wbOut)], {
        type: 'application/octet-stream',
      }),
      filename,
    );
  } catch (error) {
    ibiz.log.error('exportJsonToExcelWithStyle error', error);
  }
}
