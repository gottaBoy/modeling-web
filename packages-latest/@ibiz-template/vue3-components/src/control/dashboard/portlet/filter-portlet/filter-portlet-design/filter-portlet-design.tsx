/* eslint-disable array-callback-return */
import { defineComponent, reactive, ref, VNode, PropType, Ref } from 'vue';
import type { FormRules } from 'element-plus';
import { useNamespace } from '@ibiz-template/vue3-util';
import {
  IAppPortlet,
  IDBFilterPortletPart,
  IDBPortletPart,
} from '@ibiz/model-core';
import { clone } from '@ibiz-template/core';
import './filter-portlet-design.scss';
import { filterPortletByID, IModalData } from '@ibiz-template/runtime';

// 表单绘制数据
interface IFormData {
  /**
   * 部件名称
   */
  title: string;
  /**
   * 复选框选中数据
   */
  items: string[];
  /**
   * 全选
   */
  selectAll: boolean;
}

export const IBizFilterPortletDesign = defineComponent({
  name: 'IBizFilterPortletDesign',
  props: {
    context: {
      type: Object as PropType<IContext>,
      required: true,
    },
    viewParams: {
      type: Object as PropType<IParams>,
      required: true,
    },
    filter: { type: Object as PropType<IData> },
    items: { type: Array as PropType<IDBPortletPart[]>, default: () => [] },
    dashboardStyle: { type: String },
    dismiss: {
      type: Function as PropType<(_data?: IModalData) => void>,
      required: true,
    },
  },
  emits: ['lisTSelect', 'formChange'],
  setup(props) {
    const ns = useNamespace('filter-portlet-design');

    // 是否加载完成
    const loaded = ref(false);

    // 是否正在loading
    const loadding = ref(false);

    // 表单ref
    const formRef = ref();

    // 表单提交规则
    const rules = reactive<FormRules<IFormData>>({
      title: [
        {
          required: true,
          message: ibiz.i18n.t(
            'control.dashboard.filterPortletDesign.ctrlTitleError',
          ),
          trigger: 'blur',
        },
      ],
    });

    // 表单提交数据
    const formData = reactive<IFormData>({
      title: '',
      selectAll: true,
      items: [],
    });

    // 条件
    const condition: Ref<IData> = ref({});

    // 部件名称最大长度
    const titleMaxLength: number = 32;

    // 当前过滤器模型
    const model: Ref<IDBFilterPortletPart | undefined> = ref();

    // 所有应用门户
    let appPortlets: IAppPortlet[] = [];

    // 所有过滤器门户
    let allFilters: IAppPortlet[] = [];

    // 当前门户部件参数
    const portletParams: Ref<IData> = ref({});

    // 实体schema属性
    const schemaFields: Ref<IData[]> = ref([]);

    // jsonSchema映射
    const jsonSchemaMap: Map<string, IData[]> = new Map();

    // 条件缓存，防止切换数据丢失
    const conditionMap: Map<string, IData> = new Map();

    // 所有门户列表
    const checkBoxList: Ref<IDBPortletPart[]> = ref([]);

    // 获取所有应用过滤器门户
    const getFilters = (): IAppPortlet[] => {
      let result: IAppPortlet[] = [];
      const app = ibiz.hub.getApp(props.context.srfappid);
      appPortlets = app.model.appPortlets || [];
      if (appPortlets.length > 0) {
        result = appPortlets.filter(x => {
          if (x.control) {
            return (
              x.control.controlType === 'PORTLET' &&
              (x.control as IDBFilterPortletPart).portletType === 'FILTER'
            );
          }
        });
      }
      return result;
    };

    // 获取实体schema
    const getJsonSchema = async (appDataEntityId?: string) => {
      if (!appDataEntityId) {
        return;
      }
      if (!jsonSchemaMap.has(appDataEntityId)) {
        loadding.value = true;
        schemaFields.value = await ibiz.util.jsonSchema.getEntitySchemaFields(
          appDataEntityId,
          props.context,
          props.viewParams,
        );
        loadding.value = false;
        jsonSchemaMap.set(appDataEntityId, schemaFields.value);
      }
      schemaFields.value = jsonSchemaMap.get(appDataEntityId)!;
    };

    // 初始化选项框
    const setCheckBox = () => {
      checkBoxList.value = filterPortletByID(
        model.value!.id!,
        props.context,
        props.items,
        props.dashboardStyle === 'BIREPORTDASHBOARD' ||
          props.dashboardStyle === 'BIREPORTDASHBOARD2',
      );
    };

    // 初始化
    const init = async () => {
      allFilters = getFilters();
      // 默认选中所有项
      if (props.items) {
        formData.items = props.items.map(x => x.id!);
      }
      if (props.filter) {
        const item = allFilters.find(x => x.id === props.filter!.model.id);
        if (item) {
          model.value = clone(item.control as IDBFilterPortletPart);
          formData.title = props.filter.config.srftitle;
          portletParams.value = item.portletParams || {};
          const selectAll = props.filter.filterConfig.scope === 'all';
          if (!selectAll) {
            formData.selectAll = false;
            formData.items =
              props.filter.filterConfig.scopedata?.split(',') || [];
          }
          condition.value = props.filter.searchConds;
        }
      }
      if (!model.value && allFilters.length > 0) {
        model.value = clone(allFilters[0].control!);
        formData.title = model.value.title || '';
        portletParams.value = allFilters[0].portletParams || {};
      }
      if (model.value) {
        await getJsonSchema(model.value.appDataEntityId);
        setCheckBox();
      }

      loaded.value = true;
    };

    init();

    // 计算当前数据配置
    const calcConfig = () => {
      const result: IData = {};
      if (formData.selectAll) {
        result.scope = 'all';
      } else {
        result.scope = 'custom';
        const selectKeys: string[] = [];
        checkBoxList.value.forEach((item: IData) => {
          if (formData.items.includes(item.id)) {
            selectKeys.push(item.id);
          }
        });
        result.scopedata = selectKeys.join(',');
      }
      if (Object.keys(portletParams.value).length > 0) {
        result.scopetag = portletParams.value.filtergroup;
      }
      return result;
    };

    // 处理列表项点击
    const handleListItemClick = (
      item: IDBFilterPortletPart,
      data: IData,
      disabled: boolean,
    ) => {
      if (disabled) {
        return;
      }
      model.value = clone(item);
      formData.title = item.title || '';
      portletParams.value = data;
      getJsonSchema(item.appDataEntityId);
      if (conditionMap.has(item.appDataEntityId!)) {
        condition.value = conditionMap.get(item.appDataEntityId!)!;
      } else {
        condition.value = {};
      }
      setCheckBox();
    };

    // 处理条件变更
    const handleConditionChange = (group: IData) => {
      condition.value = group;
      conditionMap.set(model.value!.appDataEntityId!, group);
    };

    // 处理全选变更
    const onSwitchChange = (value: boolean) => {
      if (value && props.items) {
        formData.items = props.items.map(x => x.id!);
      }
    };

    // 取消
    const handleCancel = () => {
      props.dismiss({ ok: false });
    };

    // 确认
    const handleConfirm = () => {
      if (!formRef.value) {
        return;
      }
      formRef.value.validate((valid: boolean) => {
        if (valid) {
          const config = calcConfig();
          const data = {
            config,
            model: Object.assign(model.value!, { title: formData.title }),
            searchconds: condition.value,
          };
          props.dismiss({ ok: true, data: [data] });
        }
      });
    };

    // 绘制列表无数据
    const renderNoData = (): VNode => {
      return (
        <iBizNoData
          text={ibiz.i18n.t('control.common.currentNoData')}
        ></iBizNoData>
      );
    };

    // 绘制左侧列表
    const renderLeftList = () => {
      if (!allFilters.length) {
        return renderNoData();
      }
      return (
        <ul class={[ns.b('left-list')]}>
          {allFilters.map((portlet: IAppPortlet) => {
            const item = portlet.control! as IDBFilterPortletPart;
            const data = portlet.portletParams || {};
            let disabled = false;
            if (props.filter && props.filter.id !== item.id) {
              disabled = true;
            }
            let title = item.title;
            if (item.titleLanguageRes?.lanResTag) {
              title = ibiz.i18n.t(item.titleLanguageRes.lanResTag, item.title);
            }
            return (
              <li
                class={[
                  ns.be('left-list', 'item'),
                  ns.is('disabled', disabled),
                  ns.is('actvie', item.id === model.value?.id),
                ]}
                title={title}
                onClick={() => handleListItemClick(item, data, disabled)}
              >
                {title}
              </li>
            );
          })}
        </ul>
      );
    };

    // 绘制复选框
    const renderCheckBoxGroup = () => {
      if (!checkBoxList.value) {
        return;
      }
      const onlyAdd =
        checkBoxList.value.length > 0 && formData.items.length === 1;
      return (
        <el-checkbox-group
          class={[ns.b('checkbox'), ns.is('only-add', onlyAdd)]}
          v-model={formData.items}
          disabled={formData.selectAll}
        >
          {checkBoxList.value.map((item: IData) => {
            return (
              <el-checkbox
                label={item.id}
                disabled={onlyAdd && formData.items.includes(item.id)}
              >
                {item.title}
              </el-checkbox>
            );
          })}
        </el-checkbox-group>
      );
    };

    // 绘制表单
    const renderForm = () => {
      if (!model.value) {
        return null;
      }
      return (
        <el-form
          ref='formRef'
          model={formData}
          rules={rules}
          label-width='auto'
          class={ns.b('right-form')}
        >
          <el-form-item
            required
            label={ibiz.i18n.t(
              'control.dashboard.filterPortletDesign.ctrlTitle',
            )}
            prop='title'
          >
            <el-input
              v-model={formData.title}
              maxlength={titleMaxLength}
              placeholder={ibiz.i18n.t(
                'control.dashboard.filterPortletDesign.ctrlPlaceholder',
              )}
            >
              {{
                suffix: () => (
                  <div>
                    {formData.title.length} / {titleMaxLength}
                  </div>
                ),
              }}
            </el-input>
          </el-form-item>
          <el-form-item
            class={ns.be('right-form', 'checks')}
            label={ibiz.i18n.t(
              'control.dashboard.filterPortletDesign.checkTitle',
            )}
            required
            props='items'
          >
            <el-switch
              title={ibiz.i18n.t(
                'control.dashboard.filterPortletDesign.selectAll',
              )}
              v-model={formData.selectAll}
              onChange={onSwitchChange}
            />
            {renderCheckBoxGroup()}
          </el-form-item>
        </el-form>
      );
    };

    // 绘制右侧内容
    const renderRightContent = () => {
      return (
        <div class={[ns.b('right-content')]}>
          <div class={[ns.be('right-content', 'title')]}>
            {ibiz.i18n.t('control.dashboard.filterPortletDesign.baseSet')}
          </div>
          {renderForm()}
        </div>
      );
    };

    // 绘制左侧内容
    const renderLeftContent = () => {
      const title = props.filter
        ? ibiz.i18n.t('app.edit')
        : ibiz.i18n.t('app.newlyBuild');
      return (
        <div class={[ns.b('left-content')]}>
          <div class={ns.be('left-content', 'title')}>{`${title} ${ibiz.i18n.t(
            'control.dashboard.filterPortletDesign.filterTitle',
          )}`}</div>
          {renderLeftList()}
        </div>
      );
    };

    const renderCondition = () => {
      return (
        <iBizCustomFilterCondition
          class={ns.b('condition')}
          v-loading={loadding.value}
          context={props.context}
          params={props.viewParams}
          value={condition.value}
          schemaFields={schemaFields.value}
          onChange={handleConditionChange}
        ></iBizCustomFilterCondition>
      );
    };

    const renderFooter = () => {
      return (
        <div class={ns.b('footer')}>
          <el-button onClick={handleCancel} title={ibiz.i18n.t('app.cancel')}>
            {ibiz.i18n.t('app.cancel')}
          </el-button>
          <el-button onClick={handleConfirm} title={ibiz.i18n.t('app.confirm')}>
            {ibiz.i18n.t('app.confirm')}
          </el-button>
        </div>
      );
    };

    return {
      ns,
      loaded,
      formRef,
      renderRightContent,
      renderLeftContent,
      renderCondition,
      renderFooter,
    };
  },
  render() {
    if (!this.loaded) {
      return;
    }
    return (
      <div class={[this.ns.b()]}>
        <div class={[this.ns.e('layout-left')]}>{this.renderLeftContent()}</div>
        <div class={[this.ns.e('layout-right')]}>
          {this.renderRightContent()}
          {this.renderCondition()}
          {this.renderFooter()}
        </div>
      </div>
    );
  },
});
