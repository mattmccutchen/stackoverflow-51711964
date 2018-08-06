import { Action } from 'redux';

export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}

export const actionCreators = {
    login: (userName: string, pass: string): AppThunkAction<Action> => (dispatch, getState) =>
    {
        var loggedIn = false;

        axios.post('api/Auth/', {
            UserName: userName,
            Password: pass
        }).then(function (response) {
            let tokenEncoded = response.data.token;
            let tokenDecoder = new JwtHelper();
            let token = tokenDecoder.decodeToken(tokenEncoded);
            let usr = new User(userName, JSON.parse(token.userRoles), token.fullName, tokenEncoded);
            dispatch(<LoginUserAction>{ type: 'LOGIN_USER', user: usr });
            dispatch(<RouterAction>routeThings.push('/'));            
        }).catch(function (error) {
            let message = 'Login failed: ';
            if (error.message.indexOf('401') > 0) {
                message += ' invalid username or password';
            } else {
                message += error.message;
            }
            toasting.actionCreators.toast(message, dispatch);
        });
    },
    logout: () => <Action>{ type: 'LOGOUT_USER' }
};
