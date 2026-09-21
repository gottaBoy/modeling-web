import { F as FileSaver_minExports } from '../../node_modules/.pnpm/file-saver@2.0.5/node_modules/file-saver/dist/FileSaver.min.mjs';
import { utils, SSF, write as writeSync, read as readSync } from '../../node_modules/.pnpm/xlsx@0.18.5/node_modules/xlsx/xlsx.mjs';

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
function dateNum(v, date1904 = false) {
  if (date1904)
    v += 1462;
  const epoch = Date.parse(v);
  return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1e3);
}
function sheetFromArrayOfArrays(data) {
  const ws = {};
  const range = {
    s: {
      c: 1e7,
      r: 1e7
    },
    e: {
      c: 0,
      r: 0
    }
  };
  for (let R = 0; R !== data.length; ++R) {
    for (let C = 0; C !== data[R].length; ++C) {
      if (range.s.r > R)
        range.s.r = R;
      if (range.s.c > C)
        range.s.c = C;
      if (range.e.r < R)
        range.e.r = R;
      if (range.e.c < C)
        range.e.c = C;
      const cell = {
        v: data[R][C]
      };
      if (cell.v == null)
        continue;
      const cellRef = utils.encode_cell({
        c: C,
        r: R
      });
      if (typeof cell.v === "number")
        cell.t = "n";
      else if (typeof cell.v === "boolean")
        cell.t = "b";
      else if (cell.v instanceof Date) {
        cell.t = "n";
        cell.z = SSF._table[14];
        cell.v = dateNum(cell.v);
      } else
        cell.t = "s";
      ws[cellRef] = cell;
    }
  }
  if (range.s.c < 1e7)
    ws["!ref"] = utils.encode_range(range);
  return ws;
}
class Workbook {
  constructor() {
    __publicField(this, "SheetNames", []);
    __publicField(this, "Sheets", {});
  }
}
function s2ab(s) {
  const buf = new ArrayBuffer(s.length);
  const view = new Uint8Array(buf);
  for (let i = 0; i !== s.length; ++i)
    view[i] = s.charCodeAt(i) & 255;
  return buf;
}
function exportJsonToExcel({
  multiHeader = [],
  header,
  data,
  filename,
  merges = [],
  autoWidth = true,
  bookType = "xlsx"
}) {
  filename = filename || "excel-list";
  data = [...data];
  data.unshift(header);
  for (let i = multiHeader.length - 1; i > -1; i--) {
    data.unshift(multiHeader[i]);
  }
  const wsName = "SheetJS";
  const wb = new Workbook();
  const ws = sheetFromArrayOfArrays(data);
  if (merges.length > 0) {
    if (!ws["!merges"])
      ws["!merges"] = [];
    merges.forEach((item) => {
      ws["!merges"].push(utils.decode_range(item));
    });
  }
  if (autoWidth) {
    const colWidth = data.map(
      (row) => row.map((val) => {
        if (val == null) {
          return {
            wch: 10
          };
        }
        if (val.toString().charCodeAt(0) > 255) {
          return {
            wch: val.toString().length * 2
          };
        }
        return {
          wch: val.toString().length
        };
      })
    );
    const result = colWidth[0];
    for (let i = 1; i < colWidth.length; i++) {
      for (let j = 0; j < colWidth[i].length; j++) {
        if (result[j].wch < colWidth[i][j].wch) {
          result[j].wch = colWidth[i][j].wch;
        }
      }
    }
    ws["!cols"] = result;
  }
  wb.SheetNames.push(wsName);
  wb.Sheets[wsName] = ws;
  const wbOut = writeSync(wb, {
    bookType,
    bookSST: false,
    type: "binary"
  });
  FileSaver_minExports.saveAs(
    new Blob([s2ab(wbOut)], {
      type: "application/octet-stream"
    }),
    "".concat(filename, ".").concat(bookType)
  );
}
async function readExcelFile(file, sheetIndex) {
  const readFile = (_file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsBinaryString(_file);
      reader.onload = (ev) => {
        var _a;
        resolve((_a = ev.target) == null ? void 0 : _a.result);
      };
    });
  };
  let data = await readFile(file);
  const workbook = readSync(data, { type: "binary" });
  const worksheet = workbook.Sheets[workbook.SheetNames[sheetIndex]];
  data = utils.sheet_to_json(worksheet);
  return data;
}

export { exportJsonToExcel, readExcelFile };
