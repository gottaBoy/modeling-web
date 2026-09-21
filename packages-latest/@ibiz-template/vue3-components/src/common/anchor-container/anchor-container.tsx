import { useNamespace } from '@ibiz-template/vue3-util';
import { PropType, Ref, defineComponent, onUnmounted, ref, watch } from 'vue';
import { IBizAnchorBarList } from './anchor-bar-list/anchor-bar-list';
import './anchor-container.scss';

export interface navBarConfig {
  /**
   * 导航栏位置
   *
   * @type {string}
   * @memberof navBarConfig
   */
  navBarPos: string;

  /**
   * 导航栏样式表
   *
   * @type {string}
   * @memberof navBarConfig
   */
  navBarSysCss: string;

  /**
   * 导航栏宽
   *
   * @type {number}
   * @memberof navBarConfig
   */
  navBarWidth: number;

  /**
   * 导航栏样式
   *
   * @type {string}
   * @memberof navBarConfig
   */
  navBarStyle: string;

  /**
   *导航栏高
   *
   * @type {number}
   * @memberof navBarConfig
   */
  navbarHeight: number;
}

// 锚点组件语义化节点数据
type semanticData = {
  root: {
    class: string;
    style: string;
  };
  item: {
    class: string;
    style: string;
  };
};

export const IBizAnchorContainer = defineComponent({
  name: 'IBizAnchorContainer',
  components: {
    IBizAnchorBarList,
  },
  props: {
    // 锚点列表，项值格式为{id:xx,text:xx}
    anchorList: {
      type: Array<IData>,
      default: [],
    },
    // 锚点目标元素
    anchorTargetEle: {
      type: Object as PropType<IData>,
      required: true,
    },
    // 锚点导航栏配置
    navBarConfig: {
      type: Object as PropType<navBarConfig>,
      default: () => {},
    },
    semantic: {
      type: Object as PropType<semanticData>,
      default: () => ({
        root: { class: '', style: '' },
        item: { class: '', style: '' },
      }),
    },
  },
  setup(props) {
    const ns = useNamespace('anchor-container');

    // 定时器标记
    const timer = ref();

    // 是否是点击时间,点击跳转时不会因为滚动触发锚点栏的选中
    const isClick: Ref<boolean> = ref(false);

    // 锚点选中值
    const selected: Ref<string> = ref('');

    // 锚点导航栏配置
    const {
      navBarPos = 'USER',
      navBarSysCss,
      navBarWidth,
      navBarStyle,
      navbarHeight,
    } = props.navBarConfig;

    // 锚点栏点击
    const onSelect = (key: string) => {
      clearInterval(timer.value);
      const el = document.querySelector(`#${key}`);
      isClick.value = true;
      selected.value = key;
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        timer.value = setTimeout(() => {
          isClick.value = false;
        }, 1000);
      }
    };

    // 处理滚动
    const handleScroll = () => {
      if (isClick.value) return;
      let closestDistance = Infinity;
      let tempSelect = '';

      // 遍历所有子元素
      for (let i = 0; i < props.anchorList.length; i++) {
        const childElement = document.querySelector(
          `#${props.anchorList[i].id}`,
        );
        if (childElement) {
          // 获取子元素相对于视口的距离
          const rect = childElement.getBoundingClientRect();
          const parentRect = props.anchorTargetEle!.$el.getBoundingClientRect();

          // 计算子元素相对于父元素的距离
          const relativeTop = rect.top - parentRect.top;

          // 检查子元素是否在可视区域内
          const isInView =
            rect.bottom > parentRect.top && rect.top < parentRect.bottom;

          // 找到距离视口顶部最近的子元素
          if (isInView && relativeTop >= 0 && relativeTop < closestDistance) {
            closestDistance = relativeTop;
            tempSelect = props.anchorList[i].id;
          }
        }
      }
      selected.value = tempSelect;
    };

    // 计算锚点栏style样式
    const style = () => {
      const tempStyle: IData = {};
      if (navBarWidth) {
        if (navBarWidth === 1) {
          Object.assign(tempStyle, { width: 'auto' });
        } else {
          Object.assign(tempStyle, {
            width: `${navBarWidth}px`,
            minWidth: `${navBarWidth}px`,
            maxWidth: `${navBarWidth}px`,
          });
        }
      }
      if (navbarHeight) {
        if (navbarHeight === 1) {
          Object.assign(tempStyle, { height: 'auto' });
        } else {
          Object.assign(tempStyle, {
            height: `${navbarHeight}px`,
            minHeight: `${navbarHeight}px`,
          });
        }
      }
      return tempStyle;
    };

    // 监听锚点目标元素加载
    const target = watch(
      () => {
        if (props.anchorTargetEle && props.anchorTargetEle.$el) {
          return props.anchorTargetEle.$el;
        }
        return null;
      },
      newVal => {
        if (newVal) {
          (newVal as HTMLElement).addEventListener('scroll', handleScroll);
          // 移除watch
          (newVal as HTMLElement).classList.add('no-slider');
          target();
        }
      },
      {
        immediate: true,
      },
    );

    // 移除监听
    onUnmounted(() => {
      if (props.anchorTargetEle?.$el) {
        (props.anchorTargetEle?.$el as HTMLElement).removeEventListener(
          'scroll',
          handleScroll,
        );
      }
    });

    return {
      ns,
      selected,
      navBarPos,
      navBarStyle,
      navBarSysCss,
      style,
      onSelect,
    };
  },
  render() {
    return (
      <div
        class={[
          this.ns.b(),
          this.ns.is(`${this.navBarPos.toLowerCase()}`, true),
          this.ns.is(
            'broadside',
            this.navBarPos !== 'USER' && this.navBarPos !== 'USER2',
          ),
          this.ns.is(
            'usermode',
            this.navBarPos === 'USER' || this.navBarPos === 'USER2',
          ),
          this.ns.b(`${this.navBarStyle || 'default'}`.toLowerCase()),
        ]}
      >
        <div
          class={[
            this.ns.e('anchor'),
            this.navBarSysCss,
            this.semantic.root.class,
          ]}
          style={[this.style(), this.semantic.root.style]}
        >
          <IBizAnchorBarList
            anchorList={this.anchorList}
            navBarStyle={this.navBarStyle}
            navBarPos={this.navBarPos}
            selected={this.selected}
            onSelect={this.onSelect}
            semantic={this.semantic}
          ></IBizAnchorBarList>
        </div>
        <div class={this.ns.e('content')}>{this.$slots.default?.()}</div>
      </div>
    );
  },
});
