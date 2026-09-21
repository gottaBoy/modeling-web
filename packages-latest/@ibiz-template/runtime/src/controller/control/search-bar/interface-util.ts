import { recursiveIterate } from '@ibiz-template/core';
import { isNil } from 'ramda';
import {
  IFilterNode,
  IFilterNodeCustom,
  IFilterNodeField,
  IFilterNodeGroup,
  IFilterNodeItems,
  ISearchCond,
  ISearchCondCustom,
  ISearchCondEx,
  ISearchCondExCustom,
  ISearchCondExField,
  ISearchCondExGroup,
  ISearchCondExItems,
  ISearchCondField,
  ISearchCondGroup,
  ISearchCondItems,
} from '../../../interface';
import { ExcludeOPs } from './search-bar-filter.controller';

// ! FilterNode接口处理

/**
 * 获取初始过滤项树节点数据集合
 * @return {*}
 * @author: zhujiamin
 * @Date: 2023-12-21 17:29:47
 */
export function getOriginFilterNodes(): IFilterNode[] {
  return [
    {
      nodeType: 'GROUP',
      logicType: 'AND',
      children: [
        { nodeType: 'FIELD', field: null, valueOP: null, value: null },
      ],
    },
  ];
}

/**
 * 校验过滤项集合是否正确且至少有一个属性过滤项
 * @author lxm
 * @date 2024-04-09 03:02:00
 * @export
 * @param {IFilterNode[]} filterNodes
 * @return {*}  {{
 *   pass: boolean; 是否通过校验
 * }}
 */
export function validateFilterNodes(filterNodes: IFilterNode[]): {
  pass: boolean;
} {
  const result = { pass: false };
  let hasFilter = false; // 是否有属性 过滤项
  let hasError = false; // 是否有属性过滤项格式不正确
  recursiveIterate(filterNodes[0], (node: IFilterNode) => {
    // 如果已经有过滤项格式不正确，则跳过
    if (hasError) {
      return;
    }
    if (node.nodeType === 'FIELD') {
      hasFilter = true;

      // 如果有属性过滤项缺少必须得属性则有错误
      hasError =
        !node.field ||
        !node.valueOP ||
        (!ExcludeOPs.includes(node.valueOP) && isNil(node.value));
    } else if (node.nodeType === 'ITEMS') {
      // ITEMS必须要有属性和操作符并
      hasError = !node.field || !node.valueOP;
    } else if (node.nodeType === 'CUSTOM') {
      hasFilter = true;
      // CUSTOM 必须要有自定义类型和自定义条件
      hasError = !node.customType || !node.customCond;
    } else {
      // 分组节点必须要有逻辑类型
      hasError = !node.logicType;
    }
  });

  // 有属性过滤项，且没有报错的时候
  if (hasFilter && !hasError) {
    result.pass = true;
  }

  return result;
}

// ! ISearchCond接口处理

/** 后续执行回调函数 */
export type AfterCallback = (
  filterNode: IFilterNode,
  searchCond: ISearchCond,
) => void;

/**
 * IFilterNode转换成ISearchCond接口
 * @author lxm
 * @date 2024-04-09 03:16:25
 * @export
 * @param {IFilterNode} filterNode
 * @return {*}  {ISearchCond}
 */
export function filterNode2SearchCond(
  filterNode: IFilterNode,
  opts?: { after: AfterCallback },
): ISearchCond {
  let result: ISearchCond;
  if (filterNode.nodeType === 'GROUP') {
    // 分组
    const temp: ISearchCondGroup = {
      condop: filterNode.logicType,
      condtype: 'GROUP',
    };
    if (filterNode.children.length > 0) {
      temp.searchconds = filterNode.children.map(item =>
        filterNode2SearchCond(item, opts),
      );
    }
    result = temp;

    // 是否取反
    if (filterNode.notMode) {
      temp.notmode = filterNode.notMode;
    }
  } else if (filterNode.nodeType === 'FIELD') {
    // 属性
    const temp: ISearchCondField = {
      condtype: 'DEFIELD',
      fieldname: filterNode.field!,
      value: filterNode.value,
      condop: filterNode.valueOP!,
    };

    // 值项
    if (filterNode.valueItem) {
      temp.value = filterNode.valueItem;
    }

    result = temp;
  } else if (filterNode.nodeType === 'CUSTOM') {
    const temp: ISearchCondCustom = {
      condtype: 'CUSTOM',
      customtype: filterNode.customType,
      customcond: filterNode.customCond,
    };
    result = temp;
  } else {
    // ITEMS
    const temp: ISearchCondItems = {
      condop: filterNode.valueOP!,
      fieldname: filterNode.field!,
      condtype: 'ITEMS',
    };
    if (filterNode.children.length > 0) {
      temp.searchconds = filterNode.children.map(item =>
        filterNode2SearchCond(item, opts),
      );
    }
    result = temp;
  }

  // 执行额外后续处理
  if (opts?.after) {
    opts.after(filterNode, result);
  }

  return result;
}

/**
 * 转换IFilterNode[]到ISearchCond[]
 * 如果filerNodes校验不通过，则返回undefined
 * @author lxm
 * @date 2024-04-09 03:48:21
 * @export
 * @param {IFilterNode[]} filterNodes
 * @return {*}  {(ISearchCond[] | undefined)}
 */
