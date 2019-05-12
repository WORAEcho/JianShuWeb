
import React, { PureComponent } from 'react';

class HintInfoBox extends PureComponent {
    state=({

    })

    render(){
        const { value } = this.props
        const style = {
            boxSizing: 'border-box',
            top: '20px',
            left: '0',
            right: '0',
            position: 'absolute',
            margin:'auto',
            width: '310px',
            height: 'auto',
            listStyleType: 'none',
            zIndex: '10000000',
            border: '1px solid #ea6f5a',
            color: '#ea6f5a',
            borderRadius: '5px',
            background: '#fff',
            textAlign: 'center'
        }

        const spanStyle = {
            float:'center',
            fontSize: '13px',
            lineHeight: '16px',
            textAlign: 'center',
            padding: '10px',
            width: 'auto',
            position: 'relative',
            fontWeight: 'bold'
        }
        return (
            <div style={style}><div style={spanStyle}>{value}</div></div>
        )
    }
    componentDidMount(){
    }
}

export default HintInfoBox;
