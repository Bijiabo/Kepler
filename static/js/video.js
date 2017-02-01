/**
 * Created by huchunbo on 2017/2/1.
 */
// video
String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds;
};
var videoData = {
    currentTime: '00:00:00',
    duration: '00:00:00',
    dragging: false,
    inVideoArea: false,
    inControlArea: false,
    controlDisplaying: true
};
$(document).on('click', '.video-full-screen', function() {
    var videoContainer = $('.video-container');
    if (videoContainer.length > 0) {
        if (videoContainer.data('fullscreenstatus')) {
            // 退出全屏
            videoContainer.data('fullscreenstatus', false);
            if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            } else if (document.msCancelFullScreen) {
                document.msCancelFullScreen();
            }
        } else {
            // 进入全屏
            videoContainer.data('fullscreenstatus', true);
            if (videoContainer[0].mozRequestFullScreen) {
                videoContainer[0].mozRequestFullScreen();
            } else if (videoContainer[0].webkitRequestFullScreen) {
                videoContainer[0].webkitRequestFullScreen();
            } else if (videoContainer[0].msRequestFullScreen) {
                videoContainer[0].msRequestFullScreen();
            }
        }
    }
    updateVideoControls();
});
var togglePlayPause = function () {
    var video = $('.video-canvas').get(0);
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
    updateVideoControls();
};

$(document).on('click', '.video-play-button', function(){
    togglePlayPause();
});

$(document).on('dblclick', '.video-canvas', function(){
   togglePlayPause();
});
var updateVideoControls = function() {
    if ($('.video-canvas').length === 0) {return;}
    var videoContainer = $('.video-container');
    var video = $('.video-canvas').get(0);
    var playing = !video.paused;
    // update play button
    $('.video-play-button').removeClass(playing ? 'paused' : 'playing').addClass(!playing ? 'paused' : 'playing');
    // update full screen button
    var fullScreen = videoContainer.data('fullscreenstatus');
    if (fullScreen) {
        $('.video-full-screen').addClass('active');
    } else {
        $('.video-full-screen').removeClass('active');
    }
    // update volume UI
    updateVolumeUI(video.volume);
};

var updateVideoTIme = function() {
    // update time
    // console.log(videoData.currentTime);
    $('.video-current-time').text(videoData.currentTime);
    $('.video-duration').text(videoData.duration);
    var timeLinePlayedWidth = videoData._currentTime/videoData._duration*100 + '%';
    $('.video-time-line-played').css('width', timeLinePlayedWidth);
};

