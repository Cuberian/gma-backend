export interface PaginationResponse<T> {
    total: number;
    offset: number;
    limit: number;
    sort: keyof T;
    order: "ASC" | "DESC";
    items: T[]
}