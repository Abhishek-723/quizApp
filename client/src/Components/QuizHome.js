import React from 'react'
import {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import {Navigate} from 'react-router-dom'
import '../ComponentStyles/home.css'
import swal from 'sweetalert'

function QuizHome() {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [final, setFinal] = useState([]);
    const [correctAnswers, setCorrectAnswers] = useState([]);
    const [userAnswer, setUserAnswer] = useState([]);

    useEffect(async () => {

        const url = "http://localhost:4000";
        await fetch(`${url}/questions`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                // Authorization: "bearer " +localStorage.getItem("Authorization-Token")
            }
        }).then(async res => {
            const d = await res.json();
            console.log(d);
            d.questions.map((c) => {
                const newElement = c.Questions;
                // console.log(c.Questions);
                setQuestions((questions) => [...questions, newElement]);
            });
            // return d;
        })
        questions.map((question, index) => (
            userAnswer.push("Not Selected")
        ));
    }, [])
    const submitAnswer = () => {
        questions.map((question, index) => (
            correctAnswers.push(question.Answers)
        ));
        questions.map((question, index) => (
            final.push(question.Question)
        ));
        let val =0;
        let A = [...userAnswer];
        let B = [...correctAnswers];
        for(let i=0; i<A.length; i++) {
            if(A[i]===B[i]){
                val++;
            }
        }
        // console.log(userAnswer, correctAnswers);
        navigate("/user/results", {state: {userAnswer, correctAnswers, val, final}});
        swal({
            title: "Congratulations!",
            text: `You have ${val} correct answers out of ${correctAnswers.length}`,
            icon: "success",
            button: "Continue",
        });
    }
    const newAnswer = (i,value) => {
        // console.log(i, value);
        let newArr = [...userAnswer];
        newArr[i] = value;
        setUserAnswer(newArr);
    }
  return (
    <div className='quiz__home'>
        <h1>Here you go with the test</h1>
        <p><span>*Total of {questions.length} questions and each one of them are compulsory</span></p>
        <div className="quiz__questions">
            {
                questions.map((question, index) =>(
                    <div className="quiz">
                        <h3>{question.Question}</h3>
                        <div className="options">
                            <div>

                            <input type="radio" name={question.Question} id="question-1-answers-A" value={question.OptionA} onClick={() => newAnswer(index, question.OptionA)}/>
                            <label for="question-1-answers-A"> A){question.OptionA} </label>
                            </div>
                            <div>

                                <input type="radio" name={question.Question} id="question-1-answers-B" value={question.OptionB} onClick={() => newAnswer(index, question.OptionB)}/>
                                <label for="question-1-answers-B"> B){question.OptionB} </label>
                            </div>
                            <div>

                                <input type="radio" name={question.Question} id="question-1-answers-C" value={question.OptionC} onClick={() => newAnswer(index, question.OptionC)}/>
                                <label for="question-1-answers-C"> C){question.OptionC} </label>
                            </div>
                            <div>

                            <input type="radio" name={question.Question} id="question-1-answers-D" value={question.OptionD} onClick={() => newAnswer(index, question.OptionD)}/>
                            <label for="question-1-answers-D"> D){question.OptionD} </label>
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