import {
  IDEFDCatGroupLogic,
  IDEFDLogic,
  IDEFDSingleLogic,
} from '@ibiz/model-core';
import { ModelError } from '@ibiz-template/core';
import { testCond } from './verify';

function isGroupLogic(logic: IDEFDLogic): logic is IDEFDCatGroupLogic {
  return logic.logicType === 'GROUP';
}
function isSingleLogic(logic: IDEFDLogic): logic is IDEFDSingleLogic {
  return logic.logicType === 'SINGLE';
}

/**
 * 验证表单的逻辑分组
 *
 * @author lxm
 * @date 2023-02-14 10:11:41
 * @export
 * @param {IData} data 表单数据
 * @param {IDEFDLogic} logic 逻辑模型
 */
export function verifyFormGroupLogic(data: IData, logic: IDEFDLogic): boolean {
  // 计算逻辑分组
  if (isGroupLogic(logic)) {
    // 检查是否有逻辑项
    const children = logic.defdlogics;
    let result: boolean = true;
    if (!children || children.length === 0) {
      ibiz.log.error(ibiz.i18n.t('runtime.utils.verify.emptyLogicGroups'));
      return result;
    }
    if (logic.groupOP === 'AND') {
      // 逻辑与
      const falseItem = children.find(childLogic => {
        return !verifyFormGroupLogic(data, childLogic);
      });
      result = falseItem === undefined;
    } else if (logic.groupOP === 'OR') {
      // 逻辑或
      const trueItem: IDEFDLogic | undefined = logic.defdlogics!.find(
        childLogic => {
          return verifyFormGroupLogic(data, childLogic);
        },
      );
      result = trueItem !== undefined;
    }

    // 是否取反
    return logic.notMode ? !result : result;
  }

  // 计算单个逻辑
  if (isSingleLogic(logic) && logic.defdname) {
    return testCond(
      data[logic.defdname.toLowerCase()],
      logic.condOP!,
      logic.value,
    );
  }

  throw new ModelError(
    logic,
    ibiz.i18n.t('runtime.utils.verify.unsupportedLogicTypes', {
      logicType: logic.logicType,
    }),
  );
}
