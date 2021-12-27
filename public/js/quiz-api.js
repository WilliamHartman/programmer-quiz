'use strict';

/**
 * This class simulates an API connection to a service with a persistant
 * data store.
 */
class QuizAPI {
    _quizzes = [
        {
            title: "Star Trek Quiz",
            score: null,
            questions: [
                {
                    text: "Which shirt always dies first?",
                    multi_answer: false,
                    answers: ["green", "blue", "red", "yellow"]
                },
                {
                    text: "______ with Tribbles.",
                    multi_answer: false,
                    answers: ["Trouble", "Corbomite", "Amok", "Flat Cats"]
                },
                {
                    text: "How many lights are there?",
                    multi_answer: false,
                    answers: [1, 2, 3, 5],
                },
                {
                    text: "Which of these is the best Star Trek species? (Choose the best answer)",
                    multi_answer: false,
                    answers: ["Cardassians"],
                }
            ]
        },
        {
            title: "Star Wars Quiz",
            score: null,
            questions: [],
        },
        {
            title: "Chemical Safety",
            score: null,
            questions: [
                {
                    text: "To create an aqueous solution of HCL, you:",
                    multi_answer: false,
                    answers: [
                        "Add the water to the acid.",
                        "Add the acid to the water.",
                        "Whatever feels good to you. Chemistry is subjective."
                    ]
                }
            ]
        },
        {
            title: "Known Planets",
            score: null,
            questions: [
                {
                    text: "Larget planet in the solar system",
                    multi_answer: false,
                    answers: [
                        "Venus",
                        "Earth",
                        "Mars",
                        "Ceres",
                        "Jupiter"
                    ]
                },
                {
                    text: "Which of these are moons of Saturn?",
                    multi_answer: true,
                    answers: [
                        "Triton",
                        "Miranda",
                        "Titan",
                        "Dione"
                    ]
                },
                {
                    text: "Whick of these things don't orbit the Earth?",
                    multi_answer: true,
                    answers: [
                        "The Sun (sol)",
                        "Mars",
                        "The Moon (Luna)",
                        "The galatic center."
                    ]
                },
                {
                    text: "What is the furthest know planet from the Sun?",
                    multi_answer: false,
                    answers: [
                        "Pluto",
                        "Eris",
                        "Neptune",
                        "Uranus"
                    ]
                },
                {
                    text: 'Whis of these is an imaginary astronomical body?',
                    multi_answer: false,
                    answers: [
                        "Mercury",
                        "Charon",
                        "Cardassia",
                        "50000 Quaoar"
                    ]
                }
            ]
        }
    ];

    #answer_keys = [
        [2, 0, 3, 0],
        [],
        [1],
        [3, [3,4], [0, 1, 3], 2, 2],
    ];

    constructor() {
    }

    /**
     * Get the quiz its id
     * @param {number} quiz_id An integer begining with 0.
     */
    async getQuizById (quiz_id) {
        if (quiz_id > this._quizzes.length - 1 || quiz_id < 0) {
            throw 'No quiz matches supplied quiz_id.';
        }

        return this._quizzes[quiz_id];
    }


    /**
     * Returns an array of objects with metadata about all quizzes.
     */
    async getAllQuizMeta () {
        const quiz_meta = [];
        for (let i = 0; i < this._quizzes.length; i++) {
            let quiz_data = {
                title: this._quizzes[i].title,
                score: this._quizzes[i].score,
                num_questions: this._quizzes[i].questions.length
            };
            quiz_meta.push(quiz_data);
        }

        return quiz_meta;
    }

    /**
     * Grade a quiz by passing its id and answers.
     * @param {number} quiz_id An integer begining with 0.
     * @param {Array} supplied_answers An array of indexes of answers in the original order of the questions.
     * @return {number} An integer representing the number of correct answers.
     */
    async gradeQuiz (quiz_id, supplied_answers) {
        const quiz = await this.getQuizById(quiz_id);
        const answer_key = this.#getAnswersByQuizId(quiz_id);
        let num_correct_answers = 0;

        // Sanity check the number of supplied answers.
        if (answer_key.length != supplied_answers.length) {
            throw 'The length of the supplied answers does not match the number of questions in the references answer key.';
        }

        // Don't grade a quiz with no questions.
        if (0 === quiz.questions.length) {
            throw 'Cannot grade empty quiz.';
        }

        for (let answer_id = 0; answer_id < supplied_answers.length; answer_id++) {
            // Multiple answers.
            if (quiz.questions[answer_id].multi_answer) {
                if (!Array.isArray(supplied_answers[answer_id])) {
                    throw 'Multi-answer responses must be encapsulated as arrays.';
                }


                // Make sure multiple response questions have the same selected answers.
                if (
                    supplied_answers[answer_id].length == answer_key[answer_id].length &&
                    supplied_answers[answer_id].every(
                        (value, index) => {
                            return value ==  answer_key[answer_id][index];
                        }
                    )
                ) {
                    num_correct_answers++;
                }
            }
            //Single answers
            else {
                if (Number.isNaN(supplied_answers[answer_id])) {
                    throw 'Single answers must be numbers.';
                }

                if (answer_key[answer_id] == supplied_answers[answer_id]) {
                    num_correct_answers++;
                }
            }
        }


        quiz.score = num_correct_answers;
        return num_correct_answers;
    }

    #getAnswersByQuizId (quiz_id) {
        if (quiz_id > this.#answer_keys.length - 1 || quiz_id < 0) {
            throw `No answer key exists for quiz id: ${quiz_id}`;
        }

        return this.#answer_keys[quiz_id];
    }


};

export let quiz_api = new QuizAPI();

/*
let q = new QuizAPI();

console.log(q.getQuizById(0));
*/
