import { VNode } from 'preact';
type Position = 'top' | 'bottom' | 'left' | 'right' | 'top-left';
interface ActionItem {
    id: string;
    caption: string;
    icon?: VNode;
}
export declare const Popup: ({ children, actions, content, position, isOpen: isOpenProp, onToggleOpen, onAction, }: {
    children: import('preact').ComponentChildren;
    actions?: ActionItem[] | undefined;
    content?: import('preact').ComponentChildren;
    position?: Position | undefined;
    isOpen?: boolean | undefined;
    onToggleOpen?: ((isOpen: boolean) => void) | undefined;
    onAction?: ((actionId: string, event: MouseEvent) => void) | undefined;
}) => import("preact").JSX.Element;
export {};
