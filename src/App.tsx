import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { queryClient } from './lib/query-client';
import { LandingPage } from './components/LandingPage';
import { TemplateSelectionScreen } from './components/TemplateSelectionScreen';
import { WizardProvider, useWizard } from './context/WizardContext';
import { WizardLayout } from './components/layouts/WizardLayout';
import { WizardPage } from './components/wizard/WizardPage';

function AppRoutes() {
  const {
    handleSelectCollectionType,
    handleSelectAICreator,
    handleSelectScratch,
    handleSelectTemplate,
  } = useWizard();
  const navigate = useNavigate();

  return (
    <Routes>
      <Route
        path="/"
        element={<LandingPage onSelectType={handleSelectCollectionType} />}
      />
      <Route
        path="/templates"
        element={
          <TemplateSelectionScreen
            onSelectAICreator={handleSelectAICreator}
            onSelectScratch={handleSelectScratch}
            onSelectTemplate={handleSelectTemplate}
            onBack={() => navigate('/')}
          />
        }
      />
      <Route element={<WizardLayout />}>
        <Route path="/wizard" element={<WizardPage />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <WizardProvider>
          <AppRoutes />
        </WizardProvider>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
