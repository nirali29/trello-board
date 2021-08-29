export interface List {
    title: string;
    cards?: Card[];
}

export interface Card {
    title: string;
    desc: string;
    creationTime: string;
}