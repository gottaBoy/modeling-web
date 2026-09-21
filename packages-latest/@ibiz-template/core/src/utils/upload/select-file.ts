import { merge } from 'lodash-es';

/**
 * @description 文件List转数组
 * @export
 * @param {FileList} fileList
 * @returns {*}  {File[]}
 */
export function fileListToArr(fileList: FileList): File[] {
  const files = [];
  for (let i = 0; i < fileList.length; i++) {
    files.push(fileList[i]);
  }
  return files;
}

/**
 * @description JS打开文件上传操作配置参数
 * @export
 * @interface SelectFileOpts
 */
export interface SelectFileOpts {
  /**
   * @description 接受的文件类型
   * @type {string}
   * @memberof SelectFileOpts
   */
  accept?: string;
  /**
   * @description 是否支持多选
   * @type {boolean}
   * @memberof SelectFileOpts
   */
  multiple?: boolean;
  /**
   * @description 选中文件后回调
   * @memberof SelectFileOpts
   */
  onSelected: (_fileList: File[]) => void;
  /**
   * @description 没有选中文件，点击了取消的场景
   * @memberof SelectFileOpts
   */
  onCancel?: () => void;
}

/**
 * @description JS打开文件上传操作
 * @export
 * @param {SelectFileOpts} _opts 配置参数
 */
export function selectFile(_opts: SelectFileOpts): void {
  const opts: { multiple: boolean; accept: string } & SelectFileOpts = merge(
    {
      multiple: true,
      accept: '',
    },
    _opts,
  );
  const input = document.createElement('input');
  input.setAttribute('type', 'file');
  input.setAttribute('multiple', `${opts.multiple}`);
  input.setAttribute('accept', opts.accept);
  let fileCancel = true; // 是否取消
  input.onchange = (e): void => {
    const inputEl = e.target as HTMLInputElement;
    const files = inputEl.files ? fileListToArr(inputEl.files) : [];
    if (files.length === 0) {
      return;
    }
    // 选中了文件就不算取消
    fileCancel = false;
    opts.onSelected(files);
    inputEl.value = ''; // 如果不置空，相同的文件不会触发change事件
  };
  document.body.appendChild(input);
  input.click();
  // 模拟取消事件
  window.addEventListener(
    'focus',
    () => {
      setTimeout(() => {
        if (fileCancel && opts.onCancel) {
          // 取消逻辑处理
          opts.onCancel();
        }
      }, 300);
    },
    { once: true },
  );

  document.body.removeChild(input);
}
