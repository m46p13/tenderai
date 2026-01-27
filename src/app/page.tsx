'use client';

import { useState } from 'react';
import { FileText, Sparkles, Copy, Check, Loader2 } from 'lucide-react';

export default function Home() {
  const [requirements, setRequirements] = useState('');
  const [companyInfo, setCompanyInfo] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateResponse = async () => {
    if (!requirements.trim()) return;
    
    setLoading(true);
    setResponse('');
    
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requirements, companyInfo }),
      });
      
      if (!res.ok) throw new Error('Failed to generate');
      
      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      
      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;
        setResponse(prev => prev + decoder.decode(value));
      }
    } catch (error) {
      console.error('Error:', error);
      setResponse('Error generating response. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(response);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700/50 backdrop-blur-sm bg-slate-900/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">TenderAI</h1>
              <p className="text-xs text-slate-400">Government Tender Response Generator</p>
            </div>
          </div>
          <a 
            href="#pricing" 
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors"
          >
            Get Started
          </a>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Win More Government Contracts
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Paste your tender requirements, get a professional response draft in seconds. 
            Powered by AI trained on thousands of successful Australian government contracts.
          </p>
        </div>

        {/* Main Interface */}
        <div className="grid lg:grid-cols-2 gap-6 mb-16">
          {/* Input Panel */}
          <div className="space-y-4">
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 backdrop-blur-sm">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Tender Requirements
              </label>
              <textarea
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                placeholder="Paste the tender requirements, selection criteria, or scope of work here..."
                className="w-full h-48 bg-slate-900/50 border border-slate-600/50 rounded-xl p-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
              />
            </div>

            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 backdrop-blur-sm">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Your Company Info (Optional)
              </label>
              <textarea
                value={companyInfo}
                onChange={(e) => setCompanyInfo(e.target.value)}
                placeholder="Briefly describe your company, capabilities, and relevant experience..."
                className="w-full h-32 bg-slate-900/50 border border-slate-600/50 rounded-xl p-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
              />
            </div>

            <button
              onClick={generateResponse}
              disabled={loading || !requirements.trim()}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/25"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating Response...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generate Tender Response
                </>
              )}
            </button>
          </div>

          {/* Output Panel */}
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <label className="text-sm font-medium text-slate-300">
                Generated Response
              </label>
              {response && (
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-1 text-sm text-slate-400 hover:text-white transition-colors"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              )}
            </div>
            <div className="bg-slate-900/50 border border-slate-600/50 rounded-xl p-4 h-[400px] overflow-y-auto">
              {response ? (
                <div className="text-slate-200 whitespace-pre-wrap">{response}</div>
              ) : (
                <div className="text-slate-500 text-center pt-32">
                  Your AI-generated tender response will appear here
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[
            {
              title: 'Trained on Real Tenders',
              description: 'AI trained on 155,000+ successful Australian government contracts from AusTender.',
              icon: '📊',
            },
            {
              title: 'Compliance Focused',
              description: 'Responses structured to address selection criteria and compliance requirements.',
              icon: '✅',
            },
            {
              title: 'Save Hours of Work',
              description: 'Generate professional first drafts in seconds, not hours. Edit and submit.',
              icon: '⚡',
            },
          ].map((feature, i) => (
            <div key={i} className="bg-slate-800/30 border border-slate-700/30 rounded-2xl p-6 text-center">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-slate-400 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Pricing */}
        <div id="pricing" className="text-center mb-8">
          <h3 className="text-3xl font-bold text-white mb-4">Simple Pricing</h3>
          <p className="text-slate-400 mb-8">Start free, upgrade when you need more</p>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { name: 'Free', price: '$0', responses: '5 responses/month', cta: 'Get Started' },
              { name: 'Pro', price: '$99', responses: '100 responses/month', cta: 'Start Trial', highlight: true },
              { name: 'Enterprise', price: '$299', responses: 'Unlimited', cta: 'Contact Us' },
            ].map((plan, i) => (
              <div 
                key={i} 
                className={`rounded-2xl p-6 ${
                  plan.highlight 
                    ? 'bg-gradient-to-br from-blue-600/20 to-purple-600/20 border-2 border-blue-500/50' 
                    : 'bg-slate-800/30 border border-slate-700/30'
                }`}
              >
                <h4 className="text-xl font-bold text-white mb-2">{plan.name}</h4>
                <div className="text-3xl font-bold text-white mb-1">{plan.price}</div>
                <div className="text-sm text-slate-400 mb-4">/month</div>
                <div className="text-slate-300 mb-6">{plan.responses}</div>
                <button className={`w-full py-2 rounded-lg font-medium transition-colors ${
                  plan.highlight 
                    ? 'bg-blue-600 hover:bg-blue-500 text-white' 
                    : 'bg-slate-700 hover:bg-slate-600 text-white'
                }`}>
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-700/50 py-8 text-center text-slate-500 text-sm">
        <p>© 2026 TenderAI. Built in Australia 🇦🇺</p>
      </footer>
    </main>
  );
}
