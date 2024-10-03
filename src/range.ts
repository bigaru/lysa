import { generate } from 'rxjs'
import { Stream } from './stream.js'

function range(stop: number): Stream<number>
function range(start: number, stop: number, step?: number): Stream<number>
function range(startOrStop: number, stop?: number, step?: number): Stream<number> {
    const initialState = stop ? startOrStop : 0
    const updateStop = stop ? stop : startOrStop
    const updatedStep = step ?? 1

    return new Stream<number>(() =>
        generate({
            initialState,
            condition: (i) => i < updateStop,
            iterate: (i) => i + updatedStep,
        })
    )
}

export { range }
