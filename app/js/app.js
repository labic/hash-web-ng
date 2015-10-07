// READ
// https://docs.angularjs.org/tutorial/step_11
// https://docs.angularjs.org/guide/filter
// https://docs.angularjs.org/api/ng/directive
// https://docs.angularjs.org/guide/directive
// https://docs.angularjs.org/api/ng/directive/ngController
// https://github.com/pablojim/highcharts-ng
(function () {
  'use strict';

  angular
    .module('hash.dash', [
      'checklist-model',
      'ui.router',
      'ui.bootstrap',
      'hash.core',
      'hash.api',
      'hash.twitter-monitor',
      //'angular-underscore'
    ])
    .constant('BASE_URI', 'https://hash-api.herokuapp.com:443/v1');
})()