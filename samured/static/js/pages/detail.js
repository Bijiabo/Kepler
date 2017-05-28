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
    
    var pageCache = {};
    
    var initPlayListScroll = function () {
        if ($('.video-play-list-view').length === 0) {return;}
        // 设定 iScroll
        pageCache.playListScroll = new IScroll('.video-play-list-view', {
            mouseWheel: true,
            bounce: true,
            scrollbars: 'custom',
            // fadeScrollbars: true,
            interactiveScrollbars: true,
        });
    };
    
    var generatePlayEndCardsViewHTML = function (dataItem) {
        return '\
        <div class="item">\
            <a href="#">\
            <div class="content" style="background-image: url(../static/image/video-thumbnails/0.jpg)">\
            <div class="en_title">Horizon Zero DownHorizon Zero DownHorizon</div>\
        <div class="zh_title">地平线 PS4 游戏 地平线 PS4 游戏</div>\
        <div class="time">2小时前</div>\
        </div>\
        </a>\
        </div>\
            ';
    };
    
    var addPlayEndRecommedVideoData = function () {
        // 呈现播放完成后的推荐视频
        // todo: 此处添加获取该视频对应的播放完成后的推荐视频数据的地址 @小袁
        // fake data
        var data = new Array(12);
        data = data.map(function (item) {
            return {
                enTitle: 'Horizon Zero DownHorizon Zero DownHorizon',
                zhTitle: '地平线 PS4 游戏 地平线 PS4 游戏',
                time: '2小时前'
            };
        });
        var html = '';
        for(var i=0,len=data.length; i<len; i++) {
            html += generatePlayEndCardsViewHTML(data[i]);
        }
        
        html = '<div class="play-end-view">' + html + '</div>';
        $('.video-player .plyr').append(html);
    };
    
    var targetActions = function () {
        _public.init();
        // video play
        // 获取清晰度选择
        var ratioListHTML = '';
        var ratioList = $('.video-player').attr('ratio-list').split(',').map(function (item) {
            return '<div class="ratio-list-item" ratio="' + item + '">' + item + 'P</div>';
        }).join('');
        
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
            "<div class='ratio-list'><div class='ratio-list-container'>",
            ratioList,
            "</div></div>",
            "</button>",
            
            // 剧场模式切换
            // "<button type='button' class='toggle-theatre-mode'>",
            // "<span class='iconfont'>&#xe613;</span>",
            // "<span class='plyr__sr-only'>toggle theatre mode</span>",
            // "</button>",
            
            // 字幕切换
            "<button type='button' data-plyr='captions' class='toggle-captions-btn'>",
            "<span class='icon--captions-on iconfont'>&#xe612;</span>",
            "<span class='iconfont'>&#xe612;</span>",
            "<span class='plyr__sr-only'>Toggle Captions</span>",
            "</button>",
            
            // 全屏幕切换
            "<button type='button' data-plyr='fullscreen' class='fullscreen'>",
            "<span class='icon--exit-fullscreen iconfont'>&#xe611;</span>",
            "<span class='iconfont'>&#xe614;</span>",
            "<span class='plyr__sr-only'>Toggle Fullscreen</span>",
            "</button>",
            
            "</div>",// .right-container
            "</div>"].join("");
        var playerOptions = {
            controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'fullscreen'],
            // debug: true,
            autoplay: false,
            html: controls,
            captions: {defaultActive: true},
            keyboardShortcuts: { focused: true, global: true },
            hideControls: true
        };
        window.players = plyr.setup(playerOptions);
        window.player = window.players[0];
        window.player.on('canplay', function (event) {
            if (pageCache.afterCanPlay) {
                pageCache.afterCanPlay();
            }
        });
        
        initPlayListScroll();
        
        // 初始化视频容器在布局中的占位符
        window.player.on('loadeddata', function (event) {
            var videoContainerHeight = $('.video-player-container').height();
            $('.video-place-holder').height(videoContainerHeight);
            pageCache.videoHasBeenLoadedData = true;
        });
        
        $(window).on('resize', function () {
            if (pageCache.videoHasBeenLoadedData !== true) {return;}
            var videoContainerHeight = $('.video-player-container').height();
            $('.video-place-holder').height(videoContainerHeight);
        });
        
        // 视频播放器播放完成后的事件
        window.player.on('ended', function (event) {
            $('.video-player .plyr .play-end-view').addClass('active');
        });
        
        // 视频播放器播放时隐藏推荐列表
        window.player.on('play', function (event) {
            $('.video-player .plyr .play-end-view').removeClass('active');
        });
        
        addPlayEndRecommedVideoData();
        
        // 初始化分享按钮
        $('.social-share').share();
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
        
        // 用户选择分辨率
        $(document).on('click', '.ratio-list-item', function () {
            var $this = $(this);
            var targetRatio = $this.attr('ratio');
            $('.plyr--video .plyr__controls button.toggle-ratio-mode .iconfont').text($this.text());
            console.log('targetRatio', targetRatio);
            // todo: 用户设定分辨率之后的操作
            // todo: 获取对应分辨率的视频链接，切换视频源
            var player = window.players[0];
            var targetCurrentTime = player.getCurrentTime();
            var playAfterChangedMedia = !player.isPaused();
            
            player.source({
                type:       'video',
                title:      'Video title',
                sources: [{
                    src:    '../static/video/demo.mp4',
                    type:   'video/mp4'
                }]
            });
            // 开始等待播放器准备好
            pageCache.afterCanPlay = function () {
                player.seek(targetCurrentTime);
                if (playAfterChangedMedia) {
                    player.play();
                }
                pageCache.afterCanPlay = undefined;
            };
        });
        
        /*
        $(document).on('mouseenter', '.toggle-mute', function () {
            $('.plyr--video .plyr__controls .plyr__volume').show();
        });
    
        $(document).on('mouseleave', '.toggle-mute', function () {
            $('.plyr--video .plyr__controls .plyr__volume').hide();
        });
        */
        
        // 用户点击分享按钮，切换分享组件呈现
        $(document).on('click', '.action-buttons .share', function () {
            $('.social-share').toggle();
        });
    };
    bindEvents();
});