// Library includes
import { useState, useEffect } from "react";
import axios from "axios";

const MainPage = (props) => {
    const [loadedServices, setLoadedServices] = useState();

    useEffect(() => {
        axios
            .get("http://localhost:8082/service")
            .then((response) => {
                setLoadedServices(response.data.services);
            })
            .catch((error) => console.log(error));
    }, []);
    return (
        <>
            <h1>Welcome to ------</h1>
            <h2>Current Services</h2>
            {loadedServices &&
                loadedServices.map((service) => {
                    return (
                        <>
                            <h3 key={service.id}>{service.title}</h3>
                            <p key={service.id}>{service.jobType}</p>
                            <p key={service.id}>{service.minPrice}</p>
                            <p key={service.id}>{service.maxPrice}</p>
                        </>
                    );
                })}
        </>
    );
};

export default MainPage;