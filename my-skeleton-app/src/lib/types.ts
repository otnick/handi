
export interface IFischart {
    id: number;
    name: string;
}

export interface IFisch {
    id: number;
    name: string;
    art: IFischart;
    leange: number;
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
