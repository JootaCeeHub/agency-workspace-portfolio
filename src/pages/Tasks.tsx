
import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter,
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle2,
  MoreVertical,
  User,
  Kanban,
  List,
  Archive
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTasks, useUpdateTaskStatus } from '@/hooks/useTasks';
import { TaskFilters, Task } from '@/types';
import { TaskCardSkeleton } from '@/components/ui/loading-skeleton';
import { EmptyTasks, EmptySearch, EmptyFiltered } from '@/components/ui/empty-state';
import { useApp } from '@/contexts/AppContext';

const Tasks = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterProject, setFilterProject] = useState('all');
  const [viewMode, setViewMode] = useState<'list' | 'kanban'>('list');

  // Build filters object
  const filters: TaskFilters = {
    search: searchTerm || undefined,
    status: filterStatus !== 'all' ? [filterStatus as Task['status']] : undefined,
    priority: filterPriority !== 'all' ? [filterPriority as Task['priority']] : undefined,
    project_id: filterProject !== 'all' ? filterProject : undefined,
  };

  const { data: tasks = [], isLoading, error } = useTasks(filters);
  const updateTaskStatusMutation = useUpdateTaskStatus();
  const { addNotification } = useApp();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'todo': return 'bg-gray-100 text-gray-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'review': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case 'in-progress': return <Clock className="h-4 w-4 text-blue-600" />;
      case 'review': return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const statusLabels = {
    todo: 'Por Hacer',
    'in-progress': 'En Progreso',
    review: 'En Revisión',
    completed: 'Completada',
    cancelled: 'Cancelada'
  };

  const priorityLabels = {
    low: 'Baja',
    medium: 'Media',
    high: 'Alta',
    urgent: 'Urgente'
  };

  const isOverdue = (dueDate: string, status: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    return due < today && status !== 'completed';
  };

  const handleTaskStatusChange = async (taskId: string, newStatus: Task['status']) => {
    try {
      await updateTaskStatusMutation.mutateAsync({ id: taskId, status: newStatus });
      addNotification({
        user_id: 'current-user',
        title: 'Estado Actualizado',
        message: `La tarea ha sido marcada como "${statusLabels[newStatus]}".`,
        type: 'success',
        read: false
      });
    } catch (error) {
      addNotification({
        user_id: 'current-user',
        title: 'Error',
        message: 'No se pudo actualizar el estado de la tarea.',
        type: 'error',
        read: false
      });
    }
  };

  const handleTaskCompletion = (task: Task, completed: boolean) => {
    const newStatus: Task['status'] = completed ? 'completed' : 'todo';
    handleTaskStatusChange(task.id, newStatus);
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setFilterStatus('all');
    setFilterPriority('all');
    setFilterProject('all');
  };

  const hasActiveFilters = searchTerm || filterStatus !== 'all' || filterPriority !== 'all' || filterProject !== 'all';

  // Kanban columns
  const kanbanColumns: { status: Task['status']; label: string; tasks: Task[] }[] = [
    { status: 'todo', label: 'Por Hacer', tasks: tasks.filter(t => t.status === 'todo') },
    { status: 'in-progress', label: 'En Progreso', tasks: tasks.filter(t => t.status === 'in-progress') },
    { status: 'review', label: 'En Revisión', tasks: tasks.filter(t => t.status === 'review') },
    { status: 'completed', label: 'Completada', tasks: tasks.filter(t => t.status === 'completed') },
  ];

  const TaskCard: React.FC<{ task: Task; showProject?: boolean }> = ({ task, showProject = true }) => (
    <Card className={`hover:shadow-md transition-shadow duration-200 ${
      isOverdue(task.due_date, task.status) ? 'border-red-200 bg-red-50' : ''
    }`}>
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <Checkbox 
            checked={task.status === 'completed'}
            onCheckedChange={(checked) => handleTaskCompletion(task, checked as boolean)}
            className="mt-1"
          />
          
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h3 className={`font-semibold text-lg ${
                  task.status === 'completed' ? 'line-through text-slate-500' : 'text-slate-900'
                }`}>
                  {task.title}
                </h3>
                <p className="text-slate-600 text-sm mt-1">{task.description}</p>
              </div>
              <div className="flex items-center space-x-1">
                <select
                  value={task.status}
                  onChange={(e) => handleTaskStatusChange(task.id, e.target.value as Task['status'])}
                  className="text-xs border rounded px-2 py-1"
                >
                  <option value="todo">Por Hacer</option>
                  <option value="in-progress">En Progreso</option>
                  <option value="review">En Revisión</option>
                  <option value="completed">Completada</option>
                  <option value="cancelled">Cancelada</option>
                </select>
                <Button variant="ghost" size="icon" className="text-slate-400">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 mb-3">
              <Badge className={getStatusColor(task.status)}>
                {getStatusIcon(task.status)}
                <span className="ml-1">{statusLabels[task.status]}</span>
              </Badge>
              <Badge className={getPriorityColor(task.priority)}>
                {priorityLabels[task.priority]}
              </Badge>
              {isOverdue(task.due_date, task.status) && (
                <Badge className="bg-red-100 text-red-800">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  Vencida
                </Badge>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-slate-600">
              {task.assignee && (
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  <span>{task.assignee.name}</span>
                </div>
              )}
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{new Date(task.due_date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                <span>{task.estimated_hours}h estimadas</span>
              </div>
              {showProject && task.project && (
                <div className="flex items-center col-span-full">
                  <span className="text-blue-600 font-medium">{task.project.name}</span>
                </div>
              )}
            </div>

            {task.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-3">
                {task.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (error) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <AlertCircle className="h-12 w-12 mx-auto text-red-500 mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">Error al cargar tareas</h3>
          <p className="text-slate-600">Hubo un problema al cargar las tareas. Inténtalo de nuevo.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Gestión de Tareas</h1>
          <p className="text-slate-600 mt-1">Organiza y da seguimiento a todas las tareas del equipo</p>
        </div>
        <div className="flex items-center space-x-2">
          <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as 'list' | 'kanban')}>
            <TabsList>
              <TabsTrigger value="list">
                <List className="h-4 w-4 mr-2" />
                Lista
              </TabsTrigger>
              <TabsTrigger value="kanban">
                <Kanban className="h-4 w-4 mr-2" />
                Kanban
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nueva Tarea
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
          <Input
            placeholder="Buscar tareas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex flex-wrap space-x-2">
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg bg-white text-sm"
          >
            <option value="all">Todos los estados</option>
            <option value="todo">Por Hacer</option>
            <option value="in-progress">En Progreso</option>
            <option value="review">En Revisión</option>
            <option value="completed">Completada</option>
            <option value="cancelled">Cancelada</option>
          </select>
          <select 
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg bg-white text-sm"
          >
            <option value="all">Todas las prioridades</option>
            <option value="urgent">Urgente</option>
            <option value="high">Alta</option>
            <option value="medium">Media</option>
            <option value="low">Baja</option>
          </select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          {hasActiveFilters && (
            <Button variant="outline" onClick={clearAllFilters}>
              <Archive className="h-4 w-4 mr-2" />
              Limpiar Filtros
            </Button>
          )}
        </div>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <TaskCardSkeleton key={i} />
          ))}
        </div>
      ) : tasks.length === 0 ? (
        hasActiveFilters ? (
          searchTerm ? (
            <EmptySearch searchTerm={searchTerm} />
          ) : (
            <EmptyFiltered resetFilters={clearAllFilters} />
          )
        ) : (
          <EmptyTasks />
        )
      ) : viewMode === 'list' ? (
        /* List View */
        <div className="space-y-4">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      ) : (
        /* Kanban View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kanbanColumns.map((column) => (
            <div key={column.status} className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-slate-900">{column.label}</h3>
                <Badge variant="secondary" className="text-xs">
                  {column.tasks.length}
                </Badge>
              </div>
              <div className="space-y-3 min-h-[200px]">
                {column.tasks.map((task) => (
                  <TaskCard key={task.id} task={task} showProject={true} />
                ))}
                {column.tasks.length === 0 && (
                  <div className="border-2 border-dashed border-slate-200 rounded-lg p-4 text-center text-sm text-slate-500">
                    No hay tareas
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Tasks;
