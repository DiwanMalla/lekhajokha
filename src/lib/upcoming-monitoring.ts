/** Phase 5: commitments to watch in the next 7 days (deadline by 4 Apr 2026). */

export type MonitoringRow = {
  point: number;
  due: string;
  watch_en: string;
  watch_ne: string;
};

export const UPCOMING_MONITORING_WINDOW_END = "2026-04-04";

export const monitoringByPoint: Record<number, MonitoringRow> = {
  2: {
    point: 2,
    due: "2026-04-04",
    watch_en: "Has any ministry formally submitted its 10-point KPI plan?",
    watch_ne: "कुनै मन्त्रालयले औपचारिक रूपमा १० बुँदे योजना पेश गरेको छ?",
  },
  4: {
    point: 4,
    due: "2026-04-04",
    watch_en: "Has the Constitutional Amendment discussion paper task force been announced?",
    watch_ne: "संविधान संशोधन छलफल प्रस्तावपत्रका लागि कार्यदल घोषणा भएको छ?",
  },
  7: {
    point: 7,
    due: "2026-04-04",
    watch_en: "Has the high-level inquiry committee (Sept 2025 events) been formed?",
    watch_ne: "उच्चस्तरीय छानविन समिति गठन भएको छ?",
  },
  95: {
    point: 95,
    due: "2026-04-04",
    watch_en: "Has the Middle East crisis initial assessment report been submitted?",
    watch_ne: "मध्यपूर्व संकट सम्बन्धी प्रारम्भिक प्रतिवेदन पेश भएको छ?",
  },
};
