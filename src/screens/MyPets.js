// Library imports
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import { Button } from "@mui/material";
import { Container, Card, CardContent } from "@mui/material";


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

    const petRemoveButtonHandler = (petId) => {
       
    };

    return (

        <>

            <Container>

                <h1>Your Pets</h1>

                {loadedPets &&
                    loadedPets.map((pet) => {
                        return (
                            <>
                                <Card sx={{ my: 2 }}>
                                    <CardContent>
                                        <h2 key={pet.name}>{pet.name}</h2>
                                        <p key={pet.age}>Age: {pet.age}</p>
                                        <p key={pet.breed}>Breed: {pet.breed}</p>
                                        <Button
                                            key={pet._id}
                                            variant="contained"
                                            type="submit"
                                            margin="normal"
                                            onClick={() => petEditButtonHandler(pet._id)}
                                            sx={{ mr:1 }}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            key={pet._id}
                                            variant="contained"
                                            type="submit"
                                            margin="normal"
                                            onClick={() => petRemoveButtonHandler(pet._id)}
                                        >
                                            Remove
                                        </Button>
                                    </CardContent>
                                </Card>
                            </>
                        );
                    })}
            </Container>
        </>
    );
};

export default MyPets;
