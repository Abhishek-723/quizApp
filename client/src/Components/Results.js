import React, {useEffect, useState} from 'react'
import {useLocation} from 'react-router-dom'
import '../ComponentStyles/results.css'

function Results() {
    const location = useLocation();
    const [userAnswers, setUserAnswers] = useState(location.state.userAnswer);
    const [cAnswer, setCAnswer] = useState(location.state.correctAnswers);
    const [checkAnswer, setCheckAnswer] = useState([]);
    console.log(location.state);
    useEffect(() => {
      let A = [...userAnswers];
      let B = [...cAnswer];
      let C = [...checkAnswer];
      for(let i=0; i<A.length; i++){
        if(A[i]===B[i]){
          C[i]=true;
          // console.log(val);
        }
        else C[i]=false;
      }
      setCheckAnswer(C);
    }, [])
  return (
    <div className="results">
      <h1>Checkout your results here...</h1>
      {
        checkAnswer.map((data, index) => (
          <div className="check">
            {
              data ? (
                <div className="answers correct">
                  <h3>What is the full form of PHP?</h3>
                  <div>
                    <p>Your Answer : {userAnswers[index]}</p>
                    <p>Correct Answer : {cAnswer[index]}</p>
                  </div>
                </div>

              ) : (
                <div className="answers incorrect">
                  <h3>What is the full form of PHP?</h3>
                  <div>
                    <p>Your Answer : {userAnswers[index]}</p>
                    <p>Correct Answer : {cAnswer[index]}</p>
                  </div>
                </div>
              )
            }
          </div>
          
        ))
      }
    </div>
  )
}

export default Results