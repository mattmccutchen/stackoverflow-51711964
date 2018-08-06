import { connect/*, Dispatch*/ } from 'react-redux';
import * as ReactRedux from 'react-redux';
import * as React from 'react';
//import { UserRole } from '../model/User';
import { RouteComponentProps } from 'react-router-dom';
import * as LoginStore from /*'../store/LoggedInUser'*/ './LoggedInUser';
//import { ApplicationState } from 'ClientApp/store';

type DispatchProps = typeof LoginStore.actionCreators;
type LoginProps = DispatchProps & RouteComponentProps<{}>;

interface LoginFields {
    userName: string,
    password: string
}

class UserLogin extends React.Component<LoginProps, LoginFields> {

    constructor(props?: LoginProps) {
        super(props);

        this.state = {
            userName: '',
            password: ''
        }

        this.userNameChange = this.userNameChange.bind(this);
        this.pwdChange = this.pwdChange.bind(this);
    }

    userNameChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ userName: e.target.value, password: this.state.password });
    }

    pwdChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ userName: this.state.userName, password: e.target.value });
    }

    public render() {
        return <div>
            <h1>User Login</h1>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                    placeholder="Enter email" value={this.state.userName} onChange={this.userNameChange} />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"
                    value={this.state.password} onChange={this.pwdChange} />
            </div>
            <button type="submit" className="btn btn-primary"
                onClick={() => this.props.login(this.state.userName, this.state.password)}>Login</button>
        </div>;
    }
}

// Wire up the React component to the Redux store
export default connect<{}, DispatchProps, LoginProps>(
    null, LoginStore.actionCreators
)(UserLogin) /*as typeof UserLogin*/;
