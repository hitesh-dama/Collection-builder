interface Collection {
  id: string;
  userPrompt: string;
  title: string;
  description: string;
  heroImageUrl: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

interface DonationPanel {
  id: string;
  collectionId: string;
  title: string;
  description: string;
  orderIndex: number;
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEYS = {
  COLLECTIONS: 'cheddar_collections',
  DONATION_PANELS: 'cheddar_donation_panels',
};

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export const storage = {
  collections: {
    create(data: Omit<Collection, 'id' | 'createdAt' | 'updatedAt'>): Collection {
      const collections = this.getAll();
      const newCollection: Collection = {
        ...data,
        id: generateId(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      collections.push(newCollection);
      localStorage.setItem(STORAGE_KEYS.COLLECTIONS, JSON.stringify(collections));
      return newCollection;
    },

    update(id: string, data: Partial<Collection>): Collection | null {
      const collections = this.getAll();
      const index = collections.findIndex((c) => c.id === id);
      if (index === -1) return null;

      collections[index] = {
        ...collections[index],
        ...data,
        updatedAt: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEYS.COLLECTIONS, JSON.stringify(collections));
      return collections[index];
    },

    get(id: string): Collection | null {
      const collections = this.getAll();
      return collections.find((c) => c.id === id) || null;
    },

    getAll(): Collection[] {
      const data = localStorage.getItem(STORAGE_KEYS.COLLECTIONS);
      return data ? JSON.parse(data) : [];
    },

    delete(id: string): boolean {
      const collections = this.getAll();
      const filtered = collections.filter((c) => c.id !== id);
      localStorage.setItem(STORAGE_KEYS.COLLECTIONS, JSON.stringify(filtered));
      return collections.length !== filtered.length;
    },
  },

  donationPanels: {
    create(data: Omit<DonationPanel, 'id' | 'createdAt' | 'updatedAt'>): DonationPanel {
      const panels = this.getAll();
      const newPanel: DonationPanel = {
        ...data,
        id: generateId(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      panels.push(newPanel);
      localStorage.setItem(STORAGE_KEYS.DONATION_PANELS, JSON.stringify(panels));
      return newPanel;
    },

    update(id: string, data: Partial<DonationPanel>): DonationPanel | null {
      const panels = this.getAll();
      const index = panels.findIndex((p) => p.id === id);
      if (index === -1) return null;

      panels[index] = {
        ...panels[index],
        ...data,
        updatedAt: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEYS.DONATION_PANELS, JSON.stringify(panels));
      return panels[index];
    },

    getByCollectionId(collectionId: string): DonationPanel[] {
      const panels = this.getAll();
      return panels
        .filter((p) => p.collectionId === collectionId)
        .sort((a, b) => a.orderIndex - b.orderIndex);
    },

    getAll(): DonationPanel[] {
      const data = localStorage.getItem(STORAGE_KEYS.DONATION_PANELS);
      return data ? JSON.parse(data) : [];
    },

    delete(id: string): boolean {
      const panels = this.getAll();
      const filtered = panels.filter((p) => p.id !== id);
      localStorage.setItem(STORAGE_KEYS.DONATION_PANELS, JSON.stringify(filtered));
      return panels.length !== filtered.length;
    },

    deleteByCollectionId(collectionId: string): number {
      const panels = this.getAll();
      const filtered = panels.filter((p) => p.collectionId !== collectionId);
      const deletedCount = panels.length - filtered.length;
      localStorage.setItem(STORAGE_KEYS.DONATION_PANELS, JSON.stringify(filtered));
      return deletedCount;
    },
  },

  clear() {
    localStorage.removeItem(STORAGE_KEYS.COLLECTIONS);
    localStorage.removeItem(STORAGE_KEYS.DONATION_PANELS);
  },
};

export type { Collection, DonationPanel };
