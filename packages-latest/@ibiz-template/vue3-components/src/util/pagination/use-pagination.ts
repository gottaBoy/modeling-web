import { useSemanticNode } from '@ibiz-template/vue3-util';
import {
  ControlVO,
  GridController,
  GridRowState,
  IMDControlController,
} from '@ibiz-template/runtime';
import { chunk } from 'lodash-es';

/**
 * 使用分页组件
 *
 * @author lxm
 * @date 2022-09-06 17:09:09
 * @export
 * @param {GridController} c
 * @returns {*}
 */
export function usePagination(c: IMDControlController): {
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  onPageRefresh: () => void;
  pageSemantic: IData;
} {
  // 初始化表格项
  const initGridItems = () => {
    const controller = c as GridController;
    if (Array.isArray(controller.state.simpleData)) {
      controller.state.items =
        chunk(controller.state.simpleData, controller.state.size)[
          controller.state.curPage - 1
        ] || [];
      controller.state.rows = controller.state.items.map(item => {
        const row = new GridRowState(new ControlVO(item), controller);
        return row;
      });
    }
  };

  function onPageChange(page: number): void {
    if (!page || page === c.state.curPage) {
      return;
    }
    c.state.curPage = page;
    if (c.runMode === 'DESIGN') {
      initGridItems();
      return;
    }
    c.load();
  }

  function onPageSizeChange(size: number): void {
    if (!size || size === c.state.size) {
      return;
    }
    c.state.size = size;
    if (c.runMode === 'DESIGN') {
      initGridItems();
      return;
    }
    // 当page为第一页的时候切换size不会触发pageChange，需要自己触发加载
    if (c.state.curPage !== 1) {
      c.state.curPage = 1;
    }
    c.load();
  }

  function onPageRefresh(): void {
    c.load();
  }

  const { semanticClass, semanticStyle } = useSemanticNode(c);

  const pageSemantic = {
    refresh: {
      class: semanticClass('pagination.refresh'),
      style: semanticStyle('pagination.refresh'),
    },
    description: {
      class: semanticClass('pagination.description'),
      style: semanticStyle('pagination.description'),
    },
    item: {
      class: semanticClass('pagination.item'),
      style: semanticStyle('pagination.item'),
    },
    prev: {
      class: semanticClass('pagination.prev'),
      style: semanticStyle('pagination.prev'),
    },
    next: {
      class: semanticClass('pagination.next'),
      style: semanticStyle('pagination.next'),
    },
    sizes: {
      class: semanticClass('pagination.sizes'),
      style: semanticStyle('pagination.sizes'),
    },
    jump: {
      class: semanticClass('pagination.jump'),
      style: semanticStyle('pagination.jump'),
    },
  };
  return { pageSemantic, onPageChange, onPageSizeChange, onPageRefresh };
}
