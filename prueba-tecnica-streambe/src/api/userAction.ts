// import HttpClient from './HttpClient';
// import IResponse from './types/response';
import ServiceBase from './ServiceBase';
import Response from './types/response';

// export const getLogin = () => {
//     return new Promise((resolve, eject) => {
//         HttpClient.get('/login').then(response => {
//             resolve(response);
//         })
//     })
// }

class DataUserService extends ServiceBase {
    constructor(){
        super('/06c67c77-18c4-45');
    }



    getLoginUser = () => {
        let path: string = '/login';
        return this.client.get<Response>(path)
    }
    
    
    getUsers = (token, tokenType) => {
        let path: string = '/users';
        const config = {
            headers: {
                'Authorization': `${tokenType} ${token}`,
            }
        };
        return this.client.get<Response>(path, config)
    } 

}

const instance = new DataUserService();

export default instance;