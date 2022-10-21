export interface AisWebInfotempResp  {
  aisweb: AisWeb;
}

export interface AisWeb  {
  infotemp: Infotemp;
}

export interface Infotemp {
  item: ItemInfotemp[];
}

export interface ItemInfotemp {
  AeroCode?: string //localidade id icao
  n?: string; //numero do infotemp
  number?: string; //numero mais comppleto
  action?: string; //ação do infotemp
  rmk?: string;//texto da mensagem
  startdate?: string; //data inicio
  enddate?: string; //data fim
  fir?: string; //FIR
  jur?: string; //Jurisdição
  aipsection?: string; //sessão da aip
  dt?: string //data divulgação
}
