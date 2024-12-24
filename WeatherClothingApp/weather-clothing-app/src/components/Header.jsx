import React, { useState } from "react";
import { Collapse } from "react-bootstrap";
import { FaChevronDown, FaChevronUp } from "react-icons/fa"
import WeatherForm from "../components/WeatherForm";

const Header = ({ onSubmit, coordinates }) => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <div className={`header ${isOpen ? 'expanded' : ''}`}>
            <div className="header-toggle" onClick={toggleMenu}>
                <span>Clothing Recommedation</span> 
                {isOpen? <FaChevronUp /> : <FaChevronDown />}   
            </div>
            <Collapse in={isOpen}>
                <div className={`header-content ${isOpen ? 'show' : 'hide'}`}>
                    <WeatherForm onSubmit={onSubmit} coordinates={coordinates} />
                </div>
            </Collapse>
        </div>
    );
};

export default Header;
