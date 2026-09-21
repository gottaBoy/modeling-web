'use strict';

var point = require('./point.cjs');

"use strict";
class Bezier {
  /**
   * 贝塞尔曲线构造函数
   * @param startPoint 起始点
   * @param control2 第二个控制点
   * @param control1 第一个控制点
   * @param endPoint 结束点
   * @param startWidth 起始点宽度
   * @param endWidth 结束点宽度
   */
  constructor(startPoint, control2, control1, endPoint, startWidth, endWidth) {
    this.startPoint = startPoint;
    this.control2 = control2;
    this.control1 = control1;
    this.endPoint = endPoint;
    this.startWidth = startWidth;
    this.endWidth = endWidth;
  }
  /**
   * 从点数组创建贝塞尔曲线
   * @param points 点数组，至少需要4个点来计算曲线
   * @param widths 包含起点和终点宽度的对象
   * @returns 新创建的贝塞尔曲线实例
   */
  static fromPoints(points, widths) {
    const c2 = this.calculateControlPoints(points[0], points[1], points[2]).c2;
    const c3 = this.calculateControlPoints(points[1], points[2], points[3]).c1;
    return new Bezier(points[1], c2, c3, points[2], widths.start, widths.end);
  }
  /**
   * 计算贝塞尔曲线的控制点
   * @param s1 第一个点
   * @param s2 第二个点（中间点）
   * @param s3 第三个点
   * @returns 包含两个控制点的对象
   */
  static calculateControlPoints(s1, s2, s3) {
    const dx1 = s1.x - s2.x;
    const dy1 = s1.y - s2.y;
    const dx2 = s2.x - s3.x;
    const dy2 = s2.y - s3.y;
    const m1 = { x: (s1.x + s2.x) / 2, y: (s1.y + s2.y) / 2 };
    const m2 = { x: (s2.x + s3.x) / 2, y: (s2.y + s3.y) / 2 };
    const l1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
    const l2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
    const dxm = m1.x - m2.x;
    const dym = m1.y - m2.y;
    const k = l1 + l2 === 0 ? 0 : l2 / (l1 + l2);
    const cm = { x: m2.x + dxm * k, y: m2.y + dym * k };
    const tx = s2.x - cm.x;
    const ty = s2.y - cm.y;
    return {
      c1: new point.Point(m1.x + tx, m1.y + ty),
      c2: new point.Point(m2.x + tx, m2.y + ty)
    };
  }
  /**
   * 计算贝塞尔曲线的近似长度
   * @returns 曲线的近似长度
   */
  length() {
    const steps = 10;
    let length = 0;
    let px;
    let py;
    for (let i = 0; i <= steps; i += 1) {
      const t = i / steps;
      const cx = this.point(
        t,
        this.startPoint.x,
        this.control1.x,
        this.control2.x,
        this.endPoint.x
      );
      const cy = this.point(
        t,
        this.startPoint.y,
        this.control1.y,
        this.control2.y,
        this.endPoint.y
      );
      if (i > 0) {
        const xdiff = cx - px;
        const ydiff = cy - py;
        length += Math.sqrt(xdiff * xdiff + ydiff * ydiff);
      }
      px = cx;
      py = cy;
    }
    return length;
  }
  /**
   * 计算三次贝塞尔曲线在参数t处的x或y坐标值
   * @param t 参数t，范围0到1
   * @param start 起始点的坐标值（x或y）
   * @param c1 第一个控制点的坐标值（x或y）
   * @param c2 第二个控制点的坐标值（x或y）
   * @param end 结束点的坐标值（x或y）
   * @returns 计算得到的坐标值
   */
  point(t, start, c1, c2, end) {
    return start * (1 - t) * (1 - t) * (1 - t) + 3 * c1 * (1 - t) * (1 - t) * t + 3 * c2 * (1 - t) * t * t + end * t * t * t;
  }
}

exports.Bezier = Bezier;
