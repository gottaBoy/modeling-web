import { createUUID } from 'qx-util';
import { ActivityCounter, ControllerEvent } from '../utils';
const SELF_KEY = '__self';
/**
 * 控制器基类
 * @author lxm
 * @date 2023-04-25 11:00:31
 * @export
 * @class BaseController
 */
export class BaseController {
    /**
     * 中间层的基类才会使用，用于在内部使用自身的事件，事件类型不是泛型用evt就能正确推导出来。
     * @author lxm
     * @date 2023-05-18 02:48:57
     * @readonly
     * @protected
     */
    get _evt() {
        return this.evt;
    }
    /**
     * 上下文对象
     *
     * @author tony001
     * @date 2024-04-16 16:04:30
     * @readonly
     * @type {IContext}
     */
    get context() {
        return this.state.context;
    }
    /**
     * Creates an instance of BaseController.
     * @author lxm
     * @date 2023-04-26 06:46:21
     * @param {CTX} ctx 跨组件上下文环境，内部机制不暴露
     */
    constructor(model, context, params, ctx) {
        this.model = model;
        this.params = params;
        this.ctx = ctx;
        this.id = createUUID();
        this.state = {};
        /**
         * 控制器名称，作为检索控制器的唯一标识
         * @author lxm
         * @date 2023-04-26 08:22:30
         * @type {string}
         */
        this.name = '';
        /**
         * 事件触发器
         * @author lxm
         * @date 2023-04-25 09:36:31
         * @type {ControllerEvent}
         */
        this.evt = new ControllerEvent(this.getEventArgs.bind(this));
        /**
         * 计算父子加载顺序的计数器
         * @author lxm
         * @date 2023-04-26 06:14:22
         * @type {ActivityCounter}
         */
        this.mountCounter = new ActivityCounter(this.mounted.bind(this));
        /**
         * 子组件的名称，会监听指定子组件的生命周期，影响自身的声明周期。
         * @author lxm
         * @date 2023-04-26 08:10:57
         * @type {string[]}
         */
        this.childNames = [];
        this.name = model.name || model.id;
        this.state.context = context;
        this.preprocessModel(model);
        this.initState();
        this.convertMultipleLanguages();
    }
    /**
     * 根据需求对model进行预处理
     *
     * @author chitanda
     * @date 2024-02-27 11:02:00
     * @protected
     * @param {T} _model
     */
    preprocessModel(_model) {
        // 子类重写
    }
    /**
     * 初始化state的属性放，一般情况下只需要把对应的默认值直接赋值给state
     * 如果需要构造特殊class类型的state,可以重写该方法时，
     * 一开就new一个state替换当前的state,然后调用super初始化默认值
     * @author lxm
     * @date 2023-05-18 02:57:00
     * @protected
     */
    initState() {
        this.state.isCreated = false;
        this.state.isMounted = false;
        this.state.isDestroyed = false;
    }
    /**
     * 获取事件的基础参数
     * @author lxm
     * @date 2023-04-25 11:03:44
     * @return {*}  {Omit<EventBase, 'eventName'>}
     */
    getEventArgs() {
        return {
            context: this.context,
            params: this.params,
            data: [],
            targetName: this.model.name,
            view: this.ctx.view,
        };
    }
    /**
     * 生命周期-创建完成，不推荐子类实现
     * @author lxm
     * @date 2023-04-25 11:08:54
     */
    async created() {
        // 登记自身
        this.mountCounter.enroll(SELF_KEY);
        await this.onCreated();
        this.state.isCreated = true;
        this.force(() => {
            this.mountSelf();
        });
        ibiz.log.debug(`${this.constructor.name}:${this.name} onCreated`);
        this._evt.emit('onCreated', undefined);
    }
    /**
     * 生命周期-创建完成，实际执行逻辑，子类重写用这个
     * @author lxm
     * @date 2023-04-25 11:12:02
     */
    async onCreated() {
        // 监听预告，提前让计数器等待将要绘制的子组件
        this.ctx.evt.on('onForecast', name => {
            if (this.childNames.includes(name)) {
                this.mountCounter.enroll(name);
            }
        });
        // 监听指定子组件的注册和加载声明周期，操作计数器，使父组件mounted在子组件都mounted之后
        this.ctx.evt.on('onRegister', (name, c) => {
            if (this.childNames.includes(name)) {
                c.evt.on('onMounted', () => {
                    this.mountCounter.attend(name);
                });
            }
        });
    }
    /**
     * 自身挂载方法，默认是设置自身已经挂载的状态，用于计数器计算。
     * 异步方法，可以把异步初始化放这里，执行完后调基类的mountSelf，mounted声明周期就可以在异步之后触发
     * @author lxm
     * @date 2023-04-27 03:34:35
     */
    async mountSelf() {
        const isSelfMounted = this.mountCounter.registration.get(SELF_KEY);
        if (!isSelfMounted) {
            this.mountCounter.attend(SELF_KEY);
        }
    }
    /**
     * 生命周期-加载完成，不推荐子类实现
     * 外部不允许调用，只能被mountCounter触发，保证mounted时机正确，外部调用mountSelf
     *
     * @author lxm
     * @date 2023-04-25 11:08:54
     */
    async mounted() {
        await this.onMounted();
        this.state.isMounted = true;
        ibiz.log.debug(`${this.constructor.name}:${this.name} onMounted`);
        this._evt.emit('onMounted', undefined);
    }
    /**
     * 生命周期-加载完成，实际执行逻辑，子类重写用这个
     * 放置等自身后需要等待的子组件都加载完成后才会执行的逻辑。
     * @author lxm
     * @date 2023-04-25 11:12:02
     */
    async onMounted() {
        // 子类重写
    }
    /**
     * 生命周期-销毁完成，不推荐子类实现
     * @author lxm
     * @date 2023-04-25 11:08:54
     */
    async destroyed() {
        await this.onDestroyed();
        this.state.isDestroyed = true;
        ibiz.log.debug(`${this.constructor.name}:${this.name} onDestroyed`);
        await this._evt.emit('onDestroyed', undefined);
        this.evt.destroy();
    }
    /**
     * 生命周期-销毁完成，实际执行逻辑，子类重写用这个
     * @author lxm
     * @date 2023-04-25 11:12:02
     */
    async onDestroyed() {
        // 子类重写
    }
    /**
     * 强制更新视图（框架级）
     *
     * @author chitanda
     * @param {() => void} [callback] 更新之后，组件渲染完成后的回调
     * @date 2022-07-24 14:07:38
     */
    force(_callback) {
        // 在界面数据发生变更时，会调用此方法。
        // 可外部覆盖实例的此方法，实现自定义的数据更新逻辑。
    }
    /**
     * 获取指定名称的控制器
     * @author lxm
     * @date 2023-04-25 10:14:42
     * @param {string} name
     * @param {boolean} [traceRoot=false] 是否跨越视图作用域，一路向根上找。
     * @return {*}  {(BaseController | undefined)}
     */
    getController(name, traceRoot = false) {
        return this.ctx.getController(name, traceRoot);
    }
    getTopView() {
        return this.ctx.getTopView();
    }
    /**
     * 当前视图上下文内有新的控制产生时触发回调。
     * @author lxm
     * @date 2023-04-26 07:59:41
     * @param {(name: string, c: IController) => void} cb
     */
    listenNewController(cb) {
        this.ctx.evt.on('onRegister', cb);
    }
    /**
     * 转换各类多语言
     *
     * @date 2023-05-18 02:57:00
     * @protected
     */
    convertMultipleLanguages() {
        // 子类重写
    }
}
