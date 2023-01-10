import Service from '../api/userAction'

export const getLogin = async() => {
    try {
        const {data} = await Service.getLoginUser();
        return data;
    } catch (error) {
        return error
    }
    
}