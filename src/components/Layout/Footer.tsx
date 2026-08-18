import { Link } from 'react-router-dom';
import { Landmark } from 'lucide-react';
import { useLanguage } from '@/services/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-primary text-white mt-12">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center">
                <Landmark className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg">FundLedger</span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed">{t('footer.tagline')}</p>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-3 text-white/90">Explore</h3>
            <ul className="space-y-2 text-sm text-white/60">
              <li><Link to="/map" className="hover:text-white transition-colors">{t('footer.projectMap')}</Link></li>
              <li><Link to="/funds" className="hover:text-white transition-colors">{t('footer.fundTracking')}</Link></li>
              <li><Link to="/dashboard" className="hover:text-white transition-colors">{t('footer.explore')}</Link></li>
              <li><Link to="/analytics" className="hover:text-white transition-colors">{t('footer.reports')}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-3 text-white/90">Engage</h3>
            <ul className="space-y-2 text-sm text-white/60">
              <li><Link to="/feedback" className="hover:text-white transition-colors">{t('footer.feedback')}</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">{t('footer.about')}</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.rti')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.resources')}</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-3 text-white/90">Legal</h3>
            <ul className="space-y-2 text-sm text-white/60">
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.legal')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.privacy')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.terms')}</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-white/50">{t('footer.copyright')}</p>
          <p className="text-xs text-white/40">Powered by Civic Clarity Engine</p>
        </div>
      </div>
    </footer>
  );
}
