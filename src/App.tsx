
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./contexts/AppContext";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import Projects from "./pages/Projects";
import ProjectTemplates from "./pages/ProjectTemplates";
import Clients from "./pages/Clients";
import Tasks from "./pages/Tasks";
import Quotes from "./pages/Quotes";
import Briefs from "./pages/Briefs";
import Contracts from "./pages/Contracts";
import Collaborators from "./pages/Collaborators";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/project-templates" element={<ProjectTemplates />} />
              <Route path="/clients" element={<Clients />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/quotes" element={<Quotes />} />
              <Route path="/briefs" element={<Briefs />} />
              <Route path="/contracts" element={<Contracts />} />
              <Route path="/collaborators" element={<Collaborators />} />
              <Route path="/client-portal" element={<div className="p-6"><h1 className="text-3xl font-bold">Portal Cliente</h1><p className="text-slate-600">Portal de cliente en desarrollo...</p></div>} />
              <Route path="/settings" element={<div className="p-6"><h1 className="text-3xl font-bold">Configuración</h1><p className="text-slate-600">Panel de configuración en desarrollo...</p></div>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
