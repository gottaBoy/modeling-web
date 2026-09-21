/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { computePosition } from '@floating-ui/dom';
import { RuntimeError } from '@ibiz-template/core';
import {
  TreeGridExRowState,
  TreeGridExController,
} from '@ibiz-template/runtime';
import { ComponentPublicInstance, reactive, ref, Ref } from 'vue';

export function useRowEditPopover(
  tableRef: Ref<IData | undefined>,
  c: TreeGridExController,
) {
  let popInstance: ComponentPublicInstance | undefined;
  const showPop = ref(false);
  const showPlaceholder = ref(false);
  const editingRow = ref<TreeGridExRowState | undefined>();

  const popStyle = reactive({});

  const findTrEl = (row: TreeGridExRowState): HTMLElement => {
    if (!tableRef.value) {
      throw new RuntimeError(ibiz.i18n.t('control.common.citeErrMessage'));
    }
    const tableEl = tableRef.value.$el as HTMLElement;

    // 找到对应那一行的element
    let selector = '.el-table__row';
    if (row.data._uuid) {
      selector += `[class*="id-${row.data._uuid}"]`;
    }
    const trEl = tableEl.querySelector(selector);
    if (!trEl) {
      throw new RuntimeError(ibiz.i18n.t('control.common.noDomErrMessage'));
    }
    return trEl as HTMLElement;
  };

  const showRowEditPop = async (row: TreeGridExRowState) => {
    const trEl = findTrEl(row);
    // 判断是否是最后一个元素，是的话显示占位，给弹出框留位置
    showPlaceholder.value = trEl.parentNode?.lastElementChild === trEl;

    if (!popInstance) {
      throw new RuntimeError(ibiz.i18n.t('control.common.noPopErrMessage'));
    }
    const popEl = popInstance.$el as HTMLElement;
    const { x, y } = await computePosition(trEl, popEl, {
      placement: 'bottom',
    });

    Object.assign(popStyle, {
      top: `${y}px`,
      left: `${x}px`,
    });
    editingRow.value = row;

    setTimeout(() => {
      showPop.value = true;
    }, 200);
  };

  const onConfirm = async () => {
    if (editingRow.value) {
      c.switchRowEdit(editingRow.value, false, true);
    }
  };
  const onCancel = async () => {
    if (editingRow.value) {
      c.switchRowEdit(editingRow.value, false, false);
    }
  };

  const renderPopover = () => {
    // 显示气泡，且最后一行是开启编辑态的时候用占位撑开高度
    return [
      <div
        class='row-edit-popover__placeholder'
        style={{ display: showPlaceholder.value ? 'block' : 'none' }}
      ></div>,
      <iBizRowEditPopover
        ref={(ins: ComponentPublicInstance) => {
          popInstance = ins;
        }}
        style={popStyle}
        show={showPop.value}
        onConfirm={onConfirm}
        onCancel={onCancel}
      ></iBizRowEditPopover>,
    ];
  };

  c.evt.on('onRowEditChange', event => {
    if (event.row.showRowEdit) {
      setTimeout(() => {
        showRowEditPop(event.row);
      }, 0);
    } else {
      editingRow.value = undefined;
      showPop.value = false;
      Object.assign(popStyle, {
        top: undefined,
        left: undefined,
      });
    }
  });

  return { renderPopover };
}
