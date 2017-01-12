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
    text: 'test'
}, 20);

sideBarItems[0] = {
    icon: 'home',
    text: 'Home'
};

// fake main content data
var mainContentItems = [];
var mainContentItemsTitles = ['推荐视频', '动作', '冒险', '模拟', '角色扮演'];
for (var i=0, len=mainContentItemsTitles.length; i< len; i++) {
    var item = {
        title: '视频名称',
        description: '视频简介xxxx...'
    };
    mainContentItems.push({
        title: mainContentItemsTitles[i],
        list: fillArray(item, i===0 ? 12 : 6)
    });
}




var app = new Vue({
    el: '#app',
    data: {
        sideBarItems: sideBarItems
    }
})