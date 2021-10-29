import React, {useState} from 'react'
import './style.css'
import Add from "./components/Add/Add";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faThumbtack, faStickyNote, faEdit, faTrashAlt} from '@fortawesome/free-solid-svg-icons';



function App() {
    const [todoArr, setTodoArr] = useState([]);
    const [todo, setTodo] = useState('');

    let date = new Date();
    let weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const toDate = (date) => {
        return new Intl.DateTimeFormat('en-En', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        }).format(new Date(date))
    };

    const handlerComplete = (id) => {
        setTodoArr(todoArr.map((item, idx) => {
            if (item.id === id) {
                return {...item, isCompleted: !item.isCompleted}
            } else {
                return {...item, option: false}
            }
        }))
    };

    const handlerOption = (id) => {
        setTodoArr(todoArr.map((item) => {
            if (item.id === id) {
                return {...item, option: !item.option, addMemo: false, isChange: false}
            } else {
                return {...item, option: false}
            }
        }))
    };

    const handlerEdit = (id) => {
        setTodoArr(todoArr.map((item) => {
            if (item.id === id) {
                return {...item, isChange: !item.isChange, addMemo:false}
            } else {
                return item
            }
        }))
    };


    const handlerDelete = (id) => {
        setTodoArr(todoArr.filter((item) => {
            return item.id !== id
        }))
    };

    const handlerMemo = (id) => {
        setTodoArr(todoArr.map((item, idx) => {
            if (item.id === id) {
                return {...item, addMemo: !item.addMemo, isChange:false}
            } else {
                return item
            }
        }))
    };

    const handlerPin = (id) => {
        setTodoArr(todoArr.map((item,idx)=>{
            if (item.id === id){
                return {...item, pin: !item.pin, option: false}
            } else{
                return item
            }
        }))
    };
    const last = todoArr.length !== 0 ? todoArr.filter((item)=> item.pin).reduce((acc, rec)=>{
        return rec
    },{}) : '';

    return (
        <div className="App">
            <div className="todo">
                <div>
                    <p>{weekDays[date.getDay()]}</p>
                    <p>{toDate(date)}</p>
                </div>
                <Add todo={todo} setTodo={setTodo} setTodoArr={setTodoArr} todoArr={todoArr}/>
                <ul className='todo__menu'>
                    {todoArr.map((item, idx, array) => {
                        return (
                            <li
                                id={last.id === item.id ? 'last': ''}

                                className={`todo__list ${item.pin ? 'pin' : ''}`}
                                key={item.id}>

                                {item.pin
                                ? <span className='todo__list-pin'> <FontAwesomeIcon icon={faThumbtack}/></span>
                                : ''
                                }
                                <div className='todo__list-left'>
                                    <input className='todo__list-input' type="checkbox" checked={item.isCompleted}
                                           onChange={() => handlerComplete(item.id)}/>
                                    <div className='todo__list-text'>
                                        {item.isChange
                                            ?
                                            <textarea id='changeName' className='todo__list-textarea' maxLength={30} onChange={(e) => {
                                                item.name = e.target.value
                                            }}>{item.name}</textarea>
                                            : <span className='todo__list-name'>{item.name}</span>
                                        }

                                        {item.addMemo
                                            ? <textarea className='todo__list-memo-textarea' id='changeMemo' onChange={(e)=>{
                                                item.memo = e.target.value
                                            }}>{item.memo}</textarea>
                                            : <span className='todo__list-memo'>{item.memo}</span>
                                        }
                                    </div>
                                </div>
                                <p className='todo__list-option' onClick={() => handlerOption(item.id)}>...</p>
                                <ul className={`todo__list-options ${item.option ? 'active' : ''}`}>
                                    <li className='todo__list-options-item' onClick={()=> handlerPin(item.id)}>
                                        <FontAwesomeIcon icon={faThumbtack}/>
                                        {item.pin
                                        ? 'Unpin'
                                        : 'Pin on the top'
                                        }
                                    </li>

                                    <li className='todo__list-options-item' onClick={() => handlerMemo(item.id)}>
                                        <FontAwesomeIcon icon={faStickyNote}/>
                                        {item.addMemo
                                        ? 'Save'
                                        : item.memo.length !== 0
                                            ? 'Edit memo'
                                            : 'Add a memo'
                                        }
                                    </li>

                                    <li className='todo__list-options-item' onClick={() => handlerEdit(item.id)}>
                                        <FontAwesomeIcon icon={faEdit}/>
                                        {item.isChange
                                            ? 'Save'
                                            : 'Edit'
                                        }
                                    </li>

                                    <li className='todo__list-options-item' onClick={() => handlerDelete(item.id)}>
                                        <FontAwesomeIcon icon={faTrashAlt}/>
                                        Delete
                                    </li>
                                </ul>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    );
}

export default App;
