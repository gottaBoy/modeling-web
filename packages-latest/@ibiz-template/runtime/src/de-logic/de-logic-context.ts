import { DELogicParam } from './de-logic-param/de-logic-param';
import { IDeLogicContext, IDeLogicParams } from '../interface';

/**
 * 实体逻辑执行上下文
 *
 * @author lxm
 * @date 2023-03-09 07:38:38
 * @export
 * @class DELogicContext
 */
export class DELogicContext implements IDeLogicContext {
  /**
   * 上一次返回值
   * @author lxm
   * @date 2023-09-04 09:22:52
   * @type {unknown}
   */
  lastReturn: unknown;

  /**
   * 上下文
   */
  get context(): IContext {
    if (Object.prototype.hasOwnProperty.call(this.params, 'context')) {
      return this.params.context;
    }
    return this.parameters.context;
  }

  /**
   * 数据
   */
  get data(): IData[] {
    return this.parameters.data;
  }

  /**
   * 视图参数
   */
  get viewParam(): IParams {
    if (Object.prototype.hasOwnProperty.call(this.params, 'viewParam')) {
      return this.params.viewParam;
    }
    return this.parameters.params;
  }

  /**
   * Creates an instance of DELogicContext.
   * @author lxm
   * @date 2023-03-24 09:15:14
   * @param {Map<string, DELogicParam>} deLogicParams 实体逻辑参数集合
   * @param {IContext} context 上下文
   * @param {IData} data 数据对象
   * @param {IParams} params 视图参数
   */
  constructor(
    private deLogicParams: Map<string, DELogicParam>,
    public parameters: IDeLogicParams,
  ) {}

  /**
   * 重置实体逻辑参数
   * @author lxm
   * @date 2023-03-24 09:18:02
   * @param {string} name
   */
  resetParam(name: string): void {
    this.deLogicParams.get(name)?.calc(this);
  }

  /**
   * 重新建立变量
   * @author lxm
   * @date 2023-03-24 09:20:24
   * @param {string} name
   */
  renewParam(name: string): void {
    this.deLogicParams.get(name)?.renew(this);
  }

  /**
   * 实体逻辑参数
   *
   * @description 实体逻辑参数初始化时设置
   * @author lxm
   * @date 2023-02-08 17:02:38
   * @type {Record<string, any>}
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params: Record<string, any> = {};

  /**
   * UI逻辑执行返回值
   *
   * @author lxm
   * @date 2023-02-09 21:02:40
   * @type {unknown}
   */
  result: unknown = null;

  /**
   * 是否存在结束节点
   *
   * @author lxm
   * @date 2023-03-16 12:08:58
   * @type {boolean}
   */
  isEndNode: boolean = false;

  /**
   * 默认参数节点
   *
   * @author lxm
   * @date 2023-03-16 12:11:14
   * @type {string}
   */
  defaultParamName: string = 'Default';

  /**
   * 设置上一次返回值
   * @author lxm
   * @date 2023-09-04 09:23:52
   * @param {unknown} value
   */
  setLastReturn(value: unknown): void {
    this.lastReturn = value;
  }

  /**
   * 初始化上一次返回参数类型的逻辑参数
   * @author lxm
   * @date 2023-09-04 09:52:00
   * @param {string} tag
   */
  initLastReturnParam(tag: string): void {
    Object.defineProperty(this.params, tag, {
      enumerable: true,
      configurable: true,
      get: () => this.lastReturn,
    });
  }

  /**
   * 是否是实体参数变量（即后台数据对象）
   * @author lxm
   * @date 2023-09-22 03:40:30
   * @param {string} paramId
   * @return {*}  {boolean}
   */
  isEntityParam(paramId: string): boolean {
    const deLogicParams = this.deLogicParams.get(paramId);
    return !!(deLogicParams && deLogicParams.model.entityParam);
  }
}
