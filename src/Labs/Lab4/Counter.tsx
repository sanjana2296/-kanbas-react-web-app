import React, { useState } from "react";
export default function Counter() {
  let count = 7;
  console.log(count);
  return (
    <div id="wd-counter-use-state">
      <h2>Counter: {count}</h2>
      <button
      className ="btn btn-success mx-2"
        onClick={() => { count++; console.log(count); }}
        id="wd-counter-up-click">
        Up
      </button>
      <button
      className ="btn btn-danger mx-2"
        onClick={() => { count--; console.log(count); }}
        id="wd-counter-down-click">
        Down
      </button>
      <hr/>
    </div>
  );
}
