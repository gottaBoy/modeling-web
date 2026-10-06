export { resolveNativeModelingConfig as resolveNativeModelDesignTarget }
  from '../../../scripts/native-modeling-config.mjs';

export function classifyModelingTarget(model, entry) {
  if (/\/plmweb\//i.test(model?.dynaModelFilePath || '')) {
    return { eligible: false, reason: 'Modeling IDE uses the PLM app model, not a native ModelDesign model.' };
  }
  if (!model?.htmlUrl) {
    return { eligible: false, reason: 'Modeling IDE has no editor URL.' };
  }
  let target;
  try {
    target = new URL(model.htmlUrl, entry);
  } catch {
    return { eligible: false, reason: 'Modeling IDE has an invalid editor URL.' };
  }
  const parent = new URL(entry);
  if (target.origin === parent.origin &&
      target.pathname.replace(/\/+$/, '') === parent.pathname.replace(/\/+$/, '')) {
    return { eligible: false, reason: 'Modeling IDE iframe points back to the outer application.' };
  }
  return { eligible: true, reason: 'Editor target found; editing and persistence are not verified.' };
}
