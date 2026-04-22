export type Lang = 'RU' | 'EN';
export type ObjectType = 'TIM' | 'ITR' | 'RD';
export type ModelType = 'PROJECTIVE' | 'CHURYUMOV';
export type View = 'EXPLORE' | 'HADAMARD';

export interface Tim {
  id: string;
  name: string;
  value: string;
  quadra: number;
}

export interface DisplayObject {
  id: string;
  name: string;
  bits: number[];
  quadra: number;
  value?: string;
}

export interface UIStrings {
  title: string;
  subtitle: string;
  explore: string;
  hadamard: string;
  model: string;
  projective: string;
  churyumov: string;
  object: string;
  tims: string;
  itrs: string;
  arps: string;
  about: string;
}

export interface AboutContent {
  intro: string;
  hadamard: string;
  fractality: string;
  models: string;
  semantics: string;
  detailed: string;
}
