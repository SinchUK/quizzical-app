import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { PuffLoader } from "react-spinners";
import getData from "../api/api";
import Question from "../question/Question";
import { Link } from "react-router-dom";
import Confetti from "react-confetti";
import { bravo } from "../../assets/audio";
import useSound from "use-sound";

import { figure3, figure4 } from "../../assets";

import "./main.css";

const Main = ({ setQuestions, questions, difficult, categoryNumber }) => {
    const [play] = useSound(bravo);
    const [loading, setLoading] = useState(true);

    const [userAnswers, setUserAnswers] = useState(Array(5).fill(null));
    const [correctAnswers, setCorrectAnswers] = useState(Array(5).fill(null));
    console.log(correctAnswers, "correct");
    const [isChecking, setIsChecking] = useState(false);

    const getQuestions = async () => {
        const data = await getData(categoryNumber, difficult);
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
        userAnswers.forEach((answ, i) => {
            return userAnswers[i] === correctAnswers[i] ? score++ : score;
        });

        if (score === 5) {
            play();
        }
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
                                    {isChecking ? (
                                        <Link
                                            className="title_content_start-link"
                                            to="/"
                                        >
                                            New game
                                        </Link>
                                    ) : (
                                        "Check answers"
                                    )}
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
            {isChecking && checkScore() === 5 && <Confetti />}
        </div>
    );
};

export default Main;
