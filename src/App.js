// Library import
import { useState, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from "./components/Navigation/NavBar";

// Screen import
import MainPage from "./screens/MainPage";
import AccountPage from "./screens/AccountPage";
import DescriptionPage from "./screens/DescriptionPage";
import NotFoundPage from "./screens/NotFoundPage";
import MyPets from "./screens/MyPets";
import NewPet from "./screens/NewPet";
import CreateService from "./screens/CreateService";
import MyServices from "./screens/MyServices";
import EditPet from "./screens/EditPet";
import EditUser from "./screens/EditUser";

// Auth
import Auth from "./screens/Auth";
import { AuthContext } from "./shared/context/auth-context";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState();

    const login = useCallback((uid) => {
        setUserId(uid);
        setIsLoggedIn(true);
    }, []);

    const logout = useCallback(() => {
        setUserId(null);
        setIsLoggedIn(false);
    }, []);

    let routes;

    if (isLoggedIn) {
        routes = (
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/:userId/pets" element={<MyPets />} />
                <Route path="/newPet" element={<NewPet />} />
                <Route path="/:petId/edit" element={<EditPet />} />
                <Route path="/:userId/newService" element={<CreateService />} />
                <Route path="/:userId" element={<AccountPage />} />
                <Route path="/:userId/services" element={<MyServices />} />
                <Route path="/:serviceId" element={<DescriptionPage />} />
                <Route pather="/:userId/edit" element={<EditUser />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        );
    } else {
        routes = (
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/description" element={<DescriptionPage />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        );
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, userId, login, logout }}>
            <Router>
                <NavBar />
                <main>{routes}</main>
            </Router>
        </AuthContext.Provider>
    );
}

export default App;
