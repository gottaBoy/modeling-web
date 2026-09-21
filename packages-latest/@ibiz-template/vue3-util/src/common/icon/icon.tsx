import { defineComponent, PropType, VNode, computed } from 'vue';
import { ISysImage } from '@ibiz/model-core';
import { IIcon } from '@ibiz-template/runtime';
import {
  base64ToStr,
  isBase64,
  isBase64Image,
  isSvg,
} from '@ibiz-template/core';
import { useNamespace } from '../../use';
import './icon.scss';

export const IBizIcon = defineComponent({
  name: 'IBizIcon',
  props: {
    icon: {
      type: Object as PropType<ISysImage | IIcon>,
    },
    size: {
      type: String as PropType<'small' | 'medium' | 'large'>,
    },
    baseDir: {
      type: String,
      default: 'images',
    },
  },
  setup(props) {
    const ns = useNamespace('icon');
    const BaseUrl = `${ibiz.env.assetsUrl}/${props.baseDir}/`;

    function getContent(icon?: IData): VNode | null {
      if (icon) {
        if (icon.htmlStr) {
          return <span class={ns.b()} v-html={icon.htmlStr}></span>;
        }
        if (icon.cssClass) {
          if (icon.cssClass.indexOf('fa-') !== -1) {
            return <i class={[ns.b(), icon.cssClass]} />;
          }
          if (icon.cssClass.indexOf('theme-icon') !== -1) {
            return <i class={[ns.b(), icon.cssClass]}></i>;
          }
          return <ion-icon class={ns.b()} name={icon.cssClass}></ion-icon>;
        }
        if (icon.imagePath) {
          // base64格式内容
          if (isBase64Image(icon.imagePath)) {
            return <img class={ns.b()} src={icon.imagePath}></img>;
          }
          // UTF-8 表情字符
          if (isBase64(icon.imagePath)) {
            return (
              <div class={[ns.b(), ns.e('emoji')]}>
                {base64ToStr(icon.imagePath)}
              </div>
            );
          }
          // svg内容
          if (isSvg(icon.imagePath)) {
            return <div class={ns.b()} v-html={icon.imagePath}></div>;
          }
          // 以svg结尾
          if (icon.imagePath.endsWith('svg')) {
            // 远程svg
            if (icon.imagePath.startsWith('http')) {
              return <img class={ns.b()} src={icon.imagePath}></img>;
            }
            // 本地svg
            return (
              <ion-icon
                src={BaseUrl + icon.imagePath}
                class={ns.b()}
              ></ion-icon>
            );
          }
          // 远程图片
          if (icon.imagePath.startsWith('http')) {
            return <img class={ns.b()} src={icon.imagePath} />;
          }
          // 本地图片
          return <img class={ns.b()} src={BaseUrl + icon.imagePath} />;
        }
        if (icon.rawContent) {
          if (isSvg(icon.rawContent)) {
            return <div class={ns.b()} v-html={icon.rawContent}></div>;
          }
          return <img class={ns.b()} src={icon.rawContent} />;
        }
      }
      return null;
    }

    const content = computed<VNode | null>(() => {
      return getContent(props.icon);
    });

    return (): VNode | null => content.value;
  },
});
