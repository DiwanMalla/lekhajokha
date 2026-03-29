import { Commitment, DeadlineType, Status } from "@/types";
import { ministryLabel } from "@/lib/i18n/ministry-names";
import { nepaliCopyForPoint } from "@/lib/commitments-ne";

const BASE_DATE = new Date("2026-03-28T00:00:00+05:45");

const EXPLICIT_DUE_DATES: Record<number, string> = {
  1: "2026-03-28",
  2: "2026-04-04",
  3: "2026-07-06",
  4: "2026-04-04",
  5: "2026-04-12",
  6: "2026-07-06",
  7: "2026-04-04",
  8: "2026-04-27",
  9: "2026-04-27",
  10: "2026-04-27",
  11: "2026-04-28",
  12: "2026-03-28",
  13: "2026-03-28",
  14: "2026-04-12",
  15: "2026-07-16",
  16: "2026-05-12",
  17: "2026-05-12",
  18: "2026-07-06",
  19: "2026-06-28",
  20: "2026-07-06",
  21: "2026-03-28",
  22: "2026-04-12",
  23: "2026-04-28",
  24: "2026-07-06",
  25: "2026-07-06",
  26: "2026-07-06",
  27: "2026-07-06",
  28: "2026-07-06",
  29: "2026-05-27",
  30: "2026-07-06",
  31: "2026-05-12",
  32: "2026-06-28",
  33: "2026-04-28",
  34: "2026-04-27",
  35: "2026-04-12",
  36: "2026-07-06",
  37: "2026-05-27",
  38: "2026-05-27",
  39: "2026-06-28",
  40: "2026-05-27",
  41: "2026-05-27",
  42: "2026-03-29",
  43: "2026-04-12",
  44: "2026-04-27",
  45: "2026-07-06",
  46: "2026-04-12",
  47: "2026-04-27",
  48: "2026-04-27",
  49: "2026-05-28",
  50: "2026-06-26",
  51: "2026-05-27",
  52: "2026-05-12",
  53: "2026-07-06",
  54: "2026-06-26",
  55: "2026-04-28",
  56: "2026-03-30",
  57: "2026-04-27",
  58: "2026-05-12",
  59: "2026-05-27",
  60: "2026-03-28",
  61: "2026-04-27",
  62: "2026-03-28",
  63: "2026-07-06",
  64: "2026-03-28",
  65: "2026-04-27",
  66: "2026-05-12",
  67: "2026-04-12",
  68: "2026-06-28",
  69: "2026-03-28",
  70: "2026-03-28",
  71: "2026-07-06",
  72: "2026-04-28",
  73: "2026-04-12",
  74: "2026-04-28",
  75: "2026-04-27",
  76: "2026-06-28",
  77: "2026-05-28",
  78: "2026-06-26",
  79: "2026-04-28",
  80: "2026-05-12",
  81: "2026-05-27",
  82: "2026-06-28",
  83: "2026-07-06",
  84: "2026-05-27",
  85: "2026-04-04",
  86: "2026-05-27",
  87: "2026-07-06",
  88: "2026-03-28",
  89: "2027-04-15",
  90: "2026-04-07",
  91: "2026-05-27",
  92: "2026-03-28",
  93: "2026-05-28",
  94: "2026-03-28",
  95: "2026-04-27",
  96: "2026-03-28",
  97: "2026-07-06",
  98: "2026-04-27",
  99: "2026-07-06",
  100: "2026-07-06",
};

/** Lead institution for digital asset and monetary-policy led points. */
const NRB = "Nepal Rastra Bank (NRB)";

export const categoryMeta: Record<
  string,
  { name_en: string; name_ne: string; color: string; slug: string }
> = {
  A: {
    name_en: "Shared Commitment, Coordination & Public Trust",
    name_ne: "साझा प्रतिबद्धता, समन्वय र सार्वजनिक विश्वास",
    color: "#1d4ed8",
    slug: "shared-commitment-coordination-public-trust",
  },
  B: {
    name_en: "Administrative Reform, Restructuring & Austerity",
    name_ne: "प्रशासनिक सुधार, पुनर्संरचना र मितव्ययिता",
    color: "#0f766e",
    slug: "administrative-reform-restructuring-austerity",
  },
  C: {
    name_en: "Public Service Delivery & Grievance Management",
    name_ne: "सार्वजनिक सेवा प्रवाह र गुनासो व्यवस्थापन",
    color: "#0284c7",
    slug: "public-service-delivery-grievance-management",
  },
  D: {
    name_en: "Digital Governance & Communication",
    name_ne: "डिजिटल शासन र सञ्चार",
    color: "#7c3aed",
    slug: "digital-governance-communication",
  },
  E: {
    name_en: "Good Governance & Corruption Control",
    name_ne: "सुशासन र भ्रष्टाचार नियन्त्रण",
    color: "#dc2626",
    slug: "good-governance-corruption-control",
  },
  F: {
    name_en: "Public Procurement & Project Management",
    name_ne: "सार्वजनिक खरिद र परियोजना व्यवस्थापन",
    color: "#c2410c",
    slug: "public-procurement-project-management",
  },
  G: {
    name_en: "Investment, Industry & Private Sector",
    name_ne: "लगानी, उद्योग र निजी क्षेत्र",
    color: "#0ea5e9",
    slug: "investment-industry-private-sector",
  },
  H: {
    name_en: "Energy & Water Resources",
    name_ne: "ऊर्जा र जलस्रोत",
    color: "#16a34a",
    slug: "energy-water-resources",
  },
  I: {
    name_en: "Revenue Reform",
    name_ne: "राजस्व सुधार",
    color: "#ca8a04",
    slug: "revenue-reform",
  },
  J: {
    name_en: "Health, Education & Human Development",
    name_ne: "स्वास्थ्य, शिक्षा र मानव विकास",
    color: "#db2777",
    slug: "health-education-human-development",
  },
  K: {
    name_en: "Agriculture, Land & Infrastructure",
    name_ne: "कृषि, भूमि र पूर्वाधार",
    color: "#65a30d",
    slug: "agriculture-land-infrastructure",
  },
  L: {
    name_en: "Other Strategic & Social Security Decisions",
    name_ne: "अन्य रणनीतिक र सामाजिक सुरक्षा निर्णय",
    color: "#374151",
    slug: "other-strategic-social-security-decisions",
  },
};

