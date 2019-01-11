
import React from 'react'
import DashBoardPage from '../components/DashboardPage';
import LoginPage from '../components/LoginPage';
import ProfilePage from '../components/ProfilePage';
import {Router, Switch} from 'react-router-dom';
import PublicRoute from '../router/PublicRoute';
import PrivateRoute from '../router/PrivateRoute';
import createHistory from 'history/createBrowserHistory';

export const history = createHistory();

const AppRouter = () => (
    <Router history={history}>
    <div>
        <Switch>
            <PublicRoute path="/" component={LoginPage} exact={true} />
            <PrivateRoute path="/dashboard" component={DashBoardPage}/>
            <PrivateRoute path="/profile" component={ProfilePage}/>
        </Switch>
        </div>
    </Router>
);

//export const AppRouter = () => (routes);

export default AppRouter;