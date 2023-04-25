import axios from "axios";

export default axios.create({
    baseURL:"https://api.rawg.io/api",
    params:{
        key: 'f6a9dd9f38244310afed383aa5d148de'
    }
})