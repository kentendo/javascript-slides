var app = angular.module('learningfuze.lesson', ['ngAnimate', 'ngRoute']);

// slideshow
angular.module('learningfuze.lesson').directive('slideshow', ['$window', '$document', '$route', '$routeParams', function($window, $document, $route, $routeParams){
  return {
    restrict: 'E',
    replace:true,
    transclude:true,
    template:'<div ng-transclude></div>',
    link: function(scope, element, attr){
      
      element.css({
        display:'table'
      });
      
      // this will disable scrollbars
      $document[0].body.style.overflow = 'hidden';
      
      // watch for arrow keys
      var w = angular.element($window);
      w.bind("keydown", function(event){
        switch(event.which)
        {
          case 37: // left
            scope.down();   
            break;
          case 38: // up
            scope.up();
            break;
          case 39: // right
            scope.up();
            break;
          case 40: // down
            scope.down();
            break;
        } 
      });
    },
    controller: function($scope) {
      
      $scope.index = 0;
      $scope.slides = [];
      $scope.$watch('index', function(newIndex, oldIndex){ 
                    
        $scope.slides[oldIndex].css({display:'none'});        
        $scope.slides[newIndex].css({display:'table-cell'});
        
      });

      $scope.up = function(){
        $scope.index = ($scope.index + 1 === $scope.slides.length) ? 0 : $scope.index + 1;
        $scope.$apply();
      };
      
      $scope.down = function(){   
        $scope.index = ($scope.index === 0) ? $scope.slides.length - 1 :  $scope.index - 1;
        $scope.$apply();
      };
      
      this.addSlide = function(slide){
        $scope.slides.push(slide);
      };
    }
  };
}]);

// slide
angular.module('learningfuze.lesson').directive('slide', ['$window', function($window){
  return {
    restrict:'E',
    require:'^slideshow',
    transclude:true,
    replace:true,
    template:'<div style="display:none; vertical-align:middle" class="slide" ng-transclude></div>',
    link:function(scope, element, attr, slideshow){
      
      // full size
      scope.resize = function(){
        element.css({
          width:$window.innerWidth,
          minWidth:$window.innerWidth,
          height:$window.innerHeight,
          minHeight:$window.innerHeight
        });
      };
      
      // add window.resize so they stay full size
      var w = angular.element($window);
      w.bind("resize", scope.resize);
      
      // make full size now
      scope.resize();
      
      // register with controller
      slideshow.addSlide(element);
    }
  };
}]);

angular.module('learningfuze.lesson').directive('counter', function(){
  return {
    restrict:'E',
    link: function(scope, element, attr){
      element.css({
        position:'absolute',
        bottom:'10px',
        right:'20px'
      });
    }
  };
});
