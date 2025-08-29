import { useEffect, useReducer, useState } from 'react';

import { Plus, Trash2, Check, Pencil } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { todoReducerTask } from './hooks/TaskReducer';

// Regresamos lo que definimos en nuestro localStorage.
const init = () => {
  const setLocalStorage = localStorage.getItem('todos');
  return setLocalStorage ? JSON.parse(setLocalStorage) : []
};

export const TasksApp = () => {

  const [inputValue, setInputValue] = useState('');
  const [ editId, setEditId ] = useState<number | null>(null);

  // Importamos useReducer
  const [ todos , dispatch] = useReducer(todoReducerTask, [], init);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  },[todos]);

  const addTodo = () => {
    if(!inputValue.trim()) return;
    if( editId ){
      dispatch({
        type: '[EDIT] edit_task',
        payload: { id: editId, name: inputValue }
      });
      setEditId(null);
    }else{
      const newTodo = {
        id: Date.now(),
        text: inputValue,
        completed: false,
      }
      dispatch({
        type: '[ADD] add_task',
        payload: newTodo
      });
    }
    setInputValue('');
  };

  const toggleTodo = (id: number) => {
    dispatch({
      type: '[TOGGLE] toggle_task',
      payload: id,
    });
  };

  const deleteTodo = (id: number) => {
    dispatch({
      type: '[REMOVE] remove_task',
      payload: id,
    })
  };

  const editTodo = ( id:number ) => {
    const resp = todos.find( todo => todo.id === id );
    if( !resp ) return;
    const { text } = resp;
    setInputValue( text );
    setEditId(id)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if(e.key === 'Enter'){
        addTodo();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            Lista de Tareas
          </h1>
          <p className="text-slate-600">
            Mantén tus tareas organizadas y consigue hacerlas
          </p>
        </div>

        <Card className="mb-6 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex gap-2">
              <Input
                placeholder="Añade una nueva tarea..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                className="flex-1 border-slate-200 focus:border-slate-400 focus:ring-slate-400"
              />
              <Button
                onClick={addTodo}
                className="bg-slate-800 hover:bg-slate-700 text-white px-4"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-700">
              Tareas
            </CardTitle>
          </CardHeader>
          <CardContent>
            {todos.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center">
                  <Check className="w-8 h-8 text-slate-400" />
                </div>
                <p className="text-slate-500 text-lg mb-2">No hay tareas</p>
                <p className="text-slate-400 text-sm">
                  Añade una tarea arriba para empezar
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {todos.map((todo) => (
                  <div
                    key={todo.id}
                    className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-200 ${
                      todo.completed
                        ? 'bg-slate-50 border-slate-200'
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm'
                    }`}
                  >
                    <Checkbox
                      checked={todo.completed}
                      onCheckedChange={() => toggleTodo(todo.id)}
                      className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                    />
                    <span
                      className={`flex-1 transition-all duration-200 ${
                        todo.completed
                          ? 'text-slate-500 line-through'
                          : 'text-slate-800'
                      }`}
                    >
                      {todo.text}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteTodo(todo.id)}
                      className="text-slate-400 hover:text-red-500 hover:bg-red-50 h-8 w-8 p-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => editTodo(todo.id)}
                      className="text-slate-400 hover:text-yellow-500 hover:bg-red-50 h-8 w-8 p-0"
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};