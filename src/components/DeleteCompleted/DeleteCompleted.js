

const DeleteCompleted = ({todoArr, setTodoArr}) => {

    const deleteAllCompleted = () => setTodoArr(todoArr.filter(item =>!item.isCompleted));

    return <p className='todo__deleteCompleted' onClick={deleteAllCompleted}>Delete completed</p>
};

export default DeleteCompleted;