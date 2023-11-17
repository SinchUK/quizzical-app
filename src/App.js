import { useState } from "react";
import Main from "./components/main/Main";
import Title from "./components/title/Title";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
    const [categoryNumber, setCategoryNumber] = useState(0);
    const [difficult, setDifficult] = useState("Any Difficulty");
    const [questions, setQuestions] = useState([]);
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Title
                                setCategoryNumber={setCategoryNumber}
                                setDifficult={setDifficult}
                            />
                        }
                    />
                    <Route
                        path="/main"
                        element={
                            <Main
                                categoryNumber={categoryNumber}
                                difficult={difficult}
                                setQuestions={setQuestions}
                                questions={questions}
                            />
                        }
                    />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
