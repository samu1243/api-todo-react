import React, { useState, useEffect } from "react";
import axios from "axios";


const baseUrl = 'http://assets.breatheco.de/apis/fake/todos/user/test';

const Todos = () => {
    const [todo, setTodo] = useState([])
    const [text, setText] = useState("")

    
    const loadTodos = async () => {
        const response = await axios.get(
            baseUrl
            );
            setTodo(response.data);
        };
 


    const putTodos = () => {
        fetch(baseUrl, {
                    method: "PUT",
                    body: JSON.stringify(todo),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }).then((response) => response.json());
            };
    useEffect(() => {
        loadTodos();
        }, []);


	const handleText = (e) => {
		console.log(e.target.value);
		setText(e.target.value);
	};
	const handleClick = (e) => {
		e.preventDefault();
		const newTodo = [...todo, { label: text, done: false }];
		setTodo(newTodo);
		setText("");
	};
	const removeTodo = (position) => {
		const newTodos = [...todo];
		let results = newTodos.filter((todo, index) => index !== position);
		setTodo(results);
	};
    return (

        <>
            <div className="container">
                <div className="title">
                    Api Todo List
                </div>
                <div>
                    <div>
                        <div>
                            <input type="text" placeholder="Write your todo" value={text.label} onChange={handleText} />
                            <button className="button-5" onClick={handleClick}><i className="fa-solid fa-paper-plane fa-xl"></i></button>
                        </div>
                    </div>
                    <div>
                    {!todo ? (
                            <div>Loading...</div>
                        ) : (todo.map((todo , index)=>
                        <div className="div-todo">
                            <div key={index} todo={todo}>{todo.label}</div>
                            <div> <button className="button-7" onClick={()=>{removeTodo(index)}}>X</button></div>

                        </div>)               
                        )}
                    </div>
                    <div className="length-todo">You have {todo.length} to-dos left!</div>
                </div>

            </div>
        </>
    )

}

export default Todos