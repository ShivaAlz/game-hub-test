import axios from "axios";

export default axios.create({
    baseURL:"https://api.rawg.io/api",
    params:{
        key: '612927b43abe401797f051715200f81f'
    }
})