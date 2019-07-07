import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Mainnav from './components/Mainnav';
import Home from './components/Home';
import Profs from './components/Profs';
import Students from './components/Students';
import Admin from './components/Admin';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
library.add(faEdit);

function App(){
    return(
    <div className="App">
      <Router>
        <div>
          <Mainnav />
          <Switch>
            <Route exact path = "/" component={Home} />
            <Route exact path = "/profs" component={Profs} />
            <Route exact path = "/students" component={Students} />
            <Route exact path = "/admin" component={Admin} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
