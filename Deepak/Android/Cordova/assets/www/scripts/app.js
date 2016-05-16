'use strict';
/*
 *               Application config
 * @Package      Angular
 * @Author       Rahul Rajawat
 * @modules      ngAnimate, ngRoute, ngTouch, apiService
 * @Version      1.0.0
 * @Description  Applcation config file to load all required modules, define basic settings ,
                 define routing if needed.
 */
var testApp = angular.module('testApp', ['ngAnimate', 'ngRoute', 'ngTouch','apiService'])

  .constant('version', 'v1.0.0')

  .config(function($routeProvider) {    

    $routeProvider
        .when('/', {          

            templateUrl: 'views/home.html'
        })
        .when('/webview/:index', {  

            templateUrl: 'views/view.html'
        });
        
  });

