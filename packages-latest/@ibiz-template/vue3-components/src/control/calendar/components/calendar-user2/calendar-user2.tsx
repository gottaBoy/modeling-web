/* eslint-disable no-restricted-syntax */
/* eslint-disable no-continue */
/* eslint-disable array-callback-return */
import dayjs from 'dayjs';
import { PropType, computed, defineComponent } from 'vue';
import {
  useNamespace,
  UseSemanticClassReturn,
  UseSemanticStyleReturn,
} from '@ibiz-template/vue3-util';
import { ICalendarItemData } from '@ibiz-template/runtime';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import { IUILegend } from '../../calendar';
import './calendar-user2.scss';

dayjs.extend(quarterOfYear);

export const CalendarUser2 = defineComponent({
  name: 'CalendarUser2',
  props: {
    title: {
      type: String,
      default: () => ibiz.i18n.t('control.calendar.title'),
    },
    items: {
      type: Array as PropType<ICalendarItemData[]>,
      default: () => [],
    },
    legends: {
      type: Array as PropType<IUILegend[]>,
      default: () => [],
    },
    timeRange: {
      required: true,
      type: Array as PropType<Date[]>,
      validator: (range: Date[]) => range.length === 2,
    },
    semanticClass: {
      type: Function as PropType<UseSemanticClassReturn>,
      required: true,
    },
    semanticStyle: {
      type: Function as PropType<UseSemanticStyleReturn>,
      required: true,
    },
  },
  emits: {
    legendClick: (_legend: IUILegend) => true,
    timeRangeChange: (_range: Date[]) => true,
  },
  setup(props, { emit }) {
    const ns = useNamespace('calendar-user2');

    const range = computed({
      get() {
        return props.timeRange;
      },
      set(date: Date[]) {
        emit('timeRangeChange', date);
      },
    });

    const legends = computed(() => {
      return props.legends.filter(legend => legend.isShow);
    });

    /**
     * 构建条目索引 Map：日期 -> 条目列表
     */
    const itemsByDate = computed(() => {
      const map = new Map<string, ICalendarItemData[]>();
      for (const item of props.items) {
        if (!item.beginTime && !item.endTime) continue;
        // 获取条目覆盖的所有日期
        const start = dayjs(item.beginTime || item.endTime);
        const end = dayjs(item.endTime || item.beginTime);
        const daysDiff = end.diff(start, 'day') + 1;

        for (let i = 0; i < daysDiff; i++) {
          const dateKey = start.add(i, 'day').format('YYYY-MM-DD');
          if (!map.has(dateKey)) map.set(dateKey, []);
          map.get(dateKey)!.push(item);
        }
      }
      return map;
    });

    // 日期标记计算（依赖索引，O(1) 查询）
    const dateMarkersMap = computed(() => {
      const map = new Map<
        string,
        (IUILegend & { items: ICalendarItemData[] })[]
      >();
      if (!props.timeRange.length) return map;
      const [startDate, endDate] = props.timeRange;
      let current = dayjs(startDate);
      while (current.isBefore(endDate) || current.isSame(endDate, 'day')) {
        const dateKey = current.format('YYYY-MM-DD');
        const dateItems = itemsByDate.value.get(dateKey) || [];

        // 只处理当天有 items 的日期
        if (dateItems.length > 0) {
          const marks = legends.value
            .map(legend => ({
              ...legend,
              items: dateItems.filter(item => item.itemType === legend.id),
            }))
            .filter(legend => legend.items.length);

          if (marks.length) {
            map.set(dateKey, marks);
          }
        }
        current = current.add(1, 'day');
      }
      return map;
    });

    /**
     * 月份
     */
    const months = computed(() => {
      if (!props.timeRange.length) return [];
      const [startDate, endDate] = props.timeRange;
      const monthsList: Date[] = [];
      let current = dayjs(startDate).startOf('month');

      // 循环累加，直到超过结束日期
      while (current.isBefore(endDate) || current.isSame(endDate, 'month')) {
        monthsList.push(current.toDate());
        // 增加一个月，进入下一次循环
        current = current.add(1, 'month');
      }
      return monthsList;
    });

    return { ns, range, months, dateMarkersMap };
  },
  render() {
    return (
      <div class={this.ns.b()}>
        <div
          class={[this.ns.e('header'), this.semanticClass('header')]}
          style={this.semanticStyle('header')}
        >
          <div
            class={[
              this.ns.e('title'),
              this.ns.em('header', 'left'),
              this.semanticClass('title'),
            ]}
            style={this.semanticStyle('title')}
          >
            {this.title}
          </div>
          <div
            class={[
              this.ns.e('legend'),
              this.ns.em('header', 'legend'),
              this.semanticClass('legend'),
            ]}
            style={this.semanticStyle('legend')}
          >
            {this.legends.length > 1 &&
              this.legends.map(legend => {
                return (
                  <div
                    class={[
                      this.ns.e('legend-item'),
                      this.ns.em('legend', 'item'),
                      this.semanticClass('legend.item'),
                    ]}
                    style={this.semanticStyle('legend.item')}
                    onClick={() => this.$emit('legendClick', legend)}
                  >
                    <div
                      class={this.ns.em('legend-item', 'tip')}
                      style={{
                        backgroundColor: legend.isShow
                          ? legend?.bkcolor
                          : `var(${this.ns.cssVarName('color-disabled-bg')})`,
                      }}
                    ></div>
                    <div class={this.ns.em('legend-item', 'text')}>
                      {legend.name}
                    </div>
                  </div>
                );
              })}
          </div>
          <div
            class={[
              this.ns.e('toolbar'),
              this.ns.em('header', 'right'),
              this.semanticClass('toolbar'),
            ]}
            style={this.semanticStyle('toolbar')}
          >
            <el-date-picker
              type='monthrange'
              clearable={false}
              v-model={this.range}
              class={[
                this.ns.e('data-picker'),
                this.ns.em('toolbar', 'picker'),
                this.semanticClass('toolbar.picker'),
              ]}
              style={this.semanticStyle('toolbar.picker')}
            />
          </div>
        </div>
        <div
          class={[this.ns.e('body'), this.semanticClass('body')]}
          style={this.semanticStyle('body')}
        >
          {this.months.map(month => {
            return (
              <el-calendar
                modelValue={month}
                class={this.ns.e('month-calendar')}
                key={`${month.getFullYear()}-${month.getMonth()}`}
              >
                {{
                  header: ({ date }: { date: string }) => {
                    return (
                      <div class={this.ns.em('month-calendar', 'header')}>
                        {date}
                      </div>
                    );
                  },
                  dateCell: ({ data }: { data: IData }) => {
                    const { date } = data;
                    const marks =
                      this.dateMarkersMap.get(
                        dayjs(date).format('YYYY-MM-DD'),
                      ) || [];
                    return (
                      <el-popover
                        trigger='click'
                        persistent={false}
                        disabled={!marks.length}
                        popper-style={this.semanticStyle('popup')}
                        popper-class={[
                          this.ns.e('popover'),
                          this.semanticClass('popup'),
                        ]}
                      >
                        {{
                          default: () => {
                            return (
                              <div class={this.ns.em('popover', 'content')}>
                                {marks.map(mark => {
                                  return (
                                    <div
                                      class={[
                                        this.ns.e('event'),
                                        this.ns.em('event', mark.id),
                                      ]}
                                    >
                                      {mark.items.map(item => {
                                        return this.$slots.event?.({
                                          data: item,
                                        });
                                      })}
                                    </div>
                                  );
                                })}
                              </div>
                            );
                          },
                          reference: () => (
                            <div class={this.ns.e('date')}>
                              <div class={this.ns.em('date', 'day')}>
                                {date.getDate()}
                              </div>
                              <div class={this.ns.em('date', 'event')}>
                                {marks.map(mark => {
                                  if (mark.isShow)
                                    return (
                                      <div
                                        class={[
                                          this.ns.e('mark'),
                                          this.ns.e('item'),
                                          this.semanticClass('mark', {
                                            item: mark,
                                          }),
                                        ]}
                                        style={{
                                          backgroundColor: mark.bkcolor,
                                          ...this.semanticStyle('mark', {
                                            item: mark,
                                          }),
                                        }}
                                      ></div>
                                    );
                                })}
                              </div>
                            </div>
                          ),
                        }}
                      </el-popover>
                    );
                  },
                }}
              </el-calendar>
            );
          })}
        </div>
      </div>
    );
  },
});
