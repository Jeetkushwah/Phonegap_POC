/*
 * @Directives   checkImage , listScroller
 * @Package      Angular
 * @Author       Rahul Rajawat
 * @Version      1.0.0
 * @Description  directive to perform some action on html elements as per our reuirement. 
 */
testApp.directive('checkImage',[ function(){
		/*		
			directive      : checkImage			
			Description    : directive added to thumbnail image to check image source found image or not. if image source unable to load , thumbnail section will remove from that row. 
		*/	
		return { 

		    link: function(scope, element, attrs) { 
		    	
		    	var ele = $(element)[0];
		    	// called if image loads properly.
		    	ele.onload = function(){
		    		$(ele).parent().parent().removeClass("ng-hide");
		    		$(ele).removeClass("ng-hide"); 
		    		var class1 = $(ele).attr("alt");
		    		$("#"+class1).addClass("ng-hide");
		    	}
		    	// called if image unable to load.
		    	ele.onerror = function(){
		    		$(ele).parent().parent().removeClass("ng-hide");  
		    		var class1 = $(ele).attr("alt");
		    		$("."+class1).addClass("without-image");
		    		$("#"+class1).addClass("ng-hide");
		    		$(ele).parent().remove();
		    	}
		    }

		}

	}])
	.directive('listScroller', function($rootScope,$window) {
		/*		
			directive      : listScroller			
			Description    : directive added to body. it checks that scroll reach to bottom , trigger scope (scrollUpdateViewLimit) method to update limit.  
		*/	
	    return {     
	        link : function(scope, element, attrs) {
	            var e = jQuery(element[0]);
	            var doc = jQuery(document);
	            document.addEventListener('scroll',function(event){
	              if($(window).scrollTop() + $(window).height() + 150 > $(document).height()) {
	                   scope.$apply(attrs.listScroller);
	              }
	            },true);
	  
	        }
	    };
	})