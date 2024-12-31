import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface PasswordStrengthProps {
  password: string;
  onPasswordChange: (password: string) => void;
}

export const PasswordStrength: React.FC<PasswordStrengthProps> = ({ password, onPasswordChange }) => {
  const checkPasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, color: 'bg-gray-200' };
    
    let score = 0;
    if (pass.length >= 8) score += 1;
    if (pass.match(/[A-Z]/)) score += 1;
    if (pass.match(/[0-9]/)) score += 1;
    if (pass.match(/[^A-Za-z0-9]/)) score += 1;
    
    const colors = {
      0: 'bg-gray-200',
      1: 'bg-red-500',
      2: 'bg-orange-500',
      3: 'bg-yellow-500',
      4: 'bg-green-500'
    };
    
    return { score, color: colors[score as keyof typeof colors] };
  };

  const strength = checkPasswordStrength(password);

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
        <ShieldCheck className="w-6 h-6" /> Check Strength
      </h2>
      <input
        type="text"
        value={password}
        onChange={(e) => onPasswordChange(e.target.value)}
        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-base mb-4"
        placeholder="Enter a password to check its strength"
      />
      <div className="mt-2 h-3 rounded-full bg-gray-200">
        <div
          className={`h-full rounded-full ${strength.color} transition-all duration-300`}
          style={{ width: `${(strength.score / 4) * 100}%` }}
        ></div>
      </div>
      <p className="mt-3 text-base text-gray-600">
        Strength: {['Weak', 'Fair', 'Good', 'Strong', 'Very Strong'][strength.score]}
      </p>
    </div>
  );
};