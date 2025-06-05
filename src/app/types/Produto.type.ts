export type Produto = {
  id_produto: number;
  id_empresa: number;
  nome_produto: string;
  descricao: string;
  desconto: number;
  valor: number;
  path: string;
  tipo: string;
  id_img: number;
};

export type TypeProdutos = {
  tipo: string;
};

export type UpdateProduct = {
  id: number;
  nome?: string;
  descricao?: string;
  desconto?: number;
  valor?: number;
  tipo?: string;
  id_img?: number;
  path?: string;
};

export type NewProduto = {
  nome: string;
  descricao?: string | null;
  desconto: number;
  valor: string;
  tipo: string;
  id_img: number;
};
