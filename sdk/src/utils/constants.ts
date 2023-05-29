import { PublicKey } from "@solana/web3.js";

// Program PDA seeds
export const AUTHORITY_SEED = Buffer.from("authority");

// Program ID
export const DIGID_PROGRAM_ID = new PublicKey(
  "CEVERfBqyTgjStQ27ZQVoSXUYQztSmKyWLkQPRebAMb8"
);

// Gum PDA seeds
export const GUM_USER_SEED = Buffer.from("user");
export const GUM_PROFILE_SEED = Buffer.from("profile");
export const GUM_PROFILE_METADATA_SEED = Buffer.from("profile_metadata");

export const GUM_PROGRAM_ID = new PublicKey(
  "9CV4oJpJBDUZrwLreRYAUmvf9FfC7R2fTb5fHcXvj7WH"
);