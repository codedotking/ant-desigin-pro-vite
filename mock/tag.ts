import mockjs from "mockjs";

export default [
    {
        url: '/api/tags',
        method: 'get',
        response: () => {
            return {
                success: true,
                data: mockjs.mock({
                    'list|100': [{ name: '@city', 'value|1-100': 150, 'type|0-2': 1 }],
                })
            };
        },
        timeout: 5000
    },
]
