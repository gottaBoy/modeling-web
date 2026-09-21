import { useNamespace } from '@ibiz-template/vue3-util';
import {
  computed,
  defineComponent,
  nextTick,
  onBeforeUnmount,
  onMounted,
  PropType,
  Ref,
  ref,
} from 'vue';
import './carousel-card.scss';

export const IBizCarouselCard = defineComponent({
  name: 'IBizCarouselCard',
  props: {
    swipeData: {
      type: Object as PropType<IData[]>,
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
    semantic: {
      type: Object as PropType<IData>,
      default: () => ({}),
    },
  },
  setup(props) {
    const ns = useNamespace('carousel-card');

    /** @type
     *
     *  当前下标
     *
     */
    const nowIndex: Ref<number> = ref(3);

    /** @type
     *
     *  轮播图主div
     *
     */
    const mainDom = ref();

    /** @type
     *
     *  轮播图包裹div
     *
     */
    const listDom = ref();

    /** @type
     *
     *
     * 图片之间间隔
     */
    const gap: number = 0;

    /** @type
     *
     *
     * 图片宽度
     */
    const imgWidth: Ref<number> = ref(600);

    /** @type
     *
     *
     * 轮播盒子宽度
     */
    const containerWidth: Ref<number> = ref(0);

    /** @type
     *
     *
     *  图片中线间距
     */
    const diffLen = computed(() => {
      return (containerWidth.value - imgWidth.value - gap * 2) / 2;
    });

    /** @type
     *
     *自动播放的定时器
     *
     */
    let timer: NodeJS.Timeout | null | number = null;

    /** @type
     *
     *停留的时间
     *
     */
    const imgDoms = document.getElementsByClassName(
      `swiper-slide-card`,
    ) as HTMLCollectionOf<HTMLDivElement>;

    /** @type
     *
     *图片缩放
     *
     */
    const scale: number = 0.8;

    /** @type
     *
     * 动画切换时间
     *
     */
    const aniTime: number = 500;

    /** @type
     *
     * 实际展示图片数组
     *
     */
    const resImgArr = computed(() => {
      if (props.swipeData.length > 2) {
        return [
          ...props.swipeData.slice(-2),
          ...props.swipeData,
          ...props.swipeData.slice(0, 2),
        ];
      }
      return [...props.swipeData];
    });

    /**
     *  计算每一个图片的偏移和缩放
     *
     * @author fangZhiHao
     * @date 2024-05-16 17:05:09
     */
    const setScale = () => {
      for (let i = 0; i < imgDoms.length; i++) {
        if (props.swipeData.length === 2) {
          imgDoms[0].style.left = `${
            containerWidth.value / 4 - imgWidth.value / 2
          }px`;
          imgDoms[1].style.left = `${
            (containerWidth.value / 4) * 3 - imgWidth.value / 2
          }px`;
        } else if (props.swipeData.length === 1) {
          imgDoms[i].style.left = `${
            containerWidth.value / 2 - imgWidth.value / 2
          }px`;
        } else {
          imgDoms[i].style.left = `${(i - 1) * (imgWidth.value + gap)}px`;
        }
        if (i === nowIndex.value - 1) {
          imgDoms[i].style.transform = 'scale(1)';
        } else {
          imgDoms[i].style.transform = `scale(${scale})`;
        }
      }
    };

    /**
     *  点击下一个图片
     *
     * @author fangZhiHao
     * @date 2024-05-16 17:05:47
     * @param {number} anitime
     */
    const nextSlider = (anitime: number) => {
      if (props.swipeData.length === 2) {
        nowIndex.value = nowIndex.value ? 0 : 1;
        setScale();
      } else if (props.swipeData.length === 1) {
        //
      } else {
        if (nowIndex.value >= 2) {
          mainDom.value.style.transition = `left ${anitime / 1000}s`;
          mainDom.value.style.left = `${
            parseInt(mainDom.value.style.left, 10) - (gap + imgWidth.value)
          }px`;
        }
        if (nowIndex.value === props.swipeData.length + 1) {
          nowIndex.value = props.swipeData.length + 2;
          setScale();
          setTimeout(() => {
            nowIndex.value = 2;
            setScale();
            mainDom.value.style.transitionProperty = 'none';
            mainDom.value.style.left = `${-(imgWidth.value - diffLen.value)}px`;
          }, anitime);
        } else {
          // eslint-disable-next-line no-plusplus
          nowIndex.value++;
          setScale();
        }
      }
    };

    /**
     *  点击上一个图片
     *
     * @author fangZhiHao
     * @date 2024-05-16 17:05:05
     * @param {number} anitime
     */
    const prevSlider = (anitime: number) => {
      if (props.swipeData.length === 2) {
        nowIndex.value = nowIndex.value ? 0 : 1;
        setScale();
      } else if (props.swipeData.length === 1) {
        //
      } else {
        // eslint-disable-next-line no-plusplus
        nowIndex.value--;
        mainDom.value.style.transition = `left ${anitime / 1000}s`;
        mainDom.value.style.left = `${
          parseInt(mainDom.value.style.left, 10) + (gap + imgWidth.value)
        }px`;
        if (nowIndex.value === 1) {
          setScale();
          setTimeout(() => {
            nowIndex.value = props.swipeData.length + 1;
            setScale();
            mainDom.value.style.transitionProperty = 'none';
            mainDom.value.style.left = `${-(
              parseInt(imgDoms[nowIndex.value].style.left, 10) -
              diffLen.value -
              gap
            )}px`;
          }, anitime);
        } else {
          setScale();
        }
      }
    };

    /**
     *   开启自动播放
     *
     * @author fangZhiHao
     * @date 2024-05-16 17:05:20
     */
    const startAutoplay = () => {
      timer = window.setInterval(() => nextSlider(aniTime), props.timeSpan);
    };

    /**
     *  关闭自动播放
     *
     * @author fangZhiHao
     * @date 2024-05-16 17:05:42
     */
    const stopAutoplay = () => {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    };

    setScale();

    onMounted(() => {
      if (props.isAuto) {
        startAutoplay();
      }
    });

    onBeforeUnmount(() => {
      stopAutoplay();
    });

    nextTick(() => {
      containerWidth.value = listDom.value.clientWidth;
      imgWidth.value = imgDoms[0].clientWidth;
      if (mainDom.value) {
        mainDom.value.style.left = `${-(
          2 * imgWidth.value +
          gap -
          diffLen.value
        )}px`;
        mainDom.value.style.width = `${
          (props.swipeData.length + 2) * (imgWidth.value + gap / 2)
        }px`;
      }
      setScale();
    });

    /**
     * 两侧图片点击
     *
     * @author fangZhiHao
     * @date 2024-05-16 17:05:45
     * @param {string} pos
     */
    const btnClick = (pos: string) => {
      if (pos === 'left') {
        prevSlider(aniTime);
      } else if (pos === 'right') {
        nextSlider(aniTime);
      }
    };

    /**
     *  分页点击
     *
     * @author fangZhiHao
     * @date 2024-05-16 17:05:25
     * @param {number} targetIndex
     */
    const dotClick = (targetIndex: number) => {
      nowIndex.value = targetIndex + 2 + 1;
      if (nowIndex.value === props.swipeData.length + 2) {
        nowIndex.value = 2;
      }
      mainDom.value.style.transition = `left ${aniTime / 1000}s`;
      mainDom.value.style.left = `${-(
        (nowIndex.value - 1) * imgWidth.value +
        gap -
        diffLen.value
      )}px`;
      setScale();
    };
    return {
      ns,
      btnClick,
      mainDom,
      listDom,
      imgWidth,
      resImgArr,
      dotClick,
      nowIndex,
    };
  },
  render() {
    const renderPic = (item: IData) => {
      if (item.cssClass) {
        if (item.cssClass.indexOf('fa-') !== -1) {
          return (
            <i
              class={[
                item.cssClas,
                'swiper-slide-card',
                this.semantic.item?.class,
              ]}
              style={this.semantic.item?.style}
            />
          );
        }
        return (
          <ion-icon
            class={['swiper-slide-card', this.semantic.item?.class]}
            style={this.semantic.item?.style}
            name={item.cssClass}
          ></ion-icon>
        );
      }
      if (item.imgUrl) {
        return (
          <img
            class={['swiper-slide-card', this.semantic.item?.class]}
            style={[`width: ${this.imgWidth}px`, this.semantic.item?.style]}
            alt={item.name}
            src={item.imgUrl}
          />
        );
      }
    };
    let newIndex = this.nowIndex;
    if (this.nowIndex < this.swipeData.length) {
      newIndex = this.nowIndex + this.swipeData.length;
    }
    return (
      <div class={this.ns.b()}>
        <div class={this.ns.e('swiper-list')} ref='listDom'>
          <div class={this.ns.e('swiper-main')} ref='mainDom'>
            {this.resImgArr.map(item => {
              return renderPic(item);
            })}
          </div>
          <div
            id='prev-card'
            class={this.ns.e('leftBtn')}
            style={`width:${this.imgWidth}px`}
            onClick={() => this.btnClick('left')}
          ></div>
          <div
            id='next-card'
            class={this.ns.e('rightBtn')}
            style={`width:${this.imgWidth}px`}
            onClick={() => this.btnClick('right')}
          ></div>
        </div>
        <div class={this.ns.e('dot')}>
          {this.swipeData.map((_item: IData, index: number) => {
            return (
              <div
                class={[
                  this.ns.e('dot-item'),
                  index === newIndex - 3 ? 'isActive' : '',
                ]}
                onClick={() => this.dotClick(index)}
              ></div>
            );
          })}
        </div>
      </div>
    );
  },
});
