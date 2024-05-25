import Navbar from "./components/Navbar";
import Home from "./components/Home";
// importing required components from react-router package
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Create from "./components/Create";
import BlogDetails from "./components/BlogDetails";
import NotFound from "./components/NotFound";
import BlogState from "./context/blogs/BlogState";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
function App() {
  // Create a client
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    // Provide the client to your App
    <QueryClientProvider client={client}>
      <Router>
        <BlogState>
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
                <Route path="/blogs/update/:id">
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
        </BlogState>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
