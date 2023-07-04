import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import './todo.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Todo = () => {
    const navigate = useNavigate();
    const [todos, setTodos] = useState([]);
    const [searchTodo, setSearchTodo] = useState([]);
    const [title, setTitle] = useState('');
    const [des, setDes] = useState('');
    const [search, setSearch] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token') || null;
        if (token == null) {
            navigate('/login');
        }
    })
    useEffect(() => {
        const auth = JSON.parse(localStorage.getItem('token'));
        if (auth == null) {
            navigate('/login');
            return;
        }
        const token = auth.token;

        fetch('http://localhost:2309/api/getAll', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token
            }
        }).then(res => res.json())
            .then(data => {
                console.log(data);
                setTodos(data);
                setSearchTodo(data);

            }).catch(err => {
                console.log(err);
            }
            )
    }, [])

    const addTodo = async () => {
        if (!title || !des) {
            toast.error('Please fill all the fields');
            return;
        }
        const token = JSON.parse(localStorage.getItem('token')).token;
        const res = await fetch('http://localhost:2309/api/add', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token
            },
            body: JSON.stringify({ title, des })
        });
        const data = await res.json();
        if (res.status === 400 || !data) {
            toast.error('Todo is already exist');
        } else {
            toast.success('Todo Added Successfull');
            console.log(data);
            setTitle('');
            setDes('');
            if (todos.length === 0) {
                setTodos([data]);
                setSearchTodo([data]);
                return;
            }
            setTodos([...todos, data]);
            setSearchTodo([...searchTodo, data]);
        }
    }

    const logout = () => {
        toast.success('Logout Successfull');
        setTimeout(() => {
            navigate('/login');
        }, 1500);
        localStorage.removeItem('token');
    }

    const searchF = (e) => {
        const search = e.target.value;
        setSearch(search);

    }
    useEffect(() => {
        if (todos.length === 0) return;
        const searchTodo = todos.filter(todo => {
            return todo.title.toLowerCase().includes(search.toLowerCase());
        })
        setSearchTodo(searchTodo);
    }, [search])
    return (
        <>

            <div className="wrapper1">
                <div className="form">
                    <input value={search} onChange={searchF} type="text" className='search' placeholder='Search...' />
                </div>
                <ToastContainer />
                <p onClick={logout} className='logout'>Log out</p>
                <article className="todo__container">
                    <header className="header">
                        <figure className="figure">
                            <img src="https://media.istockphoto.com/photos/spiral-bound-notebook-with-todo-list-on-white-wooden-table-with-and-picture-id1193498585?b=1&k=20&m=1193498585&s=170667a&w=0&h=fqPhCl9SoRJPWI9Knz800Ctg7cxc0GCbSREAf3oV03A=" alt="" />
                            <figcaption className="title__caption">
                                <h1 className="title title--primary">Todo's</h1>
                                <h2 className="title title--secondary">to-do list</h2>
                            </figcaption>
                        </figure>
                    </header>

                    <section className="content">

                        <ul className="list__container list__container--primary">
                            {
                                searchTodo.length > 0 ? searchTodo.toReversed().map((todo, index) => (
                                    <Link to={'/todo/' + todo._id}>
                                        <li className={`list__item list__item--primary ${todo.isCompleted ? "text_line" : ""}`}>
                                            <input type="checkbox" id="list-input2" className="list-input2" />
                                            <label for="list-input2" className="list-input-label">
                                                <span className="text--primary">{todo.title} </span>
                                                <span className="icon"><i className="fas fa-check"></i></span>
                                            </label>

                                        </li>
                                    </Link>

                                )) : <h1>No todos</h1>
                            }
                        </ul>
                    </section>
                    <div className="input">
                        <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" className='input_add' placeholder='Add todo' />
                        <button onClick={addTodo} className='btn_add'> Add todo </button>
                    </div>
                    <div className={title.length === 0 ? 'hide' : 'description'}>
                        <input onChange={(e) => setDes(e.target.value)} value={des} type="text" className='input_des' placeholder='Enter description' />
                    </div>
                </article>
            </div>
        </>
    )

}

export default Todo
