// Library Imports
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { TextField, Button, FormControl } from "@mui/material";

// Local Imports
import { AuthContext } from "../shared/context/auth-context";
import DropDown from "../components/UI/DropDown";

const Auth = (props) => {
    const [isLogin, setIsLogin] = useState(true);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [age, setAge] = useState(10);
    const [gender, setGender] = useState("");
    const [phone, setPhone] = useState("");

    const navigate = useNavigate();
    const auth = useContext(AuthContext);

    // Age options
    const ageOptions = [];
    for (let i = 10; i < 100; i++) {
        ageOptions.push(i);
    }

    // Gender options
    const genderOptions = ["Male", "Female"];

    const toggleSignupHandler = () => setIsLogin((value) => !value);

    const emailChangeHandler = (event) => {
        setEmail(event.target.value);
    };

    const passwordChangeHandler = (event) => {
        setPassword(event.target.value);
    };

    const nameChangeHandler = (event) => {
        setName(event.target.value);
    };

    const ageChangeHandler = (event) => {
        setAge(event.target.value);
    };

    const genderChangeHandler = (event) => {
        setGender(event.target.value);
    };

    const phoneChangeHandler = (event) => {
        setPhone(event.target.value);
    };

    const authSubmitHandler = async (event) => {
        event.preventDefault();

        if (isLogin) {
            axios
                .post("http://localhost:8082/user/login", {
                    email,
                    password,
                })
                .then((response) => {
                    auth.login(response.data.user.id);
                })
                .then(() => {
                    navigate("/");
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            axios
                .post("http://localhost:8082/user/signup", {
                    email,
                    password,
                    name,
                    age,
                    gender,
                    phone,
                })
                .then((response) => {
                    auth.login(response.data.user.id);
                })
                .then(() => {
                    navigate("/");
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    return (
        <>
            <form onSubmit={authSubmitHandler}>
                <FormControl>
                    <h2>Login Required</h2>
                    <TextField
                        id="outlined-email-input"
                        label="Email"
                        variant="outlined"
                        margin="normal"
                        value={email}
                        onChange={emailChangeHandler}
                    />
                    <TextField
                        id="outlined-password-input"
                        type="password"
                        label="Password"
                        variant="outlined"
                        margin="normal"
                        value={password}
                        onChange={passwordChangeHandler}
                    />
                    {!isLogin && (
                        <>
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
                                title="Gender"
                                value={gender}
                                options={genderOptions}
                                changeHandler={genderChangeHandler}
                            />
                            <TextField
                                id="outlined-phone-input"
                                label="Phone"
                                variant="outlined"
                                margin="normal"
                                value={phone}
                                onChange={phoneChangeHandler}
                            />
                        </>
                    )}
                    <Button type="submit" variant="contained" margin="normal">
                        {isLogin ? "LOGIN" : "SIGNUP"}
                    </Button>
                </FormControl>
            </form>
            <Button
                variant="contained"
                type="submit"
                margin="normal"
                onClick={toggleSignupHandler}
            >
                SWITCH TO {isLogin ? "SIGNUP" : "LOGIN"}
            </Button>
        </>
    );
};

export default Auth;
