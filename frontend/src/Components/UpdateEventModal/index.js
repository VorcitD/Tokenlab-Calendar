import React, { useState ,useEffect} from "react";
import './styles.css';
import { FiX } from 'react-icons/fi';
import api from "../../Services/api";

export default function UpdateEventModal({event,id='modal',onClose = ()=>{},children}){


    const handleOutsideClick =(e)=>{
        if(e.target.id===id) onClose();
    }

    const [init_date, setInitDate] = useState('');
    const [end_date, setEndDate] = useState('');
    const [description, setDescription] = useState('');

    useEffect(()=>{
        setInitDate(event.init_date);
        setEndDate(event.end_date);
        setDescription(event.description);
    },[event]);

    async function handleUpdateEvent(e) {
        e.preventDefault();


        const data = {
            init_date,
            end_date,
            description
        }

        localStorage.getItem('token')
        try {
            await api.put(`/events/${event.id}`, data);
            onClose();
        } catch (error) {
            alert('Erro na atualização de evento');
        }
    }

    return (
        <div id='modal' className="modal" onClick={handleOutsideClick}>
            <div className="update-event-modal-container">
                <div className="update-event-top-modal-container">
                    <h1>Edite o seu evento</h1>
                    <div className="update-event-close-button">
                    <FiX onClick={onClose}></FiX>
                    </div>
                </div>
                <div className="update-event-form-container">
                    <form onSubmit={handleUpdateEvent} className="update-event-form">
                    <h2>Data e Hora de Inicio</h2>
                    <input className="update-event-input" type="datetime-local"  
                    value={init_date}
                    onChange={e => setInitDate(e.target.value)}
                    />
                    <h2>Data e Hora de Término</h2>
                    <input className="update-event-input" type="datetime-local"  
                    value={end_date}
                    onChange={e => setEndDate(e.target.value)}
                    />
                    <h2>Descrição do Evento</h2>
                    <input className="update-event-input" type="text" placeholder="Descrição" 
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    />
                    <button className="submit-event" type="submit">Atualizar</button>
                    </form>
                </div>
            </div>
        </div>
    )

}