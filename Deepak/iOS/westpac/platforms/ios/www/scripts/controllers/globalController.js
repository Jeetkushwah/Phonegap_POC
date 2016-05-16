'use strict';
/*
 * @Controller   globalController
 * @Package      Angular
 * @Author       Rahul Rajawat
 * @Params       $scope, $location, apiService, $q, $route, $sce
 * @Version      1.0.0
 * @Description  Global controller added to <html> element in index.html , this controller
                 has global scope. 
 */
testApp
	.controller('globalController',['$scope', '$location','apiService','$q','$route','$sce', function($scope, $location,apiService,$q,$route,$sce) {
		
		/*
			variables 
		*/	
		$scope.isLoader = true;
		$scope.reapeatLimit = 7;

		/*
			Api Service : apiService
			Method      : fetchData()
			Params		: -
			Response 	: response (Json Object)
			Description : http service to fetch data from external or given resources. 
		*/
		$scope.init = function(){
			apiService.fetchData().then(function(response){			
				$scope.newsData = response;			
				$scope.isLoader = false;
			})
		}	
		
		
		/*		
			Method      : refresh()
			Params		: -
			Response 	: -
			Description : reload the home view 
		*/
		$scope.refresh = function(){
			$scope.isLoader = true;
            $scope.newsData = [];
			$scope.init();
		}

		/*		
			Method      : redirect()
			Params		: index			
			Description : find tiny url of specific news and redirect to webview(load iframe) 
		*/
		$scope.redirect = function(index){
			var headerHeight = $("#header").outerHeight();
			var windowHeight = window.innerHeight;			
			$scope.frameW = windowHeight - headerHeight;
			$scope.externalUrl = $sce.trustAsResourceUrl($scope.newsData.items[index].tinyUrl)
			$location.path("/webview/"+index);
			$scope.isLoader = true;
			setTimeout(function(){
				$("iframe").on('load',function(){					
					$scope.isLoader = false;
					$scope.$$phase || $scope.$apply();
				});
			},500);			
		}

		/*		
			Method      : back()
			Params		: -		
			Description : Redirect back to home view from webview 
		*/
		$scope.back = function(){
			$location.path("/");
		}

		/*		
			Method      : scrollUpdateViewLimit()
			Params		: -		
			Description : call on list scroll reach to bottom and update list item limit to for lazy loading. method called from listScroller directive
		*/
		$scope.scrollUpdateViewLimit = function(){
			$scope.reapeatLimit += 5;
		}

		$scope.init();
		

	}])	
	.filter('orderNewsBy', function(){
		/*		
			Filter      : orderNewsBy
			Params		: dateLine			
			Description : Filter method to sort images by given parameter.   
		*/	
	    return function(input, attribute) {
	        if (!angular.isObject(input)) return input;

	        var array = [];
	        for(var objectKey in input) {
	            array.push(input[objectKey]);
	        }

	        array.sort(function(a, b){
	            a = parseInt(a[attribute]);
	            b = parseInt(b[attribute]);
	            return a - b;
	        });
	        return array;
	    }
	});
