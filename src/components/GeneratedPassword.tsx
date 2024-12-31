import React from 'react';
import { Copy, Check } from 'lucide-react';

interface GeneratedPasswordProps {
  password: string;
}

export const GeneratedPassword: React.FC<GeneratedPasswordProps> = ({ password }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!password) return null;

  return (
    <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-between gap-4">
      <p className="font-mono text-xl text-center flex-1">{password}</p>
      <button
        onClick={handleCopy}
        className="p-2 rounded-lg hover:bg-gray-200 transition-colors flex-shrink-0"
        title="Copy password"
      >
        {copied ? (
          <Check className="w-5 h-5 text-green-600" />
        ) : (
          <Copy className="w-5 h-5 text-gray-600" />
        )}
      </button>
    </div>
  );
};