/**
 * 面板成员状态
 *
 * @author lxm
 * @date 2023-02-07 06:04:35
 * @export
 * @class PanelItemState
 */
export class PanelItemState {
    constructor(parent) {
        this.parent = parent;
        this.disabled = false;
        this.layout = {
            width: '',
            height: '',
            extraStyle: {},
            extraClass: [],
            contentStyle: {},
        };
        this.class = {
            container: [],
            containerDyna: [],
            label: [],
            labelDyna: [],
        };
        /**
         * 是否必填
         *
         * @author chitanda
         * @date 2023-01-04 10:01:27
         * @type {boolean}
         */
        this.required = false;
        /**
         * 是否只读
         *
         * @author tony001
         * @date 2024-04-16 16:04:49
         * @type {boolean}
         */
        this.readonly = false;
        // 定义是否显示，set方法需要返回true,否则vue proxy报错
        let $visible = true;
        Object.defineProperty(this, 'visible', {
            enumerable: true,
            configurable: true,
            get() {
                var _a;
                // 有父先看父的显示
                return ((_a = this.parent) === null || _a === void 0 ? void 0 : _a.visible) !== false && $visible;
            },
            set(val) {
                $visible = val;
                // eslint-disable-next-line no-setter-return
                return true;
            },
        });
        // 定义是否保活
        let $keepAlive;
        Object.defineProperty(this, 'keepAlive', {
            enumerable: true,
            configurable: true,
            get() {
                // 自身设置了值则只看自身
                if ($keepAlive !== undefined) {
                    return $keepAlive;
                }
                // 自身没有设置值，看父
                if (this.parent) {
                    return this.parent.keepAlive;
                }
                return false;
            },
            set(val) {
                $keepAlive = val;
                // eslint-disable-next-line no-setter-return
                return true;
            },
        });
        // 定义只读状态
        let $readonly;
        Object.defineProperty(this, 'readonly', {
            enumerable: true,
            configurable: true,
            get() {
                // 自身设置了值则只看自身
                if ($readonly !== undefined) {
                    return $readonly;
                }
                // 自身没有设置值，看父
                if (this.context) {
                    return !!(this.context.srfreadonly === true ||
                        this.context.srfreadonly === 'true');
                }
                return false;
            },
            set(val) {
                $readonly = val;
                return true;
            },
        });
    }
}
