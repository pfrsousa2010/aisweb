export interface AisWebNotamResp  {
  aisweb: AisWeb;
}

export interface AisWeb  {
  notam: Notam;
}

export interface Notam {
  item?: ItemNotam[];
}

export interface ItemNotam {
  loc?: string //localidade id icao
  ref?: string; //notam de referência
  cat?: string; //categoria do NOTAM
  tp?: string; //tipo do notam R, C, N
  n?: string; //numero do notam
  dt?: string; //data de criação
  b?: string; //inicio
  c?: string; //fim
  e?: string; //mensagem
  aero?: string;
  cidade?: string;
  origem?: string; //SDIA de origem
  nof?: string; // Centro Expeditor
  s?: string // Serie do centro expeditor
}
