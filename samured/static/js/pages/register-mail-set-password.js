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
            passwordInput: '#password',
            passwordInputContainer: '.password-input-container',
            repeatPasswordInput: '#repeat-password',
            repeatPasswordInputContainer: '.repeat-password-input-container',
            mailInput: '#mail',
            mailInputContainer: '.mail-input-container',
            tip: '.tip',
            registerTypeSwitchButton: '.register-account-type-switch .btn',
            registerInputContainer: '.register-input-container'
        },
        get mailInput() {
            return $(this.selector.mailInput);
        },
        get mailInputContainer() {
            return $(this.selector.mailInputContainer);
        },
        get accountInputContainer() {
            return $(this.selector.accountInputContainer);
        },
        get cellPhoneInput() {
            return $(this.selector.cellPhoneInput);
        },
        get passwordInput() {
            return $(this.selector.passwordInput);
        },
        get repeatPasswordInput() {
            return $(this.selector.repeatPasswordInput);
        },
        get passwordInputContainer() {
            return $(this.selector.passwordInputContainer);
        },
        get repeatPasswordInputContainer() {
            return $(this.selector.repeatPasswordInputContainer);
        },
        get tip() {
            return $(this.selector.tip);
        },
        get registerTypeSwitchButton() {
            return $(this.selector.registerTypeSwitchButton);
        },
        get registerInputContainer() {
            return $(this.selector.registerInputContainer);
        },
        get registerInputGroupItem() {
            return $(this.selector.registerInputContainer + '>div');
        }
    };
    
    var values = {
        get password() {
            return elements.passwordInput.val();
        },
        get repeatPassword() {
            return elements.repeatPasswordInput.val();
        }
    };
    
    // 注册账户类型
    var registerType = {
        cellPhone: 'cell-phone-register',
        mail: 'mail-register'
    };
    var currentRegisterType = registerType.cellPhone;
    
    var inputJudge = {
        password: false,
        passwordRepeat: false
    };
    
    // bind user events
    var bindEvents = function () {
        
        // 用户修改键入后，触发统一的判定处理逻辑
        $(document).on('keyup', '.login-container input', function () {
            // 用户更改输入框内容后，移除正确/错误提示
            var $this = $(this);
            var inputContainer = $this.parents('.form-group');
            inputContainer.removeClass('ok error');
            // elements.tip.fadeOut();
        });
        
        var resetTipContent = function () {
            elements.tip.html('<p>邮箱注册成功，请设置密码</p>').fadeIn();
        };
        
        var setEnableStatusForNextButton = function () {
            var enable = inputJudge.passwordRepeat && inputJudge.password;
            var nextButton = $('.go-next');
            console.warn(enable);
            if (enable) {
                nextButton.addClass('enable');
                $('.go-next span').addClass('text-color-red');
            } else {
                nextButton.removeClass('enable');
                $('.go-next span').removeClass('text-color-red');
            }
        };
        
        // 检测用户输入的密码是否符合要求
        $(document).on('keyup', elements.selector.passwordInput, function () {
            elements.passwordInputContainer.removeClass('ok error');
            if (values.password.length === 0) {
                inputJudge.password = false;
                return;
            }
            inputJudge.password = userSystem.checkPasswordFormat(values.password);
            if (inputJudge.password) {
                elements.passwordInputContainer.addClass('ok');
                resetTipContent();
            } else if (values.password.length >= 6) {
                elements.passwordInputContainer.addClass('error');
                elements.tip.text('密码格式错误，应为6-16位字母加数字组合，不区分大小写').fadeIn();
            } else {
                resetTipContent();
            }
    
            setEnableStatusForNextButton();
        });
        // 检测用户输入的二次验证密码是否符合要求
        $(document).on('keyup', elements.selector.repeatPasswordInput, function () {
            elements.repeatPasswordInputContainer.removeClass('ok error');
            if (values.repeatPassword.length === 0) {
                inputJudge.passwordRepeat = false;
                return;
            }
            inputJudge.passwordRepeat = values.password == values.repeatPassword;
            if (inputJudge.passwordRepeat) {
                elements.repeatPasswordInputContainer.addClass('ok');
                resetTipContent();
            } else if (values.repeatPassword.length >= values.password.length) {
                elements.repeatPasswordInputContainer.addClass('error');
                elements.tip.text('两次输入不一致').fadeIn();
            } else {
                resetTipContent();
            }
    
            setEnableStatusForNextButton();
        });
        
        // 用户点击注册按钮
        $(document).on('click', '.go-next', function () {
            if (!$(this).hasClass('enable')) {
                // elements.tip.text('两次输入的密码不一致，请检查').fadeIn();
                return;
            }
            
            userSystem.setPasswordForEmailRegister(
                Cookies.get('email'),
                values.password,
                function (success, description) {
                    if (success) {
                        location.href = './register-success.html';
                    }
                }
            );
        });
    };
    bindEvents();
    
});