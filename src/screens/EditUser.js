import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

// Local imports
import DropDown from "../components/UI/DropDown";
import axios from "axios";

import { FormControl, TextField, Button, Grid } from "@mui/material";


const EditUser = (props) => {
    const [name, setName] = useState();
    const [age, setAge] = useState();
    const [email, setEmail] = useState();
    // const [password, setPassword] = useState();
    const [gender, setGender] = useState();
    const genderOptions =["Male","Female","Prefer not to say"]

    const params = useParams();
    const navigate = useNavigate();
    const userId = params.userId;


    // Age options
    const ageOptions = [];
    for (let i = 1; i < 100; i++) {
        ageOptions.push(i);
    }

    useEffect(() => {
        console.log("Here")
        axios
            .get(`http://localhost:8082/user/${userId}`)
            .then((response) => {
                const user = response.data.user;
                setName(user.name);
                setAge(user.age);
                setGender(user.gender);
                setEmail(user.email);
            })
            .catch((error) => console.log(error));
    }, [userId]);

    const nameChangeHandler = (event) => {
        setName(event.target.value);
    };

    const ageChangeHandler = (event) => {
        setAge(event.target.value);
    };

    const genderChangeHandler = (event) => {
        setGender(event.target.value);
    };

    const editUserSubmitHandler = (event) => {
        event.preventDefault();

        axios
            .put(`http://localhost:8082/user/${userId}`, { name, age, email,gender })
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
                    <form onSubmit={editUserSubmitHandler}>

                        <FormControl>
                            <h1>Edit Your Details</h1>
                            {!name && !age && !email &&!gender &&<p>Loading...</p>}
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
                                {gender && (
                                    <DropDown
                                        title="Gender"
                                        value={gender}
                                        options={genderOptions}
                                        changeHandler={genderChangeHandler}
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

export default EditUser;
