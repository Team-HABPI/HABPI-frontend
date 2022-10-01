// Library imports
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Container,
    Card,
    CardContent,
    Grid,
    Button,
    Typography,
} from "@mui/material";
import axios from "axios";

const MyPets = (props) => {
    const [loadedPets, setLoadedPets] = useState();
    const [loadedUser, setLoadedUser] = useState();
    const params = useParams();
    const navigate = useNavigate();
    const userId = params.userId;
    useEffect(() => {
        axios
            .get(`http://localhost:8082/user/${userId}`)
            .then((response) => {
                setLoadedUser(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [userId]);

    useEffect(() => {
        axios
            .get(`http://localhost:8082/user/${userId}/all-pets`)
            .then((response) => {
                setLoadedPets(response.data.pets);
            }).catch((error) => console.log(error));
    }, [userId]);

    const petEditButtonHandler = (petId) => {
        navigate(`/${petId}/edit`);
    };

    const petRemoveButtonHandler = (petId) => {
        axios
            .put(`http://localhost:8082/user/${userId}/remove-pet`, { petId }).then((response) => {
                setLoadedPets(response.data.pets);
            }).catch((error) => console.log(error))

    };

    const onNewPetHandler = (event) => {
        navigate("/newPet");
    };

    return (
        <Container>
            {loadedUser &&(
            <Typography variant="h2" style={{ display: "inline-block" }}> {loadedUser.name}'s Pets</Typography>
            )}
            <Grid container item justifyContent="flex-end">
                <Button variant="contained" onClick={onNewPetHandler}>
                    New Pet
                </Button>
            </Grid>

            {loadedPets &&
                loadedPets.map((pet) => {
                    return (
                        <>
                            <Card sx={{ my: 2 }} key={pet._id}>
                                <CardContent>
                                    <Typography variant="h3">
                                        {pet.name}
                                    </Typography>
                                    <Typography>Age: {pet.age}</Typography>
                                    <Typography>Breed: {pet.breed}</Typography

                                    <Button
                                        variant="contained"
                                        type="submit"
                                        margin="normal"
                                        onClick={() =>
                                            petEditButtonHandler(pet._id)
                                        }
                                        sx={{ mr: 1 }}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="contained"
                                        type="submit"
                                        margin="normal"
                                        onClick={() =>
                                            petRemoveButtonHandler(pet._id)
                                        }
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
