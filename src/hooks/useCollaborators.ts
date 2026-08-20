
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { User } from '@/types';
import { useApp } from '@/contexts/AppContext';

// Mock data service - will be replaced with Supabase
const mockCollaboratorsService = {
  async getAll(): Promise<User[]> {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const mockCollaborators: User[] = [
      {
        id: 'user-1',
        email: 'maria.garcia@empresa.com',
        name: 'María García',
        role: 'admin',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332f42b?w=150',
        company: 'Empresa Principal',
        phone: '+1 (555) 123-4567',
        created_at: '2024-01-15T00:00:00Z',
        updated_at: '2024-07-14T00:00:00Z'
      },
      {
        id: 'user-2',
        email: 'carlos.rodriguez@empresa.com',
        name: 'Carlos Rodríguez',
        role: 'collaborator',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
        company: 'Empresa Principal',
        phone: '+1 (555) 234-5678',
        created_at: '2024-02-01T00:00:00Z',
        updated_at: '2024-07-14T00:00:00Z'
      },
      {
        id: 'user-3',
        email: 'ana.martinez@freelance.com',
        name: 'Ana Martínez',
        role: 'collaborator',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
        company: 'Freelancer',
        phone: '+1 (555) 345-6789',
        created_at: '2024-03-15T00:00:00Z',
        updated_at: '2024-07-10T00:00:00Z'
      },
      {
        id: 'user-4',
        email: 'luis.hernandez@empresa.com',
        name: 'Luis Hernández',
        role: 'collaborator',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        company: 'Empresa Principal',
        phone: '+1 (555) 456-7890',
        created_at: '2024-04-01T00:00:00Z',
        updated_at: '2024-07-12T00:00:00Z'
      }
    ];

    return mockCollaborators;
  },

  async getById(id: string): Promise<User> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const collaborators = await this.getAll();
    const collaborator = collaborators.find(c => c.id === id);
    if (!collaborator) throw new Error('Collaborator not found');
    return collaborator;
  },

  async create(data: Partial<User>): Promise<User> {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newCollaborator: User = {
      id: `user-${Date.now()}`,
      email: data.email!,
      name: data.name!,
      role: data.role || 'collaborator',
      company: data.company,
      phone: data.phone,
      avatar: data.avatar,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    return newCollaborator;
  },

  async update(id: string, data: Partial<User>): Promise<User> {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const collaborators = await this.getAll();
    const existingCollaborator = collaborators.find(c => c.id === id);
    if (!existingCollaborator) throw new Error('Collaborator not found');
    
    const updatedCollaborator: User = {
      ...existingCollaborator,
      ...data,
      updated_at: new Date().toISOString()
    };
    
    return updatedCollaborator;
  },

  async delete(id: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 400));
  },

  async invite(email: string, role: User['role']): Promise<User> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const invitedUser: User = {
      id: `user-invited-${Date.now()}`,
      email,
      name: email.split('@')[0],
      role,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    return invitedUser;
  }
};

export const useCollaborators = () => {
  return useQuery({
    queryKey: ['collaborators'],
    queryFn: () => mockCollaboratorsService.getAll(),
    staleTime: 5 * 60 * 1000,
  });
};

export const useCollaborator = (id: string) => {
  return useQuery({
    queryKey: ['collaborator', id],
    queryFn: () => mockCollaboratorsService.getById(id),
    enabled: !!id,
  });
};

export const useCreateCollaborator = () => {
  const queryClient = useQueryClient();
  const { addNotification } = useApp();

  return useMutation({
    mutationFn: (data: Partial<User>) => mockCollaboratorsService.create(data),
    onSuccess: (newCollaborator) => {
      addNotification({
        user_id: 'current-user',
        title: 'Colaborador Agregado',
        message: `${newCollaborator.name} ha sido agregado al equipo.`,
        type: 'success',
        read: false
      });
      queryClient.invalidateQueries({ queryKey: ['collaborators'] });
    }
  });
};

export const useUpdateCollaborator = () => {
  const queryClient = useQueryClient();
  const { addNotification } = useApp();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<User> }) => 
      mockCollaboratorsService.update(id, data),
    onSuccess: (updatedCollaborator) => {
      addNotification({
        user_id: 'current-user',
        title: 'Colaborador Actualizado',
        message: `Los datos de ${updatedCollaborator.name} han sido actualizados.`,
        type: 'success',
        read: false
      });
      queryClient.invalidateQueries({ queryKey: ['collaborators'] });
      queryClient.invalidateQueries({ queryKey: ['collaborator', updatedCollaborator.id] });
    }
  });
};

export const useDeleteCollaborator = () => {
  const queryClient = useQueryClient();
  const { addNotification } = useApp();

  return useMutation({
    mutationFn: (id: string) => mockCollaboratorsService.delete(id),
    onSuccess: () => {
      addNotification({
        user_id: 'current-user',
        title: 'Colaborador Eliminado',
        message: 'El colaborador ha sido eliminado del equipo.',
        type: 'info',
        read: false
      });
      queryClient.invalidateQueries({ queryKey: ['collaborators'] });
    }
  });
};

export const useInviteCollaborator = () => {
  const queryClient = useQueryClient();
  const { addNotification } = useApp();

  return useMutation({
    mutationFn: ({ email, role }: { email: string; role: User['role'] }) => 
      mockCollaboratorsService.invite(email, role),
    onSuccess: (invitedUser) => {
      addNotification({
        user_id: 'current-user',
        title: 'Invitación Enviada',
        message: `Se ha enviado una invitación a ${invitedUser.email}.`,
        type: 'success',
        read: false
      });
      queryClient.invalidateQueries({ queryKey: ['collaborators'] });
    }
  });
};
