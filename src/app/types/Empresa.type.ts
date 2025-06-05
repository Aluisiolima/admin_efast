export type EmpresaType = {
  id_empresa: number;
  nome_empresa: string;
  whatsapp: string;
  instagram: string | null;
  facebook: string | null;
  endereco: string;
  email: string | null;
  path: string;
  logo_img: number;
};

export type EmpresaUpdate = {
  id: number;
  nome?: string;
  whatsapp?: string;
  instagram?: string | null;
  facebook?: string | null;
  endereco?: string;
  email?: string | null;
  logo?: number;
};
