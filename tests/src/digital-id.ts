import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { DigitalId } from "../../target/types/digital_id";
import { createProfileIx } from '@digital-id/sdk';
import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction, TransactionInstruction } from "@solana/web3.js";
import 'dotenv/config';

export const airdrop = async (
  connection: Connection,
  publicKey: PublicKey,
  lamports: number
) => {
  const { blockhash, lastValidBlockHeight } =
    await connection.getLatestBlockhash();

  await connection.confirmTransaction(
    {
      signature: await connection.requestAirdrop(publicKey, lamports),
      blockhash,
      lastValidBlockHeight,
    },
    "confirmed"
  );
};

export const sendTx = async (
  connection: Connection,
  ixs: TransactionInstruction[],
  signers: Keypair[],
) => {
  const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();

  const tx = new Transaction({
    blockhash,
    lastValidBlockHeight,
  });
  tx.add(...ixs);
  tx.sign(...signers);

  return await connection.sendTransaction(tx, signers);
}

describe("digital-id", () => {
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.DigitalId as Program<DigitalId>;

  it("Is initialized!", async () => {
    const caller = Keypair.generate();

    await airdrop(
      program.provider.connection,
      caller.publicKey,
      1 * LAMPORTS_PER_SOL,
    );

    const ix = await createProfileIx(
      caller.publicKey, 
      caller.publicKey, 
      "a", 
      program.provider
    );

    // console.log(ix);

    // const ix = SystemProgram.transfer({
    //   fromPubkey: caller.publicKey,
    //   toPubkey: caller.publicKey,
    //   lamports: 100
    // })

    try {
      await sendTx(program.provider.connection, [ix], [caller]);
    } catch (e) {
      console.error(e)
    }
    console.log("Your transaction signature", );
  });
});
