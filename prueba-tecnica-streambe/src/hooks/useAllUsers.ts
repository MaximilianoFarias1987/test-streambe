import Service from '../api/userAction'

export const getUsers = async(token: string, tokenType: string) => {
    try {
        const {data} = await Service.getUsers(token, tokenType);
        console.log(data);
        
        return data;
    } catch (error) {
        return error
    }
    
}