import React from 'react';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { InputDialog, DragAndDropImage, DeleteButton } from '../../components';
import { firebaseUploadImage } from '../firebase/firebaseUploadFile';
import { SampleBase } from '../../components/Base/SampleBase';
import { NavLink } from 'react-router-dom';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { formatDate } from '../../utils/helper/format';

export default class DialogFormTemplate extends SampleBase {
    constructor(props) {
        super(props);
        this.state = Object.assign({}, props);
        this.state.categories = [];
        this.state.images = props.image ?? [];
        this.state.stringImages = props?.image ? props.image.toString() : '';
        this.myRef = React.createRef();
    }

    onChange(args) {
        let key = args.target.name;
        let value = args.target.value;
        this.setState({ [key]: value });
    }

    onEditorChange(args) {
        this.setState({ details: args.value.toString() });
    }

    uploadImage(file) {
        firebaseUploadImage(file, 'product').then((result) => {
            if (this.state.images) {
                this.setState({ images: [...this.state.images, result] });
                this.setState({ stringImages: this.state.images.toString() });
            } else {
                this.setState({ images: [result] });
                this.stringImages = this.state.images.toString();
            }
        });
    }

    handleClearImage = (image) => {
        const newImages = this.state.images.filter((_image) => _image !== image);
        this.setState({ images: newImages });
        this.setState({ stringImages: newImages.toString() });
    };

    componentDidMount() {
        // Set initail Focus
        this.getCategories();
        console.log(this.myRef.current)
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
            <div className='control-pane' ref={this.myRef}>
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
                        image={''}
                        imageStyle='w-[150px] h-[150px]'
                        containerStyle='input-container-row'
                        labelStyle='e-control-wrapper'
                        onChange={this.onChange.bind(this)}
                        deleteButtonStyle='left-0'
                    />
                    <div>
                        <input type='text' name='image' hidden value={data.stringImages} onChange={()=>{}} />
                    </div>
                    <div className='input-container-row  flex-row flex-wrap '>
                        {data?.images?.map((image) => (
                            <div className='relative h-auto m-2 w-[150px]' key={image}>
                                <img src={image} className={`w-[150px] h-[150px]`} />
                                <DeleteButton className='left-0' onClick={() => this.handleClearImage(image)} />
                            </div>
                        ))}
                    </div>
                    <DatePickerComponent
                        id='goodsReceipts'
                        name='goodsReceipts'
                        value={formatDate(data.goodsReceipts)}
                        onChange={this.onChange.bind(this)}
                        placeholder='Goods Receipts'
                        floatLabelType='Always'
                        format='dd/MM/yyyy'
                    ></DatePickerComponent>
                    <DropDownListComponent
                        id='category'
                        name='category'
                        value={data.category}
                        onChange={this.onChange.bind(this)}
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
                    {data?.goodsID && (
                        <div className='mt-2'>
                            <NavLink
                                to={`/products/update/${data._id}`}
                                className={`flex flex-row w-full underline  underline-offset-auto items-center space-x-1
                              hover:text-blue-900 hover:font-medium`}
                            >
                                <span className=' '>More details</span>
                                <AiOutlineArrowRight className='mt-[1px]' />
                            </NavLink>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
