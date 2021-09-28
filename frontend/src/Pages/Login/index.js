import React,{useState} from "react";
import './styles.css';
import { Link,useHistory } from 'react-router-dom';
import Header from "../../Components/Header";
import api from '../../Services/api';

export default function Login() {
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const history = useHistory();
    
    async function handleLogin(e){
        e.preventDefault();

        const data ={
            email,
            password
        }

        try{
            const response = await api.post('/sessions',data);
            localStorage.setItem('token',response.data.token)
            history.push('/events')
        }catch(err){
            alert('O usuário ou a senha estão incorretos');
        }

    }

    return (
            <div className="background">
            <Header />
                <div className="login-container">
                    <section className="form">
                        <h1>Faça seu Login</h1>
                        <form className="login-form" onSubmit={handleLogin}>
                            <input placeholder="Email" type="email" 
                            value={email}
                            onChange={(e)=>{setEmail(e.target.value)}}
                            />
                            <input placeholder="Senha" type="password" 
                            value={password}
                            onChange={(e)=>{setPassword(e.target.value)}}
                            />
                            <button className="button-signin" type="submit">Entrar</button>

                            <Link to="/register">Não tenho cadastro</Link>
                        </form>

                    </section>
                </div>
            </div>
    );
}