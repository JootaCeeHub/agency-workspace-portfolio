
import { Button } from "@/components/ui/button";
import { 
  FolderOpen, 
  CheckSquare, 
  Users, 
  Search, 
  Filter,
  Plus,
  Layers,
  Calculator,
  MessageSquare,
  FileSignature
} from "lucide-react";

export const EmptyProjects = () => (
  <div className="text-center py-12">
    <div className="text-slate-400 mb-4">
      <FolderOpen className="h-16 w-16 mx-auto" />
    </div>
    <h3 className="text-xl font-medium text-slate-900 mb-2">No hay proyectos</h3>
    <p className="text-slate-600 mb-6 max-w-md mx-auto">
      Comienza creando tu primer proyecto para organizar tu trabajo y colaborar con tu equipo.
    </p>
    <Button>
      <Plus className="h-4 w-4 mr-2" />
      Crear primer proyecto
    </Button>
  </div>
);

export const EmptyTasks = () => (
  <div className="text-center py-12">
    <div className="text-slate-400 mb-4">
      <CheckSquare className="h-16 w-16 mx-auto" />
    </div>
    <h3 className="text-xl font-medium text-slate-900 mb-2">No hay tareas</h3>
    <p className="text-slate-600 mb-6 max-w-md mx-auto">
      Crea tareas para organizar el trabajo de tu equipo y dar seguimiento al progreso.
    </p>
    <Button>
      <Plus className="h-4 w-4 mr-2" />
      Crear primera tarea
    </Button>
  </div>
);

export const EmptyClients = () => (
  <div className="text-center py-12">
    <div className="text-slate-400 mb-4">
      <Users className="h-16 w-16 mx-auto" />
    </div>
    <h3 className="text-xl font-medium text-slate-900 mb-2">No hay clientes</h3>
    <p className="text-slate-600 mb-6 max-w-md mx-auto">
      Agrega tus primeros clientes para comenzar a gestionar proyectos y relaciones comerciales.
    </p>
    <Button>
      <Plus className="h-4 w-4 mr-2" />
      Agregar primer cliente
    </Button>
  </div>
);

export const EmptyTemplates = () => (
  <div className="text-center py-12">
    <div className="text-slate-400 mb-4">
      <Layers className="h-16 w-16 mx-auto" />
    </div>
    <h3 className="text-xl font-medium text-slate-900 mb-2">No hay plantillas</h3>
    <p className="text-slate-600 mb-6 max-w-md mx-auto">
      Crea plantillas de proyectos para estandarizar flujos de trabajo y acelerar el inicio de nuevos proyectos.
    </p>
    <Button>
      <Plus className="h-4 w-4 mr-2" />
      Crear primera plantilla
    </Button>
  </div>
);

export const EmptyQuotes = () => (
  <div className="text-center py-12">
    <div className="text-slate-400 mb-4">
      <Calculator className="h-16 w-16 mx-auto" />
    </div>
    <h3 className="text-xl font-medium text-slate-900 mb-2">No hay cotizaciones</h3>
    <p className="text-slate-600 mb-6 max-w-md mx-auto">
      Crea cotizaciones profesionales para enviar a tus clientes y convertir oportunidades en proyectos.
    </p>
    <Button>
      <Plus className="h-4 w-4 mr-2" />
      Crear primera cotización
    </Button>
  </div>
);

export const EmptyBriefs = () => (
  <div className="text-center py-12">
    <div className="text-slate-400 mb-4">
      <MessageSquare className="h-16 w-16 mx-auto" />
    </div>
    <h3 className="text-xl font-medium text-slate-900 mb-2">No hay briefs</h3>
    <p className="text-slate-600 mb-6 max-w-md mx-auto">
      Crea briefs inteligentes para recolectar información detallada de tus clientes antes de iniciar proyectos.
    </p>
    <Button>
      <Plus className="h-4 w-4 mr-2" />
      Crear primer brief
    </Button>
  </div>
);

export const EmptyContracts = () => (
  <div className="text-center py-12">
    <div className="text-slate-400 mb-4">
      <FileSignature className="h-16 w-16 mx-auto" />
    </div>
    <h3 className="text-xl font-medium text-slate-900 mb-2">No hay contratos</h3>
    <p className="text-slate-600 mb-6 max-w-md mx-auto">
      Gestiona contratos legales con tus clientes para formalizar acuerdos y proyectos.
    </p>
    <Button>
      <Plus className="h-4 w-4 mr-2" />
      Crear primer contrato
    </Button>
  </div>
);

export const EmptySearch = ({ searchTerm }: { searchTerm: string }) => (
  <div className="text-center py-12">
    <div className="text-slate-400 mb-4">
      <Search className="h-16 w-16 mx-auto" />
    </div>
    <h3 className="text-xl font-medium text-slate-900 mb-2">No se encontraron resultados</h3>
    <p className="text-slate-600 mb-4">
      No hay elementos que coincidan con "{searchTerm}". Intenta con otros términos de búsqueda.
    </p>
  </div>
);

export const EmptyFiltered = ({ resetFilters }: { resetFilters: () => void }) => (
  <div className="text-center py-12">
    <div className="text-slate-400 mb-4">
      <Filter className="h-16 w-16 mx-auto" />
    </div>
    <h3 className="text-xl font-medium text-slate-900 mb-2">No hay resultados con estos filtros</h3>
    <p className="text-slate-600 mb-6">
      No hay elementos que coincidan con los filtros aplicados. Intenta ajustar o limpiar los filtros.
    </p>
    <Button variant="outline" onClick={resetFilters}>
      Limpiar filtros
    </Button>
  </div>
);

// Generic EmptyState component for flexibility
interface EmptyStateProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState = ({ icon: Icon, title, description, actionLabel, onAction }: EmptyStateProps) => (
  <div className="text-center py-12">
    <div className="text-slate-400 mb-4">
      <Icon className="h-16 w-16 mx-auto" />
    </div>
    <h3 className="text-xl font-medium text-slate-900 mb-2">{title}</h3>
    <p className="text-slate-600 mb-6 max-w-md mx-auto">{description}</p>
    {actionLabel && onAction && (
      <Button onClick={onAction}>
        <Plus className="h-4 w-4 mr-2" />
        {actionLabel}
      </Button>
    )}
  </div>
);
