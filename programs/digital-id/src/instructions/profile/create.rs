use anchor_lang::{prelude::*};
use gpl_core::{ID as GPL_CORE_PID, program::GplCore, constants::{USER_PREFIX_SEED, PROFILE_PREFIX_SEED, PROFILE_METADATA_PREFIX_SEED}};
// use std::str::FromStr;

use crate::state::Authority;

#[derive(Accounts)]
#[instruction(init_bytes: [u8; 32])]
pub struct CreateProfile<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,
    pub owner: Signer<'info>,
    #[account(
        init,
        payer = payer,
        space = Authority::LEN,
        seeds = [
            Authority::SEED,
            owner.key().as_ref()
        ],
        bump
    )]
    pub authority: Account<'info, Authority>,
    #[account(
        mut,
        seeds = [
            USER_PREFIX_SEED.as_bytes(),
            init_bytes.as_ref(),
        ],
        seeds::program = GPL_CORE_PID,
        bump,
    )]
    /// CHECK: Seeds checked
    pub gum_user: UncheckedAccount<'info>,
    #[account(
        mut,
        seeds = [
            PROFILE_PREFIX_SEED.as_bytes(),
            b"Personal",
            gum_user.key().as_ref(),
        ],
        seeds::program = GPL_CORE_PID,
        bump,
    )]
    /// CHECK: Seeds checked
    pub gum_profile: UncheckedAccount<'info>,
    #[account(
        mut,
        seeds = [
            PROFILE_METADATA_PREFIX_SEED.as_bytes(),
            gum_profile.key().as_ref(),
        ],
        seeds::program = GPL_CORE_PID,
        bump,
    )]
  /// CHECK: Seeds checked
  pub gum_profile_metadata: UncheckedAccount<'info>,
  #[account(address = GPL_CORE_PID)]
  pub gpl_core_program: Program<'info, GplCore>,
  /// CHECK: ll
  // pub gpl_core_program: UncheckedAccount<'info>,
  pub system_program: Program<'info, System>,
}


pub fn handler(ctx: Context<CreateProfile>, init_bytes: [u8; 32], metadata_cid: [u8; 64]) -> Result<()> {
    let authority = &mut ctx.accounts.authority;
    let owner = ctx.accounts.owner.clone();
    let gum_user = ctx.accounts.gum_user.clone();
    let gum_profile = ctx.accounts.gum_profile.clone();
    let gum_profile_metadata = ctx.accounts.gum_profile_metadata.clone();
    let gpl_core_program = ctx.accounts.gpl_core_program.clone();
    let system_program = ctx.accounts.system_program.clone();
    
    let authority_bump = *ctx.bumps.get("authority").ok_or(error!(ErrorCode::ConstraintSeeds))?;

    authority.owner = owner.key();
    authority.init_bytes = init_bytes.clone();
    authority.metadata_content_id = metadata_cid.clone();

    gpl_core::cpi::create_user(
        CpiContext::new_with_signer(
            gpl_core_program.to_account_info(),
            gpl_core::cpi::accounts::CreateUser {
              payer: ctx.accounts.payer.to_account_info(),
              user: gum_user.to_account_info(),
              authority: authority.to_account_info(),
              system_program: system_program.to_account_info(),
            },
            &[&[Authority::SEED, owner.key().as_ref(), &[authority_bump]]]
        ), 
        init_bytes,
    )?;

    msg!("{:?}", gum_profile.key());

    gpl_core::cpi::create_profile(
        CpiContext::new_with_signer(
            gpl_core_program.to_account_info(),
            gpl_core::cpi::accounts::CreateProfile {
              payer: ctx.accounts.payer.to_account_info(),
              profile: gum_profile.to_account_info(),
              user: gum_user.to_account_info(),
              authority: authority.to_account_info(),
              system_program: system_program.to_account_info(),
            },
            &[&[Authority::SEED, owner.key().as_ref(), &[authority_bump]]]
        ),
        String::from("Personal"),
    )?;

    gpl_core::cpi::create_profile_metadata(
        CpiContext::new_with_signer(
            gpl_core_program.to_account_info(),
            gpl_core::cpi::accounts::CreateProfileMetadata {
              payer: ctx.accounts.payer.to_account_info(),
              profile_metadata: gum_profile_metadata.to_account_info(),
              profile: gum_profile.to_account_info(),
              user: gum_user.to_account_info(),
              authority: authority.to_account_info(),
              system_program: system_program.to_account_info(),
            },
            &[&[Authority::SEED, owner.key().as_ref(), &[authority_bump]]]
        ),
        match String::from_utf8(metadata_cid.to_vec()) {
          Ok(str) => str,
          Err(_) => return Err(error!(ErrorCode::AccountDidNotDeserialize))
        },
    )?;

    Ok(())
}