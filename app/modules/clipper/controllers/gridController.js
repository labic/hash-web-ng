hash.controller("gridController", function($scope, $http) { 

    var url = 'https://inep-hash-data-api-dev.herokuapp.com/articles';

    $http({
        url: url,
        method:'GET'
    })
    .then(function (response) {
        $scope.novidades = response.data.data; 
    },
    function (err) {
        console.log(err);
    });
});
