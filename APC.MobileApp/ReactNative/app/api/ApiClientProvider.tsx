import React, { createContext, useContext, ReactNode } from 'react';
import { Configuration, APCApi } from '../api/generated';

type ApiClientContextType = APCApi | null;

const ApiClientContext = createContext<ApiClientContextType>(null);

interface ApiClientProviderProps {
  children: ReactNode;
}

export const ApiClientProvider: React.FC<ApiClientProviderProps> = ({ children }) => {
  const configuration = new Configuration({ basePath: "https://apc-proxy-prv-001.azurewebsites.net" });
  const apiClient = new APCApi(configuration);

  return (
    <ApiClientContext.Provider value={apiClient}>
      {children}
    </ApiClientContext.Provider>
  );
};

// Hook personalizado para usar el cliente API
export const useApiClient = (): APCApi => {
  const context = useContext(ApiClientContext);
  if (context === null) {
    throw new Error('useApiClient must be used within an ApiClientProvider');
  }
  return context;
};
