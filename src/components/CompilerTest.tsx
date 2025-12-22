import { useState } from "react"
import CounterButton from "./CounterButton";
import { TestComponent } from "./TestComponent";

export const CompilerTest = () => {
    const [count, setCount] = useState(0);
    const handleStateUpdate = () => {
        setCount(1)
    };
    return (
        <div>
            <p>{count}</p>
            <CounterButton handleStateUpdate={handleStateUpdate} />
            <TestComponent count={count} />
        </div>
    )
}
