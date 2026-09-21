import { ReportPanelBaseGenerator } from './base-generator';

/**
 * 用户自定义（G6图表）
 *
 * @export
 * @class UserReportPanelGenerator
 * @extends {ReportPanelBaseGenerator}
 */
export class UserReportPanelGenerator extends ReportPanelBaseGenerator {
  /**
   * 初始化配置
   *
   * @protected
   * @memberof UserReportPanelGenerator
   */
  public async initConfig(): Promise<void> {
    this.config = {
      CONFIG: {
        fitView: true,
        minZoom: 0.002,
        layout: {
          type: 'force',
          preventOverlap: true,
          linkDistance: 200,
          nodeSize: 80,
          nodeSpacing: 30,
        },
      },
      NODELEGENDCONFIG: {
        valueField: 'source_lables||target_lables',
        selected:
          "{{return Object.is(data.source_lables, 'NEO4J_ZT') || Object.is(data.target_lables, 'NEO4J_ZT')}}",
        codeListTag: 'web.nodetype',
      },
      EDGELEGENDCONFIG: {
        valueField: 'relationship_type',
        codeListTag: 'web.relationshiptype',
      },
      PLUGINCONFIG: {
        gridConfig: {},
        miniMapConfig: {},
      },
      HOOKS: {
        g6Hooks: [
          {
            name: 'afterrender',
            callBack:
              '{{ const nodes = data.controller.graph.getNodes(); if (nodes.length < 25) { data.controller.graph.zoomTo(1); data.controller.graph.fitCenter() } }}',
          },
        ],
        nodeDataHook:
          "{{ data.forEach(node => { const type = node.data.source_lables || node.data.target_lables; Object.assign(node, { label: node.data.name, size: 66, style: { fill: node.color },donutAttrs: { prop1: 10000, prop2: 10 },donutColorMap: { prop1: node.color, prop2: node.color },icon: {show: true,img: type === 'NEO4J_ZT' ? resource.dir('assets/images/user-avatar.png') : resource.dir('assets/images/phone.png'),width: 40,height: 40}})})}}",
        edgeDataHook:
          '{{ data.forEach(edge => {Object.assign(edge, { label: edge.name })}) }}',
      },
    };
  }

  /**
   * 加载
   *
   * @param {IData} data
   * @return {*}  {Promise<IData>}
   * @memberof UserReportPanelGenerator
   */
  public load(data: IData = {}): Promise<IData> {
    if (this.protoRef) {
      this.protoRef.setData(data);
    }
    return Promise.resolve(data);
  }
}
