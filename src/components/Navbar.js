import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <h1>Pokémon App</h1>
            <ul>
                <li><Link to="/">Home</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
