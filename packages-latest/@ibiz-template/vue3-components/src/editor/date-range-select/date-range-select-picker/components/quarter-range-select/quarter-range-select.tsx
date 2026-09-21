import { defineComponent, ref, watch } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import './quarter-range-select.scss';

export default defineComponent({
  name: 'BIQuarterRangeSelect',
  props: {
    value: {
      type: Array<string>,
      default: () => [],
    },
  },
  emits: ['change', 'visibleChange'],
  setup(props, { emit }) {
    const ns = useNamespace('bi-quarter-range-select');
    // 左侧年度
    const leftYear = ref();
    // 右侧年度
    const rightYear = ref();
    // 开始季度时间
    const startQuarter = ref();
    // 结束季度时间
    const endQuarter = ref();
    // 鼠标悬浮单元格
    const hoverItem = ref();
    // 控制气泡显隐
    const visible = ref(false);
    // 季度列表
    const quarterItems = ['Q1', 'Q2', 'Q3', 'Q4'];

    // 根据年和季度下标计算时间
    const computedDate = (
      year: number,
      index: number,
      mode: 'START' | 'END',
    ) => {
      let month = index * 3;
      if (mode === 'START') {
        month -= 2;
      }
      const tempDate = new Date(`${year}-${month}`);
      if (mode === 'START') {
        tempDate.setDate(1);
        tempDate.setHours(0, 0, 0, 0);
      } else {
        const big = [1, 3, 5, 7, 8, 10, 12]; // 31天的月份
        if (big.includes(month)) {
          tempDate.setDate(31);
        } else {
          tempDate.setDate(30);
        }
        tempDate.setHours(23, 59, 59, 0);
      }
      return tempDate;
    };
    const init = () => {
      leftYear.value = new Date().getFullYear();
      rightYear.value = new Date().getFullYear() + 1;
      startQuarter.value = null;
      endQuarter.value = null;
    };

    // 监听外部传值
    watch(
      () => props.value,
      newVal => {
        if (newVal && Array.isArray(newVal) && newVal.length > 0) {
          const startDate = new Date(newVal[0]);
          const endDate = new Date(newVal[1]);

          leftYear.value = startDate.getFullYear();
          const tempEnd = endDate.getFullYear();
          if (leftYear.value === tempEnd) {
            rightYear.value = leftYear.value + 1;
          } else {
            rightYear.value = tempEnd;
          }
          const startIndex = Math.ceil((startDate.getMonth() + 1) / 3);
          const endIndex = Math.ceil((endDate.getMonth() + 1) / 3);

          startQuarter.value = computedDate(
            leftYear.value,
            startIndex,
            'START',
          );
          endQuarter.value = computedDate(tempEnd, endIndex, 'END');
        } else {
          init();
        }
      },
      {
        immediate: true,
        deep: true,
      },
    );

    // 上一年
    const onReduce = (tag: string) => {
      if (tag === 'left') {
        leftYear.value -= 1;
      } else {
        rightYear.value -= 1;
      }
    };

    // 下一年
    const onAdd = (tag: string) => {
      if (tag === 'left') {
        leftYear.value += 1;
      } else {
        rightYear.value += 1;
      }
    };

    // 左箭头
    const renderLeftIcon = (tag: string) => {
      if (tag === 'right' && leftYear.value === rightYear.value) {
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
      if (tag === 'left' && leftYear.value === rightYear.value) {
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

    // 抛出选中值
    const emitFunc = () => {
      emit('change', [
        startQuarter.value.toLocaleDateString(),
        endQuarter.value.toLocaleDateString(),
      ]);
      visible.value = false;
    };

    // 季度点击
    const onItemClick = (year: number, index: number) => {
      if (startQuarter.value && endQuarter.value) {
        startQuarter.value = null;
        endQuarter.value = null;
      }
      if (!startQuarter.value) {
        // 设置开始时间
        startQuarter.value = computedDate(year, index, 'START');
      } else {
        // 设置结束时间
        const tempStartYear = startQuarter.value.getFullYear(); // 开始年
        const tempStartMonth = startQuarter.value.getMonth() + 1; // 开始年开始月
        const tempStartQuarter = Math.ceil(tempStartMonth / 3); // 开始年开始季度
        if (year > tempStartYear) {
          endQuarter.value = computedDate(year, index, 'END');
        } else if (year < tempStartYear) {
          endQuarter.value = computedDate(
            tempStartYear,
            tempStartQuarter,
            'END',
          );
          startQuarter.value = computedDate(year, index, 'START');
        } else if (index >= tempStartQuarter) {
          // 同一年
          endQuarter.value = computedDate(year, index, 'END');
        } else {
          endQuarter.value = computedDate(
            tempStartYear,
            tempStartQuarter,
            'END',
          );
          startQuarter.value = computedDate(year, index, 'START');
        }

        emitFunc();
      }
    };

    // 计算当前季度是否被包含
    const computedSelectArea = (year: number, index: number) => {
      if (
        leftYear.value &&
        rightYear.value &&
        startQuarter.value &&
        endQuarter.value
      ) {
        const tempStartYear = startQuarter.value.getFullYear(); // 开始年
        const tempEndYear = endQuarter.value.getFullYear(); // 结束年
        const tempStartMonth = startQuarter.value.getMonth() + 1; // 开始年开始月
        const tempEndMonth = endQuarter.value.getMonth() + 1; // 结束年结束月
        const tempStartQuarter = Math.ceil(tempStartMonth / 3); // 开始年开始季度
        const tempEndQuarter = Math.ceil(tempEndMonth / 3); // 结束年结束季度

        if (year > tempStartYear && year < tempEndYear) {
          return true;
        }
        if (
          year === tempStartYear &&
          year < tempEndYear &&
          index >= tempStartQuarter
        ) {
          return true;
        }
        if (
          year === tempEndYear &&
          year > tempStartYear &&
          index <= tempEndQuarter
        ) {
          return true;
        }

        if (
          year === tempStartYear &&
          year === tempEndYear &&
          index <= tempEndQuarter &&
          index >= tempStartQuarter
        ) {
          return true;
        }
      }
      return false;
    };

    // 计算当前季度移入时是否被包含
    const computedHoverSelectArea = (year: number, index: number) => {
      if (
        leftYear.value &&
        rightYear.value &&
        startQuarter.value &&
        !endQuarter.value &&
        hoverItem.value
      ) {
        const tempHoverYear = hoverItem.value.getFullYear(); // 移入年
        const tempHoverMonth = hoverItem.value.getMonth() + 1; // 移入年移入月
        const tempHoverQuarter = Math.ceil(tempHoverMonth / 3); // 移入年移入季度
        let tempStart = startQuarter.value;
        let tempEnd = hoverItem.value;
        const startDateYear = startQuarter.value.getFullYear(); // 开始年
        const startDateMonth = startQuarter.value.getMonth() + 1;
        const startDateQuarter = Math.ceil(startDateMonth / 3);
        // 向后移动,结束时间应该为开始时间
        if (
          tempHoverYear <= startDateYear &&
          tempHoverQuarter <= startDateQuarter
        ) {
          tempEnd = startQuarter.value;
          tempStart = hoverItem.value;
        }
        const tempStartYear = tempStart.getFullYear(); // 开始年
        const tempEndYear = tempEnd.getFullYear(); // 结束年
        const tempStartMonth = tempStart.getMonth() + 1; // 开始年开始月
        const tempEndMonth = tempEnd.getMonth() + 1; // 结束年结束月
        const tempStartQuarter = Math.ceil(tempStartMonth / 3); // 开始年开始季度
        const tempEndQuarter = Math.ceil(tempEndMonth / 3); // 结束年结束季度

        if (year > tempStartYear && year < tempEndYear) {
          return true;
        }
        if (
          year === tempStartYear &&
          year < tempEndYear &&
          index >= tempStartQuarter
        ) {
          return true;
        }
        if (
          year === tempEndYear &&
          year > tempStartYear &&
          index <= tempEndQuarter
        ) {
          return true;
        }
        if (
          tempHoverYear <= startDateYear &&
          tempHoverQuarter < startDateQuarter &&
          year === tempHoverYear &&
          index >= tempHoverQuarter &&
          index <= startDateQuarter
        ) {
          return true;
        }
        if (
          tempHoverYear >= startDateYear &&
          tempHoverQuarter > startDateQuarter &&
          year === tempHoverYear &&
          index <= tempHoverQuarter &&
          index >= startDateQuarter
        ) {
          return true;
        }
      }
      return false;
    };

    // 计算当前季度是否被选中
    const computedSelected = (year: number, index: number) => {
      if (startQuarter.value) {
        const tempStartYear = startQuarter.value.getFullYear(); // 开始年
        const tempStartMonth = startQuarter.value.getMonth() + 1; // 开始年开始月
        const tempStartQuarter = Math.ceil(tempStartMonth / 3); // 开始年开始季度
        if (year === tempStartYear && tempStartQuarter === index) {
          return true;
        }
      }
      if (endQuarter.value) {
        const tempEndYear = endQuarter.value.getFullYear(); // 结束年
        const tempEndMonth = endQuarter.value.getMonth() + 1; // 结束年结束月
        const tempEndQuarter = Math.ceil(tempEndMonth / 3); // 结束年结束季度
        if (year === tempEndYear && tempEndQuarter === index) {
          return true;
        }
      }
      return false;
    };

    // 计算移入
    const computedHover = (year: number, index: number) => {
      if (hoverItem.value) {
        return (
          hoverItem.value.getTime() ===
          computedDate(year, index, 'START').getTime()
        );
      }
      return false;
    };

    // 计算是否为当前季度
    const computedCurQuarter = (year: number, index: number) => {
      const curDate = computedDate(year, index, 'START');
      const toDay = new Date();
      const tempStartMonth = curDate.getMonth() + 1; // 开始年开始月
      const tempStartQuarter = Math.ceil(tempStartMonth / 3); // 开始年开始季度
      const toYear = toDay.getFullYear();
      const tempToDayMonth = toDay.getMonth() + 1; // 开始年开始月
      const tempToDayQuarter = Math.ceil(tempToDayMonth / 3); // 开始年开始季度
      return year === toYear && tempStartQuarter === tempToDayQuarter;
    };

    // 单元格移入
    const onMouseHover = (year: number, index: number) => {
      hoverItem.value = computedDate(year, index, 'START');
    };
    // 单元格移出
    const onMouseleave = () => {
      hoverItem.value = null;
    };

    // 绘制季度选择面板
    const renderSelect = () => {
      return (
        <div class={ns.e('date-panel')}>
          <div class={ns.em('date-panel', 'left')}>
            <div class={ns.em('date-panel', 'left-header')}>
              {renderLeftIcon('left')}
              <span>
                {leftYear.value}
                {ibiz.i18n.t('editor.dateRangeSelect.year')}
              </span>
              {renderRightIcon('left')}
            </div>
            <div class={ns.em('date-panel', 'left-content')}>
              {quarterItems.map((item: string, index: number) => {
                return (
                  <div
                    class={[
                      ns.em('date-panel', 'left-item'),
                      ns.is(
                        'include',
                        computedSelectArea(leftYear.value, index + 1),
                      ),
                      ns.is(
                        'selected',
                        computedSelected(leftYear.value, index + 1),
                      ),
                      ns.is(
                        'hoverinclude',
                        computedHoverSelectArea(leftYear.value, index + 1),
                      ),
                      ns.is(
                        'curquarter',
                        computedCurQuarter(leftYear.value, index + 1),
                      ),
                      ns.is('hover', computedHover(leftYear.value, index + 1)),
                    ]}
                    onClick={() => onItemClick(leftYear.value, index + 1)}
                    onMouseenter={() => onMouseHover(leftYear.value, index + 1)}
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
              <span>
                {rightYear.value}
                {ibiz.i18n.t('editor.dateRangeSelect.year')}
              </span>
              {renderRightIcon('right')}
            </div>
            <div class={ns.em('date-panel', 'right-content')}>
              {quarterItems.map((item: string, index: number) => {
                return (
                  <div
                    class={[
                      ns.em('date-panel', 'right-item'),
                      ns.is(
                        'selected',
                        computedSelected(rightYear.value, index + 1),
                      ),
                      ns.is(
                        'include',
                        computedSelectArea(rightYear.value, index + 1),
                      ),
                      ns.is(
                        'hoverinclude',
                        computedHoverSelectArea(rightYear.value, index + 1),
                      ),
                      ns.is(
                        'curquarter',
                        computedCurQuarter(rightYear.value, index + 1),
                      ),
                      ns.is('hover', computedHover(rightYear.value, index + 1)),
                    ]}
                    onClick={() => onItemClick(rightYear.value, index + 1)}
                    onMouseenter={() =>
                      onMouseHover(rightYear.value, index + 1)
                    }
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

    // 关闭pop
    const handleClose = () => {
      visible.value = false;
    };

    // 打开pop
    const handleOpen = () => {
      visible.value = true;
    };

    // 抛出pop显隐事件
    const visibleChange = (_visible: boolean) => {
      emit('visibleChange', _visible);
    };

    return {
      ns,
      renderSelect,
      visible,
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
          popper-class={this.ns.b('quarter-pop')}
          placement='right'
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
