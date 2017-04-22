/**
 * Created by huchunbo on 2017/4/22.
 */
define([], function () {
    var user = {
        register: function (account, password, callback) {
            Cookies.set(account, password);
            callback(true, '注册成功！');
        },
        registerByEmail: function (email, callback) {
            Cookies.set('email', email);
            callback(true, '注册邮件发送成功！');
        },
        login: function (account, password) {
            return Cookies.get(account) == password;
        },
        hasAccount: function (account) {
            return Cookies.get(account) != undefined;
        }
    };
    
    return user;
});