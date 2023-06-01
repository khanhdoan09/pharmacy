import config from '~/config';
import { HeaderSearchLayout } from '~/layouts';
import { ActiveAccount } from '~/pages/ActiveAccount';
import Cart from '~/pages/Cart';
import Category from '~/pages/Category';
import CategoryDetail from '~/pages/CategoryDetail/CategoryDetail';
import { ConfirmEmail } from '~/pages/ConfirmEmail';
import Detail from '~/pages/Detail';
import NotFound from '~/pages/Error/NotFound';
import ServerError from '~/pages/Error/ServerError/ServerError';
import Filter from '~/pages/Filter';
import { Home } from '~/pages/Home';
import Order from '~/pages/Order/Order';
import { Payment } from '~/pages/Payment';
import ResetPassword from '~/pages/ResetPassword/ResetPassword';
import Search from '~/pages/Search';
import { SignIn } from '~/pages/SignIn';
import { SignUp } from '~/pages/SignUp';
import User from '~/pages/User';

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.detail, component: Detail, layout: HeaderSearchLayout },
    { path: config.routes.cart, component: Cart, layout: HeaderSearchLayout },
    { path: config.routes.order, component: Order, layout: HeaderSearchLayout },
    { path: config.routes.signIn, component: SignIn, layout: HeaderSearchLayout },
    { path: config.routes.signUp, component: SignUp, layout: HeaderSearchLayout },
    { path: config.routes.confirmEmail, component: ConfirmEmail, layout: HeaderSearchLayout },
    { path: config.routes.filter, component: Filter, layout: HeaderSearchLayout },
    { path: config.routes.category, component: Category, layout: HeaderSearchLayout },
    { path: config.routes.categoryDetail, component: CategoryDetail, layout: HeaderSearchLayout },

    { path: config.routes.search, component: Search, layout: HeaderSearchLayout },
    { path: config.routes.user, component: User, layout: HeaderSearchLayout },
    { path: config.routes.filter, component: Filter, layout: HeaderSearchLayout },
    { path: config.routes.serverError, component: ServerError, layout: HeaderSearchLayout },
    { path: config.routes.notFound, component: NotFound, layout: HeaderSearchLayout },
    { path: config.routes.payment, component: Payment, layout: HeaderSearchLayout },
    { path: config.routes.activeAccount, component: ActiveAccount, layout: HeaderSearchLayout },
    { path: config.routes.resetPassword, component: ResetPassword, layout: HeaderSearchLayout },
];
const privateRoutes = [];
export { publicRoutes, privateRoutes };

