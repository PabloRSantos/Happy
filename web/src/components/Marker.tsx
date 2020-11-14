import React, { useState } from 'react';

import { FiArrowRight} from 'react-icons/fi'

import '../styles/components/Marker.css'

import mapMarker from '../images/map-marker.svg'
import { Link } from 'react-router-dom';

interface IMarker {
    lat: number,
    lng: number,
    id: number,
    isInteractive?: boolean
}

const Marker: React.FC<IMarker> = ({children, id, isInteractive = true}) => {
  const [visibleModal, setVisibleModal] = useState(false)

  return (
    <div className='markerComponent'
      onMouseOver={() => isInteractive && setVisibleModal(true)}
      onMouseOut={() => isInteractive && setVisibleModal(false)}>
      
      <img style={{ marginTop: "-50px"}}
        src={mapMarker}
        alt="Marker"/>

      <div className={`popup ${visibleModal && "show"}`}>
        {children}
        <Link to={`/orphanage/${id}`}>
          <FiArrowRight size={32} color="#fff"/>
        </Link>
      </div>
    </div>
  )
}

export default Marker;