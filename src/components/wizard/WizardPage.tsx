import React, { Suspense } from 'react';
import { X } from 'lucide-react';
import { useWizard } from '../../context/WizardContext';
import InputStep from './InputStep';
import PreviewStep from './PreviewStep';
import { CubeLoader } from '../CubeLoader';
import { SkeletonLoader } from '../SkeletonLoader';

export const WizardPage: React.FC = () => {
    const { loadingPhase, userPrompt, templates, handleClearPrompt } = useWizard();

    return (
        <Suspense fallback={<div>Loading...</div>}>
            {loadingPhase === 'idle' && <InputStep />}

            {loadingPhase === 'cube' && (
                <div className="max-w-4xl mx-auto animate-fade-in">
                    <div className="mb-8 flex items-center justify-center">
                        <div className="relative bg-white border border-cheddar-gray-300 rounded-lg px-6 py-3 shadow-sm">
                            <span className="text-sm text-cheddar-gray-700">{userPrompt}</span>
                            <button
                                onClick={handleClearPrompt}
                                className="absolute -right-2 -top-2 w-6 h-6 bg-cheddar-gray-700 hover:bg-cheddar-gray-900 text-white rounded-full flex items-center justify-center transition-colors"
                                aria-label="Cancel"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                    <div className="text-center mb-8">
                        <p className="text-base text-cheddar-gray-700">
                            Here is an example of a group gift collection for a wedding gift
                        </p>
                    </div>
                    <div className="flex justify-center py-24">
                        <CubeLoader />
                    </div>
                </div>
            )}

            {loadingPhase === 'skeleton' && (
                <div className="max-w-4xl mx-auto animate-fade-in">
                    <div className="mb-8 flex items-center justify-center">
                        <div className="relative bg-white border border-cheddar-gray-300 rounded-lg px-6 py-3 shadow-sm">
                            <span className="text-sm text-cheddar-gray-700">{userPrompt}</span>
                            <button
                                onClick={handleClearPrompt}
                                className="absolute -right-2 -top-2 w-6 h-6 bg-cheddar-gray-700 hover:bg-cheddar-gray-900 text-white rounded-full flex items-center justify-center transition-colors"
                                aria-label="Cancel"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                    <div className="text-center mb-8">
                        <p className="text-base text-cheddar-gray-700">
                            Here is an example of a group gift collection for a wedding gift
                        </p>
                    </div>
                    <SkeletonLoader />
                </div>
            )}

            {loadingPhase === 'result' && templates.length > 0 && <PreviewStep />}
        </Suspense>
    );
};
