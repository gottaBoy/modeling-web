import { VNode } from 'preact';

type Position = 'top' | 'bottom' | 'left' | 'right' | 'top-left';
interface ActionItem {
    id: string;
    caption: string;
    icon?: VNode;
}
export declare const Popup: ({ triggerMode, children, actions, content, position, isOpen: isOpenProp, onToggleOpen, onAction, }: {
    triggerMode: "click" | "hover";
    children: import('preact').ComponentChildren;
    actions?: ActionItem[];
    content?: import('preact').ComponentChildren;
    position?: Position;
    isOpen?: boolean;
    onToggleOpen?: (isOpen: boolean) => void;
    onAction?: (actionId: string, event: MouseEvent) => void;
}) => import("preact").JSX.Element;
export {};
