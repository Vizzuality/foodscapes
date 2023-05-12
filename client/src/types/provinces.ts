export interface Province {
  id: number;
  value: number;
  label: string;
  iso: string;
  bbox: [number, number, number, number];
  parentId: string;
  parentLabel: string;
  parentIso: string;
}
