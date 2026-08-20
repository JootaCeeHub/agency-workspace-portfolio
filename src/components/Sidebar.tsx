
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  FolderOpen, 
  CheckSquare, 
  FileText, 
  Calculator, 
  FileSignature,
  Settings,
  Building2,
  UserPlus,
  Menu,
  Layers,
  MessageSquare,
  FileCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const Sidebar = ({ isCollapsed, onToggle }: SidebarProps) => {
  const location = useLocation();

  const navigationItems = [
    {
      title: 'Dashboard',
      href: '/',
      icon: LayoutDashboard,
      exact: true
    },
    {
      title: 'Proyectos',
      href: '/projects',
      icon: FolderOpen
    },
    {
      title: 'Plantillas',
      href: '/project-templates',
      icon: Layers
    },
    {
      title: 'Tareas',
      href: '/tasks',
      icon: CheckSquare
    },
    {
      title: 'CRM Clientes',
      href: '/clients',
      icon: Users
    },
    {
      title: 'Cotizaciones',
      href: '/quotes',
      icon: Calculator
    },
    {
      title: 'Briefs',
      href: '/briefs',
      icon: MessageSquare
    },
    {
      title: 'Contratos',
      href: '/contracts',
      icon: FileSignature
    },
    {
      title: 'Colaboradores',
      href: '/collaborators',
      icon: UserPlus
    },
    {
      title: 'Portal Cliente',
      href: '/client-portal',
      icon: Building2
    },
    {
      title: 'Configuración',
      href: '/settings',
      icon: Settings
    }
  ];

  const isActive = (href: string, exact?: boolean) => {
    if (exact) {
      return location.pathname === href;
    }
    return location.pathname.startsWith(href);
  };

  return (
    <div className={cn(
      "bg-slate-900 text-white h-screen flex flex-col transition-all duration-300 border-r border-slate-800",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <Building2 className="h-8 w-8 text-blue-400" />
            <span className="font-bold text-xl">saasflow-portfolio</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="text-slate-400 hover:text-white hover:bg-slate-800"
        >
          <Menu className="h-4 w-4" />
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href, item.exact);
          
          return (
            <NavLink
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 group",
                active 
                  ? "bg-blue-600 text-white shadow-lg" 
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              )}
              title={isCollapsed ? item.title : undefined}
            >
              <Icon className={cn(
                "h-5 w-5 flex-shrink-0",
                active ? "text-white" : "text-slate-400 group-hover:text-white"
              )} />
              {!isCollapsed && (
                <span className="font-medium">{item.title}</span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-800">
        {!isCollapsed && (
          <div className="text-xs text-slate-500 text-center">
            saasflow-portfolio v1.0.0
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
