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
        setPasswordForEmailRegister: function (email, password, callback) {
            Cookies.set(email, password);
            callback(true, '设定密码成功！');
        },
        login: function (account, password) {
            return Cookies.get(account) == password;
        },
        hasAccount: function (account) {
            return Cookies.get(account) != undefined;
        },
        checkPasswordFormat: function (password) {
            var passwordFormatRegex = /[A-Za-z0-9]{6,16}/ig;
            return passwordFormatRegex.test(password);
        }
    };
    
    return user;
});