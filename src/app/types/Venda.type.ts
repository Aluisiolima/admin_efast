import { Produto } from "./Produto.type";

export type Venda = {
  id: number;
  cliente: string;
  tipo_pagamento: string;
  endereco: string;
  mesa: string;
  data_pedido: string;
  status: "entregue" | "pendente" | "cancelado";
  produtos: (Produto & { quantidade: number })[];
  valor_total: number;
};
