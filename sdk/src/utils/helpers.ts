import { Idl, Program, Provider } from "@coral-xyz/anchor";
import { DIGID_PROGRAM_ID } from "./constants";
import digidIdl from "../../DigidIDL.json";

export const getDigidProgram = (provider: Provider): Program => {
  return new Program(digidIdl as Idl, DIGID_PROGRAM_ID, provider);
};
