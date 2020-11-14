import React, { ChangeEvent, FormEvent, useState } from 'react';
import Marker from '../components/Marker';
import GoogleMapReact, {ClickEventValue} from 'google-map-react'

import '../styles/pages/create-orphanage.css'
import { FiPlus } from 'react-icons/fi';
import Sidebar from '../components/Sidebar';
import api from '../services/api';
import { useHistory } from 'react-router-dom';


const CreateOrphanage: React.FC = () => {
    const history = useHistory()

    const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
    const [name, setName] = useState("");
    const [about, setAbout] = useState("");
    const [instructions, setInstructions] = useState("");
    const [opening_hours, setOpeningHours] = useState("");
    const [open_on_weekends, setOpenOnWeekends] = useState(true);
    const [images, setImages] = useState<File[]>([]);
    const [previewImages, setPreviewImages] = useState<string[]>([]);

    const handleSelectImages = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return  
      
        const selectedImages = Array.from(event.target.files)
        setImages([...images, ...selectedImages])

        const selectedImagesPreview = selectedImages.map(image => URL.createObjectURL(image))
        setPreviewImages([...previewImages, ...selectedImagesPreview])
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()

        const data = new FormData()

         const { latitude, longitude } = position

         data.append('name', name)
         data.append('about', about)
         data.append('latitude', String(latitude))
         data.append('longitude', String(longitude))
         data.append('instructions', instructions)
         data.append('open_hours', opening_hours)
         data.append('open_on_weekends', String(open_on_weekends))

         images.forEach(image => data.append('images', image))
      try {
        await api.post('orphanages', data)
        
      } catch (error) {
        console.log(error) 
      }

        alert('Cadastro feito com sucesso')

        history.push('/app')
    }

    const handleMapClick = (event: ClickEventValue) => {
        setPosition({latitude: event.lat, longitude: event.lng})
    }

  return (
    <div id="page-create-orphanage">
      <Sidebar />

      <main>
        <form onSubmit={handleSubmit} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

          <div className="map-container">
            <GoogleMapReact
              bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_KEY || '' }}
              defaultCenter={{ lat: -29.8949111, lng: -50.2647751 }}
              defaultZoom={15}
              onClick={handleMapClick}>
                {position.latitude !== 0 && (
                  <Marker 
                  lat={ position.latitude }
                  lng={ position.longitude }
                  id={1}
                  isInteractive={false}/>
                )}
          </GoogleMapReact>
        </div>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">
                Sobre <span>Máximo de 300 caracteres</span>
              </label>
              <textarea
                id="about"
                maxLength={300}
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {previewImages.map((image) => <img key={image} src={image} alt={name} />)}

                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>

              <input
                multiple
                onChange={handleSelectImages}
                type="file"
                id="image[]"
              />
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea
                id="instructions"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de funcionamento</label>
              <input
                id="opening_hours"
                value={opening_hours}
                onChange={(e) => setOpeningHours(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button
                  type="button"
                  className={open_on_weekends ? "active" : ""}
                  onClick={() => setOpenOnWeekends(true)}
                >
                  Sim
                </button>
                <button
                  type="button"
                  className={!open_on_weekends ? "active" : ""}
                  onClick={() => setOpenOnWeekends(false)}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  )
}

export default CreateOrphanage;