import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { topla, cikar } from "./counterSlice";

const Counter = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <button onClick={() => dispatch(topla())}>Topla</button>
        <span>
          {count}
        </span>
        <button onClick={() => dispatch(cikar())}>Cikar</button>
      </div>
    </div>
  )
};

export default Counter;
