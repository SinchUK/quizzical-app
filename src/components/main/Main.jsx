import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { PuffLoader } from "react-spinners";
import getData from "../api/api";
import Question from "../question/Question";

import { figure3, figure4 } from "../../assets";
import "./main.css";

const Main = () => {
    const [loading, setLoading] = useState(true);
    const [questions, setQuestions] = useState([]);

    const [userAnswers, setUserAnswers] = useState(Array(5).fill(null));
    const [correctAnswers, setCorrectAnswers] = useState(Array(5).fill(null));

    const [isChecking, setIsChecking] = useState(false);

    console.log(correctAnswers, "correct answers");
    console.log(userAnswers, "user answers");

    const getQuestions = async () => {
        const data = await getData();
        console.log(data, "data getQuest");
        setQuestions(data);
        setLoading(false);
    };

    useEffect(() => {
        getCorrectAnswers();
    }, [questions]);

    const getCorrectAnswers = () => {
        const answers = questions.map((question) => {
            const correctAnswer = question.answers.find(
                (answ) => answ.isCorrect
            );
            return correctAnswer.answer;
        });
        setCorrectAnswers(answers);
    };

    useEffect(() => {
        getQuestions();
    }, []);

    const checkScore = () => {
        let score = 0;
        const answers = userAnswers.map((answ) => {
            const trueAnswers = correctAnswers.map((corrAsw) => {
                return answ === corrAsw ? score++ : score;
            });
            return trueAnswers;
        });
        return score;
    };

    const onSubmitForm = (e) => {
        e.preventDefault();
        if (isChecking) {
            setIsChecking(false);
            setCorrectAnswers(Array(5).fill(null));
            setUserAnswers(Array(5).fill(null));
            getQuestions();
        } else {
            setIsChecking(true);
            // if (userAnswers.some((answ) => answ === null)) return;
        }
    };

    const QuestionRender = ({ questions }) => {
        return questions.map((item, index) => {
            return (
                <Question
                    correctAnswers={correctAnswers}
                    isChecking={isChecking}
                    questionInd={index}
                    key={uuidv4()}
                    questionItem={item}
                    userAnswers={userAnswers}
                    setUserAnswers={setUserAnswers}
                />
            );
        });
    };

    return (
        <div className="main">
            <img className="title_figure_ellipse" src={figure3} alt="" />
            <form
                onSubmit={(e) => onSubmitForm(e)}
                className="main_content_form"
            >
                <div className="main_content">
                    {!loading ? (
                        <>
                            <QuestionRender questions={questions} />
                            <div className="main_content_check-block">
                                {isChecking ? (
                                    <span>
                                        You scored {checkScore()}/5 correct
                                        answers
                                    </span>
                                ) : (
                                    ""
                                )}

                                <button
                                    className="main_content_btn"
                                    disabled={userAnswers.some(
                                        (answ) => answ === null
                                    )}
                                >
                                    {isChecking ? "New game" : "Check answers"}
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="spinner_block">
                            <PuffLoader color="rgba(54, 215, 183, 1)" />
                        </div>
                    )}
                </div>
            </form>
            <img className="title_figure_ellipse2" src={figure4} alt="" />
        </div>
    );
};

export default Main;
