import { AiChatController } from '../../../controller';
import { IMaterial } from '../../../interface';

export interface OssfileMaterialProps {
    controller: AiChatController;
    material: IMaterial;
}
export declare const OssfileMaterial: (props: OssfileMaterialProps) => import("preact").JSX.Element;
