// Ionic  App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

// Create module for testapp with "ionic"
// "ionicLazyLoad" using for if images downloading loader will be showb
// .config used for Route our pages
// .controller controller views and models
// .run including cordova functions
angular.module('TestApp', ['ionic', 'ionicLazyLoad'])
.factory('dataShare',function($rootScope){
         var service = {};
         service.data = false;
         service.sendData = function(data){

         this.data = data;
         $rootScope.$broadcast('data_shared');
         };
         service.getData = function(){
         return this.data;
         };
         return service;
         })
.config(function($stateProvider, $urlRouterProvider) {
       $stateProvider
       .state('index', {
              url: '/',
              templateUrl: 'index.html' //load index templates
              })
       .state('details', {
              url: '/details',
              templateUrl: 'details.html' //load details templates
              });
       $urlRouterProvider.otherwise('/');  //load default templates
       })

.controller('NewsFeedCtrl', ['$scope','$http','$ionicLoading','$timeout','$rootScope','dataShare', function($scope,$http,$ionicLoading,$timeout, $rootScope, dataShare) {
                       
                    // load list
                     getDataFromServer($http, $scope, $timeout, $ionicLoading);

                    // Refresh button click event
                       $scope.refreshButtonClicked = function() {
                             // Show loading
                             $ionicLoading.show();
                             getDataFromServer($http, $scope, $timeout, $ionicLoading);
                       };
                             
                             $scope.send = function(selItem){
                             dataShare.sendData(selItem.webHref);
                             };
                       
                       }])
.controller('NewsFeedDetailsCtrl', ['$scope', '$sce', '$rootScope','dataShare', function ($scope, $sce, $rootScope, dataShare) {
                                    var text =  dataShare.getData();
                                    $scope.url = $sce.trustAsResourceUrl(text);
                                    
        }])


.run(function($ionicPlatform) {
     // when ionic is loaded properly then this method call automatically
     $ionicPlatform.ready(function() {
                          if(window.cordova && window.cordova.plugins.Keyboard) {
                          // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                          // for form inputs)
                          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                          
                          // Don't remove this line unless you know what you are doing. It stops the viewport
                          // from snapping when text inputs are focused. Ionic handles this internally for
                          // a much nicer keyboard experience.
                          cordova.plugins.Keyboard.disableScroll(true);
                          }
                          // set status bar style
                          if(window.StatusBar) {
                          StatusBar.styleDefault();
                          }
                          });
     })

function getDataFromServer($http, $scope, $timeout, $ionicLoading){

    $scope.items = [];
    // Simple GET request:
    $http({
          method: 'GET',
          url: 'http://mobilatr.mob.f2.com.au/services/views/9.json'
          }).then(function successCallback(response) {
                  
                  // this callback will be called asynchronously
                  // when the response is available
                  
                  console.log("response: ",JSON.stringify(response));
                  
                  if(response.status == 200)
                  {
                  var responseData = response.data.items;
                  $scope.items = responseData;
                  }
                  
                  // hide loading
                  $timeout(function () {
                           $ionicLoading.hide();
                           }, 200);
                  
                  }, function errorCallback(response) {
                  // called asynchronously if an error occurs
                  // or server returns response with an error status.
                  // hide loading
                  $timeout(function () {
                           $ionicLoading.hide();
                           }, 200);
                  
                  alert("Something went wrong on server");
                  
                  });
}


