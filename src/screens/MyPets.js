// Library imports
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import { Button } from "@mui/material";

const MyPets = (props) => {
    const [loadedPets, setLoadedPets] = useState();

    const params = useParams();
    const navigate = useNavigate();
    const userId = params.userId;

    useEffect(() => {
        axios
            .get(`http://localhost:8082/user/${userId}/all-pets`)
            .then((response) => {
                setLoadedPets(response.data.pets);
            });
    }, [userId]);

    const petEditButtonHandler = (petId) => {
        navigate(`/${petId}/edit`);
    };

    return (
        <>
            <h1>Your Pets</h1>
            {loadedPets &&
                loadedPets.map((pet) => {
                    return (
                        <>
                            <h2 key={pet.name}>{pet.name}</h2>
                            <p key={pet.age}>{pet.age}</p>
                            <p key={pet.breed}>{pet.breed}</p>
                            <Button
                                key={pet._id}
                                variant="contained"
                                type="submit"
                                margin="normal"
                                onClick={() => petEditButtonHandler(pet._id)}
                            >
                                Edit
                            </Button>
                        </>
                    );
                })}
        </>
    );
};

export default MyPets;
