export interface AisWebSupResp  {
  aisweb: AisWeb;
}

export interface AisWeb  {
  suplementos: Suplemento;

}

export interface Suplemento {
  item?: SupItem[];
}

export interface SupItem {
  id?: string //identificador alfanumérico do suplemento
  status?: string; //situação atual do suplemento (em vigor, cancelado, etc)
  n?: string; //grupo alfanumérico com 4 dígitos, contendo o número de ordem do suplemento
  serie?: string; //série de distribuição do suplemento AIP
  tipo?: string; //tipo do suplemento AIP (comum ou AIRAC)
  local?: string; //código ICAO da localidade de referência do suplemento AIP
  dt?: string; //data do ciclo AIRAC no qual o suplemento entrou em vigência.
  titulo?: string; //título curto que indica a informação que está sendo divulgada
  texto?: string; //conteúdo da informação que está sendo divulgada
  duracao?: string; //período de validade da informação contida no suplemento AIP
  ref?: string; //seção de referência no documento AIP.
  anexo?: string; //link para realizar o download do anexo do suplemento AIP em formato PDF.
}
