import { IAppMobView } from '@ibiz/model-core';
import { ViewController } from './view.controller';
import { IMobViewController } from '../../../interface';

/**
 * 移动端视图控制器
 *
 * @author chitanda
 * @date 2023-06-16 10:06:14
 * @export
 * @class MobViewController
 * @extends {ViewController<T>}
 * @template T
 */
export class MobViewController<T extends IAppMobView = IAppMobView>
  extends ViewController<T>
  implements IMobViewController {}
