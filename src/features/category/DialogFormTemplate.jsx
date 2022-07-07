import React from 'react';

export class SampleBase extends React.PureComponent {
    rendereComplete() {
        /**custom render complete function */
    }
    componentDidMount() {
        setTimeout(() => {
            this.rendereComplete();
        });
    }
}

export class DialogFormTemplate extends SampleBase {
    constructor(props) {
        super(props);
        this.state = Object.assign({}, props);
    }

    onChange(args) {
        let key = args.target.name;
        let value = args.target.value;
        this.setState({ [key]: value });
    }
    componentDidMount() {
        this.name.focus();
    }
    render() {
        const data = this.state;
        return (
            <div>
                <div className='grid text-md'>
                    {!data.isAdd && (
                        <div className='e-float-input e-control-wrapper'>
                            <input id='code' name='Code' type='number' disabled={true} value={data.code} />
                            <span className='e-float-line'></span>
                            <label className='e-float-text e-label-top font-bold'>Code</label>
                        </div>
                    )}
                    <div className='e-float-input e-control-wrapper'>
                        <input
                            ref={(input) => (this.name = input)}
                            value={data.name}
                            id='name'
                            name='name'
                            type='text'
                            onChange={this.onChange.bind(this)}
                        />
                        <span className='e-float-line'></span>
                        <label className='e-float-text e-label-top'>Category</label>
                    </div>
                </div>
            </div>
        );
    }
}
