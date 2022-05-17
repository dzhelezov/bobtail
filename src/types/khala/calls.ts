import assert from 'assert'
import {CallContext, Result, deprecateLatest} from './support'
import * as v1 from './v1'
import * as v1090 from './v1090'

export class CouncilVoteCall {
  constructor(private ctx: CallContext) {
    assert(this.ctx.extrinsic.name === 'council.vote')
  }

  /**
   *  Add an aye or nay vote for the sender to the given proposal.
   * 
   *  Requires the sender to be a member.
   * 
   *  Transaction fees will be waived if the member is voting on any particular proposal
   *  for the first time and the call is successful. Subsequent vote changes will charge a fee.
   *  # <weight>
   *  ## Weight
   *  - `O(M)` where `M` is members-count (code- and governance-bounded)
   *  - DB:
   *    - 1 storage read `Members` (codec `O(M)`)
   *    - 1 storage mutation `Voting` (codec `O(M)`)
   *  - 1 event
   *  # </weight>
   */
  get isV1(): boolean {
    return this.ctx._chain.getCallHash('council.vote') === '89a6cc1af1492447ed05b72b49a416cd0bbde7d6f390ca281ad54d3e2e69c256'
  }

  /**
   *  Add an aye or nay vote for the sender to the given proposal.
   * 
   *  Requires the sender to be a member.
   * 
   *  Transaction fees will be waived if the member is voting on any particular proposal
   *  for the first time and the call is successful. Subsequent vote changes will charge a fee.
   *  # <weight>
   *  ## Weight
   *  - `O(M)` where `M` is members-count (code- and governance-bounded)
   *  - DB:
   *    - 1 storage read `Members` (codec `O(M)`)
   *    - 1 storage mutation `Voting` (codec `O(M)`)
   *  - 1 event
   *  # </weight>
   */
  get asV1(): {proposal: Uint8Array, index: number, approve: boolean} {
    assert(this.isV1)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV1
  }

  get asLatest(): {proposal: Uint8Array, index: number, approve: boolean} {
    deprecateLatest()
    return this.asV1
  }
}

export class DemocracySecondCall {
  constructor(private ctx: CallContext) {
    assert(this.ctx.extrinsic.name === 'democracy.second')
  }

  /**
   *  Signals agreement with a particular proposal.
   * 
   *  The dispatch origin of this call must be _Signed_ and the sender
   *  must have funds to cover the deposit, equal to the original deposit.
   * 
   *  - `proposal`: The index of the proposal to second.
   *  - `seconds_upper_bound`: an upper bound on the current number of seconds on this
   *    proposal. Extrinsic is weighted according to this value with no refund.
   * 
   *  Weight: `O(S)` where S is the number of seconds a proposal already has.
   */
  get isV1(): boolean {
    return this.ctx._chain.getCallHash('democracy.second') === 'c388fcd4c5b27ad8d3d1c706339f03968568c8a0f44b0114f86f00e55195abec'
  }

  /**
   *  Signals agreement with a particular proposal.
   * 
   *  The dispatch origin of this call must be _Signed_ and the sender
   *  must have funds to cover the deposit, equal to the original deposit.
   * 
   *  - `proposal`: The index of the proposal to second.
   *  - `seconds_upper_bound`: an upper bound on the current number of seconds on this
   *    proposal. Extrinsic is weighted according to this value with no refund.
   * 
   *  Weight: `O(S)` where S is the number of seconds a proposal already has.
   */
  get asV1(): {proposal: number, secondsUpperBound: number} {
    assert(this.isV1)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV1
  }

  get asLatest(): {proposal: number, secondsUpperBound: number} {
    deprecateLatest()
    return this.asV1
  }
}

export class DemocracyVoteCall {
  constructor(private ctx: CallContext) {
    assert(this.ctx.extrinsic.name === 'democracy.vote')
  }

  /**
   *  Vote in a referendum. If `vote.is_aye()`, the vote is to enact the proposal;
   *  otherwise it is a vote to keep the status quo.
   * 
   *  The dispatch origin of this call must be _Signed_.
   * 
   *  - `ref_index`: The index of the referendum to vote for.
   *  - `vote`: The vote configuration.
   * 
   *  Weight: `O(R)` where R is the number of referendums the voter has voted on.
   */
  get isV1(): boolean {
    return this.ctx._chain.getCallHash('democracy.vote') === '99c87c2462eae0050bd7a29171838d7c9d7b88f3bc9c600dc60b8d304a9c85dc'
  }

