export interface IRoute {
    regex: RegExp;
    method: string;
    controller: Function;
}
