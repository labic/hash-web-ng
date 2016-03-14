(function () {
  'use strict';
  angular
    .module('hash.core')
    .provider('settings', function () {
      var settingsValues = [];

      this.$get = function($http) {
        return {
          get: function(key) {
            return _.find(settingsValues, {key: key}).value;
          },
          set: function(key, value) {
            settingsValues.push({
              key: key,
              value: value
            });
          },
          setFromFile: function(key, filePath) {
            $http.get(filePath).then(function(res) {
              settingsValues.push({
                key: key,
                value: res.data
              });
            });
          }
        };
      };
    });
})();
