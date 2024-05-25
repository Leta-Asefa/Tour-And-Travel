import React, { useState, useEffect } from 'react';

const SiteIntro = () => {
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSites = async () => {
      try {
        const response = await fetch('http://localhost:4000/site/getIntro', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials:'include'
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data)
        setSites(data);
        setLoading(false);

      } catch (error) {

        console.error('Error fetching sites:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchSites();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className='site-intro-card'>
      
      {sites.map((site, index) => (
        <div  key={index} className="text-center  w-52 h-auto hover:border-2 border-black  rounded-xl p-1" >
          <div>
            <img className='site-intro-image' src={`data:image/jpeg;base64,${site.images}`} alt={`${site.siteName}`} />
          </div>
          <h2>{site.siteName}</h2>
          <p className='site-intro-description'>{site.description}</p>
          <p>Rating: {site.rating}</p>
          <div>
            Categories: {site.categories}
          </div>
         <a href={`/sitedetails/${site.siteName}`}><button className='submit-button'>See More . . .</button></a> 
        </div>
      ))}
    </div>
  );
};

export default SiteIntro;
