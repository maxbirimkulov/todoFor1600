import React, {useState, useEffect, useRef} from 'react'
import * as THREE from 'three'
import NET from 'vanta/dist/vanta.net.min'
import './style.css'
import Add from "./components/Add/Add";
import DeleteCompleted from "./components/DeleteCompleted/DeleteCompleted";
import TodoList from "./components/TodoList/TodoList";



function App() {
    const [todoArr, setTodoArr] = useState([]);
    const [todo, setTodo] = useState('');
    const [status, setStatus] = useState('all');

    const [vantaEffect, setVantaEffect] = useState(0);
    const myRef = useRef(null);
    useEffect(() => {
        if (!vantaEffect) {
            setVantaEffect(NET({
                el: myRef.current,
                THREE: THREE,
                color: 0x7d00f2,
                backgroundColor: 0x0,
                points: 9.00,
                maxDistance: 28.00,
                spacing: 14.00
            }))
        }
        return () => {
            if (vantaEffect) vantaEffect.destroy()
        }
    }, [vantaEffect]);

    let date = new Date();
    let weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const toDate = (date) => {
        return new Intl.DateTimeFormat('en-En', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        }).format(new Date(date))
    };

    useEffect(()=>{
        if (localStorage.getItem('status') !== null){
            setStatus(localStorage.getItem('status'))
        }

        if (localStorage.getItem('todo') !== null){
            setTodoArr(JSON.parse(localStorage.getItem('todo')));
        }
    },[]);


    useEffect(()=>{
        localStorage.setItem('todo', JSON.stringify(todoArr));
    },[todoArr]);

    useEffect(()=>{
        localStorage.setItem('status', status)
    },[status]);

    return (
        <>
            <div className='vanta' ref={myRef}>
            </div>
        <div className="App" >
            <div className="todo">
                <div>
                    <p className='todo__days'>{weekDays[date.getDay()]}</p>
                    <p className='todo__date'>{toDate(date)}</p>
                </div>
                <Add status={status} setStatus={setStatus} todo={todo} setTodo={setTodo} setTodoArr={setTodoArr} todoArr={todoArr}/>

                {todoArr.length === 0 && status === 'all'
                    ? <p className='todo__tasks'>Здесь будут ваши задания</p>
                    : todoArr.filter( item => item.isCompleted).length === 0 && status === 'completed'
                        ? <p className='todo__tasks'>Здесь будут ваши выполненные задания</p>
                        : todoArr.filter( item => !item.isCompleted).length === 0 && status === 'active'
                            ? <p className='todo__tasks'>Здесь будут ваши активные задания</p>
                    : <TodoList todoArr={todoArr} setTodoArr={setTodoArr} status={status}/>
                }
                <DeleteCompleted todoArr={todoArr} setTodoArr={setTodoArr}/>
            </div>
        </div>
            </>
    );
}

export default App;
