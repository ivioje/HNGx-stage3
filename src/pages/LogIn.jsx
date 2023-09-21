import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";

import { auth } from "../firebase";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";

const LogIn = () => {
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);

	//react hook form validators
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const hasErrors = Object.keys(errors).length > 0;

	//log in function
	const onLogin = () => {
		if (hasErrors) {
			console.log(errors);
		} else {
			setLoading(true);
			signInWithEmailAndPassword(auth, email, password)
				.then((userCredential) => {
					// Signed in
					navigate("/");
					toast.success("Login successful!");
					setLoading(false);
				})
				.catch((error) => {
					const errorMessage = error.message;
					toast.error(errorMessage);
				});
		}
	};

	// Function to toggle password visibility
	const togglePasswordVisibility = () => {
		setShowPassword((prevShowPassword) => !prevShowPassword);
	};

	return (
		<section className="flex items-center justify-center p-2 font-poppins div-overlay">
			<div className="bg-white flex items-center justify-between flex-col p-5 sm:p-10 my-10 md:my-16 sm:my-12 md:w-[590px] sm:w-[60%] w-full rounded-[34px]">
				<h2 className="font-[600] p-1 text-[22px]">Welcome back!</h2>
				<p>Log in to continue</p>

				<form
					onSubmit={handleSubmit(onLogin)}
					className="flex items-center justify-between flex-col mt-12 w-full sm:w-[90%] px-1"
				>
					<div className="flex flex-col w-full mb-8">
						<input
							{...register("email", {
								required: true,
								pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
							})}
							name="email"
							value={email}
							type="email"
							onChange={(e) => setEmail(e.target.value)}
							placeholder="Enter your email"
							className="h-9 p-2 placeholder:font-[200] bg-slate-50 rounded w-full border border-gray-100"
						/>
						{errors.email && errors.email.type === "required" && (
							<p className="w-full text-[14px] text-red-900 opacity-90">
								Email is required.
							</p>
						)}
						{errors.email && errors.email.type === "pattern" && (
							<p className="w-full text-[14px] text-red-900 opacity-90">
								Email is not valid.
							</p>
						)}
					</div>

					<div className="relative flex flex-col w-full mb-8">
						<input
							{...register("password", { required: true })}
							name="password"
							value={password}
							type={showPassword ? "text" : "password"}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Enter your password"
							className="h-9 p-2 placeholder:font-[200] bg-slate-50 rounded w-full border border-gray-100"
						/>
						<span
							onClick={togglePasswordVisibility}
							className="absolute text-[18px] text-gray-900 cursor-pointer right-1 top-2"
						>
							{showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
						</span>
						{errors.password && errors.password.type === "required" && (
							<p className="w-full text-[14px] text-red-900 opacity-90">
								Password is required.
							</p>
						)}
					</div>

					<button
						disabled={loading === true}
						type="submit"
						className={`w-full ${
							loading === true ? "bg-gray-300" : ""
						} p-2 mt-10 mb-6 text-lg font-bold text-center text-gray-100 rounded bg-gray-950 bg-opacity-95 hover:bg-opacity-100 `}
					>
						{loading ? "Signing in" : "Log In"}
					</button>

					{/* <p className="text-center">
						Don't have an account?
						<NavLink
							to={`/signup`}
							className="font-medium text-gray-900"
						>
							{" "}
							Sign Up
						</NavLink>
					</p> */}
				</form>
			</div>
		</section>
	);
};

export default LogIn;
