import { IChatSuggestion, IChatUIAction } from '../../interface';

export interface ChatSuggestionsProps {
    /**
     * 聊天建议集合
     *
     * @author tony001
     * @date 2025-03-18 14:03:17
     * @type {IChatSuggestion[]}
     */
    suggestions: IChatSuggestion[];
    /**
     * 界面操作集合
     */
    uiactions: IChatUIAction[];
    /**
     * 建议点击事件回调
     *
     * @author tony001
     * @date 2025-03-18 14:03:30
     */
    onSuggestionClick?: (item: IChatSuggestion, event: MouseEvent) => void;
    /**
     * 界面操作点击事件回调
     * @param item
     * @param event
     * @returns
     */
    onUIActionClick?: (item: IChatUIAction, event: MouseEvent) => void;
}
/**
 * [{
  "type": "action",
  "data": {
    "actionid": "openmainview@hr_employee",
      "appid":"xxxx"
  },
  "metadata": {
   "content_name": "打开建立数据",
   "action_context": "hr_employee:${params.employee.id}"
  }
},{
  "type": "raw",
  "data": {
    "content": "确认生成"
  },
  "metadata": {
   "content_name": "确认生成"
  }
}]
 */
export declare const ChatSuggestions: (props: ChatSuggestionsProps) => import("preact").JSX.Element;
