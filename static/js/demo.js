/**
 * Created by huchunbo on 2017/1/12.
 */
function fillArray(value, len) {
    var arr = [];
    for (var i = 0; i < len; i++) {
        arr.push(value);
    }
    return arr;
}


// fake side bar demo data
var sideBarItems = fillArray({
    icon: undefined,
    text: function () {
        return words({ min: 1, max: 3, join: ' ' }).toUpperCase();
    }
}, 10);
sideBarItems[0] = {icon: 'fa-home', text: '首页', active: true};
sideBarItems[1] = {icon: 'fa-hashtag', text: '类别',
    list: [
        {icon: undefined, text: '动作'},
        {icon: undefined, text: '冒险'},
        {icon: undefined, text: '模拟'},
        {icon: undefined, text: '角色扮演'},
        {icon: undefined, text: '休闲'},
        {icon: undefined, text: '其他'}
    ]};
sideBarItems[2] = {icon: 'fa-heart', text: '收藏'};
sideBarItems[3] = {icon: 'fa-history', text: '历史记录'};
sideBarItems[4] = {icon: 'fa-eye', text: '浏览频道'};
sideBarItems[5] = {icon: 'fa-rss', text: '订阅内容'};

// fake main content data
var mainContentItems = [];
var mainContentItemsTitles = ['推荐视频', '动作', '冒险', '模拟', '角色扮演'];
for (var i=0, len=mainContentItemsTitles.length; i< len; i++) {
    var item = {
        title: '视频名称',
        description: '视频简介xxxx...',
        time: function() {
            var second = Math.floor(Math.random()*60);
            return '0' + Math.floor(Math.random()*9) + ':' + (second > 9 ? second : '0'+second);
        }
    };
    mainContentItems.push({
        title: mainContentItemsTitles[i],
        list: fillArray(item, i===0 ? 12 : 6)
    });
}

// fake collection data
var collections = [];
var collectionsItemsTitles = ['动作', '冒险', '模拟', '角色扮演'];
for (var i=0, len=collectionsItemsTitles.length; i< len; i++) {
    var item = {
        title: function () {
            return words({ min: 1, max: 3, join: ' ' });
        },
        description: function () {
            return words({ min: 1, max: 7, join: ' ' });
        },
        time: function() {
            var second = Math.floor(Math.random()*60);
            return '0' + Math.floor(Math.random()*9) + ':' + (second > 9 ? second : '0'+second);
        }
    };
    collections.push({
        title: collectionsItemsTitles[i],
        list: fillArray(item, i===0 ? 12 : 6)
    });
}

// fake comment data
var commentData = [];
for (var i=0; i< 20; i++) {
    var commentItem = {
        postTime: Math.floor(Math.random()*9) + '小时前',
        content: words({ min: 3, max: 100, join: ' ' }),
        user: {
            name: words({ exactly: 2, join: ' ' }),
            avatar: '../static/image/user.jpg',
            id: Math.floor(Math.random()*999)
        },
        thumbsUp: Math.floor(Math.random()*999),
        thumbsDown: Math.floor(Math.random()*100),
        reply: {
            count: Math.floor(Math.random()*10),
            list: []
        }
    };

    for (var a=0; a<commentItem.reply.count; a++) {
        commentItem.reply.list.push({
            postTime: Math.floor(Math.random()*9) + '小时前',
            content: words({ min: 3, max: 50, join: ' ' }),
            user: {
                name: words({ exactly: 2, join: ' ' }),
                avatar: '../static/image/user.jpg',
                id: Math.floor(Math.random()*999)
            },
            thumbsUp: Math.floor(Math.random()*999),
            thumbsDown: Math.floor(Math.random()*100),
            reply: {
                count: Math.floor(Math.random()*9)
            }
        });
    }

    commentData.push(commentItem);
}


// 添加组件
var templateImports = $('template-import');
$.each(templateImports, function(index, item) {
    item = $(item);
    var templateUrl = item.attr('file');
    $.get(templateUrl, function(result) {
        item.html(result);

        // 判断是否执行渲染
        if (index + 1 === templateImports.length) {
            render();
        }
    });
});

// 渲染元素
var render = function() {
    var app = new Vue({
        el: '#app',
        data: {
            sideBarItems: sideBarItems,
            commentData: commentData,
            collections: collections
        }
    });
};
