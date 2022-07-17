import React from 'react';
import { SampleBase } from '../../components/Base/SampleBase';
import { InputDialog } from '../../components';

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

    componentDidMount() {}

    render() {
        const data = this.state;

        return (
            <div>
                <div className='form-row grid text-md'>
                    {!data.isAdd && (
                        <InputDialog
                            value={data.code}
                            name='code'
                            type='number'
                            label='Code'
                            disable
                            onChange={this.onChange.bind(this)}
                        />
                    )}
                    <InputDialog
                        value={data.name}
                        name='name'
                        type='text'
                        label='Category'
                        onChange={this.onChange.bind(this)}
                    />
                </div>
            </div>
        );
    }
}
