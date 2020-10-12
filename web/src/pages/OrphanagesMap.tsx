import React from 'react'
import GoogleMapReact from 'google-map-react'

import { Link } from 'react-router-dom'
// import { Map, TileLayer } from 'react-leaflet'

import 'leaflet/dist/leaflet.css'

import { FiPlus } from 'react-icons/fi'
import mapMarkerImg from '../images/map-marker.svg'
import '../styles/pages/orphanages-map.css'

const OrphanagesMap: React.FC = () => {
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

      <Link to='' className='create-orphanage'>
        <FiPlus size={32} color='#FFF'/>
      </Link>

      {/* <Map
        center={[-29.8949111, -50.2647751]}
        zoom={15}
        style={{ width: '100%', height: '100%' }}>
        <TileLayer url='https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'/>
      </Map> */}

      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_KEY || '' }}
          defaultCenter={{ lat: -29.8949111, lng: -50.2647751 }}
          defaultZoom={15}
        >
        </GoogleMapReact>
      </div>
    </div>
  )
}

export default OrphanagesMap
