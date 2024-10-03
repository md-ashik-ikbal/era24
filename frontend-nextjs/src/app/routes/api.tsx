const API_ENDPOINTS = {
    IsEmailExist: `${process.env.NEXT_PUBLIC_DEFAULT_ENDPOINT}/user/isEmailExist/`,
    Register: `${process.env.NEXT_PUBLIC_DEFAULT_ENDPOINT}/user/register`,
    LoginAuth: `${process.env.NEXT_PUBLIC_DEFAULT_ENDPOINT}/user/loginAuth`,
    GetAllUsers: `${process.env.NEXT_PUBLIC_DEFAULT_ENDPOINT}/user/getAllUsers`,
    GetDataById: `${process.env.NEXT_PUBLIC_DEFAULT_ENDPOINT}/user/getDataById/`,
    CreatePackage: `${process.env.NEXT_PUBLIC_DEFAULT_ENDPOINT}/packages/createPackage`,
    GetAllPackages: `${process.env.NEXT_PUBLIC_DEFAULT_ENDPOINT}/packages`,
    BuyPackage: `${process.env.NEXT_PUBLIC_DEFAULT_ENDPOINT}/packages/buy`,
    PostDepositeRequest: `${process.env.NEXT_PUBLIC_DEFAULT_ENDPOINT}/depodraw/depo`,
    
}

export default API_ENDPOINTS;