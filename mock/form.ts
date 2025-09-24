export default [
    {
        url: '/api/basicForm',
        method: 'post',
        response: () => {
            return {
                code: 200,
                data: {
                    message: 'Ok'
                }
            }
        },
        timeout: 1000
    },
    {
        url: '/api/stepForm',
        method: 'post',
        response: () => {
            return {
                code: 200,
                data: {
                    message: 'Ok'
                }
            }
        },
        timeout: 1000
    }
]