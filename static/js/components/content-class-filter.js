/**
 * Created by huchunbo on 2017/4/13.
 */
define([], function () {
    
    var init = function () {
        bindEvents();
    };
    
    var bindEvents = function () {
        $(document).on('click', '.content-class-filter .option-item', function () {
            var $this = $(this);
            var activeClass = 'active';
            if ($this.hasClass(activeClass)) {
                $this.removeClass(activeClass);
            } else {
                $this.addClass(activeClass);
            }
        });
    
        $(document).on('click', '.content-class-filter .button-group .btn', function () {
            var $this = $(this);
            var targetAction = $this.attr('action');
            switch (targetAction) {
                case 'do-filter':
                    // 点击筛选按钮进行筛选
                    actions.doFilter();
                    break;
                case 'clean-filter':
                    actions.cleanFilter();
                    break;
                default:
                    break;
            }
        });
    
        $(document).on('click', '.content-class-filter .filter-display-button', function () {
            var $this = $(this);
            var mark = 'display';
            if ($this.data(mark) != false) {
                $this.html('过滤条件 <span class="fa fa-angle-down"></span>');
                $('.content-class-filter .content').hide();
                $this.data(mark, false);
            } else {
                $this.html('过滤条件 <span class="fa fa-angle-up"></span>');
                $('.content-class-filter .content').show();
                $this.data(mark, true);
            }
        });
    };
    
    var actions = {
        doFilter: function () {
            // 进行筛选
            var actionOptions = $('.content-class-filter .option-item.active');
            var filterTags = [];
            $.each(actionOptions, function (index, item) {
                filterTags.push($(item).text());
            });
            console.debug(filterTags);
            // 提交筛选请求
        },
        cleanFilter: function () {
            var actionOptions = $('.content-class-filter .option-item.active');
            actionOptions.removeClass('active');
            // 清除筛选，跳转链接或刷新数据
        }
    };
    
    return {
        init: init
    }
});