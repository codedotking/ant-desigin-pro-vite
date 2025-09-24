import { request } from '@/utils';




// {
//     url: '/api/project/notice',
//     method: 'get',
//     response: () => {
//         return getNotice();
//     },
//     timeout: 1000
// },
// {
//     url: '/api/activities',
//     method: 'get',
//     response: () => {
//         return getActivities();
//     },
//     timeout: 1000
// },
// {
//     url: '/api/fake_workplace_chart_data',
//     method: 'get',
//     response: () => {
//         return getChartData();
//     },
//     timeout: 1000
// }
const api = {
    projectNotice: '/api/project/notice',
    activities: '/api/activities',
    fakeChartData: '/api/fake_workplace_chart_data',
}
export const getProjectNotice = async () => {
    const result = await request.get(api.projectNotice);
    return result;
}
export const getActivities = async () => {
    const result = await request.get(api.activities);
    return result;
}
export const getFakeChartData = async () => {
    const result = await request.get(api.fakeChartData);
    return result;
}


