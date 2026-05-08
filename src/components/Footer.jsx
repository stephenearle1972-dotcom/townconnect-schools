import { Link } from 'react-router-dom';
import { brand } from '../config/school.js';

export default function Footer() {
  return (
    <footer className="bg-tcteal text-fog py-20 mt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="md:col-span-2">
            <h4 className="text-white font-serif font-bold text-2xl mb-6 italic">
              {brand.name}
            </h4>
            <p className="text-sm leading-relaxed max-w-sm text-fog/60 font-light">
              The simple, WhatsApp-first way for South African schools to answer parent and learner questions instantly. A {brand.parent} product.
            </p>
            <div className="mt-8 space-y-3">
              <p className="text-[10px] font-black uppercase tracking-widest text-gold">
                Get in touch
              </p>
              <a
                href={`mailto:${brand.contactEmail}`}
                className="flex items-center gap-2 text-sm text-white hover:text-gold transition-colors"
              >
                <span>✉️</span> {brand.contactEmail}
              </a>
              <a
                href={`https://wa.me/${brand.contactPhone.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-white hover:text-[#25D366] transition-colors"
              >
                <span>📱</span> {brand.contactPhone}
              </a>
            </div>
          </div>

          <div>
            <h5 className="text-white font-black text-[10px] uppercase tracking-widest mb-8 opacity-40">
              Product
            </h5>
            <ul className="space-y-4 text-[10px] font-bold tracking-widest uppercase text-fog/70">
              <li><Link to="/how-it-works" className="hover:text-white transition-colors">How it works</Link></li>
              <li><Link to="/try-demo" className="hover:text-white transition-colors">Try the demo</Link></li>
              <li><Link to="/for-schools" className="hover:text-white transition-colors">For schools</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-black text-[10px] uppercase tracking-widest mb-8 opacity-40">
              {brand.parent} family
            </h5>
            <ul className="space-y-4 text-[10px] font-bold tracking-widest uppercase text-fog/70">
              <li>
                <a
                  href="https://www.townconnect.co.za"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  TownConnect Hub
                </a>
              </li>
              <li>
                <span className="opacity-50">TownConnect Schools (you are here)</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-20 pt-10 border-t border-white/10 text-center">
          <p className="text-[9px] font-black uppercase tracking-[0.4em] opacity-30">
            &copy; {new Date().getFullYear()} TownConnect (Pty) Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
