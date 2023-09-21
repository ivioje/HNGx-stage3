import React from "react";
import { FaTags } from "react-icons/fa";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Skeleton from "./Skeleton";

const ImageCard = ({ image, isDragging }) => {
	return (
		<div
			className={`${
				isDragging === image.id ? "dragging" : ""
			} relative flex flex-col items-center justify-center p-2`}
		>
			<div className="hidden xs:grid xs:w-[200px] xs:h-[150px] cursor-grab">
				<LazyLoadImage
					src={image.url ? image.url : <Skeleton />}
					alt={image.tag}
					className="w-full h-full rounded-md shadow-md"
					effect="blur"
				/>
			</div>
			<div className="grid xs:hidden w-[300px] h-[200px] cursor-grab">
				<LazyLoadImage
					src={image.url ? image.url : <Skeleton />}
					alt={image.tag}
					className="w-full h-full rounded-md shadow-md"
					effect="blur"
				/>
			</div>
			{/* <div
				className="grid bg-no-repeat bg-cover bg-center rounded-md shadow-md xs:hidden w-[300px] h-[200px] cursor-grab"
				style={{ backgroundImage: `url(${image.url})` }}
			/> */}

			<div className="absolute flex items-center p-1 font-medium text-gray-800 lowercase rounded-lg left-4 top-4 bg-white/30 backdrop-blur-md">
				<span className="text-[13px] mr-[2px] mt-[2px]">
					<FaTags />
				</span>
				<small>{image.tag}</small>
			</div>
		</div>
	);
};

export default ImageCard;
