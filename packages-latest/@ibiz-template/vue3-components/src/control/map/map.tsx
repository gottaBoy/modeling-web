/* eslint-disable no-nested-ternary */
import {
  useNamespace,
  useSemanticNode,
  useControlController,
} from '@ibiz-template/vue3-util';
import { computed, defineComponent, PropType, ref } from 'vue';
import { ISysMap } from '@ibiz/model-core';
import {
  IMapData,
  MapController,
  IControlProvider,
} from '@ibiz-template/runtime';
import { MapOptions } from '../../common';
import './map.scss';

const MapControl = defineComponent({
  name: 'IBizMapControl',
  props: {
    /**
     * @description 地图模型数据
     */
    modelData: { type: Object as PropType<ISysMap>, required: true },
    /**
     * @description 应用上下文对象
     */
    context: { type: Object as PropType<IContext>, required: true },
    /**
     * @description 视图参数对象
     * @default {}
     */
    params: { type: Object as PropType<IParams>, default: () => ({}) },
    /**
     * @description 部件适配器
     */
    provider: { type: Object as PropType<IControlProvider> },
    /**
     * @description 部件行数据默认激活模式，值为0:不激活，值为1：单击激活，值为2：双击激活
     */
    mdctrlActiveMode: { type: Number, default: undefined },
    /**
     * @description 是否是简单模式，即直接传入数据，不加载数据
     */
    isSimple: { type: Boolean, required: false },
    /**
     * @description 是否默认加载数据
     * @default true
     */
    loadDefault: { type: Boolean, default: true },
  },
  setup() {
    const c = useControlController((...args) => new MapController(...args));
    const ns = useNamespace(`control-${c.model.controlType!.toLowerCase()}`);
    const mapRef = ref();

    const mapStyle = c.model.mapStyle;
    const { semanticClass, semanticStyle } = useSemanticNode(c);
    // 子类类名透传
    const childClass = [
      {
        class: semanticClass('editor.content'),
        selector: '.ibiz-control-map__map',
      },
      {
        class: semanticClass('editor.goback'),
        selector: '.ibiz-map-chart-user__goback',
      },
      {
        class: semanticClass('editor.goback'),
        selector: '.ibiz-map-chart__goback',
      },
      {
        class: semanticClass('editor.fullscreen'),
        selector: '.ibiz-map-chart-user__fullscreen',
      },
    ];

    // 子类样式透传
    const childStyle = [
      {
        style: semanticStyle('editor.content'),
        selector: '.ibiz-control-map__map',
      },
      {
        style: semanticStyle('editor.goback'),
        selector: '.ibiz-map-chart-user__goback',
      },
      {
        style: semanticStyle('editor.goback'),
        selector: '.ibiz-map-chart__goback',
      },
      {
        style: semanticStyle('editor.fullscreen'),
        selector: '.ibiz-map-chart-user__fullscreen',
      },
    ];
    const mapOpts = computed<Partial<MapOptions>>(() => {
      return {
        strAreaCode: c.state.strAreaCode,
        defaultAreaCode: c.state.defaultAreaCode,
        jsonBaseUrl: c.state.jsonBaseUrl,
      };
    });

    return {
      c,
      ns,
      mapRef,
      mapOpts,
      mapStyle,
      childClass,
      childStyle,
      semanticClass,
      semanticStyle,
    };
  },
  render() {
    const { state } = this.c;
    if (!state.isCreated) return;
    let content;
    if (state.isLoaded) {
      content =
        this.mapStyle === 'USER' ? (
          <iBizMapChartUser
            {...this.$attrs}
            controller={this.c}
            options={this.mapOpts}
            areaData={state.areaData}
            pointData={state.pointData}
            class={this.ns.e('map')}
          ></iBizMapChartUser>
        ) : (
          <iBizMapChart
            {...this.$attrs}
            controller={this.c}
            options={this.mapOpts}
            areaData={state.areaData}
            pointData={state.pointData}
            class={this.ns.e('map')}
            onPointClick={(e: IMapData) => {
              this.c.onPointClick(e);
            }}
            onAreaClick={(e: IMapData) => {
              this.c.onAreaClick(e, '', '');
            }}
          ></iBizMapChart>
        );
    }
    return (
      <iBizControlNavigation controller={this.c}>
        <iBizControlBase
          controller={this.c}
          class={this.semanticClass('root')}
          style={this.semanticStyle('root')}
          v-child-class={this.childClass}
          v-child-style={this.childStyle}
        >
          {content}
          {this.c.state.enableNavView && this.c.state.showNavIcon ? (
            !this.c.state.showNavView ? (
              <ion-icon
                class={this.ns.e('nav-icon')}
                title={ibiz.i18n.t('component.controlNavigation.showNav')}
                name='eye-outline'
                onClick={() => this.c.onShowNavViewChange()}
              ></ion-icon>
            ) : (
              <ion-icon
                class={this.ns.e('nav-icon')}
                title={ibiz.i18n.t('component.controlNavigation.hiddenNav')}
                name='eye-off-outline'
                onClick={() => this.c.onShowNavViewChange()}
              ></ion-icon>
            )
          ) : null}
        </iBizControlBase>
      </iBizControlNavigation>
    );
  },
});

export default MapControl;
