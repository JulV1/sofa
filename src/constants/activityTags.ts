
import { MultiSelectOption } from "@/components/ui/multi-select";

export const ACTIVITY_TAGS: MultiSelectOption[] = [
  {
    value: "ohrozene-deti",
    label: "🟦 Ohrožené děti",
  },
  {
    value: "wellbeing",
    label: "🟩 Wellbeing (duševní pohoda)",
  },
  {
    value: "pbis",
    label: "🟨 PBIS (pozitivní chování ve školách)",
  },
  {
    value: "socio-emocni-uceni",
    label: "🟪 Socio-emoční učení",
  },
  {
    value: "spolecne-vzdelavani",
    label: "🟦‍🟫 Společné vzdělávání",
  },
  {
    value: "rodicovske-kompetence",
    label: "🟧 Rodičovské kompetence",
  },
  {
    value: "prevence-nasili",
    label: "🟥 Prevence násilí v blízkých vztazích",
  },
  {
    value: "trauma-pristup",
    label: "⬜ Trauma respektující přístup",
  },
  {
    value: "rozvoj-pedagoga",
    label: "🩷 Rozvoj dovedností pedagoga",
  },
  {
    value: "psychicka-odolnost",
    label: "🟩‍⬛ Posilování psychické odolnosti dětí",
  },
];

export const getTagColor = (tagValue: string): string => {
  const colors: Record<string, string> = {
    'ohrozene-deti': '#1EAEDB',        // modrá
    'wellbeing': '#F2FCE2',            // zelená
    'pbis': '#FEF7CD',                 // žlutá
    'socio-emocni-uceni': '#9b87f5',   // fialová
    'spolecne-vzdelavani': '#33C3F0',  // tyrkysová
    'rodicovske-kompetence': '#F97316', // oranžová
    'prevence-nasili': '#ea384c',      // červená
    'trauma-pristup': '#ffffff',        // bílá
    'rozvoj-pedagoga': '#D946EF',      // růžová
    'psychicka-odolnost': '#166534',    // tmavě zelená
  };
  
  return colors[tagValue] || '#6E59A5'; // default color if tag not found
};
