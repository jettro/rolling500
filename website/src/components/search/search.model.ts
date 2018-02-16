export class IHits {
    hits: Array<IHit>;
    queryId: string;
}

export class IHit {

    constructor(id: string, album: string, artist: string, information: string) {
        this.id = id;
        this.album = album;
        this.artist = artist;
        this.information = information;
    }

    id: string;
    album: string;
    artist: string;
    information: string;
    year: number;
    image: string;
    label: string;
    order: number;
    sequence: number;
}