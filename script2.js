// Code goes here
angular.module("myApp",[])
.controller('firstController',function($scope){
           
})
.directive('trail',function(){
  return {
        restrict: "A",
        require: '?ngModel',
         compile: function(tElement, tAttrs) {
             return function(scope, element, attrs, model) {
                var autocompleteMMDDYYYYDateFormat = function (str) {
                    str = str.trim();
                    var matches, year,
                        looksLike_MM_slash_DD = /^(\d\d\/)?\d\d$/,
                        looksLike_MM_slash_DD_slash = /^(\d\d\/)?(\d\d\/)$/,
                        looksLike_MM_slash_D_slash = /^(\d\d\/)?(\d\/)$/,
                        looksLike_MM_slash_D_slash_YYYY = /^(\d\d\/)?(\d\/)?(\d\d\d\d)$/,
                        //looksLike_M_slash_DD_slash_YYYY = /^(\d\d\/\d\d\/)(\d\d)$/;
                        looksLike_M_slash_DD_slash = /^(\d\/)?(\d\d\/)$/,
                        looksLike_M_slash_DD_slash_YYYY = /^(\d\/)?(\d\d\/)?(\d\d\d\d)$/,
                        looksLike_MM_slash_DD_slash_YYYY = /^(\d\d\/)?(\d\d\/)?(\d\d\d\d)$/,
                        looksLike_MM_slash_DD_slash_YYYYN = /^(\d\d\/)?(\d\d\/)?[0-9]{5,9}$/,
                        looksLike_MM_slash_DDD_slash = /^(\d\d\/)?(\d)?(\d\d\/)$/,
                        looksLike_MM_slash_DDD_slash_YYYY = /^(\d\d\/)?(\d)?(\d\d\/)?(\d\d\d\d)$/,
                        looksLike_MMM_slash_DD_slash_YYYY = /^(\d)?(\d\d\/)?(\d\d\/)?(\d\d\d\d)$/,
                        looksLike_MMM_slash_DD_slash = /^(\d)?(\d\d\/)?(\d\d\/)$/, 
                        looksLike_MM_DD_slash_YYYY = /^(\d)?(\d)?(\d\d\/)?(\d\d\d\d)$/,
                        looksLike_MM_slash_DD_YYYY = /^(\d\d\/)?(\d)?(\d)?(\d\d\d\d)$/;


                        if( looksLike_MM_slash_DD.test(str) ){
                                if(str.length == 2){
                                    mm = parseInt(str);
                                    if(mm > 12)
                                        str = "";
                                    else
                                        str += "/";
                                }
                                else if(str.length == 5){
                                    matches = str.match( looksLike_MM_slash_DD );
                                    mm = parseInt(matches[1].replace("/",""));
                                    dd = parseInt(str.replace(matches[1],""));
                                    if(dd > 31){
                                        str = mm + "/";
                                    }
                                    else if((mm == 4 || mm == 6 || mm == 9 || mm == 11) && dd > 30 ){
                                        str = mm + "/";
                                    }
                                    else if(mm == 2 && dd > 29 ){
                                        str = mm + "/";
                                    }
                                    else{
                                        str += "/";
                                    }
                                }
                                else{
                                    str += "/";
                                }
                        }
                        if( looksLike_MM_slash_DD_slash.test(str) ){
                                str = str;
                        }
                        else if( looksLike_MM_slash_D_slash.test(str) ){
                                str = str.replace( looksLike_MM_slash_D_slash, "$10$2");
                        }
                        else if( looksLike_MM_slash_D_slash_YYYY.test(str) ){
                                str = str.replace( looksLike_MM_slash_D_slash_YYYY, "$10$2$3");
                        }
                        else if( looksLike_M_slash_DD_slash.test(str)){
                                str = str.replace( looksLike_M_slash_DD_slash, "0$1$2");
                        }
                        else if( looksLike_M_slash_DD_slash_YYYY.test(str)){
                                str = str.replace( looksLike_M_slash_DD_slash_YYYY, "0$1$2$3");
                        }
                        else if(looksLike_MM_slash_DD_slash_YYYY.test(str)){
                                matches = str.match( looksLike_MM_slash_DD_slash_YYYY );
                                yyyy = parseInt(matches[3]);
                                if(yyyy > 1994){
                                    str = String(matches[1]) +String(matches[2]);
                                }
                                else {
                                    str = str.replace( looksLike_M_slash_DD_slash_YYYY, "$1$2$3");   
                                }
                        }
                        else if( looksLike_MM_slash_DD_slash_YYYYN.test(str)){
                                matches = str.match( looksLike_MM_slash_DD_slash_YYYYN );
                                str = str.replace(looksLike_MM_slash_DD_slash_YYYYN, "$1$2");
                        }
                        else if( looksLike_MM_slash_DDD_slash.test(str)){
                                matches = str.match( looksLike_MM_slash_DDD_slash );
                                day = intelligentNumberPicker(matches[1],matches[2]+matches[3]);
                                str = String(matches[1])+day+"/";
                        }
                        else if( looksLike_MM_slash_DDD_slash_YYYY.test(str)){
                                matches = str.match( looksLike_MM_slash_DDD_slash_YYYY );
                                day = intelligentNumberPicker(matches[1],matches[2]+matches[3]);
                                //str = str.replace(looksLike_MM_slash_DDD_slash_YYYY, "$1$2$3");
                                str = String(matches[1])+day+"/"+String(matches[4]);
                        }
                        else if( looksLike_MMM_slash_DD_slash.test(str)){
                                matches = str.match( looksLike_MMM_slash_DD_slash );
                                month = intelligentNumberPicker(matches[1]+matches[2],matches[3]);
                                //str = str.replace(looksLike_MMM_slash_DD_slash_YYYY, "$2$3$4");
                                str = month + "/" + String(matches[3]);
                        }
                        else if( looksLike_MMM_slash_DD_slash_YYYY.test(str)){
                                matches = str.match( looksLike_MMM_slash_DD_slash_YYYY );
                                month = intelligentNumberPicker(matches[1]+matches[2],matches[3]);
                                //str = str.replace(looksLike_MMM_slash_DD_slash_YYYY, "$2$3$4");
                                str = month + "/" + String(matches[3])+String(matches[4]);
                        }
                        else if( looksLike_MM_DD_slash_YYYY.test(str)){
                                matches = str.match( looksLike_MM_DD_slash_YYYY );
                                str = str.replace(looksLike_MM_DD_slash_YYYY, "0$1/$3$4");
                        }
                        else if( looksLike_MM_slash_DD_YYYY.test(str)){
                                matches = str.match( looksLike_MM_slash_DD_YYYY );
                                str = str.replace(looksLike_MM_slash_DD_YYYY, "$10$2/$4");
                        }
                        // else if( looksLike_MM_slash_DD_slash_DD.test(str) ){
                        //         matches = str.match( looksLike_MM_slash_DD_slash_DD );
                        //         year = "19";
                        //         str = String( matches[1] ) + year + String(matches[2]);
                        // }
                    return str;
                };
                function actualimpl (e) {
                    var key = e.keyCode || e.charCode;
                    var start=this.selectionStart;
                    var end=this.selectionEnd;
                    var newValue;
                    if(key == 8){
                      newValue = backbutton(e,start,end);
                        if( newValue != currentValue ){
                                $(e.target).val( newValue );
                        }
                    }
                    var currentValue = $(e.target).val();
                    newValue = autocompleteMMDDYYYYDateFormat( currentValue );
                    if( newValue != currentValue ){
                            $(e.target).val( newValue );
                    }
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
             function intelligentNumberPicker(month1,day1){
                month1 = month1.replace("/","");
                day1 = day1.replace("/","");
                month = parseInt(month1);
                day = parseInt(day1);

                if(month1.length > 2){
                    if(month > 99){
                        first_two_digits = Math.round(month/10);
                        last_two_digits = month%100;

                        if(first_two_digits < 13){
                            if(first_two_digits > 9)
                                return first_two_digits;
                            else
                                return "0"+first_two_digits;
                        }
                        else if(last_two_digits < 13){
                            if(last_two_digits > 9)
                                return last_two_digits;
                            else
                                return "0"+last_two_digits;
                        }
                        else
                            return "";
                    }
                    else{
                        return "0"+ Math.round(month/10);
                    }
                }
                if(day1.length > 2){
                    if(day > 99){
                        first_two_digits = Math.round(day/10);
                        last_two_digits = day%100;

                        if(first_two_digits < 32){
                            return first_two_digits;
                        }
                        if(first_two_digits > 31){
                            if(last_two_digits > 31){
                                return "";
                            }
                            else{
                                if(last_two_digits > 10)
                                        return last_two_digits;
                                    else
                                        return "0"+last_two_digits;
                            }
                        }
                        else if((mm == 4 || mm == 6 || mm == 9 || mm == 11) && first_two_digits > 30 ){
                            if((mm == 4 || mm == 6 || mm == 9 || mm == 11) && last_two_digits > 30 ){
                                return "";
                            }
                            else{
                                    if(last_two_digits > 10)
                                        return last_two_digits;
                                    else
                                        return "0"+last_two_digits;
                            }
                        }
                        else if(mm == 2 && first_two_digits > 29 ){
                            if(mm == 2 && last_two_digits > 29){
                                return "";
                            }
                            else{
                                if(last_two_digits > 10)
                                        return last_two_digits;
                                    else
                                        return "0"+last_two_digits;
                            }
                        }
                        else{
                            return first_two_digits;
                        }
                    }
                    else{
                        return "0"+ Math.round(day/10);
                    }
                }
             }
             //^(\d)?(\d\d\/)?(\d\d\/)?(\d\d\d\d)$//
             function backbutton(e,start,end){
                var currentValue = $(e.target).val();
                
                if(end == 2 && currentValue.length < 3){
                    return currentValue.substring(0,1);
                 }
                if(end == 5 && currentValue.length < 6){
                    return currentValue.substring(0,4);
                 }
             }
              $(element).bind("keyup",actualimpl);
              $(element).bind("click",clickmap)
            };
        }
    }
})