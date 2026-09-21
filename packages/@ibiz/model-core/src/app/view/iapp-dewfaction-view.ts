import { IAppDEWFView } from './iapp-dewfview';

/**
 *
 * 继承父接口类型值[DEWFACTIONVIEW]
 * @export
 * @interface IAppDEWFActionView
 */
export interface IAppDEWFActionView extends IAppDEWFView {
  /**
   * 绑定流程步骤值
   * @type {string}
   * 来源  getWFStepValue
   */
  wfstepValue?: string;

  /**
   * 工作流辅助功能类型
   * @description 值模式 [工作流辅助功能类型] {SENDBACK：回退、 SUPPLYINFO：补充信息、 ADDSTEPBEFORE：前加签、 ADDSTEPAFTER：后加签、 TAKEADVICE：征求意见、 SENDCOPY：抄送、 REASSIGN：转办、 USERACTION：用户自定义、 USERACTION2：用户自定义2、 USERACTION3：用户自定义3、 USERACTION4：用户自定义4、 USERACTION5：用户自定义5、 USERACTION6：用户自定义6 }
   * @type {( string | 'SENDBACK' | 'SUPPLYINFO' | 'ADDSTEPBEFORE' | 'ADDSTEPAFTER' | 'TAKEADVICE' | 'SENDCOPY' | 'REASSIGN' | 'USERACTION' | 'USERACTION2' | 'USERACTION3' | 'USERACTION4' | 'USERACTION5' | 'USERACTION6')}
   * 来源  getWFUtilType
   */
  wfutilType?:
    | string
    | 'SENDBACK'
    | 'SUPPLYINFO'
    | 'ADDSTEPBEFORE'
    | 'ADDSTEPAFTER'
    | 'TAKEADVICE'
    | 'SENDCOPY'
    | 'REASSIGN'
    | 'USERACTION'
    | 'USERACTION2'
    | 'USERACTION3'
    | 'USERACTION4'
    | 'USERACTION5'
    | 'USERACTION6';
}
