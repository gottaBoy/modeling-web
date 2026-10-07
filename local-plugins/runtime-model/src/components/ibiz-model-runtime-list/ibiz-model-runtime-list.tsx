import {
  Component,
  Event,
  EventEmitter,
  Prop,
  State,
  Watch,
  forceUpdate,
} from '@stencil/core';
import type { VNode } from '@stencil/core';
import InfiniteAjaxScroll from '@webcreate/infinite-ajax-scroll';
import { clone } from 'ramda';
import type { ModelRuntimeController } from '../../core/model-runtime-controller';
import { h } from '../../core/render';
import type { RuntimeItem, RuntimeSelection } from '../../core/types';

@Component({
  tag: 'ibiz-model-runtime-list',
  styleUrl: 'ibiz-model-runtime-list.css',
  shadow: false,
})
export class IBizModelRuntimeList {
  @Prop() controller!: ModelRuntimeController;
  @Prop() items: RuntimeItem[] = [];
  @Prop() index!: number;
  @Prop() parent: any = {};
  @State() list: RuntimeItem[] = [];

  @Event({
    eventName: 'mounted',
    bubbles: true,
    cancelable: true,
    composed: true,
  })
  mountedEvent!: EventEmitter<void>;

  $searchValue = '';
  timer = -1;
  $topSearchValue = '';
  searchReg = new RegExp('(.*)');
  activeData: RuntimeSelection = {};
  showList: RuntimeItem[] = [];
  page = { size: 10 };
  isLoadMore = true;
  runtimeListRef!: HTMLElement;
  spinnerRef?: HTMLElement;
  hiddenInput!: HTMLInputElement;

  @Watch('items')
  watchItems(): void {
    this.list = clone(this.items);
    this.calcShowListContent();
  }

  setSearchValue(e: Event): void {
    if (this.timer !== -1) {
      clearTimeout(this.timer);
      this.timer = -1;
    }
    this.timer = setTimeout(() => {
      const input = e.target as HTMLInputElement;
      const val = input.value;
      this.$searchValue = (val as unknown as RuntimeSearchString)
        .trimStart()
        .trimEnd();
      this.searchReg = new RegExp(
        this.$searchValue.replace('*', '(.*)').toUpperCase(),
      );
      this.showListReset();
      forceUpdate(this);
    }, 300);
  }

  componentWillLoad(): void {
    this.list = clone(this.items);
    this.calcShowListContent();
  }

  componentDidLoad(): void {
    new InfiniteAjaxScroll(this.runtimeListRef, {
      scrollContainer: this.runtimeListRef,
      item: '.model-runtime-list-item',
      next: () => {
        this.load();
        forceUpdate(this);
        return true;
      },
      spinner: this.spinnerRef,
    });
    this.mountedEvent.emit();
  }

  isActive(item: RuntimeItem): boolean {
    return Object.is(this.activeData.id, item.id);
  }

  showListReset(): void {
    this.isLoadMore = true;
    this.calcShowListContent();
  }

  calcShowListContent(): void {
    this.showList = this.getShowList(0, 30);
  }

  load(): void {
    this.showList.push(
      ...this.getShowList(
        this.showList.length,
        this.showList.length + this.page.size,
      ),
    );
  }

  getShowList(start: number, end: number): RuntimeItem[] {
    // The compiled component passes `end` as splice's deleteCount. Preserve it.
    const arr = this.list
      .filter(item => this.itemIsShow(item) || this.isActive(item))
      .splice(start, end);
    if (arr.length <= 0) {
      this.isLoadMore = false;
    }
    return arr;
  }

  rowSelect(e: Event, item: RuntimeItem): void {
    e.stopPropagation();
    if (!item.leaf && !Object.is(this.activeData.id, item.id)) {
      this.activeData = item;
      this.controller.loadChildren(this.index, item);
      this.controller.setActiveItem(item);
    }
  }

  refresh(): void {
    this.controller.clearCache();
    this.controller.loadChildren(this.index - 1, this.parent);
    this.controller.setActiveItem(this.parent);
    this.activeData = {};
  }

  copyPasteboard(e: MouseEvent, text: string): void {
    if (e.ctrlKey || e.metaKey) {
      e.stopPropagation();
      this.hiddenInput.value = text;
      this.hiddenInput.select();
      const judge = document.execCommand('copy');
      if (judge === true) {
        this.floatText(e, '成功复制：' + text);
      } else {
        this.floatText(e, '暂未支持您的浏览器点击复制功能');
      }
    }
  }

  floatText(e: MouseEvent, text: string): void {
    const div = document.createElement('div');
    div.className = 'dynamic-model-copy-float-text';
    div.innerText = text;
    div.style.top = e.pageY + 'px';
    div.style.left = '-1000px';
    document.body.appendChild(div);
    setTimeout(() => {
      div.style.top = e.pageY - 100 + 'px';
      div.style.left =
        (e.pageX <= 200 ? e.pageX + 200 : e.pageX) - div.offsetWidth + 'px';
      div.style.opacity = '0';
      setTimeout(() => {
        document.body.removeChild(div);
      }, 3000);
    }, 1);
  }

  itemIsShow(item: RuntimeItem): boolean {
    if (
      (!this.$searchValue || Object.is(this.$searchValue, '')) &&
      (!this.$topSearchValue || Object.is(this.$topSearchValue, ''))
    ) {
      return true;
    }
    const data = item.data;
    let val = '';
    if (data.logicName) val += data.logicName;
    if (data.methodName) val += data.methodName;
    if (data.val) val += data.val;
    if (data.apiMethod) val += data.apiMethod;
    if (data.apiDescription) val += data.apiDescription;
    return this.searchReg.test(val.toUpperCase());
  }

