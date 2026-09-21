/* eslint-disable no-nested-ternary */
import { PropType, computed, defineComponent } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import { KanbanController } from '@ibiz-template/runtime';
import './kanben-setting.scss';

export const IBizKanbanSetting = defineComponent({
  name: 'IBizKanbanSetting',
  props: {
    controller: {
      type: Object as PropType<KanbanController>,
      required: true,
    },
    buttonStyle: {
      type: Object as PropType<{ circle: boolean; type: string }>,
      default: () => ({ circle: false, type: 'info' }),
    },
  },
  setup(props) {
    const ns = useNamespace('kanban-setting');

    const groups = computed(() => {
      return props.controller.state.groups;
    });

    return {
      ns,
      groups,
    };
  },
  render() {
    return (
      <div class={this.ns.b()}>
        <el-popover
          trigger='click'
          placement='bottom'
          popper-class={this.ns.e('popover')}
        >
          {{
            reference: () => {
              return (
                <el-button {...this.buttonStyle}>
                  <ion-icon
                    name='options-outline'
                    title={ibiz.i18n.t('component.kanbanSetting.hideGroup')}
                  ></ion-icon>
                </el-button>
              );
            },
            default: () => {
              return (
                <div class={this.ns.em('popover', 'content')}>
                  {this.groups.map(group => {
                    return (
                      <el-checkbox
                        size='small'
                        label={group.caption}
                        model-value={!group.hidden}
                        onChange={(val: boolean) => {
                          group.hidden = !val;
                        }}
                      />
                    );
                  })}
                </div>
              );
            },
          }}
        </el-popover>
      </div>
    );
  },
});
