import { type FC } from "react"

type PropsType = {
    handleStateUpdate: () => void
}

const CounterButton: FC<PropsType> = ({ handleStateUpdate }) => {
    console.log('CounterButton');

    return (
        <div>
            <button onClick={handleStateUpdate}>count increase + </button>
        </div>
    )
}
export default CounterButton