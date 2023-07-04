import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom'
import Todo from './components/todo/Todo';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Detail from './components/login/todo_detail/detail';
function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<Navigate to={'/todo'} />}></Route>
        <Route path='/todo' element={< Todo />}></Route>
        <Route exact path='/login' element={< Login />}></Route>
        <Route exact path='/register' element={< Register />}></Route>
        <Route exact path='/todo/:id' element={<Detail />}></Route>

        <Route
          path="*"
          element={
            <div>
              <h2>404 Page not found</h2>
            </div>
          }
        />
      </Routes>
    </>
  );
}

export default App;
