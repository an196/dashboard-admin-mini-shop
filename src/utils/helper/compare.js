export const compareBanner = (oldBanner, newBanner) => {
    if (
        oldBanner.image === newBanner.image &&
        oldBanner.buttonText === newBanner.buttonText &&
        oldBanner.desc === newBanner.desc &&
        oldBanner.smallText === newBanner.smallText &&
        oldBanner.middleText === newBanner.middleText &&
        oldBanner.largeText1 === newBanner.largeText1 &&
        oldBanner.largeText2 === newBanner.largeText2 &&
        oldBanner.discount === newBanner.discount &&
        oldBanner.saleTime === newBanner.saleTime &&
        oldBanner.updateAt === newBanner.updateAt
    )return true;

    return false;
};