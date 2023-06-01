const routes = {
    home: '/', // đã kiểm tra
    detail: '/detail/:slug',
    cart: '/cart',
    order: '/order',
    signIn: '/sign-in', // đã kiểm tra
    signUp: '/sign-up', // đã kiểm tra
    confirmEmail: '/confirmEmail', // đã kiểm tra
    filter: '/filter/:slug', // đã kiểm tra
    category: '/filter/:field/:category', // đã kiểm tra
    categoryDetail: '/filter/:field/:category/:categoryDetail', // đã kiểm tra
    search: '/search/:keyword/:page',
    user: '/user/:uid', // đã kiểm tra
    not_found: '*',
    serverError: '/server-error',
    notFound: '*',
    payment: '/payment',
    activeAccount: '/active-account',
    resetPassword: '/reset-password',
};
export default routes;
