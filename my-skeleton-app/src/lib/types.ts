
export interface IFischart {
    id: number;
    name: string;
}

export interface IFisch {
    id: number;
    fischart: number;
    laenge: number;
    ort: string;
}

export interface IAngler {
    id: number;
    name: string;
    fische: number[];
    koeder: number;
}

export interface IRekord {
    id: number;
    angler: IAngler;
    fisch: IFisch;
}