  renderListItemContent(item: RuntimeItem, _index: number): VNode {
    const method = item.data.methodName || item.data.apiMethod;
    const val = item.data.val || item.data.apiReturn;
    const description = item.data.logicName || item.data.apiDescription;
    return h(
      'div',
      {
        key: item.id,
        class: {
          'model-runtime-list-item': true,
          active: this.isActive(item),
          api: item.isApi,
        },
        'on-click': (e: MouseEvent) => this.rowSelect(e, item),
      },
      h(
        'div',
        { class: { 'model-runtime-item': true } },
        h(
          'div',
          { class: 'model-runtime-item-container' },
          method
            ? h(
                'div',
                {
                  title: method,
                  class: 'model-runtime-item-content-method',
                  'on-click': (e: MouseEvent) => this.copyPasteboard(e, method),
                },
                method,
                ':',
              )
            : null,
          val
            ? h(
                'div',
                {
                  class: 'model-runtime-item-content-value',
                  title: val,
                  'on-click': (e: MouseEvent) => this.copyPasteboard(e, val),
                },
                val,
              )
            : null,
        ),
        h(
          'div',
          { class: 'model-runtime-item-content', title: description },
          description,
        ),
      ),
      item.leaf
        ? null
        : h(
            'div',
            { class: 'model-runtime-item-arrow' },
            h(
              'svg',
              {
                class: 'icon',
                viewBox: '0 0 1024 1024',
                version: '1.1',
                xmlns: 'http://www.w3.org/2000/svg',
                width: '16',
                height: '16',
              },
              h('path', {
                d: 'M760.02162461 509.45780714L357.59235413 911.88707762c-21.31940693 21.31940693-55.85589134 21.31940693-77.17413319 0s-21.31940693-55.85589134 0-77.17413319l325.25513728-325.25513729L280.41822094 184.20266986c-21.31940693-21.31940693-21.31940693-55.85589134 0-77.17413318s55.85589134-21.31940693 77.17413319 0L760.02162461 509.45780714z',
                fill: 'var(--view-font-color-tint, #333)',
              }),
            ),
          ),
    );
  }

  renderListContent(): VNode {
    return h(
      'div',
      {
        ref: (ref: HTMLElement) => (this.runtimeListRef = ref),
        class: 'ibiz-model-runtime-list',
      },
      this.showList.map((item, i) => this.renderListItemContent(item, i)),
    );
  }

  render(): VNode {
    const title = this.parent.data.logicName || this.parent.text;
    return h(
      'div',
      { class: 'ibiz-model-runtime-list-container' },
      h(
        'div',
        { class: 'ibiz-model-runtime-list-header' },
        h(
          'div',
          { class: 'ibiz-model-runtime-list-title', title: title },
          title,
        ),
        h(
          'div',
          { class: 'ibiz-model-runtime-list-search' },
          h('input', {
            class: 'ibiz-model-runtime-list-search-input',
            value: this.$searchValue,
            placeholder: '\u5FEB\u901F\u5B9A\u4F4D',
            onInput: (e: Event) => this.setSearchValue(e),
          }),
        ),
        h(
          'div',
          {
            class: 'ibiz-model-runtime-refresh',
            'on-click': () => this.refresh(),
          },
          h(
            'svg',
            {
              class: 'icon',
              viewBox: '0 0 1024 1024',
              version: '1.1',
              xmlns: 'http://www.w3.org/2000/svg',
              width: '16',
              height: '16',
            },
            h('path', {
              d: 'M868.8359375 679.6953125L868.8359375 679.6953125c40.078125-86.8359375 45.703125-181.0546875 22.8515625-266.8359375-26.3671875-98.7890625-91.40625-187.03125-185.9765625-240.46875L747.546875 82.390625l-238.0078125 62.2265625 106.5234375 221.8359375 43.9453125-94.5703125c63.984375 39.0234375 107.9296875 100.546875 126.5625 169.453125 16.5234375 62.2265625 12.65625 129.7265625-16.5234375 193.0078125-36.9140625 80.15625-106.171875 135-185.2734375 156.09375-11.6015625 3.1640625-23.203125 5.2734375-34.8046875 7.03125l49.21875 101.6015625c4.5703125-1.0546875 9.140625-2.109375 14.0625-3.515625C721.8828125 866.375 817.859375 790.4375 868.8359375 679.6953125L868.8359375 679.6953125M363.640625 759.1484375c-65.0390625-39.0234375-109.6875-100.8984375-128.3203125-170.5078125-16.5234375-62.2265625-12.65625-129.7265625 16.5234375-193.0078125 36.9140625-80.15625 106.171875-135 185.2734375-156.09375 13.0078125-3.515625 26.3671875-5.9765625 40.078125-7.734375l-48.8671875-101.953125c-6.328125 1.40625-13.0078125 2.8125-19.3359375 4.5703125-108.984375 29.1796875-205.3125 105.1171875-255.9375 215.859375-40.078125 86.8359375-45.703125 181.0546875-22.8515625 266.484375l0 0.3515625c26.71875 99.4921875 92.4609375 188.0859375 187.734375 241.5234375l-39.7265625 86.1328125 237.65625-63.28125-107.2265625-221.484375L363.640625 759.1484375 363.640625 759.1484375M363.640625 759.1484375L363.640625 759.1484375z',
              fill: '#8a8a8a',
            }),
          ),
        ),
      ),
      h(
        'div',
        { class: 'ibiz-model-runtime-list-content' },
        this.renderListContent(),
      ),
      h('input', {
        type: 'text',
        ref: (ref: HTMLInputElement) => (this.hiddenInput = ref),
        class: 'hidden-input',
      }),
    );
  }
}

interface RuntimeSearchString {
  trimStart(): RuntimeSearchString;
  trimEnd(): string;
}
