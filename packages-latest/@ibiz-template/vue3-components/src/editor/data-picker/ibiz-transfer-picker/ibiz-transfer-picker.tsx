/* eslint-disable no-template-curly-in-string */
import {
  ref,
  Ref,
  watch,
  VNode,
  computed,
  onMounted,
  defineComponent,
} from 'vue';
import {
  useNamespace,
  getEditorEmits,
  useSemanticNode,
  getDataPickerProps,
} from '@ibiz-template/vue3-util';
import { debounce } from '@ibiz-template/core';
import { clone } from 'lodash-es';
import { PickerEditorController } from '../picker-editor.controller';
import { TransferSelect } from './components';
import './ibiz-transfer-picker.scss';

/**
 * 穿梭框选择（扩展）
 *
 * @description 通过穿梭框区分未选数据和已选数据。基于`数据选择`编辑器进行扩展，编辑器样式代码名称为：TRANSFER_PICKER
 * @primary
 * @editorparams {"name":"titles","parameterType":"string[]","defaultvalue":"[\"可选列表\",\"已选列表\"]","description":"用于自定义列表标题，该值为字符串数组。其中下标为 0 的字符串对应穿梭框左侧列表的标题，下标为 1 的字符串对应穿梭框右侧列表的标题"}
 * @editorparams {"name":"buttontexts","parameterType":"string[]","defaultvalue":"[\"删除\",\"添加\"]","description":"用于自定义按钮显示文字，该值为字符串数组。其中下标为 0 的字符串对应左侧按钮文字，下标为 1 的字符串对应右侧按钮文字"}
 * @editorparams {"name":"remotesearch","parameterType":"boolean","defaultvalue":"false","description":"是否启用远程过滤搜索功能。左侧列表默认采用本地过滤搜索，若此值为 true，则会开启远程过滤搜索"}
 * @editorparams {"name":"valuetype","parameterType":"string","description":"编辑器的值类型"}
 * @editorparams {"name":"objectidfield","parameterType":"string","description":"值类型为OBJECTS时的对象标识属性。当值类型非 OBJECTS 且配置了此参数时，抛出的值为选中数据以值分隔符拼接而成的字符串"}
 * @editorparams {"name":"objectnamefield","parameterType":"string","description":"值类型为OBJECTS时的对象名称属性。也用于控制是否触发左侧列表数据的默认加载，配置时会触发默认加载，不配置时不会触发默认加载"}
 * @editorparams {"name":"objectvaluefield","parameterType":"string","description":"值类型为OBJECTS时的对象值属性"}
 * @editorparams {"name":"readonly","parameterType":"boolean","defaultvalue":false,"description":"设置编辑器是否为只读态"}
 * @ignoreprops autoFocus | overflowMode
 * @ignoreemits blur | focus | enter
 */
