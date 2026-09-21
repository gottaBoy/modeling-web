import {
  Ref,
  ref,
  watch,
  onMounted,
  defineComponent,
  onBeforeUnmount,
} from 'vue';
import {
  useNamespace,
  useSemanticNode,
  getDateRangeSelectEmits,
  getDateRangeSelectProps,
} from '@ibiz-template/vue3-util';
import dayjs from 'dayjs';
import { DateRangeSelectEditorController } from '../date-range-select.controller';
import quarterRangeSelect from './components/quarter-range-select/quarter-range-select';
import yearRangeSelect from './components/year-range-select/year-range-select';
import weekRangeSelect from './components/week-range-select/week-range-select';
import './date-range-select.scss';

/**
 * 时间范围选择（扩展）
 *
 * @description 使用el-date-picker组件封装，用于实现天、周、月、季度、年等不同时间单位的时间范围选择功能。基于`时间范围选择器`编辑器进行扩展，编辑器样式代码名称为：SWITCHUNIT
 * @primary
 * @editorparams {"name":"switchunit","parameterType":"boolean","defaultvalue":true,"description":"是否显示时间单位选择功能组件，该组件主要用于切换时间单位，根据不同的时间单位抛出不同的开始与结束时间值"}
 * @editorparams {"name":"defaultunit","parameterType":"'DAY' | 'WEEK' | 'MONTH' | 'QUARTER' | 'YEAR'","defaultvalue":"'DAY'","description":"默认时间单位，配置不同时间单位将展示对应的时间选择组件"}
 * @editorparams {"name":"emitmode","parameterType":"'DEFAULT' | 'TIME'","defaultvalue":"'DEFAULT'","description":"抛值模式。当参数值为 'DEFAULT' 且时间单位为 'DAY' 时，若当前时间为 '2025/04/23'，开始时间为 '2025/04/22'、结束时间为 '2025/04/24'，此时若时间类型为固定时间，将开始与结束时间的时间戳除以 1000 后按 `{start:1745251200,end:1745510399,unit:'DAY',type:'STATIC'}` 格式抛值，若为动态时间则按 `{start:-1,end:1,unit:'DAY',type:'DYNAMIC'}` 格式抛值，以当前时间与开始、结束时间的时间间隔体现；而当参数值为 'TIME' 时，将开始与结束时间按本地时间格式转换为字符串，按 `{start:'2025/4/22 00:00:00',end:'2025/4/24 23:59:59',unit:'DAY',type:'STATIC'}` 格式抛值"}
 * @ignoreprops autoFocus | overflowMode
 * @ignoreemits blur | focus | enter | infoTextChange
 */
