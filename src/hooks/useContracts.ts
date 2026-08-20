
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Contract, ContractTemplate } from '@/types';
import { useApp } from '@/contexts/AppContext';

// Mock data service - will be replaced with Supabase
const mockContractsService = {
  async getAll(): Promise<Contract[]> {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const mockContracts: Contract[] = [
      {
        id: '1',
        client_id: 'client-1',
        project_id: '1',
        quote_id: '1',
        template_id: 'template-1',
        title: 'Contrato de Desarrollo Web - ABC Corp',
        content: `
        CONTRATO DE SERVICIOS DE DESARROLLO WEB
        
        Entre [CLIENT_NAME] y [COMPANY_NAME], se establece el siguiente acuerdo:
        
        1. OBJETO DEL CONTRATO
        Desarrollo completo de sitio web corporativo según especificaciones del proyecto "[PROJECT_NAME]".
        
        2. DURACIÓN Y PLAZO
        El proyecto tendrá una duración estimada de [PROJECT_DURATION] días calendario.
        
        3. VALOR Y FORMA DE PAGO
        El valor total del proyecto es de [PROJECT_BUDGET] [CURRENCY], pagadero de la siguiente forma:
        - 50% al firmar el contrato
        - 50% al entregar el proyecto final
        
        4. ENTREGABLES
        - Diseño UI/UX completo
        - Desarrollo frontend y backend
        - Panel administrativo
        - Documentación técnica
        - Capacitación de usuario
        
        5. RESPONSABILIDADES DEL CLIENTE
        - Proporcionar contenido y materiales necesarios
        - Revisar y aprobar entregables en tiempo
        - Realizar pagos según cronograma establecido
        
        6. GARANTÍAS
        Se ofrece garantía de 3 meses sobre defectos de funcionamiento.
        `,
        status: 'sent',
        signature_status: 'pending',
        expires_at: '2024-08-15T00:00:00Z',
        created_at: '2024-07-15T00:00:00Z',
        updated_at: '2024-07-15T00:00:00Z'
      }
    ];

    return mockContracts;
  },

  async getTemplates(): Promise<ContractTemplate[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const mockTemplates: ContractTemplate[] = [
      {
        id: 'template-1',
        name: 'Contrato de Desarrollo Web',
        content: `
        CONTRATO DE SERVICIOS DE DESARROLLO WEB
        
        Entre [CLIENT_NAME] y [COMPANY_NAME], se establece el siguiente acuerdo para el desarrollo del proyecto "[PROJECT_NAME]".
        
        1. OBJETO DEL CONTRATO
        [PROJECT_DESCRIPTION]
        
        2. DURACIÓN Y PLAZO
        El proyecto tendrá una duración estimada de [PROJECT_DURATION] días calendario.
        
        3. VALOR Y FORMA DE PAGO
        El valor total del proyecto es de [PROJECT_BUDGET] [CURRENCY].
        
        4. ENTREGABLES
        [PROJECT_DELIVERABLES]
        
        5. TÉRMINOS Y CONDICIONES
        [TERMS_AND_CONDITIONS]
        `,
        variables: [
          { name: 'CLIENT_NAME', label: 'Nombre del Cliente', type: 'text', required: true },
          { name: 'COMPANY_NAME', label: 'Nombre de la Empresa', type: 'text', required: true, default_value: 'Tu Empresa' },
          { name: 'PROJECT_NAME', label: 'Nombre del Proyecto', type: 'text', required: true },
          { name: 'PROJECT_DESCRIPTION', label: 'Descripción del Proyecto', type: 'text', required: true },
          { name: 'PROJECT_DURATION', label: 'Duración del Proyecto (días)', type: 'number', required: true },
          { name: 'PROJECT_BUDGET', label: 'Presupuesto', type: 'currency', required: true },
          { name: 'CURRENCY', label: 'Moneda', type: 'text', required: true, default_value: 'USD' },
          { name: 'PROJECT_DELIVERABLES', label: 'Entregables', type: 'text', required: true },
          { name: 'TERMS_AND_CONDITIONS', label: 'Términos y Condiciones', type: 'text', required: true }
        ],
        is_active: true,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-07-01T00:00:00Z'
      },
      {
        id: 'template-2',
        name: 'Contrato de Branding',
        content: `
        CONTRATO DE SERVICIOS DE BRANDING
        
        Entre [CLIENT_NAME] y [COMPANY_NAME], para el desarrollo de identidad visual "[PROJECT_NAME]".
        
        1. SERVICIOS INCLUIDOS
        - Investigación y estrategia de marca
        - Diseño de logo e identidad visual
        - Manual de marca
        - Aplicaciones corporativas
        
        2. PROPIEDAD INTELECTUAL
        Los derechos de autor pertenecerán al cliente una vez completado el pago total.
        
        3. VALOR DEL PROYECTO
        [PROJECT_BUDGET] [CURRENCY]
        `,
        variables: [
          { name: 'CLIENT_NAME', label: 'Nombre del Cliente', type: 'text', required: true },
          { name: 'COMPANY_NAME', label: 'Nombre de la Empresa', type: 'text', required: true },
          { name: 'PROJECT_NAME', label: 'Nombre del Proyecto', type: 'text', required: true },
          { name: 'PROJECT_BUDGET', label: 'Presupuesto', type: 'currency', required: true },
          { name: 'CURRENCY', label: 'Moneda', type: 'text', required: true, default_value: 'USD' }
        ],
        is_active: true,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-07-01T00:00:00Z'
      }
    ];

    return mockTemplates;
  },

  async getById(id: string): Promise<Contract> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const contracts = await this.getAll();
    const contract = contracts.find(c => c.id === id);
    if (!contract) throw new Error('Contract not found');
    return contract;
  },

  async create(data: Partial<Contract>): Promise<Contract> {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newContract: Contract = {
      id: `contract-${Date.now()}`,
      client_id: data.client_id!,
      project_id: data.project_id,
      quote_id: data.quote_id,
      template_id: data.template_id!,
      title: data.title!,
      content: data.content!,
      status: 'draft',
      signature_status: 'pending',
      expires_at: data.expires_at!,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    return newContract;
  },

  async update(id: string, data: Partial<Contract>): Promise<Contract> {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const contracts = await this.getAll();
    const existingContract = contracts.find(c => c.id === id);
    if (!existingContract) throw new Error('Contract not found');
    
    const updatedContract: Contract = {
      ...existingContract,
      ...data,
      updated_at: new Date().toISOString()
    };
    
    return updatedContract;
  },

  async delete(id: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 400));
  }
};

