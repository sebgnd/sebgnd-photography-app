export default class Category {
    private _id: string;
    private _displayName: string;

    constructor(id: string, displayName: string) {
        this._id = id;
        this._displayName = displayName;
    }

    clone(): Category {
        return { ...this };
    }

    get id() {
        return this._id;
    }

    get displayName() {
        return this._displayName;
    }
}