export interface DatatableParameter {
    page: number;
    size: number;
    column_order: string;
    column_direction: string;
    search: string;
    foreignKey: string;
    table: string;
    [key: string]: any; // Firma de indexacion para permitir acceder a una propiedad
}