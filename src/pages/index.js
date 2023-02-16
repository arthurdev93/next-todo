import _ from 'lodash';
import {TrashIcon, PencilIcon} from '@heroicons/react/24/solid';
import { useState } from 'react';

export default function Home() {
	const [tasks, setTasks] = useState([
		{
			id: '123',
			status: true,
			title: 'first task'
		}
	]);
	const [taskField, setTaskField] = useState('');

	const addTask = () => {
		if(taskField.length < 1) {
			alert('task name cannot be empty!');
			return;
		} else if(_.find(tasks, {title: taskField}) !== undefined) {
			alert('already exists a task with this name!');
			return;
		}

		setTasks([
			...tasks,
			{
				id: Math.floor(Math.random() * (999999999999 - 1 + 9999) + 1),
				status: false,
				title: taskField
			}
		]);

		setTaskField('');
	};

	const removeTask = (taskID) => {
		setTasks(tasks.filter((task) => task.id !== taskID));
	}

	const changeStatus = (taskID, newStatus) => {
		const modifiedTasks = _.map(
			tasks,
			(task) => {
				if (task.id === taskID) {
					return {
						...task,
						status: newStatus
					}
				} else {
					return task;
				}
			}
		);

		setTasks(modifiedTasks);
	}
	return (
		<div className='flex bg-slate-600 max-h-screen max-w-full items-center py-4'>
			<div className='flex flex-col gap-2 bg-gray-100 py-2 px-6 my-2 rounded m-auto '>
				<div className='text-4xl font-'>To Do List</div>
				<input className='px-2 rounded-lg py-1 border-2 border-black'
					placeholder='Enter your task here'
					onChange={(e) => setTaskField(e.target.value)}
					type={"text"}
					value={taskField}
				/>
				<div className='flex flex-row gap-2 py-2 text-blue-700'>
					<button className='bg-gray-300 py-2 px-4 rounded-lg hover:text-white hover:bg-blue-500'>
						Add
					</button>
					<button 
						className='bg-gray-300 py-2 px-4 rounded-lg hover:text-white hover:bg-blue-500'
						onClick={() => addTask()}
					>
						Save
					</button>
					<button className='bg-gray-300 py-2 px-4 rounded-lg hover:text-white hover:bg-blue-500'>
						Load
					</button>
				</div>

				<div className="container flex flex-col items-center justify-center w-full mx-auto bg-white rounded-lg shadow dark:bg-gray-800">
					<div className="w-full px-4 py-5 border-b sm:px-6">
						<h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
							Lista de tarefas
						</h3>
						<p className="max-w-2xl mt-1 text-sm text-gray-500 dark:text-gray-200">
							Gerencie suas tarefas
						</p>
					</div>
					<ul className="flex flex-col divide-y divide w-full">
						{
							tasks.map((task) => (
								<li className="flex flex-row" key={task.id}>
									<div className="flex items-center flex-1 p-4">
										<div className="flex-1 pl-1 mr-16">
											<div className="font-medium dark:text-white">
												{task.title}
											</div>
										</div>
										<button className="flex justify-end w-24 text-right">
											<TrashIcon className='h-4 w-4 text-blue-600 hover:text-red-500'/>
										</button>
									</div>
								</li>

							))
						}
						
					</ul>
				</div>

			</div>
		</div>
	)
}
