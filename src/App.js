import Navbar from './Navbar';
import Home from './Home';
// importing required components from react-router package
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Create from './Create';
import BlogDetails from './BlogDetails';
import NotFound from './NotFound';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/create">
              <Create />
            </Route>
            <Route path="/blogs/:id">
              <BlogDetails />
            </Route>
            {/* For 404 page the route path should be "*" which means
            catch any other routes and it goes in the bottom of the
            template bcoz otherwise it's going to match any route that
            comes in if it goes at the top, if it goes at the bottom if
            none of these above route match then this will match it 
            regardless & its kind of like catch-all route */}
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
