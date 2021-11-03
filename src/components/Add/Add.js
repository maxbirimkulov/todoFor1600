

const Add = ({status, setStatus, todo, setTodo, setTodoArr, todoArr}) => {
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
        setTodoArr(todoArr.map( item => {return {...item, option: false}}))
    };

    return (
        <div className='todo__add'>
            <form className='todo__left' onSubmit={addTodo} >
                <label>
                    <input placeholder={status === 'completed' ? 'Заблокировано' : 'Введите задание'} disabled={status === 'completed'} className='todo__add-input' maxLength={30} value={todo} type="text" onChange={handlerAdd} required/>
                </label>
                <button disabled={status === 'completed'} type='submit' className='todo__add-btn' >+</button>
            </form>

            <div className='todo__right'>
                <select value={status} className='todo__add-select' onChange={(e)=> setStatus(e.target.value) }>
                    <option value='all' > all</option>
                    <option value='completed'> completed</option>
                    <option value='active'> active</option>
                </select>
            </div>
        </div>
    );
};

export default Add;




