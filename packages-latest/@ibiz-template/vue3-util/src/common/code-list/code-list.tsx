import {
  CodeListItem,
  calcThresholdRange,
  useCalcOrMode,
  useCalcOrModeType,
} from '@ibiz-template/runtime';
import { isNil } from 'ramda';
import {
  defineComponent,
  PropType,
  ref,
  watch,
  computed,
  normalizeStyle,
} from 'vue';
import { IAppCodeList } from '@ibiz/model-core';
import { isNumber } from 'lodash-es';
import './code-list.scss';
import { useNamespace } from '../../use';

export const IBizCodeList = defineComponent({
  name: 'IBizCodeList',
  props: {
    codeListItems: {
      type: Array<CodeListItem>,
    },
    codeList: {
      type: Object as PropType<IAppCodeList>,
      required: true,
    },
    value: {
      type: [String, Number],
    },
    convertToCodeItemText: {
      type: Boolean,
      default: true,
    },
    valueFormat: {
      type: String,
    },
    unitName: {
      type: String,
    },
    showMode: {
      type: String as PropType<'DEFAULT' | 'ICON' | 'TEXT'>,
      default: 'DEFAULT',
    },
  },
  emits: {
    infoTextChange: (_text: string) => true,
  },
  setup(props, { emit }) {
    const ns = useNamespace('code-list');
    const items = ref<IData[]>([]);
    const textSeparator = props.codeList?.textSeparator || '、';
    const valueSeparator = props.codeList?.valueSeparator || ',';

    const currentMode = computed(() => {
      if (props.codeList && props.codeList.orMode) {
        return props.codeList.orMode;
      }
      return 'STR';
    });

    const calcOrMode: useCalcOrModeType = useCalcOrMode(currentMode.value);

    watch(items, newVal => {
      let infoText = '';
      if (newVal.length > 0) {
        infoText = newVal.map(item => item.text).join(textSeparator);
      }
      emit('infoTextChange', infoText);
    });

    const findCodeListItem = (
      codelist: CodeListItem[] | undefined,
      value: string | number,
    ) => {
      if (codelist) {
        const { thresholdGroup } = props.codeList;
        // 阈值模式
        if (thresholdGroup && isNumber(Number(value))) {
          const findItem = calcThresholdRange(codelist, Number(value));
          if (findItem) {
            return findItem;
          }
        }
        // eslint-disable-next-line eqeqeq
        const findItem = codelist.find(item => item.value == value);
        if (findItem) {
          return findItem;
        }
        for (let i = 0; i < codelist.length; i++) {
          const childrenItem = findCodeListItem(
            codelist[i].children,
            value,
          ) as CodeListItem;
          if (childrenItem) {
            return childrenItem;
          }
        }
      }
    };

    watch(
      [() => props.codeListItems, () => props.value],
      ([codeListItems, value], [_oldCodeListItems, _oldValue]) => {
        if (isNil(value) || value === '') {
          // 空值置空
          items.value = [];
        } else {
          // 非空值解析代码表
          let values: string[] | number[] = [];
          const { getSelectArray } = calcOrMode;
          const arr = getSelectArray(
            value,
            props.codeList,
            codeListItems as readonly CodeListItem[],
            valueSeparator,
            props.codeList.codeItemValueNumber,
          );
          if (arr) {
            values = arr as string[] | number[];
          }
          items.value = values.map(val => {
            const findItem = findCodeListItem(codeListItems, val);
            let codeValue = val;
            if (props.convertToCodeItemText && findItem?.text) {
              codeValue = findItem.text;
            } else {
              // 未转换代码表文本时支持转换值格式化、单位
              const { valueFormat, unitName } = props;
              if (valueFormat) {
                codeValue = ibiz.util.text.format(`${codeValue}`, valueFormat);
              }
              if (unitName) {
                codeValue += unitName;
              }
            }
            return {
              text: codeValue,
              color: findItem?.color,
              textCls: findItem?.textCls,
              sysImage: findItem?.sysImage,
            };
          });
        }
      },
      { immediate: true },
    );

    const emptyText =
      props.codeList.emptyText === ibiz.i18n.t('vue3Util.common.undefined') ||
      !props.codeList.emptyText
        ? ibiz.config.common.emptyText
        : props.codeList.emptyText;

    return { items, ns, emptyText, textSeparator };
  },
  render() {
    return (
      <span class={this.ns.b()}>
        {this.items.length === 0
          ? this.emptyText
          : this.items.map((item, index) => {
              return [
                index !== 0 ? this.textSeparator : null,
                <span
                  class={[
                    this.ns.e('item'),
                    item.textCls ? item.textCls : null,
                  ]}
                  style={
                    normalizeStyle(item.color
                      ? this.ns.cssVarBlock({
                          'item-color': `${item.color}`,
                        })
                      : null)
                  }
                >
                  {this.showMode !== 'TEXT' && item.sysImage && (
                    <iBizIcon icon={item.sysImage}></iBizIcon>
                  )}
                  {this.showMode !== 'ICON' && item.text}
                </span>,
              ];
            })}
      </span>
    );
  },
});
