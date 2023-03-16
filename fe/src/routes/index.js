import config from '~/config';
import Cart from '~/pages/Cart';
import Detail from '~/pages/Detail';
import { Home } from '~/pages/Home';
import Order from '~/pages/Order/Order';
import { SignIn } from '~/pages/SignIn';
import { SignUp } from '~/pages/SignUp';
import { ConfirmEmail } from '~/pages/ConfirmEmail';
import { ForgotPassword } from '~/pages/ForgotPassword';
import Filter from '~/pages/Filter';
import User from '~/pages/User';
import ServerError from '~/pages/Error/ServerError/ServerError';
import NotFound from '~/pages/Error/NotFound';
import { HeaderSearchLayout } from '~/layouts';

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.detail, component: Detail, layout: HeaderSearchLayout },
    { path: config.routes.cart, component: Cart, layout: HeaderSearchLayout },
    { path: config.routes.order, component: Order, layout: HeaderSearchLayout },
    { path: config.routes.signIn, component: SignIn, layout: HeaderSearchLayout },
    { path: config.routes.signUp, component: SignUp, layout: HeaderSearchLayout },
    { path: config.routes.confirmEmail, component: ConfirmEmail, layout: HeaderSearchLayout },
    { path: config.routes.forgotPassword, component: ForgotPassword, layout: HeaderSearchLayout },
    { path: config.routes.filter, component: Filter, layout: HeaderSearchLayout },
    { path: config.routes.user, component: User, layout: HeaderSearchLayout },
    { path: config.routes.filter, component: Filter, layout: HeaderSearchLayout },
    { path: config.routes.serverError, component: ServerError, layout: HeaderSearchLayout },
    { path: config.routes.notFound, component: NotFound, layout: HeaderSearchLayout },
];
const privateRoutes = [];
export { publicRoutes, privateRoutes };
