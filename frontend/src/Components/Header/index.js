import React from "react";
import './styles.css';
import TokenLabIcon from '../../Assets/TokenLabIcon-removebg-preview.png'
export default function Header(){
    return(
        <header>
            <img src={TokenLabIcon} alt="Token Lab Icon" />
            <div className="empty"></div>
        </header>
    );
}