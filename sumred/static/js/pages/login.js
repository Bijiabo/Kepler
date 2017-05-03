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
    
    var updateRender = {
        didChangeInput: function (context) {
            
            // 用户修改输入，动态更新按钮状态显示
            if (inputJudge.account && inputJudge.password) {
                $('.do-login').find('span').addClass('text-color-red');
                $('.go-register span').removeClass('text-color-red');
            } else {
                $('.do-login').find('span').removeClass('text-color-red');
                $('.go-register span').addClass('text-color-red');
            }
        }
    };
    
    // 输入内容判定是否合法
    var inputJudge = {
        account: false,
        password: false
    };
    
    var pageCache = {};
    
    var wrongPasswordCount = 0; // 输入密码错误次数记录
    
    
    // bind user events
    var bindEvents = function () {
        // 用户点击登录动作
        var doLoginAction = function () {
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
                wrongPasswordCount++;
                elements.passwordInputContainer.addClass('error');
                var tipText = '密码错误，请重新输入';
                switch (wrongPasswordCount) {
                    case 1:
                        tipText = 'Wait...What?';
                        break;
                    case 2:
                        tipText = 'Really?';
                        break;
                    case 3:
                        tipText = 'F**k it. I\'m gonna go for this';
                        $('.forgot .iconfont').fadeIn();
                        break;
                    default:
                        break;
                }
                elements.tip.text(tipText).fadeIn();
                $('.forgot').fadeIn();
        
                elements.passwordInput.addClass('wrong');
            }
        };
        $(document).on('click', elements.selector.doLoginButton, function () {
            doLoginAction();
        });
        
        // 用户输入账户后，验证账户是否正确
        var didUserChangedAccountInput = function () {
            var account = elements.accountInput.val();
    
            if (account.length == 0) {
                inputJudge.account = false;
                return;
            }
    
            if (
                userSystem.hasAccount(account)
            )
            {
                pageCache.hasAccount = true;
                inputJudge.account = true;
                elements.accountInputContainer.addClass('ok');
                elements.passwordInput.removeAttr("disabled");
            }
            else
            {
                pageCache.hasAccount = false;
                inputJudge.account = false;
                elements.accountInputContainer.addClass('error');
                elements.passwordInput.attr("disabled", "disabled");
                elements.tip.text('系统中没有找到该账户，请检查您输入的用户名是否正确。').fadeIn();
            }
        };
        $(document).on('change', elements.selector.accountInput, function () {
            // todo: 调用用户账户检测接口，验证账户是否存在
            didUserChangedAccountInput();
        });
        
        // 用户输入密码后，检测是否符合规范
        $(document).on('change', elements.selector.passwordInput, function () {
            elements.passwordInputContainer.removeClass('ok error');
            
            if (elements.passwordInput.val().length == 0) {
                inputJudge.password = false;
                return;
            }
            
            if (userSystem.checkPasswordFormat(elements.passwordInput.val())) {
                inputJudge.password = true;
                elements.passwordInputContainer.addClass('ok');
            } else {
                inputJudge.password = false;
                elements.passwordInputContainer.addClass('error');
            }
        });
        
        // 用户更改输入框内容后，移除正确/错误提示
        $(document).on('keyup', '.login-container input', function (e) {
            var $this = $(this);
            var inputContainer = $this.parents('.form-group');
            if (pageCache.hasAccount !== false) {
                elements.accountInputContainer.removeClass('ok error');
            }
            elements.passwordInputContainer.removeClass('ok error');
            elements.tip.hide();
            $('.login-container input').removeClass('wrong');
            
            if ($this.attr('id') == 'password') {
                inputJudge.password = userSystem.checkPasswordFormat(elements.passwordInput.val());
                updateRender.didChangeInput(this);
                if (inputJudge.password) {
                    elements.passwordInputContainer.addClass('ok');
                    
                    if (e.which == 13) {
                        doLoginAction();
                    }
                    
                } else {
                    elements.passwordInputContainer.addClass('error');
                }
            }
    
            if ($this.attr('id') == 'account') {
                didUserChangedAccountInput();
            }
        });
    
        // 用户点击跳转到注册页面动作
        $(document).on('click', elements.selector.goRegisterButton, function () {
            location.href = './register.html';
        });
    };
    bindEvents();
    
});