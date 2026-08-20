
import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter,
  FileText,
  Calendar,
  User,
  CheckCircle2,
  Clock,
  AlertCircle,
  Send,
  Eye,
  Edit,
  Download,
  MoreVertical,
  FileSignature,
  XCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useContracts } from '@/hooks/useContracts';
import { Contract } from '@/types';
import { ContractCardSkeleton } from '@/components/ui/loading-skeleton';
import { EmptyContracts } from '@/components/ui/empty-state';

const Contracts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const { data: contracts = [], isLoading, error } = useContracts();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'sent': return 'bg-blue-100 text-blue-800';
      case 'signed': return 'bg-green-100 text-green-800';
      case 'expired': return 'bg-red-100 text-red-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft': return <FileText className="h-4 w-4" />;
      case 'sent': return <Send className="h-4 w-4" />;
      case 'signed': return <CheckCircle2 className="h-4 w-4" />;
      case 'expired': return <Clock className="h-4 w-4" />;
      case 'cancelled': return <XCircle className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getSignatureStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'signed': return 'bg-green-100 text-green-800';
      case 'declined': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const statusLabels = {
    draft: 'Borrador',
    sent: 'Enviado',
    signed: 'Firmado',
    expired: 'Expirado',
    cancelled: 'Cancelado'
  };

  const signatureLabels = {
    pending: 'Pendiente',
    signed: 'Firmado',
    declined: 'Rechazado'
  };

  const filteredContracts = contracts.filter(contract => {
    const matchesSearch = contract.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || contract.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const ContractCard: React.FC<{ contract: Contract }> = ({ contract }) => (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-slate-900 mb-1">
              {contract.title}
            </CardTitle>
            <p className="text-sm text-slate-600">
              Cliente: {contract.client?.name || 'Cliente'}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className={getStatusColor(contract.status)}>
              {getStatusIcon(contract.status)}
              <span className="ml-1">{statusLabels[contract.status as keyof typeof statusLabels]}</span>
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
              <FileSignature className="h-4 w-4 mr-2 text-purple-600" />
              <div>
                <span className="block text-xs text-slate-500">Estado de Firma</span>
                <Badge className={getSignatureStatusColor(contract.signature_status)} variant="outline">
                  {signatureLabels[contract.signature_status as keyof typeof signatureLabels]}
                </Badge>
              </div>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-blue-600" />
              <div>
                <span className="block text-xs text-slate-500">Expira</span>
                <span className="font-medium">{new Date(contract.expires_at).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-lg p-3">
            <div className="text-sm">
              <h4 className="font-medium text-slate-900 mb-1">Proyecto Asociado</h4>
              <p className="text-slate-600">
                {contract.project?.name || 'Sin proyecto asociado'}
              </p>
              {contract.quote && (
                <p className="text-xs text-slate-500 mt-1">
                  Cotización: {contract.quote.quote_number}
                </p>
              )}
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
            <div className="flex space-x-2">
              {contract.status === 'draft' && (
                <Button variant="outline" size="sm">
                  <Send className="h-4 w-4 mr-1" />
                  Enviar
                </Button>
              )}
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1" />
                PDF
              </Button>
            </div>
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
          <h3 className="text-lg font-medium text-slate-900 mb-2">Error al cargar contratos</h3>
          <p className="text-slate-600">Hubo un problema al cargar los contratos. Inténtalo de nuevo.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Sistema de Contratos</h1>
          <p className="text-slate-600 mt-1">Gestiona contratos legales y acuerdos con tus clientes</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Contrato
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Total Contratos</p>
                <p className="text-2xl font-bold text-slate-900">{contracts.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Firmados</p>
                <p className="text-2xl font-bold text-slate-900">
                  {contracts.filter(c => c.signature_status === 'signed').length}
                </p>
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
                  {contracts.filter(c => c.signature_status === 'pending').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <AlertCircle className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Por Expirar</p>
                <p className="text-2xl font-bold text-slate-900">
                  {contracts.filter(c => new Date(c.expires_at) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)).length}
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
            placeholder="Buscar contratos..."
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
            <option value="draft">Borrador</option>
            <option value="sent">Enviado</option>
            <option value="signed">Firmado</option>
            <option value="expired">Expirado</option>
            <option value="cancelled">Cancelado</option>
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
            <ContractCardSkeleton key={i} />
          ))}
        </div>
      ) : filteredContracts.length === 0 ? (
        <EmptyContracts />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredContracts.map((contract) => (
            <ContractCard key={contract.id} contract={contract} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Contracts;
