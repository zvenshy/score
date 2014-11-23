function ScoreCtrl ($scope, $http) {
    var data = window['data'] = function (jsonpdata) {
        $('li.initTerm').addClass('hide');
        $scope.datas = jsonpdata;
        $scope.terms = [];
        angular.forEach($scope.datas, function (v, i) {
            var term = v['Term'];
            if ($scope.terms.indexOf(term) === -1) $scope.terms.push(term);
        })
        $scope.terms.sort(function (a, b) {
            if (a >= b) return -1;
            else return 1;
        });
        $scope.term = $scope.terms[0];
    };
    $scope.scoreSearch = function () {
        $http.jsonp('http://api.ecjtu.net/score.php?s='+ $scope.stuId + '&callback=data').
            success(data);
    };
    $scope.updateTerm = function (e) {
        $scope.term = e.innerText;
    };
}