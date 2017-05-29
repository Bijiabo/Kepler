/**
 * Created by huchunbo on 2017/4/13.
 */
define([], function () {
    
    var init = function () {
        generate.list(function (result) {
            element.content().html(result);
        });
        bindEvents();
    };
    
    var targetIndex = 0;
    
    var bindEvents = function () {
        
        // link to content page
        $(document).on('click', '.message-box .content .message-list-item', function () {
            // load message item content
            targetIndex = $(this).attr('index');
            generate.content(targetIndex, function (result) {
                element.content().html(result);
            });
            
            element.title().html(generate.title.content());
        });
        
        // back to list page
        $(document).on('click', '.message-box .title .back', function () {
            generate.list(function (result) {
                element.content().html(result);
            });
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
        list: function (callback) {
            var result = '';
            
            // todo: 此处异步获取数据
            
            for (var i=0; i<6; i++) {
                var cellCode = '\
                <div class="message-item-cell message-list-item '+ (i===0 ? 'unread':'') +'" index="'+i+'">\
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
            callback(result);
        },
        content: function (targetId, callback) {
            var result = '';
            
            // todo: 异步获取数据
            var data = {
                title: '账号数据异常',
                time: '2017年3月29日上午 10:00',
                content: 'All Cutsences (Game Movie) All Cutsences (Game Movie) All Cutsences (Game Movie) All Cutsences (Game Movie) All Cutsences (Game Movie)\
                          All Cutsences (Game Movie) All Cutsences (Game Movie) All Cutsences (Game Movie) All Cutsences (Game Movie) All Cutsences (Game Movie)\
                          All Cutsences (Game Movie) All Cutsences (Game Movie) All Cutsences (Game Movie) All Cutsences (Game Movie) All Cutsences (Game Movie)\
                          All Cutsences (Game Movie) All Cutsences (Game Movie) All Cutsences (Game Movie) All Cutsences (Game Movie) All Cutsences (Game Movie)\
                          <p>just a test...</p>'
            };
            
            var cellCode = '\
                <div class="message-item-cell">\
                        <div class="content">\
                            <div class="item-title text-color-blue">'+data.title+'</div>\
                            <div class="time">'+data.time+'</div>\
                            <div class="content-display">'+data.content+'</div>\
                        </div>\
                </div>';
            result += cellCode;
            
            callback(result);
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