export const IBizDateRangeSelect = defineComponent({
  name: 'IBizDateRangeSelect',
  components: {
    'bi-quarter-range-select': quarterRangeSelect,
    'bi-year-range-select': yearRangeSelect,
    'bi-week-range-select': weekRangeSelect,
  },
  props: getDateRangeSelectProps<DateRangeSelectEditorController>(),
  emits: getDateRangeSelectEmits(),
  setup(props, { emit }) {
    const ns = useNamespace('date-range-select');
    // 控制器
    const c = props.controller;
    const { semanticClass, semanticStyle } = useSemanticNode(c);
    // 子类类名透传
    const childClass = [
      {
        class: semanticClass('editor.label'),
        selector: `.${ns.e('label')}`,
      },
      {
        class: semanticClass('editor.dateType'),
        selector: `.${ns.em('date-range', 'editor')}`,
      },
      {
        class: semanticClass('editor.dateType.suffix'),
        selector: `.${ns.em('date-range', 'editor-suffix')}`,
      },
      {
        class: semanticClass('editor.dateUnit'),
        selector: `.el-input__inner`,
      },
      {
        class: semanticClass('editor.dateUnit.suffix'),
        selector: '.el-input__suffix',
      },
    ];

    // 子类样式透传
    const childStyle = [
      {
        style: semanticStyle('editor.label'),
        selector: `.${ns.e('label')}`,
      },
      {
        style: semanticStyle('editor.dateType'),
        selector: `.${ns.em('date-range', 'editor')}`,
      },
      {
        style: semanticStyle('editor.dateType.suffix'),
        selector: `.${ns.em('date-range', 'editor-suffix')}`,
      },
      {
        style: semanticStyle('editor.dateUnit'),
        selector: `.el-input__inner`,
      },
      {
        style: semanticStyle('editor.dateUnit.suffix'),
        selector: '.el-input__suffix',
      },
    ];
    // 时间单位
    const unitValue: Ref<'DAY' | 'WEEK' | 'MONTH' | 'QUARTER' | 'YEAR'> = ref(
      c.defaultUnit,
    );
    //  当前时间值
    const curValue = ref();
    // 选择的时间类型值
    const timeType: Ref<'STATIC' | 'DYNAMIC'> = ref('DYNAMIC');
    // 时间选择面板Ref
    const editorRef: Ref<IData> = ref({
      DYNAMIC: null,
      STATIC: null,
    });

    // 气泡显示统一控制
    const popVisible = ref({
      ALL: false,
      STATIC: false,
      DYNAMIC: false,
    });

    // 选择时间后的显示文本
    const selectValue = ref();

    // 是否是内部点击关闭
    const isOverClose = ref(false);
    // 时间单位类型
    const units = [
      {
        value: 'DAY',
        label: ibiz.i18n.t('editor.dateRangeSelect.day'),
      },
      {
        value: 'WEEK',
        label: ibiz.i18n.t('editor.dateRangeSelect.week'),
      },
      {
        value: 'MONTH',
        label: ibiz.i18n.t('editor.dateRangeSelect.month'),
      },
      {
        value: 'QUARTER',
        label: ibiz.i18n.t('editor.dateRangeSelect.quarter'),
      },
      {
        value: 'YEAR',
        label: ibiz.i18n.t('editor.dateRangeSelect.year'),
      },
    ];
    // 选择时间类型
    const timeTypes = [
      {
        caption: ibiz.i18n.t('editor.dateRangeSelect.static'),
        type: 'STATIC',
      },
      {
        caption: ibiz.i18n.t('editor.dateRangeSelect.dynamic'),
        type: 'DYNAMIC',
      },
    ];

    /**
     *
     * 处理选择时间转成文本
     */
    const handleTimeToText = (
      type: 'DYNAMIC' | 'STATIC',
      value: string[],
      start: number,
      end: number,
    ) => {
      selectValue.value = c.handleTimeToText(
        type,
        unitValue.value,
        value,
        start,
        end,
      );
    };

    // 初始化时间
    const initDate = () => {
      curValue.value = c.initDefaultDate(unitValue.value);
      const { start, end, emitStart, emitEnd } =
        props.controller.computedDateTypesTime(
          unitValue.value,
          'DYNAMIC',
          curValue.value[0],
          curValue.value[1],
        );
      handleTimeToText('DYNAMIC', curValue.value, start, end);
      emit('change', {
        unit: unitValue.value,
        type: 'DYNAMIC',
        start: emitStart,
        end: emitEnd,
      });
    };

    // 时间类型改变
    const unitChange = () => {
      initDate();
    };

    // 绘制时间单位
    const renderDateUnit = () => {
      return (
        <div class={ns.e('date-unit')}>
          <span class={[ns.em('date-unit', 'label'), ns.e('label')]}>
            {ibiz.i18n.t('editor.dateRangeSelect.dateUnit')}
          </span>
          <div class={ns.em('date-unit', 'editor')}>
            <el-select
              v-model={unitValue.value}
              onChange={unitChange}
              class={ns.em('date-unit', 'editor-select')}
              popper-class={[
                ns.b('date-unit-popper'),
                semanticClass('editor.dateUnit.popup'),
              ]}
              popper-style={semanticStyle('editor.dateUnit.popup')}
            >
              {units.map((item: IData) => {
                return (
                  <el-option
                    class={[
                      ns.em('date-unit', 'item'),
                      semanticClass('editor.dateUnit.popup.item', {
                        item,
                      }),
                    ]}
                    style={semanticStyle('editor.dateUnit.popup.item', {
                      item,
                    })}
                    key={item.value}
                    value={item.value}
                    label={item.label}
                  >
                    {{
                      default: () => {
                        return item.label;
                      },
                    }}
                  </el-option>
                );
              })}
            </el-select>
          </div>
        </div>
      );
    };

    // 绘制时间选择值呈现
    const renderSelectValue = () => {
      return <div class={ns.e('select-value')}>{selectValue.value}</div>;
    };

    // 时间类型点击
    const onTypeClick = (type: 'DYNAMIC' | 'STATIC', event: MouseEvent) => {
      event.stopPropagation();
      event.preventDefault();
      if (popVisible.value.STATIC || popVisible.value.DYNAMIC) {
        popVisible.value[timeType.value] = false;
        isOverClose.value = true;
        editorRef.value[type].handleClose();
      } else {
        isOverClose.value = true;
        timeType.value = type;
        popVisible.value[type] = true;
        editorRef.value[type].handleOpen();
      }
      if (
        curValue.value &&
        Array.isArray(curValue.value) &&
        curValue.value.length > 0
      ) {
        const { start, end } = props.controller.computedDateTypesTime(
          unitValue.value,
          timeType.value,
          curValue.value[0],
          curValue.value[1],
        );
        handleTimeToText(timeType.value, curValue.value, start, end);
      }
    };

    // 选择时间回调
    const onTimeChange = (type: 'DYNAMIC' | 'STATIC', value: string[]) => {
      popVisible.value[type] = false;
      popVisible.value.ALL = false;
      curValue.value = value;
      const { start, end, emitStart, emitEnd } =
        props.controller.computedDateTypesTime(
          unitValue.value,
          type,
          value[0],
          value[1],
        );
      handleTimeToText(type, value, start, end);
      emit('change', {
        start: emitStart,
        end: emitEnd,
        unit: unitValue.value,
        type: timeType.value,
      });
    };

    // 时间选择面板显隐回调
    const datePanelVisible = (type: 'DYNAMIC' | 'STATIC', visible: boolean) => {
      if (!visible) {
        popVisible.value[type] = false;
        if (
          !popVisible.value.STATIC &&
          !popVisible.value.DYNAMIC &&
          !isOverClose.value
        ) {
          popVisible.value.ALL = false;
        } else {
          isOverClose.value = false;
          if (props.value?.type && timeType.value !== props.value.type) {
            popVisible.value.ALL = false;
            onTimeChange(timeType.value, curValue.value);
          }
        }
      }
    };

    // 打开时间类型选择列表气泡
    const onOpen = (_event: MouseEvent) => {
      _event.stopPropagation();
      _event.preventDefault();
      popVisible.value.ALL = !popVisible.value.ALL;
    };

    // 设置ref
    const setRef = (tag: 'DYNAMIC' | 'STATIC', el: Element) => {
      editorRef.value[tag] = el;
    };

    // 绘制不同类型的范围选择组件
    const renderTimeRange = (type: 'DYNAMIC' | 'STATIC') => {
      // 季度
      if (unitValue.value === 'QUARTER') {
        return (
          <bi-quarter-range-select
            ref={(el: Element) => setRef(type, el)}
            class={[
              ns.em('date-type', 'editor'),
              ns.em('date-type', 'quarter'),
            ]}
            value={curValue.value}
            onVisibleChange={(visible: boolean) =>
              datePanelVisible(type, visible)
            }
            onChange={(value: string[]) => onTimeChange(type, value)}
          ></bi-quarter-range-select>
        );
      }
      // 年
      if (unitValue.value === 'YEAR') {
        return (
          <bi-year-range-select
            ref={(el: Element) => setRef(type, el)}
            class={[ns.em('date-type', 'editor'), ns.em('date-type', 'year')]}
            value={curValue.value}
            onVisibleChange={(visible: boolean) =>
              datePanelVisible(type, visible)
            }
            onChange={(value: string[]) => onTimeChange(type, value)}
          ></bi-year-range-select>
        );
      }
      // 周
      if (unitValue.value === 'WEEK') {
        return (
          <bi-week-range-select
            ref={(el: Element) => setRef(type, el)}
            class={[ns.em('date-type', 'editor'), ns.em('date-type', 'week')]}
            value={curValue.value}
            onChange={(value: string[]) => onTimeChange(type, value)}
            onVisibleChange={(visible: boolean) =>
              datePanelVisible(type, visible)
            }
          ></bi-week-range-select>
        );
      }
      // 月和日
      const unitType = unitValue.value === 'DAY' ? 'daterange' : 'monthrange';
      const format = unitValue.value === 'DAY' ? 'YYYY-MM-DD' : 'YYYY-MM';
      return (
        <el-date-picker
          ref={(el: Element) => setRef(type, el)}
          v-model={curValue.value}
          class={ns.em('date-type', 'editor')}
          type={unitType}
          format='YYYY-MM-DD'
          value-format={format}
          onVisibleChange={(visible: boolean) =>
            datePanelVisible(type, visible)
          }
          onChange={(value: string[]) => onTimeChange(type, value)}
        ></el-date-picker>
      );
    };

    // 绘制时间范围
    const renderDateRange = () => {
      return (
        <div class={ns.e('date-range')}>
          <div class={[ns.em('date-range', 'label'), ns.e('label')]}>
            {ibiz.i18n.t('editor.dateRangeSelect.daterange')}
          </div>
          <el-popover
            visible={
              popVisible.value.ALL ||
              popVisible.value.DYNAMIC ||
              popVisible.value.STATIC
            }
            trigger='click'
            width='240px'
            popper-class={[
              ns.b('date-type-popper'),
              ns.b('date-range-select'),
              semanticClass('editor.dateType.popup'),
            ]}
            popper-style={semanticStyle('editor.dateType.popup')}
          >
            {{
              reference: () => {
                return (
                  <div class={ns.em('date-range', 'editor')} onClick={onOpen}>
                    <span class={ns.em('select', 'time-caption')}>
                      {renderSelectValue()}
                    </span>
                    <i
                      class={[
                        'fa fa-angle-down',
                        ns.em('date-range', 'editor-suffix'),
                      ]}
                      aria-hidden='true'
                    ></i>
                  </div>
                );
              },
              default: () => {
                return (
                  <div class={ns.e('date-type')}>
                    {timeTypes.map((item: IData) => {
                      return (
                        <div
                          class={[
                            ns.em('date-type', 'item'),
                            semanticClass('editor.dateType.popup.item', {
                              item,
                            }),
                          ]}
                          style={semanticStyle('editor.dateType.popup.item', {
                            item,
                          })}
                          onClick={(event: MouseEvent) =>
                            onTypeClick(item.type, event)
                          }
                        >
                          <span class={ns.em('date-type', 'item-caption')}>
                            {item.caption}
                          </span>
                          <span class={ns.em('date-type', 'item-icon')}>
                            {item.type === timeType.value && (
                              <svg
                                viewBox='0 0 16 16'
                                xmlns='http://www.w3.org/2000/svg'
                                height='1em'
                                width='1em'
                                focusable='false'
                              >
                                <g
                                  id='agctips/check'
                                  stroke-width='1'
                                  fill-rule='evenodd'
                                >
                                  <path
                                    id='agc路径-12'
                                    d='M6.012 11.201L1.313 6.832l-.817.879 5.54 5.15 9.304-9.163-.842-.855z'
                                  ></path>
                                </g>
                              </svg>
                            )}
                            <i class='fa fa-angle-right' aria-hidden='true'></i>
                          </span>
                          {renderTimeRange(item.type)}
                        </div>
                      );
                    })}
                  </div>
                );
              },
            }}
          </el-popover>
        </div>
      );
    };

    // 设置气泡关闭
    const setPopVisible = () => {
      if (!popVisible.value.DYNAMIC && !popVisible.value.STATIC) {
        popVisible.value.ALL = false;
      }
    };

    // 监听外部值改变
    watch(
      () => props.value,
      newVal => {
        if (newVal && Object.keys(newVal).length > 0) {
          const { start, end, unit, type } = newVal as IData;
          unitValue.value = unit;
          timeType.value = type;
          // 时间转间隔
          if (props.controller.emitMode === 'TIME') {
            if (unit === 'YEAR') {
              curValue.value = [
                new Date(String(start)).getFullYear(),
                new Date(String(end)).getFullYear(),
              ];
            } else {
              curValue.value = [
                dayjs(start).format('YYYY-MM-DD'),
                dayjs(end).format('YYYY-MM-DD'),
              ];
            }

            const { start: _start, end: _end } =
              props.controller.computedDateTypesTime(
                unitValue.value,
                type,
                start,
                end,
              );
            handleTimeToText(timeType.value, curValue.value, _start, _end);
          } else {
            curValue.value = c.computedDynamicTimeToDate(
              unitValue.value,
              timeType.value,
              start,
              end,
            );
            handleTimeToText(timeType.value, curValue.value, start, end);
          }
        } else {
          initDate();
        }
      },
      {
        immediate: true,
      },
    );

    onMounted(() => {
      window.addEventListener('click', setPopVisible);
    });
    onBeforeUnmount(() => {
      window.removeEventListener('click', setPopVisible);
    });
    return {
      c,
      ns,
      childClass,
      childStyle,
      semanticClass,
      semanticStyle,
      onOpen,
      renderDateUnit,
      renderDateRange,
    };
  },
  render() {
    return (
      <div
        style={this.semanticStyle('editor.root')}
        class={[this.ns.b(), this.semanticClass('editor.root')]}
        v-child-class={this.childClass}
        v-child-style={this.childStyle}
        onClick={this.onOpen}
      >
        {this.c.switchUnit && this.renderDateUnit()}
        {this.renderDateRange()}
      </div>
    );
  },
});
