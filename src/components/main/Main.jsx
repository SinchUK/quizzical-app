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

    const getQuestions = async () => {
        const data = await getData();
        console.log(data, "data getQuest");
        setQuestions(data);
        setLoading(false);
    };

    useEffect(() => {
        // setLoading(true);
        getQuestions();
    }, []);

    const onSubmitForm = (e) => {
        e.preventDefault();
        console.log("submit");
    };

    const View = ({ questions }) => {
        return questions.map((item) => {
            return <Question key={uuidv4()} questionItem={item} />;
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
                            <View questions={questions} />
                            <button className="main_content_btn">
                                Check answers
                            </button>
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
