/**
 * Created by huchunbo on 2017/4/22.
 */
define([], function () {
    var user = {
        register: function (account, password, callback) {
            Cookies.set(account, password, { expires: 999 });
            callback(true, '注册成功！');
        },
        registerByEmail: function (email, callback) {
            Cookies.set('email', email, { expires: 999 });
            callback(true, '注册邮件发送成功！');
        },
        setPasswordForEmailRegister: function (email, password, callback) {
            Cookies.set(email, password, { expires: 999 });
            callback(true, '设定密码成功！');
        },
        login: function (account, password) {
            return Cookies.get(account) == password;
        },
        hasAccount: function (account) {
            return Cookies.get(account) != undefined;
        },
        checkPasswordFormat: function (password) {
            var passwordFormatRegex = /^[A-Za-z0-9]{6,16}$/ig;
            return passwordFormatRegex.test(password);
        },
        checkCellPhoneNumberFormat: function (cellPhoneNumber) {
            var phoneNumberFormatRegex = /(13\d|14[57]|15[^4,\D]|17[678]|18\d)\d{8}|170[059]\d{7}/ig;
            return phoneNumberFormatRegex.test(cellPhoneNumber) && cellPhoneNumber.length === 11;
        },
        checkMailFormat: function (mail) {
            var formatRegex = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/ig;
            return formatRegex.test(mail);
        },
        checkPassWord: function (password) {
            return true;
        }
    };
    
    return user;
});