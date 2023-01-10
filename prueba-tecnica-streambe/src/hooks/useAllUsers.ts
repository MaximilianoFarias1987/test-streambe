import Service from '../api/userAction'

export const getUsers = async() => {
    try {
        const {data} = await Service.getUsers();
        console.log(data);
        
        return data;
    } catch (error) {
        return error
    }
    
}