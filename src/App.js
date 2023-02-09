import Navbar from './Navbar';
import Home from './Home';
// importing required components from react-router package
/* BrowserRouter component is used as the root component for the routing configuration, and
Route component is used to define individual routes. The Switch component is used to ensure
that only one route is rendered at a time, rather than multiple routes being rendered simultaneously */
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
