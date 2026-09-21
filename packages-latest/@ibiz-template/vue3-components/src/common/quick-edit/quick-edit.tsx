import { defineComponent, PropType, Ref, ref } from 'vue';
import {
  IDEEditForm,
  IDEEditFormItem,
  IDEFormDetail,
  IDEFormItem,
} from '@ibiz/model-core';
import { useNamespace } from '@ibiz-template/vue3-util';
import {
  EventBase,
  IModalData,
  EditFormController,
  findChildFormDetails,
} from '@ibiz-template/runtime';
import './quick-edit.scss';

export const IBizQuickEdit = defineComponent({
  name: 'IBizQuickEdit',
  props: {
    context: {
      type: Object as PropType<IContext>,
      required: true,
    },
    params: {
      type: Object as PropType<IParams>,
      required: true,
    },
    modelData: {
      type: Object as PropType<IDEEditForm>,
    },
    isFilterHiddenItem: {
      type: Boolean,
      default: true,
    },
  },
  emits: {
    close: (_modalData: IModalData) => true,
  },
  setup(props, { emit }) {
    const ns = useNamespace('quick-edit');
    const controller: Ref<EditFormController | undefined> = ref(undefined);
    const editItemModel: IDEFormItem[] = [];
    // 隐藏表单项模型
    const hiddenItemModel: IDEFormItem[] = [];

    /**
     * 递归查找表单项
     *
     * @param {IDEFormDetail} detail
     */
    const findItem = (detail: IDEFormDetail): void => {
      const childern = findChildFormDetails(detail);
      childern.forEach(child => {
        if (child.detailType === 'FORMITEM' && !(child as IDEFormItem).hidden) {
          editItemModel.push(child);
        }
        if (child.detailType === 'FORMITEM' && (child as IDEFormItem).hidden) {
          hiddenItemModel.push(child);
        }
        findItem(child);
      });
    };

    /**
     * 初始化
     *
     */
    const init = (): void => {
      if (props.modelData) {
        props.modelData.deformPages?.forEach(child => {
          findItem(child);
        });
      }
    };

    init();

    /**
     * 控制器创建完成
     *
     * @param {EventBase} event
     */
    const onCreated = (event: EventBase): void => {
      controller.value = event.ctrl as EditFormController;
    };

    /**
     * 获取编辑项数据
     *
     */
    const getEditItemData = (): IData => {
      const data: IData = {};
      const item = (controller.value as IData).getDiffData();
      editItemModel.forEach(formItem => {
        const uiKey = formItem.id!.toLowerCase();
        const deKey =
          formItem.fieldName || (formItem as IDEEditFormItem).appDEFieldId!;
        if (item[uiKey]) {
          data[deKey] = item[uiKey];
        }
      });
      return data;
    };

    // 获取表单项数据
    const getItemData = (): IData => {
      const data: IData = {};
      const item = (controller.value as IData).getDiffData();
      [...editItemModel, ...hiddenItemModel].forEach(formItem => {
        const uiKey = formItem.id!.toLowerCase();
        const deKey =
          formItem.fieldName || (formItem as IDEEditFormItem).appDEFieldId!;
        if (item[uiKey]) {
          data[deKey] = item[uiKey];
        }
      });
      return data;
    };

    /**
     * 确认
     *
     */
    const onConfirm = (): void => {
      let data: IData[] | undefined;
      if (controller.value) {
        const item = props.isFilterHiddenItem
          ? getEditItemData()
          : getItemData();
        if (Object.keys(item).length > 0) {
          data = [item];
        }
      }
      emit('close', { ok: true, data });
    };

    /**
     * 取消
     *
     */
    const onCancel = (): void => {
      emit('close', { ok: false });
    };

    return { ns, onCreated, onConfirm, onCancel };
  },
  render() {
    return (
      <div class={this.ns.b()}>
        <iBizControlShell
          params={this.params}
          context={this.context}
          modelData={this.modelData}
          onCreated={this.onCreated}
          {...this.$attrs}
        ></iBizControlShell>
        <div class={this.ns.e('footer')}>
          <el-button text onClick={this.onCancel}>
            {ibiz.i18n.t('app.cancel')}
          </el-button>
          <el-button onClick={this.onConfirm}>
            {ibiz.i18n.t('app.confirm')}
          </el-button>
        </div>
      </div>
    );
  },
});
