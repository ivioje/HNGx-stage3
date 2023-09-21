import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { isMobile } from "react-device-detect";

import Search from "../components/Search";
import Header from "../components/Header";
import Skeleton from "../components/Skeleton";
import Modal from "../components/Modal";
import { AppContext } from "../context/AppContext";
import TouchImageCard from "../components/TouchImageCard";
import { toast } from "react-toastify";

const Gallery = () => {
	const { filteredImages, loading, user, query, handleInputChange } =
		useContext(AppContext);

		const [draggedItem, setDraggedItem] = useState(null);
		const [images, setImages] = useState(filteredImages)

	// Check if touch events are supported
	const isTouchDevice = isMobile;

	const handleDragStart = (e, item) => {
		setDraggedItem(item);
	  };
	
	  const handleDragOver = (e) => {
		e.preventDefault();
	  };
	
	  const handleDrop = (e, targetItem) => {
		if (!draggedItem || draggedItem.id === targetItem.id) {
		  return;
		}

		  const updatedItems = [...images];
		  const draggedIndex = updatedItems.findIndex((item) => item.id === draggedItem.id);
		  const targetIndex = updatedItems.findIndex((item) => item.id === targetItem.id);
	  
		  const temp = updatedItems[draggedIndex];
		  updatedItems[draggedIndex] = updatedItems[targetIndex];
		  updatedItems[targetIndex] = temp;

		  toast.warning(`Replaced ${targetItem.tag} with ${updatedItems[targetIndex].tag}`)
	  
		  setImages(updatedItems);
		  setDraggedItem(null);
		}

		const handleTouchStart = (e, item) => {
			setDraggedItem(item);
		  };
		
		  const handleTouchMove = (e) => {
			if (!draggedItem) return;
		
			const touchY = e.touches[0].clientY;
			const newIndex = calculateNewIndexBasedOnTouchPosition(touchY);
		
			if (newIndex !== -1) {
			  const newItems = [...images];
			  const oldIndex = images.indexOf(draggedItem);
			  newItems.splice(oldIndex, 1);
			  newItems.splice(newIndex, 0, draggedItem);
			  setImages(newItems);
			}
		  };

		  const handleTouchEnd = (e) => {
			if (draggedItem) {
			  // Calculate the new index based on touch position
			  const newIndex = calculateNewIndexBasedOnTouchPosition(e.touches[0].clientY);
		  
			  if (newIndex !== -1) {
				// Find the image being moved
				const movedImage = images[draggedItem.index];
				// Find the image at the new index
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
						<Skeleton />
					) : images.length ? (
						isTouchDevice ? 
						(<div  onTouchMove={handleTouchMove}
        					onTouchEnd={handleTouchEnd}
       						 style={{ userSelect: "none" }}>
						{images.map((image, index) =>
						(
							<div key={index} onTouchStart={(e) => handleTouchStart(e, image)}
											style={{
											cursor: "grab",
											padding: "10px",
											backgroundColor: draggedItem === image ? "dragging" : "",
											}}>
								<TouchImageCard
									image={image}
									index={index}
									
								/>
								</div>
						))}
						</div>)
						:
						(images.map((image, index) =>
							<div key={index} className={`item ${draggedItem && draggedItem.id === image.id ? "dragging" : ""}`}
							draggable="true" onDragStart={(e) => handleDragStart(e, image)}
							onDragOver={(e) => handleDragOver(e)}
							onDrop={(e) => handleDrop(e, image)}>
								<TouchImageCard
									image={image}
									index={index}
									
								/>
								</div>
						))
							
						
					) : (
						<div>No results found for your query</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Gallery;