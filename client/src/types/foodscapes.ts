import { Settings } from 'components/map/legend/types';

export interface Foodscape {
  id: number;
  label: string;
  color: string;
  value: number;
  parentId: number;
  parentLabel: string;
  parentColor: string;
}

export interface FoodscapeGroup {
  id: number;
  value: number;
  values: Foodscape[];
  label: string;
  color: string;
}

export type FoodscapesSettings = {
  group: boolean;
} & Settings;

export type FoodscapeChartData = {
  '101': number;
  '102': number;
  '103': number;
  '104': number;
  '105': number;
  '109': number;
  '110': number;
  '201': number;
  '202': number;
  '203': number;
  '204': number;
  '205': number;
  '206': number;
  '209': number;
  '210': number;
  '301': number;
  '304': number;
  '306': number;
  '401': number;
  '402': number;
  '403': number;
  '404': number;
  '406': number;
  '407': number;
  '408': number;
  '409': number;
  '410': number;
  '501': number;
  '504': number;
  '506': number;
  '508': number;
  '509': number;
  '510': number;
  '601': number;
  '602': number;
  '603': number;
  '604': number;
  '605': number;
  '606': number;
  '607': number;
  '609': number;
  '610': number;
  '701': number;
  '702': number;
  '703': number;
  '704': number;
  '705': number;
  '706': number;
  '707': number;
  '708': number;
  '709': number;
  '710': number;
  '801': number;
  '802': number;
  '803': number;
  '804': number;
  '901': number;
  '902': number;
  '903': number;
  '904': number;
  '905': number;
  '906': number;
  '909': number;
  '910': number;
  '1001': number;
  '1002': number;
  '1003': number;
  '1004': number;
  '1005': number;
  '1006': number;
  '1007': number;
  '1009': number;
  '1010': number;
  '1101': number;
  '1102': number;
  '1103': number;
  '1104': number;
  '1105': number;
  '1106': number;
  '1107': number;
  '1108': number;
  '1109': number;
  '1110': number;
};
