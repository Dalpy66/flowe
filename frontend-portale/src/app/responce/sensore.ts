import { StoricoMisure } from "./storicoMisure";

export interface Sensore {
  id_sensore: number;
  stato_pianta: string;
  codice_sensore: string;
  latitudine: number;
  longitudine: number;
  nome_pianta: string;
  storico_misure: StoricoMisure[];
}