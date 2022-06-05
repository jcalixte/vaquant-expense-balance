import { AccountExpenses } from '@/types/expense'
import { Refund } from '@/types/refund'

export class Balance {
  constructor(private readonly accountExpenses: AccountExpenses) {}

  public calculate(): Refund {
    let refund: Refund = {}

    for (const funder in this.accountExpenses) {
      for (const expense of this.accountExpenses[funder]) {
        for (const receiver of expense.receivers) {
          if (receiver === funder) {
            continue
          }

          refund = {
            [receiver]: {
              [funder]: expense.cost / expense.receivers.length
            }
          }
        }
      }
    }

    return refund
  }
}
