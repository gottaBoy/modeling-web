/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useNamespace } from '@ibiz-template/vue3-util';
import { computed, defineComponent, nextTick, PropType, Ref, ref } from 'vue';
import { createUUID } from 'qx-util';
import './cropping.scss';

export const IBizCropping = defineComponent({
  name: 'IBizCropping',
  props: {
    // 传递一个文件对象进来
    img: {
      type: Object as PropType<IData>,
    },
    // 未传递img时，使用传递的url获取图片
    url: {
      type: String,
    },
    // 截取区域宽度
    cropareaWidth: {
      type: Number,
      default: 400,
    },
    // 截取区域高度
    cropareaHeight: {
      type: Number,
      default: 200,
    },
  },
  emits: ['change'],
  setup(props, { emit }) {
    const ns = useNamespace('cropping');
    // 缩放比例
    const scaleNumber = ref(1);
    // 是否允许移动
    const allowMove = ref(false);
    // 图片Ref
    const imgRef = ref();
    // 图片移动位置
    const imgMovePosition: Ref<IData> = ref({
      x: 0, // 鼠标X轴移动距离
      y: 0, // 鼠标Y轴移动距离
      tx: 0, // 图片X轴已有偏移量
      ty: 0, // 图片Y轴已有偏移量
    });
    // 截取区域元素id
    const uuid = createUUID();
    // 计算截取图片的url
    const cropImgUrl = computed(() => {
      if (props.img?.raw) {
        return URL.createObjectURL(props.img.raw);
      }
      if (props.url) {
        return props.url;
      }
      return '';
    });

    // 缩小
    const onReduce = () => {
      if (scaleNumber.value > 1) {
        scaleNumber.value = (scaleNumber.value * 10 - 1) / 10;
      }
    };

    // 放大
    const onAdd = () => {
      if (scaleNumber.value < 3) {
        scaleNumber.value = (scaleNumber.value * 10 + 1) / 10;
      }
    };

    // 鼠标按下，准备拖动
    const onMouseDown = (e: MouseEvent) => {
      const x = e.offsetX;
      const y = e.offsetY;
      imgMovePosition.value.x = x;
      imgMovePosition.value.y = y;
      allowMove.value = true;
    };

    // 开始拖动
    const onMouseMove = (e: MouseEvent) => {
      if (!allowMove.value || !imgRef.value) {
        return;
      }
      const x = e.offsetX;
      const y = e.offsetY;

      const croparea = document.getElementById(uuid);
      if (!croparea) return;
      const { left: cropLeft, top: cropTop } = croparea.getBoundingClientRect();
      const {
        left: imgLeft,
        top: imgTop,
        width: imgWidth,
        height: imgHeight,
      } = imgRef.value.getBoundingClientRect();
      let moveX = false;
      let moveY = false;
      if (imgWidth > props.cropareaWidth) {
        // 宽度超出限制时才允许左右拖动
        moveX = true;
      }
      if (imgHeight > props.cropareaHeight) {
        // 高度超出限制时才允许上下拖动
        moveY = true;
      }
      const spaceX = x - imgMovePosition.value.x;
      const spaceY = y - imgMovePosition.value.y;

      // 当图片占满宽度时允许拖动
      if (
        moveX &&
        imgLeft + spaceX < cropLeft &&
        imgLeft + imgWidth + spaceX > cropLeft + props.cropareaWidth
      ) {
        imgMovePosition.value.tx += spaceX;
      }

      // 当图片占满宽高度时允许拖动
      if (
        moveY &&
        imgTop + spaceY < cropTop &&
        imgTop + imgHeight + spaceY > cropTop + props.cropareaHeight
      ) {
        imgMovePosition.value.ty += spaceY;
      }
      imgMovePosition.value.x = x;
      imgMovePosition.value.y = y;
    };

    // 鼠标放起
    const onMouseUp = () => {
      allowMove.value = false;
    };

    // 鼠标离开截取区域
    const onMouseLeave = () => {
      allowMove.value = false;
    };

    // 图片偏移样式
    const style = computed(() => {
      const imgStyle: IData = {
        maxWidth: `${props.cropareaWidth}px`,
        maxHeight: `${props.cropareaHeight}px`,
        objectFit: 'contain',
        transform: `translate(calc(${imgMovePosition.value.tx}px - 50%),calc(${imgMovePosition.value.ty}px - 50%)) scale(${scaleNumber.value})`,
      };
      return imgStyle;
    });

    // 鼠标滚轮滚动
    const onWheel = async (e: WheelEvent) => {
      e.stopPropagation();
      e.preventDefault();
      if (e.deltaY > 0) {
        onReduce();
      } else {
        onAdd();
      }
      const croparea = document.getElementById(uuid);
      if (!croparea) return;
      await nextTick();
      const { left: cropLeft, top: cropTop } = croparea.getBoundingClientRect();
      const {
        left: imgLeft,
        top: imgTop,
        width: imgWidth,
        height: imgHeight,
      } = imgRef.value.getBoundingClientRect();
      const distanceX = imgLeft - cropLeft;
      const distanceY = imgTop - cropTop;
      if (imgWidth > props.cropareaWidth) {
        // 超出宽度限制
        if (imgLeft > cropLeft) {
          // 左边贴边
          imgMovePosition.value.tx -= distanceX;
        }
        if (imgLeft + imgWidth < cropLeft + props.cropareaWidth) {
          // 右侧贴边
          imgMovePosition.value.tx +=
            cropLeft + props.cropareaWidth - imgLeft - imgWidth;
        }
      } else {
        imgMovePosition.value.tx = 0;
      }

      if (imgHeight > props.cropareaHeight) {
        // 超出高度限制
        if (imgTop > cropTop) {
          // 顶部贴边
          imgMovePosition.value.ty -= distanceY;
        }
        if (imgTop + imgHeight < cropTop + props.cropareaHeight) {
          // 底部贴边
          imgMovePosition.value.ty +=
            cropTop + props.cropareaHeight - imgTop - imgHeight;
        }
      } else {
        imgMovePosition.value.ty = 0;
      }
    };

    // 取消
    const onCancel = () => {
      emit('change', '');
    };

    // 确认
    const onConfirm = async () => {
      let cropDataUrl = '';
      const croparea = document.getElementById(uuid);
      if (croparea && imgRef.value) {
        // 根据截取区域和图片的相对位置，计算截取位置的起始位置
        const { left: cropLeft, top: cropTop } =
          croparea.getBoundingClientRect();
        const {
          left: imgLeft,
          top: imgTop,
          width: imgWidth,
          height: imgHeight,
        } = imgRef.value.getBoundingClientRect();

        const distanceX = imgLeft - cropLeft;
        const distanceY = imgTop - cropTop;

        const cropcanvas = await ibiz.util.html2canvas.getCanvas(imgRef.value, {
          x: -distanceX, // 指定截取区域的左上角 x 坐标
          y: -distanceY, // 指定截取区域的左上角 y 坐标
          width: props.cropareaWidth, // 指定截取区域的宽度
          height: props.cropareaHeight, // 指定截取区域的高度
        });
        const ctx = cropcanvas.getContext('2d');
        const imageData = ctx!.getImageData(
          0,
          0,
          cropcanvas.width,
          cropcanvas.height,
        );
        const data = imageData.data;
        const width = cropcanvas.width;
        const height = cropcanvas.height;
        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            const index = (y * width + x) * 4;
            // 判断当前像素点是否超出原始图像边界（基于计算出的相对位置偏移）
            if (
              x < distanceX ||
              x > imgWidth + distanceX - 2 ||
              y < distanceY ||
              y > imgHeight + distanceY - 2
            ) {
              data[index + 3] = 0; // 将超出部分的像素透明度设置为0，避免白边
            }
          }
        }
        ctx!.putImageData(imageData, 0, 0);
        cropDataUrl = cropcanvas.toDataURL('image/png');
      }
      // 确认，截取裁剪框的内容
      emit('change', cropDataUrl);
    };

    return {
      ns,
      cropImgUrl,
      scaleNumber,
      style,
      uuid,
      imgRef,
      onReduce,
      onAdd,
      onMouseDown,
      onMouseMove,
      onMouseUp,
      onMouseLeave,
      onCancel,
      onConfirm,
      onWheel,
    };
  },
  render() {
    return (
      <div class={this.ns.b()}>
        <div class={this.ns.e('content')}>
          <div class={this.ns.em('content', 'crop')}>
            <div
              id={this.uuid}
              class={this.ns.em('content', 'croparea')}
              style={{
                height: `${this.cropareaHeight}px`,
                width: `${this.cropareaWidth}px`,
              }}
              onMousedown={this.onMouseDown}
              onMousemove={this.onMouseMove}
              onMouseup={this.onMouseUp}
              onMouseleave={this.onMouseLeave}
              onWheel={this.onWheel}
            ></div>
            <img
              style={this.style}
              ref='imgRef'
              class={this.ns.em('content', 'img')}
              src={this.cropImgUrl}
              alt=''
            />
          </div>
          <div class={this.ns.em('content', 'scale-slider')}>
            <ion-icon
              class={this.ns.em('content', 'scale-icon')}
              name='remove-outline'
              onClick={this.onReduce}
            ></ion-icon>
            <el-slider
              v-model={this.scaleNumber}
              max={3}
              min={1}
              step={0.1}
            ></el-slider>
            <ion-icon
              class={this.ns.em('content', 'scale-icon')}
              name='add-outline'
              onClick={this.onAdd}
            ></ion-icon>
          </div>
        </div>
        <div class={this.ns.e('footer')}>
          <div class={this.ns.em('footer', 'cancel')} onClick={this.onCancel}>
            {ibiz.i18n.t('editor.common.cancel')}
          </div>
          <div class={this.ns.em('footer', 'confirm')} onClick={this.onConfirm}>
            {ibiz.i18n.t('editor.common.confirm')}
          </div>
        </div>
      </div>
    );
  },
});
