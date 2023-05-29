/// <reference types="node" />
import { PublicKey } from "@solana/web3.js";
export declare const getDigidAuthorityPda: (ownerPubkey: PublicKey) => [PublicKey, number];
export declare const getGumUserPda: (initBytes: Buffer) => [PublicKey, number];
export declare const getGumProfilePda: (namespace: string, userPubkey: PublicKey) => [PublicKey, number];
export declare const getGumProfileMetadataPda: (profilePubkey: PublicKey) => [PublicKey, number];
