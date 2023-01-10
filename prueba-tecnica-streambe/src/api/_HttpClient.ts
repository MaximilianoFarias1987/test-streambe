import axios from 'axios';
import IResponse from './types/response';
// console.log(process.env.REACT_APP_URL_BASE);

// axios.defaults.baseURL = process.env.REACT_APP_URL_BASE
axios.defaults.baseURL = 'https://www.mockachino.com/06c67c77-18c4-45'

const requestGenerico = {
    get: (url: string) => axios.get<IResponse>(url),
}

export default requestGenerico;