// @flow
import { createSelector } from 'reselect'
import filter from 'lodash/filter'

export type DebtMonth = {
  month: number,
  apr: number,
  balance: number,
  balanceExtra: number,
  interest: number,
  interestExtra: number,
  monthlyPayment: number,
  paymentExtra: number,
  endingBalance: number,
  endingBalanceExtra: number,
}

export type Debt = {
  balance: number,
  apr: number,
  monthlyPayment: number,
}

export type DebtTable = {
  months: Array<DebtMonth>,
  monthsExtra: number,
  monthsSaved: number,
  interestSaved: number,
} & Debt

const calculateMonths = (
  debt: Debt,
  months: Array<DebtMonth>,
  extra: number
) => {

  // current
  const { apr, balance, monthlyPayment: payment } = debt

  const interest = (balance * (apr / 100)) / 12
  const endingBalance = (balance + interest) - payment
  // with additional
  const prevMonth = months.length - 1
  const paymentExtra = payment + extra
  const balanceExtra = prevMonth >= 0
    ? months[prevMonth].endingBalanceExtra
    : balance
  const interestExtra = prevMonth >= 0
    ? (balanceExtra * (apr / 100)) / 12
    : interest
  const endingBalanceExtra = (balanceExtra + interestExtra) - paymentExtra

  months.push({
    month: months.length + 1,
    apr,
    balance,
    balanceExtra: balanceExtra > 0 ? balanceExtra : 0,
    interest,
    interestExtra,
    monthlyPayment: payment,
    paymentExtra,
    endingBalance: endingBalance > 0 ? endingBalance : 0,
    endingBalanceExtra: endingBalanceExtra > 0 ? endingBalanceExtra : 0,
  })

  const nextMonthDebt = {
    ...debt,
    balance: endingBalance > 0 ? endingBalance : 0,
  }

  // console.log(debt, extra, nextMonthDebt)
  return endingBalance > 0
    ? calculateMonths(nextMonthDebt, months, extra)
    : months

}

const calculateSavings = (months: Array<DebtMonth>) => {

  const monthsSaved = filter(months, { balanceExtra: 0 })
  let interestSaved = 0
  monthsSaved.forEach(month => {

    interestSaved += month.interest

  })
  return {
    monthsExtra: months.length - monthsSaved.length,
    monthsSaved: monthsSaved.length,
    interestSaved,
  }

}

const getDebt = (debt: Debt): Debt => debt
const getExtraPayment = (debt: Debt, extra: number): number => extra

const chipperChart = createSelector(
  [getDebt, getExtraPayment],
  (debt: Debt, extra: number): DebtTable => {

    const paymentValidate
      = ((debt.balance / debt.monthlyPayment) > 50 || debt.monthlyPayment < 1)
        ? (debt.balance / 50) : debt.monthlyPayment

    const debtValidate = {
      ...debt,
      monthlyPayment: paymentValidate,
    }

    const months = calculateMonths(debtValidate, [], extra)
    const savings = calculateSavings(months)

    // if (!debt.balance) {

    //   return { ...debt, balance: 0, months: [], ...savings }

    // }

    return { ...debtValidate, months, ...savings }

  },
)

export default chipperChart
