import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, FormControl, Button } from "@mui/material";
import axios from "axios";

import DropDown from "../components/UI/DropDown";

const jobTypes = ["Grooming", "Cleaning", "Walking", "Feeding", "Health Care"];

const CreateService = (props) => {
    const [title, setTitle] = useState("");
    const [jobType, setJobType] = useState("");
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);

    const navigate = useNavigate();

    const titleChangeHandler = (event) => {
        setTitle(event.target.value);
    };

    const jobTypeChangeHandler = (event) => {
        setJobType(event.target.value);
    };

    const minPriceChangeHandler = (event) => {
        setMinPrice(event.target.value);
    };

    const maxPriceChangeHandler = (event) => {
        setMaxPrice(event.target.value);
    };

    const serviceSubmitHandler = (event) => {
        event.preventDefault();

        axios
            .post("http://localhost:8082/service", {
                title,
                jobType,
                minPrice,
                maxPrice,
            })
            .then(() => navigate("/"))
            .catch((error) => console.log(error));
    };

    return (
        <>
            <h1>Make a new service</h1>
            <form onSubmit={serviceSubmitHandler}>
                <FormControl>
                    <TextField
                        id="outlined-title-input"
                        label="Title"
                        variant="outlined"
                        margin="normal"
                        value={title}
                        onChange={titleChangeHandler}
                    />
                    <DropDown
                        title="Job Type"
                        value={jobType}
                        options={jobTypes}
                        changeHandler={jobTypeChangeHandler}
                    />
                    <TextField
                        id="outlined-min-price-input"
                        label="Min Price"
                        variant="outlined"
                        margin="normal"
                        value={minPrice}
                        onChange={minPriceChangeHandler}
                    />
                    <TextField
                        id="outlined-max-price-input"
                        label="Max Price"
                        variant="outlined"
                        margin="normal"
                        value={maxPrice}
                        onChange={maxPriceChangeHandler}
                    />
                    <Button variant="contained" type="submit" margin="normal">
                        Upload Service
                    </Button>
                </FormControl>
            </form>
        </>
    );
};

export default CreateService;