  /**
   *  Vote in a referendum. If `vote.is_aye()`, the vote is to enact the proposal;
   *  otherwise it is a vote to keep the status quo.
   * 
   *  The dispatch origin of this call must be _Signed_.
   * 
   *  - `ref_index`: The index of the referendum to vote for.
   *  - `vote`: The vote configuration.
   * 
   *  Weight: `O(R)` where R is the number of referendums the voter has voted on.
   */
  get asV1(): {refIndex: number, vote: v1.AccountVote} {
    assert(this.isV1)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   * Vote in a referendum. If `vote.is_aye()`, the vote is to enact the proposal;
   * otherwise it is a vote to keep the status quo.
   * 
   * The dispatch origin of this call must be _Signed_.
   * 
   * - `ref_index`: The index of the referendum to vote for.
   * - `vote`: The vote configuration.
   * 
   * Weight: `O(R)` where R is the number of referendums the voter has voted on.
   */
  get isV1090(): boolean {
    return this.ctx._chain.getCallHash('democracy.vote') === '0efe1fcbb98d2fc487ae2000c67d643ca2393fcf25703010de5a67225e5a4ecd'
  }

  /**
   * Vote in a referendum. If `vote.is_aye()`, the vote is to enact the proposal;
   * otherwise it is a vote to keep the status quo.
   * 
   * The dispatch origin of this call must be _Signed_.
   * 
   * - `ref_index`: The index of the referendum to vote for.
   * - `vote`: The vote configuration.
   * 
   * Weight: `O(R)` where R is the number of referendums the voter has voted on.
   */
  get asV1090(): {refIndex: number, vote: v1090.AccountVote} {
    assert(this.isV1090)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV1090
  }

  get asLatest(): {refIndex: number, vote: v1090.AccountVote} {
    deprecateLatest()
    return this.asV1090
  }
}

export class PhragmenElectionVoteCall {
  constructor(private ctx: CallContext) {
    assert(this.ctx.extrinsic.name === 'phragmenElection.vote')
  }

  /**
   *  Vote for a set of candidates for the upcoming round of election. This can be called to
   *  set the initial votes, or update already existing votes.
   * 
   *  Upon initial voting, `value` units of `who`'s balance is locked and a deposit amount is
   *  reserved. The deposit is based on the number of votes and can be updated over time.
   * 
   *  The `votes` should:
   *    - not be empty.
   *    - be less than the number of possible candidates. Note that all current members and
   *      runners-up are also automatically candidates for the next round.
   * 
   *  If `value` is more than `who`'s total balance, then the maximum of the two is used.
   * 
   *  The dispatch origin of this call must be signed.
   * 
   *  ### Warning
   * 
   *  It is the responsibility of the caller to **NOT** place all of their balance into the
   *  lock and keep some for further operations.
   * 
   *  # <weight>
   *  We assume the maximum weight among all 3 cases: vote_equal, vote_more and vote_less.
   *  # </weight>
   */
  get isV14(): boolean {
    return this.ctx._chain.getCallHash('phragmenElection.vote') === '1a1617701094b9706e12a855778e01f118c46b5ff80b1e2424a9c502ecb58c2c'
  }

  /**
   *  Vote for a set of candidates for the upcoming round of election. This can be called to
   *  set the initial votes, or update already existing votes.
   * 
   *  Upon initial voting, `value` units of `who`'s balance is locked and a deposit amount is
   *  reserved. The deposit is based on the number of votes and can be updated over time.
   * 
   *  The `votes` should:
   *    - not be empty.
   *    - be less than the number of possible candidates. Note that all current members and
   *      runners-up are also automatically candidates for the next round.
   * 
   *  If `value` is more than `who`'s total balance, then the maximum of the two is used.
   * 
   *  The dispatch origin of this call must be signed.
   * 
   *  ### Warning
   * 
   *  It is the responsibility of the caller to **NOT** place all of their balance into the
   *  lock and keep some for further operations.
   * 
   *  # <weight>
   *  We assume the maximum weight among all 3 cases: vote_equal, vote_more and vote_less.
   *  # </weight>
   */
  get asV14(): {votes: Uint8Array[], value: bigint} {
    assert(this.isV14)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV14
  }

  get asLatest(): {votes: Uint8Array[], value: bigint} {
    deprecateLatest()
    return this.asV14
  }
}
