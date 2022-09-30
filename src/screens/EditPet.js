import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

// Local imports
import DropDown from "../components/UI/DropDown";
import axios from "axios";

import { FormControl, TextField, Button, Grid } from "@mui/material";

// Add more breed options here
const breedOptions = ["Cat", "Dog", "Goldfish"];

const EditPage = (props) => {
    const [name, setName] = useState();
    const [age, setAge] = useState();
    const [breed, setBreed] = useState();

    const params = useParams();
    const navigate = useNavigate();
    const petId = params.petId;


    // Age options
    const ageOptions = [];
    for (let i = 1; i < 25; i++) {
        ageOptions.push(i);
    }

    useEffect(() => {
        axios
            .get(`http://localhost:8082/pet/${petId}`)
            .then((response) => {
                const pet = response.data.pet;
                setName(pet.name);
                setAge(pet.age);
                setBreed(pet.breed);
            })
            .catch((error) => console.log(error));
    }, [petId]);

    const nameChangeHandler = (event) => {
        setName(event.target.value);
    };

    const ageChangeHandler = (event) => {
        setAge(event.target.value);
    };

    const breedChangeHandler = (event) => {
        setBreed(event.target.value);
    };

    const editPetSubmitHandler = (event) => {
        event.preventDefault();

        axios
            .put(`http://localhost:8082/pet/${petId}`, { name, age, breed })
            .then((response) => navigate("/"))
            .catch((error) => console.log(error));
    };

    return (
        <>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: '70vh' }}
            >

                <Grid item xs={3}>
                    <form onSubmit={editPetSubmitHandler}>

                        <FormControl>
                            <h1>Edit Your Pet</h1>
                            {!name && !age && !breed && <p>Loading...</p>}
                            <FormControl>
                                {name && (
                                    <TextField
                                        id="outlined-name-input"
                                        label="Name"
                                        variant="outlined"
                                        margin="normal"
                                        value={name}
                                        onChange={nameChangeHandler}
                                    />
                                )}
                                {age && (
                                    <DropDown
                                        title="Age"
                                        value={age}
                                        options={ageOptions}
                                        changeHandler={ageChangeHandler}
                                    />
                                )}
                                {breed && (
                                    <DropDown
                                        title="Breed"
                                        value={breed}
                                        options={breedOptions}
                                        changeHandler={breedChangeHandler}
                                    />
                                )}
                                <Button type="submit" variant="contained" margin="normal" sx={{ my: 2 }}>
                                    Update
                                </Button>
                            </FormControl>
                        </FormControl>
                    </form>


                </Grid>

            </Grid>
        </>
    );
};

export default EditPage;
