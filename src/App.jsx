import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Gallery from "./pages/Gallery";
import Navbar from "./components/Navbar";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Footer from "./components/Footer";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
	return (
		<>
			{/*notifications */}
			<ToastContainer />
			{/*navbar */}
			<Navbar />

			{/*app routes */}
			<Routes>
				<Route
					path="/"
					element={<Gallery />}
				/>
				<Route
					path="signup"
					element={<SignUp />}
				/>
				<Route
					path="login"
					element={<LogIn />}
				/>
				<Route
					path="*"
					element={<Gallery />}
				/>
			</Routes>

			{/*footer */}
			<Footer />
		</>
	);
};

export default App;
