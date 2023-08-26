import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import Mint from "./Mint";

function RoutesConfig() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/mint" element={<Mint />} />
            </Routes>
        </Router>
    );
}

export default RoutesConfig;

