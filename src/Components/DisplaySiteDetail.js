import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

const SiteDetails = () => {
    const [site, setSite] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const {siteName}=useParams()


    useEffect(() => {
        const fetchSite = async () => {
            try {
                const response = await fetch('http://localhost:4000/site/get/'+siteName);
                if (!response.ok) {
                    throw new Error('Failed to fetch site data');
                }
                const data = await response.json();
                setSite(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchSite();
    }, [siteName]);

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    if (!site) {
        return <div className="text-center">No site data available</div>;
    }

    return (
        <div className="site-details p-4 max-w-3xl mx-auto bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold mb-4">{site.siteName}</h1>
            <p className="text-gray-700 mb-4">{site.description}</p>
            <div className="location mb-4">
                <h2 className="text-xl font-semibold mb-2">Location</h2>
                <p>{site.location.address}</p>
                <p>Coordinates: {site.location.coordinates.join(', ')}</p>
            </div>
            <div className="facilities mb-4">
                <h2 className="text-xl font-semibold mb-2">Facilities Available</h2>
                <ul className="list-disc list-inside">
                    {site.facilitiesAvailable.map((facility, index) => (
                        <li key={index}>{facility}</li>
                    ))}
                </ul>
            </div>
            <div className="rating mb-4">
                <h2 className="text-xl font-semibold mb-2">Rating</h2>
                <p>{site.rating}/5</p>
            </div>
            <div className="media mb-4">
                <h2 className="text-xl font-semibold mb-2">Images</h2>
                <div className="flex flex-wrap">
                    {site.images.map((base64Image, index) => (
                        <img
                            key={index}
                            src={`data:image/jpeg;base64,${base64Image}`}
                            alt={`Site image ${index + 1}`}
                            className="w-32 h-32 object-cover m-2"
                        />
                    ))}
                </div>
                <h2 className="text-xl font-semibold mb-2 mt-4">Videos</h2>
                <ul className="list-disc list-inside">
                {site.videos.map((base64Video, index) => (
                        <video
                            key={index}
                            controls
                            className="w-64 h-64 object-cover m-2"
                        >
                            <source src={`data:video/mp4;base64,${base64Video}`} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    ))}
                </ul>
            </div>
            <div className="transportations mb-4">
                <h2 className="text-xl font-semibold mb-2">Transportations</h2>
                <ul className="list-disc list-inside">
                    {site.transportations.map((transport, index) => (
                        <li key={index}>{transport}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SiteDetails;
