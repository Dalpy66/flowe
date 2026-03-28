export interface InsertStoricoMisureRequest {
  sensor_id: string;
  temperatura: number;
  umidita: number;
  conducibilita: number;
  ph: number;
  azoto: number;
  fosforo: number;
  potassio: number;
  id_convertitore: string;
}