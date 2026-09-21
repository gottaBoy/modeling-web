import { computed, defineComponent, PropType } from 'vue';
import { IPortalAsyncAction, showTitle } from '@ibiz-template/core';
import { useNamespace } from '@ibiz-template/vue3-util';
import './async-action.scss';
import { isObject, isString } from 'lodash-es';
import { IAsyncActionProvider } from '@ibiz-template/runtime';

const stateTexts = {
  10: '未开始',
  20: '执行中',
  30: '已执行',
  40: '执行失败',
};

const stateType = {
  10: 'info',
  20: '',
  30: 'success',
  40: 'danger',
};

export const AsyncAction = defineComponent({
  name: 'IBizAsyncAction',
  props: {
    action: {
      type: Object as PropType<IPortalAsyncAction>,
      required: true,
    },
    provider: {
      type: Object as PropType<IAsyncActionProvider>,
      required: true,
    },
  },
  emits: {
    close: () => true,
  },
  setup(props, { emit }) {
    const ns = useNamespace('async-action');
    const hasObjResult = computed(() => isObject(props.action.actionresult));

    // 没有actiontype或者有并且actionresult是对象的时候
    const clickable = computed(() => {
      return !props.action.actiontype || hasObjResult.value;
    });

    const showErrorInfo = computed(() => {
      return props.action.actiontype && isString(props.action.actionresult);
    });

    const actionstate = computed(() => {
      if (hasObjResult.value) {
        const result = props.action.actionresult as IData;
        const errorNum = result.total - result.success;
        if (errorNum > 0) {
          return 40;
        }
        return 30;
      }
      return props.action.actionstate;
    });

    const progressText = computed(() => {
      return !props.action.completionrate
        ? ''
        : `(${props.action.completionrate}%)`;
    });

    const onClick = async (event: MouseEvent) => {
      if (props.provider.onClick) {
        const isClose = await props.provider.onClick(props.action, event);
        if (isClose) {
          emit('close');
        }
      }
    };

    return { ns, showErrorInfo, clickable, actionstate, progressText, onClick };
  },
  render() {
    const { asyncacitonname, begintime, stepinfo = '进行中' } = this.action;
    return (
      <div
        class={[this.ns.b(), this.clickable ? this.ns.m('clickable') : '']}
        onClick={this.onClick}
      >
        <div class={this.ns.b('left')}>
          <ion-icon name='list-outline'></ion-icon>
        </div>
        <div class={this.ns.b('center')}>
          <div class={this.ns.e('caption')}>{asyncacitonname}</div>
          {this.showErrorInfo && (
            <div
              title={showTitle(this.action.actionresult as string)}
              class={this.ns.e('error-info')}
            >
              {this.action.actionresult}
            </div>
          )}
          {this.actionstate === 20 ? (
            <div class={this.ns.e('progress')}>
              {stepinfo}
              {this.progressText}
            </div>
          ) : (
            <div class={this.ns.e('begin-time')}>{begintime}</div>
          )}
        </div>
        <div class={this.ns.b('right')}>
          <el-tag type={stateType[this.actionstate]}>
            {stateTexts[this.actionstate]}
          </el-tag>
        </div>
        {this.actionstate === 20 && !!this.action.completionrate && (
          <div class={this.ns.b('loading-warp')}>
            <div
              class={this.ns.be('loading-warp', 'inner')}
              style={`width:${this.action.completionrate}%;`}
            ></div>
          </div>
        )}
      </div>
    );
  },
});
