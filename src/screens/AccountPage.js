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
                <Typography variant="h2" sx={{pl:3}}>{loadedUser.name}</Typography>

            )
            }

            <Grid
             container item justifyContent="flex"
            >
                
                    {!loadedUser && <p>Loading or error</p>}
                    {loadedUser && (

                        <Card sx={{ p: 3, m: 3 }}>
                            <Typography variant="h3">Details</Typography>
                            <Typography>Age: {loadedUser.age}</Typography>
                            <Typography>Gender: {loadedUser.gender}</Typography>
                            <Typography>Email: {loadedUser.email}</Typography>


                        </Card>

                    )}
                <Button variant="contained"> Edit </Button>
                    {loadedUser && (

                        <Card sx={{ p: 3, m: 2 }}>
                            <Typography variant="h3">Pets</Typography>

                            <Box sx={{ display: 'flex', flexDirection: "row" }}>
                                {loadedUser.pets.map((pet) => {
                                    return (
                                        <Card sx={{ pr: 2, mr: 3, minWidth: 120, boxShadow: "none" }}>

                                            <Typography variant="h4">{pet.name}</Typography>
                                            <Typography >Age: {pet.age}</Typography>
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
        </Container>

        </>
    );
};

export default AccountPage;