// 时间轴交互逻辑
$(document).on('mousemove', '.video-time-line', function(event){
    var mousePosition = {
        x: event.pageX,
        y: event.pageY
    };
    var timeLine = $('.video-time-line');
    var timeLineOffset = timeLine.offset();
    var timeLinePosition = {
        x: timeLineOffset.left,
        y: timeLineOffset.top
    };
    var timeLinePointerWidth = mousePosition.x - timeLinePosition.x;
    $('.video-time-line-pointer').width(timeLinePointerWidth);
});
$(document).on('mouseout', '.video-time-line', function(event){
    if (!videoData.dragging) {
        $('.video-time-line-pointer').width(0);
    }
});
$(document).on('click', '.video-time-line', function(event){
    var video = $('.video-canvas').get(0);
    var timeLine = $('.video-time-line');
    var targetTime = $('.video-time-line-pointer').width() / timeLine.width() * video.duration;
    $('.video-time-line-played').removeClass('video-time-line-played-animation');
    video.currentTime = targetTime;
    setTimeout(function () {
        $('.video-time-line-played').addClass('video-time-line-played-animation');
    }, 100);
});
// 音量调节
var updateVolume = function(volume) {
    $('.video-canvas').get(0).volume = volume;
};
var updateVolumeUI = function(volume) {
    $('.volume-control-handle').css('left', $('.volume-control').width()*volume + 'px');
    if (volume === 0) {
        $('.volume-icon').removeClass('fa-volume-up').addClass('fa-volume-off');
    } else {
        $('.volume-icon').removeClass('fa-volume-off').addClass('fa-volume-up');
    }
};
$(document).on('mousedown','.volume-control', function(event){
    videoData.volumeControling = true;
    videoData.originalVolumeControlWidth = $('.volume-control').width();
});
$(document).on('mousemove','.volume-control', function(event){
    if (!videoData.volumeControling) {return;}
    var mousePosition = {
        x: event.pageX,
        y: event.pageY
    };
    var volumeControlOffset = $('.volume-control').offset();
    var volumeControlPosition = {
        x: volumeControlOffset.left,
        y: volumeControlOffset.top
    };
    var handleElementLeft = mousePosition.x - volumeControlPosition.x;
    if (handleElementLeft > videoData.originalVolumeControlWidth || handleElementLeft < 0) {
        return;
    }
    $('.volume-control-handle').css('left', handleElementLeft + 'px');
    updateVolume(handleElementLeft / videoData.originalVolumeControlWidth);
});
$(document).on('mouseup','.volume-control', function(event){
    videoData.volumeControling = false;
    var mousePosition = {
        x: event.pageX,
        y: event.pageY
    };
    var volumeControlOffset = $('.volume-control').offset();
    var volumeControlPosition = {
        x: volumeControlOffset.left,
        y: volumeControlOffset.top
    };
    var handleElementLeft = mousePosition.x - volumeControlPosition.x;
    if (handleElementLeft > videoData.originalVolumeControlWidth || handleElementLeft < 0) {
        return;
    }
    $('.volume-control-handle').css('left', handleElementLeft + 'px');
    updateVolume(handleElementLeft / videoData.originalVolumeControlWidth);
    if (handleElementLeft <= 0) {
        $('.volume-icon').removeClass('fa-volume-up').addClass('fa-volume-off');
    } else {
        $('.volume-icon').removeClass('fa-volume-off').addClass('fa-volume-up');
    }
});
$(document).on('mouseout','.volume-control', function(event){
    if (!videoData.volumeControling) {return;}
    var mousePosition = {
        x: event.pageX,
        y: event.pageY
    };
    var volumeControlOffset = $('.volume-control').offset();
    var volumeControlPosition = {
        x: volumeControlOffset.left,
        y: volumeControlOffset.top
    };
    var handleElementLeft = mousePosition.x - volumeControlPosition.x;
    if (handleElementLeft <= 0) {
        $('.volume-icon').removeClass('fa-volume-up').addClass('fa-volume-off');
    } else {
        $('.volume-icon').removeClass('fa-volume-off').addClass('fa-volume-up');
    }
    videoData.volumeControling = false;
});
$(document).on('click', '.volume-icon', function(event){
    var video = $('.video-canvas').get(0);
    if (video.volume > 0) {
        videoData.originalVolume = video.volume;
        video.volume = 0;
    } else {
        video.volume = videoData.originalVolume || 1;
    }
    updateVolumeUI(video.volume);
});
// show or hide controls
var controlViewAction = {
    show: function () {
        var controlElement = $('.video-controls');
        controlElement.css('transform','translate(0,0)');
        videoData.controlDisplaying = true;
    },
    hide: function () {
        var controlElement = $('.video-controls');
        controlElement.css('transform','translate(0,100px)');
        videoData.controlDisplaying = false;
    }
};
$(document).on('mouseenter', '.video-container', function(){
    videoData.inVideoArea = true;
    controlViewAction.show();
});
$(document).on('mousemove', '.video-container', function(){
    if (videoData.controlDisplaying) {
        if (videoData.delayHideControl) {
            clearTimeout(videoData.delayHideControl);
        }
        // console.log('videoData.inControlArea: ' + videoData.inControlArea);
        if (!videoData.inControlArea) {
            videoData.delayHideControl = setTimeout(function () {
                controlViewAction.hide();
            }, 5000);
        }
    } else {
        controlViewAction.show();
    }
});
$(document).on('mouseleave', '.video-container', function(){
    videoData.inVideoArea = false;
    controlViewAction.hide();
});
$(document).on('mouseenter', '.video-controls', function(){
    videoData.inControlArea = true;
    controlViewAction.show();
});
$(document).on('mouseleave', '.video-controls', function(){
    videoData.inControlArea = false;
    // controlViewAction.hide();
});

var init = function() {
    var video = $('.video-canvas');
    updateVideoControls();
    video.on('timeupdate', function (event) {
        videoData._currentTime = this.currentTime;
        videoData.currentTime = this.currentTime.toString().toHHMMSS();
        videoData._duration = this.duration
        videoData.duration = this.duration.toString().toHHMMSS();
        updateVideoTIme();
    });
};

$(function () {
    setTimeout(init, 500);
});