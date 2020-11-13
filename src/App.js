import { React, Component } from "react";
import {Route,Switch,Redirect} from 'react-router-dom';
import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import CheckOut from "./containers/CheckOut/CheckOut";
import Orders from "./containers/Orders/Orders";

class App extends Component {

 

  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/build" component={BurgerBuilder}/>
            <Route path="/orders" component={Orders}/>
            <Route path="/check-out" component={CheckOut}/>
            <Redirect from="/" to="/build"/>
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
