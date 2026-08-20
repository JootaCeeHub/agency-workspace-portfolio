
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Brief, BriefTemplate } from '@/types';
import { useApp } from '@/contexts/AppContext';

// Mock data service - will be replaced with Supabase
const mockBriefsService = {
  async getAll(): Promise<Brief[]> {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const mockBriefs: Brief[] = [
      {
        id: '1',
        client_id: 'client-1',
        project_type: 'branding',
        title: 'Brief Identidad Visual ABC Corp',
        status: 'pending',
        responses: [
          {
            question_id: '1',
            answer: 'Empresa de tecnología especializada en soluciones cloud'
          },
          {
            question_id: '2',
            answer: ['Profesional', 'Moderno', 'Confiable']
          }
        ],
        template_id: 'template-1',
        created_at: '2024-07-10T00:00:00Z',
        updated_at: '2024-07-10T00:00:00Z'
      }
    ];

    return mockBriefs;
  },

  async getTemplates(): Promise<BriefTemplate[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const mockTemplates: BriefTemplate[] = [
      {
        id: 'template-1',
        name: 'Brief de Branding',
        project_type: 'branding',
        questions: [
          {
            id: '1',
            question: '¿Cuál es la descripción de tu empresa/negocio?',
            type: 'textarea',
            required: true,
            order: 1
          },
          {
            id: '2',
            question: '¿Qué palabras describen mejor tu marca?',
            type: 'multiselect',
            required: true,
            options: ['Profesional', 'Moderno', 'Confiable', 'Innovador', 'Cercano', 'Elegante'],
            order: 2
          },
          {
            id: '3',
            question: '¿Cuál es tu público objetivo?',
            type: 'textarea',
            required: true,
            order: 3
          }
        ],
        is_active: true,
        created_at: '2024-07-01T00:00:00Z',
        updated_at: '2024-07-01T00:00:00Z'
      }
    ];

    return mockTemplates;
  },

  async getById(id: string): Promise<Brief> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const briefs = await this.getAll();
    const brief = briefs.find(b => b.id === id);
    if (!brief) throw new Error('Brief not found');
    return brief;
  },

  async create(data: Partial<Brief>): Promise<Brief> {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newBrief: Brief = {
      id: `brief-${Date.now()}`,
      client_id: data.client_id!,
      project_type: data.project_type!,
      title: data.title!,
      status: 'pending',
      responses: data.responses || [],
      template_id: data.template_id!,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    return newBrief;
  },

  async update(id: string, data: Partial<Brief>): Promise<Brief> {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const briefs = await this.getAll();
    const existingBrief = briefs.find(b => b.id === id);
    if (!existingBrief) throw new Error('Brief not found');
    
    const updatedBrief: Brief = {
      ...existingBrief,
      ...data,
      updated_at: new Date().toISOString()
    };
    
    return updatedBrief;
  }
};

export const useBriefs = () => {
  return useQuery({
    queryKey: ['briefs'],
    queryFn: () => mockBriefsService.getAll(),
    staleTime: 5 * 60 * 1000,
  });
};

export const useBriefTemplates = () => {
  return useQuery({
    queryKey: ['brief-templates'],
    queryFn: () => mockBriefsService.getTemplates(),
    staleTime: 10 * 60 * 1000,
  });
};

export const useBrief = (id: string) => {
  return useQuery({
    queryKey: ['brief', id],
    queryFn: () => mockBriefsService.getById(id),
    enabled: !!id,
  });
};

export const useCreateBrief = () => {
  const queryClient = useQueryClient();
  const { addNotification } = useApp();

  return useMutation({
    mutationFn: (data: Partial<Brief>) => mockBriefsService.create(data),
    onSuccess: (newBrief) => {
      addNotification({
        user_id: 'current-user',
        title: 'Brief Creado',
        message: `El brief "${newBrief.title}" ha sido creado exitosamente.`,
        type: 'success',
        read: false
      });
      queryClient.invalidateQueries({ queryKey: ['briefs'] });
    }
  });
};

export const useUpdateBrief = () => {
  const queryClient = useQueryClient();
  const { addNotification } = useApp();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Brief> }) => 
      mockBriefsService.update(id, data),
    onSuccess: (updatedBrief) => {
      addNotification({
        user_id: 'current-user',
        title: 'Brief Actualizado',
        message: `El brief "${updatedBrief.title}" ha sido actualizado.`,
        type: 'success',
        read: false
      });
      queryClient.invalidateQueries({ queryKey: ['briefs'] });
      queryClient.invalidateQueries({ queryKey: ['brief', updatedBrief.id] });
    }
  });
};
