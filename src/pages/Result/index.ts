import { FailPage } from "./Fail"
import { SuccessPage } from "./Success"

export { FailPage, SuccessPage }

export default [
    {
        path: '/result/fail',
        element: FailPage
    },
    {
        path: '/result/success',
        element: SuccessPage
    },
]