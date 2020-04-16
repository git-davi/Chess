import axios from 'axios';
import TOKEN_KEY from '../token';


export default function axiosAuthWrapper({method, url, params=undefined, data=undefined, setAuth}) {
    return axios({
        method: method,
        url: url,
        params: params,
        data: data,
        headers : { 'Authorization' : 'Bearer ' + localStorage.getItem(TOKEN_KEY) } 
    })
    .catch((err) => {
        if (err.response.status === 401)
            setAuth(false);
        else 
            throw err;
    });
}