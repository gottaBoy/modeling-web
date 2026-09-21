import { ViewController } from './view.controller';
/**
 * @description 实体多数据自定义视图
 * @export
 * @class MDCustomViewController
 * @extends {ViewController<T, S, E>}
 * @implements {IViewController<T, S, E>}
 * @template T
 * @template S
 * @template E
 */
export class MDCustomViewController extends ViewController {
    initState() {
        super.initState();
        this.state.xdatacontrolname = '';
    }
}
