'use strict';

var ibizSwitch = require('./ibiz-switch/ibiz-switch.cjs');
var switchEditor_controller = require('./switch-editor.controller.cjs');
var switchEditor_provider = require('./switch-editor.provider.cjs');

"use strict";

exports.IBizSwitch = ibizSwitch.IBizSwitch;
exports.SwitchEditorController = switchEditor_controller.SwitchEditorController;
exports.SwitchEditorProvider = switchEditor_provider.SwitchEditorProvider;
