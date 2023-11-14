import { useEffect, useState } from "react";
import { figure3, figure4 } from "../../assets";
import getData from "../api/api";
import Question from "../question/Question";
import { v4 as uuidv4 } from "uuid";

import "./main.css";

const Main = () => {
    const [questions, setQuestions] = useState([]);

    const getQuestions = async () => {
        const data = await getData();
        console.log(data, "data getQuest");
        setQuestions(data);
    };

    useEffect(() => {
        getQuestions();
    }, []);

    return (
        <div className="main">
            <img className="figure_ellipse" src={figure3} alt="" />
            <div className="main_content">
                {console.log(questions, "questions")}
                {questions
                    ? questions.map((item) => {
                          return (
                              <Question key={uuidv4()} questionItem={item} />
                          );
                      })
                    : ""}
            </div>
            <button>Check answers</button>
            <img className="figure_ellipse2" src={figure4} alt="" />
        </div>
    );
};

export default Main;
