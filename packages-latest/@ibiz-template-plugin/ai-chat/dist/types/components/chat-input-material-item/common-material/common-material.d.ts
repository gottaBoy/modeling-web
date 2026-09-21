import { AiChatController } from '../../../controller';
import { IMaterial } from '../../../interface';

export interface CommonMaterialProps {
    controller: AiChatController;
    material: IMaterial;
}
export declare const CommonMaterial: (props: CommonMaterialProps) => import("preact").JSX.Element;
