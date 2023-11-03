import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ questions, setQuestions, onUpdate }) {

  const [change, setChange] = useState(false)

  useEffect(() => {
    fetch("http://localhost:4000/questions")
    .then(res => res.json())
    .then(data => {
      console.log(data)
      setQuestions(data)
    })
  }, [change])


  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map(question => (
          <QuestionItem key={question.id} question={question} setChange={setChange} change={change} onUpdate={onUpdate}/>
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
