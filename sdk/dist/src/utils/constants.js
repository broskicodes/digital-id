"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GUM_PROGRAM_ID = exports.GUM_PROFILE_METADATA_SEED = exports.GUM_PROFILE_SEED = exports.GUM_USER_SEED = exports.DIGID_PROGRAM_ID = exports.AUTHORITY_SEED = void 0;
const web3_js_1 = require("@solana/web3.js");
// Program PDA seeds
exports.AUTHORITY_SEED = Buffer.from("authority");
// Program ID
exports.DIGID_PROGRAM_ID = new web3_js_1.PublicKey("CEVERfBqyTgjStQ27ZQVoSXUYQztSmKyWLkQPRebAMb8");
// Gum PDA seeds
exports.GUM_USER_SEED = Buffer.from("user");
exports.GUM_PROFILE_SEED = Buffer.from("profile");
exports.GUM_PROFILE_METADATA_SEED = Buffer.from("profile_metadata");
exports.GUM_PROGRAM_ID = new web3_js_1.PublicKey("9CV4oJpJBDUZrwLreRYAUmvf9FfC7R2fTb5fHcXvj7WH");
//# sourceMappingURL=constants.js.map