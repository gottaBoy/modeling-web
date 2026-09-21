import { ISortItem } from '@ibiz-template/runtime';
import { useNamespace } from '@ibiz-template/vue3-util';
import { defineComponent, PropType } from 'vue';
import './sort-bar.scss';

export const IBizSortBar = defineComponent({
  name: 'IBizSortBar',
  props: {
    sortItems: {
      type: Array<ISortItem>,
      required: true,
    },
    semantic: {
      type: Object as PropType<{ class: string; style: string }>,
      default: () => ({ class: '', style: '' }),
    },
  },
  emits: {
    SortChange: (_item: ISortItem, _order: 'asc' | 'desc' | undefined) => true,
  },
  setup(props, { emit }) {
    const ns = useNamespace('sort-bar');

    const onItemClick = (item: ISortItem) => {
      if (item.order === 'asc') {
        item.order = 'desc';
      } else if (item.order === 'desc') {
        item.order = undefined;
      } else {
        // 清空其他排序项顺序
        props.sortItems.forEach(x => {
          x.order = undefined;
        });
        item.order = 'asc';
      }

      emit('SortChange', item, item.order);
    };

    return { ns, onItemClick };
  },
  render() {
    return (
      <div class={this.ns.b()}>
        {this.sortItems.length > 0 &&
          this.sortItems.map(item => {
            return (
              <div
                onClick={() => this.onItemClick(item)}
                class={[
                  this.ns.b('item'),
                  item.order === 'asc' ? this.ns.bm('item', 'asc') : '',
                  item.order === 'desc' ? this.ns.bm('item', 'desc') : '',
                  this.semantic.class,
                ]}
                style={this.semantic.style}
              >
                {item.caption}
                <div class={this.ns.b('icon-wrapper')}>
                  <i class={this.ns.be('icon-wrapper', 'icon-asc')}></i>
                  <i class={this.ns.be('icon-wrapper', 'icon-desc')}></i>
                </div>
              </div>
            );
          })}
      </div>
    );
  },
});
