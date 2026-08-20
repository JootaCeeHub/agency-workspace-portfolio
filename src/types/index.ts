
// Core Types for the SaaS Platform
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'collaborator' | 'client';
  avatar?: string;
  company?: string;
  phone?: string;
  created_at: string;
  updated_at: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  company: string;
  phone?: string;
  address?: string;
  status: 'prospect' | 'active' | 'inactive' | 'churned';
  source: 'website' | 'referral' | 'social' | 'email' | 'other';
  notes?: string;
  avatar?: string;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  client_id: string;
  client?: Client;
  status: 'planning' | 'in-progress' | 'review' | 'completed' | 'paused' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  start_date: string;
  end_date: string;
  budget: number;
  currency: string;
  progress: number;
  template_id?: string;
  team: string[];
  tags: string[];
  files: ProjectFile[];
  milestones: Milestone[];
  created_at: string;
  updated_at: string;
}

export interface ProjectTemplate {
  id: string;
  name: string;
  description: string;
  category: 'branding' | 'web' | 'design' | 'marketing' | 'development' | 'other';
  estimated_duration: number; // in days
  phases: TemplatePhase[];
  default_tasks: TemplateTask[];
  required_fields: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface TemplatePhase {
  id: string;
  name: string;
  description: string;
  order: number;
  estimated_duration: number;
  deliverables: string[];
}

export interface TemplateTask {
  id: string;
  title: string;
  description: string;
  phase_id: string;
  estimated_hours: number;
  dependencies: string[];
  required_role: string;
  priority: 'low' | 'medium' | 'high';
}

export interface Task {
  id: string;
  title: string;
  description: string;
  project_id: string;
  project?: Project;
  assignee_id?: string;
  assignee?: User;
  status: 'todo' | 'in-progress' | 'review' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  due_date: string;
  estimated_hours: number;
  actual_hours?: number;
  tags: string[];
  dependencies: string[];
  comments: TaskComment[];
  attachments: TaskAttachment[];
  created_at: string;
  updated_at: string;
}

export interface TaskComment {
  id: string;
  task_id: string;
  user_id: string;
  user?: User;
  content: string;
  created_at: string;
}

export interface TaskAttachment {
  id: string;
  task_id: string;
  name: string;
  url: string;
  size: number;
  type: string;
  uploaded_by: string;
  created_at: string;
}

export interface Quote {
  id: string;
  client_id: string;
  client?: Client;
  project_name: string;
  description: string;
  status: 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired';
  quote_number: string;
  items: QuoteItem[];
  subtotal: number;
  discount: number;
  tax_rate: number;
  total: number;
  currency: string;
  valid_until: string;
  notes?: string;
  terms?: string;
  created_at: string;
  updated_at: string;
}

export interface QuoteItem {
  id: string;
  name: string;
  description: string;
  quantity: number;
  unit_price: number;
  total: number;
  category: string;
}

export interface Brief {
  id: string;
  client_id: string;
  client?: Client;
  project_type: 'branding' | 'web' | 'design' | 'marketing' | 'development' | 'other';
  title: string;
  status: 'pending' | 'in-review' | 'approved' | 'needs-revision';
  responses: BriefResponse[];
  template_id: string;
  created_at: string;
  updated_at: string;
}

export interface BriefTemplate {
  id: string;
  name: string;
  project_type: string;
  questions: BriefQuestion[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface BriefQuestion {
  id: string;
  question: string;
  type: 'text' | 'textarea' | 'select' | 'multiselect' | 'checkbox' | 'radio' | 'file';
  required: boolean;
  options?: string[];
  order: number;
}

export interface BriefResponse {
  question_id: string;
  answer: string | string[];
}

export interface Contract {
  id: string;
  client_id: string;
  client?: Client;
  project_id?: string;
  project?: Project;
  quote_id?: string;
  quote?: Quote;
  template_id: string;
  title: string;
  content: string;
  status: 'draft' | 'sent' | 'signed' | 'expired' | 'cancelled';
  signature_status: 'pending' | 'signed' | 'declined';
  signed_at?: string;
  expires_at: string;
  created_at: string;
  updated_at: string;
}

export interface ContractTemplate {
  id: string;
  name: string;
  content: string;
  variables: ContractVariable[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ContractVariable {
  name: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'currency';
  required: boolean;
  default_value?: string;
}

export interface ProjectFile {
  id: string;
  project_id: string;
  name: string;
  url: string;
  size: number;
  type: string;
  category: 'deliverable' | 'resource' | 'contract' | 'other';
  uploaded_by: string;
  is_public: boolean; // for client portal
  created_at: string;
}

export interface Milestone {
  id: string;
  project_id: string;
  name: string;
  description: string;
  due_date: string;
  status: 'pending' | 'completed' | 'overdue';
  order: number;
  deliverables: string[];
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  action_url?: string;
  created_at: string;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form Types
export interface CreateProjectForm {
  name: string;
  description: string;
  client_id: string;
  start_date: string;
  end_date: string;
  budget: number;
  currency: string;
  priority: Project['priority'];
  template_id?: string;
  team: string[];
  tags: string[];
}

export interface CreateTaskForm {
  title: string;
  description: string;
  project_id: string;
  assignee_id?: string;
  due_date: string;
  priority: Task['priority'];
  estimated_hours: number;
  tags: string[];
}

export interface CreateQuoteForm {
  client_id: string;
  project_name: string;
  description: string;
  items: Omit<QuoteItem, 'id' | 'total'>[];
  discount: number;
  tax_rate: number;
  valid_until: string;
  notes?: string;
  terms?: string;
}

// Filter and Sort Types
export interface ProjectFilters {
  status?: Project['status'][];
  priority?: Project['priority'][];
  client_id?: string;
  start_date?: string;
  end_date?: string;
  search?: string;
}

export interface TaskFilters {
  status?: Task['status'][];
  priority?: Task['priority'][];
  assignee_id?: string;
  project_id?: string;
  due_date?: string;
  search?: string;
}

export interface SortOption {
  field: string;
  direction: 'asc' | 'desc';
}
