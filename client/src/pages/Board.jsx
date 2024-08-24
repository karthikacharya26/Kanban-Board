import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { getTasks, updateTask } from '../services/TaskService';
import TaskCard from '../components/TaskCard';

const Board = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await getTasks();
      setTasks(response.data);
    };
    fetchTasks();
  }, []);

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;

    const newTasks = Array.from(tasks);
    const draggedTask = newTasks.find(task => task._id === draggableId);
    draggedTask.status = destination.droppableId;

    const reorderedTasks = newTasks.filter(task => task._id !== draggableId);
    reorderedTasks.splice(destination.index, 0, draggedTask);
    
    setTasks(reorderedTasks);
    await updateTask(draggedTask._id, draggedTask);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {['to-do', 'in-progress', 'done'].map((status) => (
          <Droppable droppableId={status} key={status}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{ width: '30%', padding: '10px', border: '1px solid #ccc', minHeight: '300px' }}
              >
                <h2>{status.replace('-', ' ').toUpperCase()}</h2>
                {tasks
                  .filter(task => task.status === status)
                  .map((task, index) => (
                    <Draggable draggableId={task._id} index={index} key={task._id}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TaskCard task={task} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default Board;
