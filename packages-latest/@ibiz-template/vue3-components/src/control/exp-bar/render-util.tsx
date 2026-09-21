import { Namespace } from '@ibiz-template/core';
import { debounce } from 'lodash-es';
import { IExpBarControlController } from '@ibiz-template/runtime';
import { VNode, h, resolveComponent } from 'vue';
import { useRoute } from 'vue-router';
import {
  useNamespace,
  onRouteChange,
  route2routePath,
  useSemanticNode,
  UseSemanticClassReturn,
  UseSemanticStyleReturn,
} from '@ibiz-template/vue3-util';
import './render-util.scss';

/**
 * @description 导航栏绘制工具（标题，快速搜索）
 * @export
 * @param {IExpBarControlController} c
 * @param {Namespace} ns
 * @returns {*}  {({
 *   semanticClass: UseSemanticClassReturn;
 *   semanticStyle: UseSemanticStyleReturn;
 *   renderTitle: () => VNode | null;
 *   renderSearchBar: () => VNode | null;
 * })}
 */
export function useExpBarRender(
  c: IExpBarControlController,
  ns: Namespace,
): {
  semanticClass: UseSemanticClassReturn;
  semanticStyle: UseSemanticStyleReturn;
  renderTitle: () => VNode | null;
  renderSearchBar: () => VNode | null;
} {
  const expBarNs = useNamespace('exp-bar');

  const { semanticClass, semanticStyle } = useSemanticNode(c);

  const debounceSearch = debounce(() => {
    c.load();
  }, 500);

  const onInput = (value: string): void => {
    c.state.query = value;
    debounceSearch();
  };

  const renderTitle = (): VNode | null => {
    const { model } = c;
    if (!model.showTitleBar) return null;
    let title = model.title;
    if (model.titleLanguageRes) {
      title = ibiz.i18n.t(model.titleLanguageRes.lanResTag!, model.title);
    }
    return (
      <div
        style={semanticStyle('title')}
        class={[ns.b('caption'), expBarNs.b('caption'), semanticClass('title')]}
      >
        {model.sysImage && (
          <iBizIcon
            class={[
              expBarNs.be('caption', 'icon'),
              semanticClass('title.icon'),
            ]}
            style={semanticStyle('title.icon')}
            icon={model.sysImage}
          ></iBizIcon>
        )}
        {title && (
          <span
            class={[
              ns.be('caption', 'text'),
              expBarNs.be('caption', 'text'),
              semanticClass('title.text'),
            ]}
            style={semanticStyle('title.text')}
          >
            {title}
          </span>
        )}
      </div>
    );
  };

  const renderSearchBar = (): VNode | null => {
    const { model } = c;
    if (!model.enableSearch) return null;

    const modelData = c.view.model.viewLayoutPanel?.controls?.find(
      item => item.id === 'searchbar',
    );
    if (modelData) {
      // 由于搜索栏部件参数无法配置，合并导航栏部件参数到搜索栏部件参数中
      // if (modelData.controlParam) {
      //   const { SEARCHPHSEPARATOR } = c.model.controlParam?.ctrlParams || {};
      //   if (SEARCHPHSEPARATOR) {
      //     modelData.controlParam.ctrlParams = {
      //       ...(modelData.controlParam.ctrlParams || {}),
      //       SEARCHPHSEPARATOR,
      //     };
      //   }
      // }
      const ctrlProps = {
        context: c.context,
        params: c.params,
      };
      const comp = resolveComponent('IBizControlShell');
      return h(comp, {
        modelData,
        class: [ns.b('searchbar'), semanticClass('search')],
        style: semanticStyle('search'),
        ...ctrlProps,
      });
    }

    return (
      <el-input
        model-value={c.state.query}
        class={[
          ns.b('quick-search'),
          expBarNs.b('quick-search'),
          semanticClass('search'),
        ]}
        style={semanticStyle('search')}
        placeholder={c.state.placeHolder}
        onInput={onInput}
      >
        {{
          prefix: (): VNode => {
            return <ion-icon class={ns.e('search-icon')} name='search' />;
          },
        }}
      </el-input>
    );
  };

  return { semanticClass, semanticStyle, renderTitle, renderSearchBar };
}

/**
 * 监听路由变更，当自身所处的路由变更时触发导航栏控制器onRouterChange
 * @author lxm
 * @date 2023-09-14 10:02:41
 * @export
 * @param {IExpBarControlController} c
 */
export function useWatchRouteChange(c: IExpBarControlController): void {
  const depth = c.view.modal.routeDepth;
  if (depth) {
    const route = useRoute();
    let selfKey: string | undefined;
    onRouteChange(({ currentKey, fullPath }) => {
      if (!selfKey) {
        selfKey = currentKey;
      } else if (selfKey === currentKey) {
        const routePath = route2routePath(route);
        const { srfnav } = routePath.pathNodes[depth! - 1];
        c.onRouterChange({ srfnav: srfnav || '', path: fullPath });
      }
    }, depth);
  }
}
