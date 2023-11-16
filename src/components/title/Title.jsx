import { figure, figure2 } from "../../assets";
import { Link } from "react-router-dom";

import "./title.css";

const Title = () => {
    return (
        <div className="title">
            <img className="title_figure_ellipse" src={figure} alt="" />
            <div className="title_content">
                <h1>Quizzical</h1>
                <p>Some description if needed</p>
                <Link className="title_content_start-link" to="/main">
                    Start quiz
                </Link>
            </div>
            <img className="title_figure_ellipse2" src={figure2} alt="" />
        </div>
    );
};

export default Title;
