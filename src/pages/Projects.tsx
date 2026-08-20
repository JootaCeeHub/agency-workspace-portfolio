
import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical,
  Calendar,
  Users,
  Clock,
  TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const projects = [
    {
      id: 1,
      name: 'Rediseño Web Empresa ABC',
      client: 'ABC Corporation',
      status: 'en-progreso',
      priority: 'alta',
      startDate: '2024-06-01',
      endDate: '2024-07-20',
      progress: 75,
      budget: 15000,
      team: ['Ana García', 'Carlos López'],
      description: 'Rediseño completo del sitio web corporativo con nuevo sistema de gestión de contenidos.'
    },
    {
      id: 2,
      name: 'Branding Startup XYZ',
      client: 'XYZ Innovations',
      status: 'revision',
      priority: 'media',
      startDate: '2024-05-15',
      endDate: '2024-07-18',
      progress: 90,
      budget: 8000,
      team: ['María Rodríguez'],
      description: 'Desarrollo completo de identidad visual para startup tecnológica.'
    },
    {
      id: 3,
      name: 'App Móvil E-commerce',
      client: 'TechStore',
      status: 'en-progreso',
      priority: 'alta',
      startDate: '2024-06-10',
      endDate: '2024-08-15',
      progress: 45,
      budget: 25000,
      team: ['Juan Pérez', 'Laura Martín', 'Diego Sánchez'],
      description: 'Desarrollo de aplicación móvil para plataforma de e-commerce.'
    },
    {
      id: 4,
      name: 'Campaña Digital Q3',
      client: 'Marketing Pro',
      status: 'planificacion',
      priority: 'media',
      startDate: '2024-07-01',
      endDate: '2024-09-30',
      progress: 15,
      budget: 12000,
      team: ['Ana García', 'Carlos López'],
      description: 'Campaña digital integral para el tercer trimestre del año.'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planificacion': return 'bg-gray-100 text-gray-800';
      case 'en-progreso': return 'bg-blue-100 text-blue-800';
      case 'revision': return 'bg-yellow-100 text-yellow-800';
      case 'completado': return 'bg-green-100 text-green-800';
      case 'pausado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'alta': return 'bg-red-100 text-red-800';
      case 'media': return 'bg-yellow-100 text-yellow-800';
      case 'baja': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const statusLabels = {
    planificacion: 'Planificación',
    'en-progreso': 'En Progreso',
    revision: 'En Revisión',
    completado: 'Completado',
    pausado: 'Pausado'
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || project.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Proyectos</h1>
          <p className="text-slate-600 mt-1">Gestiona todos tus proyectos en un solo lugar</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Proyecto
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
          <Input
            placeholder="Buscar proyectos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex space-x-2">
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg bg-white text-sm"
          >
            <option value="all">Todos los estados</option>
            <option value="planificacion">Planificación</option>
            <option value="en-progreso">En Progreso</option>
            <option value="revision">En Revisión</option>
            <option value="completado">Completado</option>
            <option value="pausado">Pausado</option>
          </select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-slate-900 mb-1">{project.name}</h3>
                  <p className="text-slate-600 text-sm">{project.client}</p>
                </div>
                <Button variant="ghost" size="icon" className="text-slate-400">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>

              <p className="text-sm text-slate-600 mb-4 line-clamp-2">{project.description}</p>

              <div className="flex items-center space-x-2 mb-4">
                <Badge className={getStatusColor(project.status)}>
                  {statusLabels[project.status as keyof typeof statusLabels]}
                </Badge>
                <Badge className={getPriorityColor(project.priority)}>
                  {project.priority.charAt(0).toUpperCase() + project.priority.slice(1)}
                </Badge>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Progreso</span>
                  <span className="font-medium">{project.progress}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{project.startDate} - {project.endDate}</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  <span>{project.team.length} colaboradores</span>
                </div>
                <div className="flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  <span>${project.budget.toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-200">
                <div className="flex items-center space-x-2">
                  {project.team.slice(0, 3).map((member, index) => (
                    <div 
                      key={index}
                      className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-xs font-medium text-blue-800"
                    >
                      {member.split(' ').map(n => n[0]).join('')}
                    </div>
                  ))}
                  {project.team.length > 3 && (
                    <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-xs font-medium text-slate-600">
                      +{project.team.length - 3}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <div className="text-slate-400 mb-4">
            <Clock className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-slate-900 mb-2">No se encontraron proyectos</h3>
          <p className="text-slate-600 mb-4">No hay proyectos que coincidan con tu búsqueda.</p>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Crear primer proyecto
          </Button>
        </div>
      )}
    </div>
  );
};

export default Projects;
