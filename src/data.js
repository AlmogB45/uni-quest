export const COURSES = [
  {
    id: "organic_chem_b",
    title: "כימיה אורגנית ב׳",
    icon: "FlaskConical",
    color: "#ec4899", // pink
    description: "חקר תרכובות פחמן, תגובות מורכבות ומנגנונים אורגניים.",
    lessons: [
      { id: "oc_1", title: "מבוא ותרמודינמיקה", completed: false },
      { id: "oc_2", title: "תגובות אלימינציה והתמרה", completed: false },
      { id: "oc_3", title: "תרכובות ארומטיות", completed: false },
      { id: "oc_4", title: "קרבונילים ונגזרותיהם", completed: false },
    ]
  },
  {
    id: "microbiology_a",
    title: "מיקרוביולוגיה א׳",
    icon: "Bug",
    color: "#10b981", // green
    description: "עולם החיידקים, וירוסים ופטריות, והשפעתם על סביבתנו.",
    lessons: [
      { id: "mb_1", title: "מבנה התא החיידקי", completed: false },
      { id: "mb_2", title: "מטבוליזם וגדילה", completed: false },
      { id: "mb_3", title: "גנטיקה של מיקרואורגניזמים", completed: false },
      { id: "mb_4", title: "וירוסים ומיקרוביולוגיה רפואית", completed: false },
    ]
  },
  {
    id: "molecular_biology",
    title: "ביולוגיה מולקולרית",
    icon: "Dna",
    color: "#3b82f6", // blue
    description: "תהליכים תאיים ברמה המולקולרית, מ-DNA ל-RNA לחלבון.",
    lessons: [
      { id: "mol_1", title: "שכפול DNA", completed: false },
      { id: "mol_2", title: "שעתוק ל-RNA", completed: false },
      { id: "mol_3", title: "תרגום לחלבונים", completed: false },
      { id: "mol_4", title: "בקרת ביטוי גנים", completed: false },
    ]
  },
  {
    id: "genetic_engineering",
    title: "הנדסה גנטית",
    icon: "Syringe",
    color: "#8b5cf6", // purple
    description: "שינוי מכוון של חומר תורשתי ליצירת תכונות חדשות.",
    lessons: [
      { id: "ge_1", title: "אנזימי הגבלה ווקטורים", completed: false },
      { id: "ge_2", title: "שיבוט גנים בסיסי", completed: false },
      { id: "ge_3", title: "שיטות PCR וריצוף", completed: false },
      { id: "ge_4", title: "עריכה גנטית - CRISPR", completed: false },
    ]
  },
  {
    id: "instrumental_chemistry",
    title: "כימיה מכשירית",
    icon: "Microscope",
    color: "#f59e0b", // yellow/orange
    description: "שיטות אנליטיות מודרניות ומכשור מעבדה מתקדם.",
    lessons: [
      { id: "ic_1", title: "מבוא לספקטרוסקופיה", completed: false },
      { id: "ic_2", title: "כרומטוגרפיה (HPLC, GC)", completed: false },
      { id: "ic_3", title: "ספקטרומטריית מסות (MS)", completed: false },
      { id: "ic_4", title: "תהודה מגנטית גרעינית (NMR)", completed: false },
    ]
  },
  {
    id: "food_tech",
    title: "טכנולוגיה של המזון ופודטק",
    icon: "UtensilsCrossed",
    color: "#f43f5e", // red
    description: "חדשנות במזון, פיתוח תחליפים ושיפור תהליכי ייצור.",
    lessons: [
      { id: "ft_1", title: "כימיה של המזון", completed: false },
      { id: "ft_2", title: "תהליכי שימור ופיסטור", completed: false },
      { id: "ft_3", title: "תחליפי בשר וחלב", completed: false },
      { id: "ft_4", title: "אריזות חכמות וקיימות", completed: false },
    ]
  }
];
