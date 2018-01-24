/* eslint-env browser */
const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

const cookie = {
  set({ name, value = '', path = '/', domain = '', expires = '' }) {
    console.log('cookiestart');
    if (!canUseDOM) { return; }
    console.log('cookieend');

    let exp = expires;

    if (exp instanceof Date) {
      exp = exp.toUTCString();
    }

    document.cookie = [
      `${name}=${value}`,
      `path=${path}`,
      `domain=${domain}`,
      `expires=${exp}`,
    ].join(';');
  },

  unset(name) {
    cookie.set({ name, exp: new Date(0) });
  },

  get(name) {
    const re = new RegExp(['(?:^|; )',
      name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1'),
      '=([^;]*)',
    ].join(''));

    const matches = document.cookie.match(re);

    return matches ? decodeURIComponent(matches[1]) : undefined;
  }
};

export default cookie;
