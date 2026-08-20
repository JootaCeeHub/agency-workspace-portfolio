
import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Mail, 
  Phone, 
  Building2,
  MapPin,
  Calendar,
  DollarSign,
  MoreVertical,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Clients = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const clients = [
    {
      id: 1,
      name: 'ABC Corporation',
      email: 'contacto@abccorp.com',
      phone: '+1 (555) 123-4567',
      company: 'ABC Corporation',
      address: 'New York, NY',
      status: 'activo',
      source: 'referido',
      totalProjects: 3,
      totalValue: 45000,
      lastContact: '2024-07-10',
      avatar: 'AC',
      notes: 'Cliente premium con proyectos recurrentes de gran escala.'
    },
    {
      id: 2,
      name: 'María González',
      email: 'maria@xyzinnovations.com',
      phone: '+1 (555) 987-6543',
      company: 'XYZ Innovations',
      address: 'San Francisco, CA',
      status: 'prospecto',
      source: 'website',
      totalProjects: 1,
      totalValue: 8000,
      lastContact: '2024-07-12',
      avatar: 'MG',
      notes: 'Interesada en servicios de branding para startup.'
    },
    {
      id: 3,
      name: 'TechStore Inc',
      email: 'projects@techstore.com',
      phone: '+1 (555) 456-7890',
      company: 'TechStore Inc',
      address: 'Austin, TX',
      status: 'activo',
      source: 'linkedin',
      totalProjects: 2,
      totalValue: 37000,
      lastContact: '2024-07-08',
      avatar: 'TS',
      notes: 'E-commerce en crecimiento, proyectos de desarrollo móvil.'
    },
    {
      id: 4,
      name: 'Laura Chen',
      email: 'laura@marketingpro.com',
      phone: '+1 (555) 321-0987',
      company: 'Marketing Pro',
      address: 'Los Angeles, CA',
      status: 'fidelizado',
      source: 'referido',
      totalProjects: 5,
      totalValue: 62000,
      lastContact: '2024-07-11',
      avatar: 'LC',
      notes: 'Cliente fiel desde hace 2 años, campanhas digitales mensuales.'
    },
    {
      id: 5,
      name: 'StartupXYZ',
      email: 'hello@startupxyz.com',
      phone: '+1 (555) 654-3210',
      company: 'StartupXYZ',
      address: 'Seattle, WA',
      status: 'inactivo',
      source: 'social_media',
      totalProjects: 1,
      totalValue: 5000,
      lastContact: '2024-05-20',
      avatar: 'SX',
      notes: 'Proyecto completado en Q1, sin nuevas oportunidades por ahora.'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'prospecto': return 'bg-yellow-100 text-yellow-800';
      case 'activo': return 'bg-blue-100 text-blue-800';
      case 'fidelizado': return 'bg-green-100 text-green-800';
      case 'inactivo': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSourceColor = (source: string) => {
    switch (source) {
      case 'referido': return 'bg-purple-100 text-purple-800';
      case 'website': return 'bg-blue-100 text-blue-800';
      case 'linkedin': return 'bg-indigo-100 text-indigo-800';
      case 'social_media': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const statusLabels = {
    prospecto: 'Prospecto',
    activo: 'Activo',
    fidelizado: 'Fidelizado',
    inactivo: 'Inactivo'
  };

  const sourceLabels = {
    referido: 'Referido',
    website: 'Website',
    linkedin: 'LinkedIn',
    social_media: 'Redes Sociales'
  };

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || client.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">CRM Clientes</h1>
          <p className="text-slate-600 mt-1">Gestiona tu cartera de clientes y prospectos</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Cliente
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
          <Input
            placeholder="Buscar clientes..."
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
            <option value="prospecto">Prospecto</option>
            <option value="activo">Activo</option>
            <option value="fidelizado">Fidelizado</option>
            <option value="inactivo">Inactivo</option>
          </select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredClients.map((client) => (
          <Card key={client.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-lg font-semibold text-blue-800">
                    {client.avatar}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-slate-900">{client.name}</h3>
                    <p className="text-slate-600 text-sm">{client.company}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="text-slate-400">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-slate-600">
                  <Mail className="h-4 w-4 mr-2" />
                  <span className="truncate">{client.email}</span>
                </div>
                <div className="flex items-center text-sm text-slate-600">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>{client.phone}</span>
                </div>
                <div className="flex items-center text-sm text-slate-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{client.address}</span>
                </div>
              </div>

              <div className="flex items-center space-x-2 mb-4">
                <Badge className={getStatusColor(client.status)}>
                  {statusLabels[client.status as keyof typeof statusLabels]}
                </Badge>
                <Badge className={getSourceColor(client.source)}>
                  {sourceLabels[client.source as keyof typeof sourceLabels]}
                </Badge>
              </div>

              <div className="space-y-2 mb-4 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Proyectos:</span>
                  <span className="font-medium">{client.totalProjects}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Valor total:</span>
                  <span className="font-medium text-green-600">${client.totalValue.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Último contacto:</span>
                  <span className="font-medium">{client.lastContact}</span>
                </div>
              </div>

              <div className="bg-slate-50 rounded-lg p-3 mb-4">
                <p className="text-sm text-slate-600 line-clamp-2">{client.notes}</p>
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Mail className="h-4 w-4 mr-1" />
                  Email
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Phone className="h-4 w-4 mr-1" />
                  Llamar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredClients.length === 0 && (
        <div className="text-center py-12">
          <div className="text-slate-400 mb-4">
            <Building2 className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-slate-900 mb-2">No se encontraron clientes</h3>
          <p className="text-slate-600 mb-4">No hay clientes que coincidan con tu búsqueda.</p>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Agregar primer cliente
          </Button>
        </div>
      )}
    </div>
  );
};

export default Clients;
