import { IMaterial } from '../../interface';
export declare class ChatMaterial implements IMaterial {
    material: IMaterial;
    get id(): IMaterial['id'];
    get type(): IMaterial['type'];
    get metadata(): IMaterial['metadata'];
    get data(): IMaterial['data'];
    constructor(material: IMaterial);
}