export const IBizTransferPicker = defineComponent({
  name: 'IBizTransferPicker',
  props: getDataPickerProps<PickerEditorController>(),
  emits: getEditorEmits(),
  setup(props, { emit }) {
    const ns = useNamespace('picker');
    const ns2 = useNamespace('transfer-picker');

    const c = props.controller!;
    const editorModel = c.model;
    const { semanticClass, semanticStyle } = useSemanticNode(c);
    // 子类类名透传
    const childClass = [
      {
        class: semanticClass('editor.content'),
        selector: `.ibiz-transfer`,
      },
      {
        class: semanticClass('editor.section'),
        selector: `.ibiz-transfer-panel`,
      },
      {
        class: semanticClass('editor.actions'),
        selector: '.ibiz-transfer__buttons',
      },
      {
        class: semanticClass('editor.actions.item'),
        selector: '.ibiz-transfer__button',
      },
      {
        class: semanticClass('editor.header'),
        selector: `.ibiz-transfer-panel__header`,
      },
      {
        class: semanticClass('editor.title'),
        selector: `.ibiz-transfer-panel__header--title`,
      },
      {
        class: semanticClass('editor.count'),
        selector: `.ibiz-transfer-panel__header--count`,
      },
      {
        class: semanticClass('editor.body'),
        selector: '.ibiz-transfer-panel__body',
      },
      {
        class: semanticClass('editor.search'),
        selector: '.el-input__inner',
      },
      {
        class: semanticClass('editor.search.prefix'),
        selector: '.el-input__prefix',
      },
      {
        class: semanticClass('editor.list'),
        selector: '.ibiz-transfer-panel__list',
      },
      {
        class: semanticClass('editor.item'),
        selector: '.ibiz-transfer-panel__item',
      },
      {
        class: semanticClass('editor.item.checkbox'),
        selector: '.ibiz-transfer-panel__item .el-checkbox__inner',
      },
      {
        class: semanticClass('editor.item.label'),
        selector: '.ibiz-transfer-panel__item .el-checkbox__label',
      },
    ];

    // 子类样式透传
    const childStyle = [
      {
        class: semanticStyle('editor.content'),
        selector: `.ibiz-transfer`,
      },
      {
        class: semanticStyle('editor.section'),
        selector: `.ibiz-transfer-panel`,
      },
      {
        class: semanticStyle('editor.actions'),
        selector: '.ibiz-transfer__buttons',
      },
      {
        class: semanticStyle('editor.actions.item'),
        selector: '.ibiz-transfer__button',
      },
      {
        class: semanticStyle('editor.header'),
        selector: `.ibiz-transfer-panel__header`,
      },
      {
        class: semanticStyle('editor.title'),
        selector: `.ibiz-transfer-panel__header--title`,
      },
      {
        class: semanticStyle('editor.count'),
        selector: `.ibiz-transfer-panel__header--count`,
      },
      {
        class: semanticStyle('editor.body'),
        selector: '.ibiz-transfer-panel__body',
      },
      {
        class: semanticStyle('editor.search'),
        selector: '.el-input__inner',
      },
      {
        class: semanticStyle('editor.search.prefix'),
        selector: '.el-input__prefix',
      },
      {
        class: semanticStyle('editor.list'),
        selector: '.ibiz-transfer-panel__list',
      },
      {
        class: semanticStyle('editor.item'),
        selector: '.ibiz-transfer-panel__item',
      },
      {
        class: semanticStyle('editor.item.checkbox'),
        selector: '.ibiz-transfer-panel__item .el-checkbox__inner',
      },
      {
        class: semanticStyle('editor.item.label'),
        selector: '.ibiz-transfer-panel__item .el-checkbox__label',
      },
    ];
    /** 当前表单项绑定值key的集合 */
    const curValue: Ref<Array<string>> = ref([]);

    /** 实体数据集 */
    const items: Ref<IData[]> = ref([]);

    /** 选中项key-value键值对 */
    const selectItems: Ref<IData[]> = ref([]);

    /** 加载中 */
    const loading: Ref<boolean> = ref(false);

    /** 编辑器Ref */
    const editorRef = ref();

    /** 当前表单项绑定值key的对应查询数据下标集合 */
    const curIndexs = ref<Array<string>>([]);

    /** 左侧列表的已勾选项的 key 数组 */
    const leftChecked = ref<Array<string>>([]);

    /** 右侧列表的已勾选项的 key 数组 */
    const rightChecked = ref<Array<string>>([]);

    /** 右侧列表已选中项 */
    const rightSelects = ref<Array<IData>>([]);

    const valueType = c.model.valueType;
    const valueSeparator = c.model.valueSeparator || ',';

    /** 自定义列表标题 */
    let titles: string[] = [
      ibiz.i18n.t('editor.transferPicker.optionalList'),
      ibiz.i18n.t('editor.transferPicker.selectedList'),
    ];

    /** 自定义按钮文案 */
    let buttonTexts: string[] = [
      ibiz.i18n.t('app.delete'),
      ibiz.i18n.t('app.add'),
    ];

    /** 启用远程搜索 */
    let enableRemoteSearch: boolean = false;

    if (editorModel.editorParams) {
      const { editorParams } = editorModel;
      if (editorParams.titles) {
        try {
          titles = JSON.parse(editorParams.titles);
        } catch (error) {
          ibiz.log.info(error);
        }
      }
      if (editorParams.buttontexts) {
        try {
          buttonTexts = JSON.parse(editorParams.buttontexts);
        } catch (error) {
          ibiz.log.info(error);
        }
      }
      if (editorParams.remotesearch)
        enableRemoteSearch = editorParams.remotesearch === 'true';
    }

    // 监听传入值
    watch(
      () => props.value,
      newVal => {
        curValue.value = [];
        selectItems.value = [];
        if (newVal) {
          if (valueType === 'OBJECTS') {
            (newVal as Array<IData>).forEach((item: IData) => {
              const _item = clone(item);
              Object.assign(_item, {
                [c.keyName]: item[c.objectIdField as string],
                [c.textName]: item[c.objectNameField as string],
              });
              if (c.objectValueField) {
                Object.assign(_item, {
                  ...item[c.objectValueField],
                });
                delete _item[c.objectValueField];
              }
              if (_item[c.keyName]) {
                selectItems.value.push(_item);
              }
            });
          } else if (c.objectIdField && valueSeparator) {
            const values = (newVal as string).split(valueSeparator);
            values.forEach((value: string) => {
              selectItems.value.push({
                [c.keyName]: value,
              });
            });
          } else {
            try {
              selectItems.value = JSON.parse(newVal as string);
            } catch (error) {
              ibiz.log.error(
                `SIMPLE类型地址栏值格式${newVal}不符合JSON字符串要求`,
              );
            }
          }
          selectItems.value.forEach((item: IData) => {
            curValue.value.push(item[c.keyName]);
            // 选项没有的时候补充选项
            const index = items.value.findIndex(i =>
              Object.is(i[c.keyName], item[c.keyName]),
            );
            if (index < 0) {
              items.value.push({
                [c.keyName]: item[c.keyName],
                [c.textName]: item[c.textName],
              });
            }
          });
        }
      },
      { immediate: true, deep: true },
    );

    // 自动聚焦
    watch(editorRef, newVal => {
      if (props.autoFocus && newVal && newVal.focus) {
        newVal.focus();
      }
    });

    /** 右侧列表元素变化时触发，往外抛值 */
    const handleRightChange = (result: IData[]): void => {
      // 抛出值集合
      const selects: IData[] = [];
      if (result && Array.isArray(result)) {
        result.forEach((select: IData) => {
          Object.assign(select, {
            [c.keyName]: select[c.keyName] ? select[c.keyName] : select.srfkey,
            [c.textName]: select[c.textName]
              ? select[c.textName]
              : select.srfmajortext,
          });
          if (valueType === 'OBJECTS') {
            selects.push(c.handleObjectParams(select));
          } else if (c.objectIdField) {
            selects.push(select[c.keyName]);
          } else {
            selects.push({
              [c.keyName]: select[c.keyName],
              [c.textName]: select[c.textName],
            });
          }
          const index = items.value.findIndex(item =>
            Object.is(item[c.keyName], select[c.keyName]),
          );
          if (index < 0) {
            items.value.push(select);
          }
        });
      }
      let value: string | Array<IData> | null = null;
      if (selects.length > 0) {
        if (valueType === 'OBJECTS') {
          value = selects;
        } else {
          value = c.objectIdField
            ? selects.join(valueSeparator)
            : JSON.stringify(selects);
        }
      }
      emit('change', value);
    };

    /** 自定义搜索方法 */
    const filterMethod = (query: string, item: IData): boolean => {
      const textName = item[c.textName];
      return !query || textName?.toLowerCase().includes(query?.toLowerCase());
    };

    /** 右侧列表元素变化时触发 */
    const onRightChange = (selectKeys: Array<string | number>): void => {
      const selects: IData[] = selectKeys.map((key: string | number) => {
        const selcetItem = items.value.find(
          (item: IData) => item[c.keyName] === key,
        );
        return selcetItem || {};
      });
      handleRightChange(selects);
    };

    /** 左侧列表元素被用户选中 / 取消选中时触发 */
    const onLeftCheckChange = (selectKeys: Array<string | number>): void => {
      leftChecked.value = selectKeys as Array<string>;
    };

    /** 右侧列表元素被用户选中 / 取消选中时触发 */
    const onRightCheckChange = (selectKeys: Array<string | number>): void => {
      rightChecked.value = selectKeys as Array<string>;
    };
    /** 加载实体数据数据 */
    const getServiceData = async (query: string): Promise<IData[]> => {
      let data: IData[] = [];
      if (c.model.appDataEntityId) {
        try {
          const trimQuery = query.trim();
          const res = await c.getServiceData(trimQuery, props.data!);
          if (res) {
            data = res.data as IData[];
          }
        } catch (error) {
          ibiz.log.error(error);
        }
      }
      return data;
    };

    /** 搜索 */
    const onSearch = async (...args: unknown[]): Promise<void> => {
      rightSelects.value = items.value.filter(
        (item: IData) =>
          !!selectItems.value.find(
            (item2: IData) => item2[c.keyName] === item[c.keyName],
          ),
      );
      const query = (args[0] as string) || '';
      loading.value = true;
      const data = await getServiceData(query);
      if (data) {
        items.value = [
          ...rightSelects.value,
          ...data.filter(
            (item: IData) =>
              !rightSelects.value.find(
                (item2: IData) => item2[c.keyName] === item[c.keyName],
              ),
          ),
        ];
      }
      rightChecked.value = [...rightChecked.value];
      leftChecked.value = [...leftChecked.value];
      loading.value = false;
    };

    /** 搜索事件防抖 */
    const debounceSearch = debounce(onSearch, 1000);

    /** 处理左侧穿梭框搜索 */
    const onLeftAcSearch = (query: string): void => {
      debounceSearch(query);
    };

    /** 信息展示，只显示名称。 */
    const valueText = computed(() => {
      return selectItems.value
        .map(item => {
          return item[c.textName];
        })
        .join(',');
    });

    watch(
      valueText,
      (newVal, oldVal) => {
        if (newVal !== oldVal) {
          emit('infoTextChange', newVal);
        }
      },
      { immediate: true },
    );

    onMounted(() => {
      if (c.objectNameField) {
        items.value = [];
        onSearch('');
      }
    });

    /** 自定义数据项渲染函数 */
    const renderContentItem = (
      // eslint-disable-next-line no-unused-vars
      h: (type: string, vNodeProps: IParams | null, children?: string) => VNode,
      option: IParams,
    ): VNode => {
      return h('span', { title: option[c.textName] }, option[c.textName]);
    };

    return {
      c,
      ns,
      ns2,
      items,
      titles,
      loading,
      curValue,
      valueText,
      editorRef,
      curIndexs,
      childClass,
      childStyle,
      buttonTexts,
      leftChecked,
      rightChecked,
      semanticClass,
      semanticStyle,
      enableRemoteSearch,
      onSearch,
      filterMethod,
      onRightChange,
      onLeftAcSearch,
      renderContentItem,
      onLeftCheckChange,
      onRightCheckChange,
    };
  },
  render() {
    // 编辑态内容
    const editContent = (
      <div
        class={[this.ns.e('autocomplete')]}
        v-child-class={this.childClass}
        v-child-style={this.childStyle}
      >
        <TransferSelect
          ref='editorRef'
          v-model={this.curValue}
          data={this.items}
          readonly={this.readonly || this.disabled}
          left-default-checked={this.leftChecked}
          right-default-checked={this.rightChecked}
          props={{
            key: this.c.keyName,
            label: this.c.textName,
          }}
          filterable={true}
          filter-placeholder={this.c.placeHolder}
          enableRemoteSearch={this.enableRemoteSearch}
          titles={this.titles}
          button-texts={this.buttonTexts}
          format={{
            noChecked: '${total}',
            hasChecked: '${checked}/${total}',
          }}
          target-order={this.enableRemoteSearch ? 'push' : 'original'}
          loading={this.loading}
          filterMethod={this.filterMethod}
          renderContent={this.renderContentItem}
          onChange={this.onRightChange}
          onLeftCheckChange={this.onLeftCheckChange}
          onRightCheckChange={this.onRightCheckChange}
          onLeftAcSearch={this.onLeftAcSearch}
          {...this.$attrs}
        ></TransferSelect>
      </div>
    );

    return (
      <div
        style={this.semanticStyle('editor.root')}
        class={[
          this.ns.b(),
          this.ns2.b(),
          this.semanticClass('editor.root'),
          this.disabled ? this.ns.m('disabled') : '',
        ]}
      >
        {editContent}
      </div>
    );
  },
});
