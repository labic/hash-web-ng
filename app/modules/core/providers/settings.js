(function () {
  'use strict';
  angular
    .module('hash.core')
    .provider('settings', function () {
      var settingsValues = [];

      this.$get = function($http) {
        var provider = {};

        provider.get = function(key) {
          return _.find(settingsValues, {key: key}).value;
        }

        provider.set = function(key, value) {
          settingsValues.push({
            key: key,
            value: value
          });
        };

        provider.setFromFile = function(key, filePath) {
          $http.get(filePath).then(function(res) {
            settingsValues.push({
              key: key,
              value: res.data
            });
          });
        };

        return provider;
      };
    });
})();
