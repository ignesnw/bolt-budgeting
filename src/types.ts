export interface DailyRecord {
  id: string;
  user_id: string;
  date: string;
  budget: number;
  spending: number;
  saving: number;
  created_at: string;
}

export interface SavingsIdea {
  title: string;
  description: string;
  amount: number;
  category: 'investment' | 'travel' | 'education' | 'other';
}
