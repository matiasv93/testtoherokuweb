// @flow
import React, { PureComponent } from 'react'
import { Field } from 'redux-form'
import { Slider } from 'redux-form-material-ui'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Tooltip,
} from 'recharts'
import CustomTooltip from './CustomTooltip'
import type { ReduxProps } from './index'
import css from './Home.style.css'

type Props = ReduxProps & {}

class Home extends PureComponent<Props> {

  componentWillReceiveProps (nextProps: any) {

    const {
      chart,
      monthlyPayment,
      changeFieldValue,
    } = this.props

    if (chart.monthlyPayment !== monthlyPayment) {

      changeFieldValue('monthlyPayment', chart.monthlyPayment)

    }

  }

  props: Props

  render () {

    return (
      <div className={css.mainWrapper}>
        <div className={css.titleBlock}>
          <h2 className={css.title}>Saving with Chipper is a bright idea</h2>
        </div>
        <div className={css.chartContainer}>
          <ResponsiveContainer >
            <AreaChart
              data={this.props.chart.months}
              margin={{ top: 20, right: 20 }}
            >
              <defs>
                <linearGradient id="colorTraditional" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="2%" stopColor="#73BED6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#35749d" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorChipper" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="2%" stopColor="#73BED6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#3cbc8c" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Tooltip cursor={false} content={<CustomTooltip />} />
              <Area
                type="linear"
                dataKey="balance"
                stroke="#73BED6"
                strokeWidth={3}
                fillOpacity={2}
                fill="url(#colorTraditional)"
              />
              <Area
                type="linear"
                dataKey="balanceExtra"
                stroke="#299b70"
                strokeWidth={3}
                fillOpacity={2}
                fill="url(#colorChipper)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className={css.legends}>
          <div className={css.legendContent}>
            <span className={css.legendText}>With Chipper</span>
            <span className={css.chipperColor} />
          </div>
          <div className={css.legendContent}>
            <span className={css.legendText}>Traditional Loan</span>
            <span className={css.traditionalColor} />
          </div>
        </div>
        <div className={css.formContainer}>
          <form>
            <div className={css.inputGroup}>
              <span className={css.inputTitle}>
                Loan Balance
              </span>
              <span className={css.inputContent}>
                <Field
                  name="loanBalance"
                  component="input"
                  type="number"
                  className={css.input}
                />
              </span>
            </div>
            { /*
            <div className={css.inputGroup}>
              <span className={css.inputTitle}>
                Loan Interest
              </span>
              <span className={css.inputContent}>
                <Field
                  name="loanInterest"
                  component="input"
                  type="number"
                  className={css.input}
                />
              </span>
            </div>
            */ }
            <div className={css.inputGroup}>
              <span className={css.inputTitle}>
                Monthly Payment
              </span>
              <span className={css.inputContent}>
                <Field
                  name="monthlyPayment"
                  component="input"
                  type="number"
                  className={css.input}
                />
              </span>
            </div>
            <div className={css.inputGroup}>
              <span className={css.inputTitle}>
                Chipper Investments
              </span>
              <span className={css.inputContent}>
                <Field
                  name="chipperInvestments"
                  component="input"
                  type="number"
                  className={css.input}
                />
              </span>
            </div>
            <div className={css.inputGroup}>
              <Field
                name="chipperInvestments"
                component={Slider}
                min={0}
                max={2000}
                step={50}
                style={{ width: '100%' }}
              />
            </div>
          </form>
        </div>
      </div>
    )

  }

}

export default Home
