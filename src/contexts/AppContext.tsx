
import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { User, Project, Client, Task, Quote, Notification } from '@/types';

interface AppState {
  user: User | null;
  projects: Project[];
  clients: Client[];
  tasks: Task[];
  quotes: Quote[];
  notifications: Notification[];
  loading: {
    projects: boolean;
    clients: boolean;
    tasks: boolean;
    quotes: boolean;
  };
  filters: {
    projects: any;
    tasks: any;
    clients: any;
  };
}

type AppAction =
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_PROJECTS'; payload: Project[] }
  | { type: 'ADD_PROJECT'; payload: Project }
  | { type: 'UPDATE_PROJECT'; payload: Project }
  | { type: 'DELETE_PROJECT'; payload: string }
  | { type: 'SET_CLIENTS'; payload: Client[] }
  | { type: 'ADD_CLIENT'; payload: Client }
  | { type: 'UPDATE_CLIENT'; payload: Client }
  | { type: 'DELETE_CLIENT'; payload: string }
  | { type: 'SET_TASKS'; payload: Task[] }
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'UPDATE_TASK'; payload: Task }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'SET_QUOTES'; payload: Quote[] }
  | { type: 'ADD_QUOTE'; payload: Quote }
  | { type: 'UPDATE_QUOTE'; payload: Quote }
  | { type: 'DELETE_QUOTE'; payload: string }
  | { type: 'SET_NOTIFICATIONS'; payload: Notification[] }
  | { type: 'ADD_NOTIFICATION'; payload: Notification }
  | { type: 'MARK_NOTIFICATION_READ'; payload: string }
  | { type: 'SET_LOADING'; payload: { key: keyof AppState['loading']; value: boolean } }
  | { type: 'SET_FILTER'; payload: { type: keyof AppState['filters']; filter: any } };

const initialState: AppState = {
  user: null,
  projects: [],
  clients: [],
  tasks: [],
  quotes: [],
  notifications: [],
  loading: {
    projects: false,
    clients: false,
    tasks: false,
    quotes: false,
  },
  filters: {
    projects: {},
    tasks: {},
    clients: {},
  },
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    
    case 'SET_PROJECTS':
      return { ...state, projects: action.payload };
    
    case 'ADD_PROJECT':
      return { ...state, projects: [...state.projects, action.payload] };
    
    case 'UPDATE_PROJECT':
      return {
        ...state,
        projects: state.projects.map(p => 
          p.id === action.payload.id ? action.payload : p
        ),
      };
    
    case 'DELETE_PROJECT':
      return {
        ...state,
        projects: state.projects.filter(p => p.id !== action.payload),
      };
    
    case 'SET_CLIENTS':
      return { ...state, clients: action.payload };
    
    case 'ADD_CLIENT':
      return { ...state, clients: [...state.clients, action.payload] };
    
    case 'UPDATE_CLIENT':
      return {
        ...state,
        clients: state.clients.map(c => 
          c.id === action.payload.id ? action.payload : c
        ),
      };
    
    case 'DELETE_CLIENT':
      return {
        ...state,
        clients: state.clients.filter(c => c.id !== action.payload),
      };
    
    case 'SET_TASKS':
      return { ...state, tasks: action.payload };
    
    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, action.payload] };
    
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(t => 
          t.id === action.payload.id ? action.payload : t
        ),
      };
    
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(t => t.id !== action.payload),
      };
    
    case 'SET_QUOTES':
      return { ...state, quotes: action.payload };
    
    case 'ADD_QUOTE':
      return { ...state, quotes: [...state.quotes, action.payload] };
    
    case 'UPDATE_QUOTE':
      return {
        ...state,
        quotes: state.quotes.map(q => 
          q.id === action.payload.id ? action.payload : q
        ),
      };
    
    case 'DELETE_QUOTE':
      return {
        ...state,
        quotes: state.quotes.filter(q => q.id !== action.payload),
      };
    
    case 'SET_NOTIFICATIONS':
      return { ...state, notifications: action.payload };
    
    case 'ADD_NOTIFICATION':
      return { ...state, notifications: [action.payload, ...state.notifications] };
    
    case 'MARK_NOTIFICATION_READ':
      return {
        ...state,
        notifications: state.notifications.map(n =>
          n.id === action.payload ? { ...n, read: true } : n
        ),
      };
    
    case 'SET_LOADING':
      return {
        ...state,
        loading: { ...state.loading, [action.payload.key]: action.payload.value },
      };
    
    case 'SET_FILTER':
      return {
        ...state,
        filters: { ...state.filters, [action.payload.type]: action.payload.filter },
      };
    
    default:
      return state;
  }
}

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  // Helper functions
  addProject: (project: Project) => void;
  updateProject: (project: Project) => void;
  deleteProject: (id: string) => void;
  addClient: (client: Client) => void;
  updateClient: (client: Client) => void;
  deleteClient: (id: string) => void;
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'created_at'>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const addProject = (project: Project) => {
    dispatch({ type: 'ADD_PROJECT', payload: project });
  };

  const updateProject = (project: Project) => {
    dispatch({ type: 'UPDATE_PROJECT', payload: project });
  };

  const deleteProject = (id: string) => {
    dispatch({ type: 'DELETE_PROJECT', payload: id });
  };

  const addClient = (client: Client) => {
    dispatch({ type: 'ADD_CLIENT', payload: client });
  };

  const updateClient = (client: Client) => {
    dispatch({ type: 'UPDATE_CLIENT', payload: client });
  };

  const deleteClient = (id: string) => {
    dispatch({ type: 'DELETE_CLIENT', payload: id });
  };

  const addTask = (task: Task) => {
    dispatch({ type: 'ADD_TASK', payload: task });
  };

  const updateTask = (task: Task) => {
    dispatch({ type: 'UPDATE_TASK', payload: task });
  };

  const deleteTask = (id: string) => {
    dispatch({ type: 'DELETE_TASK', payload: id });
  };

  const addNotification = (notification: Omit<Notification, 'id' | 'created_at'>) => {
    const newNotification: Notification = {
      ...notification,
      id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      created_at: new Date().toISOString(),
    };
    dispatch({ type: 'ADD_NOTIFICATION', payload: newNotification });
  };

  const value: AppContextType = {
    state,
    dispatch,
    addProject,
    updateProject,
    deleteProject,
    addClient,
    updateClient,
    deleteClient,
    addTask,
    updateTask,
    deleteTask,
    addNotification,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
