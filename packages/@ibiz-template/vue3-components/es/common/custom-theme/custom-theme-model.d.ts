export declare const predefineThemeVars: ({
    caption: string;
    labelLang: string;
    children: ({
        caption: string;
        labelLang: string;
        vars: ({
            label: string;
            value: string;
            labelLang: string;
            descLang: string;
            unit: string;
            type: string;
            kindVars: {
                '--ibiz-font-size-small': number;
                '--ibiz-font-size-header-6': number;
                '--ibiz-font-size-header-5': number;
                '--ibiz-font-size-header-4': number;
                '--ibiz-font-size-header-3': number;
                '--ibiz-font-size-header-2': number;
                '--ibiz-font-size-header-1': number;
                '--ibiz-font-weight-light'?: undefined;
                '--ibiz-font-weight-bold'?: undefined;
            };
        } | {
            label: string;
            value: string;
            labelLang: string;
            descLang: string;
            type: string;
            kindVars: {
                '--ibiz-font-weight-light': number;
                '--ibiz-font-weight-bold': number;
                '--ibiz-font-size-small'?: undefined;
                '--ibiz-font-size-header-6'?: undefined;
                '--ibiz-font-size-header-5'?: undefined;
                '--ibiz-font-size-header-4'?: undefined;
                '--ibiz-font-size-header-3'?: undefined;
                '--ibiz-font-size-header-2'?: undefined;
                '--ibiz-font-size-header-1'?: undefined;
            };
            unit?: undefined;
        })[];
        children?: undefined;
    } | {
        caption: string;
        labelLang: string;
        children: {
            caption: string;
            labelLang: string;
            vars: {
                label: string;
                description: string;
                labelLang: string;
                descLang: string;
                value: string;
            }[];
        }[];
        vars?: undefined;
    } | {
        caption: string;
        labelLang: string;
        vars: ({
            label: string;
            value: string;
            labelLang: string;
            descLang: string;
            unit: string;
            type: string;
            kindVars: {
                '--ibiz-spacing-super-tight': number;
                '--ibiz-spacing-extra-tight': number;
                '--ibiz-spacing-tight': number;
                '--ibiz-spacing-base-tight': number;
                '--ibiz-spacing-base-loose': number;
                '--ibiz-spacing-loose': number;
                '--ibiz-spacing-extra-loose': number;
                '--ibiz-spacing-super-loose': number;
                '--ibiz-border-radius-extra-small'?: undefined;
                '--ibiz-border-radius-small'?: undefined;
                '--ibiz-border-radius-large'?: undefined;
                '--ibiz-width-icon-extra-small'?: undefined;
                '--ibiz-width-icon-small'?: undefined;
                '--ibiz-width-icon-large'?: undefined;
                '--ibiz-width-icon-extra-large'?: undefined;
            };
        } | {
            label: string;
            value: string;
            labelLang: string;
            descLang: string;
            unit: string;
            type: string;
            kindVars: {
                '--ibiz-border-radius-extra-small': number;
                '--ibiz-border-radius-small': number;
                '--ibiz-border-radius-large': number;
                '--ibiz-spacing-super-tight'?: undefined;
                '--ibiz-spacing-extra-tight'?: undefined;
                '--ibiz-spacing-tight'?: undefined;
                '--ibiz-spacing-base-tight'?: undefined;
                '--ibiz-spacing-base-loose'?: undefined;
                '--ibiz-spacing-loose'?: undefined;
                '--ibiz-spacing-extra-loose'?: undefined;
                '--ibiz-spacing-super-loose'?: undefined;
                '--ibiz-width-icon-extra-small'?: undefined;
                '--ibiz-width-icon-small'?: undefined;
                '--ibiz-width-icon-large'?: undefined;
                '--ibiz-width-icon-extra-large'?: undefined;
            };
        } | {
            label: string;
            value: string;
            labelLang: string;
            descLang: string;
            unit: string;
            type: string;
            kindVars: {
                '--ibiz-width-icon-extra-small': number;
                '--ibiz-width-icon-small': number;
                '--ibiz-width-icon-large': number;
                '--ibiz-width-icon-extra-large': number;
                '--ibiz-spacing-super-tight'?: undefined;
                '--ibiz-spacing-extra-tight'?: undefined;
                '--ibiz-spacing-tight'?: undefined;
                '--ibiz-spacing-base-tight'?: undefined;
                '--ibiz-spacing-base-loose'?: undefined;
                '--ibiz-spacing-loose'?: undefined;
                '--ibiz-spacing-extra-loose'?: undefined;
                '--ibiz-spacing-super-loose'?: undefined;
                '--ibiz-border-radius-extra-small'?: undefined;
                '--ibiz-border-radius-small'?: undefined;
                '--ibiz-border-radius-large'?: undefined;
            };
        })[];
        children?: undefined;
    })[];
    vars?: undefined;
} | {
    caption: string;
    labelLang: string;
    vars: {
        label: string;
        value: string;
        defaultValue: string;
        labelLang: string;
        descLang: string;
        className: string;
    }[];
    children?: undefined;
} | {
    caption: string;
    labelLang: string;
    children: {
        caption: string;
        labelLang: string;
        vars: {
            label: string;
            value: string;
            defaultValue: string;
            labelLang: string;
            descLang: string;
            className: string;
        }[];
    }[];
    vars?: undefined;
})[];
