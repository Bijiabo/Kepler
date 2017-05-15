/**
 * Created by huchunbo on 2017/4/13.
 */
define([], function () {
    
    var init = function () {
        element.content().html(generate.list());
        bindEvents();
    };
    
    var targetIndex = 0;
    
    var bindEvents = function () {
        
        // link to content page
        $(document).on('click', '.message-box .content .message-list-item', function () {
            // load message item content
            targetIndex = $(this).attr('index');
            element.content().html(generate.content());
            element.title().html(generate.title.content());
        });
        
        // back to list page
        $(document).on('click', '.message-box .title .back', function () {
            element.content().html(generate.list());
            element.title().html(generate.title.list());
        });
    };
    
    var element = {
        content: function () {
            return $('.message-box .content');
        },
        title: function () {
            return $('.message-box .title');
        }
    };
    
    var generate = {
        list: function () {
            var result = '';
            
            for (var i=0; i<6; i++) {
                var cellCode = '\
                <div class="message-item-cell message-list-item" index="'+i+'">\
                        <!--<div class="preview">\
                            <img src="./../static/image/video-thumbnails/'+i+'.jpg" alt="">\
                        </div>-->\
                        <div class="content">\
                            <div class="item-title">账号数据异常</div>\
                            <div class="time">2017年3月29日上午 10:00</div>\
                            <div class="content-preview">\
                                All Cutsences (Game Movie) All Cutsences (Game Movie) All Cutsences (Game Movie) All Cutsences (Game Movie) All Cutsences (Game Movie)\
                            </div>\
                        </div>\
                </div>';
                result += cellCode;
            }
            return result;
        },
        content: function () {
            var result = '';
    
            var cellCode = '\
                <div class="message-item-cell">\
                        <div class="content">\
                            <div class="item-title">账号数据异常</div>\
                            <div class="time">2017年3月29日上午 10:00</div>\
                            <div class="content-display">\
                                All Cutsences (Game Movie) All Cutsences (Game Movie) All Cutsences (Game Movie) All Cutsences (Game Movie) All Cutsences (Game Movie)\
                                All Cutsences (Game Movie) All Cutsences (Game Movie) All Cutsences (Game Movie) All Cutsences (Game Movie) All Cutsences (Game Movie)\
                                All Cutsences (Game Movie) All Cutsences (Game Movie) All Cutsences (Game Movie) All Cutsences (Game Movie) All Cutsences (Game Movie)\
                                All Cutsences (Game Movie) All Cutsences (Game Movie) All Cutsences (Game Movie) All Cutsences (Game Movie) All Cutsences (Game Movie)\
                                <p>just a test...</p>\
                            </div>\
                        </div>\
                </div>';
            result += cellCode;
            
            return result;
        },
        title: {
            list: function () {
                return '系统通知';
            },
            content: function () {
                return '<span class="fa fa-angle-left back"></span>';
            }
        }
    };
    
    return {
        init: init
    };
});