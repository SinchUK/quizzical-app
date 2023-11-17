import { selectSound } from "../../assets/audio";
import useSound from "use-sound";

import "./question.css";

const Question = ({
    correctAnswers,
    questionItem,
    userAnswers,
    setUserAnswers,
    questionInd,
    isChecking,
}) => {
    const { question, answers } = questionItem;

    const Answer = ({ item }) => {
        const [play] = useSound(selectSound);
        const checked =
            userAnswers[questionInd] === item.answer ? "checked" : "";

        const handleInputChange = (e) => {
            const value = e.target.value;

            setUserAnswers((prev) => {
                const result = [...prev];
                result[questionInd] = value;
                return result;
            });
        };

        const answerStyling = () => {
            if (!isChecking) {
                return `checkmark ${checked}`;
            } else {
                if (item.isCorrect) {
                    return `checkmark checkmark_true`;
                } else if (
                    checked &&
                    correctAnswers[questionInd] !== userAnswers[questionInd]
                ) {
                    return `checkmark checkmark_false`;
                } else {
                    return "checkmark";
                }
            }
        };

        return (
            <label className="main_content_answers__item">
                <input
                    onClick={play}
                    name={item.question}
                    onChange={(e) => handleInputChange(e)}
                    type="radio"
                    value={item.answer}
                    checked={userAnswers[questionInd] === item.answer}
                    required
                    disabled={isChecking}
                />
                <span className={answerStyling()}>{item.answer}</span>
            </label>
        );
    };

    return (
        <div className="main_content_">
            <h3>{question}</h3>
            <div className="main_content_answers">
                {answers.map((item, answerInd) => {
                    return (
                        <Answer
                            key={item.answer}
                            answerInd={answerInd}
                            item={item}
                        />
                    );
                })}
            </div>
            <hr />
        </div>
    );
};

export default Question;
