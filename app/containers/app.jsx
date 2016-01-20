import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header.jsx';

const App = (props) => {

    return (
        <div>
            <Header />
            <div className="main">
                {props.children}
            </div>
        </div>
    )
}

export default App