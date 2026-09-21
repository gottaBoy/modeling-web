import { IBasicPoint, Point } from './point';
/**
 * @description 用于创建和计算三次贝塞尔曲线，支持从点数组生成曲线实例
 * @export
 * @class Bezier
 */
export declare class Bezier {
    startPoint: Point;
    control2: IBasicPoint;
    control1: IBasicPoint;
    endPoint: Point;
    startWidth: number;
    endWidth: number;
    /**
     * 从点数组创建贝塞尔曲线
     * @param points 点数组，至少需要4个点来计算曲线
     * @param widths 包含起点和终点宽度的对象
     * @returns 新创建的贝塞尔曲线实例
     */
    static fromPoints(points: Point[], widths: {
        start: number;
        end: number;
    }): Bezier;
    /**
     * 计算贝塞尔曲线的控制点
     * @param s1 第一个点
     * @param s2 第二个点（中间点）
     * @param s3 第三个点
     * @returns 包含两个控制点的对象
     */
    private static calculateControlPoints;
    /**
     * 贝塞尔曲线构造函数
     * @param startPoint 起始点
     * @param control2 第二个控制点
     * @param control1 第一个控制点
     * @param endPoint 结束点
     * @param startWidth 起始点宽度
     * @param endWidth 结束点宽度
     */
    constructor(startPoint: Point, control2: IBasicPoint, control1: IBasicPoint, endPoint: Point, startWidth: number, endWidth: number);
    /**
     * 计算贝塞尔曲线的近似长度
     * @returns 曲线的近似长度
     */
    length(): number;
    /**
     * 计算三次贝塞尔曲线在参数t处的x或y坐标值
     * @param t 参数t，范围0到1
     * @param start 起始点的坐标值（x或y）
     * @param c1 第一个控制点的坐标值（x或y）
     * @param c2 第二个控制点的坐标值（x或y）
     * @param end 结束点的坐标值（x或y）
     * @returns 计算得到的坐标值
     */
    private point;
}
//# sourceMappingURL=bezier.d.ts.map