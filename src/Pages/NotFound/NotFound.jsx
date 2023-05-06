import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div style={{ backgroundColor: 'deepskyblue', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ textAlign: 'center' }}>
                <h1 style={{ fontSize: '6rem', marginBottom: '0' }}>404</h1>
                <h2 style={{ fontSize: '2rem', marginTop: '0' }}>Page not found</h2>
                <p style={{ fontSize: '1.2rem' }}>Oops! The page you are looking for does not exist.</p>
                <Link to="/" style={{ fontSize: '1.2rem' }}><button style={{ border: 'none', cursor: 'pointer' }}>Back To Home Page</button></Link>
            </div>
        </div>
    );
}

export default NotFound;
