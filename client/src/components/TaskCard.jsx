import React from 'react';
import PropTypes from 'prop-types';

const TaskCard = ({ task, provided }) => {
  return (
    <div
      ref={provided?.innerRef}
      {...provided?.draggableProps}
      {...provided?.dragHandleProps}
      style={{
        padding: '10px',
        margin: '10px 0',
        backgroundColor: '#f8f8f8',
        border: '1px solid #ddd',
        ...provided?.draggableProps?.style,
      }}
    >
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <small>{task.dueDate || 'No due date provided'}</small>
    </div>
  );
};

// PropTypes validation
TaskCard.propTypes = {
  task: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    dueDate: PropTypes.string, // Make dueDate optional
  }).isRequired,
  provided: PropTypes.object,
};

export default TaskCard;
