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
    };
    bindEvents();
    
});