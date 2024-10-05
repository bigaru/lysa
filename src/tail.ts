import { skip } from 'rxjs'

export function tail<T>() {
    return skip<T>(1)
}