export const useContracts = () => {
  return useQuery({
    queryKey: ['contracts'],
    queryFn: () => mockContractsService.getAll(),
    staleTime: 5 * 60 * 1000,
  });
};

export const useContractTemplates = () => {
  return useQuery({
    queryKey: ['contract-templates'],
    queryFn: () => mockContractsService.getTemplates(),
    staleTime: 10 * 60 * 1000,
  });
};

export const useContract = (id: string) => {
  return useQuery({
    queryKey: ['contract', id],
    queryFn: () => mockContractsService.getById(id),
    enabled: !!id,
  });
};

export const useCreateContract = () => {
  const queryClient = useQueryClient();
  const { addNotification } = useApp();

  return useMutation({
    mutationFn: (data: Partial<Contract>) => mockContractsService.create(data),
    onSuccess: (newContract) => {
      addNotification({
        user_id: 'current-user',
        title: 'Contrato Creado',
        message: `El contrato "${newContract.title}" ha sido creado exitosamente.`,
        type: 'success',
        read: false
      });
      queryClient.invalidateQueries({ queryKey: ['contracts'] });
    }
  });
};

export const useUpdateContract = () => {
  const queryClient = useQueryClient();
  const { addNotification } = useApp();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Contract> }) => 
      mockContractsService.update(id, data),
    onSuccess: (updatedContract) => {
      addNotification({
        user_id: 'current-user',
        title: 'Contrato Actualizado',
        message: `El contrato "${updatedContract.title}" ha sido actualizado.`,
        type: 'success',
        read: false
      });
      queryClient.invalidateQueries({ queryKey: ['contracts'] });
      queryClient.invalidateQueries({ queryKey: ['contract', updatedContract.id] });
    }
  });
};

export const useDeleteContract = () => {
  const queryClient = useQueryClient();
  const { addNotification } = useApp();

  return useMutation({
    mutationFn: (id: string) => mockContractsService.delete(id),
    onSuccess: () => {
      addNotification({
        user_id: 'current-user',
        title: 'Contrato Eliminado',
        message: 'El contrato ha sido eliminado exitosamente.',
        type: 'info',
        read: false
      });
      queryClient.invalidateQueries({ queryKey: ['contracts'] });
    }
  });
};
