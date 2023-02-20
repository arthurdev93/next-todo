import _ from 'lodash';
import { useEffect, useState } from 'react';
import {PencilIcon, TrashIcon} from '@heroicons/react/24/solid';
import { PlusIcon as PlusIconMini } from '@heroicons/react/20/solid';
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

	const onSaveTask = (action, taskData) => {
		if (action === 'store') {
			const newTaskId = Math.floor(Math.random() * (999999999999 - 1 + 9999) + 1);
			setTasks([ 
				...tasks, 
				{
					...taskData, 
					id: newTaskId
				}
			]) 

		} else {
			const newTasks = tasks;		//o array q quero editar
			const taskIndex = _.findIndex(newTasks, {id: taskData.id})	//atributo q quero modificar
			if (taskIndex !== -1) {
				newTasks[taskIndex] = taskData;
				setTasks(newTasks)			
			}		//validação para garantir q não retornou indefinido
		} 
		setTask({}) 	//para após atualizar, deixar o task como um objeto vazio, p/ não conflitar o proximo create
		setOpenModal(false)	//para fechar o modal, apos clicar no botao
	}


	const removeTask = (taskID) => {
		setTasks(tasks.filter((task) => task.id !== taskID));
	}
	
	const updateTask = (taskData) => {
		setTask(taskData);
		setOpenModal(true);
	}

	useEffect(() => {
		if (!openModal) {
			setTask ({})	//para zerar o objeto no modal, quando ele for fechado = reset
		}
	}, [openModal]
	) 

	return (
		<>
		<TasksModal 
			onSaveTask={onSaveTask}
			task={task}	//status da task
			setOpen={setOpenModal}
			open={openModal}
		/>
		<div className='flex h-screen w-screen items-center bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600'>
			<div className='flex flex-col gap-2 bg-gray-100 py-7 px-10 rounded-xl m-auto shadow-lg selection:bg-blue-300 '>
				<div className='flex flex-row gap-2'>
					<div className='text-4xl text-slate-800 font-mono'>To Do List</div>
					<button className='ml-auto inline-flex items-center rounded-full border text-white p-2 bg-gradient-to-br from-sky-500 to-blue-800 transition ease-in hover:gradiente-none hover:bg-red-600'
						onClick={() => setOpenModal(true)}
					>
        				<PlusIconMini className="h-5 w-5" aria-hidden="true"/>
					</button>

				</div>

				<div className="container flex flex-col items-center justify-center w-full mx-auto bg-white rounded-lg shadow dark:bg-gray-800 my-2">
					<div className="w-full px-4 py-5 border-b sm:px-6">
						<h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
							Task's List
						</h3>
						<p className="max-w-2xl mt-1 text-sm text-gray-500 dark:text-gray-200">
							Manage your Taks
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
										<button className="flex text-right px-2"
											onClick={() => updateTask(task)}
										>
											<PencilIcon className='h-4 w-4 text-gray-800 hover:text-blue-700'/>
										</button>
										<button className="flex text-right"
											onClick={() => removeTask(task.id)}
										>
											<TrashIcon className='h-4 w-4 text-gray-800 hover:text-blue-800'/>
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