import React from 'react';
import { Link } from 'react-router';

const Header = () => {
    return (
        <header className="clearfix">
            React App Demo
            <nav className="clearfix">
                <div className="nav-item">
                    <Link to="Home">Home</Link>
                </div>
                <div className="nav-item">
                    <Link to="Info">Info</Link>
                </div>
            </nav>
        </header>
    )
}

export default Header;  