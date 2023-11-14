const url = "https://opentdb.com/api.php?amount=5&type=multiple";

const getData = async () => {
    const response = await fetch(url);
    const data = await response.json();
    return transformQuestions(data.results);
};

const transformQuestions = (arr) => {
    const answers = arr.map((item) => {
        const transformText = (text) => {
            return text
                .replace(/&quot;/gi, '"')
                .replace(/&rdquo;/gi, '"')
                .replace(/&rsquo;/gi, '"')
                .replace(/&#039;/gi, "'");
        };
        const answersArr = [...item.incorrect_answers, item.correct_answer];
        const newAnswers = answersArr.map((elem) => {
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
    return answers;
};

export default getData;
