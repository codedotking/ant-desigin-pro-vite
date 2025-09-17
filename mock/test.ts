export default [
    {
        url: '/api/test',
        method: 'get',
        response: () => {
            return {
                success: true,
                data: {
                    message: 'Mock is working!'
                }
            };
        }
    },
    {
        url: '/api/users',
        method: 'post',
        response: () => {
            return {
                success: true,
                data: {
                    message: 'Mock is working!'
                }
            };
        }
    }
]
