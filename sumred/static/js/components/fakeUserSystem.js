/**
 * Created by huchunbo on 2017/4/22.
 */
define([], function () {
    var user = {
        register: function (account, password) {
            Cookies.set(account, password);
        },
        registerByEmail: function (email) {
            Cookies.set('email', email);
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