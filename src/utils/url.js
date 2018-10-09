let loginPage = 'http://my.235.mistong.com/login';
let logoutPage = 'http://my.235.mistong.com/logout';

if (process.env.NODE_ENV === 'production') {
  loginPage = 'http://my.235.mistong.com/login';
  logoutPage = 'http://my.235.mistong.com/logout';
  if (__DEV__) {
    // console.log('in DEV')
    loginPage = 'http://my.235.mistong.com/login';
    logoutPage = 'http://my.235.mistong.com/logout';
  }
  if (__TEST__) {
    // console.log('in TEST')
    loginPage = 'http://my.235.mistong.com/login';
    logoutPage = 'http://my.235.mistong.com/logout';
  }
  if (__PRE__) {
    // console.log('in PRE')
    loginPage = 'http://my.235.mistong.com/login';
    logoutPage = 'http://my.235.mistong.com/logout';
  }
}
export { loginPage, logoutPage };
