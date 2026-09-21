import { CommandController } from './command';
export * from './interface';
export * from './utils';
export { CommandsRegistry } from './command-register';
export { CommandController } from './command';
/**
 * 命令控制器
 */
export const commands = new CommandController();
