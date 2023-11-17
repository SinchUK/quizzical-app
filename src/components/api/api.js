import { decode } from "html-entities";
import axios from "axios";

// const url = "https://opentdb.com/api.php?amount=5&type=multiple";
const api = "https://opentdb.com/api.php?amount=5";

const getData = async (categoryNumber, difficult) => {
    let categoryPath = "";
    if (categoryNumber === 0) {
        categoryPath = "";
    } else {
        categoryPath = `&category=${categoryNumber}`;
    }
    console.log(difficult, "difficult");
    let difficultPath =
        difficult === "Any Difficulty" ? "" : `&difficulty=${difficult}`;

    console.log(
        `${api}${categoryPath}${difficultPath}&type=multiple`,
        "Api url"
    );
    console.log(difficult, "After difficult");
    const data = (
        await axios.get(`${api}${categoryPath}${difficultPath}&type=multiple`)
    ).data.results;

    return transformQuestions(data);
};

const transformQuestions = (arr) => {
    const answers = arr.map((item) => {
        const transformText = (text) => {
            return decode(text);
        };
        const answersArr = [...item.incorrect_answers, item.correct_answer];
        const sortedArr = answersArr.sort(() => 0.5 - Math.random());
        const newAnswers = sortedArr.map((elem) => {
            return {
                answer: transformText(elem),
                isCorrect: elem === item.correct_answer ? true : false,
            };
        });

        return {
            question: transformText(item.question),
            answers: newAnswers,
        };
    });
    // console.log(answers, "answers in Api");
    return answers;
};

export default getData;
