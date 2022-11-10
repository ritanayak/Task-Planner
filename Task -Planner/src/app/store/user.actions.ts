export namespace User {
    export class Initialize {
        public static readonly type: string = '[User] initialize';

        public constructor(public user: any) {}
    }
}
