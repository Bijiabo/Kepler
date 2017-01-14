/**
 * Created by huchunbo on 2017/1/12.
 */
$(document).on('focus', '.navigation-bar .form-control', function(){
    $('.navigation-bar .input-group').addClass('focus');
});
$(document).on('blur', '.navigation-bar .form-control', function(){
    $('.navigation-bar .input-group').removeClass('focus');
});