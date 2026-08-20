
import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter,
  MessageSquare,
  Calendar,
  User,
  CheckCircle2,
  Clock,
  AlertCircle,
  MoreVertical,
  Edit,
  Send,
  Eye
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useBriefs } from '@/hooks/useBriefs';
import { Brief } from '@/types';
import { BriefCardSkeleton } from '@/components/ui/loading-skeleton';
import { EmptyBriefs } from '@/components/ui/empty-state';

const Briefs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');

  const { data: briefs = [], isLoading, error } = useBriefs();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in-review': return 'bg-blue-100 text-blue-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'needs-revision': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'in-review': return <AlertCircle className="h-4 w-4" />;
      case 'approved': return <CheckCircle2 className="h-4 w-4" />;
      case 'needs-revision': return <Edit className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const statusLabels = {
    pending: 'Pendiente',
    'in-review': 'En Revisión',
    approved: 'Aprobado',
    'needs-revision': 'Necesita Revisión'
  };

  const typeLabels = {
    branding: 'Branding',
    web: 'Desarrollo Web',
    design: 'Diseño',
    marketing: 'Marketing',
    development: 'Desarrollo',
    other: 'Otro'
  };

  const filteredBriefs = briefs.filter(brief => {
    const matchesSearch = brief.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || brief.status === filterStatus;
    const matchesType = filterType === 'all' || brief.project_type === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const BriefCard: React.FC<{ brief: Brief }> = ({ brief }) => (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-slate-900 mb-1">
              {brief.title}
            </CardTitle>
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              <Badge variant="outline" className="text-xs">
                {typeLabels[brief.project_type as keyof typeof typeLabels]}
              </Badge>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className={getStatusColor(brief.status)}>
              {getStatusIcon(brief.status)}
              <span className="ml-1">{statusLabels[brief.status as keyof typeof statusLabels]}</span>
            </Badge>
            <Button variant="ghost" size="icon" className="text-slate-400">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center">
              <User className="h-4 w-4 mr-2 text-blue-600" />
              <span>Cliente: {brief.client?.name || 'Cliente'}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-green-600" />
              <span>{new Date(brief.created_at).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="bg-slate-50 rounded-lg p-3">
            <div className="flex items-center text-sm text-slate-600">
              <MessageSquare className="h-4 w-4 mr-2" />
              <span>{brief.responses.length} respuestas completadas</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-200">
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-1" />
                Ver
              </Button>
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-1" />
                Editar
              </Button>
            </div>
            <Button variant="outline" size="sm">
              <Send className="h-4 w-4 mr-1" />
              Enviar
            </Button>
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
          <h3 className="text-lg font-medium text-slate-900 mb-2">Error al cargar briefs</h3>
          <p className="text-slate-600">Hubo un problema al cargar los briefs. Inténtalo de nuevo.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Sistema de Briefs</h1>
          <p className="text-slate-600 mt-1">Recolecta información detallada de tus clientes</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Brief
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <MessageSquare className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Total Briefs</p>
                <p className="text-2xl font-bold text-slate-900">{briefs.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Pendientes</p>
                <p className="text-2xl font-bold text-slate-900">
                  {briefs.filter(b => b.status === 'pending').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Aprobados</p>
                <p className="text-2xl font-bold text-slate-900">
                  {briefs.filter(b => b.status === 'approved').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <AlertCircle className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">En Revisión</p>
                <p className="text-2xl font-bold text-slate-900">
                  {briefs.filter(b => b.status === 'in-review').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
          <Input
            placeholder="Buscar briefs..."
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
            <option value="pending">Pendiente</option>
            <option value="in-review">En Revisión</option>
            <option value="approved">Aprobado</option>
            <option value="needs-revision">Necesita Revisión</option>
          </select>
          <select 
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg bg-white text-sm"
          >
            <option value="all">Todos los tipos</option>
            <option value="branding">Branding</option>
            <option value="web">Desarrollo Web</option>
            <option value="design">Diseño</option>
            <option value="marketing">Marketing</option>
            <option value="development">Desarrollo</option>
            <option value="other">Otro</option>
          </select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <BriefCardSkeleton key={i} />
          ))}
        </div>
      ) : filteredBriefs.length === 0 ? (
        <EmptyBriefs />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredBriefs.map((brief) => (
            <BriefCard key={brief.id} brief={brief} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Briefs;
