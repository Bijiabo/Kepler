/**
 * Created by huchunbo on 2017/4/6.
 */

define([], function () {
    var bindEvents = function () {
        // 性别选择
        $(document).on('click', '.gender-container label', function () {
            var $this = $(this);
            var class_check = 'fa-check-square-o',
                class_uncheck = 'fa-square-o';
            $('.gender-container label .fa').removeClass(class_check).addClass(class_uncheck);
            console.log($this.find('.fa'));
            $this.find('.fa').removeClass(class_uncheck).addClass(class_check);
        });
        
        // 点击选择修改背景图片
        $(document).on('click', '.cover .edit-button', function () {
            $('.select-cover-container').show();
        });
        // 关闭背景图片上传选择层
        $(document).on('click', '.select-cover-container .close', function () {
            $('.select-cover-container').hide();
        });
        
        // 点击修改头像
        $(document).on('click', '.user-container .avatar .edit-button', function () {
            $('.select-avatar-container').show();
        });
        // 关闭头像上传选择层
        $(document).on('click', '.user-container .select-avatar-container .close', function () {
            $('.select-avatar-container').hide();
        });
        
        // 点击确定修改资料
        $(document).on('click', '.update-user-profile-btn', function () {
            var userData = {
                name: $('#name').val(),
                cellPhoneNumber: $('#cell-phone-number').val(),
                year: $('#year').val(),
                month: $('#month').val(),
                day: $('#day').val(),
                gender: $('.gender-container .fa-check-square-o').attr('attr') || ''
            };
            
            console.log(userData);
            
            // todo: 提交数据等操作...
        });
        
        // 展示 user 页面
        $(document).on('click', '.bind-open-user-profile', function () {
            $('.user-container').show();
        });
        
        // 隐藏 user 页面
        $(document).on('click', '.user-container>.close', function () {
            $('.user-container').hide();
        });
    };
    
    var init = function () {
        bindEvents();
    };
    
    return {
        init: init
    };
});