export declare class Wave {
    points: IData[];
    startX: number;
    canvasWidth: number;
    canvasHeight: number;
    waveWidth: number;
    waveHeight: number;
    xOffset: number;
    speed: number;
    color: string;
    constructor({ canvasWidth, // 轴长
    canvasHeight, // 轴高
    waveWidth, // 波浪宽度,数越小越宽
    waveHeight, // 波浪高度,数越大越高
    xOffset, speed, color, }?: IData);
    draw(ctx: CanvasRenderingContext2D): void;
    update({ nowRange }?: IData): void;
}
export default Wave;
