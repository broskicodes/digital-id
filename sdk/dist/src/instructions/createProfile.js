"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProfileIx = void 0;
const helpers_1 = require("../utils/helpers");
const crypto_1 = require("crypto");
const pdas_1 = require("../utils/pdas");
const sdk_1 = require("@gumhq/sdk");
const createProfileIx = (ownerPubkey, payerPubkey, metadataCid, provider) => __awaiter(void 0, void 0, void 0, function* () {
    const program = (0, helpers_1.getDigidProgram)(provider);
    const initBytes = (0, crypto_1.randomBytes)(32);
    const [[authority], [gumUser]] = [
        (0, pdas_1.getDigidAuthorityPda)(ownerPubkey),
        (0, pdas_1.getGumUserPda)(initBytes),
    ];
    const [gumProfile] = (0, pdas_1.getGumProfilePda)("Personal", gumUser);
    const [gumProfileMetadata] = (0, pdas_1.getGumProfileMetadataPda)(gumProfile);
    const mtdtBuf = Buffer.alloc(64);
    Buffer.from(metadataCid).copy(mtdtBuf);
    const ix = yield program.methods
        .createProfile(initBytes, mtdtBuf)
        .accounts({
        payer: payerPubkey,
        owner: ownerPubkey,
        authority,
        gumUser,
        gumProfile,
        gumProfileMetadata,
        gplCoreProgram: sdk_1.GPLCORE_PROGRAMS.localnet,
    })
        .instruction();
    return ix;
});
exports.createProfileIx = createProfileIx;
//# sourceMappingURL=createProfile.js.map