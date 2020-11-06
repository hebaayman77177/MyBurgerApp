import React, { Component } from "react";
import Aux from "../Aux";
import Modal from "../../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComp, axios) => {
  return class extends Component {

    // constructor(props) {
    //   super(props);
    //   axios.interceptors.request.use(req=>{
    //     this.setState({error:null});
    //     return req;
    //   });

    //   axios.interceptors.response.use(res=>res,(error)=>{
    //     console.log("errrrrrrr9999999999rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr")
    //     this.setState({error:error});
    //   });
    // }
 
    state={
      error:null
    }


    componentWillMount(){

      this.reqiter = axios.interceptors.request.use(req=>{
        this.setState({error:null});
        return req;
      });

      this.resinter = axios.interceptors.response.use(res=>res,(error)=>{
        this.setState({error:error});
      });

    }

    componentWillUnmount(){
      axios.interceptors.request.eject(this.reqiter);
      axios.interceptors.response.eject(this.resinter);
    }

    clickedHandler=()=>{
      this.setState({error:null});
    }
    

    render() {

      
        console.log("ya rab",this.state.error !== null);
      return (
        <Aux>
          <Modal show={this.state.error !== null} cancel={this.clickedHandler}>
          {this.state.error ? this.state.error.message : null}</Modal>
          <WrappedComp {...this.props} />
        </Aux>
      );
    }
  };
};

export default withErrorHandler;
