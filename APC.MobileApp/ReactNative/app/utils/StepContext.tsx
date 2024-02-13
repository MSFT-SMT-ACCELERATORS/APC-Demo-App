import React, { ReactNode, createContext, useContext, useState } from 'react';

interface StepContextType {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  currentScreen: string;
  setCurrentScreen: React.Dispatch<React.SetStateAction<string>>;
}

interface StepProviderProps {
    children: ReactNode;
  }
  
const StepContext = createContext<StepContextType | undefined>(undefined);

export const StepProvider: React.FC<StepProviderProps> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [currentScreen, setCurrentScreen] = useState('');

  return (
    <StepContext.Provider value={{ currentStep, setCurrentStep, currentScreen, setCurrentScreen }}>
      {children}
    </StepContext.Provider>
  );
};

export const useStep = () => {
  const context = useContext(StepContext);
  if (!context) {
    throw new Error('useStep must be used within a StepProvider');
  }
  return context;
};
