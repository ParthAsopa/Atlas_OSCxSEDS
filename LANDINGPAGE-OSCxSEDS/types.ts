
export interface Mission {
  id: string;
  name: string;
  status: 'active' | 'past' | 'future';
  description: string;
  imageUrl: string;
}

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  sources?: GroundingSource[];
}
