import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const MyServices = (props) => {
    const [loadedServices, setLoadedServices] = useState();

    const params = useParams();
    const userId = params.userId;

    useEffect(() => {
        axios
            .get(`http://localhost:8082/user/${userId}/services`)
            .then((response) => {
                console.log(response.data);
                setLoadedServices(response.data.services);
            })
            .catch((error) => console.log(error));
    }, [userId]);

    return (
        <>
            <h1>Services</h1>
            {loadedServices &&
                loadedServices.map((service) => {
                    return (
                        <div key={service.id}>
                            <h3>{service.title}</h3>
                            <p>{service.jobType}</p>
                            <p>{service.minPrice}</p>
                            <p>{service.maxPrice}</p>
                        </div>
                    );
                })}
        </>
    );
};

export default MyServices;
