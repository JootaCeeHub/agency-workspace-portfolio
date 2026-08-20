
import React from 'react';
import { 
  Users, 
  FolderOpen, 
  CheckSquare, 
  TrendingUp,
  Calendar,
  Clock,
  AlertCircle,
  DollarSign
} from 'lucide-react';
import StatsCard from './StatsCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Dashboard = () => {
  const stats = [
    {
      title: 'Proyectos Activos',
      value: 12,
      icon: FolderOpen,
      trend: { value: 8, isPositive: true }
    },
    {
      title: 'Clientes',
      value: 45,
      icon: Users,
      trend: { value: 12, isPositive: true }
    },
    {
      title: 'Tareas Pendientes',
      value: 28,
      icon: CheckSquare,
      trend: { value: -5, isPositive: false }
    },
    {
      title: 'Ingresos Mensuales',
      value: '$24,500',
      icon: DollarSign,
      trend: { value: 15, isPositive: true }
    }
  ];

  const recentProjects = [
    {
      id: 1,
      name: 'Rediseño Web Empresa ABC',
      client: 'ABC Corporation',
      status: 'En progreso',
      progress: 75,
      dueDate: '2024-07-20'
    },
    {
      id: 2,
      name: 'Branding Startup XYZ',
      client: 'XYZ Innovations',
      status: 'Revisión',
      progress: 90,
      dueDate: '2024-07-18'
    },
    {
      id: 3,
      name: 'App Móvil E-commerce',
      client: 'TechStore',
      status: 'En progreso',
      progress: 45,
      dueDate: '2024-08-15'
    }
  ];

  const upcomingTasks = [
    {
      id: 1,
      title: 'Revisión diseños homepage',
      project: 'Rediseño Web ABC',
      dueDate: '2024-07-16',
      priority: 'Alta'
    },
    {
      id: 2,
      title: 'Entrega logo final',
      project: 'Branding XYZ',
      dueDate: '2024-07-17',
      priority: 'Media'
    },
    {
      id: 3,
      title: 'Reunión cliente TechStore',
      project: 'App Móvil E-commerce',
      dueDate: '2024-07-18',
      priority: 'Alta'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-600 mt-1">Resumen general de tu negocio</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Ver Calendario
          </Button>
          <Button>
            <TrendingUp className="h-4 w-4 mr-2" />
            Generar Reporte
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Projects */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FolderOpen className="h-5 w-5 mr-2" />
              Proyectos Recientes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentProjects.map((project) => (
                <div key={project.id} className="border rounded-lg p-4 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-slate-900">{project.name}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      project.status === 'En progreso' 
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mb-3">{project.client}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-slate-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-slate-500">{project.progress}%</span>
                    </div>
                    <div className="flex items-center text-xs text-slate-500">
                      <Clock className="h-3 w-3 mr-1" />
                      {project.dueDate}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Tasks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckSquare className="h-5 w-5 mr-2" />
              Próximas Tareas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingTasks.map((task) => (
                <div key={task.id} className="border rounded-lg p-4 hover:bg-slate-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-900 mb-1">{task.title}</h4>
                      <p className="text-sm text-slate-600 mb-2">{task.project}</p>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center text-xs text-slate-500">
                          <Calendar className="h-3 w-3 mr-1" />
                          {task.dueDate}
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          task.priority === 'Alta' 
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {task.priority}
                        </span>
                      </div>
                    </div>
                    <AlertCircle className={`h-4 w-4 ${
                      task.priority === 'Alta' ? 'text-red-500' : 'text-yellow-500'
                    }`} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
