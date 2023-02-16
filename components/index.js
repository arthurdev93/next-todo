const { useState } = require("react");

const UserTasks = ({
    user,
    addLoading,
    items,
    onAdd,
    onRemove,
    onAssign,
    onToggle,
    onEdit,
    onUpdate
}) => {
    const newTodo = useInputValue('');

    const handleAddTodo = () => (
        //clear txt input
        newTodo.onChange(''),
        //send
        onAdd(newTodo.value)
    )
}
