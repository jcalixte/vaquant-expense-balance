export interface Expense {
  cost: number
  receivers: string[]
}

export type AccountExpenses = Record<string, Expense[]>
