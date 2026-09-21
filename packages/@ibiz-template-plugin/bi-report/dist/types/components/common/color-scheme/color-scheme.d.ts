import { PropType } from 'vue';
export interface ColorItem {
    /**
     * 文本
     *
     * @author tony001
     * @date 2024-05-30 18:05:49
     * @type {string}
     */
    text: string;
    /**
     * 值
     *
     * @author tony001
     * @date 2024-05-30 18:05:57
     * @type {(string | string[])}
     */
    value: string | string[];
}
declare const _default: import("vue").DefineComponent<{
    colorList: {
        type: PropType<ColorItem[]>;
    };
    editorStyle: {
        type: PropType<"ITEMS" | "ITEM">;
        default: string;
    };
    value: {
        type: PropType<IData>;
        default: () => void;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    schemes: readonly [{
        readonly text: "系统配色";
        readonly value: "default";
    }, {
        readonly text: "模板配色";
        readonly value: "template";
    }];
    currentScheme: import("vue").Ref<"default" | "template">;
    templateColorList: (ColorItem & {
        key?: string | undefined;
    })[];
    currentColorKey: import("vue").Ref<string | undefined>;
    currentColor: import("vue").Ref<string | string[]>;
    handleSchemeChange: () => void;
    handleTemplateColorChange: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    change: (_value: {
        colorScheme: 'default' | 'template';
        color: string | string[];
    }) => true;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    colorList: {
        type: PropType<ColorItem[]>;
    };
    editorStyle: {
        type: PropType<"ITEMS" | "ITEM">;
        default: string;
    };
    value: {
        type: PropType<IData>;
        default: () => void;
    };
}>> & {
    onChange?: ((_value: {
        colorScheme: 'default' | 'template';
        color: string | string[];
    }) => any) | undefined;
}, {
    value: IData;
    editorStyle: "ITEMS" | "ITEM";
}, {}>;
export default _default;
