import { defineComponent, SetupContext } from 'vue';
import dayjs from 'dayjs';
import { useNamespace } from '@ibiz-template/vue3-util';
import { showTitle } from '@ibiz-template/core';
import CalendarDaily from '../calendar-daily';
import CalendarWeek from '../calendar-week';
import CalendarUser from '../calendar-user';
import { useCustomCalendar, calcCurrentWeekRange } from './use-custom-calendar';
import {
  CustomCalendarEmits,
  customCalendarEmits,
  customCalendarProps,
} from '../interface';
import { IUILegend } from '../../calendar';
import './custom-calendar.scss';

export const CustomCalendar = defineComponent({
  name: 'CustomCalendar',
  props: customCalendarProps,
  emits: customCalendarEmits,
  setup(props, { emit, slots }) {
    const ns = useNamespace('custom-calendar');
    const {
      date,
      events,
      shortcuts,
      viewType,
      validatedRange,
      realSelectedDay,
      curWeek,
      legends,
      multiple,
      selectedData,
      pickDay,
      handleEVentClick,
      handleEVentDblClick,
      handleEventContextmenu,
      selectDate,
      selectLegend,
    } = useCustomCalendar(
      props,
      emit as SetupContext<CustomCalendarEmits>['emit'],
      'custom-calendar',
    );

    /**
     * 绘制周
     */
    const renderWeek = () => {
      return (
        <div class={ns.e('calendar-week')}>
          {slots?.header ? (
            <div
              class={[
                ns.e('header'),
                ns.em('calendar-week', 'header'),
                props.semanticClass('header'),
              ]}
              style={props.semanticStyle('header')}
            >
              {slots?.header?.({
                date: dayjs(realSelectedDay.value).format('YYYY-MM-DD'),
                legends: legends.value,
              })}
            </div>
          ) : (
            <div
              class={[
                ns.e('header'),
                ns.em('calendar-week', 'header'),
                props.semanticClass('header'),
              ]}
              style={props.semanticStyle('header')}
            >
              <div class={ns.em('calendar-week', 'header-top')}>
                <div
                  class={[
                    ns.e('title'),
                    ns.em('calendar-week', 'title'),
                    props.semanticClass('title'),
                  ]}
                  style={props.semanticStyle('title')}
                >
                  {props.calendarTitle || ibiz.i18n.t('control.calendar.title')}
                </div>
                <div
                  class={[
                    ns.e('legend'),
                    ns.em('calendar-week', 'legend'),
                    props.semanticClass('legend'),
                  ]}
                  style={props.semanticStyle('legend')}
                >
                  {legends.value.length > 1 &&
                    legends.value.map((item: IUILegend) => {
                      return (
                        <div
                          class={[
                            ns.em('legend', 'item'),
                            ns.em('calendar-week', 'legend-item'),
                            props.semanticClass('legend.item', { item }),
                          ]}
                          style={props.semanticStyle('legend.item', { item })}
                          onClick={() => selectLegend(item)}
                        >
                          <div
                            class={ns.em('calendar-week', 'legend-item-tip')}
                            style={{
                              background: item.isShow
                                ? item.bkcolor
                                : `var(${ns.cssVarName('color-disabled-bg')})`,
                            }}
                          ></div>
                          <div
                            class={ns.em('calendar-week', 'legend-item-text')}
                            title={showTitle(item.name)}
                          >
                            {item.name}
                          </div>
                        </div>
                      );
                    })}
                </div>
                <div
                  class={[
                    ns.e('toolbar'),
                    ns.em('calendar-week', 'select-time'),
                    props.semanticClass('toolbar'),
                  ]}
                  style={props.semanticStyle('toolbar')}
                >
                  <el-date-picker
                    type='date'
                    placeholder='选择日期'
                    shortcuts={shortcuts}
                    v-model={realSelectedDay.value}
                    class={[
                      ns.em('toolbar', 'picker'),
                      props.semanticClass('toolbar.picker'),
                    ]}
                    style={props.semanticStyle('toolbar.picker')}
                  />
                </div>
              </div>
            </div>
          )}
          <CalendarWeek
            semanticClass={props.semanticClass}
            semanticStyle={props.semanticStyle}
            class={[ns.e('body'), props.semanticClass('body')]}
            style={props.semanticStyle('body')}
            selected-day={realSelectedDay.value}
            showDetail={props.showDetail}
            events={events.value}
            legends={legends.value}
            multiple={multiple.value}
            selectedData={selectedData.value}
            onEventClick={(value: IParams) => handleEVentClick(value)}
            onEventDblClick={(value: IParams) => handleEVentDblClick(value)}
            onEventContextmenu={(value: IParams) =>
              handleEventContextmenu(value)
            }
            v-slots={slots}
          ></CalendarWeek>
        </div>
      );
    };

    /**
     * 绘制全天
     */
    const renderDay = () => {
      return (
        <div class={ns.e('calendar-day')}>
          {slots?.header ? (
            <div
              class={[
                ns.e('header'),
                ns.em('calendar-day', 'header'),
                props.semanticClass('header'),
              ]}
              style={props.semanticStyle('header')}
            >
              {slots?.header?.({
                date: dayjs(realSelectedDay.value).format('YYYY-MM-DD'),
                legends: legends.value,
              })}
            </div>
          ) : (
            <div
              class={[
                ns.e('header'),
                ns.em('calendar-day', 'header'),
                props.semanticClass('header'),
              ]}
              style={props.semanticStyle('header')}
            >
              <div class={ns.em('calendar-day', 'header-top')}>
                <div
                  class={[
                    ns.e('title'),
                    ns.em('calendar-day', 'title'),
                    props.semanticClass('title'),
                  ]}
                  style={props.semanticStyle('title')}
                >
                  {props.calendarTitle || ibiz.i18n.t('control.calendar.title')}
                </div>
                <div
                  class={[
                    ns.e('legend'),
                    ns.em('calendar-day', 'legend'),
                    props.semanticClass('legend'),
                  ]}
                  style={props.semanticStyle('legend')}
                >
                  {legends.value.length > 1 &&
                    legends.value.map((item: IUILegend) => {
                      return (
                        <div
                          class={[
                            ns.em('legend', 'item'),
                            ns.em('calendar-day', 'legend-item'),
                            props.semanticClass('legend.item', { item }),
                          ]}
                          style={props.semanticStyle('legend.item', { item })}
                          onClick={() => selectLegend(item)}
                        >
                          <div
                            class={ns.em('calendar-day', 'legend-item-tip')}
                            style={{
                              background: item.isShow
                                ? item.bkcolor
                                : `var(${ns.cssVarName('color-disabled-bg')})`,
                            }}
                          ></div>
                          <div
                            class={ns.em('calendar-day', 'legend-item-text')}
                            title={showTitle(item.name)}
                          >
                            {item.name}
                          </div>
                        </div>
                      );
                    })}
                </div>
                <div
                  class={[
                    ns.e('toolbar'),
                    ns.em('calendar-day', 'select-time'),
                    props.semanticClass('toolbar'),
                  ]}
                  style={props.semanticStyle('toolbar')}
                >
                  <el-date-picker
                    type='date'
                    class={[
                      ns.em('toolbar', 'picker'),
                      props.semanticClass('toolbar.picker'),
                    ]}
                    style={props.semanticStyle('toolbar.picker')}
                    v-model={realSelectedDay.value}
                    placeholder={ibiz.i18n.t(
                      'control.calendar.calendardaily.selectdate',
                    )}
                    shortcuts={shortcuts}
                  />
                </div>
              </div>
              <div class={ns.em('calendar-day', 'text-secondary')}>
                {curWeek.value}
              </div>
            </div>
          )}
          <CalendarDaily
            semanticClass={props.semanticClass}
            semanticStyle={props.semanticStyle}
            class={[ns.e('body'), props.semanticClass('body')]}
            style={props.semanticStyle('body')}
            selected-day={realSelectedDay.value}
            controller={props.controller}
            showDetail={props.showDetail}
            events={events.value}
            legends={legends.value}
            multiple={multiple.value}
            selectedData={selectedData.value}
            onEventClick={(value: IParams) => handleEVentClick(value)}
            onEventDblClick={(value: IParams) => handleEVentDblClick(value)}
            onEventContextmenu={(value: IParams) =>
              handleEventContextmenu(value)
            }
            v-slots={slots}
          ></CalendarDaily>
        </div>
      );
    };

    /**
     * 绘制用户自定义1
     *
     * @return {*}
     */
    const renderUser = () => {
      const weekRange = calcCurrentWeekRange(new Date(realSelectedDay.value));
      return (
        <div class={ns.e('calendar-user')}>
          <div
            class={[
              ns.e('header'),
              ns.e('calendar-user-header'),
              props.semanticClass('header'),
            ]}
            style={props.semanticStyle('header')}
          >
            <div
              class={[
                ns.e('title'),
                ns.em('calendar-user-header', 'left'),
                props.semanticClass('title'),
              ]}
              style={props.semanticStyle('title')}
            >
              {weekRange
                .map(_date => {
                  return dayjs(new Date(_date)).format('YYYY-MM-DD');
                })
                .join(' ~ ')}
            </div>
            <div
              class={[
                ns.e('toolbar'),
                ns.em('calendar-user-header', 'right'),
                props.semanticClass('toolbar'),
              ]}
              style={props.semanticStyle('toolbar')}
            >
              <el-date-picker
                type='week'
                clearable={false}
                popper-class={ns.em('calendar-user-header', 'date-picker')}
                v-model={realSelectedDay.value}
                class={[
                  ns.em('toolbar', 'picker'),
                  ns.em('calendar-user-header', 'date-range'),
                  props.semanticClass('toolbar.picker'),
                ]}
                style={props.semanticStyle('toolbar.picker')}
                placeholder={ibiz.i18n.t(
                  'control.calendar.calendarUser.selectWeekRange',
                )}
                format={ibiz.i18n.t('control.calendar.calendarUser.weekFormat')}
              ></el-date-picker>
            </div>
          </div>
          <CalendarUser
            semanticClass={props.semanticClass}
            semanticStyle={props.semanticStyle}
            class={[ns.e('body'), props.semanticClass('body')]}
            style={props.semanticStyle('body')}
            selected-day={realSelectedDay.value}
            events={events.value}
            onEventClick={(value: IParams) => handleEVentClick(value)}
            onEventDblClick={(value: IParams) => handleEVentDblClick(value)}
            v-slots={slots}
          ></CalendarUser>
        </div>
      );
    };

    const renderContent = () => {
      switch (viewType.value) {
        case 'DAY':
          return renderDay();
        case 'WEEK':
          return renderWeek();
        case 'USER':
          return renderUser();
        default:
          return null;
      }
    };
    return {
      ns,
      date,
      validatedRange,
      pickDay,
      selectDate,
      renderContent,
    };
  },
  render() {
    return <div class={[this.ns.b()]}>{this.renderContent()}</div>;
  },
});
