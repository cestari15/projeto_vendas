export interface Parcela {
    id: number;           
    parcela: number;       
    valor: number;          
    data_vencimento: string; 
}
export interface cadastroVendaInterface {
    id: number;
    cliente_id: number;
    produto_id: number;
    quantidade: number;
    data: string;
    tipo_pagamento:string;
    valor: number;
    valor_unit: number;
    parcelas: Parcela[];
}