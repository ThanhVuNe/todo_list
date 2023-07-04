import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import './detail.css'
const Detail = () => {
    const { id } = useParams();
    const [todo, setTodo] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('token')).token;
        console.log(token);
        fetch(`http://localhost:2309/api/get/` + id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token
            }
        }).then(res => res.json())
            .then(data => {
                setTodo(data);


            }).catch(err => {
                console.log(err);
            }
            )
    }, [])

    const updateTodo = async (e) => {
        console.log(e.target.checked);
        const token = JSON.parse(localStorage.getItem('token')).token;
        const res = await fetch('http://localhost:2309/api/update/' + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token
            },
            body: JSON.stringify({ isCompleted: e.target.checked })
        });
        const data = await res.json();
        if (res.status === 400 || !data) {
            console.log('Not Updated');
        } else {
            console.log('Updated');
        }
    }

    const back = () => {
        navigate('/todo');
    }


    return (
        <div className='wrapper1' style={{ justifyContent: "center" }}>
            <div className="todo__container">
                <div className="detail">
                    <h1 className='title' style={{ color: "papayawhip" }}>{todo.title}</h1>
                    <p className='description'>{todo.description}</p>
                    <div style={{ display: "flex" }}>
                        <input onChange={updateTodo} defaultChecked={todo.isCompleted} type="checkbox" id="iscompl" name="vehicle1" />
                        <label for="iscompl"> Is Completed</label><br />

                    </div>
                    <p className='date'>create at: {todo.date}</p>
                    <div className='btn_action'>
                        <button className='btn_delete'>Delete</button>

                    </div>
                    <div className='btn_action'>
                        <button onClick={back} className='btn_back'>Back to home</button>

                    </div>
                </div>

            </div>


        </div>
    )
}

export default Detail
