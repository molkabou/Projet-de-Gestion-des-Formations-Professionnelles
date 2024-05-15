import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
const UpdateFormateur = () => {
    const { id } = useParams();
    const [formateurData, setFormateurData] = useState({
        nom: '',
        prenom: '',
        adresse: '',
        matricule: '',
        dateNaissance: '',
        numTelephone: ''
    });

    useEffect(() => {
        const fetchFormateur = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/formateurs/${id}`);
                setFormateurData(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération du formateur:', error);
            }
        };
        fetchFormateur();
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormateurData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/formateurs/${id}`, formateurData);
            alert('Formateur mis à jour avec succès!');
        } catch (error) {
            console.error('Erreur lors de la mise à jour du formateur:', error);
            alert('Erreur lors de la mise à jour du formateur. Veuillez réessayer.');
        }
    };

    return (
        <div className="container">
        
            <h2>Modifier le Formateur</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Nom:
                    <input
                        type="text"
                        name="nom"
                        value={formateurData.nom}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Prénom:
                    <input
                        type="text"
                        name="prenom"
                        value={formateurData.prenom}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Adresse:
                    <input
                        type="text"
                        name="adresse"
                        value={formateurData.adresse}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Matricule:
                    <input
                        type="text"
                        name="matricule"
                        value={formateurData.matricule}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Date de Naissance:
                    <input
                        type="date"
                        name="dateNaissance"
                        value={formateurData.dateNaissance}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Numéro de Téléphone:
                    <input
                        type="text"
                        name="numTelephone"
                        value={formateurData.numTelephone}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <button type="submit">Mettre à jour le Formateur</button>
            </form>
        </div>
    );
};

export default UpdateFormateur;
