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
        // video play
        var controls = ["<div class='plyr__controls'>",
            "<button type='button' data-plyr='play'>",
            "<span class='iconfont'>&#xe61a;</span>",
            "<span class='plyr__sr-only'>Play</span>",
            "</button>",
            "<button type='button' data-plyr='pause'>",
            "<span class='iconfont'>&#xe61b;</span>",
            "<span class='plyr__sr-only'>Pause</span>",
            "</button>",
            
            "<div class='volume-group'>",
            "<button type='button' data-plyr='mute' class='toggle-mute'>",
            "<span class='iconfont icon--muted'>&#xe615;</span>",
            "<span class='iconfont'>&#xe617;</span>",
            "<span class='plyr__sr-only'>Toggle Muste</span>",
            "</button>",
            "<span class='plyr__volume'>",
            "<label for='volume{id}' class='plyr__sr-only'>Volume</label>",
            "<input id='volume{id}' class='plyr__volume--input' type='range' min='0' max='10' value='5' data-plyr='volume'>",
            "<progress class='plyr__volume--display' max='10' value='0' role='presentation'></progress>",
            "</span>",
            "</div>",
            
            "<span class='plyr__progress'>",
            "<label for='seek{id}' class='plyr__sr-only'>Seek</label>",
            "<input id='seek{id}' class='plyr__progress--seek' type='range' min='0' max='100' step='0.1' value='0' data-plyr='seek'>",
            "<progress class='plyr__progress--played' max='100' value='0' role='presentation'></progress>",
            "<progress class='plyr__progress--buffer' max='100' value='0'>",
            "<span>0</span>% buffered",
            "</progress>",
            "<span class='plyr__tooltip'>00:00</span>",
            "</span>",
            "<span class='plyr__time'>",
            "<span class='plyr__sr-only'>Current time</span>",
            "<span class='plyr__time--current'>00:00</span>",
            "</span>",
            "<span class='plyr__time'>",
            "<span class='plyr__sr-only'>Duration</span>",
            "<span class='plyr__time--duration'>00:00</span>",
            "</span>",
            
            "<div class='right-container'>",
    
            // 分辨率切换
            "<button type='button' class='toggle-ratio-mode'>",
            "<span class='iconfont'>1080P</span>",
            "<span class='plyr__sr-only'>toggle ratio mode</span>",
            "</button>",
            
            // 剧场模式切换
            "<button type='button' class='toggle-theatre-mode'>",
            "<span class='iconfont'>&#xe613;</span>",
            "<span class='plyr__sr-only'>toggle theatre mode</span>",
            "</button>",
            
            // 字幕切换
            "<button type='button' data-plyr='captions' class='toggle-captions-btn'>",
            "<span class='icon--captions-on iconfont'>&#xe612;</span>",
            "<span class='iconfont'>&#xe612;</span>",
            "<span class='plyr__sr-only'>Toggle Captions</span>",
            "</button>",
            
            // 全屏幕切换
            "<button type='button' data-plyr='fullscreen'>",
            "<span class='icon--exit-fullscreen iconfont'>&#xe611;</span>",
            "<span class='iconfont'>&#xe614;</span>",
            "<span class='plyr__sr-only'>Toggle Fullscreen</span>",
            "</button>",
            
            "</div>",// .right-container
            "</div>"].join("");
        var playerOptions = {
            controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'fullscreen'],
            debug: true,
            autoplay: false,
            html: controls,
            captions: {defaultActive: true},
            hideControls: false
        };
        plyr.setup(playerOptions);
    };
    
    window.didLoadActions.push(targetActions);
    
    var bindEvents = function () {
        $(document).on('click', '.toggle-theatre-mode', function () {
            var $this = $(this);
            if ($this.data('theatre-mode') != true) {
                $('.video-player').width($('.detail-main-container').width() + 430 - 20);
                $('.right-side-bar').css('top', ($('.video-player').height() + 58) + 'px');
                $this.data('theatre-mode', true);
            } else {
                $('.video-player').removeAttr('style');
                $('.right-side-bar').removeAttr('style');
                $this.data('theatre-mode', false);
            }
            
        });
        /*
        $(document).on('mouseenter', '.toggle-mute', function () {
            $('.plyr--video .plyr__controls .plyr__volume').show();
        });
    
        $(document).on('mouseleave', '.toggle-mute', function () {
            $('.plyr--video .plyr__controls .plyr__volume').hide();
        });
        */
    };
    bindEvents();
    
});