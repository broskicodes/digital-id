"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDigidProgram = void 0;
const anchor_1 = require("@coral-xyz/anchor");
const constants_1 = require("./constants");
const DigidIDL_json_1 = __importDefault(require("../../DigidIDL.json"));
const getDigidProgram = (provider) => {
    return new anchor_1.Program(DigidIDL_json_1.default, constants_1.DIGID_PROGRAM_ID, provider);
};
exports.getDigidProgram = getDigidProgram;
//# sourceMappingURL=helpers.js.map