import { IHttpResponse, recursiveIterate } from '@ibiz-template/core';
import { IDESearchForm, IDEFormDetail } from '@ibiz/model-core';
import { ControlVO, UIMapField } from '../../../../service';
import { FormService } from '../form/form.service';

/**
 * 搜索表单服务
 *
 * @author lxm
 * @date 2022-09-22 17:09:06
 * @export
 * @class SearchFormService
 * @extends {ControlService<T>}
 * @template T
 */
export class SearchFormService<
  T extends IDESearchForm = IDESearchForm,
> extends FormService<T> {
  /**
   * 执行获取草稿方法
   *
   * @author lxm
   * @date 2022-08-31 17:08:41
   * @param {IContext} context 上下文
   * @param {IParams} [params={}] 视图参数
   * @returns {*}  {Promise<IHttpResponse>}
   */
  async getDraft(
    context: IContext,
    params: IParams = {},
  ): Promise<IHttpResponse<ControlVO>> {
    const tempData = this.getFilteredData({ ...params });
    let res = { ok: true, status: 200, data: tempData } as IHttpResponse;
    res = this.handleResponse(res);
    // 设置默认值
    if (res.ok && res.data) {
      this.setDefault(res.data, context, params, 'create');
    }
    return res as IHttpResponse<ControlVO>;
  }

  /**
   * 初始化属性映射
   *
   * @author lxm
   * @date 2022-08-31 18:08:37
   */
  protected initUIDataMap(): void {
    // 搜索表单没有属性，配了的表单项就映射到后台请求上
    recursiveIterate(
      this.model,
      (item: IDEFormDetail) => {
        if (item.detailType === 'FORMITEM') {
          const uiKey = item.id!.toLowerCase();
          this.dataUIMap.set(uiKey, new UIMapField(uiKey, uiKey));
        }
      },
      {
        childrenFields: ['deformPages', 'deformTabPages', 'deformDetails'],
      },
    );
  }

  /**
   * 处理响应
   *
   * @author lxm
   * @date 2022-08-31 17:08:13
   * @param {IHttpResponse} res
   * @returns {*}  {IHttpResponse}
   */
  handleResponse(response: IHttpResponse): IHttpResponse<ControlVO> {
    const res = super.handleResponse(response);
    if (res.ok && res.data) {
      res.data = this.toUIData(res.data);
    }
    return res as IHttpResponse<ControlVO>;
  }
}
