import { ITextArea } from './itext-area';

/**
 *
 * 继承父接口类型值[CODE,MOBCODE]
 * @export
 * @interface ICode
 */
export interface ICode extends ITextArea {
  /**
   * 代码类型[CODETYPE]
   * @type {string}
   * 来源  getCodeType
   */
  codeType?: string;

  /**
   * 启用全屏[FULLSCREEN]
   * @type {boolean}
   * @default false
   * 来源  isEnableFullScreen
   */
  enableFullScreen?: boolean;

  /**
   * 启用缩略图[MINIMAP]
   * @type {boolean}
   * @default false
   * 来源  isEnableMinimap
   */
  enableMinimap?: boolean;
}
