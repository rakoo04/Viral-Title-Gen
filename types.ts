export enum Niche {
  Educational = 'Educational',
  Business = 'Business',
  Tech = 'Tech',
  Creative = 'Creative',
  Entertainment = 'Entertainment',
  Other = 'Other'
}

export interface FormData {
  topic: string;
  audience: string;
  valueProp: string;
  niche: Niche;
  currentTitle: string;
}

export interface GenerationState {
  isLoading: boolean;
  response: string | null;
  error: string | null;
}