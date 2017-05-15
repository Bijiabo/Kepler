/**
 * Created by huchunbo on 2017/4/6.
 */
window.didLoadActions = [];

// 渲染元素
var render = function() {
    var app = new Vue({
        el: '#app',
        data: {
        },
        methods: {
        },
        mounted: function () {
        }
    });
};
window.didLoadActions.push(render);

requirejs(['public'], function(_public) {
    var targetActions = function () {
        _public.init();
    };
    
    window.didLoadActions.push(targetActions);
    
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
        $(document).on('click', '.avatar .edit-button', function () {
            $('.select-avatar-container').show();
        });
        // 关闭头像上传选择层
        $(document).on('click', '.select-avatar-container .close', function () {
            $('.select-avatar-container').hide();
        });
    };
    bindEvents();
    
});