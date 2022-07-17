import React from 'react';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { InputDialog, DragAndDropImage } from '../../components';
import { firebaseUploadImage } from '../firebase/firebaseUploadFile';
import { SampleBase } from '../../components/Base/SampleBase';

export default class DialogFormTemplate extends SampleBase {
    constructor(props) {
        super(props);
        this.state = Object.assign({}, props);
        this.state.categories = [];
    }

    onChange(args) {
        let key = args.target.name;
        let value = args.target.value;
        this.setState({ [key]: value });
    }

    uploadImage(file) {
        firebaseUploadImage(file).then((result) => {
            if (this.state.image) {
                this.setState({ image: [result] });
            } else {
                this.setState({ image: [result] });
            }
        });
    }

    componentDidMount() {
        // Set initail Focus
        this.getCategories();
    }

    async getCategories() {
        const result = await Promise.all([
            fetch(process.env.REACT_APP_BASE_URL.toString() + '/categories').then((data) => data.json()),
        ]);
        this.setState({ categories: result[0] });
    }

    render() {
        const data = this.state;
        return (
            <div>
                <div className='grid text-md'>
                    {!data.isAdd && (
                        <InputDialog
                            value={data.goodsID}
                            name='goodsID'
                            type='number'
                            label='GoodsID'
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
                        value={data.price}
                        name='price'
                        type='text'
                        label='Price'
                        onChange={this.onChange.bind(this)}
                    />
                    <DragAndDropImage
                        label='Cover photo'
                        loading={data.loading}
                        handleImageChange={this.uploadImage.bind(this)}
                        image={data.image}
                        imageStyle='w-[150px] h-[150px]'
                        name='image'
                        containerStyle='input-container-row'
                        labelStyle='e-control-wrapper'
                        onChange={this.onChange.bind(this)}
                        onDeleteImage={() => this.setState({ image: '' })}
                    />
                    <DatePickerComponent
                        id='goodsReceipts'
                        name='goodsReceipts'
                        value={data.goodsReceipts}
                        placeholder='Goods Receipts'
                        floatLabelType='Always'
                        format='dd/MM/yyyy'
                    ></DatePickerComponent>
                    <DropDownListComponent
                        id='category'
                        name='category'
                        value={data.category}
                        dataSource={data.categories}
                        fields={{ text: 'name', value: 'code' }}
                        placeholder='Category'
                        popupHeight='300px'
                        floatLabelType='Always'
                    ></DropDownListComponent>
                    <InputDialog
                        value={data.amount}
                        name='amount'
                        type='text'
                        label='Amount'
                        onChange={this.onChange.bind(this)}
                    />
                    <InputDialog
                        value={data.details}
                        name='details'
                        type='text'
                        label='Details'
                        onChange={this.onChange.bind(this)}
                    />
                </div>
            </div>
        );
    }
}
