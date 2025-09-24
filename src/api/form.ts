import { request } from '@/utils';
const api = {
    submitBasicForm: '/api/basicForm',
}
export const submitBasicForm = async (data: unknown) => {
    const result = await request.post(api.submitBasicForm, data);
    return result;
}


