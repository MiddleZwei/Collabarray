import React, { Component } from "react";
import "./App.css";
import "materialize-css/dist/css/materialize.min.css";
import "./styles.css";
// import { Spinner } from "@blueprintjs/core";
// import firebase from 'firebase';
import {
	BrowserRouter,
	//HashRouter,
	//Link,
	// NavLink,
	Redirect,
	//Router,
	Route,
	Switch
} from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";
import Messenger from "./Messenger";
import AddProject from "./AddProject";
import OpenProject from "./OpenProject";
import ViewProjects from "./ViewProjects";
import Logout from "./Logout";
import Profile from "./Profile";
import { app } from "./firebaseInitApp.js";

// import $ from "jquery";
import "bootstrap-social";

//makes materialize-css work since it needs jquery and imports have to go at the top
window.jQuery = require("jquery");
require("materialize-css");

class Loader extends Component {
	render() {
		const loadStyle = {
			position: "fixed" /* or absolute */,
			top: "45%",
			left: "45%"
		};
		return (
			<div style={loadStyle}>
				<h3>Loading...</h3>
				<div className="preloader-wrapper big active">
					<div className="spinner-layer spinner-teal">
						<div className="circle-clipper left">
							<div className="circle" />
						</div>
						<div className="gap-patch">
							<div className="circle" />
						</div>
						<div className="circle-clipper right">
							<div className="circle" />
						</div>
					</div>

					<div className="spinner-layer spinner-black">
						<div className="circle-clipper left">
							<div className="circle" />
						</div>
						<div className="gap-patch">
							<div className="circle" />
						</div>
						<div className="circle-clipper right">
							<div className="circle" />
						</div>
					</div>

					<div className="spinner-layer spinner-white">
						<div className="circle-clipper left">
							<div className="circle" />
						</div>
						<div className="gap-patch">
							<div className="circle" />
						</div>
						<div className="circle-clipper right">
							<div className="circle" />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

class App extends Component {
	constructor() {
		super();
		this.state = {
			authenticated: false,
			loading: true,
			userFullName: ""
		};
	}

	componentWillMount() {
		this.removeAuthListener = app.auth().onAuthStateChanged(user => {
			if (user) {
				this.setState({
					authenticated: true
				});
			} else {
				this.setState({
					authenticated: false
				});
			}
			this.setState({
				loading: false
			});
		});
	}

	componentWillUnmount() {
		this.removeAuthListener();
	}

	render() {
		if (this.state.loading) {
			return (
				<div id="loading">
					<Loader />
				</div>
			);
		}

		return (
			<BrowserRouter>
				<div className="App">
					<Header authenticated={this.state.authenticated} />
					<div className="content container-fluid">
						{/*where our content(views) will load into*/}
						<Switch>
							<Route
								exact
								path="/"
								render={() =>
									this.state.authenticated ? (
										<Redirect to="/home" />
									) : (
										<Redirect to="/signin" />
									)
								}
							/>
							<Route path="/home" render={() => <Home title="Home" />} />
							<Route
								path="/messenger"
								render={() => (
									<Messenger
										username={this.state.userFullName}
										title="Messenger"
									/>
								)}
							/>
							<Route path="/signin" render={() => <SignIn title="Sign In" />} />
							<Route path="/signup" render={() => <SignUp title="Sign Up" />} />
							<Route path="/logout" render={() => <Logout title="Log Out" />} />
							<Route
								path="/addproject"
								render={() => <AddProject title="Add Project" />}
							/>
							<Route
								path="/openproject/:id"
								render={({ match }) => (
									<OpenProject title="Project Id: " match={match} />
								)}
							/>{" "}
							{/* <-- REF. from OpenProject.js */}
							<Route
								path="/viewprojects"
								render={() => <ViewProjects title="Project Wall" />}
							/>
							<Route
								path="/profile/:id"
								render={({ match }) => (
									<Profile
										username={this.state.userFullName}
										title="Profile"
										match={match}
									/>
								)}
							/>
						</Switch>
					</div>
					<Footer />
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
