import React, { useState } from 'react';
import '../output.css'; // Import custom Tailwind CSS
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const AddSite = () => {
    const [siteName, setSiteName] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState();
    const [distance, setDistance] = useState();
    const [openingHours, setOpeningHours] = useState('');
    const [categories, setCategories] = useState('');
    const [facilitiesAvailable, setFacilitiesAvailable] = useState([]);
    const [rating, setRating] = useState();
    const [transportations, setTransportations] = useState('');
    const [images, setImages] = useState([]);
    const [videos, setVideos] = useState([]);
    const history=useHistory()

    const handleFacilityChange = (e) => {
        const { value } = e.target;
        if (facilitiesAvailable.includes(value)) {
            // Remove facility if already selected
            setFacilitiesAvailable(facilitiesAvailable.filter(facility => facility !== value));
        } else {
            // Add facility if not already selected
            setFacilitiesAvailable([...facilitiesAvailable, value]);
        }
    };

    const handleTransportationChange = (e) => {
        const { value } = e.target;
        if (transportations.includes(value)) {
            setTransportations(transportations.filter(transport => transport !== value));
        } else {
            setTransportations([...transportations, value]);
        }
    };

    const handleImagesChange = (e) => {
        const selectedImages = e.target.files;
        setImages(selectedImages);
    };
    const handleVideosChange = (e) => {
        const selectedVideos = e.target.files;
        setVideos(selectedVideos);
    };

    async function uploadImages(files,siteName) {
        try {
            files = Array.from(files)
            console.log(files)
          const formData = new FormData();
          files.forEach((file, index) => {
            formData.append('images', file);
          });
      
          const response = await fetch('http://localhost:4000/site/addImages/'+siteName, {
            method: 'PATCH',
              body: formData,
            credentials:'include'
          });
            
            if (!response.ok) {
                console.log("ERROR")
                throw new Error('Failed to upload images');
            }
            
          console.log('Images are uploaded successfully');
        } catch (error) {
          console.error('Error uploading images:', error);
        }
      }
      
      async function uploadVideos(files,siteName) {
        try {
          files=Array.from(files)
          const formData = new FormData();
          files.forEach((file, index) => {
            formData.append(`images`, file);
          });
      
          const response = await fetch('http://localhost:4000/site/addVideos/'+siteName, {
            method: 'PATCH',
              body: formData, 
            credentials:'include'
          });
            
          if (!response.ok) {
            throw new Error('Failed to upload videos');
          }
      
          console.log('Videos are uploaded successfully');
        } catch (error) {
          console.error('Error uploading videos:', error);
        }
      }
      
    

    const handleSubmit = async (e) => {
        e.preventDefault();
         try {
            const formData = {
                siteName,
                description,
                location: {
                    address,
                    coordinates:[latitude,longitude]
                },
                distance,
                openingHours,
                categories,
                rating,
                facilitiesAvailable,
                transportations
                
            };

             

            // Fetch POST request to backend API
            const response = await fetch('http://localhost:4000/site/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials:'include',
                body: JSON.stringify(formData)
            });

             if (!response.ok) {
                throw new Error('Failed to add site');
            } 

             console.log('Site added successfully!');
             uploadImages(images, siteName)
             uploadVideos(videos, siteName)
             history.push('/sitelist')

        } catch (error) {
            console.error('Error adding site:', error);
        }
    };

    return (
        <div className="add-site-form">
            <h1 className="text-3xl font-bold mb-4">Add New Site</h1>
            <form onSubmit={handleSubmit}>

                <div className="mb-4">
                    <label htmlFor="sitename" className="block text-lg font-semibold mb-2">Site Name</label>
                    <input
                        type="text"
                        id='sitename'
                        value={siteName}
                        onChange={(e) => setSiteName(e.target.value)}
                        placeholder="Site Name"
                        className="add-site-input"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="description" className="block text-lg font-semibold mb-2">Description</label>

                    <textarea
                        id='description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description"
                        className="add-site-input"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="address" className="block text-lg font-semibold mb-2">Address</label>
                    <input
                        type="text"
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Enter address"
                        className="add-site-input"
                        required
                    />
                </div>

                <div className="flex mb-4">
                    <div className="mr-4">
                        <label htmlFor="latitude" className="block text-lg font-semibold mb-2">Latitude</label>
                        <input
                            type="number"
                            id="latitude"
                            min='-90' max='90'
                            value={latitude}
                            onChange={(e) => setLatitude(e.target.value)}
                            placeholder="Enter latitude"
                            className="add-site-input"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="longitude" className="block text-lg font-semibold mb-2">Longitude</label>
                        <input
                            type="number"
                            id="longitude"
                            min='-180' max='180'
                            value={longitude}
                            onChange={(e) => setLongitude(e.target.value)}
                            placeholder="Enter longitude"
                            className="add-site-input"
                            required
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <label htmlFor="distance" className="block text-lg font-semibold mb-2">Distance From Addis Ababa</label>
                    <input
                        type="number"
                        id='distance'
                        value={distance}
                        onChange={(e) => setDistance(e.target.value)}
                        placeholder="Distance"
                        className="add-site-input"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="openinghour" className="block text-lg font-semibold mb-2">Opening Hours</label>
                    <select
                        id="openinghour"
                        value={openingHours}
                        onChange={(e) => setOpeningHours(e.target.value)}
                        className="add-site-input"
                        required
                    >
                        <option value="">Select Opening Hours</option>
                        <option value="9:00 AM - 5:00 PM">9:00 AM - 5:00 PM</option>
                        <option value="10:00 AM - 6:00 PM">10:00 AM - 6:00 PM</option>
                        <option value="11:00 AM - 7:00 PM">11:00 AM - 7:00 PM</option>
                        {/* Add more options as needed */}
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="categories" className="block text-lg font-semibold mb-2">Categories</label>
                    <select
                        id="categories"
                        value={categories}
                        onChange={(e) => setCategories(e.target.value)}
                        className="add-site-input"
                        required
                    >
                        <option value="">Select Categories</option>
                        <option value="Historical">Historical</option>
                        <option value="Natural">Natural</option>
                        <option value="Cultural">Cultural</option>

                    </select>
                </div>

                <label htmlFor="facilitiesAvailable" className="text-lg font-semibold mb-2">Facilities Available</label>
                <div className="mb-4 grid grid-cols-3">
                    <div>
                        <input
                            type="checkbox"
                            id="wifi"
                            value="Wifi"
                            checked={facilitiesAvailable.includes("Wifi")}
                            onChange={handleFacilityChange}
                        />
                        <label htmlFor="wifi">Wifi</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            id="parking"
                            value="Parking"
                            checked={facilitiesAvailable.includes("Parking")}
                            onChange={handleFacilityChange}
                        />
                        <label htmlFor="parking">Parking</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            id="restaurant"
                            value="Restaurant"
                            checked={facilitiesAvailable.includes("Restaurant")}
                            onChange={handleFacilityChange}
                        />
                        <label htmlFor="restaurant">Restaurant</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            id="restroom"
                            value="Restroom"
                            checked={facilitiesAvailable.includes("Restroom")}
                            onChange={handleFacilityChange}
                        />
                        <label htmlFor="Restroom">Restroom</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            id="shops"
                            value="Shops"
                            checked={facilitiesAvailable.includes("Shops")}
                            onChange={handleFacilityChange}
                        />
                        <label htmlFor="shops">Shops</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            id="bedrooms"
                            value="Bedrooms"
                            checked={facilitiesAvailable.includes("Bedrooms")}
                            onChange={handleFacilityChange}
                        />
                        <label htmlFor="bedrooms">Bedrooms</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            id="campgrounds"
                            value="Campgrounds"
                            checked={facilitiesAvailable.includes("Campgrounds")}
                            onChange={handleFacilityChange}
                        />
                        <label htmlFor="campgrounds">Campgrounds</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            id="firstaid"
                            value="First Aid Stations"
                            checked={facilitiesAvailable.includes("First Aid Stations")}
                            onChange={handleFacilityChange}
                        />
                        <label htmlFor="firstaid">First Aid Stations</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            id="picnic"
                            value="Picnic Areas"
                            checked={facilitiesAvailable.includes("Picnic Areas")}
                            onChange={handleFacilityChange}
                        />
                        <label htmlFor="picnic">Picnic Areas</label>
                    </div>
                </div>

                <div className="mb-4">
                    <label htmlFor="rating" className="block text-lg font-semibold mb-2">Rating</label>
                    <input
                        type="number"
                        id='rating'
                        min="0"
                        max='5'
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        placeholder="Rating"
                        className="add-site-input"
                        required
                    />
                </div>


                <label htmlFor="transportation" className="text-lg font-semibold mb-2">Transportations</label>
                <div className="mb-4 grid grid-cols-3">
                    <div>
                        <input
                            type="checkbox"
                            id="taxi"
                            value="Taxi"
                            checked={transportations.includes("Taxi")}
                            onChange={handleTransportationChange}
                        />
                        <label htmlFor="taxi">Taxi</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            id="bicycle"
                            value="Bicycle"
                            checked={transportations.includes("Bicycle")}
                            onChange={handleTransportationChange}
                        />
                        <label htmlFor="bicycle">Bicycle</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            id="publictransit"
                            value="Public Transit"
                            checked={transportations.includes("Public Transit")}
                            onChange={handleTransportationChange}
                        />
                        <label htmlFor="publictransit">Public Transit</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            id="train"
                            value="Train"
                            checked={transportations.includes("Train")}
                            onChange={handleTransportationChange}
                        />
                        <label htmlFor="train">Train</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            id="boat"
                            value="Boat"
                            checked={transportations.includes("Boat")}
                            onChange={handleTransportationChange}
                        />
                        <label htmlFor="boat">Boat</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            id="Pedestrian Walkways"
                            value="Pedestrian Walkways"
                            checked={transportations.includes("Pedestrian Walkways")}
                            onChange={handleTransportationChange}
                        />
                        <label htmlFor="Pedestrian Walkways">Pedestrian Walkways</label>
                    </div>
                </div>

                <div className='my-4 bg-slate-400 p-4'>
                <label htmlFor="imageInput" className='text-2xl'>Add Images That Describe The Site : </label>
                <input
                    type="file"
                    id="imageInput"
                    accept="image/*"
                    multiple
                    onChange={handleImagesChange}
                    />
                </div>

                <div className='my-4 bg-slate-400 p-4'>
                <label htmlFor="videoInput" className='text-2xl'>Add Videos That Describe The Site : </label>
                <input
                    type="file"
                    id="videoInput"
                    accept="video/*"
                    multiple
                    onChange={handleVideosChange}
                    />
                </div>


                <button
                    type="submit"
                    className="submit-button text-center"
                >
                    Add Site
                </button>
            </form>
        </div>
    );
};

export default AddSite;
