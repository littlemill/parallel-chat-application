import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import TestPage1 from './pages/TestPage1';
import TestPage2 from './pages/TestPage2';

function App() {
  return (
      <Router>
          <Switch>
              <Route path="/" exact component={TestPage1} />
               <Route path="/page2" exact component={TestPage2} />
          </Switch>
      </Router>
  )
}

export default App
