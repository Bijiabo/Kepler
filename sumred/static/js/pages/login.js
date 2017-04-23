/**
 * Created by huchunbo on 2017/4/6.
 */
window.didLoadActions = [];

// 渲染元素
var render = function() {
    var app = new Vue({
        el: '#app',
        data: {
        },
        methods: {
        },
        mounted: function () {
        }
    });
};
window.didLoadActions.push(render);

requirejs(['public', './../components/fakeUserSystem'], function(_public, userSystem) {
    var targetActions = function () {
        _public.init();
    };
    
    window.didLoadActions.push(targetActions);
    
    // elements
    var elements = {
        selector: {
            doLoginButton: '.do-login',
            goRegisterButton: '.go-register',
            accountInput: '#account',
            accountInputContainer: '.account-input-container',
            passwordInput: '#password',
            passwordInputContainer: '.password-input-container',
            tip: '.tip'
        },
        get accountInput() {
            return $(this.selector.accountInput);
        },
        get accountInputContainer() {
            return $(this.selector.accountInputContainer);
        },
        get passwordInput() {
            return $(this.selector.passwordInput);
        },
        get passwordInputContainer() {
            return $(this.selector.passwordInputContainer);
        },
        get tip() {
            return $(this.selector.tip);
        }
    };
    
    // bind user events
    var bindEvents = function () {
        // 用户点击登录动作
        $(document).on('click', elements.selector.doLoginButton, function () {
            var account = $('#account').val(),
                password = $('#password').val();
            
            // 检测是否存在此账户
            if (!userSystem.hasAccount(account)) {
                elements.accountInputContainer.addClass('error');
                elements.tip.text('系统中没有找到该账户，请检查您键入的账户名是否正确').fadeIn();
                return;
            }
    
            if(!userSystem.checkPasswordFormat(elements.passwordInput.val())) {
                elements.tip.text('密码格式错误，应为6-16位字母加数字组合，不区分大小写').fadeIn();
                return;
            }
    
            $('.form-group').removeClass('ok error');
            
            if (userSystem.login(account, password)) {
                location.href = './home.html';
            } else {
                elements.passwordInputContainer.addClass('error');
                elements.tip.text('密码错误，请重新输入').fadeIn();
            }
        });
        
        // 用户输入账户后，验证账户是否正确
        $(document).on('change', elements.selector.accountInput, function () {
            // todo: 调用用户账户检测接口，验证账户是否存在
            var account = elements.accountInput.val();
            if (
                userSystem.hasAccount(account)
            )
            {
                elements.accountInputContainer.addClass('ok');
            }
            else
            {
                elements.accountInputContainer.addClass('error');
            }
        });
        
        // 用户输入密码后，检测是否符合规范
        $(document).on('change', elements.selector.passwordInput, function () {
            elements.passwordInputContainer.removeClass('ok error');
            if (userSystem.checkPasswordFormat(elements.passwordInput.val())) {
                elements.passwordInputContainer.addClass('ok');
            } else {
                elements.passwordInputContainer.addClass('error');
            }
        });
        
        // 用户更改输入框内容后，移除正确/错误提示
        $(document).on('keyup', '.login-container input', function () {
            var $this = $(this);
            var inputContainer = $this.parents('.form-group');
            inputContainer.removeClass('ok error');
            elements.tip.fadeOut();
        });
    
        // 用户点击跳转到注册页面动作
        $(document).on('click', elements.selector.goRegisterButton, function () {
            location.href = './register.html';
        });
    };
    bindEvents();
    
});