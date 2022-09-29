// Library import
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from "./components/Navigation/NavBar";

// Screen import
import MainPage from "./screens/MainPage";
import AccountPage from "./screens/AccountPage";
import DescriptionPage from "./screens/DescriptionPage";
import NotFoundPage from "./screens/NotFoundPage";
import MyPets from "./screens/MyPets";
import CreateService from "./screens/CreateService";
import MyServices from "./screens/MyServices";

function App() {
    return (
        <>
            <Router>
                <NavBar />
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/account" element={<AccountPage />} />
                    <Route path="/pets" element={<MyPets />} />
                    <Route path="/createservice" element={<CreateService />} />
                    <Route path="/myservices" element={<MyServices />} />
                    <Route path="/description" element={<DescriptionPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
