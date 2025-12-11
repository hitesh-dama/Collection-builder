import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { useWizard } from '../../context/WizardContext';

export const WizardLayout: React.FC = () => {
    const navigate = useNavigate();
    const { handleBack } = useWizard();

    return (
        <div className="min-h-screen bg-cheddar-gray-50">
            <div className="border-b border-cheddar-gray-200 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    <button
                        onClick={handleBack}
                        className="flex items-center gap-2 text-cheddar-orange hover:text-cheddar-orange-hover transition-colors text-sm font-medium"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Previous
                    </button>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate('/templates')}
                            className="text-cheddar-orange hover:text-cheddar-orange-hover transition-colors text-sm font-medium"
                        >
                            Back to Dashboard
                        </button>
                        <img src="/Logo.png" alt="CheddarUp" className="h-8 w-auto" />
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <Outlet />
            </div>
        </div>
    );
};
