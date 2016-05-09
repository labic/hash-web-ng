hash.controller('mainInstagram', function ($scope, settings, InstagramMedia) {
  $scope.config = {
    filter: settings.get('instagram.filters'),
    map : {
      center: { latitude: -13.32156, longitude: -53.8852 },
      zoom: 4,
      options: {
        mapTypeControl: false,
        streetViewControl: false
      }
    }
  };

  $scope.filter = {
    themes: $scope.config.filter.main[0].tag,
    period: 'recent',
  };

  $scope.mediasGeolocation = [];
  $scope.mediasImages = [];

  $scope.$watch('filter', function (newFilter, oldFilter) {
    // Populate the map
    InstagramMedia.find({
      'period': $scope.filter.period,
      'tags[]': [newFilter.themes],
      'geo': true,
      'page': 1,
      'per_page': 100
    }, function(medias) {
      var makers = [];

      for (var i = 0; i < medias.length; i++) {
        var maker = {
          id: i,
          latitude: medias[i].data.location.latitude,
          longitude: medias[i].data.location.longitude,
          url: medias[i].data.images.low_resolution.url,
          show: false
        }
        if (medias[i].data.caption)
          maker.title = medias[i].data.caption.text

          makers.push(maker);
      }

      $scope.mediasGeolocation = makers;
      $scope.infoWindow = null;
    });

    // Populate the mosaic
    InstagramMedia.find({
      'period': $scope.filter.period,
      'tags[]': [newFilter.themes],
      'page': 1,
      'per_page': 100
    }, function(medias) {
      medias = _.sortBy(medias, ['data.created_time']);
      var images = [];

      for (var i = 0; i < medias.length; i++) {
        images.push({
          link: medias[i].data.link,
          src: medias[i].data.images.standard_resolution.url
        });
      }

      $scope.mediasImages = images.reverse();
    });
  },true);

  $scope.onClick = function(marker, eventName, model) {
    if(model.show == true){
      model.show = false;
      $scope.activeWindow = null;        
    }else{
      model.show = true;
      if($scope.activeWindow != null){
        $scope.activeWindow.show = false;
      }
      $scope.activeWindow = model;
    }
  };

  $scope.activeWindow = null;
});
