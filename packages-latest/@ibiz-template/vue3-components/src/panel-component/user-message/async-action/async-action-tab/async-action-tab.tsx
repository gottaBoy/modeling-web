import { PropType, defineComponent, ref } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import {
  getAsyncActionProvider,
  IAsyncActionController,
  IAsyncActionProvider,
} from '@ibiz-template/runtime';
import './async-action-tab.scss';
import { IPortalAsyncAction, clone } from '@ibiz-template/core';

export const AsyncActionTab = defineComponent({
  name: 'IBizAsyncActionTab',
  props: {
    controller: {
      type: Object as PropType<IAsyncActionController>,
      required: true,
    },
    showPopover: {
      type: Boolean,
      required: true,
    },
  },
  emits: {
    hiddenPopover: () => true,
  },
  setup(props, { emit }) {
    const ns = useNamespace('async-action-tab');

    const c = props.controller;
    const allItems = ref<IPortalAsyncAction[]>([]);

    /**
     * 从控制器里更新数据
     * @author lxm
     * @date 2024-01-26 10:51:17
     */
    const updateData = () => {
      allItems.value = clone(c.actions);
    };

    // 第一次计算数据
    updateData();

    c.evt.on('dataChange', updateData);

    // 气泡控制
    const hiddenPopover = () => {
      // 默认信息点击关闭
      emit('hiddenPopover');
    };

    return {
      ns,
      allItems,
      hiddenPopover,
    };
  },
  render() {
    return (
      <div class={[this.ns.b()]}>
        {this.allItems.length > 0 &&
          this.allItems.map(msg => {
            let provider: IAsyncActionProvider | undefined;
            try {
              provider = getAsyncActionProvider(msg);
            } catch (error) {
              ibiz.log.error(error);
            }
            if (provider) {
              return provider.render({
                class: this.ns.e('item'),
                action: msg,
                onClose: this.hiddenPopover,
              });
            }
            return (
              <div class={this.ns.e('item')}>
                {ibiz.i18n.t(
                  'panelComponent.userMessage.asyncActionTab.noSupportType',
                  {
                    type: msg.actiontype,
                  },
                )}
              </div>
            );
          })}
        {this.allItems.length === 0 && (
          <div class={this.ns.e('nodata')}>
            {ibiz.i18n.t(
              'panelComponent.userMessage.asyncActionTab.noAsyncAction',
            )}
          </div>
        )}
      </div>
    );
  },
});
