import React from 'react';
import { DataUtil } from '@syncfusion/ej2-data';
import { Browser, extend } from '@syncfusion/ej2-base';
import { NumericTextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import {countries} from '../../data/countries'

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
    CountryDistinctData = DataUtil.distinct(countries, 'name', true);
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
        // Set initail Focus
        this.name.focus();
    }
    render() {
       
        const data = this.state;
        return (
            <div>
                <div className='grid text-md'>
                    <div className='e-float-input e-control-wrapper'>
                        <input
                            
                            id='employeeID'
                            name='employeeID'
                            type='number'
                            disabled={!data.isAdd}
                            value={data.employeeID}
                        />
                        <span className='e-float-line'></span>
                        <label className='e-float-text e-label-top font-bold'>Emplyee ID</label>
                    </div>

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
                        <label className='e-float-text e-label-top'>Name</label>
                    </div>

                    <div className='e-float-input e-control-wrapper'>
                        <input
                            ref={(input) => (this.email = input)}
                            value={data.email}
                            id='email'
                            name='email'
                            type='text'
                            onChange={this.onChange.bind(this)}
                        />
                        <span className='e-float-line'></span>
                        <label className='e-float-text e-label-top'>Email</label>
                    </div>

                    <DatePickerComponent
                        id='hireDate'
                        name='hireDate'
                        value={data.hireDate}
                        placeholder='Hire Date'
                        floatLabelType='Always'
                        format='dd/MM/yyyy'
                    ></DatePickerComponent>

                    <DropDownListComponent
                        id='Country'
                        name='country'
                        value={data.country}
                        dataSource={this.CountryDistinctData}
                        fields={{ text: 'name', value: 'name' }}
                        placeholder='Country'
                        popupHeight='300px'
                        floatLabelType='Always'
                    ></DropDownListComponent>
                    <div className='e-float-input e-control-wrapper'>
                        <input
                            ref={(input) => (this.reportTo = input)}
                            value={data.reportTo}
                            id='reportTo'
                            name='reportTo'
                            type='text'
                            onChange={this.onChange.bind(this)}
                        />
                        <span className='e-float-line'></span>
                        <label className='e-float-text e-label-top'>Report To</label>
                    </div>
                </div>
            </div>
        );
    }
}
