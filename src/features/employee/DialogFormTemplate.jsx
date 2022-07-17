import React from 'react';
import { DataUtil } from '@syncfusion/ej2-data';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { countries } from '../../data/countries';
import { InputDialog, DragAndDropImage } from '../../components';
import { firebaseUploadImage } from '../firebase/firebaseUploadFile';
import { SampleBase } from '../../components/Base/SampleBase';


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

    uploadImage(file) {
        firebaseUploadImage(file).then((result) => {
            this.setState({ imgProfile: result });
        });
    }

    componentDidMount() {
        // Set initail Focus
    }
    render() {
        const data = this.state;
        return (
            <div>
                <div className='grid text-md'>
                    {!data.isAdd && (
                        <InputDialog
                            value={data.employeeID}
                            name='employeeID'
                            type='number'
                            label='Emplyee ID'
                            disable
                            onChange={this.onChange.bind(this)}
                        />
                    )}
                    <InputDialog
                        value={data.name}
                        name='name'
                        type='text'
                        label='Name'
                        onChange={this.onChange.bind(this)}
                    />
                    <InputDialog
                        value={data.email}
                        name='email'
                        type='email'
                        label='Email'
                        onChange={this.onChange.bind(this)}
                    />
                     <DragAndDropImage
                        label='Cover photo'
                        loading={data.loading}
                        handleImageChange={this.uploadImage.bind(this)}
                        image={data.imgProfile}
                        imageStyle='w-[150px] h-[150px]'
                        name='imgProfile'
                        containerStyle='input-container-row'
                        labelStyle='e-control-wrapper'
                        onChange={this.onChange.bind(this)}
                        onDeleteImage={() => this.setState({ image: '' })}
                    />
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
                    <InputDialog
                        value={data.reportTo}
                        name='reportTo'
                        type='text'
                        label='Report To'
                        onChange={this.onChange.bind(this)}
                    />
                </div>
            </div>
        );
    }
}
