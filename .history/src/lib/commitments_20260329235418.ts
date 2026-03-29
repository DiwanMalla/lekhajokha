import { Commitment, DeadlineType, Status } from '@/types';

const BASE_DATE = new Date('2026-03-28T00:00:00+05:45');

export const categoryMeta: Record<string, { name_en: string; name_ne: string; color: string; slug: string }> = {
  A: { name_en: 'Shared Commitment, Coordination & Public Trust', name_ne: 'साझा प्रतिबद्धता, समन्वय र सार्वजनिक विश्वास', color: '#1d4ed8', slug: 'shared-commitment-coordination-public-trust' },
  B: { name_en: 'Administrative Reform, Restructuring & Austerity', name_ne: 'प्रशासनिक सुधार, पुनर्संरचना र मितव्ययिता', color: '#0f766e', slug: 'administrative-reform-restructuring-austerity' },
  C: { name_en: 'Public Service Delivery & Grievance Management', name_ne: 'सार्वजनिक सेवा प्रवाह र गुनासो व्यवस्थापन', color: '#0284c7', slug: 'public-service-delivery-grievance-management' },
  D: { name_en: 'Digital Governance & Communication', name_ne: 'डिजिटल शासन र सञ्चार', color: '#7c3aed', slug: 'digital-governance-communication' },
  E: { name_en: 'Good Governance & Corruption Control', name_ne: 'सुशासन र भ्रष्टाचार नियन्त्रण', color: '#dc2626', slug: 'good-governance-corruption-control' },
  F: { name_en: 'Public Procurement & Project Management', name_ne: 'सार्वजनिक खरिद र परियोजना व्यवस्थापन', color: '#c2410c', slug: 'public-procurement-project-management' },
  G: { name_en: 'Investment, Industry & Private Sector', name_ne: 'लगानी, उद्योग र निजी क्षेत्र', color: '#0ea5e9', slug: 'investment-industry-private-sector' },
  H: { name_en: 'Energy & Water Resources', name_ne: 'ऊर्जा र जलस्रोत', color: '#16a34a', slug: 'energy-water-resources' },
  I: { name_en: 'Revenue Reform', name_ne: 'राजस्व सुधार', color: '#ca8a04', slug: 'revenue-reform' },
  J: { name_en: 'Health, Education & Human Development', name_ne: 'स्वास्थ्य, शिक्षा र मानव विकास', color: '#db2777', slug: 'health-education-human-development' },
  K: { name_en: 'Agriculture, Land & Infrastructure', name_ne: 'कृषि, भूमि र पूर्वाधार', color: '#65a30d', slug: 'agriculture-land-infrastructure' },
  L: { name_en: 'Other Strategic & Social Security Decisions', name_ne: 'अन्य रणनीतिक र सामाजिक सुरक्षा निर्णय', color: '#374151', slug: 'other-strategic-social-security-decisions' },
};

type RawCommitment = {
  point: number;
  categoryId: keyof typeof categoryMeta;
  title_en: string;
  title_ne?: string;
  ministry: string;
  deadline_type: DeadlineType;
  deadline_days: number | null;
  status?: Status;
  progress?: number;
};

