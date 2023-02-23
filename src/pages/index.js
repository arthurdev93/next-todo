import _ from 'lodash';		//lodash tem varias funções utilitárias, como encontrar índices de elementos em um array
import { useEffect, useState } from 'react';	//hooks de estado e efeito do ReactJS
import {PencilIcon, TrashIcon} from '@heroicons/react/24/solid';
import { PlusIcon as PlusIconMini } from '@heroicons/react/20/solid';
import Swal from 'sweetalert2';
//cuidar ordem imports - ext/int
import SearchField from '@/components/SearchField';
import TasksModal from '@/components/tasks/TasksModal';

export default function Home() {
	const [openModal, setOpenModal] = useState (false);
	const [task, setTask] = useState({});

	const [tasks, setTasks] = useState([
		{
			id: '123',
			status: true,
			title: 'first task'
		}
	]);

	//onSaveTask é chamada quando uma tarefa é criada ou atualizada no modal
	const onSaveTask = (action, taskData) => {

		if (action === 'store') {
			const newTaskId = Math.floor(Math.random() * (999999999999 - 1 + 9999) + 1);	//geração de ID aleatório
			setTasks([ 
				...tasks, 
				{
					...taskData, 
					id: newTaskId
				}
			]) //Se uma tarefa existente estiver sendo atualizada, é encontrada pelo seu ID e atualizada no array de tarefas

		} else {
			const newTasks = tasks;		
			const taskIndex = _.findIndex(newTasks, {id: taskData.id})	
			if (taskIndex !== -1) {
				newTasks[taskIndex] = taskData;
				setTasks(newTasks)			
			} 
		} 
		// setTask({}) 	//para após atualizar, limpar a task, para não gerar nenhum conflito na proxima criação
		setOpenModal(false)	//para fechar o modal, apos clicar no botao
		Swal.fire({
			position: 'top-end',
			icon: 'success',
			title: 'Task list updated',
			showConfirmButton: false,
			timer: 1500
		  })
	}

	const removeTask = (taskID) => {
		Swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!'
		  }).then((result) => {
			if (result.isConfirmed) {
				setTasks(tasks.filter((task) => task.id !== taskID)); //aqui executa o delete
				Swal.fire(
					'Deleted!',
					'Your file has been deleted.',
					'success'
				)
			}
		  })
	}
	
	//A função updateTask é usada para abrir o modal com os dados da tarefa atualmente selecionada, para que ela possa ser editada.
	const updateTask = (taskData) => {
		setTask(taskData);
		setOpenModal(true);
	}

	//O useEffect é usado para redefinir a tarefa atual para um objeto vazio sempre que o modal é fechado. Finalmente, o componente renderiza a lista de tarefas e o botão para abrir o modal.
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
			<div className='flex flex-col w-1/2 gap-2 bg-gray-100 py-7 px-10 rounded-xl m-auto shadow-lg selection:bg-blue-300 '>
				<div className='flex flex-row gap-2'>
					<div className='text-4xl text-slate-800 font-mono'>To Do List</div>
					<button className='ml-auto inline-flex items-center rounded-full border text-white p-2 bg-gradient-to-br from-sky-500 to-sky-800 transition ease-in hover:from-sky-800 hover:to-sky-500 '
						onClick={() => setOpenModal(true)}
					>
        				<PlusIconMini className="h-7 w-7" aria-hidden="true"/>
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
											<div className="font-medium text-lg dark:text-white">
												{task.title}
											</div>
										</div>
										<button className="flex text-right px-2"
											onClick={() => updateTask(task)}
										>
											<PencilIcon className='h-5 w-5 text-gray-800 hover:text-blue-700'/>
										</button>
										<button className="flex text-right"
											onClick={() => removeTask(task.id)}
										>
											<TrashIcon className='h-5 w-5 text-gray-800 hover:text-blue-800'/>
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