
import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter,
  Users,
  Mail,
  Phone,
  Building,
  Crown,
  User,
  Shield,
  MoreVertical,
  Edit,
  Trash2,
  UserPlus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useCollaborators } from '@/hooks/useCollaborators';
import { User as UserType } from '@/types';
import { CollaboratorCardSkeleton } from '@/components/ui/loading-skeleton';
import { EmptyState } from '@/components/ui/empty-state';

const Collaborators = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');

  const { data: collaborators = [], isLoading, error } = useCollaborators();

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-purple-100 text-purple-800';
      case 'collaborator': return 'bg-blue-100 text-blue-800';
      case 'client': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <Crown className="h-4 w-4" />;
      case 'collaborator': return <User className="h-4 w-4" />;
      case 'client': return <Shield className="h-4 w-4" />;
      default: return <User className="h-4 w-4" />;
    }
  };

  const roleLabels = {
    admin: 'Administrador',
    collaborator: 'Colaborador',
    client: 'Cliente'
  };

  const filteredCollaborators = collaborators.filter(collaborator => {
    const matchesSearch = collaborator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         collaborator.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || collaborator.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const CollaboratorCard: React.FC<{ collaborator: UserType }> = ({ collaborator }) => (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={collaborator.avatar} />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                {collaborator.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg font-semibold text-slate-900">
                {collaborator.name}
              </CardTitle>
              <p className="text-sm text-slate-600">{collaborator.email}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className={getRoleColor(collaborator.role)}>
              {getRoleIcon(collaborator.role)}
              <span className="ml-1">{roleLabels[collaborator.role as keyof typeof roleLabels]}</span>
            </Badge>
            <Button variant="ghost" size="icon" className="text-slate-400">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-3 text-sm">
            {collaborator.company && (
              <div className="flex items-center">
                <Building className="h-4 w-4 mr-2 text-slate-400" />
                <span>{collaborator.company}</span>
              </div>
            )}
            {collaborator.phone && (
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-slate-400" />
                <span>{collaborator.phone}</span>
              </div>
            )}
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-2 text-slate-400" />
              <span className="text-xs text-slate-500">
                Miembro desde {new Date(collaborator.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="bg-slate-50 rounded-lg p-3">
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="block font-medium text-slate-700">Proyectos Activos</span>
                <span className="text-lg font-bold text-slate-900">3</span>
              </div>
              <div>
                <span className="block font-medium text-slate-700">Tareas Pendientes</span>
                <span className="text-lg font-bold text-slate-900">7</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-200">
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-1" />
                Editar
              </Button>
              <Button variant="outline" size="sm">
                <Mail className="h-4 w-4 mr-1" />
                Mensaje
              </Button>
            </div>
            {collaborator.role !== 'admin' && (
              <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                <Trash2 className="h-4 w-4 mr-1" />
                Eliminar
              </Button>
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
          <Users className="h-12 w-12 mx-auto text-red-500 mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">Error al cargar colaboradores</h3>
          <p className="text-slate-600">Hubo un problema al cargar la lista de colaboradores. Inténtalo de nuevo.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Gestión de Colaboradores</h1>
          <p className="text-slate-600 mt-1">Administra tu equipo y permisos de acceso</p>
        </div>
        <Button>
          <UserPlus className="h-4 w-4 mr-2" />
          Invitar Colaborador
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Total Colaboradores</p>
                <p className="text-2xl font-bold text-slate-900">{collaborators.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Crown className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Administradores</p>
                <p className="text-2xl font-bold text-slate-900">
                  {collaborators.filter(c => c.role === 'admin').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <User className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Colaboradores</p>
                <p className="text-2xl font-bold text-slate-900">
                  {collaborators.filter(c => c.role === 'collaborator').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <UserPlus className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Activos Este Mes</p>
                <p className="text-2xl font-bold text-slate-900">
                  {collaborators.filter(c => new Date(c.updated_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length}
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
            placeholder="Buscar colaboradores..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex space-x-2">
          <select 
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg bg-white text-sm"
          >
            <option value="all">Todos los roles</option>
            <option value="admin">Administradores</option>
            <option value="collaborator">Colaboradores</option>
            <option value="client">Clientes</option>
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
            <CollaboratorCardSkeleton key={i} />
          ))}
        </div>
      ) : filteredCollaborators.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No se encontraron colaboradores"
          description={searchTerm || filterRole !== 'all' 
            ? "No hay colaboradores que coincidan con tu búsqueda."
            : "Comienza invitando a tu equipo para colaborar en proyectos."
          }
          actionLabel="Invitar Primer Colaborador"
          onAction={() => console.log('Invite collaborator')}
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCollaborators.map((collaborator) => (
            <CollaboratorCard key={collaborator.id} collaborator={collaborator} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Collaborators;
