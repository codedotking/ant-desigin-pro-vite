import { request } from '@/utils';

const api = {
    tags: '/api/tags',  
}

export const tags = async () => {
    const result = await request.get(api.tags);
    return result;
}


