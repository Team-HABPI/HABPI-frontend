// Library imports
import { useState, useEffect, Image } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Box, Container, flexbox } from '@mui/system';
import { Card, Grid } from "@mui/material";

function Item1() {
    return (

        <Card sx={{
            flexGrow: 1, color: 'blue', backgroundColor: 'yellow',

            container: {

                gap: 10,
                rowGap: 10,
                columnGap: 20,

            },

        }}> <h2> Item 1 </h2> </Card>


    );
}
function Item2() {
    const container1 = {
        justifyContent: "flex-start",
        gap: 10,
        rowGap: 10,
        columnGap: 70,
        flexGrow: 1,
        color: 'white',
        backgroundColor: 'brown'
    }

    const container2 = {
        justifyContent: "flex-start",
        gap: 10,
        rowGap: 50,
        innerWidth: 50,
        flexGrow: 1, color: 'white',
        backgroundColor: 'green'
    }

    return (
        <Container>
            <Card sx={container1}> <h2> Pet Details</h2>
                <p> <b>Name:</b> abcd </p>
                <p> Animal type: dog </p>
                <p> Age: 3 yeards </p>
                <p> Gender: male </p>
            </Card>

            <Card sx={container2}> <h2> Pet Details</h2>
                <p> <b>Name:</b> abcd </p>
                <p> Animal type: dog </p>
                <p> Age: 3 yeards </p>
                <p> Gender: male </p>
            </Card>

        </Container>
        // <Box sx={container}> <h2> Pet Details</h2>
        //     <p> <b>Name:</b> abcd </p>
        //     <p> Animal type: dog </p>
        //     <p> Age: 3 yeards </p>
        //     <p> Gender: male </p>
        // </Box>

    );
}


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


    const container1 = {
        justifyContent: "flex-start",
        gap: 10,
        rowGap: 10,
        columnGap: 70,
        flexGrow: 1,
        color: 'black',
        backgroundColor: 'silver'
    }

    const container2 = {
        justifyContent: "flex-start",
        gap: 10,
        rowGap: 50,
        flexGrow: 0.8,
        color: 'black',
        backgroundColor: 'silver'
    }

    return (

        <Grid container spacing={2}>
            <h1> Account Page</h1>

            {loadedUser && (


                <Card sx={{ p: 3, m: 10, alignItems: 'center' }}>

                    <h1> {loadedUser.name}  </h1>

                </Card>
            )}


            {!loadedUser && <p>Loading or error</p>}
            {loadedUser && (
                <Card sx={{ p: 3, m: 10 }}>
                    <h2><u> Person Details </u></h2>

                    <p>Age: {loadedUser.age}</p>
                    <p>Gender: {loadedUser.gender}</p>
                    <p>Email: {loadedUser.email}</p>

                    {/* <h1>Pets</h1>
                    {loadedUser.pets.map((pet) => {
                        return (
                            <>
                                <h2 key={pet.id}>{pet.name}</h2>
                                <p key={pet.id}>{pet.age}</p>
                                <p key={pet.id}>{pet.breed}</p>
                            </>
                        );
                    })}

                    <p>Services: {loadedUser.services}</p> */}
                </Card>
            )}

            {loadedUser && (
                <Card sx={{ p: 3, m: 10, backgroundColor: "silver", color: 'black' }}>
                    <h2><u>Animals</u></h2>
                    {loadedUser.pets.map((pet) => {
                        return (
                            <Card sx={{ p: 3, m: 8 }}>
                                <h2 key={pet.id}>{pet.name}</h2>
                                <p key={pet.id}>Age: {pet.age}</p>
                                <p key={pet.id}>Breed: {pet.breed}</p>
                                <p>Services: {loadedUser.services}</p>
                            </Card>
                        );
                    })}

                </Card>


            )
            }

            {/* <Item1 />
            <Item2 /> */}
        </Grid >



    );
};

export default AccountPage;
