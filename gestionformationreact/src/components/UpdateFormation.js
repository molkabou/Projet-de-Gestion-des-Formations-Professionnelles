import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
const UpdateFormation = () => {
    const { id } = useParams();
    const [formationData, setFormationData] = useState({
        titre: '',
        description: '',
        domaine: '',
        duree: '',
        dateDebut: '',
        dateFin: '',
        formateur: '',
        participants: [],
        prix: '',
        lieu: ''
    });

    const [formateurs, setFormateurs] = useState([]);

    useEffect(() => {
        const fetchFormation = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/formations/${id}`);
                setFormationData(response.data);
            } catch (error) {
                console.error('Error fetching formation:', error);
            }
        };
        fetchFormation();

        const fetchFormateurs = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/formateurs');
                setFormateurs(response.data);
            } catch (error) {
                console.error('Error fetching formateurs:', error);
            }
        };
        fetchFormateurs();
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormationData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/formations/${id}`, formationData);
            alert('Formation updated successfully!');
        } catch (error) {
            console.error('Error updating formation:', error);
            alert('Error updating formation. Please try again.');
        }
    };


    return (
        <div className="container">
       
            <h2>Update Formation</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Titre:
                    <input
                        type="text"
                        name="titre"
                        value={formationData.titre}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Description:
                    <textarea
                        name="description"
                        value={formationData.description}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Domaine:
                    <input
                        type="text"
                        name="domaine"
                        value={formationData.domaine}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Durée:
                    <input
                        type="text"
                        name="duree"
                        value={formationData.duree}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Date de début:
                    <input
                        type="date"
                        name="dateDebut"
                        value={formationData.dateDebut}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Date de fin:
                    <input
                        type="date"
                        name="dateFin"
                        value={formationData.dateFin}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                Formateur:
                    <select name="formateur" value={formationData.formateur} onChange={handleChange} required>
                        <option value="">Sélectionner un formateur</option>
                        {formateurs.map(formateur => (
                            <option key={formateur._id} value={formateur._id}>
                                {formateur.nom} {formateur.prenom}
                            </option>
                        ))}
                    </select>
                </label>
                <br />
                <label>
                    Prix:
                    <input
                        type="text"
                        name="prix"
                        value={formationData.prix}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Lieu:
                    <input
                        type="text"
                        name="lieu"
                        value={formationData.lieu}
                        onChange={handleChange}
                    />
                </label>
                <br />
                {/* Ajoutez les autres champs ici */}
                <button type="submit">Update Formation</button>
            </form>
        </div>
    );
};

export default UpdateFormation;
