function UnitInput({ name, register, errors, message, required }) {
    return (
        <div className='input-container-row'>
            <label className='input-lable'>
                Price
            </label>
            <label>
                <div className='mt-1 relative outline-none'>
                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                        <span className='text-gray-500 sm:text-sm'> $ </span>
                    </div>
                    <input
                        type='number'
                        name={name}
                        id='price'
                        className=' block w-full pl-7 pr-24 sm:text-sm  py-2 border-b-1 border-gray-400 focus:border-black focus:text-black text-sm text-gray-600 
                    placeholder-gray-400 outline-none'
                        placeholder='0.00'
                        min={0}
                        {...register(`${name}`, { required: required })}
                    />
                    <div className='absolute inset-y-0 right-0 flex items-center'>
                        <label for='currency' className='sr-only'>
                            Currency
                        </label>
                        <select
                            id='currency'
                            name='currency'
                            className='h-full py-0 pl-2 pr-7 border-transparent bg-transparent outline-none text-gray-500 sm:text-sm'
                        >
                            <option>USD</option>
                            <option>CAD</option>
                            <option>EUR</option>
                        </select>
                    </div>
                </div>
                {errors[name] && <p className='input-lable-warning'>{`${message}`}</p>}
            </label>
        </div>
    );
}

export default UnitInput;
