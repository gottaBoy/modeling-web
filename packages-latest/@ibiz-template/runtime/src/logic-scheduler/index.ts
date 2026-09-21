import { LogicExecutor } from './executor/logic-executor';
import { LogicExecutorFactory } from './executor/logic-executor-factory';
import { ScriptExecutor } from './executor/script-executor';
import { AppDEUILogicExecutor } from './executor/app-de-ui-logic-executor';
import { LogicSchedulerCenter } from './logic-scheduler-center';
import { ControlLogicScheduler } from './scheduler/control-logic-scheduler';
import { ViewLogicScheduler } from './scheduler/view-logic-scheduler';
import { CustomTrigger } from './trigger/custom-trigger';
import { ItemDynaLogicTrigger } from './trigger/item-dyna-logic-trigger';
import { LogicTrigger } from './trigger/logic-trigger';
import { LogicTriggerFactory } from './trigger/logic-trigger-factory';
import { TimerTrigger } from './trigger/timer-trigger';
import { AppUILogicExecutor } from './executor/app-ui-logic-executor';
import { ViewEventTrigger } from './trigger/view-event-trigger';
import { ControlEventTrigger } from './trigger/control-event-trigger';
import { AppDEUIActionExecutor } from './executor/app-ui-action-executor';

export {
  LogicSchedulerCenter,
  ViewLogicScheduler,
  ControlLogicScheduler,
  ItemDynaLogicTrigger,
  TimerTrigger,
  LogicTriggerFactory,
  LogicTrigger,
  LogicExecutorFactory,
  LogicExecutor,
  ScriptExecutor,
  AppDEUILogicExecutor,
};

export function installLogicSchedule(): void {
  ibiz.scheduler = new LogicSchedulerCenter();
  // 触发器
  ibiz.scheduler.triggerFactory.register(
    'ITEMVISIBLE',
    (logic, scheduler, scriptArgKeys) =>
      new ItemDynaLogicTrigger(logic, scheduler, scriptArgKeys),
  );
  ibiz.scheduler.triggerFactory.register(
    'ITEMENABLE',
    (logic, scheduler, scriptArgKeys) =>
      new ItemDynaLogicTrigger(logic, scheduler, scriptArgKeys),
  );
  ibiz.scheduler.triggerFactory.register(
    'ITEMBLANK',
    (logic, scheduler, scriptArgKeys) =>
      new ItemDynaLogicTrigger(logic, scheduler, scriptArgKeys),
  );
  ibiz.scheduler.triggerFactory.register(
    'TIMER',
    (logic, scheduler, scriptArgKeys) =>
      new TimerTrigger(logic, scheduler, scriptArgKeys),
  );
  ibiz.scheduler.triggerFactory.register(
    'CUSTOM',
    (logic, scheduler, scriptArgKeys) =>
      new CustomTrigger(logic, scheduler, scriptArgKeys),
  );
  ibiz.scheduler.triggerFactory.register(
    'VIEWEVENT',
    (logic, scheduler, scriptArgKeys) =>
      new ViewEventTrigger(logic, scheduler, scriptArgKeys),
  );
  ibiz.scheduler.triggerFactory.register(
    'CTRLEVENT',
    (logic, scheduler, scriptArgKeys) =>
      new ControlEventTrigger(logic, scheduler, scriptArgKeys),
  );

  // 执行器
  // 脚本
  ibiz.scheduler.executorFactory.register(
    'SCRIPT',
    (logic, scheduler) => new ScriptExecutor(logic, scheduler),
  );

  // 实体逻辑
  ibiz.scheduler.executorFactory.register(
    'APPDEUILOGIC',
    (logic, scheduler) => new AppDEUILogicExecutor(logic, scheduler),
  );
  ibiz.scheduler.executorFactory.register(
    'DEUILOGIC',
    (logic, scheduler) => new AppDEUILogicExecutor(logic, scheduler),
  );

  // 界面逻辑
  ibiz.scheduler.executorFactory.register(
    'APPUILOGIC',
    (logic, scheduler) => new AppUILogicExecutor(logic, scheduler),
  );

  // 界面行为
  ibiz.scheduler.executorFactory.register(
    'APPDEUIACTION',
    (logic, scheduler) => new AppDEUIActionExecutor(logic, scheduler),
  );
}
