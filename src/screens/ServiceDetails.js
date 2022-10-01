// Library: imports
import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Typography, Box, Modal } from "@mui/material";

import { AuthContext } from "../shared/context/auth-context";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,

    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
};

const ServiceDetail = (props) => {
    const [title, setTitle] = useState();
    const [jobType, setJobType] = useState();
    const [minPrice, setMinPrice] = useState();
    const [maxPrice, setMaxPrice] = useState();

    //Modal
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const params = useParams();
    const navigate = useNavigate();
    const auth = useContext(AuthContext);
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

    const onAddService = () => {
        axios
            .post(`http://localhost:8082/user/add-service/${serviceId}`, {
                userId: auth.userId,
            })
            .then((response) => {navigate(`/${auth.userId}/services`)})
            .catch((error) => {});
    };

    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography variant="h3">Are you Sure?</Typography>

                    <Box component="span" maxWidth="200px" m={1}>
                        <Button variant="contained" onClick={onAddService}>
                            Yes
                        </Button>
                        <Button variant="contained" onClick={handleClose}>
                            No
                        </Button>
                    </Box>
                </Box>
            </Modal>
            <h1>{title && title}</h1>
            <p>{jobType && jobType}</p>
            <p>{minPrice && minPrice}</p>
            <p>{maxPrice && maxPrice}</p>
            {title && (
                <Button variant="contained" onClick={handleOpen}>
                    Request Service
                </Button>
            )}
        </>
    );
};

export default ServiceDetail;
