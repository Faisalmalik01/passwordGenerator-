import { useState, useCallback, useEffect, useRef } from 'react';

function App() {
  const [length, setLength] = useState(12);
  const [numberAllowed, setNumberAllowed] = useState(true);
  const [charAllowed, setCharAllowed] = useState(true);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null); // Create ref

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    for (let i = 0; i < length; i++) {
      const char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  const copyPasswordToClipboard = () => {
    if (passwordRef.current) {
      passwordRef.current.select();        //  Select text inside input
      passwordRef.current.setSelectionRange(0, 999); // For mobile support
      navigator.clipboard.writeText(passwordRef.current.value);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 p-6">
      
      <div className="w-full max-w-4xl bg-white shadow-2xl rounded-2xl flex flex-col md:flex-row overflow-hidden min-h-[70vh]">

        {/* Left Side */}
        <div className="flex-1 flex flex-col justify-center items-center p-8 bg-gradient-to-b from-indigo-500 via-indigo-600 to-indigo-700 text-white">
          <h1 className="text-4xl font-bold mb-6 text-center">Secure Passwords</h1>
          <p className="text-center text-base opacity-90">Strong. Random. Instant. Tailored for you.</p>
        </div>

        {/* Right Side */}
        <div className="flex-1 flex flex-col p-8 gap-8 justify-center">

          <div className="flex bg-gray-100 rounded-xl overflow-hidden">
            <input 
              type="text"
              value={password}
              ref={passwordRef} // 👈 Connect the ref here
              className="flex-1 bg-transparent text-gray-700 text-lg px-4 py-3 outline-none font-mono tracking-wider"
              readOnly
            />
            <button 
              onClick={copyPasswordToClipboard}
              className="px-6 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold transition-all text-sm"
            >
              Copy
            </button>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between text-gray-600 text-sm">
              <label>Password Length</label>
              <span className="font-semibold text-gray-800">{length}</span>
            </div>
            <input 
              type="range"
              min="6"
              max="64"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="accent-indigo-500 w-full"
            />

            <div className="flex flex-col gap-4 mt-4 text-sm text-gray-600">
              <label className="flex justify-between items-center">
                <span>Include Numbers</span>
                <input 
                  type="checkbox"
                  checked={numberAllowed}
                  onChange={() => setNumberAllowed(prev => !prev)}
                  className="w-5 h-5 accent-indigo-500"
                />
              </label>
              <label className="flex justify-between items-center">
                <span>Include Symbols</span>
                <input 
                  type="checkbox"
                  checked={charAllowed}
                  onChange={() => setCharAllowed(prev => !prev)}
                  className="w-5 h-5 accent-indigo-500"
                />
              </label>
            </div>

            <button
              onClick={passwordGenerator}
              className="w-full mt-6 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-semibold text-lg transition-all"
            >
              Generate New Password
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}

export default App;
