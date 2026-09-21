import { defineComponent, ref, watch } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import './week-range-select.scss';

export default defineComponent({
  props: {
    value: {
      type: Array<string>,
      default: () => [],
    },
  },
  emits: ['change', 'visibleChange'],
  setup(props, { emit }) {
    const ns = useNamespace('bi-week-range');
    const curValue = ref(); // 当前选择值
    const weekRangeRef = ref(); // 日期选择Ref
    const visible = ref(false); // 控制面板显示
    // 获取一下今天的日期：
    const Today = dayjs(new Date()).format('YYYY/MM/DD');
    // 开始时间
    const start = ref();
    // 结束时间
    const end = ref();
    // 是否点击过，用来判断当前点击的值是赋值给开始还是结束的
    let clicked = false;
    // 鼠标悬浮单元格
    const hoverItem = ref();

    // 初始化选择时间
    const initSelectDate = () => {
      start.value = null;
      end.value = null;
    };

    // 监听外部传进来的值
    watch(
      () => props.value,
      newVal => {
        if (newVal && Array.isArray(newVal)) {
          start.value = new Date(newVal[0]);
          end.value = new Date(newVal[1]);
        } else {
          initSelectDate();
        }
      },
      {
        immediate: true,
        deep: true,
      },
    );

    // 计算指定时间所在周的周天结束时间
    const computedDateWeekSunday = (date: Date) => {
      const day = date.getDay();
      let weekday = day;
      if (day === 0) {
        weekday = 7;
      }
      const sunday = date.getTime() + (7 - weekday) * 24 * 60 * 60 * 1000;
      const tempEnd = new Date(sunday);
      tempEnd.setHours(23, 59, 59, 0);
      return tempEnd;
    };

    // 计算指定时间所在周的周一开始时间
    const computedDateWeekMonday = (date: Date) => {
      const day = date.getDay();
      let weekday = day;
      if (day === 0) {
        weekday = 7;
      }
      const monday = date.getTime() - (weekday - 1) * 24 * 60 * 60 * 1000;
      const tempStart = new Date(monday);
      tempStart.setHours(0, 0, 0, 0);
      return tempStart;
    };

    // 是否处于所选时间点区间内
    const isInRange = (cell: IData) => {
      const { date } = cell;
      const curTime = date.getTime();

      if (start.value && end.value) {
        const startTime = start.value.getTime();
        const endTime = end.value.getTime();
        if (curTime >= startTime && curTime <= endTime) {
          return true;
        }
      }
      return false;
    };

    // 判断是否是终点日期所在周
    const isEnded = (cell: IData) => {
      const { date } = cell;
      if (end.value) {
        const sunday = computedDateWeekSunday(end.value);
        const monday = computedDateWeekMonday(end.value);
        if (
          date.getTime() >= monday.getTime() &&
          date.getTime() <= sunday.getTime()
        ) {
          return true;
        }
        return false;
      }
    };

    // 判断是否是起始日期所在周
    const isStarted = (cell: IData) => {
      const { date } = cell;
      if (start.value) {
        const sunday = computedDateWeekSunday(start.value);
        const monday = computedDateWeekMonday(start.value);
        if (
          date.getTime() >= monday.getTime() &&
          date.getTime() <= sunday.getTime()
        ) {
          return true;
        }
        return false;
      }
    };

    // 是否是今日
    const isToday = (cell: IData) => {
      const format = 'YYYY/MM/DD';
      return cell.dayjs.format(format) === Today;
    };

    // 选择值改变
    // 不使用date-picker抛出的值，往外抛的值由手动进行计算
    const handleChange = () => {
      if (start.value && end.value) {
        const startDate = start.value.toLocaleDateString();
        const endDate = end.value.toLocaleDateString();
        emit('change', [startDate, endDate]);
      }
    };

    // 日期点击
    const cellClick = (cell: IData) => {
      const { date } = cell;
      if (!clicked) {
        // 点击第一次，是选择开始时间,获取开始时间与开始周
        initSelectDate();
        start.value = computedDateWeekMonday(date);
        clicked = true;
      } else {
        // 计算结束时间和结束周
        const tempSunday = computedDateWeekSunday(date);
        const tempMonday = computedDateWeekMonday(date);
        if (tempMonday.getTime() > start.value.getTime()) {
          end.value = tempSunday;
        } else {
          end.value = computedDateWeekSunday(start.value);
          start.value = tempMonday;
        }
        clicked = false;
      }
    };

    // 周范围选择器点击
    const weekRangeClick = () => {
      if (visible.value) {
        weekRangeRef.value.handleClose();
      } else {
        weekRangeRef.value.handleOpen();
      }
    };

    // 日期选择面板显隐回调
    const visibleChange = (tag: boolean) => {
      visible.value = tag;
      emit('visibleChange', tag);
    };

    // 打开面板
    const handleClose = () => {
      weekRangeRef.value.handleClose();
    };

    // 关闭面板
    const handleOpen = () => {
      weekRangeRef.value.handleOpen();
    };

    const isHover = (cell: IData) => {
      const { date } = cell;
      if (hoverItem.value) {
        const monday = computedDateWeekMonday(hoverItem.value);
        const sunday = computedDateWeekSunday(hoverItem.value);
        const currentTime = date.getTime();
        if (
          monday.getTime() <= currentTime &&
          sunday.getTime() >= currentTime
        ) {
          return true;
        }
      }
      return false;
    };

    // 移入时是否处于所选时间点区间内
    const isInHoverRange = (cell: IData) => {
      const { date } = cell;
      const curTime = date.getTime();

      if (start.value && !end.value && hoverItem.value) {
        const curHoverTime = hoverItem.value?.getTime();
        let tempStart = start.value;
        let tempEnd = hoverItem.value;
        // 向后移动,结束时间应该为开始时间
        if (curHoverTime < start.value.getTime()) {
          tempEnd = start.value;
          tempStart = hoverItem.value;
        }
        const startTime = tempStart.getTime();
        const endTime = tempEnd.getTime();
        if (curTime >= startTime && curTime <= endTime) {
          return true;
        }

        return isHover(cell);
      }
      return false;
    };

    const onMouseHover = (cell: IData) => {
      const { date } = cell;
      hoverItem.value = date;
    };

    const onMouseleave = () => {
      hoverItem.value = null;
    };
    const isMonday = (cell: IData) => {
      const { date } = cell;
      return date.getDay() === 1;
    };
    const isSunday = (cell: IData) => {
      const { date } = cell;
      return date.getDay() === 0;
    };

    return {
      ns,
      curValue,
      weekRangeRef,
      isInRange,
      isInHoverRange,
      isEnded,
      isStarted,
      isToday,
      weekRangeClick,
      cellClick,
      visibleChange,
      handleChange,
      handleClose,
      handleOpen,
      isHover,
      isMonday,
      isSunday,
      onMouseHover,
      onMouseleave,
    };
  },
  render() {
    return (
      <div class={this.ns.b()} onClick={this.weekRangeClick}>
        <el-date-picker
          ref='weekRangeRef'
          v-model={this.curValue}
          popper-class={this.ns.b('picker-pop')}
          type='daterange'
          onChange={this.handleChange}
          onVisibleChange={this.visibleChange}
        >
          {{
            default: (cell: IData) => {
              return (
                <div
                  class={[
                    this.ns.e('cell-item'),
                    this.ns.is(
                      'inrange',
                      this.isInRange(cell) &&
                        !this.isEnded(cell) &&
                        !this.isStarted(cell),
                    ),
                    this.ns.is(
                      'inhoverrange',
                      this.isInHoverRange(cell) &&
                        !this.isEnded(cell) &&
                        !this.isStarted(cell),
                    ),
                    this.ns.is(
                      'hover',
                      this.isHover(cell) &&
                        !this.isEnded(cell) &&
                        !this.isStarted(cell),
                    ),
                    this.ns.is('left', cell.column === 0),
                    this.ns.is('right', cell.column === 6),
                    this.ns.is('ended', this.isEnded(cell)),
                    this.ns.is('started', this.isStarted(cell)),
                    this.ns.is('monday', this.isMonday(cell)),
                    this.ns.is('sunday', this.isSunday(cell)),
                  ]}
                  onMouseenter={() => this.onMouseHover(cell)}
                  onMouseleave={() => this.onMouseleave()}
                  onClick={() => this.cellClick(cell)}
                >
                  <span
                    class={[
                      this.ns.em('cell-item', 'text'),
                      this.ns.is('today', this.isToday(cell)),
                    ]}
                  >
                    {cell.text}
                  </span>
                </div>
              );
            },
          }}
        </el-date-picker>
      </div>
    );
  },
});
