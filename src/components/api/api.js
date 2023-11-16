import { decode } from "html-entities";
import axios from "axios";

const url = "https://opentdb.com/api.php?amount=5&type=multiple";

const getData = async () => {
    // const response = await fetch(url);
    // const data = await response.json();
    const data = (await axios.get(url)).data.results;
    console.log(data, "data api");
    return transformQuestions(data);
};

const transformQuestions = (arr) => {
    const answers = arr.map((item) => {
        const transformText = (text) => {
            return decode(text);
        };
        const answersArr = [...item.incorrect_answers, item.correct_answer];
        const sortedArr = answersArr.sort(() => 0.5 - Math.random());
        console.log(item.correct_answer, " : correct");
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
    console.log(answers, "answers in Api");
    return answers;
};

export default getData;
