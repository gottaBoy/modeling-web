import { IValueItemEditor } from './ivalue-item-editor';

/**
 *
 * 继承父接口类型值[FILEUPLOADER,MOBMULTIFILEUPLOAD,MOBSINGLEFILEUPLOAD,FILEUPLOADERONE]
 * @export
 * @interface IFileUploader
 */
export interface IFileUploader extends IValueItemEditor {
  /**
   * 文件后缀[FILEEXTS]
   * @type {string}
   * 来源  getFileExts
   */
  fileExts?: string;

  /**
   * 最大文件数量[MAXFILECNT]
   * @type {number}
   * 来源  getMaxFileCount
   */
  maxFileCount?: number;

  /**
   * 最大文件大小[MAXFILESIZE]
   * @type {number}
   * 来源  getMaxFileSize
   */
  maxFileSize?: number;

  /**
   * 最小文件数量[MINFILECNT]
   * @type {number}
   * 来源  getMinFileCount
   */
  minFileCount?: number;

  /**
   * 对象存储分类[OSSCAT]
   * @type {string}
   * 来源  getOSSCat
   */
  osscat?: string;
}
