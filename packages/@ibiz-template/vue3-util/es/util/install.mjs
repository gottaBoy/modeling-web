"use strict";
const withInstall = (main, install) => {
  main.install = (app) => {
    install(app);
  };
  return main;
};

export { withInstall };
