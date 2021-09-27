import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './styles.css';
import api from '../../Services/api';

export default function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    async function handleSignUp(e) {
        e.preventDefault();
        const data = {
            name,
            email,
            password
        };
        try {
            const response = await api.post('/users', data);
            alert(`${response.data.message}`)
            history.push('/')
        } catch(err) {
            alert('Email já está cadastrado')
        }
    }

    return (
        <div className="signup-container">

            <div className="form-container">
                <section className="form">
                    <form className="form" onSubmit={handleSignUp}>
                        <h1 className="SignUp">Bem vindo!</h1>

                        <p className="SignUp">Crie sua conta preenchendo os campos abaixo</p>

                        <input className="SignUp"
                            type="text"
                            placeholder="Nome Completo"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />

                        <input className="SignUp"
                            type="email"
                            placeholder="E-mail"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />

                        <input className="SignUp"
                            type="password"
                            placeholder="Senha"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />

                        <div className="usertype-container">
                        </div>
                        <button className="button-signup" type="submit">Cadastrar</button>
                        <Link to='/'>Já tenho cadastro</Link>

                    </form>
                </section>
            </div>
        </div>
    );
}