// import { useEffect, useState } from "react"

// export const Counter = () => {
//     const [count, setCount] = useState(0);
//     useEffect(() => {
//         console.log('like did mount');
//     }, [])
//     useEffect(() => {
//         console.log('like did mount + like did update count');
//     }, [count])
//     useEffect(() => {
//         return () => {
//             console.log('like will unmount');
//         }
//     }, )



//     return (
//         <div>
//             <span>{count}</span>
//             <button onClick={() => setCount((prev) => prev + 1)}>CLICK</button>
//         </div>
//     )
// } 
// import React from "react";

// export class Counter extends React.Component {
//     state = {
//         count: 0
//     }


//     updateCount = () => {
//         // this.state.count.number += 1
//         this.setState((prevState) => ({
//             count: prevState.count + 1
//         }));
//         // const newCount = [...this.state.count, 1]
//         // this.setState({
//         //     count: newCount
//         // })
//     }


//     render() {
//         return (
//         <div>
//             <span>{this.state.count}</span>
//             <button onClick={this.updateCount}>CLICK</button>
//         </div>
//         )
//     }
// }
