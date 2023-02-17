import _ from 'lodash';
import { useState } from 'react';
import {TrashIcon} from '@heroicons/react/24/solid';
import { PlusIcon as PlusIconMini } from '@heroicons/react/20/solid'
import { PlusIcon as PlusIconOutline } from '@heroicons/react/24/outline'
//cuidar ordem imports - ext/int
import TasksModal from '@/components/tasks/TasksModal';

export default function Home() {
	const [openModal, setOpenModal] = useState (false)
	const [task, setTask] = useState({});

	const [tasks, setTasks] = useState([
		{
			id: '123',
			status: true,
			title: 'first task'
		}
	]);
	const [taskField, setTaskField] = useState('');

	const removeTask = (taskID) => {
		setTasks(tasks.filter((task) => task.id !== taskID));
	}

	// 	setTasks([
	// 		...tasks,
	// 		{
	// 			id: Math.floor(Math.random() * (999999999999 - 1 + 9999) + 1),
	// 			status: false,
	// 			title: taskField
	// 		}
	// 	]);

	// 	setTaskField('');
	// };
	
	return (
		<>
		<TasksModal 
			setTasks={setTasks}
			task={task}	//status da task
			setTask={setTask}	//após editar, voltar a task como nula (reseta o estado inicial)
			setOpen={setOpenModal}
			open={openModal}
		/>
		<div className='flex bg-slate-600 max-h-screen max-w-full items-center py-4'>
			<div className='flex flex-col gap-2 bg-gray-100 py-2 px-6 my-2 rounded m-auto '>
{/* 				
				<input className='px-2 rounded-lg py-1 border-2 border-black'
					placeholder='Enter your task here'
					onChange={(e) => setTaskField(e.target.value)}
					type={"text"}
					value={taskField}
				/> */}
				<div className='flex flex-row gap-2 py-2 text-blue-700'>
					<div className='text-4xl font-'>To Do List</div>
					<button className='ml-auto inline-flex items-center rounded-full border border-transparent bg-indigo-500 p-2 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
						onClick={() => setOpenModal(true)}
					>
						{/* <PlusIcon className='h-6 w-6 text-blue-600 hover:text-red-500'/> */}
        				<PlusIconMini className="h-5 w-5" aria-hidden="true"/>
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
										<button className="flex justify-end w-24 text-right"
											onClick={() => removeTask(task.id)}
										>
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
	</>
	)
}