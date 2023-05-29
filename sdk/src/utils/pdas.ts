import { GPLCORE_PROGRAMS } from "@gumhq/sdk";
import { PublicKey } from "@solana/web3.js";
import {
  AUTHORITY_SEED,
  DIGID_PROGRAM_ID,
  GUM_PROFILE_METADATA_SEED,
  GUM_PROFILE_SEED,
  GUM_PROGRAM_ID,
  GUM_USER_SEED,
} from "./constants";

export const getDigidAuthorityPda = (ownerPubkey: PublicKey) => {
  return PublicKey.findProgramAddressSync(
    [AUTHORITY_SEED, ownerPubkey.toBuffer()],
    DIGID_PROGRAM_ID
  );
};

export const getGumUserPda = (initBytes: Buffer) => {
  return PublicKey.findProgramAddressSync(
    [GUM_USER_SEED, initBytes],
    GPLCORE_PROGRAMS.localnet
  );
};

export const getGumProfilePda = (namespace: string, userPubkey: PublicKey) => {
  return PublicKey.findProgramAddressSync(
    [GUM_PROFILE_SEED, Buffer.from(namespace), userPubkey.toBuffer()],
    GPLCORE_PROGRAMS.localnet
  );
};

export const getGumProfileMetadataPda = (profilePubkey: PublicKey) => {
  return PublicKey.findProgramAddressSync(
    [GUM_PROFILE_METADATA_SEED, profilePubkey.toBuffer()],
    GPLCORE_PROGRAMS.localnet
  );
};
