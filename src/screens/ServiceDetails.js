import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";

const ServiceDetail = (props) => {
    const [title, setTitle] = useState();
    const [jobType, setJobType] = useState();
    const [minPrice, setMinPrice] = useState();
    const [maxPrice, setMaxPrice] = useState();

    const params = useParams();
    const serviceId = params.serviceId;

    useEffect(() => {
        axios
            .get(`http://localhost:8082/service/${serviceId}`)
            .then((response) => {
                const { title, jobType, minPrice, maxPrice } =
                    response.data.service;
                setTitle(title);
                setJobType(jobType);
                setMinPrice(minPrice);
                setMaxPrice(maxPrice);
            })
            .catch((error) => console.log(error));
    }, [serviceId]);

    return (
        <>
            <h1>{title && title}</h1>
            <p>{jobType && jobType}</p>
            <p>{minPrice && minPrice}</p>
            <p>{maxPrice && maxPrice}</p>
            <Button variant="contained">Request Service</Button>
        </>
    );
};

export default ServiceDetail;
