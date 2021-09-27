import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import Eventos from './Pages/Eventos';

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login}/>
                <Route path="/register" component={SignUp}/>
                <Route path="/events" component={Eventos}/>
            </Switch>
        </BrowserRouter>
    )
};