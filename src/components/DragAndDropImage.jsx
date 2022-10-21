import React from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { Spinner, UploadElement, InputDialog, DeleteButton } from '../components';
import { TYPE_FILE } from '../utils/constants/file.contants';

function DragAndDropImage({
    loading,
    image,
    handleImageChange,
    onChange,
    onDeleteImage,
    label,
    name,
    sectionStyle,
    imageStyle,
    deleteButtonStyle,
    containerStyle,
    labelStyle,
}) {
    return (
        <div className={`${containerStyle}`}>
            <label className={`${labelStyle}`}>{label}</label>
            {loading && <Spinner message='Uploading image!' customeStyle='mt-3' />}
            {!image ? (
                !loading && (
                    <FileUploader
                        handleChange={handleImageChange}
                        children={<UploadElement style={sectionStyle} />}
                        types={TYPE_FILE}
                    />
                )
            ) : (
                <div className='relative h-full m-2 w-[150px]'>
                    <img src={image} className={`${imageStyle}`}  alt={image} />
                    <InputDialog value={image} name={name} type='text' hidden onChange={onChange} />
                    <DeleteButton onClick={onDeleteImage} className={`${deleteButtonStyle}`} />
                </div>
            )}
        </div>
    );
}

export default DragAndDropImage;
