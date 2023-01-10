import axios, {AxiosInstance} from 'axios';

export default abstract class ServiceBase {
    protected readonly client: AxiosInstance;

    constructor(endpoint: string){
        this.client = axios.create({
            baseURL: process.env.REACT_APP_URL_BASE + endpoint,
        })
    }
}