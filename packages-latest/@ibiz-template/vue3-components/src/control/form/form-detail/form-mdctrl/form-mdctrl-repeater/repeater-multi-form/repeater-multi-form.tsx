import { defineComponent } from 'vue';
import {
  EventBase,
  FormMDCtrlRepeaterController,
  IEditFormController,
} from '@ibiz-template/runtime';
import { useNamespace } from '@ibiz-template/vue3-util';
import { RepeaterSingleForm } from '../repeater-single-form/repeater-single-form';

export const RepeaterMultiForm = defineComponent({
  name: 'IBizRepeaterMultiForm',
  props: {
    controller: {
      type: FormMDCtrlRepeaterController,
      required: true,
    },
  },
  emits: {
    change: (_value: IData[]) => true,
  },
  setup(props, { emit }) {
    const ns = useNamespace('repeater-multi-form');

    const onValueChange = (value: IData, index: number) => {
      const arrData = [...(props.controller.value as IData[])];
      arrData[index] = value;
      emit('change', arrData);
    };

    const onCreated = (index: number, event: EventBase): void => {
      props.controller.setRepeaterController(
        `${index}`,
        event.ctrl as IEditFormController,
      );
    };

    return { ns, onValueChange, onCreated };
  },
  render() {
    const items = this.controller.value as IData[];
    let userStyle = '';
    if (
      this.controller.model.userParam &&
      this.controller.model.userParam.STYLE
    ) {
      userStyle = this.controller.model.userParam.STYLE;
    }

    return (
      <iBizMDCtrlContainer
        class={this.ns.b()}
        userStyle={userStyle}
        items={items}
        controller={this.controller}
        enableCreate={this.controller.enableCreate}
        enableDelete={this.controller.enableDelete}
        enableSort={this.controller.enableSort}
        onAddClick={() => this.controller.create()}
        onRemoveClick={(_item: IData, index: number) =>
          this.controller.remove(index)
        }
        onDragChange={(draggedIndex: number, targetIndex: number) => {
          this.controller.dragChange(draggedIndex, targetIndex);
        }}
      >
        {{
          item: ({ data, index }: { data: IData; index: number }) => {
            return (
              <RepeaterSingleForm
                key={index}
                data={data}
                simpleDataIndex={index}
                controller={this.controller}
                onChange={(value: IData) => {
                  this.onValueChange(value, index);
                }}
                onCreated={(event: EventBase) => this.onCreated(index, event)}
              ></RepeaterSingleForm>
            );
          },
        }}
      </iBizMDCtrlContainer>
    );
  },
});
