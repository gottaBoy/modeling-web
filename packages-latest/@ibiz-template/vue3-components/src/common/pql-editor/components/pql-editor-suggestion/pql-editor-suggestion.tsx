import { PropType, VNode, defineComponent } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import './pql-editor-suggestion.scss';

export const IBizPqlEditorSuggestion = defineComponent({
  name: 'IBizPqlEditorSuggestion',
  props: {
    items: {
      type: Array as PropType<IData[]>,
      default: () => [],
    },
    renderItem: {
      type: Function as PropType<(_item: IData) => VNode>,
    },
  },
  emits: {
    select: (_item: IData) => true,
  },
  setup(_props, { emit }) {
    const ns = useNamespace('pql-editor-suggestion');

    // 处理项点击
    const handleClick = (item: IData) => {
      emit('select', item);
    };

    return {
      ns,
      handleClick,
    };
  },
  render() {
    return (
      <div class={this.ns.b()}>
        {this.items[0]?._msg ? (
          <div class={this.ns.bm('item', 'empty')}>{this.items[0]._msg}</div>
        ) : null}
        {!this.items[0]?._msg &&
          this.items.map(item => {
            return (
              <div
                class={[this.ns.b('item')]}
                onClick={e => {
                  e.stopPropagation();
                  this.handleClick(item);
                }}
              >
                {this.renderItem ? (
                  this.renderItem(item)
                ) : (
                  <div class={this.ns.be('item', 'text')}>
                    {item.label || ''}
                  </div>
                )}
              </div>
            );
          })}
      </div>
    );
  },
});
