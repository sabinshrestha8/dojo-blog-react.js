import Navbar from "./Navbar";
import Home from "./Home";
// importing required components from react-router package
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Create from "./Create";
import BlogDetails from "./BlogDetails";
import NotFound from "./NotFound";
import { useState } from "react";

function App() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("mario");
  const [isPending, setIsPending] = useState(false);

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
              <Create
                blog={{
                  title,
                  body,
                  author,
                  isPending,
                  setIsPending,
                  setTitle,
                  setBody,
                  setAuthor,
                }}
              />
            </Route>
            <Route path="/blogs/update/:id">
              <Create
                blog={{
                  title,
                  body,
                  author,
                  isPending,
                  setIsPending,
                  setTitle,
                  setBody,
                  setAuthor,
                }}
              />
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
