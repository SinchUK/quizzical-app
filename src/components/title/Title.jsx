import { figure, figure2 } from "../../assets";

import "./title.css";

const Title = () => {
    return (
        <div className="title">
            <img className="title_figure_ellipse" src={figure} alt="" />
            <div className="title_content">
                <h1>Quizzical</h1>
                <p>Some description if needed</p>
                <button>Start quiz</button>
            </div>
            <img className="title_figure_ellipse2" src={figure2} alt="" />
        </div>
    );
};

export default Title;
