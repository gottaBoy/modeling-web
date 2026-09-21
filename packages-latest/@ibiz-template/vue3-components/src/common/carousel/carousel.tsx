import { Ref, defineComponent, ref, watch, PropType } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import './carousel.scss';

export const IBizCarouselComponent = defineComponent({
  name: 'IBizCarouselComponent',
  props: {
    carouselData: {
      type: Array<
        {
          id?: string;
          name?: string;
          imgUrl?: string;
          linkPath?: string;
          cssClass?: string;
        }[]
      >,
      required: true,
    },
    isAuto: {
      type: Boolean,
      default: true,
    },
    timeSpan: {
      type: Number,
      default: 3000,
    },
    showMode: {
      type: String as PropType<'DEFAULT' | 'CARD'>,
      required: true,
    },
    semantic: {
      type: Object as PropType<IData>,
      default: () => ({
        semanticClass: () => '',
        semanticStyle: () => '',
      }),
    },
  },
  setup(props) {
    const ns = useNamespace('carousel-component');

    const swipeData: Ref<IData[]> = ref([]);

    // 值响应式变更
    watch(
      () => props.carouselData,
      (newVal, oldVal) => {
        if (newVal !== oldVal) {
          swipeData.value = newVal;
        }
      },
      { immediate: true },
    );

    // 子类类名透传
    const childClass = [
      {
        class: props.semantic.semanticClass('arrowleft'),
        selector: '.el-carousel__arrow--left',
      },
      {
        class: props.semantic.semanticClass('arrowright'),
        selector: '.el-carousel__arrow--right',
      },
      {
        class: props.semantic.semanticClass('indicator'),
        selector: '.el-carousel__indicator',
      },
    ];

    // 子类样式透传
    const childStyle = [
      {
        style: props.semantic.semanticStyle('arrowleft'),
        selector: '.el-carousel__arrow--left',
      },
      {
        style: props.semantic.semanticStyle('arrowright'),
        selector: '.el-carousel__arrow--right',
      },
      {
        class: props.semantic.semanticStyle('indicator'),
        selector: '.el-carousel__indicator',
      },
    ];

    return {
      ns,
      swipeData,
      childClass,
      childStyle,
    };
  },
  render() {
    const renderPic = (item: IData) => {
      if (item.cssClass) {
        if (item.cssClass.indexOf('fa-') !== -1) {
          return <i class={[item.cssClass]} />;
        }
        return <ion-icon name={item.cssClass}></ion-icon>;
      }
      if (item.imgUrl) {
        return <img src={item.imgUrl} alt={item.name} />;
      }
    };

    return (
      <div>
        {this.showMode === 'CARD' ? (
          <IBizCarousel-card
            swipeData={this.swipeData}
            isAuto={this.isAuto}
            timeSpan={this.timeSpan}
            semantic={this.semantic}
          ></IBizCarousel-card>
        ) : (
          <el-carousel
            class={[this.ns.b(), this.semantic.semanticClass('content')]}
            style={this.semantic.semanticStyle('content')}
            autoplay={this.isAuto}
            interval={this.timeSpan}
            v-child-class={this.childClass}
            v-child-style={this.childStyle}
            {...this.$attrs}
          >
            {this.swipeData.map(item => {
              return (
                <el-carousel-item
                  key={item.id}
                  class={this.semantic.semanticClass('item', { item })}
                  style={this.semantic.semanticStyle('item', { item })}
                >
                  {item.linkPath ? (
                    <a href={item.linkPath}>{renderPic(item)}</a>
                  ) : (
                    renderPic(item)
                  )}
                </el-carousel-item>
              );
            })}
          </el-carousel>
        )}
      </div>
    );
  },
});
