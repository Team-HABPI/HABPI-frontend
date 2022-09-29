// Library imports
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const MyPets = (props) => {
    const [loadedPets, setLoadedPets] = useState();

    const params = useParams();
    const userId = params.userId;

    useEffect(() => {
        axios
            .get(`http://localhost:8082/user/${userId}/all-pets`)
            .then((response) => {
                setLoadedPets(response.data.pets);
            });
    }, [userId]);

    return (
        <>
            <h1>Your Pets</h1>
            {loadedPets &&
                loadedPets.map((pet) => {
                    return (
                        <>
                            <h2 key={pet._id}>{pet.name}</h2>
                            <p key={pet._id}>{pet.age}</p>
                            <p key={pet._id}>{pet.breed}</p>
                        </>
                    );
                })}
        </>
    );
};

export default MyPets;
