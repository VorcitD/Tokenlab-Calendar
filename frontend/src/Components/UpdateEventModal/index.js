import React, { useState } from "react";
import './styles.css';
import { FiX } from 'react-icons/fi';
import api from "../../Services/api";

export default function UpdateEventModal({event,id='modal',onClose = ()=>{},children}){

    const [date, setDate] = useState('');

    const handleOutsideClick =(e)=>{
        if(e.target.id===id) onClose();
    }

    const [init_date, setInitDate] = useState(new Date());
    const [end_date, setEndDate] = useState(new Date());
    const [description, setDescription] = useState('');

    async function handleUpdateEvent(e) {
        e.preventDefault();

        console.log('chamou a função')

        const data = {
            init_date,
            end_date,
            description
        }

        console.log({data});

        const token = localStorage.getItem('token')
        api.defaults.headers.Authorization = `Bearer ${token}`;
        console.log({event});
        try {
            const response = await api.put(`/events/${event}`, data);
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
                    <input className="update-event-input" type="datetime-local" placeholder="Data e hora de inicio" 
                    value={init_date}
                    onChange={e => setInitDate(e.target.value)}
                    />
                    <h2>Data e Hora de Término</h2>
                    <input className="update-event-input" type="datetime-local" placeholder="Data e hora de término" 
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