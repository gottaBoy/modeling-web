import {
  Component,
  Host,
  Prop,
  State,
  Watch,
  forceUpdate,
} from '@stencil/core';
import type { VNode } from '@stencil/core';
import { ModelRuntimeController } from '../../core/model-runtime-controller';
import { h } from '../../core/render';
import type { RuntimeRenderChild } from '../../core/render';
import type { RuntimeSelection } from '../../core/types';

/**
 * Reconstructed candidate for the observed ibiz-model-runtime component.
 * This is editable TypeScript reconstructed from the compiled 0.2.2 artifact.
 */
@Component({
  tag: 'ibiz-model-runtime',
  styleUrl: 'ibiz-model-runtime.css',
  shadow: false,
})
export class IBizModelRuntime {
  @Prop() url!: any;
  @Prop() headers!: any;
  @Prop({ attribute: 'parent-key' }) parentKey?: string;
  @Prop({ attribute: 'config-base-url' }) configBaseUrl!: string;

  @State() breadcrumbHoverIndex = -1;

  readonly controller = new ModelRuntimeController();
  breadcrumb!: HTMLElement;
  contentContainer!: HTMLElement;

  @Watch('parentKey')
  watchParentKey(val?: string, oldVal?: string): void {
    if (val !== oldVal) {
      this.loadRoot();
    }
  }

  componentWillLoad(): void {
    this.controller.store.use({
      set: key => {
        if (
          key === 'list' ||
          key === 'activeList' ||
          key === 'errorMessage' ||
          key === 'loaded'
        ) {
          forceUpdate(this);
        }
      },
    });
  }

  componentDidLoad(): void {
    this.controller.url = this.url;
    this.controller.headers = this.headers;
    this.controller.configBaseUrl = this.configBaseUrl;
    this.loadRoot();
  }

  loadRoot(): void {
    if (this.parentKey) {
      this.controller.loadRootData({ srfparentkey: this.parentKey });
    }
  }

  isShowBreadcrumb(): boolean {
    if (this.contentContainer) {
      return (
        this.contentContainer.offsetWidth < this.contentContainer.scrollWidth
      );
    }
    return false;
  }

  modelTreeSelect(_data: RuntimeSelection): void {
    this.controller.loadRootData();
  }

  listMounted(): void {
    if (this.isShowBreadcrumb()) {
      this.setContentScroll(this.contentContainer.scrollWidth);
      this.breadcrumb.scrollTo(this.breadcrumb.scrollWidth, 0);
      forceUpdate(this);
    }
  }

  setContentScroll(x: number, _y = 0): void {
    if (!this.isShowBreadcrumb()) {
      return;
    }
    const container = this.contentContainer;
    let dVal = container.scrollLeft - x;
    let num = Math.abs(dVal / 10);
    if (num < 150) {
      num = 150;
    }
    if (dVal > 0) {
      const loop = (): void => {
        if (dVal <= 0) {
          return;
        }
        container.scrollLeft -= dVal - num <= 0 ? Math.abs(dVal) : num;
        dVal -= num;
        setTimeout(() => loop(), 1);
      };
      loop();
    } else if (dVal < 0) {
      const loop = (): void => {
        if (dVal >= 0) {
          return;
        }
        container.scrollLeft += dVal + num >= 0 ? Math.abs(dVal) : num;
        dVal += num;
        setTimeout(() => loop(), 1);
      };
      loop();
    }
  }

  changePosition(index: number): void {
    this.setContentScroll(400 * index);
  }

  breadcrumbMouseEnter(index: number, _e?: MouseEvent): void {
    this.breadcrumbHoverIndex = index;
  }

  breadcrumbMouseLeave(_e?: MouseEvent): void {
    this.breadcrumbHoverIndex = -1;
  }