export function calcSearchConds(
  filterNodes: IFilterNode[],
  opts?: { after: AfterCallback },
): ISearchCond[] | undefined {
  const { pass } = validateFilterNodes(filterNodes);
  if (!pass) {
    return;
  }
  const result = filterNodes.map(node => filterNode2SearchCond(node, opts));
  return result;
}

// ! ISearchCondEx接口处理

/**
 * ISearchCondEx转换成IFilterNode接口
 * @author lxm
 * @date 2024-04-09 03:26:08
 * @export
 * @param {ISearchCondEx} cond
 * @return {*}  {IFilterNode}
 */
export function SearchCondEx2filterNode(cond: ISearchCondEx): IFilterNode {
  let result: IFilterNode;

  if (cond.condtype === 'GROUP') {
    // 分组
    const temp: IFilterNodeGroup = {
      logicType: cond.condop,
      nodeType: 'GROUP',
      children: [],
    };
    if (cond.searchconds?.length) {
      temp.children = cond.searchconds.map(item =>
        SearchCondEx2filterNode(item),
      );
    }
    result = temp;

    // 是否取反
    if (cond.notmode) {
      temp.notMode = cond.notmode;
    }
  } else if (cond.condtype === 'DEFIELD') {
    // 属性
    const temp: IFilterNodeField = {
      nodeType: 'FIELD',
      field: cond.fieldname!,
      value: cond.value,
      valueOP: cond.condop!,
    };

    // 值项
    if (cond.valueItem) {
      temp.valueItem = cond.valueItem;
    }

    result = temp;
  } else if (cond.condtype === 'CUSTOM') {
    const temp: IFilterNodeCustom = {
      nodeType: 'CUSTOM',
      customType: cond.customtype,
      customCond: cond.customcond,
    };
    result = temp;
  } else {
    // ITEMS
    const temp: IFilterNodeItems = {
      nodeType: 'ITEMS',
      field: cond.fieldname,
      valueOP: cond.condop,
      children: [],
    };
    if (cond.searchconds?.length) {
      temp.children = cond.searchconds.map(item =>
        SearchCondEx2filterNode(item),
      );
    }
    if (cond.simple) {
      temp.simple = cond.simple;
    }

    result = temp;
  }

  // 通用处理
  if (cond.hidden === true) {
    result.hidden = true;
  }

  return result;
}

/**
 * IFilterNode转换成ISearchCondEx接口
 * @author lxm
 * @date 2024-04-09 03:16:25
 * @export
 * @param {IFilterNode} filterNode
 * @return {*}  {ISearchCondEx}
 */
export function filterNode2SearchCondEx(
  filterNode: IFilterNode,
): ISearchCondEx {
  let result: ISearchCondEx;
  if (filterNode.nodeType === 'GROUP') {
    // 分组
    const temp: ISearchCondExGroup = {
      condop: filterNode.logicType,
      condtype: 'GROUP',
    };
    if (filterNode.children.length > 0) {
      temp.searchconds = filterNode.children.map(item =>
        filterNode2SearchCondEx(item),
      );
    }
    result = temp;

    // 是否取反
    if (filterNode.notMode) {
      temp.notmode = filterNode.notMode;
    }
  } else if (filterNode.nodeType === 'FIELD') {
    // 属性
    const temp: ISearchCondExField = {
      condtype: 'DEFIELD',
      fieldname: filterNode.field!,
      value: filterNode.value,
      condop: filterNode.valueOP!,
    };

    // 值项
    if (filterNode.valueItem) {
      temp.valueItem = filterNode.valueItem;
    }

    result = temp;
  } else if (filterNode.nodeType === 'CUSTOM') {
    const temp: ISearchCondExCustom = {
      condtype: 'CUSTOM',
      customtype: filterNode.customType,
      customcond: filterNode.customCond,
    };
    result = temp;
  } else {
    // ITEMS
    const temp: ISearchCondExItems = {
      condop: filterNode.valueOP!,
      fieldname: filterNode.field!,
      condtype: 'ITEMS',
    };
    if (filterNode.children.length > 0) {
      temp.searchconds = filterNode.children.map(item =>
        filterNode2SearchCondEx(item),
      );
    }
    if (filterNode.simple) {
      temp.simple = filterNode.simple;
    }
    result = temp;
  }

  // 通用处理
  if (filterNode.hidden === true) {
    result.hidden = true;
  }

  return result;
}

/**
 * 转换IFilterNode[]到ISearchCondEx[]
 * 如果filerNodes校验不通过，则返回undefined
 * @author lxm
 * @date 2024-04-09 03:48:21
 * @export
 * @param {IFilterNode[]} filterNodes
 * @return {*}  {(ISearchCondEx[] | undefined)}
 */
export function calcSearchCondExs(
  filterNodes: IFilterNode[],
): ISearchCondEx[] | undefined {
  const { pass } = validateFilterNodes(filterNodes);
  if (!pass) {
    return;
  }
  const result = filterNodes.map(filterNode2SearchCondEx);
  return result;
}
