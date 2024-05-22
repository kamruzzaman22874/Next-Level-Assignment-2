
// create interface 

export type Tvariants = {
    type: string;
    value: string;
}

export type Tinventory = {
    quantity: number;
    inStock: boolean;
}

export type Tproducts = {
    id?: string;
    name: string;
    description: string;
    price: number;
    category: string;
    tags: string[];
    variants: Tvariants[];
    inventory: Tinventory;
}

