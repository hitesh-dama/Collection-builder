import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Template, CollectionFormData } from '../types';
import { useGenerateCollection } from '../hooks/useGenerateCollection';
import { STATIC_TEMPLATES, DEFAULT_TEMPLATE_FIELDS } from '../constants/templates';

interface WizardContextType {
    loadingPhase: string;
    templates: Template[];
    userPrompt: string;
    error: string | null;
    handleInputSubmit: (prompt: string, category?: string) => void;
    handleRetry: () => void;
    handleClearPrompt: () => void;
    handleSelectAICreator: () => void;
    handleSelectScratch: () => void;
    handleSelectTemplate: (templateId: string) => void;
    handleSelectCollectionType: (typeId: string) => void;
    handleBack: () => void;
}

const WizardContext = createContext<WizardContextType | undefined>(undefined);

export const WizardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [loadingPhase, setLoadingPhase] = useState('idle');
    const [templates, setTemplates] = useState<Template[]>([]);
    const [userPrompt, setUserPrompt] = useState('');
    const [error, setError] = useState<string | null>(null);
    const { mutate: generateCollection } = useGenerateCollection();

    const handleSelectCollectionType = (typeId: string) => {
        if (typeId === 'group-gifts') {
            setLoadingPhase('idle');
            setError(null);
            navigate('/templates');
        }
    };

    const handleSelectAICreator = () => {
        setLoadingPhase('idle');
        setError(null);
        setTemplates([
            {
                id: 'recommended',
                title: 'Recommended Collection',
                description: 'A recommended collection layout.',
                category: 'recommended',
                ...DEFAULT_TEMPLATE_FIELDS,
            },
        ]);
        navigate('/wizard');
    };

    const handleSelectScratch = () => {
        setLoadingPhase('idle');
        setError(null);
        setTemplates([
            {
                id: 'scratch',
                title: 'Custom Collection',
                description: 'Start from scratch.',
                category: 'custom',
                ...DEFAULT_TEMPLATE_FIELDS,
            },
        ]);
        navigate('/wizard');
    };

    const handleSelectTemplate = (templateId: string) => {
        const selected = STATIC_TEMPLATES.find((t) => t.id === templateId);
        if (selected) {
            setTemplates([selected]);
        } else {
            setTemplates([]);
        }
        setLoadingPhase('idle');
        setError(null);
        navigate('/wizard');
    };

    const handleInputSubmit = (prompt: string, category?: string) => {
        setUserPrompt(prompt);
        setLoadingPhase('cube');
        setError(null);
        generateCollection(
            { userPrompt: prompt, category },
            {
                onSuccess: (data) => {
                    setTimeout(() => {
                        setLoadingPhase('skeleton');
                        setTimeout(() => {
                            setTemplates(data.templates);
                            setLoadingPhase('result');
                        }, 1500);
                    }, 1500);
                },
                onError: () => {
                    setLoadingPhase('idle');
                    setError('Something went wrong. Please try again.');
                },
            }
        );
    };

    const handleRetry = () => {
        if (userPrompt) {
            handleInputSubmit(userPrompt);
        }
    };

    const handleClearPrompt = () => {
        setLoadingPhase('idle');
        setTemplates([]);
        setUserPrompt('');
        setError(null);
        navigate('/wizard');
    };

    const handleBack = () => {
        if (location.pathname === '/wizard') {
            if (loadingPhase !== 'idle') {
                setLoadingPhase('idle');
                setError(null);
                return;
            }
            navigate('/templates');
        } else if (location.pathname === '/templates') {
            navigate('/');
        }
    };

    return (
        <WizardContext.Provider
            value={{
                loadingPhase,
                templates,
                userPrompt,
                error,
                handleInputSubmit,
                handleRetry,
                handleClearPrompt,
                handleSelectAICreator,
                handleSelectScratch,
                handleSelectTemplate,
                handleSelectCollectionType,
                handleBack,
            }}
        >
            {children}
        </WizardContext.Provider>
    );
};

export const useWizard = () => {
    const context = useContext(WizardContext);
    if (context === undefined) {
        throw new Error('useWizard must be used within a WizardProvider');
    }
    return context;
};
