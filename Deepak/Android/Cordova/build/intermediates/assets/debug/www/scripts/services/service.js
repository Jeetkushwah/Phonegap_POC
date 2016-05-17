/*
 * @Service      apiService
 * @Package      Angular
 * @Author       Rahul Rajawat
 * @Params       $http, $q
 * @Version      1.0.0
 * @Description  This is http service to fetch data from external resource.
 */
testApp = angular.module("apiService", []);

testApp.service("apiService", ['$http', '$q',  function ($http, $q) {
    
    this.fetchData = function () {            
            var deferred = $q.defer();                       
            $http.get(apiPath)
            .success(function(data, status, headers, config) {
                return deferred.resolve(data);
            });
            return deferred.promise;
    }
	return this;

}]);