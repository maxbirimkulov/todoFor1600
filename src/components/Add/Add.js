import React from 'react';

const Add = ({todo, setTodo, setTodoArr, todoArr}) => {
    const addTodo = (e) => {
        e.preventDefault();
        setTodoArr([...todoArr, {
            name:todo,
            isCompleted:false,
            isChange:false,
            pin:false,
            isActive:true,
            option:false,
            addMemo:false,
            memo:'',
            id: Math.floor(Math.random() * 10000)
        }]);
        setTodo('')
    };

    const handlerAdd = (e) => {
        setTodo(e.target.value);
        setTodoArr(todoArr.map((item)=>{
            return {...item, option: false}
        }))
    }

    return (
        <div className='todo__add'>
            <form className='todo__left' onSubmit={addTodo}>
                <label>
                    <input className='todo__add-input' maxLength={30} value={todo} type="text" onChange={handlerAdd} required/>
                </label>
                <button type='submit' className='todo__add-btn' >+</button>
            </form>

            <div className='todo__right'>
                <select className='todo__add-select' name="" id="">
                    <option> all</option>
                    <option> completed</option>
                    <option> important</option>
                </select>
            </div>
        </div>
    );
};

export default Add;




