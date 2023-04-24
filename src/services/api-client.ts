import axios from "axios";

export default axios.create({
    baseURL:"https://api.rawg.io/api",
    params:{
        key: '4b559275b7f6476c88b551a1f249f157'
    }
})