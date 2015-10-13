// Code goes here
angular.module("myApp",[])
.controller('firstController',function($scope){
   $scope.converttodate = function() {
            var key = event.keyCode || event.charCode;
            if(key == 8) return;

                        var $this = $(event.target);
            if ((($this.val().length+1) % 3)==0 && ($this.val().length<8)){
                $this.val($this.val() + "-");
                }
            }
                  
           
})
.directive('trail',function(){
  return {
        restrict: "A",
        require: '?ngModel',
         compile: function(tElement, tAttrs) {
             return function(scope, element, attrs, model) {
                function actualimpl (e) {
                 console.log(e);
                 var start=this.selectionStart;
                 var end=this.selectionEnd;
                 console.log(start+ " "+end);
                 var CCno=$(this).val();
                 var d= element.val() || "";
                 var key = e.keyCode || e.charCode;
                 
                 if(key == 8 && end < 2){
                    d = "0"+ CCno.slice(0,end) + CCno.slice(end,CCno.length-1);
                    end = 2;
                 }

                 if(key == 8 && end > 2  && end < 5){
                    d = CCno.slice(0,3)+ "0" + CCno.slice(end,CCno.length-1);
                    end = 5;
                 }

                 if(start==2 && end==2 && (CCno[end-1]!="/"))
                 {
                   start++;
                   end++;
                   d = CCno.replace(/[^\dA-Z]/g, '').replace(/(^\s+|\s+$)/,'');
                   if(CCno.length < 3)
                    d = CCno + "/";
                   else 
                    d= CCno.slice(0,end-1)+"/"+ CCno.slice(end,CCno.length-1);
                 }
                 if(start==5 && end==5 && (CCno[end-1]!="/"))
                 {
                   start++;
                   end++;
                   //d = CCno.replace(/[^\dA-Z]/g, '').replace(/(\d{2})/g, '$1/').replace(/(^\s+|\s+$)/,'');
                   d = CCno.replace(/[^\dA-Z]/g, '').replace(/(^\s+|\s+$)/,'');
                   d = CCno+"/";
                 }
                 // adding/deleting space after evry 4 characters
                 //var d = element.val().replace(/[^\dA-Z]/g, '').replace(/(\d{2})/g, '$1/').replace(/(^\s+|\s+$)/,'');
                 element.val(d);
                 model.$setViewValue(d);
                 this.setSelectionRange(start,end);
                 console.log("Spacing value: " + model.$viewValue + " length: " + model.$viewValue.length);
                 // ends
             }
             // var dactualimpl = debounce(actualimpl, 5000);
             function clickmap(e){
                var start=this.selectionStart;
                var end=this.selectionEnd;
                if(start == 3 || end == 3){
                    start --;
                    end --;
                }
                if(start == 6 || end == 6){
                    start --;
                    end --;
                }
                this.setSelectionRange(start,end);
             }
              $(element).bind("keyup",actualimpl);
              $(element).bind("click",clickmap)
            };
        }
    }
})