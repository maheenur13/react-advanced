import type { FC } from "react";


export const TestComponent: FC<{ count: number }> = ({ count }) => {
    console.log('TestComponent');

    return (
        <div>TestComponent -{count}</div>
    )
}
