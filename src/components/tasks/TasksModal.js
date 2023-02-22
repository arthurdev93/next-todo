import Modal from '../shared/Modal';
import { Fragment, useEffect, useState } from 'react';
import { CalendarIcon, TagIcon, UserCircleIcon } from '@heroicons/react/20/solid';
import { Listbox, Transition } from '@headlessui/react';
// const assignees = [
// 	{ name: 'Unassigned', value: null },
// 	{
// 		name: 'Wade Cooper',
// 		value: 'wade-cooper',
// 		avatar:
// 		'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
// 	},
//   	// More items...
// ]
const labels = [
	{ 
        name: 'Unlabelled',
        value: null
    },
	{ 
        name: 'Engineering',
        value: 'engineering' 
    },
	{ 
        name: 'Marketing',
        value: 'marketing' 
    },
	{ 
        name: 'Sales',
        value: 'sales' 
    }
	// More items...
]
const dueDates = [
	{ name: 'No due date', value: null },
	{ name: 'Today', value: 'today' },
	{ name: 'Tomorrow', value: 'tomorrow' }
    // More items...
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function TasksModal({onSaveTask, task, setOpen, open, availableUsers = []}) {

    const [assigned, setAssigned] = useState({ name: 'Unassigned', value: null })
	const [labelled, setLabelled] = useState(labels[0])
	const [dated, setDated] = useState(dueDates[0])
    const [modalAction, setModalAction] = useState(task.id ? 'update' : 'store');
    const [taskData, setTaskData] = useState(task); 

	//abaixo, atualiza os dados da tarefa
	//setTaskData que atualiza o estado da variável taskData através da criação de um novo objeto com os valores antigos do objeto taskData e com a atualização do atributo especificado com o novo valor passado para a função.
    const handleChangeTask = (attribute, value) => setTaskData({
        ...taskData,
        [attribute]: value
    });

	//useEffect retorna 1-o valor atual do estado, e 2-função para atualizar ele
    useEffect(() => {
        availableUsers = [
            { name: 'Unassigned', value: null },
            ...availableUsers
        ]
    }, [availableUsers])
    
	//aqui verifico se a task possui ID --então será editada, ou se é uma nova task que estou adc
	useEffect(() => {
		setTaskData(task)	
		setModalAction(task.id ? 'update' : 'store');
		setAssigned(_.find(availableUsers, {name:task.assigned || 'Unassigned'}))	//procurar a ass q está na task, ou por default deixar unassaigned
	}, [task]);

	//aqui não deixo uma task vazia ser salva
	const handleSaveTask = () => {
		if(!taskData.title || !taskData.description)
			return alert("required fields: title and description");

		onSaveTask(modalAction, taskData);
	}

    return (
        <Modal
            open={open}
            setOpen={setOpen}
        >
                <div className="relative">
					<div className="overflow-hidden rounded-lg border border-gray-300 shadow-sm focus-within:border-blue-800 focus-within:ring-1 focus-within:ring-bue-800">
					<label htmlFor="title" className="sr-only">
						Title
					</label>
					<input
						type="text"
						name="title"
						id="title"
                        onChange={(e)=> handleChangeTask(e.target.id, e.target.value)}
						className="block w-full border-0 pt-2.5 text-lg font-medium placeholder-gray-500 focus:ring-0"
						placeholder="Title"
						value={taskData.title || ''}
					/>
					<label htmlFor="description" className="sr-only">
						Description
					</label>
					<textarea
						rows={2}
						name="description"
						id="description"
                        onChange={(e)=> handleChangeTask(e.target.id, e.target.value)}
						className="block w-full resize-none border-0 py-0 placeholder-gray-500 focus:ring-0 sm:text-sm"
						placeholder="Write a description..."
						value={taskData.description || ''}
					/>

					{/* Spacer element to match the height of the toolbar */}
					<div aria-hidden="true">
						<div className="py-2">
						<div className="h-9" />
						</div>
						<div className="h-px" />
						<div className="py-2">
						<div className="py-px">
							<div className="h-9" />
						</div>
						</div>
					</div>
					</div>

					<div className="absolute inset-x-px bottom-0">
					{/* Actions: These are just examples to demonstrate the concept, replace/wire these up however makes sense for your project. */}
					<div className="flex flex-nowrap justify-end space-x-2 py-2 px-2 sm:px-3">
						<Listbox as="div" value={assigned} onChange={setAssigned} className="flex-shrink-0">
						{({ open }) => (
							<>
							<Listbox.Label className="sr-only"> Assign </Listbox.Label>
							<div className="relative">
								<Listbox.Button className="relative inline-flex items-center whitespace-nowrap rounded-full bg-gray-50 py-2 px-2 text-sm font-medium text-gray-500 hover:bg-gray-100 sm:px-3">
								{assigned.value === null ? (
									<UserCircleIcon className="h-5 w-5 flex-shrink-0 text-gray-300 sm:-ml-1" aria-hidden="true" />
								) : (
									<img src={assigned.avatar} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" />
								)}

								<span
									className={classNames(
									assigned.value === null ? '' : 'text-gray-900',
									'hidden truncate sm:ml-2 sm:block'
									)}
								>
									{assigned.value === null ? 'Assign' : assigned.name}
								</span>
								</Listbox.Button>

								<Transition
								show={open}
								as={Fragment}
								leave="transition ease-in duration-100"
								leaveFrom="opacity-100"
								leaveTo="opacity-0"
								> 
								<Listbox.Options className="absolute right-0 z-10 mt-1 max-h-56 w-52 overflow-auto rounded-lg bg-white py-3 text-base shadow ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
									{availableUsers.map((assignee) => (
									<Listbox.Option
										key={assignee.value}
                                        onChange={(e)=> handleChangeTask('assign', assignee.name)}
										className={({ active }) =>
										classNames(
											active ? 'bg-gray-100' : 'bg-white',
											'relative cursor-default select-none py-2 px-3'
										)
										}
										value={assignee}	//ver como atualizar esses componentes, qual o atributo buscar dados dos select para mostrar na edição, e ao criar, mostrar default 
									>
										<div className="flex items-center">
										{assignee.avatar ? (
											<img src={assignee.avatar} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" />
										) : (
											<UserCircleIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
										)}

										<span className="ml-3 block truncate font-medium">{assignee.name}</span>
										</div>
									</Listbox.Option>
									))}
								</Listbox.Options>
								</Transition>
							</div>
							</>
						)}
						</Listbox>

						<Listbox as="div" value={labelled} onChange={setLabelled} className="flex-shrink-0">
						{({ open }) => (
							<>
							<Listbox.Label className="sr-only"> Add a label </Listbox.Label>
							<div className="relative">
								<Listbox.Button className="relative inline-flex items-center whitespace-nowrap rounded-full bg-gray-50 py-2 px-2 text-sm font-medium text-gray-500 hover:bg-gray-100 sm:px-3">
								<TagIcon
									className={classNames(
									labelled.value === null ? 'text-gray-300' : 'text-gray-500',
									'h-5 w-5 flex-shrink-0 sm:-ml-1'
									)}
									aria-hidden="true"
								/>
								<span
									className={classNames(
									labelled.value === null ? '' : 'text-gray-900',
									'hidden truncate sm:ml-2 sm:block'
									)}
								>
									{labelled.value === null ? 'Label' : labelled.name}
								</span>
								</Listbox.Button>

								<Transition
								show={open}
								as={Fragment}
								leave="transition ease-in duration-100"
								leaveFrom="opacity-100"
								leaveTo="opacity-0"
								>
								<Listbox.Options className="absolute right-0 z-10 mt-1 max-h-56 w-52 overflow-auto rounded-lg bg-white py-3 text-base shadow ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
									{labels.map((label) => (
									<Listbox.Option
										key={label.value}
                                        onChange={(e)=> handleChangeTask('label', label.name)}
										className={({ active }) =>
										classNames(
											active ? 'bg-gray-100' : 'bg-white',
											'relative cursor-default select-none py-2 px-3'
										)
										}
										value={label}
									>
										<div className="flex items-center">
										<span className="block truncate font-medium">{label.name}</span>
										</div>
									</Listbox.Option>
									))}
								</Listbox.Options>
								</Transition>
							</div>
							</>
						)}
						</Listbox>

						<Listbox as="div" value={dated} onChange={setDated} className="flex-shrink-0">
						{({ open }) => (
							<>
							<Listbox.Label className="sr-only"> Add a due date </Listbox.Label>
							<div className="relative">
								<Listbox.Button className="relative inline-flex items-center whitespace-nowrap rounded-full bg-gray-50 py-2 px-2 text-sm font-medium text-gray-500 hover:bg-gray-100 sm:px-3">
								<CalendarIcon
									className={classNames(
									dated.value === null ? 'text-gray-300' : 'text-gray-500',
									'h-5 w-5 flex-shrink-0 sm:-ml-1'
									)}
									aria-hidden="true"
								/>
								<span
									className={classNames(
									dated.value === null ? '' : 'text-gray-900',
									'hidden truncate sm:ml-2 sm:block'
									)}
								>
									{dated.value === null ? 'Due date' : dated.name}
								</span>
								</Listbox.Button>

								<Transition
								show={open}
								as={Fragment}
								leave="transition ease-in duration-100"
								leaveFrom="opacity-100"
								leaveTo="opacity-0"
								>
								<Listbox.Options className="absolute right-0 z-10 mt-1 max-h-56 w-52 overflow-auto rounded-lg bg-white py-3 text-base shadow ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
									{dueDates.map((dueDate) => (
									<Listbox.Option
										key={dueDate.value}
                                        onChange={(e)=> handleChangeTask('dueDate', dueDate.name)}
										className={({ active }) =>
										classNames(
											active ? 'bg-gray-100' : 'bg-white',
											'relative cursor-default select-none py-2 px-3'
										)
										}
										value={dueDate}
									>
										<div className="flex items-center">
										<span className="block truncate font-medium">{dueDate.name}</span>
										</div>
									</Listbox.Option>
									))}
								</Listbox.Options>
								</Transition>
							</div>
							</>
						)}
						</Listbox>
					</div>
					<div className="flex items-center justify-between space-x-3 border-t border-gray-200 px-2 py-2 sm:px-3">
						<div className="flex-shrink-0 ml-auto">
						<button
							type="submit"
                            onClick={() => handleSaveTask()}
							className="ml-auto inline-flex items-center rounded-md border border-transparent bg-blue-800 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:ring-offset-2"
						>
                            {modalAction === 'update'? 'Edit' : 'Create'}
						</button>
						</div>
					</div>
					</div>
				</div>
        </Modal>
    );
}
