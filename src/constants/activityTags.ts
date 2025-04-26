
import { MultiSelectOption } from "@/components/ui/multi-select";

export const ACTIVITY_TAGS: MultiSelectOption[] = [
  {
    value: "ohrozene-deti",
    label: "Ohrožené děti",
  },
  {
    value: "wellbeing",
    label: "Wellbeing (duševní pohoda)",
  },
  {
    value: "pbis",
    label: "PBIS (pozitivní chování ve školách)",
  },
  {
    value: "socio-emocni-uceni",
    label: "Socio-emoční učení",
  },
  {
    value: "spolecne-vzdelavani",
    label: "Společné vzdělávání",
  },
  {
    value: "rodicovske-kompetence",
    label: "Rodičovské kompetence",
  },
  {
    value: "prevence-nasili",
    label: "Prevence násilí v blízkých vztazích",
  },
  {
    value: "trauma-pristup",
    label: "Trauma respektující přístup",
  },
  {
    value: "rozvoj-pedagoga",
    label: "Rozvoj dovedností pedagoga",
  },
  {
    value: "psychicka-odolnost",
    label: "Posilování psychické odolnosti dětí",
  },
];

export const getTagColor = (tagValue: string): string => {
  return '#333333'; // Dark gray, neutral and readable on white background
};
