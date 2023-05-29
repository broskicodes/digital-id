import { Provider } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
export declare const createProfileIx: (ownerPubkey: PublicKey, payerPubkey: PublicKey, metadataCid: string, provider: Provider) => Promise<import("@solana/web3.js").TransactionInstruction>;
