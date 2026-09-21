import { IDEDashboard } from './idedashboard';
import { IDashboard } from './idashboard';

/**
 *
 * 系统数据看板部件模型对象接口
 * 继承父接口类型值[DASHBOARD]
 * @export
 * @interface ISysDashboard
 */
export interface ISysDashboard extends IDashboard, IDEDashboard {}
