import { PropType } from 'vue';
import './view-list.scss';
import { IViewController } from '@ibiz-template/runtime';
import { CenterController } from '../../controller/center.controller';
export declare const ViewList: import("vue").DefineComponent<{
    center: {
        type: PropType<CenterController>;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    renderRefreshByViewList: () => string;
    onItemClick: (view: IViewController) => void;
    onMouseEnter: (_event: MouseEvent, view: IViewController) => void;
    onMouseLeave: (_event: MouseEvent, _view: IViewController) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    center: {
        type: PropType<CenterController>;
        required: true;
    };
}>>, {}, {}>;
