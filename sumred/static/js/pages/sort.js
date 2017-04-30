/**
 * Created by huchunbo on 2017/4/6.
 */
window.didLoadActions = [];

// 渲染元素
var render = function() {
    var app = new Vue({
        el: '#app',
        data: {
            videoCards: Array.apply(null, Array(50))
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
        // 绑定有侧边栏点击展开、收缩按钮动作
        var rightSideBarDropDownButtonSelector = '.sort-container .right .item.dropdown';
        $(document).on('click', rightSideBarDropDownButtonSelector, function () {
            var $this = $(this);
            var targetToggleDisplayItems = $this.siblings('.hide-item');
            if ($this.data('dropdown') == true) { // 已经展开
                targetToggleDisplayItems.hide();
                $this.find('span.fa').removeClass('fa-angle-up').addClass('fa-angle-down');
                $this.data('dropdown', false);
            } else { // 未展开
                targetToggleDisplayItems.show();
                $this.find('span.fa').removeClass('fa-angle-down').addClass('fa-angle-up');
                $this.data('dropdown', true);
            }
        });
    };
    bindEvents();
});