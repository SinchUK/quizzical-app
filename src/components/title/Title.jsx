import { Link } from "react-router-dom";

import { figure, figure2 } from "../../assets";
import "./title.css";

const Title = ({ setDifficult, setCategoryNumber }) => {
    const handleChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;

        switch (name) {
            case "selectedDifficult":
                return setDifficult(value);
            case "selectedCategory":
                return setCategoryNumber(value);
            default:
                return new Error("please select items");
        }
    };

    return (
        <div className="title">
            <img className="title_figure_ellipse" src={figure} alt="" />
            <div className="title_content">
                <h1>Quizzical</h1>
                <p>
                    This is a mini-game of questions and answers
                    <br /> on various topics. If you want to try your hand{" "}
                    <br /> at knowledge, then let's get started!
                </p>
                <select
                    onChange={(e) => handleChange(e)}
                    className="title_contnet_select"
                    name="selectedDifficult"
                >
                    <option value="Any difficult">Any Difficulty</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
                <select
                    onChange={(e) => handleChange(e)}
                    className="title_contnet_select"
                    name="selectedCategory"
                >
                    <option value={0}>Any category</option>
                    <option value={9}>General knowledge</option>
                    <option value={17}>Sience and Nature</option>
                    <option value={5}>Mythology</option>
                    <option value={27}>Animals</option>
                    <option value={24}>Politics</option>
                    <option value={22}>Geography</option>
                </select>

                <Link className="title_content_start-link" to="/main">
                    Start quiz
                </Link>
            </div>
            <img className="title_figure_ellipse2" src={figure2} alt="" />
        </div>
    );
};

export default Title;
