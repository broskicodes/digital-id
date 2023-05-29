use anchor_lang::prelude::*;

#[account]
pub struct Authority {
  pub owner: Pubkey,
  pub init_bytes: [u8; 32],
  pub metadata_content_id: [u8; 64],
} 

impl Authority {
  pub const LEN: usize = 8 + 32 + 32 + 64;
  pub const SEED: &'static [u8] = b"authority";
}