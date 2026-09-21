import { Ref, defineComponent, ref, watch } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import './year-range-select.scss';

export default defineComponent({
  name: 'BIYearRangeSelect',
  props: {
    value: {
      type: Array<string | number>,
      default: () => [],
    },
  },
  emits: ['change', 'visibleChange'],
  setup(props, { emit }) {
    const ns = useNamespace('bi-year-range-select');
    // 鼠标悬浮单元格
    const hoverItem = ref();
    // 气泡显隐
    const visible = ref(false);
    // 左侧年范围
    const leftYears = ref([
      new Date().getFullYear() - (new Date().getFullYear() % 10),
      new Date().getFullYear() + (9 - (new Date().getFullYear() % 10)),
    ]);
    // 右侧年范围
    const rightYears = ref([
      new Date().getFullYear() + (10 - (new Date().getFullYear() % 10)),
      new Date().getFullYear() + (19 - (new Date().getFullYear() % 10)),
    ]);

    // 开始和结束年
    const years: Ref<{
      start: undefined | number;
      end: undefined | number;
    }> = ref({
      start: undefined,
      end: undefined,
    });
    const prevYears: Ref<number[]> = ref([]);
    const nextYears: Ref<number[]> = ref([]);

    // 初始化
    const init = () => {
      leftYears.value = [
        new Date().getFullYear() - (new Date().getFullYear() % 10),
        new Date().getFullYear() + (9 - (new Date().getFullYear() % 10)),
      ];
      rightYears.value = [
        new Date().getFullYear() + (10 - (new Date().getFullYear() % 10)),
        new Date().getFullYear() + (19 - (new Date().getFullYear() % 10)),
      ];
    };
    // 计算开始到结束之间的所有年
    const computedBatchYears = (left: number, right: number) => {
      let value = left - 1;
      const tempYears = [];
      while (value <= right + 1) {
        tempYears.push(value);
        value += 1;
      }
      return tempYears;
    };

    // 左侧年范围
    prevYears.value = computedBatchYears(
      leftYears.value[0],
      leftYears.value[1],
    );

    // 右侧年范围
    nextYears.value = computedBatchYears(
      rightYears.value[0],
      rightYears.value[1],
    );

    // 监听外部传值
    watch(
      () => props.value,
      newVal => {
        if (newVal && Array.isArray(newVal) && newVal.length > 0) {
          const start = Number(newVal[0]);
          const end = Number(newVal[1]);
          if (!Number.isNaN(start) && !Number.isNaN(end)) {
            leftYears.value = [
              start - (start % 10),
              start + (9 - (start % 10)),
            ];
            years.value.start = start;
            rightYears.value = [end - (end % 10), end + (9 - (end % 10))];
            years.value.end = end;
          }
        } else {
          init();
        }
      },
      {
        immediate: true,
        deep: true,
      },
    );

    // 上一批10年
    const onReduce = (tag: string) => {
      if (tag === 'left') {
        leftYears.value[0] -= 10;
        leftYears.value[1] -= 10;
        // 左侧年范围
        prevYears.value = computedBatchYears(
          leftYears.value[0],
          leftYears.value[1],
        );
      } else {
        rightYears.value[0] -= 10;
        rightYears.value[1] -= 10;
        // 右侧年范围
        nextYears.value = computedBatchYears(
          rightYears.value[0],
          rightYears.value[1],
        );
      }
    };

    // 下一批10年
    const onAdd = (tag: string) => {
      if (tag === 'left') {
        leftYears.value[0] += 10;
        leftYears.value[1] += 10;
        // 左侧年范围
        prevYears.value = computedBatchYears(
          leftYears.value[0],
          leftYears.value[1],
        );
      } else {
        rightYears.value[0] += 10;
        rightYears.value[1] += 10;
        // 右侧年范围
        nextYears.value = computedBatchYears(
          rightYears.value[0],
          rightYears.value[1],
        );
      }
    };

    // 左箭头
    const renderLeftIcon = (tag: string) => {
      if (
        tag === 'right' &&
        leftYears.value &&
        rightYears.value &&
        leftYears.value.at(-1) === rightYears.value[0] - 1
      ) {
        return <div></div>;
      }
      return (
        <svg
          onClick={() => onReduce(tag)}
          viewBox='0 0 16 16'
          xmlns='http://www.w3.org/2000/svg'
          height='1em'
          width='1em'
          focusable='false'
          fill='currentColor'
        >
          <g
            id='aav1.icon图标/5.navigation/angle-double-left'
            stroke-width='1'
            fill-rule='evenodd'
          >
            <path
              d='M7.984 7l4.75 4.762-.832.817-3.924-3.924-3.99 3.99-.825-.836L7.973 7l.005.006L7.984 7zm0-4l4.75 4.762-.832.817-3.924-3.924-3.99 3.99-.825-.836L7.973 3l.005.006L7.984 3z'
              id='aav形状结合'
              transform='rotate(-90 7.949 7.822)'
            ></path>
          </g>
        </svg>
      );
    };

    // 右箭头
    const renderRightIcon = (tag: string) => {
      if (
        tag === 'left' &&
        leftYears.value &&
        rightYears.value &&
        leftYears.value.at(-1) === rightYears.value[0] - 1
      ) {
        return <div></div>;
      }
      return (
        <svg
          onClick={() => onAdd(tag)}
          viewBox='0 0 16 16'
          xmlns='http://www.w3.org/2000/svg'
          height='1em'
          width='1em'
          focusable='false'
          fill='currentColor'
        >
          <g
            id='aaw1.icon图标/5.navigation/angle-double-right'
            stroke-width='1'
            fill-rule='evenodd'
          >
            <path
              d='M7.984 7.3l4.75 4.762-.832.817-3.924-3.924-3.99 3.99-.825-.836L7.973 7.3l.005.006.006-.006zm0-4l4.75 4.762-.832.817-3.924-3.924-3.99 3.99-.825-.836L7.973 3.3l.005.006.006-.006z'
              id='aaw形状结合'
              transform='rotate(90 7.949 8.122)'
            ></path>
          </g>
        </svg>
      );
    };

    // 抛出事件
    const emitFunc = () => {
      emit('change', [
        years.value.start?.toString(),
        years.value.end?.toString(),
      ]);
      visible.value = false;
    };

    // 年度点击
    const onItemClick = (year: number) => {
      if (years.value.start && years.value.end) {
        years.value.start = undefined;
        years.value.end = undefined;
      }
      if (!years.value.start) {
        years.value.start = year;
      } else {
        if (year >= years.value.start) {
          years.value.end = year;
        } else {
          const tempvalue = years.value.start;
          years.value.start = year;
          years.value.end = tempvalue;
        }
        emitFunc();
      }
    };

    // 计算当前年是否被包含
    const computedSelectArea = (year: number) => {
      if (
        years.value.start &&
        years.value.end &&
        year >= years.value.start &&
        year <= years.value.end
      ) {
        return true;
      }
      return false;
    };

    // 计算当前年移入时是否被包含
    const computedHoverSelectArea = (year: number) => {
      if (years.value.start && !years.value.end && hoverItem.value) {
        let tempStart = years.value.start;
        let tempEnd = hoverItem.value;
        // 向后移动,结束时间应该为开始时间
        if (hoverItem.value < years.value.start) {
          tempEnd = years.value.start;
          tempStart = hoverItem.value;
        }
        if (year >= tempStart && year <= tempEnd) {
          return true;
        }
      }
      return false;
    };

    // 计算当前年是否被选中
    const computedSelected = (year: number) => {
      if (years.value.start === year || years.value.end === year) {
        return true;
      }
      return false;
    };

    // 是否为当前年
    const isCurYear = (year: number) => {
      return year === new Date().getFullYear();
    };

    // 单元格移入
    const onMouseHover = (year: number) => {
      hoverItem.value = year;
    };

    // 单元格移出
    const onMouseleave = () => {
      hoverItem.value = null;
    };

    // 绘制选择面板
    const renderSelect = () => {
      return (
        <div class={ns.e('date-panel')}>
          <div class={ns.em('date-panel', 'left')}>
            <div class={ns.em('date-panel', 'left-header')}>
              {renderLeftIcon('left')}
              <span>{leftYears.value?.join('-')}</span>
              {renderRightIcon('left')}
            </div>
            <div class={ns.em('date-panel', 'left-content')}>
              {prevYears.value.map((item: number) => {
                return (
                  <div
                    class={[
                      ns.em('date-panel', 'left-item'),
                      ns.is('selected', computedSelected(item)),
                      ns.is('include', computedSelectArea(item)),
                      ns.is('hover', hoverItem.value === item),
                      ns.is('curyear', isCurYear(item)),
                      ns.is('hoverinclude', computedHoverSelectArea(item)),
                    ]}
                    onClick={() => onItemClick(item)}
                    onMouseenter={() => onMouseHover(item)}
                    onMouseleave={() => onMouseleave()}
                  >
                    {item}
                  </div>
                );
              })}
            </div>
          </div>
          <div class={ns.em('date-panel', 'right')}>
            <div class={ns.em('date-panel', 'right-header')}>
              {renderLeftIcon('right')}
              <span>{rightYears.value?.join('-')}</span>
              {renderRightIcon('right')}
            </div>
            <div class={ns.em('date-panel', 'right-content')}>
              {nextYears.value.map((item: number) => {
                return (
                  <div
                    class={[
                      ns.em('date-panel', 'right-item'),
                      ns.is('selected', computedSelected(item)),
                      ns.is('include', computedSelectArea(item)),
                      ns.is('hover', hoverItem.value === item),
                      ns.is('curyear', isCurYear(item)),
                      ns.is('hoverinclude', computedHoverSelectArea(item)),
                    ]}
                    onClick={() => onItemClick(item)}
                    onMouseenter={() => onMouseHover(item)}
                    onMouseleave={() => onMouseleave()}
                  >
                    {item}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    };

    // 日期选择面板显隐回调
    const visibleChange = (tag: boolean) => {
      visible.value = tag;
      emit('visibleChange', tag);
    };

    // 关闭面板
    const handleClose = () => {
      visible.value = true;
    };

    // 打开面板
    const handleOpen = () => {
      visible.value = true;
    };

    return {
      ns,
      visible,
      renderSelect,
      handleClose,
      handleOpen,
      visibleChange,
    };
  },
  render() {
    return (
      <div class={this.ns.b()}>
        <el-popover
          v-model:visible={this.visible}
          trigger='click'
          width={600}
          placement='top'
          onAfterEnter={() => this.visibleChange(true)}
          onAfterLeave={() => this.visibleChange(false)}
        >
          {{
            default: () => {
              return this.renderSelect();
            },
            reference: () => {
              return <div></div>;
            },
          }}
        </el-popover>
      </div>
    );
  },
});
