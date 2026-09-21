/* eslint-disable no-param-reassign */
import { defineComponent, PropType, watch, Ref, ref } from 'vue';
import dayjs from 'dayjs';
import { clone } from 'ramda';
import './extend-action-timeline.scss';
import { useNamespace } from '@ibiz-template/vue3-util';
import { showTitle } from '@ibiz-template/core';

/**
 * 办理人员名称显示去重
 *
 * @param tag 需要去重的名称标识
 * @param dataS 需要去重数据集
 */
const acceptingOfficerNoDup = (tag: string, dataS: IData[]) => {
  const tempData: IData[] = [];
  if (dataS?.length > 0 && tag) {
    dataS.forEach((data: IData) => {
      tempData.push(data[tag]);
    });
  }
  const noDup = [...new Set(tempData)];
  return noDup;
};

export const IBizExtendActionTimeLine = defineComponent({
  name: 'IBizExtendActionTimeLine',
  props: {
    data: {
      type: Object as PropType<IData>,
    },
  },
  setup(props) {
    const ns = useNamespace('extend-action-timeline');

    const UIData: Ref<IData[]> = ref([]);

    const sortData = (a: IData, b: IData) => {
      return Date.parse(b.time) - Date.parse(a.time);
    };

    /**
     * 处理数据
     *
     * @author fangZhiHao
     * @date 2023-01-12 11:01:07
     * @param {IData[]} handleTasks
     * @return {*}
     */
    const handleVal = (handleTasks: IData[]) => {
      const commentsData: IData[] = [];
      let tasks = clone(handleTasks);
      if (tasks.length > 0) {
        tasks = tasks.reverse();
        tasks.forEach((task: IData) => {
          if (task.usertasks) {
            // 有子流程没有comments  递归处理
            const copyTasks = clone(task.usertasks);
            Object.assign(task, { tasks: handleVal(copyTasks) });
            task.isShow = false;
          }
          if (task.identitylinks.length === 0 && task.comments.length === 0) {
            Object.assign(task, { taskName: task.userTaskName });
            commentsData.push(task);
          }
          if (task.identitylinks.length > 0) {
            const authorNames = acceptingOfficerNoDup(
              'displayname',
              task.identitylinks,
            );
            commentsData.push({
              authorName: authorNames.join('、'),
              taskName: task.userTaskName,
              isLink: true,
            });
          }
          if (task.comments.length > 0) {
            task.comments.forEach((comment: IData) => {
              Object.assign(comment, { taskName: task.userTaskName });
            });
            task.comments.sort(sortData);
            commentsData.push(...task.comments);
          }
        });
        return commentsData;
      }
    };

    /**
     * 去重重复名称
     *
     * @author fangZhiHao
     * @date 2023-01-13 15:01:47
     * @param {Array<string>} data
     * @return {*}
     */
    const noDup = (data: Array<string>) => {
      const map = new Map();
      for (let i = 0; i < data.length; i++) {
        if (!map.has(data[i])) {
          map.set(data[i], true);
        }
      }
      return map;
    };

    /**
     * 处理子流程中待办名
     *
     * @author fangZhiHao
     * @date 2023-01-13 11:01:09
     * @param {IData[]} handleTask
     */
    const handlelinkName = (handleTask: IData[]) => {
      handleTask.forEach((item: IData) => {
        const linkName = [];
        if (item.tasks) {
          handlelinkName(item.tasks);
        }
        if (item.tasks) {
          for (let i = 0; i < item.tasks.length; i++) {
            if (item.tasks[i].isLink) {
              const arr =
                item.tasks[i].authorName.indexOf('、') !== -1
                  ? item.tasks[i].authorName.split('、')
                  : item.tasks[i].authorName;
              if (typeof arr === 'string') {
                linkName.push(arr);
              } else {
                linkName.push(...arr);
              }
            }
            if (item.tasks[i].linkName) {
              const arr =
                item.tasks[i].linkName.indexOf('、') !== -1
                  ? item.tasks[i].linkName.split('、')
                  : item.tasks[i].linkName;
              if (typeof arr === 'string') {
                linkName.push(arr);
              } else {
                linkName.push(...arr);
              }
            }
          }
        }
        const noDupName = [...noDup(linkName).keys()];
        item.linkName = noDupName.join('、');
      });
    };

    watch(
      () => props.data,
      (newVal, oldVal) => {
        if (newVal !== oldVal && newVal) {
          const copyData = clone(newVal);
          const tasks = copyData.usertasks;
          if (tasks) {
            const handleTask = handleVal(tasks);
            if (handleTask) {
              handlelinkName(handleTask);
              UIData.value = handleTask;
            }
          }
        }
      },
      { immediate: true },
    );

    /**
     * 时间转换
     *
     *  @memberof ExtendActionTimeline
     */
    const formatDate = (date: string, format: string) => {
      return dayjs(date).format(format);
    };

    /**
     * 子流程展示隐藏
     *
     * @author fangZhiHao
     * @date 2023-01-12 11:01:34
     * @param {IData} userTask
     */
    const changeExpand = (userTask: IData) => {
      userTask.isShow = !userTask.isShow;
    };

    /**
     *  绘制组件
     *
     * @author fangZhiHao
     * @date 2023-01-12 11:01:07
     * @param {IData[]} data
     * @return {*}
     */
    const renderTimeline = (data: IData[]) => {
      return data.map((task: IData) => {
        return (
          <div
            class={[
              ns.b('task'),
              ns.is('wrong', task.type && task.type.includes('驳回')),
              ns.is('link', task.isLink),
              ns.is('linkname', task.linkName),
            ]}
          >
            <div class={ns.be('task', 'tail')}></div>
            <div
              class={[ns.be('task', 'head'), ns.is('link-head', task.linkName)]}
            ></div>
            <div class={ns.be('task', 'top')}>
              <div
                class={[
                  ns.be('task', 'user-task-name'),
                  ns.is('task-link', task.linkName),
                ]}
              >
                {task.taskName}
              </div>
              {task.linkName ? (
                <div
                  class={ns.be('task', 'link-name')}
                  title={showTitle(task.linkName)}
                >
                  {task.linkName}
                </div>
              ) : null}
              <div
                class={[
                  ns.be('task', 'author-name'),
                  ns.is('has-type', task.type),
                ]}
                title={showTitle(task.authorName)}
              >
                {task.authorName}
              </div>
              {task.type && (
                <div class={ns.be('task', 'type')}>{task.type}</div>
              )}
              {task.time && (
                <div class={ns.be('task', 'last-time')}>
                  {task.time &&
                    ibiz.i18n.t('component.extendActionTimeLine.processTime')}
                  <span class={ns.be('task', 'last-time-text')}>
                    {task.time}
                  </span>
                </div>
              )}
            </div>
            <div class={ns.be('task', 'bottom')}>
              <div class={ns.be('task', 'full-message')}>
                {task.fullMessage
                  ? `${ibiz.i18n.t(
                      'component.extendActionTimeLine.comments',
                    )}： ${task.fullMessage}`
                  : task.fullMessage}
              </div>
            </div>
            {task.tasks && task.tasks.length >= 1 && (
              <div
                class={ns.be('task', 'trigger')}
                on-click={() => {
                  changeExpand(task);
                }}
              >
                <i-icon type={task.isShow ? 'md-remove' : 'md-add'} />
              </div>
            )}
            {task.tasks && (
              <div class={ns.be('task', 'moreTask')} v-show={task.isShow}>
                {renderTimeline(task.tasks)}
              </div>
            )}
          </div>
        );
      });
    };

    return { ns, formatDate, UIData, renderTimeline };
  },
  render() {
    return (
      <div class={this.ns.b()}>
        {this.UIData && this.renderTimeline(this.UIData)}
      </div>
    );
  },
});
