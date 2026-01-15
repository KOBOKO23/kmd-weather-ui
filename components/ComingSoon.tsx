import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Construction } from 'lucide-react';

interface ComingSoonProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  features?: string[];
}

export function ComingSoon({ title, description, icon, features }: ComingSoonProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center px-6">
      <div className="max-w-3xl w-full">
        {/* Back Button */}
        <Link 
          to="/"
          className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        {/* Main Card */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 border border-white/20 text-center">
          {/* Icon */}
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
            {icon}
          </div>

          {/* Title */}
          <h1 className="text-5xl text-white mb-4">{title}</h1>
          
          {/* Description */}
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            {description}
          </p>

          {/* Construction Badge */}
          <div className="inline-flex items-center gap-3 bg-yellow-500/20 px-6 py-3 rounded-full border border-yellow-500/30 mb-8">
            <Construction className="w-5 h-5 text-yellow-400" />
            <span className="text-yellow-400">Under Development</span>
          </div>

          {/* Features List */}
          {features && features.length > 0 && (
            <div className="mt-12 bg-white/5 rounded-2xl p-8 border border-white/10">
              <h3 className="text-white text-xl mb-6 flex items-center justify-center gap-2">
                <Calendar className="w-5 h-5 text-blue-400" />
                Planned Features
              </h3>
              <ul className="space-y-3 text-left max-w-md mx-auto">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3 text-slate-300">
                    <span className="text-blue-400 mt-1">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* CTA */}
          <div className="mt-12 flex gap-4 justify-center flex-wrap">
            <Link 
              to="/"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl transition-all shadow-xl"
            >
              Explore Other Services
            </Link>
            <Link 
              to="/nwp-system"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all border border-white/20 backdrop-blur-sm"
            >
              Go to WRF Model Viewer
            </Link>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="text-slate-400 text-sm">
            This feature is currently in development. Check back soon for updates.
          </p>
        </div>
      </div>
    </div>
  );
}
