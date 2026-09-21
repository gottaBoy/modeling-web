/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  getDeACMode,
  IAppDEService,
  EditorController,
} from '@ibiz-template/runtime';
import { Ref, ref } from 'vue';
import { createUUID } from 'qx-util';
import { IAppDEACMode, ITextArea, ITextBox } from '@ibiz/model-core';

/**
 * @description 嵌入式AI聊天编辑器控制器
 * @author tony001
 * @date 2026-05-15 11:05:17
 * @export
 * @class EmbedAIChatEditorController
 * @extends {EditorController<ITextBox>}
 */
export class EmbedAIChatEditorController extends EditorController<ITextBox> {
  /**
   * @description 聊天框实例
   * @author tony001
   * @date 2026-05-15 15:05:37
   * @type {*}
   * @memberof EmbedAIChatEditorController
   */
  public chatInstance: any;

  /**
   * @description 应用实体服务
   * @author tony001
   * @date 2026-05-15 16:05:22
   * @type {IAppDEService}
   * @memberof EmbedAIChatEditorController
   */
  deService?: IAppDEService;

  /**
   * @description 自填模式
   * @author tony001
   * @date 2026-05-15 16:05:30
   * @type {IAppDEACMode}
   * @memberof EmbedAIChatEditorController
   */
  deACMode?: IAppDEACMode;

  /**
   * @description
   * @type {boolean}
   * @memberof EmbedAIChatEditorController
   */
  isSimple: boolean = false;

  /**
   * @description 编辑器唯一标识
   * @protected
   * @type {Ref<string>}
   * @memberof EmbedAIChatEditorController
   */
  UUID: Ref<string> = ref(createUUID());

  /**
   * @description 初始化
   * @author tony001
   * @date 2026-05-15 16:05:12
   * @protected
   * @returns {*}  {Promise<void>}
   * @memberof EmbedAIChatEditorController
   */
  protected async onInit(): Promise<void> {
    await super.onInit();
    const model = this.model as ITextArea;
    if (model.appDEACModeId) {
      // 1.自填模式
      this.deACMode = await getDeACMode(
        model.appDEACModeId,
        model.appDataEntityId!,
        this.context.srfappid,
      );
      if (this.deACMode) {
        if (this.deACMode.actype === 'CHATCOMPLETION' && ibiz.env.enableAI) {
          // 2.实体服务
          this.deService = await ibiz.hub
            .getApp(model.appId)
            .deService.getService(this.context, model.appDataEntityId!);
        }
      }
    }
    // 3.创建聊天框实例
    const module = await import('@ibiz-template-plugin/ai-chat');
    if (module && module.createFlatChat) {
      this.chatInstance = module.createFlatChat();
    } else if (module && module.default && module.default.createFlatChat) {
      this.chatInstance = module.default.createFlatChat();
    }
    const { issimple } = this.editorParams;
    if (issimple) this.isSimple = issimple === 'true';
  }

  /**
   * @description 重绘
   * @memberof EmbedAIChatEditorController
   */
  public redraw(): void {
    this.UUID.value = createUUID();
  }
}
