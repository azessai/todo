(function() {
    'use strict';

	var app = angular.module('main', ['route']);

    app.factory('Todos', function($http) {
 
        return [
        { name: 'Master HTML/CSS/Javascript', completed: true, note: 'note A' },
        { name: 'Learn AngularJS', completed: false, note: 'note B' },
        { name: 'Build NodeJS backend', completed: false, note: 'note C' },
        { name: 'Get started with ExpressJS', completed: false, note: 'note D' },
        { name: 'Setup MongoDB database', completed: false, note: 'note E' },
        { name: 'Be awesome!', completed: false, note: 'note F' },
        ];
 
    });
    
    app.service("dataService", function ($http, $q){
        var deferred = $q.defer();
        $http.get('/app/get.json').then(function(response) {
			    //console.log('response', response);
                deferred.resolve(response);

        });
        this.getdata = function (){
            return deferred.promise;
        };
    });
    
    app.controller('TodoController', ['$scope', '$http', 'Todos', 'dataService', function($scope, $http, Todos, dataService) {
        $scope.msg = 'NON';

        $scope.valider = function(text) {
            $http.post('/app/save.json', $scope.todos).then(function(data, status, headers) {
                $scope.msg = 'Data saved';
            });
//            $scope.saveToPc($scope.todos, '/app/save.json');



        };
        
        
        
$scope.saveToPc = function (data, filename) {

  if (!data) {
    console.error('No data');
    return;
  }

  if (!filename) {
    filename = 'download.json';
  }

  if (typeof data === 'object') {
    data = JSON.stringify(data, undefined, 2);
  }

  var blob = new Blob([data], {type: 'text/json'});

  // FOR IE:

  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blob, filename);
  }
  else{
      var e = document.createEvent('MouseEvents'),
          a = document.createElement('a');

      a.download = filename;
      a.href = window.URL.createObjectURL(blob);
      a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
      e.initEvent('click', true, false, window,
          0, 0, 0, 0, 0, false, false, false, false, 0, null);
      a.dispatchEvent(e);
  }
};
        
        
        
        if (true)
        {
/*            var promise = dataService.getdata();
            promise.then(function(response){
                $scope.todos = response.data;
                //console.log($scope.todos);
            });*/
            
            $http.get('/app/get.json').then(function(response) {
			     //console.log('response', response);
                $scope.todos = response.data;
            });
            
        } else {
            $scope.todos = Todos;
        }

    }]);

    app.controller('TodoDetailController', ['$scope', '$routeParams', '$location', 'Todos', function ($scope, $routeParams, $location, Todos) {
        console.log($routeParams.id);
        $scope.todo = Todos[$routeParams.id];
        $scope.retour = function (){
            $location.path("/");
        }
        
    }]);
    /*app.controller('Valider', ['$injector', function($injector) {
	var ctrl = this;
	var $http = $injector.get('$http');

	ctrl.start = function() {
		console.log('Product ctrl Start', arguments);
		ctrl.logs = [];

		$http.get('../ws/s1').then(function(response) {
			console.log('response', response);
			ctrl.logs.push(response.data);
			return $q.all([
				$http.get('../ws/s2'),
				$http.get('../ws/s3'),
				$http.get('../ws/s4')
			]);
		}).then(function(responses) {
			console.log('responses', responses);
			ctrl.logs.push(responses[0].data);
			ctrl.logs.push(responses[1].data);
			ctrl.logs.push(responses[2].data);
			return $http.get('../ws/s5');
		}).then(function(response) {
			ctrl.logs.push(response.data);
		}).catch(function(error) {
			console.error('error', error);
		});*/
})();