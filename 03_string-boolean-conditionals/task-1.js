// корректные пароли

let password = '1234-';
// let password = '4321_';
// let password = 'qaz-xsw';
// let password = '_zxd';

// некорректные пароли

// let password = '_-a';
// let password = 'qaz';
// let password = '_-3';
// let password = '123456789';

if (password.length >= 4 && (password.includes('-') || password.includes('_'))) {
  console.log ('Пароль надежный');
} else {
  console.log ('Пароль не надежный');
}
