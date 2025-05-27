export interface Trait {
    id: string;
    name: string;
}

export interface House {
    id: string;
    name: string;
    houseColours: string;
    founder: string;
    animal: string;
    traits: Trait[];
}