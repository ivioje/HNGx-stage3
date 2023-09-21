import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { CgLivePhoto } from "react-icons/cg";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
	const [isSticky, setIsSticky] = useState(false);
	const { user, onLogout } = useContext(AppContext);

	const handleScroll = () => {
		if (window.scrollY > 100) {
			setIsSticky(true);
		} else {
			setIsSticky(false);
		}
	};

	// Add a scroll event listener when the component mounts
	useEffect(() => {
		window.addEventListener("scroll", handleScroll);

		// Remove the event listener when the component unmounts
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<>
			{user && (
				<nav
					className={`${
						isSticky
							? "fixed top-0 left-0 py-6 w-full bg-white shadow-md z-[50]"
							: ""
					} xs:p-4 py-4 pl-1 pr-2 transition-all duration-300 ease-in-out shadow`}
				>
					<div className="container flex items-center justify-between mx-auto">
						<div className="text-2xl font-bold text-gray-800">
							<NavLink
								className="flex items-center text-[27px] justify-center font-bold text-gray-800"
								title="logo"
								to={`/`}
							>
								<span className="m-1 text-yellow-500 ">
									<CgLivePhoto />
								</span>
								<h1 className=" font-sofia">Fototeca</h1>
							</NavLink>
						</div>
						<div className="flex items-center">
							<img
								src="https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg"
								alt="user"
								className="w-10 h-10 rounded-full sm:mr-2"
								title="user"
							/>
							<span className="text-gray-800">{user.displayName}</span>
							<button
								onClick={onLogout}
								className="py-2 ml-4 font-bold text-gray-800 rounded xs:px-4 text:bg-gray-900"
								title="logout"
							>
								Logout
							</button>
						</div>
					</div>
				</nav>
			)}
		</>
	);
};

export default Navbar;
