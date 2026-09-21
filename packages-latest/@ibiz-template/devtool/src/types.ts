import { IDevToolController } from './interface/i-devtool-controller';
import { IStyleDebugDockController } from './interface/i-style-debug-dock-controller';

declare module '@ibiz-template/core' {
  interface IBizSys {
    /**
     * 调试工具
     *
     * @type {IDevToolController}
     * @memberof IBizSys
     */
    devTool: IDevToolController;

    /**
     * 样式调试面板
     *
     * @type {IStyleDebugDockController}
     * @memberof IBizSys
     */
    styleDebugDock: IStyleDebugDockController;
  }
}
