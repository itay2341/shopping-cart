export interface ProductDetail {
    name: string;
    image: string;
    price: number;
};

export type ProductItems = {
    [id: string]: ProductDetail;
};

export interface CartItems {
    [id: string]: number;
};

export interface CartItemDisplay {
    id: string;
    name: string;
    price: number;
    count: number;
};
