// Library imports
import { useState, useEffect, Image } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Box, Container } from '@mui/system';
import { Card, Grid } from "@mui/material";


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
            <h1 style={{ padding: 10 }}> Account Page </h1>

            {loadedUser && (

                
                    <h1 style={{ fontSize: 56 ,padding:10}}> {loadedUser.name}  </h1>

                
            )
            }
            <Grid
                container
                spacing={1}
            >
                <Grid item >
                    {!loadedUser && <p>Loading or error</p>}
                    {loadedUser && (

                        <Card sx={{ p: 3, m: 3 }}>
                            <h1>Details </h1>
                            <p>Age: {loadedUser.age}</p>
                            <p>Gender: {loadedUser.gender}</p>
                            <p>Email: {loadedUser.email}</p>

                        </Card>

                    )}
                </Grid>
                <Grid item >
                    {loadedUser && (

                        <Card sx={{ p: 3, m: 2 }}>

                            <h1>Animals</h1>
                            <
                                Box sx={{ display: 'flex', flexDirection: "row" }}>
                                {loadedUser.pets.map((pet) => {
                                    return (
                                        <Card sx={{ pr: 2, mr: 2, minWidth: 120, boxShadow: "none" }}>
                                            <h2 key={pet.id}>{pet.name}</h2>
                                            <p key={pet.id}>Age: {pet.age}</p>
                                            <p key={pet.id}>Breed: {pet.breed}</p>
                                            <p>Services: {loadedUser.services}</p>
                                        </Card>
                                    );
                                })}
                            </Box>

                        </Card>

                    )
                    }
                </Grid>
            </Grid >


        </>
    );
};

export default AccountPage;
