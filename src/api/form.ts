import { request } from '@/utils';
const api = {
    basicForm: '/api/basicForm',
    stepForm: '/api/stepForm',
}
export const submitBasicForm = async (data: unknown) => {
    const result = await request.post(api.basicForm, data);
    return result;
}

export const submitStepForm = async (data: unknown) => {
    const result = await request.post(api.stepForm, data);
    return result;
}

