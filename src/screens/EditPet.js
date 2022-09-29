import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import { FormControl, TextField, Button } from "@mui/material";

const EditPage = (props) => {
    const [name, setName] = useState();
    const [age, setAge] = useState();
    const [breed, setBreed] = useState();

    const params = useParams();
    const navigate = useNavigate();
    const petId = params.petId;

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
            <h1>Edit your pet</h1>
            {!name && !age && !breed && <p>Loading...</p>}
            <form onSubmit={editPetSubmitHandler}>
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
                        <TextField
                            id="outlined-age-input"
                            label="Age"
                            variant="outlined"
                            margin="normal"
                            value={age}
                            onChange={ageChangeHandler}
                        />
                    )}
                    {breed && (
                        <TextField
                            id="outlined-breed-input"
                            label="Breed"
                            variant="outlined"
                            margin="normal"
                            value={breed}
                            onChange={breedChangeHandler}
                        />
                    )}
                    <Button type="submit" variant="contained" margin="normal">
                        Update
                    </Button>
                </FormControl>
            </form>
        </>
    );
};

export default EditPage;
