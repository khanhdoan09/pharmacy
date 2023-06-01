import { InteractionRequiredAuthError } from '@azure/msal-browser';
import { useMsal } from '@azure/msal-react';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '~/redux/authSlice';
import { loginWithAccessToken } from '~/services/userServices';

const useAcquireAccessToken = () => {
    const { instance, accounts } = useMsal();
    const dispatch = useDispatch();
    const [cookies, setCookie] = useCookies(['access_token']);
    const accountType = cookies.accountType;

    function handleRefreshTokenToGetNewAccessToken() {
        if (accountType === 'Microsoft') {
            const accessTokenRequest = {
                scopes: ['api://a0009c06-17e5-438c-8fa8-a076d28644ce/user.read'],
                account: accounts[0],
            };
            instance
                .acquireTokenSilent(accessTokenRequest)
                .then((accessTokenResponse) => {
                    handleLoginWithAccessToken(accessTokenResponse.accessToken, accountType).then(() => {
                        console.log(accessTokenResponse.accessToken);
                        setCookieLogin(accessTokenResponse.accessToken, accountType);
                    });
                })
                .catch((error) => {
                    if (error instanceof InteractionRequiredAuthError) {
                        instance.acquireTokenRedirect(accessTokenRequest);
                    }
                });
        }
    }
    function handleLoginWithAccessToken(accessToken, accountType) {
        console.log(123);
        return loginWithAccessToken(accessToken, accountType).then((response) => {
            const statusCode = response?.data?.status;
            if (statusCode == 200) {
                console.log(statusCode);
                dispatch(
                    loginSuccess({
                        username: response?.data?.data,
                        email: '',
                        accessToken: accessToken,
                        account: accountType,
                    }),
                );
            }
        });
    }
    function setCookieLogin(accessToken, accountType) {
        setCookie('accessToken', accessToken, { path: '/', maxAge: 31536000 }); // 1 year
        setCookie('accountType', accountType, { path: '/', maxAge: 31536000 });
    }
    return handleRefreshTokenToGetNewAccessToken;
};

export default useAcquireAccessToken;