type RawCommitment = {
  point: number;
  categoryId: keyof typeof categoryMeta;
  title_en: string;
  title_ne?: string;
  description_en?: string;
  description_ne?: string;
  ministry: string;
  responsible_ministry_en?: string;
  responsible_ministry_ne?: string;
  deadline_type: DeadlineType;
  deadline_days: number | null;
  status?: Status;
  progress?: number;
  sub_commitments?: Omit<import("@/types").SubCommitment, "id">[];
  shared_ministries?: string[];
};

const raw: RawCommitment[] = [
  {
    point: 1,
    categoryId: "A",
    title_en:
      "Express gratitude to Election Commission and security forces for fair March 5, 2026 elections",
    ministry: "Prime Minister's Office",
    deadline_type: "immediate",
    deadline_days: 0,
  },
  {
    point: 2,
    categoryId: "A",
    title_en:
      "Each ministry prepares 10-point action plan with KPIs and monthly reporting to PM Office",
    ministry: "Prime Minister's Office",
    deadline_type: "days",
    deadline_days: 7,
  },
  {
    point: 3,
    categoryId: "A",
    title_en:
      "Synthesize all party manifestos into a National Commitment linked to budgets and policy",
    ministry: "Prime Minister's Office",
    deadline_type: "ongoing",
    deadline_days: null,
  },
  {
    point: 4,
    categoryId: "A",
    title_en: "Form task force for Constitutional Amendment Discussion Paper",
    ministry: "Prime Minister's Office",
    deadline_type: "days",
    deadline_days: 7,
  },
  {
    point: 5,
    categoryId: "A",
    title_en:
      "Issue formal state apology to Dalit and marginalized communities with reform programs",
    ministry: "Prime Minister's Office",
    deadline_type: "days",
    deadline_days: 15,
  },
  {
    point: 6,
    categoryId: "A",
    title_en:
      "Launch rehabilitation and employment package for Sept 2025 movement victims",
    ministry: "Prime Minister's Office",
    deadline_type: "days",
    deadline_days: 100,
  },
  {
    point: 7,
    categoryId: "A",
    title_en: "Form high-level inquiry committee on September 9, 2025 events",
    ministry: "Prime Minister's Office",
    deadline_type: "days",
    deadline_days: 7,
  },
  {
    point: 8,
    categoryId: "A",
    title_en:
      "Implement recommendations of Gauri Bahadur Karki commission report",
    ministry: "Prime Minister's Office",
    deadline_type: "days",
    deadline_days: 30,
  },

  {
    point: 9,
    categoryId: "B",
    title_en: "Reduce federal ministries from 22 to 17",
    ministry: "Prime Minister's Office",
    deadline_type: "days",
    deadline_days: 30,
    status: "in_progress",
    progress: 25,
  },
  {
    point: 10,
    categoryId: "B",
    title_en:
      "Business Process Re-engineering to cap decision making at 3 tiers",
    ministry: "Federal Affairs & General Administration",
    deadline_type: "days",
    deadline_days: 30,
  },
  {
    point: 11,
    categoryId: "B",
    title_en: "Dissolve or merge unproductive boards, committees and projects",
    ministry: "Prime Minister's Office",
    deadline_type: "months",
    deadline_days: 30,
  },
  {
    point: 12,
    categoryId: "B",
    title_en:
      "Ban partisan affiliations among civil servants, teachers and professors",
    ministry: "Federal Affairs & General Administration",
    description_en:
      "Apply an immediate ban on partisan affiliations; amend the Federal Civil Service Bill within 45 days of the cabinet decision (by 12 May 2026).",
    deadline_type: "days",
    deadline_days: 45,
  },
  {
    point: 13,
    categoryId: "B",
    title_en: "Strict implementation of employee code of conduct",
    ministry: "Federal Affairs & General Administration",
    deadline_type: "immediate",
    deadline_days: 0,
  },
  {
    point: 14,
    categoryId: "B",
    title_en: "Approve national Organization and Management survey standards",
    ministry: "Federal Affairs & General Administration",
    deadline_type: "days",
    deadline_days: 15,
  },
  {
    point: 15,
    categoryId: "B",
    title_en:
      "Move teacher retirement and records to provincial education ministries",
    ministry: "Education, Science & Technology",
    deadline_type: "fiscal_year",
    deadline_days: 365,
  },
  {
    point: 16,
    categoryId: "B",
    title_en:
      "Introduce job-specific KPIs in 45 days and review system in 90 days",
    ministry: "Federal Affairs & General Administration",
    deadline_type: "days",
    deadline_days: 45,
  },
  {
    point: 17,
    categoryId: "B",
    title_en: "Create service quality certification standards for local levels",
    ministry: "Federal Affairs & General Administration",
    deadline_type: "days",
    deadline_days: 45,
  },
  {
    point: 18,
    categoryId: "B",
    title_en: "Standardize government office layout and infrastructure",
    ministry: "Federal Affairs & General Administration",
    deadline_type: "days",
    deadline_days: 100,
  },
  {
    point: 19,
    categoryId: "B",
    title_en:
      "Build architecture for automated Personnel Management Information System (PMIS)",
    ministry: "Federal Affairs & General Administration",
    deadline_type: "months",
    deadline_days: 90,
  },

  {
    point: 20,
    categoryId: "C",
    title_en:
      "Establish citizen service centers in major cities for 12+ hours daily service",
    ministry: "Federal Affairs & General Administration",
    deadline_type: "ongoing",
    deadline_days: null,
  },
  {
    point: 21,
    categoryId: "C",
    title_en:
      "Use National ID as primary identity and allow services from any district",
    ministry: "Home Affairs",
    shared_ministries: ["Federal Affairs & General Administration"],
    deadline_type: "ongoing",
    deadline_days: null,
  },
  {
    point: 22,
    categoryId: "C",
    title_en: "Compile and train front-desk service staff",
    ministry: "Federal Affairs & General Administration",
    deadline_type: "days",
    deadline_days: 15,
  },
  {
    point: 23,
    categoryId: "C",
    title_en: "Conduct time and motion study for office restructuring",
    ministry: "Federal Affairs & General Administration",
    deadline_type: "months",
    deadline_days: 30,
  },
  {
    point: 24,
    categoryId: "C",
    title_en: "Launch 24-hour multi-channel national grievance system",
    ministry: "Prime Minister's Office",
    deadline_type: "ongoing",
    deadline_days: null,
  },
  {
    point: 25,
    categoryId: "C",
    title_en: "Upgrade Hello Sarkar into a real-time citizen dialogue platform",
    ministry: "Prime Minister's Office",
    deadline_type: "ongoing",
    deadline_days: null,
  },
  {
    point: 26,
    categoryId: "C",
    title_en:
      "Enable faceless digital delivery for passports, licenses and citizenship",
    ministry: "Home Affairs",
    deadline_type: "days",
    deadline_days: 100,
  },
  {
    point: 27,
    categoryId: "C",
    title_en: "Deliver official documents to homes through government courier",
    ministry: "Communication & IT",
    deadline_type: "days",
    deadline_days: 100,
  },

  {
    point: 28,
    categoryId: "D",
    title_en:
      "Strengthen Government Integrated Office Management System (GIOMS)",
    ministry: "Communication & IT",
    deadline_type: "days",
    deadline_days: 100,
  },
  {
    point: 29,
    categoryId: "D",
    title_en: "Implement Ask Once auto-fill policy using national ID",
    ministry: "Communication & IT",
    deadline_type: "days",
    deadline_days: 60,
  },
  {
    point: 30,
    categoryId: "D",
    title_en:
      "Ensure all government portals are accessible for persons with disabilities",
    ministry: "Communication & IT",
    deadline_type: "days",
    deadline_days: 100,
  },
  {
    point: 31,
    categoryId: "D",
    title_en: "Expand Nagarik App for police, passport and license workflows",
    ministry: "Communication & IT",
    deadline_type: "days",
    deadline_days: 45,
  },
  {
    point: 32,
    categoryId: "D",
    title_en: "Introduce digital appointment system for in-person services",
    ministry: "Communication & IT",
    deadline_type: "months",
    deadline_days: 90,
  },
  {
    point: 33,
    categoryId: "D",
    title_en: "Enable e-signatures through biometrics, NID and OTP",
    ministry: "Home Affairs",
    shared_ministries: ["Communication & IT"],
    deadline_type: "ongoing",
    deadline_days: null,
  },
  {
    point: 34,
    categoryId: "D",
    title_en:
      "Implement desk-time alert system for delayed file movement in GIOMS",
    ministry: "Communication & IT",
    deadline_type: "days",
    deadline_days: 30,
  },
  {
    point: 35,
    categoryId: "D",
    title_en:
      "Allow citizens to download official certificates to phone or email",
    ministry: "Communication & IT",
    deadline_type: "days",
    deadline_days: 15,
  },
  {
    point: 36,
    categoryId: "D",
    title_en: "Establish National Integrated Digital Governance Platform",
    ministry: "Communication & IT",
    deadline_type: "days",
    deadline_days: 100,
  },
  {
    point: 37,
    categoryId: "D",
    title_en: "Draft personal data protection and digital governance policy",
    ministry: "Communication & IT",
    deadline_type: "days",
    deadline_days: 60,
  },
  {
    point: 38,
    categoryId: "D",
    title_en: "Create legal path for independent IT regulatory authority",
    ministry: "Communication & IT",
    deadline_type: "days",
    deadline_days: 60,
  },
  {
    point: 39,
    categoryId: "D",
    title_en: "Create specialized IT and E-Governance Office under PM Office",
    ministry: "Prime Minister's Office",
    deadline_type: "months",
    deadline_days: 90,
  },
  {
    point: 40,
    categoryId: "D",
    title_en: "Draft Information Technology and E-Governance Bill",
    ministry: "Communication & IT",
    deadline_type: "days",
    deadline_days: 60,
  },
  {
    point: 41,
    categoryId: "D",
    title_en: "Prepare National Enterprise Architecture Framework",
    ministry: "Communication & IT",
    deadline_type: "days",
    deadline_days: 60,
  },
  {
    point: 42,
    categoryId: "D",
    title_en: "Shut down all betting apps and websites",
    ministry: "Communication & IT",
    deadline_type: "days",
    deadline_days: 1,
    status: "in_progress",
    progress: 35,
  },

  {
    point: 43,
    categoryId: "E",
    title_en:
      "Form empowered wealth investigation committee covering 1991 to present",
    ministry: "Prime Minister's Office",
    deadline_type: "days",
    deadline_days: 15,
    status: "in_progress",
    progress: 25,
  },
  {
    point: 44,
    categoryId: "E",
    title_en: "Restructure National Vigilance Center",
    ministry: "Prime Minister's Office",
    deadline_type: "days",
    deadline_days: 30,
  },
  {
    point: 45,
    categoryId: "E",
    title_en: "Build digital asset registry with red-flag alerts",
    ministry: NRB,
    shared_ministries: ["Finance"],
    deadline_type: "days",
    deadline_days: 100,
    status: "in_progress",
    progress: 20,
  },
  {
    point: 46,
    categoryId: "E",
    title_en: "Publish second National Anti-Corruption Action Plan",
    ministry: "Prime Minister's Office",
    deadline_type: "days",
    deadline_days: 15,
  },
  {
    point: 47,
    categoryId: "E",
    title_en:
      "Issue National Integrity Policy and Whistleblower Protection rules",
    ministry: "Prime Minister's Office",
    shared_ministries: ["Law, Justice & Parliamentary Affairs"],
    deadline_type: "days",
    deadline_days: 30,
  },

  {
    point: 48,
    categoryId: "F",
    title_en:
      "Amend Public Procurement Act for value-for-money and digital marketplace",
    ministry: "Finance",
    deadline_type: "days",
    deadline_days: 30,
  },
  {
    point: 49,
    categoryId: "F",
    title_en:
      "Create national project pipeline and project facilitation mechanism",
    ministry: "National Planning Commission",
    shared_ministries: ["Prime Minister's Office", "Finance"],
    deadline_type: "months",
    deadline_days: 60,
    sub_commitments: [
      {
        title_en: "Create National Project Pipeline with investment modality",
        title_ne:
          "लगानीको ढाँचा सहितको राष्ट्रिय परियोजना बैंक (पाइपलाइन) निर्माण",
        deadline_days: 60,
        status: "not_started",
      },
      {
        title_en: "Form study team to review stalled and sick projects",
        title_ne: "रुग्ण र अलपत्र आयोजनाको अध्ययन गर्न कार्यदल गठन",
        deadline_days: 30,
        status: "not_started",
      },
      {
        title_en:
          "Establish Fast-Track Mechanism for National Pride projects (land, EIA)",
        title_ne:
          "राष्ट्रिय गौरवका आयोजनाका लागि फास्ट ट्र्याक संयन्त्र (जग्गा प्राप्ति, EIA)",
        deadline_days: null,
        status: "not_started",
      },
      {
        title_en:
          "Draft law to execute twice-failed bidding projects via govt infrastructure company",
        title_ne:
          "दुई पटक ठेक्का नलागेका आयोजना सरकारी पूर्वाधार कम्पनीबाट अघि बढाउने कानुन मस्यौदा",
        deadline_days: 30,
        status: "not_started",
      },
    ],
  },
  {
    point: 50,
    categoryId: "F",
    title_en: "Build data-based end-to-end e-procurement monitoring system",
    ministry: "Finance",
    deadline_type: "days",
    deadline_days: 90,
  },
  {
    point: 51,
    categoryId: "F",
    title_en: "Draft umbrella law for project facilitation",
    ministry: "Law, Justice & Parliamentary Affairs",
    deadline_type: "days",
    deadline_days: 60,
  },
  {
    point: 52,
    categoryId: "F",
    title_en: "Install strategic weigh-bridges and monitor stalled projects",
    ministry: "Physical Infrastructure & Transport",
    deadline_type: "days",
    deadline_days: 45,
  },

  {
    point: 53,
    categoryId: "G",
    title_en: "Empower Department of Industry one-stop service center",
    ministry: "Industry, Commerce & Supplies",
    deadline_type: "ongoing",
    deadline_days: null,
  },
  {
    point: 54,
    categoryId: "G",
    title_en:
      "Categorize major projects into public, PPP and private modalities",
    ministry: "Investment Board Nepal",
    shared_ministries: ["National Planning Commission", "Finance"],
    deadline_type: "days",
    deadline_days: 90,
  },
  {
    point: 55,
    categoryId: "G",
    title_en: "Implement one-door approval at Investment Board",
    ministry: "Investment Board Nepal",
    deadline_type: "months",
    deadline_days: 30,
  },
  {
    point: 56,
    categoryId: "G",
    title_en: "Launch Startup Fast Track with 2-day business registration",
    ministry: "Industry, Commerce & Supplies",
    deadline_type: "days",
    deadline_days: 2,
  },
  {
    point: 57,
    categoryId: "G",
    title_en: "Reduce risk weightage for SME, agriculture and IT lending",
    ministry: NRB,
    shared_ministries: ["Finance"],
    deadline_type: "days",
    deadline_days: 30,
  },
  {
    point: 58,
    categoryId: "G",
    title_en: "Launch integrated one-door business platform",
    ministry: "Industry, Commerce & Supplies",
    deadline_type: "days",
    deadline_days: 45,
  },
  {
    point: 59,
    categoryId: "G",
    title_en:
      "Rebrand employment centers to Employment, Skill and Entrepreneurship Centers",
    ministry: "Education, Science & Technology",
    shared_ministries: [
      "Labour, Employment & Social Security",
      "Industry, Commerce & Supplies",
    ],
    deadline_type: "days",
    deadline_days: 60,
  },
  {
    point: 60,
    categoryId: "G",
    title_en: "Implement Private Sector Protection and Promotion Strategy",
    ministry: "Prime Minister's Office",
    deadline_type: "ongoing",
    deadline_days: null,
    status: "in_progress",
    progress: 20,
  },
  {
    point: 61,
    categoryId: "G",
    title_en:
      "Create rapid response industrial and business security mechanism",
    ministry: "Home Affairs",
    deadline_type: "days",
    deadline_days: 30,
  },
  {
    point: 62,
    categoryId: "G",
    title_en:
      "Take strict legal action against looting and attacks on private property",
    ministry: "Home Affairs",
    deadline_type: "immediate",
    deadline_days: 0,
  },
  {
    point: 63,
    categoryId: "G",
    title_en:
      "Issue subsidized interest and rehabilitation package for unrest-affected businesses",
    ministry: NRB,
    shared_ministries: ["Finance"],
    deadline_type: "ongoing",
    deadline_days: null,
  },
  {
    point: 64,
    categoryId: "G",
    title_en:
      "Create PM Delivery Unit and central dashboard for national projects",
    ministry: "Prime Minister's Office",
    deadline_type: "ongoing",
    deadline_days: null,
    status: "in_progress",
    progress: 25,
  },
  {
    point: 65,
    categoryId: "G",
    title_en:
      "Integrate overlapping roles of Investment Board, Industry Department and Trade Center",
    ministry: "Prime Minister's Office",
    shared_ministries: [
      "Investment Board Nepal",
      "Industry, Commerce & Supplies",
    ],
    deadline_type: "days",
    deadline_days: 30,
  },
  {
    point: 66,
    categoryId: "G",
    title_en:
      "Eliminate registration fees for industries up to NPR 25 crore and simplify process",
    ministry: "Industry, Commerce & Supplies",
    deadline_type: "days",
    deadline_days: 45,
  },
  {
    point: 67,
    categoryId: "G",
    title_en:
      "Enable automatic data exchange between Company Registrar and Industry Department",
    ministry: "Industry, Commerce & Supplies",
    deadline_type: "months",
    deadline_days: 60,
  },
  {
    point: 68,
    categoryId: "G",
    title_en:
      "Amend laws to channel CSR funds into government-priority sectors",
    ministry: "Finance",
    deadline_type: "months",
    deadline_days: 90,
  },
  {
    point: 69,
    categoryId: "G",
    title_en:
      "Implement SME protection strategy and business rehabilitation mechanism",
    ministry: "Industry, Commerce & Supplies",
    shared_ministries: ["Prime Minister's Office", "Home Affairs", "Finance"],
    deadline_type: "ongoing",
    deadline_days: null,
    sub_commitments: [
      {
        title_en: "Draft Private Sector Protection Strategy",
        title_ne: "निजी क्षेत्र संरक्षण रणनीति",
        deadline_days: 0,
        status: "not_started",
      },
      {
        title_en:
          "Prioritize administrative facilitation for disrupted businesses",
        title_ne: "अवरोध प्रभावित व्यवसायहरूको प्रशासनिक सहजीकरण",
        deadline_days: null,
        status: "not_started",
      },
      {
        title_en: "Collect damage data and issue relief/rehabilitation package",
        title_ne: "क्षतिको तथ्यांक संकलन र राहत/पुनर्स्थापना प्याकेज",
        deadline_days: null,
        status: "not_started",
      },
      {
        title_en: "Activate PM-chaired Industry-Commerce Dialogue Council",
        title_ne:
          "प्रधानमन्त्रीको अध्यक्षतामा रहेको उद्योग–वाणिज्य संवाद परिषद् सक्रिय बनाउने",
        deadline_days: 0,
        status: "not_started",
      },
    ],
  },
  {
    point: 70,
    categoryId: "G",
    title_en:
      "Keep transport and trade routes uninterrupted for import and export",
    ministry: "Home Affairs",
    deadline_type: "immediate",
    deadline_days: 0,
  },
  {
    point: 71,
    categoryId: "G",
    title_en: "Implement beneficial ownership disclosure and BEPS standards",
    ministry: "Finance",
    deadline_type: "ongoing",
    deadline_days: null,
  },
  {
    point: 72,
    categoryId: "G",
    title_en:
      "Publish organized tourism expansion roadmap for priority destinations",
    ministry: "Culture, Tourism & Civil Aviation",
    deadline_type: "months",
    deadline_days: 30,
  },
  {
    point: 73,
    categoryId: "G",
    title_en: "Launch Wellness Tourism Strategy and Nepal Wellness Year 2027",
    ministry: "Culture, Tourism & Civil Aviation",
    deadline_type: "days",
    deadline_days: 15,
  },

  {
    point: 74,
    categoryId: "H",
    title_en:
      "Multi-dimensional energy export, PPA strategy and institutional reform",
    ministry: "Energy, Water Resources & Irrigation",
    shared_ministries: ["Finance", "Prime Minister's Office"],
    deadline_type: "months",
    deadline_days: 30,
    sub_commitments: [
      {
        title_en: "Finalize national energy export strategy",
        title_ne: "राष्ट्रिय ऊर्जा निर्यात रणनीतिलाई अन्तिम रूप दिने",
        deadline_days: 30,
        status: "not_started",
      },
      {
        title_en: "Decide all pending power purchase agreements (PPAs)",
        title_ne:
          "प्रतीक्षामा रहेका सबै विद्युत् खरिद सम्झौता (PPA) को निर्णय गर्ने",
        deadline_days: 180,
        status: "not_started",
      },
      {
        title_en: "Focus electricity export on high-value peak-hour markets",
        title_ne:
          "पिक-आवरको उच्च मूल्य बजारमा विद्युत् निर्यातमा केन्द्रित हुने",
        deadline_days: 0,
        status: "not_started",
      },
      {
        title_en: "Implement NEA structural reform roadmap",
        title_ne:
          "नेपाल विद्युत् प्राधिकरणको संरचनागत सुधार मार्गचित्र कार्यान्वयन",
        deadline_days: 0,
        status: "not_started",
      },
      {
        title_en: "Establish multi-dimensional financing structure for energy",
        title_ne: "ऊर्जाको लागि बहुआयामिक वित्तपोषण संरचना स्थापना",
        deadline_days: null,
        status: "not_started",
      },
    ],
  },
  {
    point: 75,
    categoryId: "H",
    title_en:
      "Create Kathmandu water and sewage high-level coordination taskforce",
    ministry: "Prime Minister's Office",
    shared_ministries: ["Water Supply", "Health & Population"],
    deadline_type: "ongoing",
    deadline_days: null,
  },
  {
    point: 76,
    categoryId: "H",
    title_en:
      "Protect Phewa Lake through encroachment removal and watershed conservation",
    ministry: "Forests & Environment",
    deadline_type: "months",
    deadline_days: 90,
  },
  {
    point: 77,
    categoryId: "H",
    title_en: "Present Urban Development and Waste Management bills to Cabinet",
    ministry: "Urban Development",
    deadline_type: "months",
    deadline_days: 60,
  },

  {
    point: 78,
    categoryId: "I",
    title_en:
      "Transfer money from inactive 10+ year bank accounts to state treasury",
    ministry: "Finance",
    deadline_type: "days",
    deadline_days: 90,
  },
  {
    point: 79,
    categoryId: "I",
    title_en: "Make e-billing mandatory for all large businesses",
    ministry: "Finance",
    deadline_type: "months",
    deadline_days: 30,
  },
  {
    point: 80,
    categoryId: "I",
    title_en: "Automate tax administration and control leakage",
    ministry: "Finance",
    deadline_type: "days",
    deadline_days: 45,
  },
  {
    point: 81,
    categoryId: "I",
    title_en:
      "Consolidate scattered funds into high-return development projects",
    ministry: "Finance",
    deadline_type: "days",
    deadline_days: 60,
  },
  {
    point: 82,
    categoryId: "I",
    title_en: "Cancel inactive mining licenses and modernize mining labs",
    ministry: "Industry, Commerce & Supplies",
    deadline_type: "months",
    deadline_days: 90,
  },
  {
    point: 83,
    categoryId: "I",
    title_en: "Restructure customs for trade facilitation and enforce MRP",
    ministry: "Finance",
    deadline_type: "ongoing",
    deadline_days: null,
  },
  {
    point: 84,
    categoryId: "I",
    title_en:
      "Create legal basis to use dormant court and government deposits for development",
    ministry: "Law, Justice & Parliamentary Affairs",
    shared_ministries: ["Finance"],
    deadline_type: "days",
    deadline_days: 60,
  },

  {
    point: 85,
    categoryId: "J",
    title_en:
      "Enforce free-bed quota, Free Health Portal, and upgrade hospital facilities",
    ministry: "Health & Population",
    deadline_type: "days",
    deadline_days: 30,
    sub_commitments: [
      {
        title_en: "Enforce 10% free bed quota and launch Free Health Portal",
        title_ne: "१०% निःशुल्क शय्या र निःशुल्क स्वास्थ्य पोर्टल",
        deadline_days: 30,
        status: "not_started",
      },
      {
        title_en: "Digital Patient Record System and Refer Protocol",
        title_ne: "डिजिटल बिरामी रेकर्ड र रिफर प्रोटोकल",
        deadline_days: 90,
        status: "not_started",
      },
      {
        title_en: "Hospital attendance monitoring and cleanliness audit",
        title_ne: "अस्पताल हाजिरी अनुगमन र सरसफाई अडिट",
        deadline_days: 7,
        status: "not_started",
      },
      {
        title_en: "Digital pharmacy stock/price display and 'Sulav Pharmacy'",
        title_ne: "सुलभ फार्मेसी र डिजिटल स्टक/मूल्य प्रदर्शन",
        deadline_days: 100,
        status: "not_started",
      },
      {
        title_en:
          "Establish Burn Ward in most hospitals for subsidized treatment",
        title_ne: "अस्पतालहरूमा बर्न वार्ड स्थापना",
        deadline_days: 30,
        status: "not_started",
      },
      {
        title_en: "Ensure Air Ambulance on standby in remote hill regions",
        title_ne: "दुर्गम पहाडी क्षेत्रमा एयर एम्बुलेन्स स्ट्यान्डबाय",
        deadline_days: 0,
        status: "not_started",
      },
    ],
  },
  {
    point: 86,
    categoryId: "J",
    title_en:
      "Replace political student unions with non-partisan Student Councils",
    ministry: "Education, Science & Technology",
    deadline_type: "days",
    deadline_days: 90,
  },
  {
    point: 87,
    categoryId: "J",
    title_en:
      "Synchronize university exam result publication with academic calendar",
    ministry: "Education, Science & Technology",
    deadline_type: "ongoing",
    deadline_days: null,
  },
  {
    point: 88,
    categoryId: "J",
    title_en: "Allow bachelor enrollment without citizenship certificate",
    ministry: "Education, Science & Technology",
    deadline_type: "immediate",
    deadline_days: 0,
  },
  {
    point: 89,
    categoryId: "J",
    title_en:
      "Replace internal exams up to Grade 5 with psychological assessment",
    ministry: "Education, Science & Technology",
    deadline_type: "fiscal_year",
    deadline_days: 365,
  },

  {
    point: 90,
    categoryId: "K",
    title_en:
      "Fix minimum support prices for major crops and ensure timely payments",
    ministry: "Agriculture & Livestock Development",
    deadline_type: "days",
    deadline_days: 30,
    sub_commitments: [
      {
        title_en: "Fix Minimum Support Price for major crops",
        title_ne: "मुख्य बालीहरूको न्यूनतम समर्थन मूल्य तोक्ने",
        deadline_days: 30,
        status: "not_started",
      },
      {
        title_en:
          "Mandatory payment within 25 days and cold storage feasibility",
        title_ne: "२५ दिनभित्र भुक्तानी र शीत भण्डार सम्भाव्यता",
        deadline_days: 10,
        status: "not_started",
      },
      {
        title_en: "Issue Soil Health Card for commercial farmers",
        title_ne: "व्यावसायिक किसानका लागि माटो स्वास्थ्य कार्ड",
        deadline_days: 90,
        status: "not_started",
      },
    ],
  },
  {
    point: 91,
    categoryId: "K",
    title_en:
      "Digitize landless records in 60 days and resolve within 1,000 days",
    ministry: "Land Management, Cooperatives & Poverty Alleviation",
    deadline_type: "days",
    deadline_days: 60,
    sub_commitments: [
      {
        title_en: "Complete integrated digital records and verification",
        title_ne:
          "एकीकृत डिजिटल लगत सङ्कलन तथा प्रमाणीकरण ६० दिनभित्र पूरा गर्ने",
        deadline_days: 60,
        status: "not_started",
      },
      {
        title_en: "Resolve landless settlement process within 1,000 days",
        title_ne: "भूमिहीन समस्या समाधान १००० दिनभित्र सम्पन्न गर्ने",
        deadline_days: 1000,
        status: "not_started",
      },
    ],
  },
  {
    point: 92,
    categoryId: "K",
    title_en:
      "Remove encroachment on public land and investigate Nepal Bal Sangathan per Haribaboo report",
    ministry: "Land Management, Cooperatives & Poverty Alleviation",
    shared_ministries: ["Home Affairs"],
    deadline_type: "immediate",
    deadline_days: 0,
    sub_commitments: [
      {
        title_en:
          "Begin Haribaboo Commission based Nepal Bal Sangathan investigation",
        title_ne:
          "हरिबाबु आयोग प्रतिवेदनअनुसार नेपाल बाल संगठनसम्बन्धी अनुसन्धान १५ दिनभित्र सुरु गर्ने",
        deadline_days: 15,
        status: "not_started",
      },
    ],
  },

  {
    point: 93,
    categoryId: "L",
    title_en: "Amend rules for frozen and seized criminal assets",
    ministry: "Law, Justice & Parliamentary Affairs",
    deadline_type: "months",
    deadline_days: 60,
  },
  {
    point: 94,
    categoryId: "L",
    title_en: "Allocate NPR 10 million to upgrade CIB technology immediately",
    ministry: "Home Affairs",
    deadline_type: "immediate",
    deadline_days: 0,
  },
  {
    point: 95,
    categoryId: "L",
    title_en:
      "Form inter-ministerial taskforce to study Middle East crisis impacts",
    ministry: "Foreign Affairs",
    deadline_type: "days",
    deadline_days: 30,
    sub_commitments: [
      {
        title_en:
          "Submit initial assessment report with short/mid/long-term measures",
        title_ne:
          "अल्पकालीन, मध्यकालीन र दीर्घकालीन उपायसहित प्रारम्भिक प्रतिवेदन ७ दिनभित्र पेश गर्ने",
        deadline_days: 7,
        status: "not_started",
      },
    ],
  },
  {
    point: 96,
    categoryId: "L",
    title_en: "Clear or auction vehicles stuck in customs yards",
    ministry: "Finance",
    deadline_type: "immediate",
    deadline_days: 0,
  },
  {
    point: 97,
    categoryId: "L",
    title_en:
      "Launch free Blue Bus service in all 7 provinces with 25 buses in 100 days",
    ministry: "Physical Infrastructure & Transport",
    shared_ministries: ["Women, Children & Senior Citizens"],
    deadline_type: "days",
    deadline_days: 100,
  },
  {
    point: 98,
    categoryId: "L",
    title_en:
      "Mandate CCTV and dashcams in public transport with SOS integration",
    ministry: "Physical Infrastructure & Transport",
    shared_ministries: ["Home Affairs"],
    deadline_type: "days",
    deadline_days: 30,
  },
  {
    point: 99,
    categoryId: "L",
    title_en:
      "Start refund process for small depositors in troubled cooperatives",
    ministry: "Land Management, Cooperatives & Poverty Alleviation",
    deadline_type: "days",
    deadline_days: 100,
  },
  {
    point: 100,
    categoryId: "L",
    title_en:
      "National Unity Call: Appeal to all stakeholders to cooperate in fulfilling national duties",
    ministry: "Prime Minister's Office",
    deadline_type: "ongoing",
    deadline_days: null,
  },
];

