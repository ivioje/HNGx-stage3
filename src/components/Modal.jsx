import React, { useState, useEffect } from "react";
import { CgLivePhoto } from "react-icons/cg";
import { NavLink } from "react-router-dom";

function Modal() {
	const [showModal, setShowModal] = useState(false);

	// Function to open the modal
	const openModal = () => {
		setShowModal(true);
	};

	// Use useEffect to open the modal when the component mounts
	useEffect(() => {
		openModal();
	}, []);

	return (
		<div
			className={`fixed z-[1000] w-full h-full bg-gray-100/50 backdrop-blur-sm flex items-center justify-center modal ${
				showModal ? "show" : ""
			}`}
		>
			<div className="bg-white sm:w-[50%] w-[90%] h-[60vh] shadow-2xl rounded-xl flex items-center justify-center flex-col">
				<div className="text-2xl font-bold text-gray-800 flex items-start text-[35px] mb-8 justify-center">
					<span className="m-1 text-yellow-500 ">
						<CgLivePhoto />
					</span>
					<h1 className=" font-sofia">Fototeca</h1>
				</div>
				<p className="p-3 text-gray-500 w-[95%] text-center">
					Fototeca is a photographic library of random images. Explore our
					intuitive gallery of images. Rearrange images by dragging and dropping
					them. Enjoy the calmness of Fototeca!
				</p>

				<NavLink
					to="/login"
					className="mt-6 text-xl font-bold text-gray-900"
				>
					Log In to continue
				</NavLink>
			</div>
		</div>
	);
}

export default Modal;
