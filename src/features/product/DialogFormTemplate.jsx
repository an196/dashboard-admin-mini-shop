import React from 'react';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { FileUploader } from 'react-drag-drop-files';
import { Spinner } from '../../components';
import { MdDelete } from 'react-icons/md';
import { firebaseUploadImage } from '../firebase/firebaseUploadFile';
import { UploadElement } from '../../components';
import axios from 'axios';

const fileTypes = ['JPG', 'PNG', 'GIF'];

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
            if(this.state.image){
                this.setState({ image:  [result]});
            }else{
                this.setState({ image:  [result]});
            }
        });
    }

    componentDidMount() {
        // Set initail Focus
        this.name.focus();
        this.getCategories();
    }

    async getCategories(){
        const result = await Promise.all([fetch(process.env.REACT_APP_BASE_URL.toString()+ '/categories').then((data)=> data.json())]) 
        this.setState({categories: result[0]})
    }
    render() {
        const data = this.state;
        return (
            <div>
                <div className='grid text-md'>
                    {!data.isAdd && (
                        <div className='e-float-input e-control-wrapper'>
                            <input id='goodsID' name='goodsID' type='number' disabled={true} value={data.goodsID} />
                            <span className='e-float-line'></span>
                            <label className='e-float-text e-label-top font-bold'>goodsID</label>
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
                        <label className='e-float-text e-label-top'>Name</label>
                    </div>

                    <div className='e-float-input e-control-wrapper'>
                        <input
                            ref={(input) => (this.price = input)}
                            value={data.price}
                            id='price'
                            name='price'
                            type='number'
                            min={0}
                            onChange={this.onChange.bind(this)}
                        />
                        <span className='e-float-line'></span>
                        <label className='e-float-text e-label-top'>Price</label>
                    </div>
                    <div className='input-container-row'>
                        <label className='e-control-wrapper'>Cover photo</label>
                        {data.loading && <Spinner message='Uploading image!' customeStyle='mt-3' />}
                        {!data.image ? (
                            !data.loading && (
                                <FileUploader
                                    handleChange={this.uploadImage.bind(this)}
                                    children={<UploadElement />}
                                    types={fileTypes}
                                />
                            )
                        ) : (
                            <div className='relative h-full m-2'>
                                <img src={data?.image} className='w-[150px] h-[150px]' />
                                <input
                                    type='text'
                                    className='hidden'
                                    ref={(input) => (this.image = input)}
                                    value={data.image}
                                    id='image'
                                    name='image'
                                    onChange={this.onChange.bind(this)}
                                />
                                <button
                                    type='button'
                                    className='absolute bottom-2 right-0 p-1 rounded-full bg-white text-xl cursor-pointer outline-none 
                                    hover:shadow-md transition-all duration-500 ease-in-out hover:bg-black/40'
                                    onClick={() => this.setState({ image: '' })}
                                >
                                    <MdDelete />
                                </button>
                            </div>
                        )}
                    </div>
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
                    <div className='e-float-input e-control-wrapper'>
                        <input
                            ref={(input) => (this.amount = input)}
                            value={data.amount}
                            id='amount'
                            name='amount'
                            type='number'
                            min={0}
                            onChange={this.onChange.bind(this)}
                        />
                        <span className='e-float-line'></span>
                        <label className='e-float-text e-label-top'>Amount</label>
                    </div>
                    <div className='e-float-input e-control-wrapper'>
                        <textarea
                            ref={(input) => (this.details = input)}
                            value={data.details}
                            id='details'
                            name='details'
                            type='textarea'
                            onChange={this.onChange.bind(this)}
                        />
                        <span className='e-float-line'></span>
                        <label className='e-float-text e-label-top'>Details</label>
                    </div>
                </div>
            </div>
        );
    }
}
