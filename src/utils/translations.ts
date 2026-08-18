export type Lang = 'en' | 'ta';

export const translations: Record<string, { en: string; ta: string }> = {
  // Navigation
  'nav.home': { en: 'Home', ta: 'முகப்பு' },
  'nav.dashboard': { en: 'Citizen Dashboard', ta: 'குடிமக்கள் டாஷ்போர்டு' },
  'nav.funds': { en: 'Fund Tracking', ta: 'நிதிக் கண்காணிப்பு' },
  'nav.analytics': { en: 'Analytics', ta: 'பகுப்பாய்வு' },
  'nav.map': { en: 'Project Map', ta: 'திட்ட வரைபடம்' },
  'nav.feedback': { en: 'Public Feedback', ta: 'பொதுக் கருத்து' },
  'nav.about': { en: 'About FundLedger', ta: 'FundLedger பற்றி' },
  'nav.admin': { en: 'Admin Portal', ta: 'நிர்வாக போர்ட்டல்' },

  // Common
  'common.search': { en: 'Search projects, IDs, departments...', ta: 'திட்டங்கள், ஐடி, துறைகள் தேடவும்...' },
  'common.viewReport': { en: 'View Full Report', ta: 'முழு அறிக்கை பார்க்க' },
  'common.export': { en: 'Export Report', ta: 'அறிக்கை ஏற்றுமதி' },
  'common.filter': { en: 'Filter', ta: 'வடிகட்டி' },
  'common.allDistricts': { en: 'All Districts', ta: 'அனைத்து மாவட்டங்கள்' },
  'common.allDepartments': { en: 'All Departments', ta: 'அனைத்து துறைகள்' },
  'common.allStatuses': { en: 'All Statuses', ta: 'அனைத்து நிலைகள்' },
  'common.allCategories': { en: 'All Categories', ta: 'அனைத்து பிரிவுகள்' },

  // Home
  'home.heroTitle': { en: 'See Where Public Money Goes.', ta: 'பொதுப் பணம் எங்கே செல்கிறது என்பதைப் பார்க்க.' },
  'home.heroDesc': { en: 'FundLedger makes government project funding transparent, understandable, and accessible to everyone.', ta: 'FundLedger அரசு திட்ட நிதியை வெளிப்படையான, புரிந்துகொள்ளக்கூடிய மற்றும் அனைவருக்கும் அணுகக்கூடியதாக ஆக்குகிறது.' },
  'home.exploreProjects': { en: 'Explore Projects', ta: 'திட்டங்களை ஆராய்க' },
  'home.trackFunds': { en: 'Track Government Funds', ta: 'அரசு நிதியைக் கண்காணிக்க' },
  'home.totalAllocated': { en: 'Total Funds Allocated', ta: 'ஒதுக்கப்பட்ட மொத்த நிதி' },
  'home.totalSpent': { en: 'Total Funds Spent', ta: 'செலவிடப்பட்ட மொத்த நிதி' },
  'home.activeProjects': { en: 'Active Projects', ta: 'நடந்துகொண்டிருக்கும் திட்டங்கள்' },
  'home.completedProjects': { en: 'Completed Projects', ta: 'முடிக்கப்பட்ட திட்டங்கள்' },

  // Transparency
  'home.transparencyTitle': { en: 'Complete Transparency', ta: 'முழுமையான வெளிப்படைத்தன்மை' },
  'home.transparencyDesc': { en: 'Track every rupee from initial allocation to final disbursement.', ta: 'ஒவ்வொரு ரூபாயையும் ஆரம்ப ஒதுக்கீட்டிலிருந்து இறுதி செலவு வரை கண்காணிக்கவும்.' },
  'home.accountabilityTitle': { en: 'Strict Accountability', ta: 'கடுமையான பொறுப்புணர்வு' },
  'home.accountabilityDesc': { en: 'View project timelines, departments, contractors, delays, and financial information.', ta: 'திட்ட காலக்கெடு, துறைகள், ஒப்பந்ததார்கள், தாமதங்கள் மற்றும் நிதி தகவல்களை பார்க்க.' },
  'home.accessibilityTitle': { en: 'Universal Accessibility', ta: 'அனைவருக்கும் அணுகல்' },
  'home.accessibilityDesc': { en: 'Convert complicated financial information into simple visual information.', ta: 'சிக்கலான நிதி தகவல்களை எளிய காட்சி தகவல்களாக மாற்றுக.' },
  'home.ctaReady': { en: 'Ready to explore your district?', ta: 'உங்கள் மாவட்டத்தை ஆராய தயாரா?' },
  'home.openMap': { en: 'Open Project Map', ta: 'திட்ட வரைபடத்தைத் திறக்க' },

  // Footer
  'footer.tagline': { en: 'Making public spending transparent, understandable, and accessible for every citizen.', ta: 'ஒவ்வொரு குடிமகனுக்கும் பொது செலவினங்களை வெளிப்படையான, புரிந்துகொள்ளக்கூடிய மற்றும் அணுகக்கூடியதாக மாற்றுதல்.' },
  'footer.explore': { en: 'Explore Projects', ta: 'திட்டங்களை ஆராய்க' },
  'footer.fundTracking': { en: 'Fund Tracking', ta: 'நிதிக் கண்காணிப்பு' },
  'footer.projectMap': { en: 'Project Map', ta: 'திட்ட வரைபடம்' },
  'footer.resources': { en: 'Resources', ta: 'வளங்கள்' },
  'footer.reports': { en: 'Reports', ta: 'அறிக்கைகள்' },
  'footer.feedback': { en: 'Feedback', ta: 'கருத்து' },
  'footer.about': { en: 'About', ta: 'பற்றி' },
  'footer.legal': { en: 'Legal', ta: 'சட்டப்பூர்வ' },
  'footer.privacy': { en: 'Privacy Policy', ta: 'தனியுரிமை கொள்கை' },
  'footer.terms': { en: 'Terms of Use', ta: 'பயன்பாட்டு விதிமுறைகள்' },
  'footer.rti': { en: 'RTI Desk', ta: 'தகவல் உரிமை அலுவலகம்' },
  'footer.copyright': { en: '© 2026 FundLedger — Smart Governance Transparency Platform', ta: '© 2026 FundLedger — ஸ்மார்ட் ஆளுமை வெளிப்படைத்தன்மை தளம்' },

  // Status
  'status.completed': { en: 'Completed', ta: 'முடிந்தது' },
  'status.progress': { en: 'In Progress', ta: 'நடந்து கொண்டிருக்கிறது' },
  'status.delayed': { en: 'Delayed', ta: 'தாமதம்' },
  'status.flagged': { en: 'Flagged', ta: 'கொடி சுட்டப்பட்டது' },
  'status.planned': { en: 'Planned', ta: 'திட்டமிடப்பட்டது' },
};

export function t(key: string, lang: Lang): string {
  return translations[key]?.[lang] ?? key;
}
