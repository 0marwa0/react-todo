import { useState } from "react";
import "./App.css";
import { CiTrash, CiEdit } from "react-icons/ci";

function App() {
  // state to save all the tasks
  const [tasks, setTask] = useState([]);

  // state to control showing/hiding the input for edit
  const [showEdit, setShowEdit] = useState(false);

  // state to handl the input for add
  const [inputTask, setInputTask] = useState("");

  // state handl the input for edit
  const [editedInput, setEditedInput] = useState("");

  // state to save the selected id

  const [selectedId, setSelectedId] = useState(null);
  function Add() {
    // add the new item to the array
    let mytasks = [...tasks];
    // Do not add empty text
    if (inputTask == "") {
      alert("empty text");
    } else {
      mytasks.push({ text: inputTask, id: Math.random(3) });
      // we update the state: tasks
      setTask(mytasks);
    }
  }
  function deleteItem(id) {
    let filterdTasks = tasks.filter((item) => item.id != id);
    // update state
    setTask(filterdTasks);
  }
  function eidt(id) {
    let updatedTasks = tasks.map((item) => {
      if (item.id == id) {
        return { ...item, text: editedInput };
      } else {
        return item;
      }
    });
    setTask(updatedTasks);
    setShowEdit(false);
    selectedId(null);
  }
  return (
    <>
      <input type="text" onChange={(e) => setInputTask(e.target.value)} />
      <button onClick={Add}>Add</button>
      {tasks.map((item) => (
        <div key={item.id} style={{ display: "flex", alignItems: "center" }}>
          {showEdit && item.id == selectedId ? (
            <input
              value={editedInput}
              onChange={(e) => setEditedInput(e.target.value)}
            />
          ) : (
            <p>{item.text}</p>
          )}

          <CiTrash color="red" size={20} onClick={() => deleteItem(item.id)} />
          <CiEdit
            color=" green"
            onClick={() => {
              setShowEdit(true);
              setEditedInput(item.text);
              setSelectedId(item.id);
            }}
          />
          {showEdit && item.id == selectedId ? (
            <button onClick={() => eidt(item.id)}>Save</button>
          ) : (
            ""
          )}
        </div>
      ))}
    </>
  );
}

export default App;
