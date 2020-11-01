import React, { Component } from "react";

import Aux from "../../hoc/Aux";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

import Classes from "./Layout.module.css";

class Layout extends Component {

    state={
        showSideDrawer:false
    }
    toggelSideDrawer = ()=>{
        this.setState({showSideDrawer:!this.state.showSideDrawer});
      }

  render() {
    return <Aux>
      <SideDrawer show={this.state.showSideDrawer} toggelSideDrawer={this.toggelSideDrawer} />
      <Toolbar toggelSideDrawer={this.toggelSideDrawer} />
      <main className={Classes.Content}> {this.props.children} </main>
    </Aux>;
  }
}

export default Layout;
