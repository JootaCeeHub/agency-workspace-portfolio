
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Quote, CreateQuoteForm } from '@/types';
import { useApp } from '@/contexts/AppContext';

// Mock data service - will be replaced with Supabase
const mockQuotesService = {
  async getAll(): Promise<Quote[]> {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const mockQuotes: Quote[] = [
      {
        id: '1',
        client_id: 'client-1',
        project_name: 'Rediseño Web Corporativo',
        description: 'Desarrollo completo de nueva web con CMS',
        status: 'sent',
        quote_number: 'COT-2024-001',
        items: [
          {
            id: '1',
            name: 'Diseño UI/UX',
            description: 'Diseño completo de interfaz y experiencia de usuario',
            quantity: 1,
            unit_price: 2500,
            total: 2500,
            category: 'Design'
          },
          {
            id: '2',
            name: 'Desarrollo Frontend',
            description: 'Desarrollo e implementación del frontend',
            quantity: 40,
            unit_price: 50,
            total: 2000,
            category: 'Development'
          }
        ],
        subtotal: 4500,
        discount: 0,
        tax_rate: 19,
        total: 5355,
        currency: 'USD',
        valid_until: '2024-08-15',
        notes: 'Propuesta válida por 30 días. Incluye 2 rondas de revisiones.',
        terms: 'Pago 50% inicial, 50% al finalizar proyecto.',
        created_at: '2024-07-15T00:00:00Z',
        updated_at: '2024-07-15T00:00:00Z'
      }
    ];

    return mockQuotes;
  },

  async getById(id: string): Promise<Quote> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const quotes = await this.getAll();
    const quote = quotes.find(q => q.id === id);
    if (!quote) throw new Error('Quote not found');
    return quote;
  },

  async create(data: CreateQuoteForm): Promise<Quote> {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const subtotal = data.items.reduce((sum, item) => sum + (item.quantity * item.unit_price), 0);
    const discountAmount = subtotal * (data.discount / 100);
    const taxableAmount = subtotal - discountAmount;
    const taxAmount = taxableAmount * (data.tax_rate / 100);
    const total = taxableAmount + taxAmount;

    const newQuote: Quote = {
      id: `quote-${Date.now()}`,
      ...data,
      status: 'draft',
      quote_number: `COT-${new Date().getFullYear()}-${String(Date.now()).slice(-3)}`,
      items: data.items.map((item, index) => ({
        ...item,
        id: `item-${index + 1}`,
        total: item.quantity * item.unit_price
      })),
      subtotal,
      total,
      currency: data.currency || 'USD',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    return newQuote;
  },

  async update(id: string, data: Partial<Quote>): Promise<Quote> {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const quotes = await this.getAll();
    const existingQuote = quotes.find(q => q.id === id);
    if (!existingQuote) throw new Error('Quote not found');
    
    const updatedQuote: Quote = {
      ...existingQuote,
      ...data,
      updated_at: new Date().toISOString()
    };
    
    return updatedQuote;
  },

  async delete(id: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 400));
  }
};

export const useQuotes = () => {
  const { dispatch } = useApp();

  return useQuery({
    queryKey: ['quotes'],
    queryFn: () => mockQuotesService.getAll(),
    staleTime: 5 * 60 * 1000,
  });
};

export const useQuote = (id: string) => {
  return useQuery({
    queryKey: ['quote', id],
    queryFn: () => mockQuotesService.getById(id),
    enabled: !!id,
  });
};

export const useCreateQuote = () => {
  const queryClient = useQueryClient();
  const { addNotification } = useApp();

  return useMutation({
    mutationFn: (data: CreateQuoteForm) => mockQuotesService.create(data),
    onSuccess: (newQuote) => {
      addNotification({
        user_id: 'current-user',
        title: 'Cotización Creada',
        message: `La cotización ${newQuote.quote_number} ha sido creada exitosamente.`,
        type: 'success',
        read: false
      });
      queryClient.invalidateQueries({ queryKey: ['quotes'] });
    }
  });
};

export const useUpdateQuote = () => {
  const queryClient = useQueryClient();
  const { addNotification } = useApp();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Quote> }) => 
      mockQuotesService.update(id, data),
    onSuccess: (updatedQuote) => {
      addNotification({
        user_id: 'current-user',
        title: 'Cotización Actualizada',
        message: `La cotización ${updatedQuote.quote_number} ha sido actualizada.`,
        type: 'success',
        read: false
      });
      queryClient.invalidateQueries({ queryKey: ['quotes'] });
      queryClient.invalidateQueries({ queryKey: ['quote', updatedQuote.id] });
    }
  });
};

export const useDeleteQuote = () => {
  const queryClient = useQueryClient();
  const { addNotification } = useApp();

  return useMutation({
    mutationFn: (id: string) => mockQuotesService.delete(id),
    onSuccess: () => {
      addNotification({
        user_id: 'current-user',
        title: 'Cotización Eliminada',
        message: 'La cotización ha sido eliminada exitosamente.',
        type: 'info',
        read: false
      });
      queryClient.invalidateQueries({ queryKey: ['quotes'] });
    }
  });
};
