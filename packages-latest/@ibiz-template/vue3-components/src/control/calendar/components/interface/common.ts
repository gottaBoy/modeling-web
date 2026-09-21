import type { ExtractPropTypes, PropType } from 'vue';
import { epPropKey } from '../util';
import { IUILegend } from '../../calendar';

type Value<T> = T[keyof T];

type Writable<T> = { -readonly [P in keyof T]: T[P] };
type WritableArray<T> = T extends readonly IData[] ? Writable<T> : T;

type IfNever<T, Y = true, N = false> = [T] extends [never] ? Y : N;

type IfUnknown<T, Y, N> = [unknown] extends [T] ? Y : N;

type UnknownToNever<T> = IfUnknown<T, never, T>;

/**
 * 提取单个 prop 的参数类型
 */
type ExtractPropType<T extends object> = Value<
  ExtractPropTypes<{
    key: T;
  }>
>;

/**
 * 通过 `ExtractPropTypes` 提取类型，接受 `PropType<T>`、`XXXConstructor`、`never`...
 */
type ResolvePropType<T> = IfNever<
  T,
  never,
  ExtractPropType<{
    type: WritableArray<T>;
    required: true;
  }>
>;

/**
 * 合并 Type、Value、Validator 的类型
 */
type EpPropMergeType<Type, IData, Validator> =
  | IfNever<UnknownToNever<IData>, ResolvePropType<Type>, never>
  | UnknownToNever<IData>
  | UnknownToNever<Validator>;

/**
 * 处理输入参数的默认值（约束）
 */
type EpPropInputDefault<
  Required extends boolean,
  Default,
> = Required extends true
  ? never
  : Default extends Record<string, unknown> | Array<IParams>
    ? () => Default
    : (() => Default) | Default;

/**
 * prop 输入参数（约束）
 */
type EpPropInput<
  Type,
  IParams,
  Validator,
  Default extends EpPropMergeType<Type, IParams, Validator>,
  Required extends boolean,
> = {
  type?: Type;
  required?: Required;
  values?: readonly IParams[];
  validator?:
    | ((val: Validator) => val is Validator)
    | ((val: boolean) => boolean);
  default?: EpPropInputDefault<Required, Default>;
};

/**
 * prop 输出参数 “buildProp”或“buildProps”。
 */
type EpProp<Type, Default, Required> = {
  readonly type: PropType<Type>;
  readonly required: [Required] extends [true] ? true : false;
  readonly validator: ((val: unknown) => boolean) | undefined;
  [epPropKey]: true;
} & IfNever<Default, unknown, { readonly default: Default }>;

/**
 * 最终转换 EpProp
 */
type EpPropFinalized<Type, IParams, Validator, Default, Required> = EpProp<
  EpPropMergeType<Type, IParams, Validator>,
  UnknownToNever<Default>,
  Required
>;

/**
 * 事件项
 */
interface IEvent {
  beginTime: Date | string;
  endTime: Date | string;
  id: string | number;
  classname: string;
  text: string;
  content: string;
  tips: string;
  icon: string;
  color: string;
  bkColor: string;
  itemType: string;
  deData: IData;
}

/**
 * UI数据项
 *
 * @interface IUIEvent
 * @extends {IEvent}
 */
interface IUIEvent extends IEvent {
  height?: number;
  border?: string;
  timeRange?: string;
  styleTop?: number;
  styleLeft?: number;
  zIndex?: number;
  width?: number;
  isShow?: boolean;
  isToday?: boolean;
  isRange?: boolean;
  bkColorFade?: string;
  isSelectedEvent?: boolean;
  isNotCurrentDay?: boolean;
  targetLegend?: IUILegend;
}

/**
 * 视图类型
 */
type ViewType = 'MONTH' | 'WEEK' | 'DAY';

export type {
  IEvent,
  IUIEvent,
  ViewType,
  EpPropFinalized,
  EpProp,
  EpPropInput,
  EpPropInputDefault,
  EpPropMergeType,
  ResolvePropType,
  ExtractPropType,
  UnknownToNever,
  IfUnknown,
  WritableArray,
  Writable,
  Value,
};
