/**
 * Created by huchunbo on 2017/1/12.
 */
$(document).on('focus', '.navigation-bar .form-control', function(){
    $('.navigation-bar .input-group').addClass('focus');
});
$(document).on('blur', '.navigation-bar .form-control', function(){
    $('.navigation-bar .input-group').removeClass('focus');
});
// 评论区域交互
// 响应回复点击
$(document).on('click', '.reply-button', function () {
    var commentId = $(this).attr('comment-id');
    console.log(commentId);
    var parent = $($(this).parent());
    var replyInputContainerElementClass = '.comment-post-input-container';
    var replyInputCOntainerHTML = '\
        <div class="comment-post-input-container reply-append-input-container">\
            <textarea class="col-xs-12" name="comment" cols="30" rows="3" placeholder="点此输入评论内容..."></textarea>\
            <button class="do-reply btn btn-default col-xs-12" comment-id="'+commentId+'">发表</button>\
        </div>';

    if (parent.has(replyInputContainerElementClass).length === 0) {
        $('.reply-append-input-container').remove();
        parent.append(replyInputCOntainerHTML);
    } else {
        parent.find(replyInputContainerElementClass).remove();
    }
});
// 点赞
$(document).on('click', '.thumbs-up-button', function () {

});
// 踩评论
$(document).on('click', '.thumbs-down-button', function () {

});
// 显示登陆界面
$(document).on('click', '.show-log-in', function () {

});
// 显示注册界面
$(document).on('click', '.show-register', function () {

});
// 发表回复，模拟数据 xxx
$(document).on('click', '.do-reply', function () {
    var comment = {
        replyTo: $(this).attr('comment-id'),
        content: $(this).siblings('textarea').val()
    };
    console.log(comment);
    // 提交到后端...成功后返回被添加的评论数据，执行 insetCommentToView 方法
    $('.reply-append-input-container').remove(); // 去除输入框
    var parentId = $(this).attr('comment-id').replace(/-\w+/ig, '');
    insetCommentToView({
        replyTo: parentId,
        user: {
            name: '我的昵称' + Math.floor(Math.random()*1000),
            id: Math.floor(Math.random()*1000),
            avatar: 'static/image/avatars/' + Math.floor(Math.random()*5) + '.jpg'
        },
        content: comment.content,
        id: 'replyxxx-' + Math.floor(Math.random()*1000),
        count: {
            reply: 0,
            thumbsUp: 0,
            thumbsDown: 0
        }
    });
});
// 添加评论到内容区域
var insetCommentToView = function (commentData) {
    /*
    * commentData = {
    *   replyTo: 回复的父评论的 id
    *   user: {name: xxx, id: xxx, avatar: xxx},
    *   content: xxx,
    *   count: {
    *       reply: 0,
    *       thumbsUp: 0,
    *       thumbsDown: 0
    *   }
    * }
    * */
    var commentItemHTML = $('.comment-reply-template').html();
    var commentItem = $(commentItemHTML);
    // 更新数据
    commentItem.find('.avatar').attr('src', commentData.user.avatar);
    commentItem.find('.user-name').text(commentData.user.name);
    commentItem.find('.comment-post-time').text('发表于' + Math.floor(Math.random()*1000));
    commentItem.find('.comment-reply-content').text(commentData.content);
    commentItem.find('.reply-button').attr('comment-id', commentData.id);
    commentItem.find('.reply-count').text(commentData.count.reply);
    commentItem.find('.reply-count').text(commentData.count.reply);
    commentItem.find('.thumbs-up-count').text(commentData.count.thumbsUp);
    commentItem.find('.thumbs-down-count').text(commentData.count.thumbsDown);

    $("[comment-id='" + commentData.replyTo + "']")
        .parents('.list-group-item')
        .find('.comment-reply-list')
        .find('.list-group')
        .append(commentItem);
};
// watch 页面
// 切换分享按钮显示
$(document).on('click', '.toggle-share-buttons', function(){
    var shareButtonContainer = $('.video-info-interaction-panel .social-share');
    shareButtonContainer.removeClass('no-overflow-hidden');
    if (shareButtonContainer.hasClass('active')) {
        shareButtonContainer.removeClass('active');
    } else {
        shareButtonContainer.addClass('active');
        setInterval(function(){
            var shareButtonContainer = $('.video-info-interaction-panel .social-share');
            if (shareButtonContainer.hasClass('active')) {
                shareButtonContainer.addClass('no-overflow-hidden');
            }
        }, 200);
    }
});
$(document).on('click', '.video-description-pack-up', function () {
    var descriptionPanel = $('.video-description');
    var shortClass = 'short';
    if (descriptionPanel.hasClass(shortClass)) {
        descriptionPanel.removeClass(shortClass);
    } else {
        descriptionPanel.addClass(shortClass);
    }
});