(function () {
  'use strict';
  angular
    .module('hash.clipper')
    .config(function ($stateProvider) {
      $stateProvider
        .state('clipper', {
          url: '/clipper',
          views: {
            '': { 
              templateUrl: 'modules/clipper/views/index.html',
              controller: 'main'
            }
          }
      })

        .state('clipper/noticia', {
          url: '/clipper/noticia',
          views: {
            '': { 
              templateUrl: 'modules/clipper/views/indexContent.html',
              controller: 'main'
            }
          }
      })
     
  });

})();
