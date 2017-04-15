/**
 * Created by huchunbo on 2017/4/6.
 */

var loadTemplateCount = 0;

var loadTemplateUnit = function (element, callback) {
    var templateImports = element.find('template-import');
    $.each(templateImports, function(index, item) {
        item = $(item);
        var contentHTMLCache = item.html();
        var templateUrl = item.attr('file');
        loadTemplateCount++;
        $.get(templateUrl, function(result) {
            loadTemplateCount--;
            item.html(result);
            
            // 获取 slot
            var slot = item.find('template-slot');
            if (slot.length > 0 && contentHTMLCache.length > 0) {
                slot.html(contentHTMLCache);
                loadTemplateUnit(slot, callback);
            }
            
            console.log(loadTemplateCount);
            // 判断是否执行渲染
            if (loadTemplateCount == 0) {
                callback();
            }
        });
    });
};

$(function () {
    // setTimeout(loadTemplates, 1000);
    setTimeout(function () {
        loadTemplateUnit($('body'), function () {
            console.debug('Load Templates Done.');
            if (window.didLoadActions !== undefined) {
                for (var i=0,len=window.didLoadActions.length; i<len; i++) {
                    window.didLoadActions[i]();
                }
            }
        });
    }, 1000);
});