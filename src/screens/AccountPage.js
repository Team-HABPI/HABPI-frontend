// Library imports
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Box } from '@mui/system';
import { Card, Grid, Typography, Button, Container } from "@mui/material";


const AccountPage = () => {
    const [loadedUser, setLoadedUser] = useState();
    const params = useParams();

    const { userId } = params;

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


    return (

        <>
            <Container padding="normal">
                {loadedUser && (
                    <Typography variant="h2" sx={{ pl: 3, p: 4 }}>{loadedUser.name}</Typography>

                )
                }

                <Grid
                    container item justifyContent="flex" style={{ alignContent: 'end' }}
                >

                    {!loadedUser && <p>Loading or error</p>}
                    {loadedUser && (

                        <Card sx={{ p: 6, m: 3 }}>
                            <Typography variant="h3" sx={{ p: 1 }}>Details</Typography>
                            <Typography sx={{ p: 0.6, m: 0.7 }}>Age: {loadedUser.age}</Typography>
                            <Typography sx={{ p: 0.6, m: 0.7 }}>Gender: {loadedUser.gender}</Typography>
                            <Typography sx={{ p: 0.6, m: 0.7 }}>Email: {loadedUser.email}</Typography>


                        </Card>

                    )}

                    {loadedUser && (

                        <Card sx={{ p: 5, m: 3, flexDirection: 'column' }}>
                            <Typography variant="h3" sx={{ p: 2 }}>Pets</Typography>

                            <Box sx={{ display: 'flex', flexDirection: "row", p: 3 }}>
                                {loadedUser.pets.map((pet) => {
                                    return (
                                        <Card sx={{ pr: 2, mr: 4, minWidth: 120, boxShadow: "none" }}>

                                            <Typography variant="h4">{pet.name}</Typography>
                                            <Typography margin="normal" >Age: {pet.age}</Typography>
                                            <Typography >Breed: {pet.breed}</Typography>
                                            <Typography >Services: {loadedUser.services}</Typography>


                                        </Card>
                                    );
                                })}
                            </Box>

                        </Card>

                    )
                    }

                </Grid >
                <Button variant="contained" sx={{ p: 2, m: 3 }}> Edit </Button>
            </Container>

        </>
    );
};

export default AccountPage;
