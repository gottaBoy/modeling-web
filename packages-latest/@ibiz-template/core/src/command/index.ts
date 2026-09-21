import { CommandController } from './command';

export * from '../interface/command';
export * from './utils';
export { CommandsRegistry } from './command-register';
export { CommandController } from './command';
// 命令控制器
export const commands = new CommandController();
