import Main from "./components/main/Main";
import Title from "./components/title/Title";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Title />} />
                    <Route path="/main" element={<Main />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
