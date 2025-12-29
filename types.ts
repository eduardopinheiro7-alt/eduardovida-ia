
export interface PSSInfo {
  location: string;
  salary: number;
  hours: number;
  deadline: string;
  benefits: string[];
}

export interface AdCampaign {
  id: string;
  title: string;
  target: string;
  description: string;
  frequency: string;
}

export interface YouTubeIdea {
  title: string;
  category: 'ENEM' | 'CONCURSO' | 'PROFMAT' | 'BASICA' | 'OLIMPIADA' | 'MATEMATICANDO' | 'VIDA' | 'SHORTS';
  format: 'Regular' | 'Shorts';
}