const addDays = (base: Date, days: number) => {
  const result = new Date(base);
  result.setDate(result.getDate() + days);
  return result;
};

const iso = (date: Date) => date.toISOString();

const nepalDate = (yyyyMmDd: string) => new Date(`${yyyyMmDd}T00:00:00+05:45`);

const toDeadlineDate = (item: RawCommitment): Date => {
  const explicitDate = EXPLICIT_DUE_DATES[item.point];
  if (explicitDate) {
    return nepalDate(explicitDate);
  }

  if (item.deadline_days === null) {
    return addDays(BASE_DATE, 100);
  }

  return addDays(BASE_DATE, Math.max(item.deadline_days, 0));
};

export const commitments: Commitment[] = raw.map((item) => {
  const meta = categoryMeta[item.categoryId];
  const deadlineDate = toDeadlineDate(item);
  const status = item.status ?? "not_started";
  const ministryEn = item.responsible_ministry_en ?? item.ministry;
  const ministryNe =
    item.responsible_ministry_ne ?? ministryLabel(ministryEn, "ne");
  const neCopy = nepaliCopyForPoint(item.point);
  const descriptionEn = item.description_en ?? item.title_en;

  return {
    id: String(item.point),
    point_number: item.point,
    title_en: item.title_en,
    title_ne: item.title_ne ?? neCopy?.title ?? item.title_en,
    description_en: descriptionEn,
    description_ne:
      item.description_ne ??
      neCopy?.description ??
      neCopy?.title ??
      descriptionEn,
    category_id: item.categoryId,
    category_name_en: meta.name_en,
    category_name_ne: meta.name_ne,
    category: meta.name_en,
    ministry: ministryEn,
    responsible_ministry: ministryEn,
    responsible_ministry_en: ministryEn,
    responsible_ministry_ne: ministryNe,
    shared_ministries: item.shared_ministries ?? [],
    status,
    progress_percentage: item.progress ?? (status === "in_progress" ? 20 : 0),
    deadline_type: item.deadline_type,
    deadline_days: item.deadline_days,
    sub_commitments: item.sub_commitments?.map((sub, i) => ({
      ...sub,
      id: `${item.point}-${String.fromCharCode(97 + i)}`,
    })),
    deadline: deadlineDate.toISOString().slice(0, 10),
    deadline_date: deadlineDate.toISOString().slice(0, 10),
    difficulty_rating: "medium",
    importance_score: 0,
    last_updated: iso(new Date("2026-03-29T12:00:00+05:45")),
    editorial_summary_en: "Pending editorial assessment.",
    editorial_summary_ne: "सम्पादकीय विश्लेषण चाँडै प्रकाशन हुनेछ।",
    evidence_url: null,
    created_at: iso(BASE_DATE),
    updated_at: iso(new Date("2026-03-29T12:00:00+05:45")),
  };
});

export const commitmentsById = new Map(
  commitments.map((item) => [item.id, item]),
);

export const ministryList = Array.from(
  new Set(commitments.map((item) => item.responsible_ministry)),
).sort((a, b) => a.localeCompare(b));

export const categoryList = Object.entries(categoryMeta).map(([id, meta]) => ({
  id,
  ...meta,
}));
