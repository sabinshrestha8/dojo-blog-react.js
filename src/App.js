// step 1: importing Navbar & Home component 
import Navbar from './Navbar';
import Home from './Home';

function App() {
  return (
    <div className="App">
      {/* step 2: injecting Navbar component inside root component */}
      <Navbar />
      <div className="content">
        {/* step 2: nesting Home component inside root component */}
        <Home />
      </div>
    </div>
  );
}

export default App;
