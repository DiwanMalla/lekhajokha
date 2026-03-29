/** Display labels: tracker uses English `responsible_ministry`; map to Nepali for UI. */
const MINISTRY_NE: Record<string, string> = {
  "Nepal Rastra Bank (NRB)": "नेपाल राष्ट्र बैंक (NRB)",
  "Prime Minister's Office": "प्रधानमन्त्री तथा मन्त्रिपरिषद्को कार्यालय",
  "Finance": "अर्थ मन्त्रालय",
  "Law, Justice & Parliamentary Affairs":
    "कानून, न्याय तथा संसदीय मामिला मन्त्रालय",
  "Women, Children & Senior Citizens":
    "महिला, बालबालिका तथा जेष्ठ नागरिक मन्त्रालय",
  "Home Affairs": "गृह मन्त्रालय",
  "Federal Affairs & General Administration":
    "संघीय मामिला तथा सामान्य प्रशासन मन्त्रालय",
  "Education, Science & Technology":
    "शिक्षा, विज्ञान तथा प्रविधि मन्त्रालय",
  "Communication & IT": "सञ्चार तथा सूचना प्रविधि मन्त्रालय",
  "Physical Infrastructure & Transport":
    "भौतिक पूर्वाधार तथा यातायात मन्त्रालय",
  "Industry, Commerce & Supplies": "उद्योग, वाणिज्य तथा आपूर्ति मन्त्रालय",
  "National Planning Commission": "राष्ट्रिय योजना आयोग",
  "Culture, Tourism & Civil Aviation":
    "संस्कृति, पर्यटन तथा नागरिक उड्डयन मन्त्रालय",
  "Energy, Water Resources & Irrigation":
    "ऊर्जा, जलस्रोत तथा सिँचाइ मन्त्रालय",
  "Water Supply": "खानेपानी मन्त्रालय",
  "Forests & Environment": "वन तथा वातावरण मन्त्रालय",
  "Urban Development": "सहरी विकास मन्त्रालय",
  "Health & Population": "स्वास्थ्य तथा जनसंख्या मन्त्रालय",
  "Agriculture & Livestock Development":
    "कृषि तथा पशुपन्छी विकास मन्त्रालय",
  "Land Management, Cooperatives & Poverty Alleviation":
    "भूमिसुधार, सहकारी तथा गरिबी निवारण मन्त्रालय",
  "Foreign Affairs": "परराष्ट्र मन्त्रालय",
  "Labour, Employment & Social Security":
    "श्रम, रोजगार तथा सामाजिक सुरक्षा मन्त्रालय",
  "Investment Board Nepal": "लगानी बोर्ड नेपाल",
};

export function ministryLabel(ministryEn: string, lang: "en" | "ne"): string {
  if (lang === "en") return ministryEn;
  return MINISTRY_NE[ministryEn] ?? ministryEn;
}
