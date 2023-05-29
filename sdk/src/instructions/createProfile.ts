import { Provider } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import { getDigidProgram } from "../utils/helpers";
import { randomBytes } from "crypto";
import {
  getDigidAuthorityPda,
  getGumProfileMetadataPda,
  getGumProfilePda,
  getGumUserPda,
} from "../utils/pdas";
import { GPLCORE_PROGRAMS } from "@gumhq/sdk";
import { GUM_PROGRAM_ID } from "../utils";

export const createProfileIx = async (
  ownerPubkey: PublicKey,
  payerPubkey: PublicKey,
  metadataCid: string,
  provider: Provider
) => {
  const program = getDigidProgram(provider);
  const initBytes = randomBytes(32);

  const [[authority], [gumUser]] = [
    getDigidAuthorityPda(ownerPubkey),
    getGumUserPda(initBytes),
  ];

  const [gumProfile] = getGumProfilePda("Personal", gumUser);
  const [gumProfileMetadata] = getGumProfileMetadataPda(gumProfile);

  const mtdtBuf = Buffer.alloc(64);
  Buffer.from(metadataCid).copy(mtdtBuf)

  const ix = await program.methods
    .createProfile(initBytes, mtdtBuf)
    .accounts({
      payer: payerPubkey,
      owner: ownerPubkey,
      authority,
      gumUser,
      gumProfile,
      gumProfileMetadata,
      gplCoreProgram: GPLCORE_PROGRAMS.localnet,
    })
    .instruction();

  return ix;
};
