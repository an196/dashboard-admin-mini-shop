import toast from 'react-hot-toast';
import { Header } from '../components';
import { useGetBannerQuery, useUpdateBannerMutation, useCreateBannerMutation } from '../features/banner/bannerApiSlice';
import FormBanner from '../features/banner/FormBanner';
import { compareBanner } from '../utils/helper/compare';

function Banner() {
    const { data, isSuccess, isLoading, isError, error } = useGetBannerQuery();
    const [updateBanner] = useUpdateBannerMutation();
    const [createBanner] = useCreateBannerMutation();

    let banner;
    if (isSuccess) {
        banner = { ...data[0] };
    }

    function onUpdate(props) {

        console.log(banner);
        console.log(props);
        if (banner?.item) {
            if (compareBanner(props, banner)) {
                toast((t) => <span>Oop! 🤨 Nothing changes</span>);
            } else {
                updateBanner(props)
                    .then(() => toast.success('Banner update successful'))
                    .catch(() => toast.error('Banner update failed'));
            }
        } else {
            createBanner(props)
                .then(() => toast.success('Banner create successful'))
                .catch(() => toast.error('Banner create failed'));
        }
    }

    return (
        <div className='mt-16 p-0 md:m-10  md:p-10 bg-white rounded-3xl'>
            <div className='flex justify-between items-center p-2 md:p-0'>
                <Header category='Page' title='Banner' />
            </div>
            <div className='flex w-full'>
                <div className='md:p-10 p-2 border-1 w-full xl:w-[50%]'>
                    {isSuccess && <FormBanner banner={banner} onUpdate={onUpdate} />}
                </div>
            </div>
        </div>
    );
}

export default Banner;
