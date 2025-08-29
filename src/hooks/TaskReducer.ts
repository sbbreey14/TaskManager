interface Todo {
  id: number,
  text: string,
  completed: boolean;
}

type ActionProps = 
| {type: '[ADD] add_task'; payload: Todo }
| {type: '[REMOVE] remove_task'; payload: number}
| {type: '[TOGGLE] toggle_task'; payload: number}
| {type: '[EDIT] edit_task'; payload: { id: number, name: string } }

export const todoReducerTask = (state: Todo[], action: ActionProps): Todo[] => {
  switch (action.type) {
    case "[ADD] add_task":
      return [...state, action.payload];  
    
    case "[REMOVE] remove_task":
      return state.filter(todo => todo.id !== action.payload);  
    
    case "[TOGGLE] toggle_task":
      return state.map(todo => todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo );
    
    case "[EDIT] edit_task":
      return state.map(todo => todo.id === action.payload.id ? { ...todo, text: action.payload.name } : todo );
    
    default:
      return state;
  };
};