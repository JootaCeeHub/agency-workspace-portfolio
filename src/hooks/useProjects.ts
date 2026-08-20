
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Project, CreateProjectForm, ProjectFilters } from '@/types';
import { useApp } from '@/contexts/AppContext';

// Mock data service - will be replaced with Supabase
const mockProjectsService = {
  async getAll(filters?: ProjectFilters): Promise<Project[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock projects data
    const mockProjects: Project[] = [
      {
        id: '1',
        name: 'Rediseño Web Empresa ABC',
        description: 'Rediseño completo del sitio web corporativo con nuevo sistema de gestión de contenidos.',
        client_id: 'client-1',
        status: 'in-progress',
        priority: 'high',
        start_date: '2024-06-01',
        end_date: '2024-07-20',
        budget: 15000,
        currency: 'USD',
        progress: 75,
        team: ['user-1', 'user-2'],
        tags: ['web', 'redesign'],
        files: [],
        milestones: [],
        created_at: '2024-06-01T00:00:00Z',
        updated_at: '2024-07-14T00:00:00Z'
      },
      {
        id: '2',
        name: 'Branding Startup XYZ',
        description: 'Desarrollo completo de identidad visual para startup tecnológica.',
        client_id: 'client-2',
        status: 'review',
        priority: 'medium',
        start_date: '2024-05-15',
        end_date: '2024-07-18',
        budget: 8000,
        currency: 'USD',
        progress: 90,
        team: ['user-3'],
        tags: ['branding', 'design'],
        files: [],
        milestones: [],
        created_at: '2024-05-15T00:00:00Z',
        updated_at: '2024-07-14T00:00:00Z'
      }
    ];

    // Apply filters
    let filteredProjects = mockProjects;
    
    if (filters?.search) {
      filteredProjects = filteredProjects.filter(p => 
        p.name.toLowerCase().includes(filters.search!.toLowerCase()) ||
        p.description.toLowerCase().includes(filters.search!.toLowerCase())
      );
    }
    
    if (filters?.status?.length) {
      filteredProjects = filteredProjects.filter(p => 
        filters.status!.includes(p.status)
      );
    }
    
    if (filters?.priority?.length) {
      filteredProjects = filteredProjects.filter(p => 
        filters.priority!.includes(p.priority)
      );
    }

    return filteredProjects;
  },

  async getById(id: string): Promise<Project> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const projects = await this.getAll();
    const project = projects.find(p => p.id === id);
    if (!project) throw new Error('Project not found');
    return project;
  },

  async create(data: CreateProjectForm): Promise<Project> {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newProject: Project = {
      id: `project-${Date.now()}`,
      ...data,
      status: 'planning',
      progress: 0,
      files: [],
      milestones: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    return newProject;
  },

  async update(id: string, data: Partial<Project>): Promise<Project> {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const projects = await this.getAll();
    const existingProject = projects.find(p => p.id === id);
    if (!existingProject) throw new Error('Project not found');
    
    const updatedProject: Project = {
      ...existingProject,
      ...data,
      updated_at: new Date().toISOString()
    };
    
    return updatedProject;
  },

  async delete(id: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 400));
    // In real implementation, this would delete from Supabase
  }
};

export const useProjects = (filters?: ProjectFilters) => {
  const { dispatch } = useApp();

  return useQuery({
    queryKey: ['projects', filters],
    queryFn: () => mockProjectsService.getAll(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useProject = (id: string) => {
  return useQuery({
    queryKey: ['project', id],
    queryFn: () => mockProjectsService.getById(id),
    enabled: !!id,
  });
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  const { addProject, addNotification } = useApp();

  return useMutation({
    mutationFn: (data: CreateProjectForm) => mockProjectsService.create(data),
    onSuccess: (newProject) => {
      addProject(newProject);
      addNotification({
        user_id: 'current-user',
        title: 'Proyecto Creado',
        message: `El proyecto "${newProject.name}" ha sido creado exitosamente.`,
        type: 'success',
        read: false
      });
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
    onError: () => {
      addNotification({
        user_id: 'current-user',
        title: 'Error',
        message: 'No se pudo crear el proyecto. Inténtalo de nuevo.',
        type: 'error',
        read: false
      });
    }
  });
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();
  const { updateProject, addNotification } = useApp();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Project> }) => 
      mockProjectsService.update(id, data),
    onSuccess: (updatedProject) => {
      updateProject(updatedProject);
      addNotification({
        user_id: 'current-user',
        title: 'Proyecto Actualizado',
        message: `El proyecto "${updatedProject.name}" ha sido actualizado.`,
        type: 'success',
        read: false
      });
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['project', updatedProject.id] });
    }
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  const { deleteProject, addNotification } = useApp();

  return useMutation({
    mutationFn: (id: string) => mockProjectsService.delete(id),
    onSuccess: (_, id) => {
      deleteProject(id);
      addNotification({
        user_id: 'current-user',
        title: 'Proyecto Eliminado',
        message: 'El proyecto ha sido eliminado exitosamente.',
        type: 'info',
        read: false
      });
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    }
  });
};
