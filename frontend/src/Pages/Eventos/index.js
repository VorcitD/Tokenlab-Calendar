import React,{useState,useEffect} from "react";
import { Link } from 'react-router-dom';
import Header from '../../Components/Header';
import './styles.css';
import { FiEdit, FiTrash } from 'react-icons/fi';
import NewEventModal from "../../Components/NewEventModal";
import UpdateEventModal from "../../Components/UpdateEventModal";
import api from "../../Services/api";


export default function Eventos() {
    const [isNewEventModalVisible,setIsNewEventModalVisible]=useState(false);
    const [isUpdateEventModalVisible,setIsUpdateEventModalVisible]=useState(false);
    const [events,setEvents] = useState([]);
    const [selectedEventId,setSelectedEventId]=useState('');

    const token = localStorage.getItem('token');

    useEffect(()=>{
        api.get('events',{headers:{
            Authorization:`Bearer ${token}`
        }}).then(response =>{
            setEvents(response.data);
        })
    },[token,events]);

    async function handleDeleteEvent(id){
        try{
            await api.delete(`events/${id}`)
        }catch(error){
            alert('Erro ao deletar o caso');
        }
    }

    function handleUpdateEvent(event){
        console.log(event.id)
        setSelectedEventId(event.id)
        console.log(selectedEventId)
        setIsUpdateEventModalVisible(true)
    }

    return (
        <div>
            <Header></Header>
            <div className="event-calendar-container">
            {isNewEventModalVisible?<NewEventModal  onClose={()=>setIsNewEventModalVisible(false)}/>:null}
            {isUpdateEventModalVisible?<UpdateEventModal event={selectedEventId} onClose={()=>setIsUpdateEventModalVisible(false)}/>:null}
                <div className="top-container">
                    <h1 className="title">Calendário de Eventos</h1>
                    <button className="button-submit-event" onClick={()=>setIsNewEventModalVisible(true)}>Novo Evento</button>
                </div>
                <div className="month-calendar">
                    <h1>Setembro</h1>
                </div>
                <div className="calendar-container">

                    {events.map(event=>{
                        const [date,init_time]= event.init_date.split('T');
                        const [end_date,end_time]= event.end_date.split('T');
                        const [year,month,day]=date.split('-');
                        const [init_time_nozone,] = init_time.split('.');
                        const [end_time_nozone,] = end_time.split('.');

                        const dateUTC = new Date(date).toUTCString();
                        const monthName = dateUTC.split(' ');
                        return(
                            <div id={event.id} className="event-card">
                            <div className="day-card">
                                <h1 className="day">{day}/{monthName[2]}</h1>
                            </div>
                            <div className="description-card">
                                <ul>
                                    <li>Hora de inicio:{init_time_nozone}</li>
                                    <li>Hora de término:{end_time_nozone}</li>
                                </ul>
                                <p>{event.description}</p>
                            </div>
                            <div className="actions-card">
                                <FiEdit className="icon" onClick={()=>handleUpdateEvent(event)}></FiEdit>
                                <FiTrash onClick={()=>handleDeleteEvent(event.id)} className="icon"></FiTrash>
                            </div>
                        </div>
                        )}
                    )}
                   
                </div>
            </div>
        </div>
    );
}