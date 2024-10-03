import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  let [todolist, setToDoList] = useState([]);
  let saveToDoList = (event) => {


    let toname = event.target.toname.value;
    if (!todolist.includes(toname)) {
      let finaDoList = [...todolist, toname]
      setToDoList(finaDoList);

    }
    else {
      alert("Already exist!!!!!")
    }
    event.preventDefault();

  }
  let list = todolist.map((value, index) => {
    return (
      <ToDoListItems value={value} key={index} indexNumber={index}
        todolist={todolist}
        setToDoList={setToDoList}
      />
    )
  })
  return (
    <div className="App">
      <center>
        <h1>To-do List</h1>
        <form onSubmit={saveToDoList}>

          <input type='text' name='toname' /><button className='btn btn-primary'>Save</button>
        </form>
        <div className='outerDiv'>
          <ul>
            {list}
          </ul>
        </div>
      </center>
    </div>
  );
}

export default App;
function ToDoListItems({ value, indexNumber, setToDoList, todolist }) {
  let [status, setStatus] = useState(false);
  let deleteRow = () => {
    // alert(indexNumber)
    let finalData = todolist.filter((v, i) => i != indexNumber)
    //console.log(finalData)
    setToDoList(finalData);
  }
  let checkStatus = () => {
    setStatus(!status); 

  }
  return (
    <li className={(status) ? 'completetodo' : ''} onClick={checkStatus}>{indexNumber + 1}.{value}<span onClick={deleteRow}>&times;</span></li>
  )
}

