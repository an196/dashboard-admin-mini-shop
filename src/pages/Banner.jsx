import React from 'react'
import {useGetBannerQuery} from '../features/banner/bannerApiSlice';
function Banner() {
    const { data, isSuccess} = useGetBannerQuery();
    
    let banner;
    if(isSuccess){
        banner = [...data];
        console.log(banner);
    }

  return (
    <div>Banner</div>
  )
}

export default Banner