  emptySvg(): VNode {
    return h(
      'svg',
      {
        width: '184',
        height: '100',
        viewBox: '0 0 184 154',
        xmlns: 'http://www.w3.org/2000/svg',
      },
      h(
        'g',
        { fill: 'none' },
        h(
          'g',
          { transform: 'translate(24 31.67)' },
          h('ellipse', {
            fill: '#F5F5F7',
            cx: '67.797',
            cy: '106.89',
            rx: '67.797',
            ry: '12.668',
          }),
          h('path', {
            d: 'M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z',
            fill: '#AEB8C2',
          }),
          h('path', {
            d: 'M101.537 86.214L80.63 61.102c-1.001-1.207-2.507-1.867-4.048-1.867H31.724c-1.54 0-3.047.66-4.048 1.867L6.769 86.214v13.792h94.768V86.214z',
            fill: 'url(#linearGradient-1)',
            transform: 'translate(13.56)',
          }),
          h('path', {
            d: 'M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z',
            fill: '#F5F5F7',
          }),
          h('path', {
            d: 'M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z',
            fill: '#DCE0E6',
          }),
        ),
        h('path', {
          d: 'M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z',
          fill: '#DCE0E6',
        }),
        h(
          'g',
          { transform: 'translate(149.65 15.383)', fill: '#FFF' },
          h('ellipse', { cx: '20.654', cy: '3.167', rx: '2.849', ry: '2.815' }),
          h('path', {
            d: 'M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z',
          }),
        ),
      ),
    );
  }

  renderEmpty(info: RuntimeRenderChild, icon?: RuntimeRenderChild): VNode {
    return h(
      'div',
      { class: 'ant-empty' },
      h('div', { class: 'ant-empty-image' }, icon ? icon : this.emptySvg()),
      h('p', { class: 'ant-empty-description' }, info),
    );
  }

