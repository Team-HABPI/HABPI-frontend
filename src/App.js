// Library import
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from "./components/Navigation/NavBar";

// Screen import
import MainPage from "./screens/MainPage";
import AccountPage from "./screens/AccountPage";
import DescriptionPage from "./screens/DescriptionPage";
import NotFoundPage from "./screens/NotFoundPage";

function App() {
    return (
        <>
            <NavBar />
            <main>
                <Router>
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/account" element={<AccountPage />} />
                        <Route
                            path="/description"
                            element={<DescriptionPage />}
                        />
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </Router>
            </main>
        </>
    );
}

export default App;
