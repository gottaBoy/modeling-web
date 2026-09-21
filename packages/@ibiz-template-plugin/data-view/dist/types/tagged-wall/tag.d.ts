import { PropType } from 'vue';
import { getRandomColorFromArray } from '../util';
import { TaggedWallController } from './tagged-wall.controller';

export declare const CustomTag: import('vue').DefineComponent<{
    tname: {
        type: StringConstructor;
        required: true;
    };
    controller: {
        type: PropType<TaggedWallController>;
        required: true;
    };
}, {
    ns: import('@ibiz-template/core').Namespace;
    setColor: import('vue').ComputedRef<string>;
    normalSize: import('vue').ComputedRef<string>;
    getRandomColorFromArray: typeof getRandomColorFromArray;
}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    tname: {
        type: StringConstructor;
        required: true;
    };
    controller: {
        type: PropType<TaggedWallController>;
        required: true;
    };
}>>, {}, {}>;
