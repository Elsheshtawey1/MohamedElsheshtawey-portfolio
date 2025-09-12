import { useState, useEffect } from 'react';
import { PortfolioData, ProjectsData } from '@/types/portfolio';

export const usePortfolioData = () => {
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [projectsData, setProjectsData] = useState<ProjectsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Load portfolio data
        const portfolioResponse = await fetch('/data/portfolio.json');
        if (!portfolioResponse.ok) {
          throw new Error('Failed to load portfolio data');
        }
        const portfolio = await portfolioResponse.json();
        
        // Load projects data  
        const projectsResponse = await fetch('/data/projects.json');
        if (!projectsResponse.ok) {
          throw new Error('Failed to load projects data');
        }
        const projects = await projectsResponse.json();
        
        setPortfolioData(portfolio);
        setProjectsData(projects);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error loading portfolio data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return {
    portfolioData,
    projectsData,
    loading,
    error,
  };
};

export const useProject = (projectId: string) => {
  const { projectsData, loading, error } = usePortfolioData();
  
  const project = projectsData?.projects.find(p => p.id === projectId);
  
  return {
    project,
    loading,
    error: error || (!project && !loading ? 'Project not found' : null),
  };
};