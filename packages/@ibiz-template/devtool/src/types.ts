import { IDevToolController } from './interface/i-devtool-controller';

declare module '@ibiz-template/core' {
  interface IBizSys {
    /**
     * 调试工具
     *
     * @type {IDevToolController}
     * @memberof IBizSys
     */
    devTool: IDevToolController;
  }
}
