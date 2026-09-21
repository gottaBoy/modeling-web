import { RuntimeError, ModelError } from '@ibiz-template/core';
import dayjs from 'dayjs';
import { createUUID } from 'qx-util';
import { isNil, isNotNil } from 'ramda';

export type DefaultValueOrigins = {
  data: IData;
  context: IContext;
  params: IParams;
};

export type DefaultValueOpts = {
  /**
   * 属性名称
   * @author lxm
   * @date 2023-09-18 03:47:18
   * @type {string}
   */
  name: string;
  /**
   * 默认值类型
   * @author lxm
   * @date 2023-09-18 03:47:24
   * @type {string}
   */
  valueType?: string;
  /**
   * 默认值
   * @author lxm
   * @date 2023-09-18 03:47:31
   * @type {string}
   */
  defaultValue?: string;
  /**
   * 值格式化
   * @author lxm
   * @date 2023-09-18 03:47:36
   * @type {string}
   */
  valueFormat?: string;
};

export function getDefaultValue(
  opts: DefaultValueOpts,
  origins: DefaultValueOrigins,
): unknown {
  const { name, valueType, defaultValue, valueFormat } = opts;
  const { data, context, params } = origins;

  // 没有配置默认值,不处理返回undefined
  if (isNil(valueType) && isNil(defaultValue)) {
    return;
  }

  // 类型为置空的时候
  if (valueType === 'RESET') {
    return null;
  }

  const value = data[name];
  // 除置空之外的默认值类型，有值的时候不处理返回undefined
  if (isNotNil(value)) {
    return;
  }

  // 没有配类型，配了默认值的直接赋值默认值
  if (!valueType && defaultValue) {
    return defaultValue;
  }

  switch (valueType) {
    // 当前应用数据，优先取视图参数，视图参数没有取上下文
    case 'APPDATA':
      if (Object.prototype.hasOwnProperty.call(params, defaultValue!)) {
        return params[defaultValue!];
      }
      if (Object.prototype.hasOwnProperty.call(context, defaultValue!)) {
        return context[defaultValue!];
      }
      break;
    // 当前操作用户(名称)
    case 'OPERATORNAME':
      return context.srfusername;
    // 当前操作用户(编号)
    case 'OPERATOR':
      return context.srfuserid;
    // 当前时间
    case 'CURTIME':
      return dayjs().format(valueFormat);
    // 数据对象属性
    case 'PARAM':
      return data[defaultValue!];
    case 'SESSION': // 用户全局对象
    case 'APPLICATION': // 系统全局对象
      // 取appData里的上下文
      if (!ibiz.appData?.context) {
        throw new RuntimeError(
          ibiz.i18n.t('runtime.controller.utils.valueDefault.noExist'),
        );
      }
      return ibiz.appData.context[defaultValue!];
    // 网页请求用视图参数
    case 'CONTEXT':
      return params[defaultValue!];
    // 唯一编码
    case 'UNIQUEID':
      return createUUID();
    default:
      // 未支持类型
      throw new ModelError(
        {},
        ibiz.i18n.t('runtime.controller.utils.valueDefault.nosupported', {
          valueType,
        }),
      );
  }
}
