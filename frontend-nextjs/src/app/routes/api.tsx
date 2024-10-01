const API_ENDPOINTS = {
    IsEmailExist: `${process.env.NEXT_PUBLIC_DEFAULT_ENDPOINT}/user/isEmailExist/`,
    Register: `${process.env.NEXT_PUBLIC_DEFAULT_ENDPOINT}/user/register`,
    LoginAuth: `${process.env.NEXT_PUBLIC_DEFAULT_ENDPOINT}/user/loginAuth`,
    GetDataById: `${process.env.NEXT_PUBLIC_DEFAULT_ENDPOINT}/user/getDataById/`,
    CreatePackage: `${process.env.NEXT_PUBLIC_DEFAULT_ENDPOINT}/packages/createPackage`,
    GetAllPackages: `${process.env.NEXT_PUBLIC_DEFAULT_ENDPOINT}/packages`,
}

export default API_ENDPOINTS;