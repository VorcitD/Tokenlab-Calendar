import React, { useState } from "react";
import './styles.css';
import { FiX } from 'react-icons/fi';
import api from "../../Services/api";


export default function NewEventModal({ id = "modal", onClose = () => { }, children }) {


    const [init_date, setInitDate] = useState(new Date());
    const [end_date, setEndDate] = useState(new Date());
    const [description, setDescription] = useState('');

    async function handleCreateEvent(e) {
        e.preventDefault();

        const data = {
            init_date,
            end_date,
            description
        }

        try {
            await api.post('/events', data);
            onClose();
        } catch (error) {
            alert('Erro no cadastro de evento');
        }
    }

    const handleOutsideClick = (e) => {
        if (e.target.id === id) onClose();
    }


    return (
        <div id={id} className="modal" onClick={handleOutsideClick}>
            <div className="modal-container">
                <div className="top-modal-container">
                    <h1>Cadastre um novo evento</h1>
                    <div className="close-button">
                        <FiX onClick={onClose}></FiX>
                    </div>
                </div>
                <div className="new-event-form-container">
                    <form className="new-event-form" onSubmit={handleCreateEvent}>
                        <h2>Data e Hora de Inicio</h2>
                        <input className="event-input" type="datetime-local" placeholder="Data e hora de inicio"
                            value={init_date}
                            onChange={e => setInitDate(e.target.value)}
                        />
                        <h2>Data e Hora de Término</h2>
                        <input className="event-input" type="datetime-local" placeholder="Data e hora de término"
                            value={end_date}
                            onChange={e => setEndDate(e.target.value)}
                        />
                        <h2>Descrição do Evento</h2>
                        <input className="event-input" type="text" placeholder="Descrição"
                            value={description}
                            onChange={e => setDescription(e.target.value)} />
                        <button className="submit-event" type="submit">Cadastrar</button>
                    </form>
                </div>
            </div>
        </div>
    )

}