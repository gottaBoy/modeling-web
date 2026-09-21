import { useNamespace } from '@ibiz-template/vue3-util';
import { watch, defineComponent, ref, Ref, PropType } from 'vue';
import './anchor-bar-list.scss';

// 锚点组件语义化节点数据
type semanticData = {
  item: {
    class: string;
    style: string;
  };
};

export const IBizAnchorBarList = defineComponent({
  name: 'IBizAnchorBarList',
  props: {
    anchorList: {
      type: Array<IData>,
      default: [],
    },
    navBarStyle: {
      type: String,
    },
    navBarPos: {
      type: String,
    },
    selected: {
      type: String,
      default: '',
    },
    semantic: {
      type: Object as PropType<semanticData>,
      default: () => ({
        item: { class: '', style: '' },
      }),
    },
  },
  emits: ['select'],
  setup(props, { emit }) {
    const ns = useNamespace('anchor-bar-list');

    // 选中项
    const select: Ref<string> = ref('');

    // 选中
    const onSelect = (key: string) => {
      emit('select', key);
    };

    // 绘制锚点默认样式
    const renderAnchorDefaultStyle = () => {
      if (!select.value) {
        select.value = props.anchorList?.[0]?.id;
      }
      return props.anchorList.map((item: IData) => {
        return (
          <div
            class={[
              ns.e('item'),
              ns.is('selected', select.value === item.id),
              props.semantic.item.class,
            ]}
            style={props.semantic.item.style}
            title={item.title}
            onClick={() => onSelect(item.id)}
          >
            <div class={ns.em('item', 'title')}>{item.title}</div>
          </div>
        );
      });
    };

    // 监听上层滚动选中
    watch(
      () => props.selected,
      newVal => {
        select.value = newVal;
      },
      {
        immediate: true,
      },
    );

    return { ns, renderAnchorDefaultStyle };
  },
  render() {
    let content = null;

    if (this.navBarStyle === 'DEFAULT' || !this.navBarStyle) {
      content = this.renderAnchorDefaultStyle();
    }

    return (
      <div
        class={[
          this.ns.b(),
          this.ns.is(
            'usermode',
            this.navBarPos === 'USER' || this.navBarPos === 'USER2',
          ),
        ]}
      >
        {content}
      </div>
    );
  },
});
