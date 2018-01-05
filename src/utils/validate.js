import request from '@/utils/request'

VeeValidate.Validator.extend('alpha_underscore', {
    getMessage: field => 'The ' + field + ' field may contain alpha-numeric characters as well as underscores..',
  validate: value => /^[_A-z0-9]{1,}$/.test(value)
});

VeeValidate.Validator.extend('alpha_symbol', {
    getMessage: field => 'The ' + field + ' field may contain alpha-numeric characters as well as ` \' ~ ! @ # $ % ^ & * ( ) - = _ + ; : , . / < > ? ',
  validate: value => /^[_A-z0-9\/`\/'~!@#\$%\^&*\(\)-=_\+;:,./<>\?]{1,}$/.test(value)
});

VeeValidate.Validator.extend('menu', {
    getMessage: field => 'The ' + field + ' field may contain alpha-numeric characters as well as : /',
  validate: value => /^[_A-z0-9:/]{1,}$/.test(value)
});

VeeValidate.Validator.extend('remote', {
    getMessage: field => 'The ' + field + ' field has already exists',
    validate(value,[url]) {
      if (url == undefined) {
        return false;
      }
    return new Promise((resolve, reject)  => {
        const params = {data: value, ignoreError: true};
       request.get(url, {params: params}).then(res => {
        resolve({
                  valid: true
                });
        }).catch(err => {
          resolve({
              valid: false
            });
        });
    });
  }
});

