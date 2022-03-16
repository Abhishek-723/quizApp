import React from 'react'
import {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import {Navigate} from 'react-router-dom'
import '../ComponentStyles/home.css'
import swal from 'sweetalert'

function QuizHome() {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([
        {
            questions: "What is the full form of PHP?",
            optionA: "Option A",
            optionB: "Option B",
            optionC: "Option C",
            optionD: "Option D",
            answer: "Option C"
        },
        {
            questions: "What is the full form of CSS?",
            optionA: "Option A",
            optionB: "Option B",
            optionC: "Option C",
            optionD: "Option D",
            answer: "Option C"
        }
    ]);
    const [correctAnswers, setCorrectAnswers] = useState([]);
    const [userAnswer, setUserAnswer] = useState([]);

    useEffect(() => {
        questions.map((question, index) => (
            userAnswer.push("Not Selected")
        ));
        questions.map((question, index) => (
            correctAnswers.push(question.answer)
        ));
    }, [])
    console.log(userAnswer);
    const submitAnswer = () => {
        let val =0;
        let A = [...userAnswer];
        let B = [...correctAnswers];
        for(let i=0; i<A.length; i++) {
            if(A[i]===B[i]){
                val++;
            }
        }
        // console.log(val);
        navigate("/user/results", {state: {userAnswer, correctAnswers, val}});
        swal({
            title: "Congratulations!",
            text: `You have ${val} correct answers out of 10`,
            icon: "success",
            button: "Continue",
        });
    }
    const newAnswer = (i,value) => {
        console.log(i, value);
        let newArr = [...userAnswer];
        newArr[i] = value;
        setUserAnswer(newArr);
    }
  return (
    <div className='quiz__home'>
        <h1>Here you go with the test</h1>
        <p><span>*Total of 10 questions and each one of them are compulsory</span></p>
        <div className="quiz__questions">
            {
                questions.map((question, index) =>(
                    <div className="quiz">
                        <h3>{question.questions}</h3>
                        <div className="options">
                            <div>

                            <input type="radio" name={question.questions} id="question-1-answers-A" value={question.optionA} onClick={() => newAnswer(index, question.optionA)}/>
                            <label for="question-1-answers-A"> A){question.optionA} </label>
                            </div>
                            <div>

                                <input type="radio" name={question.questions} id="question-1-answers-B" value={question.optionB} onClick={() => newAnswer(index, question.optionB)}/>
                                <label for="question-1-answers-B"> B){question.optionB} </label>
                            </div>
                            <div>

                                <input type="radio" name={question.questions} id="question-1-answers-C" value={question.optionC} onClick={() => newAnswer(index, question.optionC)}/>
                                <label for="question-1-answers-C"> C){question.optionC} </label>
                            </div>
                            <div>

                            <input type="radio" name={question.questions} id="question-1-answers-D" value={question.optionD} onClick={() => newAnswer(index, question.optionD)}/>
                            <label for="question-1-answers-D"> D){question.optionD} </label>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
        <button onClick={submitAnswer}>Submit</button>
    </div>
  )
}

export default QuizHome