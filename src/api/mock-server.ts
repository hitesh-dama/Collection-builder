import { Template, GenerateCollectionRequest, GenerateCollectionResponse } from '../types';

const weddingTemplates: Template[] = [
  {
    id: 'wedding-1',
    title: 'Wedding Gift Collection',
    description: 'Help the happy couple start their new life together with a group gift',
    category: 'wedding',
    suggestedAmounts: [25, 50, 100, 200],
    customAmountEnabled: true,
    theme: {
      primaryColor: '#FF6B35',
      accentColor: '#F4A261',
    },
  },
  {
    id: 'wedding-2',
    title: 'Honeymoon Fund',
    description: 'Contribute to an unforgettable honeymoon experience',
    category: 'wedding',
    suggestedAmounts: [50, 100, 250, 500],
    customAmountEnabled: true,
    theme: {
      primaryColor: '#FF6B35',
      accentColor: '#E76F51',
    },
  },
];

const babyShowerTemplates: Template[] = [
  {
    id: 'baby-1',
    title: 'Baby Shower Group Gift',
    description: 'Welcome the new arrival with a thoughtful group gift',
    category: 'baby',
    suggestedAmounts: [20, 35, 50, 100],
    customAmountEnabled: true,
    theme: {
      primaryColor: '#6C63FF',
      accentColor: '#9D8DF1',
    },
  },
  {
    id: 'baby-2',
    title: 'Diaper & Essentials Fund',
    description: 'Help stock up on diapers and baby essentials',
    category: 'baby',
    suggestedAmounts: [15, 25, 50, 75],
    customAmountEnabled: true,
    theme: {
      primaryColor: '#6C63FF',
      accentColor: '#A5D8FF',
    },
  },
];

const birthdayTemplates: Template[] = [
  {
    id: 'birthday-1',
    title: 'Birthday Celebration Fund',
    description: 'Make their birthday extra special with a group gift',
    category: 'birthday',
    suggestedAmounts: [20, 40, 75, 150],
    customAmountEnabled: true,
    theme: {
      primaryColor: '#10B981',
      accentColor: '#34D399',
    },
  },
];

const getRandomDelay = (): number => {
  return Math.random() * 1000 + 1500; // 1.5-2.5 seconds
};

export const mockGenerateCollection = async (
  request: GenerateCollectionRequest
): Promise<GenerateCollectionResponse> => {
  const delay = getRandomDelay();

  await new Promise((resolve) => setTimeout(resolve, delay));

  const prompt = request.userPrompt.toLowerCase();

  // Error simulation
  if (prompt.includes('error') || prompt.includes('fail')) {
    throw new Error('AI service temporarily unavailable. Please try again.');
  }

  let templates: Template[];
  let feedback: string;

  // Determine which templates to return based on prompt
  if (
    prompt.includes('wedding') ||
    prompt.includes('bride') ||
    prompt.includes('groom') ||
    prompt.includes('marriage') ||
    request.category === 'wedding'
  ) {
    templates = weddingTemplates;

    // Personalize feedback if name is mentioned
    const nameMatch = prompt.match(/for (\w+)/i);
    if (nameMatch) {
      feedback = `Here's a wedding gift collection for ${nameMatch[1]}`;
    } else {
      feedback = "Here's a wedding gift collection";
    }
  } else if (
    prompt.includes('baby') ||
    prompt.includes('shower') ||
    prompt.includes('newborn') ||
    request.category === 'baby'
  ) {
    templates = babyShowerTemplates;
    feedback = "Group gift collection for a baby shower";
  } else if (
    prompt.includes('birthday') ||
    prompt.includes('party') ||
    request.category === 'birthday'
  ) {
    templates = birthdayTemplates;
    feedback = "Here's a birthday celebration collection";
  } else {
    // Default to wedding templates
    templates = weddingTemplates;
    feedback = "Here's a collection based on your request";
  }

  return {
    templates,
    feedback,
    generatedAt: Date.now(),
  };
};
