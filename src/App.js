import {QueryClientProvider,QueryClient} from 'react-query'
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Reservations from "./pages/Reservations";
import SeatsTable from "./components/SeatsTable";
import Cinemas from "./pages/Cinemas";
import AuthPage from "./pages/AuthPage";
import { useContext } from "react";
import AuthContext from "./store/auth-context";
import "./App.css";

const queryClient=new QueryClient();

function App() {
  const authCtx=useContext(AuthContext);
  const isLoggedIn=authCtx.isLoggedIn;
  console.log(isLoggedIn)
  return (
    <QueryClientProvider client={queryClient}>
     <div className="App">
      <Router>
        <Navbar />
        <Switch>
          {isLoggedIn && 
          <>
          <Route path="/" exact component={Home} />
          <Route path="/seats" exact component={SeatsTable} />
          <Route path="/cinemas" exact component={Cinemas} />
          <Route path="/movies" exact component={Movies} />
          <Route path="/reservations" exact component={Reservations} />
          </>
          }
          {!isLoggedIn &&
          <>        
          <Route path="*" component={AuthPage} />
          </>
          }
        </Switch>
      </Router>
    </div>
    </QueryClientProvider>
  );
}

export default App;
