// Library imports
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const AccountPage = () => {
    const [loadedUser, setLoadedUser] = useState();
    const params = useParams();

    const { userId } = params;

    useEffect(() => {
        axios
            .get(`http://localhost:8082/user/${userId}`)
            .then((response) => {
                setLoadedUser(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [userId]);

    return (
        <>
            <h1>I am the Account Page</h1>
            {!loadedUser && <p>Loading or error</p>}
            {loadedUser && (
                <>
                    <p>Name: {loadedUser.name}</p>
                    <p>Email: {loadedUser.email}</p>
                    <p>Age: {loadedUser.age}</p>
                    <p>Gender: {loadedUser.gender}</p>
                    <h1>Pets</h1>
                    {loadedUser.pets.map((pet) => {
                        return (
                            <>
                                <h2 key={pet.id}>{pet.name}</h2>
                                <p key={pet.id}>{pet.age}</p>
                                <p key={pet.id}>{pet.breed}</p>
                            </>
                        );
                    })}
                    <p>Services: {loadedUser.services}</p>
                </>
            )}
        </>
    );
};

export default AccountPage;
