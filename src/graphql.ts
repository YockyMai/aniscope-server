
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface User {
    id: number;
    name?: Nullable<string>;
}

export interface IQuery {
    user(id: number): Nullable<User> | Promise<Nullable<User>>;
}

type Nullable<T> = T | null;
