import { useState } from "react";
import "./question.css";

const Question = ({ questionItem }) => {
    const [inputValue, setInputValue] = useState("");
    const { question, answers } = questionItem;

    const Item = ({ item }) => {
        const checked = inputValue === item.answer ? "checked" : "";

        const handleInputChange = (e) => {
            console.log(e.target.value, "checked");
            setInputValue(e.target.value);
        };

        return (
            <label className="main_content_answers__item">
                <input
                    name={item.answer}
                    onChange={(e) => handleInputChange(e)}
                    type="radio"
                    value={item.answer}
                    checked={inputValue === item.answer}
                />
                <span className={`checkmark ${checked}`}>{item.answer}</span>
            </label>
        );
    };

    return (
        <div className="main_content_">
            <h3>{question}</h3>
            <div className="main_content_answers">
                <form className="main_content_form" action="">
                    {answers.map((item) => {
                        return <Item key={item.answer} item={item} />;
                    })}
                </form>
            </div>
            <hr />
        </div>
    );
};

export default Question;
