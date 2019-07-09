import React, {Component} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Mainnav from './components/Mainnav';
import Home from './components/Home';
import Profs from './components/Profs';
import Students from './components/Students';
import Admin from './components/Admin';
import LogIn from './components/auth/LogIn';
import Register from './components/auth/Register';
import ForgotPassword from './components/auth/ForgotPassword';
import ForgotPasswordVerification from './components/auth/ForgotPasswordVerification';
import ChangePassword from './components/auth/ChangePassword';
import ChangePasswordConfirm from './components/auth/ChangePasswordConfirm';
import Welcome from './components/auth/Welcome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Auth} from 'aws-amplify';
library.add(fas, far, fab);

class App extends Component{

    state = {
      isAuthenticated: false,
      isAuthenticating: true,
      user: null
    }
    
    setAuthStatus = authenticated => {
      this.setState({isAuthenticated: authenticated});
    }

    setUser = user => {
      this.setState({user: user});
    }

    async componentDidMount(){
      try{
        const session = await Auth.currentSession();
        this.setAuthStatus(true);
        console.log(session);
        const user = await Auth.currentAuthenticatedUser();
        this.setUser(user);
      }
      catch(error){
        console.log(error);
      }
      this.setState({isAuthenticating: false});
    }

    render(){
      const authProps = {
        isAuthenticated: this.state.isAuthenticated,
        user: this.state.user,
        setAuthStatus: this.setAuthStatus,
        setUser: this.setUser
      }

      return(
      !this.state.isAuthenticating && 
      <div className="App">
        <Router>
          <div>
            <Mainnav auth={authProps} />
            <Switch>
              <Route exact path = "/" render={props => <Home {...props} />} />
              <Route exact path = "/profs" render={props => <Profs {...props} />} />
              <Route exact path = "/students" render={props => <Students {...props} />} />
              <Route exact path = "/admin" render={props => <Admin {...props} auth={authProps}/>} />
              <Route exact path="/login" render={(props) => <LogIn {...props} auth={authProps} />} />
              <Route exact path="/register" render={(props) => <Register {...props} auth={authProps} />} />
              <Route exact path="/forgotpassword" render={(props) => <ForgotPassword {...props} auth={authProps} />} />
              <Route exact path="/forgotpasswordverification" render={(props) => <ForgotPasswordVerification {...props} auth={authProps} />} />
              <Route exact path="/changepassword" render={(props) => <ChangePassword {...props} auth={authProps} />}/>
              <Route exact path="/changepasswordconfirmation" render={(props) => <ChangePasswordConfirm {...props} auth={authProps} />} />
              <Route exact path="/welcome" render={(props) => <Welcome {...props} auth={authProps} />} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
