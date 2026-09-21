/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * 从T里面排除U里相同的属性后剩下的属性组成的类型
 */
export type OmitObject<T, U> = { [K in keyof Omit<T, keyof U>]: T[K] };

/**
 * 返回T和U的并集，其中U里面的属性都变成可选
 */
export type PartialWithObject<T, U> = {
  [K in keyof Omit<T, keyof U>]: T[K];
} & Partial<U>;

/**
 * 从T里面只获取索引类型为string的键
 */
export type StrKeyOf<T> = {
  [K in keyof T]: T[K] extends string ? K : never;
}[keyof T];

/**
 * 构造函数接口，声明一个返回对象是T的构造函数，不传则返回类型是any
 */
export type Constructor<T extends object = any> = new (...args: any[]) => T;
