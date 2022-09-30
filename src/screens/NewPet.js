// Library imports
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, FormControl, Grid } from "@mui/material";

// Local imports
import DropDown from "../components/UI/DropDown";
import axios from "axios";

import { AuthContext } from "../shared/context/auth-context";
import { Container } from "@mui/system";

// Add more breed options here
const breedOptions = ["Cat", "Dog", "Goldfish"];

const NewPet = (props) => {
    const [name, setName] = useState("");
    const [age, setAge] = useState(1);
    const [breed, setBreed] = useState("");

    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    // Age options
    const ageOptions = [];
    for (let i = 1; i < 25; i++) {
        ageOptions.push(i);
    }

    const nameChangeHandler = (event) => {
        setName(event.target.value);
    };

    const ageChangeHandler = (event) => {
        setAge(event.target.value);
    };

    const breedChangeHandler = (event) => {
        setBreed(event.target.value);
    };

    const newPetSubmitHandler = (event) => {
        event.preventDefault();

        // Making new pet
        axios
            .post("http://localhost:8082/pet", { name, age, breed })
            .then((response) => {
                const petId = response.data.pet.id;
                // Nested post req for added pet to user
                axios
                    .post(`http://localhost:8082/user/${auth.userId}/add-pet`, {
                        petId,
                    })
                    .catch((error) => console.log(error));
            })
            .then(() => {
                navigate(`/${auth.userId}/pets`);
            })
            .catch((error) => console.log(error));
    };

    return (
        <>
            <Container sx={{ display:"flex", justifyContent:"center", my:10}}>
                    <form onSubmit={newPetSubmitHandler}>
                        <FormControl >
                            <h1>Register a Pet</h1>
                            <TextField
                                id="outlined-name-input"
                                label="Name"
                                variant="outlined"
                                margin="normal"
                                value={name}
                                onChange={nameChangeHandler}
                            />
                            <DropDown
                                title="Age"
                                value={age}
                                options={ageOptions}
                                changeHandler={ageChangeHandler}
                            />
                            <DropDown
                                title="Breed"
                                value={breed}
                                options={breedOptions}
                                changeHandler={breedChangeHandler}
                            />
                            <Button type="submit" variant="contained" margin="normal"  sx={{my:2}}>
                                New Pet
                            </Button>
                        </FormControl>
                    </form>
                </Container>

        </>
    );
};

export default NewPet;
