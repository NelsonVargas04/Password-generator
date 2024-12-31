import  { useState } from 'react';
import { Lock, Shuffle, Key, Hash, BookOpen } from 'lucide-react';
import { PasswordStrength } from './components/PasswordStrength';
import { GeneratedPassword } from './components/GeneratedPassword';
import { generatePassword, PasswordMode } from './utils/passwordGenerator';

function App() {
  const [password, setPassword] = useState('');
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [length, setLength] = useState(12);
  const [mode, setMode] = useState<PasswordMode>('random');

  const handleGeneratePassword = () => {
    setGeneratedPassword(generatePassword(mode, length));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-2xl">
        <div className="flex items-center gap-3 mb-8">
          <Lock className="w-8 h-8 text-purple-600" />
          <h1 className="text-3xl font-bold text-gray-800">Password Assistant</h1>
        </div>

        <PasswordStrength 
          password={password} 
          onPasswordChange={setPassword}
        />

        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-6 flex items-center gap-2">
            <Key className="w-6 h-6" /> Generate Password
          </h2>
          
          <div className="flex gap-3 mb-6">
            <button
              onClick={() => setMode('random')}
              className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center gap-2 text-base transition-colors ${
                mode === 'random' ? 'bg-purple-600 text-white' : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <Shuffle className="w-5 h-5" /> Random
            </button>
            <button
              onClick={() => setMode('memorable')}
              className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center gap-2 text-base transition-colors ${
                mode === 'memorable' ? 'bg-purple-600 text-white' : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <BookOpen className="w-5 h-5" /> Memorable
            </button>
            <button
              onClick={() => setMode('pin')}
              className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center gap-2 text-base transition-colors ${
                mode === 'pin' ? 'bg-purple-600 text-white' : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <Hash className="w-5 h-5" /> PIN
            </button>
          </div>

          {mode !== 'memorable' && (
            <div className="mb-6">
              <label className="block text-base text-gray-600 mb-3">Length: {length}</label>
              <input
                type="range"
                min={mode === 'pin' ? 4 : 8}
                max={mode === 'pin' ? 8 : 32}
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          )}

          <button
            onClick={handleGeneratePassword}
            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors mb-6 text-base font-semibold"
          >
            Generate Password
          </button>

          <GeneratedPassword password={generatedPassword} />
        </div>
      </div>
    </div>
  );
}

export default App;