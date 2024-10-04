const API_ENDPOINTS = {
    IsEmailExist: `${process.env.NEXT_PUBLIC_DEFAULT_ENDPOINT}/user/isEmailExist/`,
    Register: `${process.env.NEXT_PUBLIC_DEFAULT_ENDPOINT}/user/register`,
    LoginAuth: `${process.env.NEXT_PUBLIC_DEFAULT_ENDPOINT}/user/loginAuth`,
    GetAllUsers: `${process.env.NEXT_PUBLIC_DEFAULT_ENDPOINT}/user/getAllUsers`,
    GetDataById: `${process.env.NEXT_PUBLIC_DEFAULT_ENDPOINT}/user/getDataById/`,
    CreatePackage: `${process.env.NEXT_PUBLIC_DEFAULT_ENDPOINT}/packages/createPackage`,
    GetAllPackages: `${process.env.NEXT_PUBLIC_DEFAULT_ENDPOINT}/packages`,
    BuyPackage: `${process.env.NEXT_PUBLIC_DEFAULT_ENDPOINT}/packages/buy`,
    PostDepodrawRequest: `${process.env.NEXT_PUBLIC_DEFAULT_ENDPOINT}/depodraw/depo`,
    GetAlDepositRequest: `${process.env.NEXT_PUBLIC_DEFAULT_ENDPOINT}/depodraw/getAllDepoReq`,
    UploadAd: `${process.env.NEXT_PUBLIC_DEFAULT_ENDPOINT}/ads/upload`,
    GetAdsVideos: `${process.env.NEXT_PUBLIC_DEFAULT_ENDPOINT}/ads`,
    GetAdById: `${process.env.NEXT_PUBLIC_DEFAULT_ENDPOINT}/ads/:id`,
    DeleteAd: `${process.env.NEXT_PUBLIC_DEFAULT_ENDPOINT}/ads/:id`,
    PatchDepoStatus: `${process.env.NEXT_PUBLIC_DEFAULT_ENDPOINT}/depodraw/updateStatus/`,
    PatchUserBalance: `${process.env.NEXT_PUBLIC_DEFAULT_ENDPOINT}/user/updateDepoBalance/`,
}

export default API_ENDPOINTS;