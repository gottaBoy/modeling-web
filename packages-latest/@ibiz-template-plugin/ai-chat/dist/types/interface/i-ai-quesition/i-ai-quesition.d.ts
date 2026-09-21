/**
 * @description AI问题选项
 * @author tony001
 * @date 2026-05-26 11:05:32
 * @export
 * @interface IAIQuesitionItem
 */
export interface IAIQuesitionItem {
    /**
     * @description 问题选项值
     * @author tony001
     * @date 2026-05-26 11:05:12
     * @type {string}
     * @memberof IAIQuesitionItem
     */
    value: string;
    /**
     * @description 问题选项标题
     * @author tony001
     * @date 2026-05-26 11:05:49
     * @type {string}
     * @memberof IAIQuesitionItem
     */
    caption: string;
    /**
     * @description 问题选项描述
     * @author tony001
     * @date 2026-05-26 11:05:26
     * @type {string}
     * @memberof IAIQuesitionItem
     */
    description?: string;
}
/**
 * @description AI问题，基于该数据结构出界面
 * @author tony001
 * @date 2026-05-26 11:05:51
 * @export
 * @interface IAIQuesition
 */
export interface IAIQuesition {
    /**
     * @description 问题标识
     * @author tony001
     * @date 2026-05-26 11:05:25
     * @type {string}
     * @memberof IAIQuesition
     */
    id: string;
    /**
     * @description 问题标题
     * @author tony001
     * @date 2026-05-26 11:05:44
     * @type {string}
     * @memberof IAIQuesition
     */
    caption: string;
    /**
     * @description 问题类型
     * @author tony001
     * @date 2026-05-26 11:05:32
     * @type {('RADIO' | 'CHECKBOX' | 'INPUT')}
     * @memberof IAIQuesition
     */
    type: 'RADIO' | 'CHECKBOX' | 'INPUT';
    /**
     * @description 问题排序
     * @author tony001
     * @date 2026-05-26 11:05:19
     * @type {number}
     * @memberof IAIQuesition
     */
    order: number;
    /**
     * @description 问题选项集合
     * @author tony001
     * @date 2026-05-26 11:05:18
     * @type {IAIQuesitionItem[]}
     * @memberof IAIQuesition
     */
    items: IAIQuesitionItem[];
}
/**
 * @description 问题答案，基于该数据结构返回给AI
 * @author tony001
 * @date 2026-05-26 11:05:38
 * @export
 * @interface IAIQuesitionAnswer
 */
export interface IAIQuesitionAnswer {
    /**
     * @description 标识
     * @author tony001
     * @date 2026-05-26 11:05:32
     * @type {string}
     * @memberof IAIQuesitionAnswer
     */
    id: string;
    /**
     * @description 自定义文本
     * @author tony001
     * @date 2026-05-27 11:05:42
     * @type {string}
     * @memberof IAIQuesitionAnswer
     */
    customText: string;
    /**
     * @description 问题答案值
     * @author tony001
     * @date 2026-05-26 11:05:10
     * @type {string}
     * @memberof IAIQuesitionAnswer
     */
    value: string;
}
