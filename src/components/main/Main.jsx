import { useEffect, useState, CSSProperties } from "react";
import { v4 as uuidv4 } from "uuid";
import { ClipLoader } from "react-spinners";
import getData from "../api/api";
import Question from "../question/Question";

// import { useForm } from "react-hook-form";

import { figure3, figure4 } from "../../assets";
import "./main.css";

const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

const Main = () => {
    const [loading, setLoading] = useState(true);
    // const { register, handleSubmit, getValues } = useForm();
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

    // const handleGetAllValues = () => {
    //     // Get all form values
    //     const allFormValues = getValues();
    //     console.log("All form values:", allFormValues);
    // };
    const View = ({ questions }) => {
        return questions.map((item) => {
            return (
                <Question
                    //   handleGetAllValues={handleGetAllValues}
                    key={uuidv4()}
                    questionItem={item}
                    //   register={register}
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
                        <View questions={questions} />
                    ) : (
                        <div className="spinner_block">
                            <ClipLoader />
                        </div>
                    )}
                    <button className="main_content_btn">Check answers</button>
                </div>
            </form>
            <img className="title_figure_ellipse2" src={figure4} alt="" />
        </div>
    );
};

export default Main;
