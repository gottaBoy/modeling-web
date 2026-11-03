(function () {
  const language = new URL(window.location.href).searchParams.get('language');
  if (language !== 'en' && language !== 'zh-CN') return;
  // The embedded app has a separate origin; set its preference before i18n loads.
  try {
    localStorage.setItem('language', language);
  } catch (_) {
    // Browsers may block storage. Do not block authentication or app startup.
  }
})();
