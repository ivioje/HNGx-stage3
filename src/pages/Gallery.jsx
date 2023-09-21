import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { isMobile } from "react-device-detect";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";

import Search from "../components/Search";
import Header from "../components/Header";
import Skeleton from "../components/Skeleton";
import Modal from "../components/Modal";
import ImageCard from "../components/ImageCard";
import Spinner from "../components/Spinner";

const Gallery = () => {
	const { data, loading, user, query, setQuery } = useContext(AppContext);

	const [draggedItem, setDraggedItem] = useState(null);
	const [images, setImages] = useState(data);

	// Check if touch events are supported
	const isTouchDevice = isMobile;

	const originalImages = data;

	// drag and drop functions for desktop
	const handleDragStart = (e, item) => {
		setDraggedItem(item);
	};

	const handleDragOver = (e) => {
		e.preventDefault();
	};

	document.addEventListener("dragover", handleDragOver, { passive: false });

	const handleDrop = (e, targetItem) => {
		if (!draggedItem || draggedItem.id === targetItem.id) {
			return;
		}

		//item index
		const updatedItems = [...images];
		const draggedIndex = updatedItems.findIndex(
			(item) => item.id === draggedItem.id
		);
		const targetIndex = updatedItems.findIndex(
			(item) => item.id === targetItem.id
		);

		const temp = updatedItems[draggedIndex];
		updatedItems[draggedIndex] = updatedItems[targetIndex];
		updatedItems[targetIndex] = temp;

		toast.warning(
			`Replaced ${targetItem.tag} with ${updatedItems[targetIndex].tag}`
		);

		setImages(updatedItems);
		setDraggedItem(null);
	};

	// drag and drop functions for mobile
	const handleTouchStart = (e, item) => {
		setDraggedItem(item);
	};

	const handleTouchMove = (e) => {
		if (!draggedItem) return;

		const touchY = e.touches[0].clientY;
		const newIndex = calculateNewIndexBasedOnTouchPosition(touchY);

		//get the index being moved
		if (newIndex !== -1) {
			const newItems = [...images];
			const oldIndex = images.indexOf(draggedItem);
			newItems.splice(oldIndex, 1);
			newItems.splice(newIndex, 0, draggedItem);
			setImages(newItems);
		}
	};

	const handleTouchEnd = (e) => {
		if (draggedItem && e.touches && e.touches.length > 0) {
			// Calculate the new index based on touch position
			const newIndex = calculateNewIndexBasedOnTouchPosition(
				e.touches[0].clientY
			);

			if (newIndex !== -1) {
				const movedImage = images[draggedItem.index];
				const targetImage = images[newIndex];

				toast.warning(`Replaced ${movedImage.tag} with ${targetImage.tag}`);
			}

			// Update the images state accordingly
			const newItems = [...images];
			const oldIndex = images.indexOf(draggedItem);
			newItems.splice(oldIndex, 1);
			newItems.splice(newIndex, 0, draggedItem);
			setImages(newItems);
		}
		setDraggedItem(null);
	};

	const calculateNewIndexBasedOnTouchPosition = (touchY) => {
		// Calculate the index based on the Y-coordinate of the touch position
		const itemHeight = 50; // Height of each item
		const newIndex = Math.floor(touchY / itemHeight);
		return newIndex;
	};

	const handleInputChange = (e) => {
		const newQuery = e.target.value.toLowerCase();

		// Filter the images based on the query
		const filteredImages = originalImages.filter((image) =>
			image.tag.toLowerCase().includes(newQuery)
		);

		// Update the query and images
		setQuery(newQuery);
		setImages(filteredImages);
	};

	return (
		<div>
			{user ? null : <Modal />}

			<Header />
			<Search
				query={query}
				handleInputChange={handleInputChange}
			/>

			{!user && (
				<h4 className="flex items-center justify-center pb-5 text-gray-500">
					<NavLink
						to={`/login`}
						className="mr-1 text-yellow-500"
					>
						Log in
					</NavLink>
					to rearrange images.
				</h4>
			)}
			{/*image card */}
			<div className="flex items-center justify-center w-full bg-slate-50">
				<div className="p-4 card xs:bg-white border my-10 py-10 sm:w-[90%] xs:w-[95%] w-full">
					{loading ? (
						<Spinner />
					) : images.length ? (
						isTouchDevice ? (
							<div
								onTouchMove={handleTouchMove}
								onTouchEnd={handleTouchEnd}
								style={{ userSelect: "none" }}
							>
								{images.map((image, index) => (
									<div
										key={index}
										onTouchStart={(e) => handleTouchStart(e, image)}
										style={{
											cursor: "grab",
											padding: "10px",
											backgroundColor: draggedItem === image ? "dragging" : "",
										}}
									>
										<ImageCard
											image={image}
											index={index}
											loading={loading}
										/>
									</div>
								))}
							</div>
						) : (
							images.map((image, index) => (
								<div
									key={index}
									className={`item ${
										draggedItem && draggedItem.id === image.id ? "dragging" : ""
									}`}
									draggable="true"
									onDragStart={(e) => handleDragStart(e, image)}
									onDragOver={(e) => handleDragOver(e)}
									onDrop={(e) => handleDrop(e, image)}
								>
									<ImageCard
										image={image}
										index={index}
									/>
								</div>
							))
						)
					) : (
						<div>No results found for your query</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Gallery;
