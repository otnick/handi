
export interface IFischart {
    id: number;
    name: string;
}

export interface IFisch {
    id: number | null;
    name: string;
    art: number;
    laenge: number;
    ort: string;
}

export interface IAngler {
    name: string;
    fische: IFisch[];
    koeder: number;
}

export interface IRekord {
    angler: IAngler;
    fisch: IFisch;
}
