// Library imports
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, FormControl } from "@mui/material";

// Local imports
import DropDown from "../components/UI/DropDown";
import axios from "axios";

import { AuthContext } from "../shared/context/auth-context";

// Add more breed options here
const breedOptions = ["Cat", "Dog", "Goldfish"];

const NewPet = (props) => {
    const [name, setName] = useState("");
    const [age, setAge] = useState(1);
    const [breed, setBreed] = useState("");

    const auth = useContext(AuthContext);

    // Age options
    const ageOptions = [];
    for (let i = 1; i < 50; i++) {
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

        axios
            .post("http://localhost:8082/pet", { name, age, breed })
            .then(() => {})
            .catch((error) => console.log(error));
    };

    return (
        <>
            <form onSubmit={newPetSubmitHandler}>
                <FormControl>
                    <h2>Register a pet</h2>
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
                    <Button type="submit" variant="contained" margin="normal">
                        New Pet
                    </Button>
                </FormControl>
            </form>
        </>
    );
};

export default NewPet;
