// @flow
import React, { PureComponent } from 'react'

type Props = {
  active: boolean,
  payload: Array<*>,
}

class CustomTooltip extends PureComponent<Props> {

  static defaultProps = {
    active: false,
    payload: [],
  }

  props: Props

  render () {

    if (this.props.active) {

      const { payload } = this.props
      return (
        <div style={{ marginLeft: '-143px' }}>
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '18px',
            padding: '10px 12px',
          }}
          >
            <span style={{
              color: '#35749d',
              fontWeight: '600',
            }}
            >{`$${payload[0].payload.interest.toFixed(2)} in interest paid off in ${payload[0].payload.month} months`}</span>
          </div>
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '18px',
            padding: '10px 12px',
            marginTop: '80px',
          }}
          >
            <span style={{
              color: '#3cbc8c',
              fontWeight: '600',
            }}
            >{`$${payload[1].payload.interestExtra.toFixed(2)} in interest paid off in ${payload[0].payload.month} months`}</span>
          </div>
        </div>
      )

    }

    return null

  }

}

export default CustomTooltip