const raw: RawCommitment[] = [
  { point: 1, categoryId: 'A', title_en: 'Express gratitude to Election Commission and security forces for fair March 5, 2026 elections', ministry: 'Prime Minister\'s Office', deadline_type: 'immediate', deadline_days: 0 },
  { point: 2, categoryId: 'A', title_en: 'Each ministry prepares 10-point action plan with KPIs and monthly reporting to PM Office', ministry: 'Prime Minister\'s Office', deadline_type: 'days', deadline_days: 7 },
  { point: 3, categoryId: 'A', title_en: 'Synthesize all party manifestos into a National Commitment linked to budgets and policy', ministry: 'Finance', deadline_type: 'ongoing', deadline_days: null },
  { point: 4, categoryId: 'A', title_en: 'Form task force for Constitutional Amendment Discussion Paper', ministry: 'Law, Justice & Parliamentary Affairs', deadline_type: 'days', deadline_days: 7 },
  { point: 5, categoryId: 'A', title_en: 'Issue formal state apology to Dalit and marginalized communities with reform programs', ministry: 'Women, Children & Senior Citizens', deadline_type: 'days', deadline_days: 15 },
  { point: 6, categoryId: 'A', title_en: 'Launch rehabilitation and employment package for Sept 2025 movement victims', ministry: 'Prime Minister\'s Office', deadline_type: 'days', deadline_days: 100 },
  { point: 7, categoryId: 'A', title_en: 'Form high-level inquiry committee on September 9, 2025 events', ministry: 'Home Affairs', deadline_type: 'days', deadline_days: 7 },
  { point: 8, categoryId: 'A', title_en: 'Implement recommendations of Gauri Bahadur Karki commission report', ministry: 'Prime Minister\'s Office', deadline_type: 'days', deadline_days: 30 },

  { point: 9, categoryId: 'B', title_en: 'Reduce federal ministries from 22 to 17', ministry: 'Prime Minister\'s Office', deadline_type: 'days', deadline_days: 30, status: 'in_progress', progress: 25 },
  { point: 10, categoryId: 'B', title_en: 'Business Process Re-engineering to cap decision making at 3 tiers', ministry: 'Federal Affairs & General Administration', deadline_type: 'days', deadline_days: 30 },
  { point: 11, categoryId: 'B', title_en: 'Dissolve or merge unproductive boards, committees and projects', ministry: 'Federal Affairs & General Administration', deadline_type: 'months', deadline_days: 30 },
  { point: 12, categoryId: 'B', title_en: 'Ban partisan affiliations among civil servants, teachers and professors', ministry: 'Federal Affairs & General Administration', deadline_type: 'immediate', deadline_days: 0 },
  { point: 13, categoryId: 'B', title_en: 'Strict implementation of employee code of conduct', ministry: 'Federal Affairs & General Administration', deadline_type: 'immediate', deadline_days: 0 },
  { point: 14, categoryId: 'B', title_en: 'Approve national Organization and Management survey standards', ministry: 'Federal Affairs & General Administration', deadline_type: 'days', deadline_days: 15 },
  { point: 15, categoryId: 'B', title_en: 'Move teacher retirement and records to provincial education ministries', ministry: 'Education, Science & Technology', deadline_type: 'fiscal_year', deadline_days: 365 },
  { point: 16, categoryId: 'B', title_en: 'Introduce job-specific KPIs in 45 days and review system in 90 days', ministry: 'Prime Minister\'s Office', deadline_type: 'days', deadline_days: 45 },
  { point: 17, categoryId: 'B', title_en: 'Create service quality certification standards for local levels', ministry: 'Federal Affairs & General Administration', deadline_type: 'days', deadline_days: 45 },
  { point: 18, categoryId: 'B', title_en: 'Standardize government office layout and infrastructure', ministry: 'Physical Infrastructure & Transport', deadline_type: 'days', deadline_days: 100 },
  { point: 19, categoryId: 'B', title_en: 'Build architecture for automated Personnel Management Information System (PMIS)', ministry: 'Federal Affairs & General Administration', deadline_type: 'months', deadline_days: 90 },

  { point: 20, categoryId: 'C', title_en: 'Establish citizen service centers in major cities for 12+ hours daily service', ministry: 'Home Affairs', deadline_type: 'ongoing', deadline_days: null },
  { point: 21, categoryId: 'C', title_en: 'Use National ID as primary identity and allow services from any district', ministry: 'Home Affairs', deadline_type: 'ongoing', deadline_days: null },
  { point: 22, categoryId: 'C', title_en: 'Compile and train front-desk service staff', ministry: 'Federal Affairs & General Administration', deadline_type: 'days', deadline_days: 15 },
  { point: 23, categoryId: 'C', title_en: 'Conduct time and motion study for office restructuring', ministry: 'Federal Affairs & General Administration', deadline_type: 'months', deadline_days: 30 },
  { point: 24, categoryId: 'C', title_en: 'Launch 24-hour multi-channel national grievance system', ministry: 'Prime Minister\'s Office', deadline_type: 'ongoing', deadline_days: null },
  { point: 25, categoryId: 'C', title_en: 'Upgrade Hello Sarkar into a real-time citizen dialogue platform', ministry: 'Prime Minister\'s Office', deadline_type: 'ongoing', deadline_days: null },
  { point: 26, categoryId: 'C', title_en: 'Enable faceless digital delivery for passports, licenses and citizenship', ministry: 'Home Affairs', deadline_type: 'days', deadline_days: 100 },
  { point: 27, categoryId: 'C', title_en: 'Deliver official documents to homes through government courier', ministry: 'Communication & IT', deadline_type: 'days', deadline_days: 100 },

  { point: 28, categoryId: 'D', title_en: 'Strengthen Government Integrated Office Management System (GIOMS)', ministry: 'Communication & IT', deadline_type: 'days', deadline_days: 100 },
  { point: 29, categoryId: 'D', title_en: 'Implement Ask Once auto-fill policy using national ID', ministry: 'Communication & IT', deadline_type: 'days', deadline_days: 60 },
  { point: 30, categoryId: 'D', title_en: 'Ensure all government portals are accessible for persons with disabilities', ministry: 'Communication & IT', deadline_type: 'days', deadline_days: 100 },
  { point: 31, categoryId: 'D', title_en: 'Expand Nagarik App for police, passport and license workflows', ministry: 'Communication & IT', deadline_type: 'days', deadline_days: 45 },
  { point: 32, categoryId: 'D', title_en: 'Introduce digital appointment system for in-person services', ministry: 'Communication & IT', deadline_type: 'months', deadline_days: 90 },
  { point: 33, categoryId: 'D', title_en: 'Enable e-signatures through biometrics, NID and OTP', ministry: 'Communication & IT', deadline_type: 'ongoing', deadline_days: null },
  { point: 34, categoryId: 'D', title_en: 'Implement desk-time alert system for delayed file movement', ministry: 'Prime Minister\'s Office', deadline_type: 'ongoing', deadline_days: null },
  { point: 35, categoryId: 'D', title_en: 'Allow citizens to download official certificates to phone or email', ministry: 'Communication & IT', deadline_type: 'days', deadline_days: 15 },
  { point: 36, categoryId: 'D', title_en: 'Establish National Integrated Digital Governance Platform', ministry: 'Communication & IT', deadline_type: 'days', deadline_days: 100 },
  { point: 37, categoryId: 'D', title_en: 'Draft personal data protection and digital governance policy', ministry: 'Law, Justice & Parliamentary Affairs', deadline_type: 'days', deadline_days: 60 },
  { point: 38, categoryId: 'D', title_en: 'Create legal path for independent IT regulatory authority', ministry: 'Communication & IT', deadline_type: 'days', deadline_days: 60 },
  { point: 39, categoryId: 'D', title_en: 'Create specialized IT and E-Governance Office under PM Office', ministry: 'Prime Minister\'s Office', deadline_type: 'months', deadline_days: 90 },
  { point: 40, categoryId: 'D', title_en: 'Draft Information Technology and E-Governance Bill', ministry: 'Law, Justice & Parliamentary Affairs', deadline_type: 'days', deadline_days: 60 },
  { point: 41, categoryId: 'D', title_en: 'Prepare National Enterprise Architecture Framework', ministry: 'Communication & IT', deadline_type: 'days', deadline_days: 60 },
  { point: 42, categoryId: 'D', title_en: 'Shut down all betting apps and websites', ministry: 'Home Affairs', deadline_type: 'days', deadline_days: 1, status: 'in_progress', progress: 35 },

  { point: 43, categoryId: 'E', title_en: 'Form empowered wealth investigation committee covering 1991 to present', ministry: 'Prime Minister\'s Office', deadline_type: 'days', deadline_days: 15, status: 'in_progress', progress: 25 },
  { point: 44, categoryId: 'E', title_en: 'Restructure National Vigilance Center', ministry: 'Prime Minister\'s Office', deadline_type: 'days', deadline_days: 30 },
  { point: 45, categoryId: 'E', title_en: 'Build digital asset registry with red-flag alerts', ministry: 'Finance', deadline_type: 'days', deadline_days: 100, status: 'in_progress', progress: 20 },
  { point: 46, categoryId: 'E', title_en: 'Publish second National Anti-Corruption Action Plan', ministry: 'Prime Minister\'s Office', deadline_type: 'days', deadline_days: 15 },
  { point: 47, categoryId: 'E', title_en: 'Issue National Integrity Policy and Whistleblower Protection rules', ministry: 'Law, Justice & Parliamentary Affairs', deadline_type: 'days', deadline_days: 30 },

  { point: 48, categoryId: 'F', title_en: 'Amend Public Procurement Act for value-for-money and digital marketplace', ministry: 'Finance', deadline_type: 'days', deadline_days: 30 },
  { point: 49, categoryId: 'F', title_en: 'Create national project pipeline with clear investment modalities', ministry: 'National Planning Commission', deadline_type: 'months', deadline_days: 60 },
  { point: 50, categoryId: 'F', title_en: 'Build data-based end-to-end e-procurement monitoring system', ministry: 'Finance', deadline_type: 'days', deadline_days: 90 },
  { point: 51, categoryId: 'F', title_en: 'Draft umbrella law for project facilitation', ministry: 'Law, Justice & Parliamentary Affairs', deadline_type: 'days', deadline_days: 60 },
  { point: 52, categoryId: 'F', title_en: 'Install strategic weigh-bridges and monitor stalled projects', ministry: 'Physical Infrastructure & Transport', deadline_type: 'days', deadline_days: 45 },

  { point: 53, categoryId: 'G', title_en: 'Empower Department of Industry one-stop service center', ministry: 'Industry, Commerce & Supplies', deadline_type: 'ongoing', deadline_days: null },
  { point: 54, categoryId: 'G', title_en: 'Categorize major projects into public, PPP and private modalities', ministry: 'Investment Board Nepal', deadline_type: 'days', deadline_days: 90 },
  { point: 55, categoryId: 'G', title_en: 'Implement one-door approval at Investment Board', ministry: 'Investment Board Nepal', deadline_type: 'months', deadline_days: 30 },
  { point: 56, categoryId: 'G', title_en: 'Launch Startup Fast Track with 2-day business registration', ministry: 'Industry, Commerce & Supplies', deadline_type: 'immediate', deadline_days: 0 },
  { point: 57, categoryId: 'G', title_en: 'Reduce risk weightage for SME, agriculture and IT lending', ministry: 'Finance', deadline_type: 'days', deadline_days: 30 },
  { point: 58, categoryId: 'G', title_en: 'Launch integrated one-door business platform', ministry: 'Industry, Commerce & Supplies', deadline_type: 'days', deadline_days: 45 },
  { point: 59, categoryId: 'G', title_en: 'Rebrand employment centers to Employment, Skill and Entrepreneurship Centers', ministry: 'Labour, Employment & Social Security', deadline_type: 'days', deadline_days: 60 },
  { point: 60, categoryId: 'G', title_en: 'Implement Private Sector Protection and Promotion Strategy', ministry: 'Industry, Commerce & Supplies', deadline_type: 'ongoing', deadline_days: null, status: 'in_progress', progress: 20 },
  { point: 61, categoryId: 'G', title_en: 'Create rapid response industrial and business security mechanism', ministry: 'Home Affairs', deadline_type: 'days', deadline_days: 30 },
  { point: 62, categoryId: 'G', title_en: 'Take strict legal action against looting and attacks on private property', ministry: 'Home Affairs', deadline_type: 'immediate', deadline_days: 0 },
  { point: 63, categoryId: 'G', title_en: 'Issue subsidized interest and rehabilitation package for unrest-affected businesses', ministry: 'Finance', deadline_type: 'ongoing', deadline_days: null },
  { point: 64, categoryId: 'G', title_en: 'Create PM Delivery Unit and central dashboard for national projects', ministry: 'Prime Minister\'s Office', deadline_type: 'ongoing', deadline_days: null, status: 'in_progress', progress: 25 },
  { point: 65, categoryId: 'G', title_en: 'Integrate overlapping roles of Investment Board, Industry Department and Trade Center', ministry: 'Prime Minister\'s Office', deadline_type: 'days', deadline_days: 30 },
  { point: 66, categoryId: 'G', title_en: 'Eliminate registration fees for industries up to NPR 25 crore and simplify process', ministry: 'Industry, Commerce & Supplies', deadline_type: 'days', deadline_days: 45 },
  { point: 67, categoryId: 'G', title_en: 'Enable automatic data exchange between Company Registrar and Industry Department', ministry: 'Communication & IT', deadline_type: 'months', deadline_days: 60 },
  { point: 68, categoryId: 'G', title_en: 'Amend laws to channel CSR funds into government-priority sectors', ministry: 'Finance', deadline_type: 'months', deadline_days: 90 },
  { point: 69, categoryId: 'G', title_en: 'Prepare SME protection strategy for disruptions and supply risks', ministry: 'Industry, Commerce & Supplies', deadline_type: 'ongoing', deadline_days: null },
  { point: 70, categoryId: 'G', title_en: 'Keep transport and trade routes uninterrupted for import and export', ministry: 'Home Affairs', deadline_type: 'immediate', deadline_days: 0 },
  { point: 71, categoryId: 'G', title_en: 'Implement beneficial ownership disclosure and BEPS standards', ministry: 'Finance', deadline_type: 'ongoing', deadline_days: null },
  { point: 72, categoryId: 'G', title_en: 'Publish organized tourism expansion roadmap for priority destinations', ministry: 'Culture, Tourism & Civil Aviation', deadline_type: 'months', deadline_days: 30 },
  { point: 73, categoryId: 'G', title_en: 'Launch Wellness Tourism Strategy and Nepal Wellness Year 2027', ministry: 'Culture, Tourism & Civil Aviation', deadline_type: 'days', deadline_days: 15 },

  { point: 74, categoryId: 'H', title_en: 'Finalize national energy export strategy', ministry: 'Energy, Water Resources & Irrigation', deadline_type: 'months', deadline_days: 30 },
  { point: 75, categoryId: 'H', title_en: 'Decide all pending power purchase agreements (PPAs)', ministry: 'Energy, Water Resources & Irrigation', deadline_type: 'days', deadline_days: 180 },
  { point: 76, categoryId: 'H', title_en: 'Create Kathmandu water and sewage high-level coordination taskforce', ministry: 'Water Supply', deadline_type: 'ongoing', deadline_days: null },
  { point: 77, categoryId: 'H', title_en: 'Protect Phewa Lake through encroachment removal and watershed conservation', ministry: 'Forests & Environment', deadline_type: 'months', deadline_days: 90 },

  { point: 78, categoryId: 'I', title_en: 'Present Urban Development and Waste Management bills to Cabinet', ministry: 'Urban Development', deadline_type: 'months', deadline_days: 60 },
  { point: 79, categoryId: 'I', title_en: 'Transfer money from inactive 10+ year bank accounts to state treasury', ministry: 'Finance', deadline_type: 'days', deadline_days: 90 },
  { point: 80, categoryId: 'I', title_en: 'Make e-billing mandatory for all large businesses', ministry: 'Finance', deadline_type: 'months', deadline_days: 30 },
  { point: 81, categoryId: 'I', title_en: 'Automate tax administration and control leakage', ministry: 'Finance', deadline_type: 'days', deadline_days: 45 },
  { point: 82, categoryId: 'I', title_en: 'Consolidate scattered funds into high-return development projects', ministry: 'Finance', deadline_type: 'days', deadline_days: 60 },
  { point: 83, categoryId: 'I', title_en: 'Cancel inactive mining licenses and modernize mining labs', ministry: 'Industry, Commerce & Supplies', deadline_type: 'months', deadline_days: 90 },
  { point: 84, categoryId: 'I', title_en: 'Restructure customs for trade facilitation and enforce MRP', ministry: 'Finance', deadline_type: 'ongoing', deadline_days: null },
  { point: 85, categoryId: 'I', title_en: 'Create legal basis to use dormant court and government deposits for development', ministry: 'Law, Justice & Parliamentary Affairs', deadline_type: 'days', deadline_days: 60 },

  { point: 86, categoryId: 'J', title_en: 'Enforce free-bed quota and launch Free Health Portal', ministry: 'Health & Population', deadline_type: 'days', deadline_days: 30 },
  { point: 87, categoryId: 'J', title_en: 'Replace political student unions with non-partisan Student Councils', ministry: 'Education, Science & Technology', deadline_type: 'days', deadline_days: 90 },
  { point: 88, categoryId: 'J', title_en: 'Synchronize university exam result publication with academic calendar', ministry: 'Education, Science & Technology', deadline_type: 'ongoing', deadline_days: null },
  { point: 89, categoryId: 'J', title_en: 'Allow bachelor enrollment without citizenship certificate', ministry: 'Education, Science & Technology', deadline_type: 'immediate', deadline_days: 0 },
  { point: 90, categoryId: 'J', title_en: 'Replace internal exams up to Grade 5 with psychological assessment', ministry: 'Education, Science & Technology', deadline_type: 'fiscal_year', deadline_days: 365 },

  { point: 91, categoryId: 'K', title_en: 'Fix minimum support prices for major crops and ensure timely payments', ministry: 'Agriculture & Livestock Development', deadline_type: 'days', deadline_days: 30 },
  { point: 92, categoryId: 'K', title_en: 'Digitize landless records in 60 days and resolve within 1,000 days', ministry: 'Land Management, Cooperatives & Poverty Alleviation', deadline_type: 'days', deadline_days: 60 },
  { point: 93, categoryId: 'K', title_en: 'Run special campaign to remove illegal encroachment on public land', ministry: 'Home Affairs', deadline_type: 'immediate', deadline_days: 0 },

  { point: 94, categoryId: 'L', title_en: 'Amend rules for frozen and seized criminal assets', ministry: 'Law, Justice & Parliamentary Affairs', deadline_type: 'months', deadline_days: 60 },
  { point: 95, categoryId: 'L', title_en: 'Allocate NPR 10 million to upgrade CIB technology immediately', ministry: 'Home Affairs', deadline_type: 'immediate', deadline_days: 0 },
  { point: 96, categoryId: 'L', title_en: 'Form inter-ministerial taskforce to study Middle East crisis impacts', ministry: 'Foreign Affairs', deadline_type: 'ongoing', deadline_days: null },
  { point: 97, categoryId: 'L', title_en: 'Clear or auction vehicles stuck in customs yards', ministry: 'Finance', deadline_type: 'immediate', deadline_days: 0 },
  { point: 98, categoryId: 'L', title_en: 'Launch free Blue Bus service in all 7 provinces with 25 buses in 100 days', ministry: 'Physical Infrastructure & Transport', deadline_type: 'days', deadline_days: 100 },
  { point: 99, categoryId: 'L', title_en: 'Mandate CCTV and dashcams in public transport with SOS integration', ministry: 'Physical Infrastructure & Transport', deadline_type: 'days', deadline_days: 30 },
  { point: 100, categoryId: 'L', title_en: 'Start refund process for small depositors in troubled cooperatives', ministry: 'Land Management, Cooperatives & Poverty Alleviation', deadline_type: 'days', deadline_days: 100 },
];

