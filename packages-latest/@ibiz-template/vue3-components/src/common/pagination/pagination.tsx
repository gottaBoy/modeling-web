import { computed, defineComponent, PropType } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import { isNil } from 'ramda';
import './pagination.scss';
import { showTitle } from '@ibiz-template/core';

// 多数据分页栏语义化节点数据
type semanticData = {
  refresh: {
    class: string;
    style: string;
  };
  description: {
    class: string;
    style: string;
  };
  item: {
    class: string;
    style: string;
  };
  prev: {
    class: string;
    style: string;
  };
  next: {
    class: string;
    style: string;
  };
  sizes: {
    class: string;
    style: string;
  };
  jump: {
    class: string;
    style: string;
  };
};

export const IBizPagination = defineComponent({
  name: 'IBizPagination',
  props: {
    total: {
      type: Number,
      required: true,
    },
    curPage: {
      type: Number,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number || undefined,
      required: false,
    },
    popperClass: {
      type: String,
      required: false,
    },
    mode: {
      type: String as PropType<'default' | 'simple'>,
      default: 'default',
    },
    semantic: {
      type: Object as PropType<semanticData>,
      default: () => ({
        refresh: { class: '', style: '' },
        description: { class: '', style: '' },
        item: { class: '', style: '' },
        prev: { class: '', style: '' },
        next: { class: '', style: '' },
        sizes: { class: '', style: '' },
        jump: { class: '', style: '' },
      }),
    },
  },
  emits: ['change', 'pageSizeChange', 'pageRefresh'],
  setup(props, { emit }) {
    const ns = useNamespace('pagination');

    const start = computed(() => {
      return (props.curPage - 1) * props.size + 1;
    });

    const end = computed(() => {
      return props.curPage * props.size;
    });

    const onPageChange = (page: number): void => {
      emit('change', page);
    };
    const onPageSizeChange = (size: number): void => {
      emit('pageSizeChange', size);
    };
    const pageRefresh = (): void => {
      emit('pageRefresh');
    };
    const inputChange = (event: MouseEvent): void => {
      // 阻止change冒泡
      event.stopPropagation?.();
    };

    const calcTotalPages = computed(() => {
      return Math.ceil(props.total / props.size);
    });

    return {
      ns,
      start,
      end,
      onPageChange,
      onPageSizeChange,
      pageRefresh,
      inputChange,
      calcTotalPages,
    };
  },
  render() {
    if (this.mode === 'simple') {
      return (
        <div class={this.ns.b()}>
          <el-pagination
            class={this.ns.b('simple')}
            page-size={this.size}
            layout='slot, prev, pager, next'
            background
            total={this.total}
            page-count={
              !isNil(this.totalPages) && this.calcTotalPages === this.totalPages
                ? this.calcTotalPages
                : this.totalPages
            }
            current-page={this.curPage}
            {...{
              'onUpdate:currentPage': this.onPageChange,
              'onUpdate:pageSize': this.onPageSizeChange,
              onChange: this.inputChange,
            }}
          >
            <span>
              {ibiz.i18n.t('component.pagination.total')}&nbsp;
              {this.total}
              &nbsp;{ibiz.i18n.t('component.pagination.pieceData')}
            </span>
          </el-pagination>
        </div>
      );
    }
    return (
      <div class={this.ns.b()}>
        <el-pagination
          layout='slot, prev, pager, next, sizes, jumper'
          background
          total={this.total}
          page-count={
            !isNil(this.totalPages) && this.calcTotalPages === this.totalPages
              ? this.calcTotalPages
              : this.totalPages
          }
          current-page={this.curPage}
          page-size={this.size}
          popper-class={this.popperClass}
          page-sizes={[10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
          {...{
            'onUpdate:currentPage': this.onPageChange,
            'onUpdate:pageSize': this.onPageSizeChange,
            onChange: this.inputChange,
          }}
        >
          <span
            class={[this.ns.b('btn'), this.semantic.refresh.class]}
            style={this.semantic.refresh.style}
          >
            <el-button
              title={showTitle(ibiz.i18n.t('app.refresh'))}
              onClick={this.pageRefresh}
            >
              <ion-icon name='refresh-outline'></ion-icon>
            </el-button>
          </span>
          {isNil(this.totalPages) || this.calcTotalPages === this.totalPages ? (
            <span
              class={[this.ns.b('desc'), this.semantic.description.class]}
              style={this.semantic.description.style}
            >
              {ibiz.i18n.t('component.pagination.display')}&nbsp;{this.start}
              &nbsp;-&nbsp;{this.end}&nbsp;
              {ibiz.i18n.t('component.pagination.piece')}，
            </span>
          ) : null}
          <span
            class={[this.ns.b('desc'), this.semantic.description.class]}
            style={this.semantic.description.style}
          >
            {ibiz.i18n.t('component.pagination.total')}&nbsp;
            {this.total}
            &nbsp;{ibiz.i18n.t('component.pagination.pieceData')}
          </span>
        </el-pagination>
      </div>
    );
  },
});
