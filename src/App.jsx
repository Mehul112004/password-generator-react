/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numbers, setNumbers] = useState(false);
  const [char, setChar] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const copyPassword = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password]);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numbers) {
      str += "1234567890";
    }
    if (char) {
      str += "~!@#$%^&*()_-+=[]{}`";
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length) + 1;
      pass += str.charAt(char);
    }
    // console.log(pass);
    setPassword(pass);
  }, [length, numbers, char, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numbers, char, passwordGenerator]);
  return (
    <>
      <div
        className="
       w-full max-w-lg shadow-md mx-auto my-8 px-4 rounded-lg text-orange-500 bg-gray-600 text-center md:flex-col p-4"
      >
        <h1 className="text-white text-center mb-2 text-3xl">
          Password Generator
        </h1>
        <div className="max-w-lg flex shadow rounded-lg overflow-hidden mb-4 py-4  mx-auto">
          <input
            type="text"
            value={password}
            className="outline-none rounded-md rounded-r-none bg-white w-full py-1 px-3 text-xl font-mono overflow-scroll"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
          <button
            className="text-blue-400 rounded-l-none h-full"
            onClick={copyPassword}
          >
            Copy
          </button>
        </div>
        <div className="flex gap-4 text-white w-full flex-col md:flex-row">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              id="length"
              min={8}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label htmlFor="length">Length : {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              id="numberChecked"
              defaultChecked={numbers}
              onChange={() => {
                setNumbers((prev) => !prev);
              }}
            />
            <label htmlFor="numberChecked">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              id="charactersChecked"
              defaultChecked={char}
              onChange={() => {
                setChar((prev) => !prev);
              }}
            />
            <label htmlFor="charactersChecked">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
