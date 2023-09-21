import React from "react";

const Footer = () => {
	return (
		<div className="relative bottom-0 flex items-center justify-center font-serif text-lg text-gray-500">
			<p> All rights reserved. Fototeca &copy; {new Date().getFullYear()}</p>
		</div>
	);
};

export default Footer;
