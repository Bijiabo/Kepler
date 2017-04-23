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
    
    // bind user events
    var bindEvents = function () {
        
        // 用户更改输入框内容后，移除正确/错误提示
        $(document).on('keyup', '.login-container input', function () {
            var $this = $(this);
            var inputContainer = $this.parents('.form-group');
            inputContainer.removeClass('ok error');
            // elements.tip.fadeOut();
        });
        
        // 检测用户输入的密码是否符合要求
        $(document).on('change', elements.selector.passwordInput, function () {
            elements.passwordInputContainer.removeClass('ok error');
            if (userSystem.checkPasswordFormat(values.password)) {
                elements.passwordInputContainer.addClass('ok');
            } else {
                elements.passwordInputContainer.addClass('error');
            }
        });
        // 检测用户输入的二次验证密码是否符合要求
        $(document).on('change', elements.selector.repeatPasswordInput, function () {
            elements.repeatPasswordInputContainer.removeClass('ok error');
            if (values.password == values.repeatPassword) {
                elements.repeatPasswordInputContainer.addClass('ok');
            } else {
                elements.repeatPasswordInputContainer.addClass('error');
            }
        });
        
        // 用户点击注册按钮
        $(document).on('click', '.go-next', function () {
            if (values.password != values.repeatPassword) {
                // todo: 密码不一致提示
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