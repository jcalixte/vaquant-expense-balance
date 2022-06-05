import { AccountExpenses } from '@/types/expense'
import { Refund } from '@/types/refund'

/**
 * It is not about calibrating expense by expense, but simply equalizing
 * at the end.
 * Splitting the ones who added more to the group and the ones who received
 * the most is finally a good idea.
 */
export class Balance {
  constructor(private readonly accountExpenses: AccountExpenses) {}

  public calculate(): Refund {
    let accountRefunds: Refund = {}

    for (const funder in this.accountExpenses) {
      for (const expense of this.accountExpenses[funder]) {
        for (const receiver of expense.receivers) {
          if (receiver === funder) {
            continue
          }

          let refund = expense.cost / expense.receivers.length

          if (accountRefunds?.[funder]?.[receiver]) {
            accountRefunds[funder][receiver] = Math.min(
              0,
              accountRefunds[funder][receiver] - refund
            )
          }

          accountRefunds[receiver] = {
            ...accountRefunds[receiver],
            [funder]: (accountRefunds[receiver]?.[funder] ?? 0) + refund
          }
        }
      }
    }

    return accountRefunds
  }
}
