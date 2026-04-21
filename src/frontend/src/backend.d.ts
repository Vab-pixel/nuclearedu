import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface IsotopeRecord {
    n: bigint;
    z: bigint;
    branchingRatios: Array<number>;
    decayModes: Array<string>;
    name: string;
    lastUpdated: string;
    sourceUri: string;
    atomicMassAMU: number;
    massExcessKeV: number;
    bindingEnergyPerNucleon: number;
    abundance: number;
    halfLifeSeconds: number;
    qValueMeV: number;
    symbol: string;
}
export interface IsotopePageResult {
    records: Array<IsotopeRecord>;
    page: bigint;
    totalCount: bigint;
    pageSize: bigint;
}
export type Result = {
    __kind__: "ok";
    ok: IsotopeRecord;
} | {
    __kind__: "err";
    err: string;
};
export type Result_1 = {
    __kind__: "ok";
    ok: IsotopePageResult;
} | {
    __kind__: "err";
    err: string;
};
export interface backendInterface {
    fetchAllIsotopesPage(page: bigint, pageSize: bigint): Promise<Result_1>;
    fetchIsotopeData(z: bigint, n: bigint): Promise<Result>;
    getCachedIsotopeCount(): Promise<bigint>;
    getLastFetchTimestamp(): Promise<bigint>;
}
