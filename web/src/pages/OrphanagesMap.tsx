import React, {useState, useEffect} from 'react'
import GoogleMapReact from 'google-map-react'

import { Link } from 'react-router-dom'

import 'leaflet/dist/leaflet.css'

import { FiPlus } from 'react-icons/fi'
import mapMarkerImg from '../images/map-marker.svg'
import '../styles/pages/orphanages-map.css'
import Marker from '../components/Marker'
import api from '../services/api'

interface Orphanage {
  id: number,
  latitude: number,
  longitude: number,
  name: string
}

const OrphanagesMap: React.FC = () => {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([])

  useEffect(() => {
    api.get('orphanages')
      .then(response => setOrphanages(response.data))
  }, [])

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="Happy"/>

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visite {':)'}</p>
        </header>

        <footer>
          <strong>Osório</strong>
          <span>Rio grande do Sul</span>
        </footer>
      </aside>

      <Link to='/orphanages/create' className='create-orphanage'>
        <FiPlus size={32} color='#FFF'/>
      </Link>

      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_KEY || '' }}
          defaultCenter={{ lat: -29.8949111, lng: -50.2647751 }}
          defaultZoom={15}
        >
          {orphanages.map(orphanage => (
              <Marker 
              key={orphanage.id}
              lat={orphanage.latitude}
              lng={orphanage.longitude}
              id={orphanage.id}>
                  {orphanage.name}
            </Marker>
          ))}
        </GoogleMapReact>
      </div>
    </div>
  )
}

export default OrphanagesMap
