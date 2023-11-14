import { useState } from "react";
import "./question.css";

const Question = ({ questionItem, register, handleGetAllValues }) => {
    const [inputValue, setInputValue] = useState("");
    const { question, answers } = questionItem;
    const [answer, setAnswer] = useState([]);

    const Item = ({ item }) => {
        const checked = inputValue === item.answer ? "checked" : "";
        // const itemAnswer = item.answer;
        const handleInputChange = (e) => {
            const value = e.target.value;
            console.log(value, "checked");
            setInputValue(value);
            // handleGetAllValues();
        };

        return (
            <label className="main_content_answers__item">
                <input
                    // {...register(`${itemAnswer}`)}
                    name={item.question}
                    onChange={(e) => handleInputChange(e)}
                    type="radio"
                    value={item.answer}
                    checked={inputValue === item.answer}
                    required
                />
                <span className={`checkmark ${checked}`}>{item.answer}</span>
            </label>
        );
    };

    return (
        <div className="main_content_">
            <h3>{question}</h3>
            <div className="main_content_answers">
                {answers.map((item, i) => {
                    return <Item key={item.answer} item={item} />;
                })}
            </div>
            <hr />
        </div>
    );
};

export default Question;
