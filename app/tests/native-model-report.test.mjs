import assert from 'node:assert/strict';
import test from 'node:test';
import {
  expectedAuthenticationEvent, summarizeNativeBrowserReport,
} from './native-model-contract.mjs';

const applications = ['Central', 'ModelDesign'];
const requiredStages = [
  'model', 'plugin-assets', 'login', 'home', 'theme-rendering',
  'navigation', 'reload', 'browser-errors',
];

function passingApplications() {
  return Object.fromEntries(applications.map(application => [application, {
    stages: Object.fromEntries(requiredStages.map(stage => [stage, { status: 'PASS' }])),
  }]));
}

test('native probe prerequisites pass while editor acceptance remains unclaimed', () => {
  const report = summarizeNativeBrowserReport(passingApplications());
  assert.equal(report.prerequisiteChecksPassed, true);
  assert.equal(report.failures, 0);
  assert.deepEqual(report.remainingAcceptance, [
    'native editor operations', 'model save', 'fresh-session model readback',
  ]);
  assert.equal('nativeAccepted' in report, false);
  assert.equal('fullFlowVerified' in report, false);
});

test('model HTTP roundtrip does not claim browser editor interaction', () => {
  const input = passingApplications();
  input.ModelDesign.stages['editor-save'] = { status: 'PASS' };
  input.ModelDesign.stages['fresh-session-readback'] = { status: 'PASS' };
  const report = summarizeNativeBrowserReport(input, { fullAcceptance: true });
  assert.equal(report.prerequisiteChecksPassed, true);
  assert.equal(report.modelDesignEditorSaveVerified, true);
  assert.equal(report.freshSessionReadbackVerified, true);
  assert.deepEqual(report.remainingAcceptance, ['native editor operations']);
  assert.equal(report.browserEditorInteractionVerified, false);
  assert.match(report.coverage, /authenticated model HTTP save and fresh-session readback/);
});

test('full native acceptance does not claim editor flow when readback is missing', () => {
  const input = passingApplications();
  input.ModelDesign.stages['editor-save'] = { status: 'PASS' };
  const report = summarizeNativeBrowserReport(input, { fullAcceptance: true });
  assert.equal(report.modelDesignEditorSaveVerified, true);
  assert.equal(report.freshSessionReadbackVerified, false);
  assert.deepEqual(report.remainingAcceptance, [
    'native editor operations', 'model save', 'fresh-session model readback',
  ]);
});

test('native index navigation aborts during authentication are expected, not browser errors', () => {
  const path = '/central/extras/js/loglevel-plugin-prefix/0.8.4/loglevel-plugin-prefix.system.min.js';
  const base = { authenticated: false, kind: 'console', path };
  const centralText = 'Navigation aborted from "/" to "/-/index/-" via a navigation guard.';
  const modelDesignText = 'Navigation aborted from "/" to "/psdevslnsys=28F7326A-7C72-4C2D-A497-A16372ABBADC/modelingindex/-" via a navigation guard.';
  const central = { ...base, text: centralText,
    path: '/central/extras/js/loglevel-plugin-prefix/0.8.4/loglevel-plugin-prefix.system.min.js' };
  assert.equal(expectedAuthenticationEvent(central, 'ibizmodeling__central'), true);
  assert.equal(expectedAuthenticationEvent({ ...base, text: modelDesignText },
    'ibizmodeling__modeldesign'), true);
  assert.equal(expectedAuthenticationEvent({ ...base,
    text: 'Navigation aborted from "/" to "/-/other/-" via a navigation guard.' },
  'ibizmodeling__modeldesign'), false);
  assert.equal(expectedAuthenticationEvent({ ...base, authenticated: true,
    text: centralText }, 'ibizmodeling__central'), false);
});

test('a failed theme cannot pass native probe prerequisites for either application', () => {
  for (const application of applications) {
    const input = passingApplications();
    input[application].stages['theme-rendering'].status = 'FAIL';
    const report = summarizeNativeBrowserReport(input);
    assert.equal(report.prerequisiteChecksPassed, false, application);
    assert.equal(report.failures, 1);
  }
});

test('missing theme evidence cannot pass native probe prerequisites', () => {
  for (const application of applications) {
    const input = passingApplications();
    delete input[application].stages['theme-rendering'];
    assert.equal(summarizeNativeBrowserReport(input).prerequisiteChecksPassed, false, application);
  }
});

test('pending, skipped or unknown theme status is not successful evidence', () => {
  for (const application of applications) {
    for (const status of ['PENDING', 'SKIP', undefined]) {
      const input = passingApplications();
      input[application].stages['theme-rendering'].status = status;
      const report = summarizeNativeBrowserReport(input);
      assert.equal(report.prerequisiteChecksPassed, false, `${application}: ${status}`);
      assert.equal(report.failures, 1);
    }
  }
});

test('no required native stage may be missing', () => {
  for (const application of applications) {
    for (const stage of requiredStages) {
      const input = passingApplications();
      delete input[application].stages[stage];
      assert.equal(summarizeNativeBrowserReport(input).prerequisiteChecksPassed, false,
        `${application}: ${stage}`);
    }
  }
});

test('a failed required native stage rejects prerequisites', () => {
  for (const application of applications) {
    for (const stage of requiredStages) {
      const input = passingApplications();
      input[application].stages[stage].status = 'FAIL';
      const report = summarizeNativeBrowserReport(input);
      assert.equal(report.prerequisiteChecksPassed, false, `${application}: ${stage}`);
      assert.equal(report.failures, 1);
    }
  }
});

test('additional recorded failures cannot coexist with a successful prerequisite verdict', () => {
  for (const application of applications) {
    const input = passingApplications();
    input[application].stages['additional-runtime-check'] = { status: 'FAIL' };
    const report = summarizeNativeBrowserReport(input);
    assert.equal(report.prerequisiteChecksPassed, false, application);
    assert.equal(report.failures, 1);
  }
});
