import React, { useRef, useState } from "react";
import HeadTitle from "../../Components/HeadTitle";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from 'leaflet'
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";
import MySection from "../../Components/MySection";

const Coverage = () => {
  const districts = useLoaderData();
  const mapRef = useRef(null);
  const [userLocation, setUserLocation] = useState(null);
  const [error, setError] = useState(null);

  const myLocationIcon = new L.icon({
    iconUrl: 'https://img.icons8.com/color/48/marker--v1.png',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  })

  const handleSearch = (e) => {
    e.preventDefault();
    const search = e.target.search.value;
    console.log(search);
    const findSearch = districts.find((center) =>
      center.district.toLowerCase().includes(search)
    );
    console.log(findSearch);
    if (findSearch) {
      const crop = [findSearch.latitude, findSearch.longitude];
      console.log(crop);
      mapRef.current.flyTo(crop, 11);
    }
  };

  const handleLocation = () => {
    if (!navigator.geolocation) {
      setError("Your browser does not support geolocation.");
      return;
    }

    navigator.geolocation.getCurrentPosition((position) => {
      setUserLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    }),
      (err) => {
        setError("Location access denied or unavailable.");
      }
  };

  console.log(userLocation, error);

  return (
    <MySection>
      {/* title and searching */}
      <div className="mb-5">
        <HeadTitle>We are available in 64 districts</HeadTitle>

        <form onSubmit={handleSearch} className="mt-6">
          <label className="input border-none !pr-0 rounded-full outline-primary">
            <svg
              className="h-[1.5em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              type="search"
              required
              name="search"
              placeholder="Search"
              className=""
            />
            <button className="my_btn !rounded-full">Search</button>
          </label>
        </form>

        {/* nearest center */}
        <div className="mt-4">
          <button onClick={handleLocation} className="my_btn">Nearest Center</button>
        </div>

        <hr className="border-t-2 border-gray-400 my-10" />

        <h4 className="text-xl md:text-2xl font-extrabold text-secondary">
          We deliver almost all over Bangladesh
        </h4>
      </div>

      {/* map */}
      <div className="h-[500px] w-full rounded-2xl overflow-hidden">
        <MapContainer
          center={[23.685, 90.3563]}
          zoom={8}
          scrollWheelZoom={false}
          className="h-[500px] w-full"
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {districts.map((district, i) => (
            <Marker key={i} position={[district.latitude, district.longitude]}>
              <Popup>
                <span className="text-xl font-semibold">
                  {district.district}.
                </span>{" "}
                <br /> {district.covered_area.map((item) => `${item}, `)}
              </Popup>
            </Marker>
          ))}

          {
            userLocation && 
            
            <Marker position={[userLocation.lat, userLocation.lng]} icon={myLocationIcon}>
              <Popup>
                {/* <span className="text-xl font-semibold">
                  {district.district}.
                </span>{" "}
                <br /> {district.covered_area.map((item) => `${item}, `)} */}
                My Location
              </Popup>
            </Marker>
          }
        </MapContainer>
      </div>
    </MySection>
  );
};

export default Coverage;
