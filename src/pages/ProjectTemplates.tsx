
import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter,
  Layers,
  Clock,
  CheckSquare,
  MoreVertical,
  Copy,
  Edit,
  Trash2,
  Play
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProjectTemplate } from '@/types';
import { EmptyState } from '@/components/ui/empty-state';

const ProjectTemplates = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  // Mock templates data - will be replaced with actual API
  const templates: ProjectTemplate[] = [
    {
      id: '1',
      name: 'Rediseño Web Completo',
      description: 'Template para proyectos de rediseño web con análisis, diseño, desarrollo y lanzamiento.',
      category: 'web',
      estimated_duration: 45,
      phases: [
        {
          id: 'phase-1',
          name: 'Análisis y Planificación',
          description: 'Investigación, análisis de requerimientos y planificación del proyecto',
          order: 1,
          estimated_duration: 7,
          deliverables: ['Brief del proyecto', 'Arquitectura de información', 'Plan de proyecto']
        },
        {
          id: 'phase-2',
          name: 'Diseño UX/UI',
          description: 'Wireframes, prototipos y diseño visual',
          order: 2,
          estimated_duration: 14,
          deliverables: ['Wireframes', 'Prototipo interactivo', 'Diseño visual final']
        },
        {
          id: 'phase-3',
          name: 'Desarrollo',
          description: 'Desarrollo frontend y backend',
          order: 3,
          estimated_duration: 18,
          deliverables: ['Sitio web funcional', 'Panel administrativo', 'Documentación técnica']
        },
        {
          id: 'phase-4',
          name: 'Testing y Lanzamiento',
          description: 'Pruebas, optimización y puesta en producción',
          order: 4,
          estimated_duration: 6,
          deliverables: ['Sitio web en producción', 'Manual de usuario', 'Capacitación']
        }
      ],
      default_tasks: [],
      required_fields: ['client_name', 'project_scope', 'target_audience', 'technical_requirements'],
      is_active: true,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-07-01T00:00:00Z'
    },
    {
      id: '2',
      name: 'Identidad Visual Corporativa',
      description: 'Template para desarrollo completo de branding e identidad visual.',
      category: 'branding',
      estimated_duration: 30,
      phases: [
        {
          id: 'phase-1',
          name: 'Research y Estrategia',
          description: 'Investigación de mercado, competencia y definición estratégica',
          order: 1,
          estimated_duration: 8,
          deliverables: ['Brief estratégico', 'Análisis de competencia', 'Moodboard']
        },
        {
          id: 'phase-2',
          name: 'Concepto e Identidad',
          description: 'Desarrollo conceptual y diseño de identidad',
          order: 2,
          estimated_duration: 12,
          deliverables: ['Propuestas conceptuales', 'Logo final', 'Paleta de colores']
        },
        {
          id: 'phase-3',
          name: 'Aplicaciones',
          description: 'Diseño de aplicaciones y material corporativo',
          order: 3,
          estimated_duration: 8,
          deliverables: ['Manual de marca', 'Papelería corporativa', 'Aplicaciones digitales']
        },
        {
          id: 'phase-4',
          name: 'Entrega Final',
          description: 'Entrega de archivos finales y documentación',
          order: 4,
          estimated_duration: 2,
          deliverables: ['Archivos fuente', 'Manual de uso', 'Presentación final']
        }
      ],
      default_tasks: [],
      required_fields: ['company_name', 'industry', 'target_market', 'brand_values'],
      is_active: true,
      created_at: '2024-01-15T00:00:00Z',
      updated_at: '2024-06-15T00:00:00Z'
    },
    {
      id: '3',
      name: 'Campaña Digital Marketing',
      description: 'Template para campañas integrales de marketing digital.',
      category: 'marketing',
      estimated_duration: 60,
      phases: [
        {
          id: 'phase-1',
          name: 'Estrategia y Planificación',
          description: 'Definición de objetivos, audiencia y estrategia',
          order: 1,
          estimated_duration: 10,
          deliverables: ['Estrategia de campaña', 'Plan de contenidos', 'Calendario editorial']
        },
        {
          id: 'phase-2',
          name: 'Creación de Contenido',
          description: 'Desarrollo de assets creativos y contenido',
          order: 2,
          estimated_duration: 20,
          deliverables: ['Assets visuales', 'Contenido escrito', 'Videos promocionales']
        },
        {
          id: 'phase-3',
          name: 'Implementación',
          description: 'Lanzamiento y gestión de la campaña',
          order: 3,
          estimated_duration: 25,
          deliverables: ['Campaña activa', 'Monitoreo diario', 'Optimizaciones']
        },
        {
          id: 'phase-4',
          name: 'Análisis y Reporte',
          description: 'Análisis de resultados y reporte final',
          order: 4,
          estimated_duration: 5,
          deliverables: ['Reporte de resultados', 'Insights', 'Recomendaciones']
        }
      ],
      default_tasks: [],
      required_fields: ['campaign_objectives', 'target_audience', 'budget', 'channels'],
      is_active: true,
      created_at: '2024-02-01T00:00:00Z',
      updated_at: '2024-07-10T00:00:00Z'
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'web': return 'bg-blue-100 text-blue-800';
      case 'branding': return 'bg-purple-100 text-purple-800';
      case 'marketing': return 'bg-green-100 text-green-800';
      case 'development': return 'bg-orange-100 text-orange-800';
      case 'design': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'web': return 'Desarrollo Web';
      case 'branding': return 'Branding';
      case 'marketing': return 'Marketing';
      case 'development': return 'Desarrollo';
      case 'design': return 'Diseño';
      default: return 'Otro';
    }
  };

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || template.category === filterCategory;
    return matchesSearch && matchesCategory && template.is_active;
  });

  const handleCreateProject = (template: ProjectTemplate) => {
    console.log('Creating project from template:', template.name);
    // This will be implemented with actual project creation logic
  };

  const handleEditTemplate = (template: ProjectTemplate) => {
    console.log('Editing template:', template.name);
    // This will be implemented with template editing modal
  };

  const handleDuplicateTemplate = (template: ProjectTemplate) => {
    console.log('Duplicating template:', template.name);
    // This will be implemented with template duplication logic
  };

  const handleDeleteTemplate = (template: ProjectTemplate) => {
    console.log('Deleting template:', template.name);
    // This will be implemented with confirmation dialog and deletion logic
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Plantillas de Proyectos</h1>
          <p className="text-slate-600 mt-1">Acelera la creación de proyectos con plantillas predefinidas</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nueva Plantilla
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
          <Input
            placeholder="Buscar plantillas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex space-x-2">
          <select 
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg bg-white text-sm"
          >
            <option value="all">Todas las categorías</option>
            <option value="web">Desarrollo Web</option>
            <option value="branding">Branding</option>
            <option value="marketing">Marketing</option>
            <option value="development">Desarrollo</option>
            <option value="design">Diseño</option>
          </select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-2">{template.name}</CardTitle>
                  <p className="text-sm text-slate-600 line-clamp-2">{template.description}</p>
                </div>
                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCreateProject(template)}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    <Play className="h-4 w-4 mr-1" />
                    Usar
                  </Button>
                  <div className="relative group">
                    <Button variant="ghost" size="icon" className="text-slate-400">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                    <div className="absolute right-0 top-8 bg-white border rounded-lg shadow-lg py-1 opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-all duration-200 z-10 min-w-[140px]">
                      <button
                        onClick={() => handleEditTemplate(template)}
                        className="flex items-center w-full px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Editar
                      </button>
                      <button
                        onClick={() => handleDuplicateTemplate(template)}
                        className="flex items-center w-full px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Duplicar
                      </button>
                      <button
                        onClick={() => handleDeleteTemplate(template)}
                        className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Badge className={getCategoryColor(template.category)}>
                    {getCategoryLabel(template.category)}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-slate-400" />
                    <span>{template.estimated_duration} días</span>
                  </div>
                  <div className="flex items-center">
                    <Layers className="h-4 w-4 mr-2 text-slate-400" />
                    <span>{template.phases.length} fases</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-slate-900 flex items-center">
                    <CheckSquare className="h-4 w-4 mr-1" />
                    Fases del Proyecto
                  </h4>
                  <div className="space-y-1">
                    {template.phases.slice(0, 3).map((phase, index) => (
                      <div key={phase.id} className="flex items-center text-sm text-slate-600">
                        <span className="w-4 h-4 rounded-full bg-slate-200 text-xs flex items-center justify-center mr-2">
                          {index + 1}
                        </span>
                        <span className="truncate">{phase.name}</span>
                        <span className="ml-auto text-xs">
                          {phase.estimated_duration}d
                        </span>
                      </div>
                    ))}
                    {template.phases.length > 3 && (
                      <div className="text-xs text-slate-500 pl-6">
                        +{template.phases.length - 3} fases más
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <EmptyState
          icon={Layers}
          title="No se encontraron plantillas"
          description={searchTerm || filterCategory !== 'all' 
            ? "No hay plantillas que coincidan con tu búsqueda."
            : "Comienza creando tu primera plantilla para estandarizar tus procesos de trabajo."
          }
          actionLabel="Crear Primera Plantilla"
          onAction={() => console.log('Create template')}
        />
      )}
    </div>
  );
};

export default ProjectTemplates;
