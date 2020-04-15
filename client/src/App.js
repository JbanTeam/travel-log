import React, { useState, useEffect } from 'react';
import ReactMapGl, { Marker, Popup } from 'react-map-gl';
import listLogEntries from './API';
import LogEntryForm from './LogEntryForm';

const App = () => {
  const [logEntries, setLogEntries] = useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [addEntryLocation, setAddEntryLocation] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 55.75,
    longitude: 37.62,
    zoom: 2,
    bearing: 0,
    pitch: 0,
  });

  const getEntries = async () => {
    const logEntries = await listLogEntries();
    console.log(logEntries);
    
    setLogEntries(logEntries);
  }

  useEffect(() => {
    getEntries();
  }, []);

  const showAddMarkerPopup = (e) => {
    const [longitude, latitude] = e.lngLat;
    setAddEntryLocation({
      latitude,
      longitude,
    });
  };

  return (
    <ReactMapGl
      {...viewport}
      width="100vw"
      height="100vh"
      mapStyle="mapbox://styles/mapbox/dark-v9"
      onViewportChange={setViewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onDblClick={showAddMarkerPopup}>
      {logEntries.map((entry) => (
        <React.Fragment key={entry._id}>
          <Marker latitude={entry.latitude} longitude={entry.longitude}>
            <div
              onClick={() =>
                setShowPopup({
                  // ...showPopup,
                  [entry._id]: true,
                })
              }>
              <svg
                className="marker yellow"
                style={{
                  height: '35px',
                  width: '35px',
                }}
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 512 512"
                space="preserve">
                <g>
                  <g>
                    <path
                      d="M256,0C153.755,0,70.573,83.182,70.573,185.426c0,126.888,165.939,313.167,173.004,321.035
                        c6.636,7.391,18.222,7.378,24.846,0c7.065-7.868,173.004-194.147,173.004-321.035C441.425,83.182,358.244,0,256,0z M256,278.719
                        c-51.442,0-93.292-41.851-93.292-93.293S204.559,92.134,256,92.134s93.291,41.851,93.291,93.293S307.441,278.719,256,278.719z"
                    />
                  </g>
                </g>
              </svg>
            </div>
          </Marker>
          {showPopup[entry._id] ? (
            <Popup
              latitude={entry.latitude}
              longitude={entry.longitude}
              closeButton={true}
              closeOnClick={false}
              dynamicPosition={true}
              onClose={() => setShowPopup({})}
              anchor="top">
              <div className="popup">
                <h3>{entry.title}</h3>
                <p>{entry.comments}</p>
                <small>Visited on: {new Date(entry.visitDate).toLocaleDateString()}</small>
                {entry.image && <img src={entry.image} alt={entry.title} />}
              </div>
            </Popup>
          ) : null}
        </React.Fragment>
      ))}
      {addEntryLocation ? (
        <>
          <Marker latitude={addEntryLocation.latitude} longitude={addEntryLocation.longitude}>
            <div>
              <svg
                className="marker red"
                style={{
                  height: '35px',
                  width: '35px',
                }}
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 512 512"
                space="preserve">
                <g>
                  <g>
                    <path
                      d="M256,0C153.755,0,70.573,83.182,70.573,185.426c0,126.888,165.939,313.167,173.004,321.035
                        c6.636,7.391,18.222,7.378,24.846,0c7.065-7.868,173.004-194.147,173.004-321.035C441.425,83.182,358.244,0,256,0z M256,278.719
                        c-51.442,0-93.292-41.851-93.292-93.293S204.559,92.134,256,92.134s93.291,41.851,93.291,93.293S307.441,278.719,256,278.719z"
                    />
                  </g>
                </g>
              </svg>
            </div>
          </Marker>
          <Popup
            latitude={addEntryLocation.latitude}
            longitude={addEntryLocation.longitude}
            closeButton={true}
            closeOnClick={false}
            dynamicPosition={true}
            onClose={() => setAddEntryLocation(null)}
            anchor="top">
            <div className="popup">
              <LogEntryForm 
              onClose={() => {
                setAddEntryLocation(null);
                getEntries();
              }}
              location={addEntryLocation} />
            </div>
          </Popup>
        </>
      ) : null}
    </ReactMapGl>
  );
};

export default App;
