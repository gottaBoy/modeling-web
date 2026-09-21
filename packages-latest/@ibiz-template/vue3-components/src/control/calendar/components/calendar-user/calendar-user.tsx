import { defineComponent, ref, watch } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import { ICalendarItemData } from '@ibiz-template/runtime';
import { calendarUserProps, calendarUserEmits } from '../interface';
import {
  getDayTime,
  calcCurWeek,
  calcCurtimeEvents,
} from './use-calendar-user';
import './calendar-user.scss';

export const CalendarUser = defineComponent({
  name: 'CalendarUser',
  props: calendarUserProps,
  emits: calendarUserEmits,
  setup(props, { emit, slots }) {
    const ns = useNamespace('calendar-user');
    // 一周7天
    const weekday = ref<IData[]>([]);
    // 一天24个小时
    const timeList = ref<IData[]>([]);
    timeList.value = getDayTime();

    // 气泡框对应显示日期
    const popoverValue = ref('');

    // 气泡框
    const curPopover = ref<IData>();

    // 监听日期变化，重新计算本周时间
    watch(
      () => props.selectedDay,
      () => {
        if (props.selectedDay) {
          weekday.value = calcCurWeek(new Date(props.selectedDay));
        }
      },
      {
        immediate: true,
        deep: true,
      },
    );

    // 点击空白单元格
    const onBlackClick = () => {
      emit('eventClick', { data: [] });
    };

    // 绘制日历项
    const renderCalendarList = (items: ICalendarItemData[]) => {
      if (items.length === 0)
        return <div class={ns.e('black')} onClick={onBlackClick}></div>;
      if (items.length > 1) {
        return [
          slots.event?.({ data: items[0] }),
          <el-popover
            trigger='click'
            ref={(el: IData) => {
              if (el && items[0].id === popoverValue.value) {
                curPopover.value = el;
              }
            }}
            popper-class={[
              ns.em('more', 'popper'),
              ns.e('custom-user-popover'),
              props.semanticClass('popup'),
            ]}
            popper-style={props.semanticStyle('popup')}
            onShow={() => {
              popoverValue.value = items[0].id;
            }}
          >
            {{
              reference: () => {
                return (
                  <span
                    style={props.semanticStyle('more')}
                    class={[ns.e('more'), props.semanticClass('more')]}
                  >{`+${items.length - 1} ${ibiz.i18n.t('app.more')}...`}</span>
                );
              },
              default: () => {
                return items.map(item => {
                  return slots.event?.({ data: item });
                });
              },
            }}
          </el-popover>,
        ];
      }
      return items.map(item => {
        return slots.event?.({ data: item });
      });
    };

    // 绘制单元格内事件
    const renderEvent = (_week: IData, _time?: IData) => {
      const events = calcCurtimeEvents(props.events, _week, _time);
      return renderCalendarList(events);
    };

    // 绘制顶部
    const renderWeekHeader = () => {
      return (
        <div class={ns.e('header')}>
          <div class={[ns.e('row'), ns.em('header', 'row')]}>
            <div
              class={[
                ns.e('cell'),
                ns.em('cell', 'top'),
                ns.em('header', 'cell'),
              ]}
            ></div>
            {weekday.value.map(item => {
              return (
                <div
                  class={[
                    ns.e('cell'),
                    ns.em('cell', 'top'),
                    ns.em('header', 'cell'),
                  ]}
                >
                  {item.text}
                  {item.date}
                </div>
              );
            })}
          </div>
          <div class={[ns.e('row'), ns.em('header', 'row')]}>
            <div class={[ns.e('cell'), ns.em('header', 'cell')]}>
              {ibiz.i18n.t('control.calendar.calendardaily.tip')}
            </div>
            {weekday.value.map(item => {
              return (
                <div class={[ns.e('cell'), ns.em('header', 'cell')]}>
                  {renderEvent(item)}
                </div>
              );
            })}
          </div>
        </div>
      );
    };

    // 绘制内容
    const renderWeekContent = () => {
      return (
        <div class={ns.e('body')}>
          {timeList.value.map(item => {
            return (
              <div class={[ns.e('row'), ns.em('body', 'row')]}>
                <div class={[ns.e('cell'), ns.em('body', 'cell')]}>
                  {item.text}
                </div>
                {weekday.value.map(day => {
                  return (
                    <div class={[ns.e('cell'), ns.em('body', 'cell')]}>
                      {renderEvent(day, item)}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      );
    };

    return { ns, renderWeekHeader, renderWeekContent };
  },
  render() {
    return (
      <div class={this.ns.b()}>
        {this.renderWeekHeader()}
        {this.renderWeekContent()}
      </div>
    );
  },
});
