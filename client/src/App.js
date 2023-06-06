import "./App.css";
import { Switch, Route } from "react-router-dom";
import Home from "./views/Home/Home";
import Landing from "./views/Landing/Landing";
import Create from "./views/Create/Create";
import NavBar from "./components/NavBar/NavBar";
import Detail from "./views/Detail/Detail";
import { useLocation } from "react-router-dom";


function App() {

  const location = useLocation();
  
  return (
    <div className="App">
      
      {location.pathname !== "/" && <NavBar />}
      
      <Switch>
        <Route exact path={"/"} component={Landing} />

        <Route path={"/home"} component={Home} />

        <Route path={"/create"} component={Create} />

        <Route exact path={"/detail/:id"} component={Detail} />

      
      </Switch>
    </div>
  );
}

export default App;
