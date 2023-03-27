const path = {
  home: '/',
  user: '/user',
  profile: '/user/profile',
  changePassword: '/user/password',
  historyPurchase: '/user/purchase',
  login: '/login',
  register: '/register',
  logout: '/logout',
  cart: '/cart',
  products: '/products',
  productDetail: '/products/:nameId',
} as const
export default path
