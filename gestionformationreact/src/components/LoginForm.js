import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Importer Link depuis react-router-dom

const LoginForm = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            if (!username || !password) {
                setError('Veuillez saisir un nom d\'utilisateur et un mot de passe.');
                return;
            }
            const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
            const { token , role} = response.data;
            localStorage.setItem('token', token); 
            localStorage.setItem('userRole', role);// Save the token to local storage
            window.location.href = '/';
            alert('Connexion réussie !');
            window.location.href = '/blog';
            setUsername('');
            setPassword('');
            if (typeof onLogin === 'function') {
                onLogin();
            }
        } catch (error) {
            console.error('Erreur lors de la connexion :', error);
            setError('Une erreur s\'est produite lors de la connexion.');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Connexion</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <div>
                    <input
                        type="text"
                        placeholder="Nom d'utilisateur"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Se connecter</button>
            </form>
            <p>Vous n'avez pas de compte ? <Link to="/register">Inscrivez-vous ici</Link></p>
        </div>
    );
};

export default LoginForm;
