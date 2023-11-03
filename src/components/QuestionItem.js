import React from "react";


function QuestionItem({ question, change, setChange, onUpdate }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleDelete() {
    fetch(`http://localhost:4000/questions/${id}`, { 
      method: "DELETE" 
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      setChange(!change)
    })
  }

  function handleChange(event, id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex: event.target.value }),
    })
    .then(res => res.json())
    .then(updatedQuestion => {
      console.log(updatedQuestion)
      onUpdate(updatedQuestion)
    })
  }


  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={e => handleChange(e, id)}>{options}</select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
