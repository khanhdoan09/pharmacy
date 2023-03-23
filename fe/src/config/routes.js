const routes = {
    home: '/', // đã kiểm tra
    detail: '/detail',
    cart: '/cart',
    order: '/order',
    signIn: '/signIn', // đã kiểm tra
    signUp: '/signUp', // đã kiểm tra
    confirmEmail: '/confirmEmail', // đã kiểm tra
    forgotPassword: '/forgotPassword', // đã kiểm tra
    filter: '/filter', // đã kiểm tra
    search: '/search/:keyword/:page',
    user: '/user', // đã kiểm tra
    not_found: '*',
    serverError: 'server_error',
    notFound: '*',
};
export default routes;
