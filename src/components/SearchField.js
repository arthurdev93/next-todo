import { Fragment, useState } from 'react';
import { UsersIcon } from '@heroicons/react/24/outline';
import { Combobox, Dialog, Transition } from '@headlessui/react';

const people = [
  { id: 1, name: 'Leslie Alexander', url: '#' },
  // More people...
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function searchField() {
  const [query, setQuery] = useState('')

  //usar lodash no filter
  //scroll
  //limitar dados
  const filteredPeople =
    query === ''
      ? []
      : people.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase())
        })

  return (
    
              <Combobox onChange={(person) => (window.location = person.url)}>
                <Combobox.Input
                  className="w-full rounded-md border-0 bg-gray-100 px-4 py-2.5 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                  placeholder="Search..."
                  onChange={(event) => setQuery(event.target.value)}
                />

                {filteredPeople.length > 0 && (
                  <Combobox.Options
                    static
                    className="-mb-2 max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800"
                  >
                    {filteredPeople.map((person) => (
                      <Combobox.Option
                        key={person.id}
                        value={person}
                        className={({ active }) =>
                          classNames(
                            'cursor-default select-none rounded-md px-4 py-2',
                            active && 'bg-indigo-600 text-white'
                          )
                        }
                      >
                        {person.name}
                      </Combobox.Option>
                    ))}
                  </Combobox.Options>
                )}

                {query !== '' && filteredPeople.length === 0 && (
                  <div className="py-14 px-4 text-center sm:px-14">
                    <UsersIcon className="mx-auto h-6 w-6 text-gray-400" aria-hidden="true" />
                    <p className="mt-4 text-sm text-gray-900">No people found using that search term.</p>
                  </div>
                )}
              </Combobox>

  )
}
