
import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter,
  Calendar,
  DollarSign,
  FileText,
  Send,
  CheckCircle2,
  XCircle,
  Clock,
  MoreVertical,
  Download,
  Eye,
  Edit
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useQuotes } from '@/hooks/useQuotes';
import { Quote } from '@/types';
import { QuoteCardSkeleton } from '@/components/ui/loading-skeleton';
import { EmptyQuotes } from '@/components/ui/empty-state';

const Quotes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const { data: quotes = [], isLoading, error } = useQuotes();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'sent': return 'bg-blue-100 text-blue-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'expired': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft': return <FileText className="h-4 w-4" />;
      case 'sent': return <Send className="h-4 w-4" />;
      case 'accepted': return <CheckCircle2 className="h-4 w-4" />;
      case 'rejected': return <XCircle className="h-4 w-4" />;
      case 'expired': return <Clock className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const statusLabels = {
    draft: 'Borrador',
    sent: 'Enviada',
    accepted: 'Aceptada',
    rejected: 'Rechazada',
    expired: 'Expirada'
  };

  const filteredQuotes = quotes.filter(quote => {
    const matchesSearch = quote.project_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quote.quote_number.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || quote.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const QuoteCard: React.FC<{ quote: Quote }> = ({ quote }) => (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-slate-900 mb-1">
              {quote.project_name}
            </CardTitle>
            <p className="text-sm text-slate-600">#{quote.quote_number}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className={getStatusColor(quote.status)}>
              {getStatusIcon(quote.status)}
              <span className="ml-1">{statusLabels[quote.status as keyof typeof statusLabels]}</span>
            </Badge>
            <Button variant="ghost" size="icon" className="text-slate-400">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-slate-600 line-clamp-2">{quote.description}</p>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 mr-2 text-green-600" />
              <span className="font-medium">${quote.total.toLocaleString()} {quote.currency}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-blue-600" />
              <span>Válida hasta {new Date(quote.valid_until).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="bg-slate-50 rounded-lg p-3">
            <div className="grid grid-cols-3 gap-4 text-xs text-slate-600">
              <div>
                <span className="block font-medium">Subtotal</span>
                <span>${quote.subtotal.toLocaleString()}</span>
              </div>
              <div>
                <span className="block font-medium">Descuento</span>
                <span>{quote.discount}%</span>
              </div>
              <div>
                <span className="block font-medium">Impuestos</span>
                <span>{quote.tax_rate}%</span>
              </div>
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
              <Download className="h-4 w-4 mr-1" />
              PDF
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
          <XCircle className="h-12 w-12 mx-auto text-red-500 mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">Error al cargar cotizaciones</h3>
          <p className="text-slate-600">Hubo un problema al cargar las cotizaciones. Inténtalo de nuevo.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Sistema de Cotizaciones</h1>
          <p className="text-slate-600 mt-1">Gestiona y crea cotizaciones profesionales para tus clientes</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nueva Cotización
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Total Cotizaciones</p>
                <p className="text-2xl font-bold text-slate-900">{quotes.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Aceptadas</p>
                <p className="text-2xl font-bold text-slate-900">
                  {quotes.filter(q => q.status === 'accepted').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Send className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Enviadas</p>
                <p className="text-2xl font-bold text-slate-900">
                  {quotes.filter(q => q.status === 'sent').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Valor Total</p>
                <p className="text-2xl font-bold text-slate-900">
                  ${quotes.reduce((sum, q) => sum + q.total, 0).toLocaleString()}
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
            placeholder="Buscar cotizaciones..."
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
            <option value="sent">Enviadas</option>
            <option value="accepted">Aceptadas</option>
            <option value="rejected">Rechazadas</option>
            <option value="expired">Expiradas</option>
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
            <QuoteCardSkeleton key={i} />
          ))}
        </div>
      ) : filteredQuotes.length === 0 ? (
        <EmptyQuotes />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredQuotes.map((quote) => (
            <QuoteCard key={quote.id} quote={quote} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Quotes;
