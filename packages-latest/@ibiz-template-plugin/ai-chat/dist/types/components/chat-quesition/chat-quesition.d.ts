import { IAIQuesition, IAIQuesitionAnswer } from '../../interface';

export interface ChatQuesitionProps {
    questions: IAIQuesition[];
    value?: IAIQuesitionAnswer[];
    title?: string;
    subTitle?: string;
    cancelText?: string;
    prevText?: string;
    nextText?: string;
    submitText?: string;
    inputPlaceholder?: string;
    readonly?: boolean;
    onChange?: (answers: IAIQuesitionAnswer[]) => void;
    onSubmit?: (answers: IAIQuesitionAnswer[]) => void;
}
export declare const ChatQuesition: (props: ChatQuesitionProps) => import("preact").JSX.Element;
