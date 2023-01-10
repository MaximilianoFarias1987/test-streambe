import axios, {AxiosInstance} from 'axios';

export default abstract class ServiceBase {
    protected readonly client: AxiosInstance;

    constructor(endpoint: string){
        this.client = axios.create({
            baseURL: 'https://www.mockachino.com' + endpoint,
        })
    }
}