const addDays = (base: Date, days: number) => {
  const result = new Date(base);
  result.setDate(result.getDate() + days);
  return result;
};

const iso = (date: Date) => date.toISOString();

const toDeadlineDate = (item: RawCommitment): Date => {
  if (item.deadline_days === null) {
    return addDays(BASE_DATE, 100);
  }

  return addDays(BASE_DATE, Math.max(item.deadline_days, 0));
};

export const commitments: Commitment[] = raw.map((item) => {
  const meta = categoryMeta[item.categoryId];
  const deadlineDate = toDeadlineDate(item);
  const status = item.status ?? 'not_started';

  return {
    id: String(item.point),
    point_number: item.point,
    title_en: item.title_en,
    title_ne: item.title_ne ?? item.title_en,
    description_en: item.title_en,
    description_ne: item.title_ne ?? item.title_en,
    category_id: item.categoryId,
    category_name_en: meta.name_en,
    category_name_ne: meta.name_ne,
    category: meta.name_en,
    ministry: item.ministry,
    responsible_ministry: item.ministry,
    status,
    progress_percentage: item.progress ?? (status === 'in_progress' ? 20 : 0),
    deadline_type: item.deadline_type,
    deadline_days: item.deadline_days,
    deadline: deadlineDate.toISOString().slice(0, 10),
    deadline_date: deadlineDate.toISOString().slice(0, 10),
    difficulty_rating: 'medium',
    importance_score: 0,
    last_updated: iso(new Date('2026-03-29T12:00:00+05:45')),
    editorial_summary_en: 'Pending editorial assessment.',
    editorial_summary_ne: 'सम्पादकीय विश्लेषण चाँडै प्रकाशन हुनेछ।',
    evidence_url: null,
    created_at: iso(BASE_DATE),
    updated_at: iso(new Date('2026-03-29T12:00:00+05:45')),
  };
});

export const commitmentsById = new Map(commitments.map((item) => [item.id, item]));

export const ministryList = Array.from(new Set(commitments.map((item) => item.responsible_ministry))).sort((a, b) =>
  a.localeCompare(b)
);

export const categoryList = Object.entries(categoryMeta).map(([id, meta]) => ({
  id,
  ...meta,
}));
