export interface Template {
  id: string;
  title: string;
  description: string;
  category: string;
  suggestedAmounts: number[];
  customAmountEnabled: boolean;
  theme: {
    primaryColor: string;
    accentColor: string;
  };
}

export interface CollectionFormData {
  userPrompt: string;
  category?: string;
  selectedTemplateId?: string;
  customAmounts?: number[];
  title?: string;
  description?: string;
}

export type WizardStep = 'input' | 'preview' | 'customize';

export interface GenerateCollectionRequest {
  userPrompt: string;
  category?: string;
}

export interface GenerateCollectionResponse {
  templates: Template[];
  feedback: string;
  generatedAt: number;
}
