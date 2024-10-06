const API_ENDPOINTS = {
    // Existing User endpoints
    IsEmailExist: `${process.env.NEXT_PUBLIC_DEFAULT_ENDPOINT}/user/isEmailExist/`,
    Register: `${process.env.NEXT_PUBLIC_DEFAULT_ENDPOINT}/user/register`,
    LoginAuth: `${process.env.NEXT_PUBLIC_DEFAULT_ENDPOINT}/user/loginAuth`,
    GetAllUsers: `${process.env.NEXT_PUBLIC_DEFAULT_ENDPOINT}/user/getAllUsers`,
    GetDataById: `${process.env.NEXT_PUBLIC_DEFAULT_ENDPOINT}/user/getDataById/`,
    
    // Package related endpoints
    CreatePackage: `${process.env.NEXT_PUBLIC_DEFAULT_ENDPOINT}/packages/createPackage`,
    GetAllPackages: `${process.env.NEXT_PUBLIC_DEFAULT_ENDPOINT}/packages`,
    BuyPackage: `${process.env.NEXT_PUBLIC_DEFAULT_ENDPOINT}/packages/buy`,
    
    // Updated Deposit and Withdraw endpoints
    CreateDepositRequest: `${process.env.NEXT_PUBLIC_DEFAULT_ENDPOINT}/depodraw`,
    CreateWithdrawRequest: `${process.env.NEXT_PUBLIC_DEFAULT_ENDPOINT}/depodraw`,
    GetAllDepositRequests: `${process.env.NEXT_PUBLIC_DEFAULT_ENDPOINT}/depodraw/deposits`,
    GetAllWithdrawRequests: `${process.env.NEXT_PUBLIC_DEFAULT_ENDPOINT}/depodraw/withdrawals/`,
    UpdateRequestStatus: `${process.env.NEXT_PUBLIC_DEFAULT_ENDPOINT}/depodraw/status/`,

    // Activity related endpoints
    CreateActivity: `${process.env.NEXT_PUBLIC_DEFAULT_ENDPOINT}/activity/createActivity`,
    GetActivatedPackagesByUserId: `${process.env.NEXT_PUBLIC_DEFAULT_ENDPOINT}/activity/getActivatedPackagesByUserId/`,
    UpdateRemainWatchTimesAndBalance: `${process.env.NEXT_PUBLIC_DEFAULT_ENDPOINT}/activity/updateRWTandBalance/`,
    

    // Update Profile endpoints
    ChangePassword: `${process.env.NEXT_PUBLIC_DEFAULT_ENDPOINT}/user/changePassword/`,
    
    // Previous deposit endpoints (keeping for backward compatibility if needed)
    PostDepodrawRequest: `${process.env.NEXT_PUBLIC_DEFAULT_ENDPOINT}/depodraw/depo`,
    GetAllDepositRequest: `${process.env.NEXT_PUBLIC_DEFAULT_ENDPOINT}/depodraw/getAllDepoReq`,
    PatchDepoStatus: `${process.env.NEXT_PUBLIC_DEFAULT_ENDPOINT}/depodraw/updateStatus/`,
    PatchUserBalance: `${process.env.NEXT_PUBLIC_DEFAULT_ENDPOINT}/user/updateDepoBalance/`,
    
    // Ad related endpoints
    UploadAd: `${process.env.NEXT_PUBLIC_DEFAULT_ENDPOINT}/ads/upload`,
    GetAdsVideos: `${process.env.NEXT_PUBLIC_DEFAULT_ENDPOINT}/ads`,
    GetAdById: `${process.env.NEXT_PUBLIC_DEFAULT_ENDPOINT}/ads/:id`,
    DeleteAd: `${process.env.NEXT_PUBLIC_DEFAULT_ENDPOINT}/ads/:id`,
}

export default API_ENDPOINTS;