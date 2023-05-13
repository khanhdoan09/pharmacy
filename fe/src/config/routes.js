const routes = {
    home: '/', // đã kiểm tra
    detail: '/detail/:medicineId',
    cart: '/cart',
    order: '/order',
    signIn: '/signIn', // đã kiểm tra
    signUp: '/signUp', // đã kiểm tra
    confirmEmail: '/confirmEmail', // đã kiểm tra
    forgotPassword: '/forgotPassword', // đã kiểm tra
    filter: '/filter/:field', // đã kiểm tra
    category: '/filter/:field/:category', // đã kiểm tra
    categoryDetail: '/filter/:field/:category/:categoryDetail', // đã kiểm tra
    search: '/search/:keyword/:page',
    user: '/user', // đã kiểm tra
    not_found: '*',
    serverError: 'server_error',
    notFound: '*',
    payment: 'payment',
    activeAccount: 'activeAccount',
};
export default routes;
