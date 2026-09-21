import { RuntimeError, RuntimeModelError } from '@ibiz-template/core';
import { IDEEditForm } from '@ibiz/model-core';
import { createUUID } from 'qx-util';
import {
  IControlProvider,
  IEditFormController,
  IFormMDCtrlFormController,
} from '../../../../../interface';
import { calcDeCodeNameById } from '../../../../../model';
import { getControlProvider } from '../../../../../register';
import { FormNotifyState } from '../../../../constant';
import { EditFormService } from '../../edit-form';
import { FormMDCtrlFormState } from './form-mdctrl-form.state';
import { FormMDCtrlController } from './form-mdctrl.controller';

/**
 * @description 表单多数据部件(引用实体表单部件模型)控制器 类型是表单
 * @export
 * @class FormMDCtrlFormController
 * @extends {FormMDCtrlController}
 */
export class FormMDCtrlFormController
  extends FormMDCtrlController
  implements IFormMDCtrlFormController
{
  /**
   * @description 表单多数据部件控制器状态
   * @type {FormMDCtrlFormState}
   * @memberof FormMDCtrlFormController
   */
  declare state: FormMDCtrlFormState;

  /**
   * @description 忽略下一次自身对应表单项数据变更
   * @memberof FormMDCtrlFormController
   */
  ignoreNextSelfChange = false;

  protected createState(): FormMDCtrlFormState {
    return new FormMDCtrlFormState(this.parent?.state);
  }

  /**
   * @description 表单控制器Map
   * @memberof FormMDCtrlFormController
   */
  formMap = new Map<string, IEditFormController>();

  /**
   * @description 表单部件的适配器
   * @type {IControlProvider}
   * @memberof FormMDCtrlFormController
   */
  formProvider!: IControlProvider;

  /**
   * @description 编辑表单服务
   * @type {EditFormService}
   * @memberof FormMDCtrlFormController
   */
  service!: EditFormService;

  /**
   * @description 实体上下文主键标识
   * @type {string}
   * @memberof FormMDCtrlFormController
   */
  deName!: string;

  /**
   * @description  数据集合
   * @type {IData[]}
   * @memberof FormMDCtrlFormController
   */
  items: IData[] = [];

  /**
   * @description 初始化
   * @returns {*}  {Promise<void>}
   * @memberof FormMDCtrlFormController
   */
  async onInit(): Promise<void> {
    super.onInit();
    const { contentControl, appId, ctrlParams } = this.model;

    // 初始化适配器
    if (!contentControl) {
      if (this.context?.srfrunmode === 'DESIGN') {
        return;
      }
      throw new RuntimeModelError(
        this.model,
        ibiz.i18n.t('runtime.controller.control.form.unconfiguredWidgets'),
      );
    }

    // 修改自动保存
    (contentControl as IDEEditForm).enableAutoSave =
      this.enableCreate || this.enableUpdate;
    // 修改触发值变更模式为input防止保存异常
    contentControl.controlParam = {
      appId,
      ctrlParams,
    };
    const controlProvider = await getControlProvider(contentControl);
    if (controlProvider) {
      this.formProvider = controlProvider;
    }

    const { appDataEntityId } = this.model.contentControl!;
    this.deName = calcDeCodeNameById(appDataEntityId!);
  }

  /**
   * @description 加载实体的数据
   * @returns {*}  {Promise<void>}
   * @memberof FormMDCtrlFormController
   */
  async fetchData(): Promise<void> {
    const { appDataEntityId } = this.model.contentControl!;
    const fetchAction = 'fetchdefault';
    const res = await ibiz.hub
      .getApp(this.model.appId)
      .deService.exec(appDataEntityId!, fetchAction, this.context, this.params);
    if (res.ok) {
      this.items = res.data as IData[];
      this.state.items = this.items.map(item => {
        const context = this.context.clone();
        context[this.deName] = item.srfkey;
        const params = { ...this.params };
        return {
          id: item.srfkey,
          context,
          params,
        };
      });
    }
  }

  /**
   * @description 更新数据,仅支持更新临时数据
   * @returns {*}  {Promise<void>}
   * @memberof FormMDCtrlFormController
   */
  async updateData(): Promise<void> {
    const { appDataEntityId } = this.model.contentControl!;
    const fetchAction = 'update';
    const deService = await ibiz.hub.getAppDEService(
      this.model.appId,
      appDataEntityId!,
      this.context,
    );
    const data = this.state.items?.map((item, index) => {
      const _item = this.items.find(v => v.srfkey === item.id)!;
      _item.srfordervalue = index + 1;
      return _item;
    });
    if (deService.isLocalMode && data) {
      await deService.exec(fetchAction, this.context, data);
    }
  }

  /**
   * @description 表单状态变更通知
   * @param {FormNotifyState} state
   * @returns {*}  {Promise<void>}
   * @memberof FormMDCtrlFormController
   */
  async formStateNotify(state: FormNotifyState): Promise<void> {
    await super.formStateNotify(state);
    await this.refresh();
  }

  /**
   * @description 设置表单控制器
   * @param {string} id
   * @param {IEditFormController} controller
   * @memberof FormMDCtrlFormController
   */
  setFormController(id: string, controller: IEditFormController): void {
    this.formMap.set(id, controller);

    controller.evt.on('onLoadSuccess', event => {
      const formData = event.data?.[0];
      const item = this.state.items?.find(child => child.id === id);
      if (item && formData) {
        item.title = formData.srfmajortext || '';
      }
    });

    controller.evt.on('onSaveSuccess', event => {
      const formData = event.data[0];
      const item = this.state.items!.find(x => x.id === id);

      // 创建之后更新上下文的主键
      if (item && formData) {
        item.title = formData.srfmajortext || '';
        if (item.context[this.deName] !== formData.srfkey) {
          item.context[this.deName] = formData.srfkey;
        }
      }
      this.notifyFormDataChange();
    });
    controller.evt.on('onRemoveSuccess', () => {
      this.notifyFormDataChange();
    });
  }

  /**
   * @description 校验
   * @returns {*}  {Promise<boolean>}
   * @memberof FormMDCtrlFormController
   */
  async validate(): Promise<boolean> {
    const values = await Promise.all(
      Array.from(this.formMap.values()).map(form => form.validate()),
    );

    // 找不到value为false即全部是true
    return values.findIndex(value => !value) === -1;
  }

  /**
   * @description 静默校验
   * @returns {*}  {Promise<boolean>}
   * @memberof FormMDCtrlFormController
   */
  async silentValidate(): Promise<boolean> {
    const values = await Promise.all(
      Array.from(this.formMap.values()).map(form => form.silentValidate()),
    );

    // 找不到value为false即全部是true
    return values.findIndex(value => !value) === -1;
  }

  /**
   * @description 删除数据
   * @param {string} id
   * @returns {*}  {Promise<void>}
   * @memberof FormMDCtrlFormController
   */
  async remove(id: string): Promise<void> {
    const controller = this.formMap.get(id);
    if (!controller) {
      throw new RuntimeError(
        ibiz.i18n.t('runtime.controller.control.form.noFoundFormController', {
          id,
        }),
      );
    }
    await controller.remove({ silent: true });
    this.formMap.delete(id);
    const index = this.state.items!.findIndex(item => item.id === id);
    if (index !== -1) {
      this.state.items!.splice(index, 1);
    }
  }

  /**
   * @description  新建一条数据
   * @param {number} [index]
   * @memberof FormMDCtrlFormController
   */
  create(index?: number): void {
    const context = this.context.clone();
    const params = { ...this.params };
    if (!this.state.items) {
      this.state.items = [];
    }
    const item = {
      id: createUUID(),
      context,
      params,
    };
    if (index !== undefined) {
      this.state.items!.splice(index, 0, item);
    } else {
      this.state.items!.push(item);
    }
  }

  /**
   * @description 刷新
   * @memberof FormMDCtrlFormController
   */
  refresh(): void {
    this.fetchData();
  }

  /**
   * @description 数据变更通知
   * @param {string[]} names
   * @returns {*}  {Promise<void>}
   * @memberof FormMDCtrlFormController
   */
  async dataChangeNotify(names: string[]): Promise<void> {
    if (names.includes(this.model.id!) && this.ignoreNextSelfChange) {
      this.ignoreNextSelfChange = false;
      return;
    }

    await super.dataChangeNotify(names);

    // 表单项更新的时候修改数据的时候需要刷新
    if (names.includes(this.model.id!)) {
      this.refresh();
    }
  }

  /**
   * @description 通知表单多数据部件对应的表单项数据变更
   * @protected
   * @memberof FormMDCtrlFormController
   */
  protected notifyFormDataChange(): void {
    this.updateFormItem();
    this.ignoreNextSelfChange = true;
    this.form.dataChangeNotify([this.name]);
  }

  /**
   * @description 保存
   * @returns {*}  {Promise<void>}
   * @memberof FormMDCtrlFormController
   */
  async save(): Promise<void> {
    await Promise.all(
      Array.from(this.formMap.values()).map(form =>
        form.save({ silent: true }),
      ),
    );
  }
}
