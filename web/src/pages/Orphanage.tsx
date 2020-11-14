import React, { useEffect, useState } from "react";
import { FiClock, FiInfo } from "react-icons/fi";
import GoogleMapReact from 'google-map-react'
import { useParams } from "react-router-dom";

import "../styles/pages/orphanage.css";
import Marker from "../components/Marker";
import Sidebar from "../components/Sidebar";
import api from "../services/api";


interface Orphanage {
  name: string;
  about: string;
  latitude: number;
  longitude: number;
  instructions: string;
  opening_hours: string;
  open_on_weekends: string;
  images: Array<{
    id: number;
    url: string;
  }>;
}

interface OrphanageParams {
  id: string;
}

export default function Orphanage() {
  const params = useParams<OrphanageParams>();
  const [orphanage, setOrphanage] = useState<Orphanage>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);


  useEffect(() => {
    console.log(params.id)
    api.get(`orphanage/${params.id}`)
      .then(response => setOrphanage(response.data))
  }, [params.id])


  if(!orphanage) {
    return <p>Carregando</p>
  }

  
  return (
    <div id="page-orphanage">
      <Sidebar />

      <main>
        <div className="orphanage-details">
          <img
            src={orphanage.images[activeImageIndex].url}
            alt={orphanage.name}
          />

          <div className="images">
            {orphanage.images.map((image, index )=> (
              <button
              key={image.id}
              className={activeImageIndex === index ? "active" : ""}
              type="button"
              onClick={() => setActiveImageIndex(index)}
              >
              <img src={image.url} alt={orphanage.name}/>
              </button>
            ))}
          </div>

          <div className="orphanage-details-content">
            <h1>{orphanage.name}</h1>
            <p>{orphanage.about}</p>

            <div className="map-container">
                <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_KEY || '' }}
                defaultCenter={{ lat: orphanage.latitude, lng: orphanage.longitude }}
                defaultZoom={15}>  
                    <Marker 
                        lat={ orphanage.latitude }
                        lng={ orphanage.longitude }
                        id={1}
                        isInteractive={false}/>
            </GoogleMapReact> 

              <footer>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`}
                >
                  Ver rotas no Google Maps
                </a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{orphanage.instructions}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                {orphanage.opening_hours}
              </div>

              { orphanage.open_on_weekends ? (
                <div className="open-on-weekends">
                    <FiInfo size={32} color="#39CC83" />
                    Atendemos <br />
                    fim de semana
                </div>
              ) : (
                <div className="open-on-weekends dont-open">
                  <FiInfo size={32} color=" #ff669d" />
                  Não atendemos <br />
                  fim de semana
                </div>
              ) }
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}