  render(): VNode {
    return h(
      Host,
      { class: 'ibiz-model-runtime' },
      h(
        'div',
        {
          class: 'ibiz-model-runtime-breadcrumb-container',
          style: { display: this.isShowBreadcrumb() ? 'block' : 'none' },
        },
        h(
          'div',
          {
            ref: (ref: HTMLElement) => (this.breadcrumb = ref),
            class: 'ibiz-model-runtime-breadcrumb',
          },
          this.controller.data.activeList.map((item, index) => {
            return [
              index !== 0
                ? h(
                    'div',
                    { class: 'ibiz-model-runtime-breadcrumb-separator' },
                    '>',
                  )
                : null,
              h(
                'div',
                {
                  class: 'ibiz-model-runtime-breadcrumb-item',
                  'on-click': () => this.changePosition(index),
                  'on-mouseenter': () => this.breadcrumbMouseEnter(index),
                  'on-mouseleave': () => this.breadcrumbMouseLeave(),
                },
                item.data!.logicName || item.text,
              ),
            ];
          }),
        ),
      ),
      h(
        'div',
        {
          ref: (ref: HTMLElement) => (this.contentContainer = ref),
          class: 'ibiz-model-runtime-content',
          style: {
            height: this.isShowBreadcrumb() ? 'calc(100% - 28px)' : null,
            display: !(
              this.controller.data.list.length === 0 &&
              this.controller.data.loaded === true
            )
              ? null
              : 'none',
          },
        },
        this.controller.data.list.map((item, index) => {
          return h(
            'div',
            {
              key: index,
              class: {
                'ibiz-model-runtime-column': true,
                hover: this.breadcrumbHoverIndex === index,
              },
            },
            h('ibiz-model-runtime-list', {
              controller: this.controller,
              items: item,
              index: index,
              parent: this.controller.data.activeList[index],
              'on-mounted': () => this.listMounted(),
            }),
            h('div', { class: 'ibiz-model-runtime-column-split' }),
          );
        }),
        h(
          'div',
          {
            key: 'ibiz-model-runtime-column-next',
            class: 'ibiz-model-runtime-column-next',
          },
          h('loading-panel', { id: 'loadingPanel' }),
          h(
            'div',
            { class: 'ibiz-model-runtime-column-info' },
            this.renderEmpty(
              '请在左侧选择数据',
              h(
                'svg',
                {
                  class: 'icon',
                  viewBox: '0 0 1024 1024',
                  version: '1.1',
                  xmlns: 'http://www.w3.org/2000/svg',
                  'p-id': '10934',
                  width: '100',
                  height: '100',
                },
                h('defs', null, h('style', { type: 'text/css' })),
                h('path', {
                  fill: 'rgb(204, 204, 204)',
                  d: 'M904.533333 503.466667c0 11.946667-3.959467 22.186667-11.946666 30.72-8.533333 7.9872-18.773333 11.946667-30.72 11.946666s-21.896533-3.959467-29.866667-11.946666c-8.533333-8.533333-12.8-18.773333-12.8-30.72s4.266667-21.896533 12.8-29.866667c7.970133-8.533333 17.92-12.8 29.866667-12.8s22.186667 4.266667 30.72 12.8c7.9872 7.970133 11.946667 17.92 11.946666 29.866667zM742.4 460.8c11.946667 0 22.186667 4.266667 30.72 12.8 7.9872 7.970133 11.946667 17.92 11.946667 29.866667s-3.959467 22.186667-11.946667 30.72c-8.533333 7.9872-18.773333 11.946667-30.72 11.946666s-21.896533-3.959467-29.866667-11.946666c-8.533333-8.533333-12.8-18.773333-12.8-30.72s4.266667-21.896533 12.8-29.866667c7.970133-8.533333 17.92-12.8 29.866667-12.8zM426.666667 247.466667c0 11.946667-3.976533 22.186667-11.946667 30.72-8.533333 7.970133-18.773333 11.946667-30.72 11.946666s-21.896533-3.976533-29.866667-11.946666c-8.533333-8.533333-12.8-18.773333-12.8-30.72s4.266667-21.896533 12.8-29.866667c7.970133-8.533333 17.92-12.8 29.866667-12.8s22.186667 4.266667 30.72 12.8c7.970133 7.970133 11.946667 17.92 11.946667 29.866667z m-11.946667 168.106666c-8.533333 7.970133-18.773333 11.946667-30.72 11.946667s-21.896533-3.976533-29.866667-11.946667c-8.533333-8.533333-12.8-18.773333-12.8-30.72s4.266667-21.896533 12.8-29.866666c7.970133-8.533333 17.92-12.8 29.866667-12.8s22.186667 4.266667 30.72 12.8c7.970133 7.970133 11.946667 17.92 11.946667 29.866666s-3.976533 22.186667-11.946667 30.72z m-118.613333 0c-8.533333 7.970133-18.773333 11.946667-30.72 11.946667s-21.896533-3.976533-29.866667-11.946667c-8.533333-8.533333-12.8-18.773333-12.8-30.72s4.266667-21.896533 12.8-29.866666c7.970133-8.533333 17.92-12.8 29.866667-12.8s22.186667 4.266667 30.72 12.8c7.970133 7.970133 11.946667 17.92 11.946666 29.866666s-3.976533 22.186667-11.946666 30.72z m11.946666 87.893334c0 11.946667-3.976533 22.186667-11.946666 30.72-8.533333 7.9872-18.773333 11.946667-30.72 11.946666s-21.896533-3.959467-29.866667-11.946666c-8.533333-8.533333-12.8-18.773333-12.8-30.72s4.266667-21.896533 12.8-29.866667c7.970133-8.533333 17.92-12.8 29.866667-12.8s22.186667 4.266667 30.72 12.8c7.970133 7.970133 11.946667 17.92 11.946666 29.866667z m-119.466666 0c0 11.946667-3.976533 22.186667-11.946667 30.72-8.533333 7.9872-18.773333 11.946667-30.72 11.946666s-21.896533-3.959467-29.866667-11.946666c-8.533333-8.533333-12.8-18.773333-12.8-30.72s4.266667-21.896533 12.8-29.866667c7.970133-8.533333 17.92-12.8 29.866667-12.8s22.186667 4.266667 30.72 12.8c7.970133 7.970133 11.946667 17.92 11.946667 29.866667z m46.933333 89.6c7.970133-8.533333 17.92-12.8 29.866667-12.8s22.186667 4.266667 30.72 12.8c7.970133 7.970133 11.946667 17.92 11.946666 29.866666s-3.976533 22.186667-11.946666 30.72c-8.533333 7.9872-18.773333 11.946667-30.72 11.946667s-21.896533-3.959467-29.866667-11.946667c-8.533333-8.533333-12.8-18.773333-12.8-30.72s4.266667-21.896533 12.8-29.866666z m418.133333-119.466667c7.9872 7.970133 11.946667 17.92 11.946667 29.866667s-3.959467 22.186667-11.946667 30.72c-8.533333 7.9872-18.773333 11.946667-30.72 11.946666s-21.896533-3.959467-29.866666-11.946666c-8.533333-8.533333-12.8-18.773333-12.8-30.72s4.266667-21.896533 12.8-29.866667c7.970133-8.533333 17.92-12.8 29.866666-12.8s22.186667 4.266667 30.72 12.8zM546.133333 503.466667c0 11.946667-3.959467 22.186667-11.946666 30.72-8.533333 7.9872-18.773333 11.946667-30.72 11.946666s-21.896533-3.959467-29.866667-11.946666c-8.533333-8.533333-12.8-18.773333-12.8-30.72s4.266667-21.896533 12.8-29.866667c7.970133-8.533333 17.92-12.8 29.866667-12.8s22.186667 4.266667 30.72 12.8c7.9872 7.970133 11.946667 17.92 11.946666 29.866667z m-131.413333-29.866667c7.970133 7.970133 11.946667 17.92 11.946667 29.866667s-3.976533 22.186667-11.946667 30.72c-8.533333 7.9872-18.773333 11.946667-30.72 11.946666s-21.896533-3.959467-29.866667-11.946666c-8.533333-8.533333-12.8-18.773333-12.8-30.72s4.266667-21.896533 12.8-29.866667c7.970133-8.533333 17.92-12.8 29.866667-12.8s22.186667 4.266667 30.72 12.8z m11.946667 149.333333c0 11.946667-3.976533 22.186667-11.946667 30.72-8.533333 7.9872-18.773333 11.946667-30.72 11.946667s-21.896533-3.959467-29.866667-11.946667c-8.533333-8.533333-12.8-18.773333-12.8-30.72s4.266667-21.896533 12.8-29.866666c7.970133-8.533333 17.92-12.8 29.866667-12.8s22.186667 4.266667 30.72 12.8c7.970133 7.970133 11.946667 17.92 11.946667 29.866666z m0 136.533334c0 11.946667-3.976533 22.186667-11.946667 30.72-8.533333 7.9872-18.773333 11.946667-30.72 11.946666s-21.896533-3.959467-29.866667-11.946666c-8.533333-8.533333-12.8-18.773333-12.8-30.72s4.266667-21.896533 12.8-29.866667c7.970133-8.533333 17.92-12.8 29.866667-12.8s22.186667 4.266667 30.72 12.8c7.970133 7.970133 11.946667 17.92 11.946667 29.866667z',
                  'p-id': '10935',
                }),
              ),
            ),
          ),
          h('div', { class: 'ibiz-model-runtime-column-split' }),
        ),
      ),
      h(
        'div',
        {
          class: 'ibiz-model-runtime-empty',
          style: {
            display:
              this.controller.data.list.length === 0 &&
              this.controller.data.loaded === true
                ? null
                : 'none',
          },
        },
        this.renderEmpty('暂无模型数据'),
        h(
          'div',
          { class: 'ibiz-model-runtime-empty-refresh' },
          h(
            'a',
            { href: 'javascript:void(0);', 'on-click': () => this.loadRoot() },
            '\u91CD\u65B0\u52A0\u8F7D',
          ),
        ),
        h(
          'div',
          {
            class: 'ibiz-model-runtime-empty-error',
            style: {
              display:
                this.controller.data.errorMessage &&
                !Object.is(this.controller.data.errorMessage, '')
                  ? null
                  : 'none',
            },
          },
          this.controller.data.errorMessage,
        ),
      ),
    );
  }
}
