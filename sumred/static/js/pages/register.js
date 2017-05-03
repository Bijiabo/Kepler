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
            captchaInput: '#captcha',
            captchaInputContainer: '.captcha-input-container',
            cellPhoneInput: '#cell-phone-number',
            cellPhoneInputContainer: '.cell-phone-number-container',
            passwordInput: '#password',
            passwordInputContainer: '.password-input-container',
            mailInput: '#mail',
            mailInputContainer: '.mail-input-container',
            tip: '.tip',
            registerTypeSwitchButton: '.register-account-type-switch .btn',
            registerInputContainer: '.register-input-container'
        },
        get captchaInput() {
            return $(this.selector.captchaInput);
        },
        get captchaInputContainer() {
            return $(this.selector.captchaInputContainer);
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
        get cellPhoneInputContainer() {
            return $(this.selector.cellPhoneInputContainer);
        },
        get passwordInput() {
            return $('.'+ currentRegisterType + ' ' + this.selector.passwordInput);
        },
        get passwordInputContainer() {
            return $('.'+ currentRegisterType + ' ' + this.selector.passwordInputContainer);
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
    
    // 注册账户类型
    var registerType = {
        cellPhone: 'cell-phone-register',
        mail: 'mail-register'
    };
    var currentRegisterType = registerType.cellPhone;
    
    var pageCache = {};
    
    // 输入内容判定是否合法
    var inputJudge = {
        account: false,
        password: false
    };
    
    // bind user events
    var bindEvents = function () {
        
        // 用户更改输入框内容后，移除正确/错误提示
        $(document).on('keyup', '.login-container input', function () {
            var $this = $(this);
            var inputContainer = $this.parents('.form-group');
            inputContainer.removeClass('ok error');
            // elements.tip.fadeOut();
        });
    
        // 用户点击跳转到注册页面动作
        $(document).on('click', elements.selector.goRegisterButton, function () {
            location.href = './register.html';
        });
        
        // 用户点击切换注册账户类型
        $(document).on('click', elements.selector.registerTypeSwitchButton, function () {
            var $this = $(this);
            
            elements.registerTypeSwitchButton.removeClass('active');
            $this.addClass('active');
            
            var targetType = $this.attr('register-type');
            elements.registerInputGroupItem.hide();
            $('.'+targetType).show();
            
            currentRegisterType = targetType;
        });
        
        // 用户点击获取手机验证码
        $(document).on('click', '.get-captcha', function () {
            if (pageCache.checkPhoneNumberFormat != true) { return; }
            // todo: 获取手机验证码 API
        });
        
        // 检测用户输入的手机验证码是否正确
        $(document).on('change', elements.selector.captchaInput, function () {
            elements.captchaInputContainer.removeClass('ok error');
            // 检测验证码
            var captcha = elements.captchaInput.val(),
                cellPhoneNumber = elements.cellPhoneInput.val();
            // todo: 通过 API 检测验证码是否正确
            console.log(captcha);
            if (captcha.length) {
                elements.captchaInputContainer.addClass('ok');
            }
        });
    
        // 检测用户输入的手机号是否符合标准
        $(document).on('keyup', elements.selector.cellPhoneInput, function () {
            // elements.cellPhoneInputContainer.removeClass('ok error');
            var cellPhoneNumber = elements.cellPhoneInput.val();
            if (cellPhoneNumber.length === 0) { return; }
            pageCache.checkPhoneNumberFormat = userSystem.checkCellPhoneNumberFormat(cellPhoneNumber);
            inputJudge.account = pageCache.checkPhoneNumberFormat;
            if (pageCache.checkPhoneNumberFormat) {
                // elements.cellPhoneInputContainer.addClass('ok');
                $('.get-captcha').addClass('active');
            } else {
                // elements.cellPhoneInputContainer.addClass('error');
                $('.get-captcha').removeClass('active');
            }
        });
        
        // 检测用户输入的密码是否符合要求
        // todo: 完善密码验证细节
        $(document).on('keyup', elements.selector.passwordInput, function () {
            elements.passwordInputContainer.removeClass('ok error');
            var password = elements.passwordInput.val();
            if (password.length === 0) {
                inputJudge.password = false;
                return;
            }
            inputJudge.password = userSystem.checkPasswordFormat(password);
            if (inputJudge.password) {
                elements.passwordInputContainer.addClass('ok');
            } else {
                elements.passwordInputContainer.addClass('error');
            }
        });
        
        $(document).on('keyup', '.register-input-container input', function () {
            if (currentRegisterType == registerType.cellPhone) {
                // 手机号注册
                if (inputJudge.account && inputJudge.password) {
                    $('.do-register span').addClass('text-color-red');
                } else {
                    $('.do-register span').removeClass('text-color-red');
                }
            } else {
                // 邮箱注册
                
            }
        });
        
        // 用户点击注册按钮
        $(document).on('click', '.do-register', function () {
            if (currentRegisterType == registerType.cellPhone) {
                // 手机号注册
                var cellPhoneNumber = elements.cellPhoneInput.val(),
                    password = elements.passwordInput.val();
                
                if (!userSystem.checkPasswordFormat(password)) {
                    // 密码不符合规范
                    return;
                }
                
                // todo： 调用接口检测验证码是否正确
                // todo： 调用接口进行注册
                userSystem.register(cellPhoneNumber, password, function (success, description) {
                    if (success) {
                        location.href = './register-success.html';
                    } else {
                        
                    }
                });
                // todo: redirect to registe success page
                
            } else {
                // 邮箱注册
                var mail = elements.mailInput.val();
                // todo： 调用接口发送注册邮件
                userSystem.registerByEmail(mail, function (success, description) {
                    elements.tip.html('\
                        <p>已发送注册确认邮件到您的邮箱，请登录邮箱确认</p>\
                        <p style="margin-top: 30px;"><a href="#" class="text-color-red">没有收到邮件，再次发送</a></p>\
                        \
                        <div class="separator-line"></div>\
                        <p>\
                            <a href="register-mail-set-password.html" class="text-color-red">本地测试环境，直接点击此链接跳转到设定密码页面</a>\
                        </p>\
                    ');
                });
                // todo: redirect to mail register password set page;
            }
        });
    };
    bindEvents();
    
});