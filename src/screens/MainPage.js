// Library includes
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Card } from "@mui/material";
import { Box } from "@mui/system";
import LogoH from "../logo/HABPI-PETS.png";

const MainPage = (props) => {
    const [loadedServices, setLoadedServices] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get("http://localhost:8082/service")
            .then((response) => {
                setLoadedServices(response.data.services);
            })
            .catch((error) => console.log(error));
    }, []);

    const onSericeClickHandler = (serviceId) => {
        console.log(serviceId);
        navigate(`/service/${serviceId}`);
    };

    return (
        <div>
            <img
                src={LogoH}
                style={{ alignItems: "center", justifyContent: "center" }}
                alt="HABPI-Pets"
            ></img>
            {/* <h1 style={{ textAlign: "center" }}>Welcome to HAPBI-Pets</h1> */}
            <h2 style={{ textAlign: "left", padding: 40 }}>
                Current Services Available
            </h2>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "start",
                    flexDirection: "row",
                    flexWrap: "wrap",
                }}
            >
                {loadedServices &&
                    loadedServices.map((service) => {
                        return (
                            <Card
                                sx={{ minWidth: 350, p: 4, m: 4 }}
                                onClick={() => {
                                    onSericeClickHandler(service.id);
                                }}
                            >
                                <>
                                    <h3 key={service.id}>{service.title}</h3>
                                    <h4 key={service.id}>{service.jobType}</h4>
                                    <p key={service.id}>
                                        {" "}
                                        Minimum Price = ${service.minPrice}
                                    </p>
                                    <p key={service.id}>
                                        {" "}
                                        Maximum Price = ${service.maxPrice}
                                    </p>
                                </>
                            </Card>
                        );
                    })}
            </Box>
        </div>
    );
};

export default MainPage;
