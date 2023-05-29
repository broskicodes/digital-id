use anchor_lang::prelude::*;

pub mod id;
pub mod instructions;
pub mod state;

use crate::id::*;
use crate::instructions::*;

#[program]
pub mod digital_id {
    use super::*;

    pub fn create_profile(ctx: Context<CreateProfile>, init_bytes: [u8; 32], metadata_cid: [u8; 64]) -> Result<()> {
        profile::create::handler(ctx, init_bytes, metadata_cid)?;
        Ok(())
    }
}

