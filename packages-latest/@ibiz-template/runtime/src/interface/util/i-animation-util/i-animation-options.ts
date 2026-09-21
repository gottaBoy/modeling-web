export interface IAnimationOptions {
  /**
   * 动画持续时间
   *
   * @author zk
   * @date 2024-01-24 04:01:29
   * @type {number}
   * @memberof IAnimationOptions
   */
  duration?: number;

  /**
   * 是否循环
   *
   * @author zk
   * @date 2024-01-24 04:01:19
   * @type {false}
   * @memberof IAnimationOptions
   */
  loop?: false;

  /**
   * 运行速度曲线
   *
   * @author zk
   * @date 2024-01-25 01:01:52
   * @type {string}
   * @memberof IAnimationOptions
   */
  easing?: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string | symbol]: any;
}
