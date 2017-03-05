export class Evidence {
  user_id: string;
  album_id: number;
  evidence_name: string;
}

export class EmotionEvidence extends Evidence {
  emation: number;
}
