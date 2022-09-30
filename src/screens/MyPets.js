// Library imports
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Card, CardContent, Grid ,Button, Typography  } from "@mui/material";
import axios from "axios";


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

    const onNewPetHandler = (event) => {
        navigate("/newPet");
    };

    return (
        <Container>
            <Typography variant="h2" style={{ display: "inline-block" }}>Your Pets</Typography>

            <Grid container item justifyContent="flex-end">
                <Button variant="contained" onClick={onNewPetHandler} >New Pet</Button>
            </Grid>

            {loadedPets &&
                loadedPets.map((pet) => {
                    return (
                        <>
                            <Card sx={{ my: 2 }}>
                                <CardContent>
                                    <Typography variant="h3">{pet.name}</Typography>
                                    <Typography >Age: {pet.age}</Typography>
                                    <Typography >Breed: {pet.breed}</Typography>
                                    
                                    <Button
                                        key={pet._id}
                                        variant="contained"
                                        type="submit"
                                        margin="normal"
                                        onClick={() => petEditButtonHandler(pet._id)}
                                        sx={{ mr: 1 }}
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

    );
};

export default MyPets;
