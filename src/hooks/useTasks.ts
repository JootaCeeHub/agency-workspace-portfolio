
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Task, CreateTaskForm, TaskFilters } from '@/types';
import { useApp } from '@/contexts/AppContext';

// Mock data service - will be replaced with Supabase
const mockTasksService = {
  async getAll(filters?: TaskFilters): Promise<Task[]> {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const mockTasks: Task[] = [
      {
        id: '1',
        title: 'Diseñar mockups homepage',
        description: 'Crear mockups para la nueva homepage del sitio web de ABC Corp',
        project_id: '1',
        assignee_id: 'user-1',
        status: 'in-progress',
        priority: 'high',
        due_date: '2024-07-16',
        estimated_hours: 8,
        actual_hours: 6,
        tags: ['design', 'ui/ux'],
        dependencies: [],
        comments: [],
        attachments: [],
        created_at: '2024-07-10T00:00:00Z',
        updated_at: '2024-07-14T00:00:00Z'
      },
      {
        id: '2',
        title: 'Revisar propuesta de branding',
        description: 'Revisar y dar feedback sobre la propuesta de identidad visual',
        project_id: '2',
        assignee_id: 'user-2',
        status: 'todo',
        priority: 'medium',
        due_date: '2024-07-17',
        estimated_hours: 3,
        tags: ['branding', 'review'],
        dependencies: [],
        comments: [],
        attachments: [],
        created_at: '2024-07-11T00:00:00Z',
        updated_at: '2024-07-11T00:00:00Z'
      },
      {
        id: '3',
        title: 'Implementar sistema de pagos',
        description: 'Integrar Stripe para procesamiento de pagos en la app móvil',
        project_id: '1',
        assignee_id: 'user-3',
        status: 'in-progress',
        priority: 'high',
        due_date: '2024-07-20',
        estimated_hours: 16,
        actual_hours: 12,
        tags: ['development', 'backend'],
        dependencies: [],
        comments: [],
        attachments: [],
        created_at: '2024-07-12T00:00:00Z',
        updated_at: '2024-07-14T00:00:00Z'
      }
    ];

    let filteredTasks = mockTasks;
    
    if (filters?.search) {
      filteredTasks = filteredTasks.filter(t => 
        t.title.toLowerCase().includes(filters.search!.toLowerCase()) ||
        t.description.toLowerCase().includes(filters.search!.toLowerCase())
      );
    }
    
    if (filters?.status?.length) {
      filteredTasks = filteredTasks.filter(t => 
        filters.status!.includes(t.status)
      );
    }
    
    if (filters?.priority?.length) {
      filteredTasks = filteredTasks.filter(t => 
        filters.priority!.includes(t.priority)
      );
    }
    
    if (filters?.project_id) {
      filteredTasks = filteredTasks.filter(t => t.project_id === filters.project_id);
    }
    
    if (filters?.assignee_id) {
      filteredTasks = filteredTasks.filter(t => t.assignee_id === filters.assignee_id);
    }

    return filteredTasks;
  },

  async getById(id: string): Promise<Task> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const tasks = await this.getAll();
    const task = tasks.find(t => t.id === id);
    if (!task) throw new Error('Task not found');
    return task;
  },

  async create(data: CreateTaskForm): Promise<Task> {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const newTask: Task = {
      id: `task-${Date.now()}`,
      ...data,
      status: 'todo',
      dependencies: [],
      comments: [],
      attachments: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    return newTask;
  },

  async update(id: string, data: Partial<Task>): Promise<Task> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const tasks = await this.getAll();
    const existingTask = tasks.find(t => t.id === id);
    if (!existingTask) throw new Error('Task not found');
    
    const updatedTask: Task = {
      ...existingTask,
      ...data,
      updated_at: new Date().toISOString()
    };
    
    return updatedTask;
  },

  async delete(id: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300));
  },

  async updateStatus(id: string, status: Task['status']): Promise<Task> {
    return this.update(id, { status });
  }
};

export const useTasks = (filters?: TaskFilters) => {
  const { dispatch } = useApp();

  return useQuery({
    queryKey: ['tasks', filters],
    queryFn: () => mockTasksService.getAll(filters),
    staleTime: 3 * 60 * 1000, // 3 minutes
  });
};

export const useTask = (id: string) => {
  return useQuery({
    queryKey: ['task', id],
    queryFn: () => mockTasksService.getById(id),
    enabled: !!id,
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  const { addTask, addNotification } = useApp();

  return useMutation({
    mutationFn: (data: CreateTaskForm) => mockTasksService.create(data),
    onSuccess: (newTask) => {
      addTask(newTask);
      addNotification({
        user_id: 'current-user',
        title: 'Tarea Creada',
        message: `La tarea "${newTask.title}" ha sido creada exitosamente.`,
        type: 'success',
        read: false
      });
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    }
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  const { updateTask, addNotification } = useApp();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Task> }) => 
      mockTasksService.update(id, data),
    onSuccess: (updatedTask) => {
      updateTask(updatedTask);
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['task', updatedTask.id] });
    }
  });
};

export const useUpdateTaskStatus = () => {
  const queryClient = useQueryClient();
  const { updateTask } = useApp();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: Task['status'] }) => 
      mockTasksService.updateStatus(id, status),
    onSuccess: (updatedTask) => {
      updateTask(updatedTask);
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    }
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  const { deleteTask, addNotification } = useApp();

  return useMutation({
    mutationFn: (id: string) => mockTasksService.delete(id),
    onSuccess: (_, id) => {
      deleteTask(id);
      addNotification({
        user_id: 'current-user',
        title: 'Tarea Eliminada',
        message: 'La tarea ha sido eliminada exitosamente.',
        type: 'info',
        read: false
      });
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    }
  });
};
