// @flow
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { reduxForm, formValueSelector, change } from 'redux-form'
import type { RootReducerState } from 'src/redux/modules'
import chipperChart from 'src/selectors/chipperChart'
import type { DebtTable } from 'src/selectors/chipperChart'
import Home from './Home'

const selector = formValueSelector('homeForm')

const validate = (values: Object): Object => {

  const requiredFields = []

  const errors = {}

  requiredFields.forEach(field => {

    if (!values[field]) errors[field] = 'Required'

  })

  return errors

}

type StateProps = {
  chart: DebtTable,
  monthlyPayment: number,
}

const mapStateToProps = (state: RootReducerState): StateProps => {

  const chart = chipperChart({
    balance: parseFloat(selector(state, 'loanBalance')),
    apr: 4,
    monthlyPayment: parseFloat(selector(state, 'monthlyPayment')),
  },
  parseFloat(selector(state, 'chipperInvestments')))

  return {
    chart,
    monthlyPayment: parseFloat(selector(state, 'monthlyPayment')),
  }

}

type DispatchProps = {
  changeFieldValue: Function,
}

const mapDispatchToProps = (dispatch: GlobalDispatch<*>): DispatchProps => ({
  changeFieldValue: (field: string, value: any) => {

    dispatch(change('homeForm', field, value, false, false))

  },
})

const reduxFormConfig = {
  form: 'homeForm',
  initialValues: {
    loanBalance: 20000,
    monthlyPayment: 500,
    chipperInvestments: 100,
  },
  validate,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(
  reduxForm(reduxFormConfig)(Home)
))

export type ReduxProps = StateProps & DispatchProps
