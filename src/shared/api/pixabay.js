import axios from 'axios';
// const { API_KEY } = process.env;

const instance = axios.create({
    baseURL: 'https://pixabay.com/api',
    params: {
        key: '28838942-7a8bee207b844890a62446b40',
        image_type: 'photo',
        orientation: 'horizontal',
        per_page: 12
    }
})

export const getImg = async (q, page = 1) => {
    const { data } = await instance.get('/?', {
        params: {
            q,
            page
        }
    });
    return data;
}