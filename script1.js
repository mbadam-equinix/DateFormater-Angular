$(function(){
        $(".date").keyup(function(e){
                var currentValue = $(e.target).val();
                var newValue = autocompleteMMDDYYYYDateFormat( currentValue );
                if( newValue != currentValue ){
                        $(e.target).val( newValue );
                }
        });
        $(".date").click(function(e){
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
        });
});
/**
* This function helps to autocomplete the date format MMDDYYY
* Converts M to 0M and MMD to MM0D. Ex. `1/` to `01/`, `01/1/` to `01/01/`
* Adds slash for MM and MMDD Ex. `01` to `01/`, `01/02` to `01/02/`
* Converts YY to YYYY. Ex. `01/01/01` to `01/01/2001`
*
* @param {String} str
* @return {String}
*/
var autocompleteMMDDYYYYDateFormat = function (str) {
        str = str.trim();
        var matches, year,
                looksLike_MM_slash_DD = /^(\d\d\/)?\d\d$/,
                looksLike_MM_slash_D_slash = /^(\d\d\/)?(\d\/)$/,
                looksLike_MM_slash_DD_slash_DD = /^(\d\d\/\d\d\/)(\d\d)$/;

        if( looksLike_MM_slash_DD.test(str) ){
                str += "/";
        }else if( looksLike_MM_slash_D_slash.test(str) ){
                str = str.replace( looksLike_MM_slash_D_slash, "$10$2");
        }else if( looksLike_MM_slash_DD_slash_DD.test(str) ){
                matches = str.match( looksLike_MM_slash_DD_slash_DD );
                year = "19";
                str = String( matches[1] ) + year + String(matches[2]);
        }
        return str;
};
// test("test autocompleteMMDDYYYYDateFormat() with bad input", function () {
//         var fn = autocompleteMMDDYYYYDateFormat;
//         equal(fn("bad"), "bad");
//         equal(fn("123"), "123");
//         equal(fn("123/1"), "123/1");
//         equal(fn("1*"), "1*");
// });
// test("test autocompleteMMDDYYYYDateFormat() with good input", function () {
//         var fn = autocompleteMMDDYYYYDateFormat;

//         equal(fn("1/"), "01/");
//         equal(fn("9/"), "09/");
//         equal(fn("11/1/"), "11/01/");
//         equal(fn("11/9/"), "11/09/");
// });
// test("test autocompleteMMDDYYYYDateFormat() with input === output", function () {
//         var fn = autocompleteMMDDYYYYDateFormat;

//         equal(fn("01/"), "01/");
//         equal(fn("09/"), "09/");
//         equal(fn("11/01/"), "11/01/");
//         equal(fn("11/09/"), "11/09/");
//         equal(fn("11/01/2066"), "11/01/2066");
//         equal(fn("11/01/1966"), "11/01/1966");
// });
// test("test autocompleteMMDDYYYYDateFormat() with adding /", function () {
//         var fn = autocompleteMMDDYYYYDateFormat;

//         equal(fn("01"), "01/");
//         equal(fn("09"), "09/");
//         equal(fn("11/01"), "11/01/");
//         equal(fn("11/09"), "11/09/");
// });
// test("test autocompleteMMDDYYYYDateFormat() with adding two digit year", function () {
//         var fn = autocompleteMMDDYYYYDateFormat;

//         equal(fn("01/01/01"), "01/01/2001");
//         equal(fn("09/09/19"), "09/09/2019");
//         equal(fn("01/01/12"), "01/01/2012");

//         equal(fn("11/01/92"), "11/01/1992");
//         equal(fn("11/01/1936"), "11/01/1936");
// });
