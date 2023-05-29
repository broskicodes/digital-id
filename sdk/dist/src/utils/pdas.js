"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGumProfileMetadataPda = exports.getGumProfilePda = exports.getGumUserPda = exports.getDigidAuthorityPda = void 0;
const sdk_1 = require("@gumhq/sdk");
const web3_js_1 = require("@solana/web3.js");
const constants_1 = require("./constants");
const getDigidAuthorityPda = (ownerPubkey) => {
    return web3_js_1.PublicKey.findProgramAddressSync([constants_1.AUTHORITY_SEED, ownerPubkey.toBuffer()], constants_1.DIGID_PROGRAM_ID);
};
exports.getDigidAuthorityPda = getDigidAuthorityPda;
const getGumUserPda = (initBytes) => {
    return web3_js_1.PublicKey.findProgramAddressSync([constants_1.GUM_USER_SEED, initBytes], sdk_1.GPLCORE_PROGRAMS.localnet);
};
exports.getGumUserPda = getGumUserPda;
const getGumProfilePda = (namespace, userPubkey) => {
    return web3_js_1.PublicKey.findProgramAddressSync([constants_1.GUM_PROFILE_SEED, Buffer.from(namespace), userPubkey.toBuffer()], sdk_1.GPLCORE_PROGRAMS.localnet);
};
exports.getGumProfilePda = getGumProfilePda;
const getGumProfileMetadataPda = (profilePubkey) => {
    return web3_js_1.PublicKey.findProgramAddressSync([constants_1.GUM_PROFILE_METADATA_SEED, profilePubkey.toBuffer()], sdk_1.GPLCORE_PROGRAMS.localnet);
};
exports.getGumProfileMetadataPda = getGumProfileMetadataPda;
//# sourceMappingURL=pdas.js.map