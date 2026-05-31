import { useCallback, useEffect, useState } from "react";

export type Language = "en" | "fr" | "es";

const translations: Record<Language, Record<string, string>> = {
  en: {
    "nav.home": "Home",
    "nav.basics": "Basics",
    "nav.reactions": "Reactions",
    "nav.reactors": "Reactors",
    "nav.radiation": "Radiation",
    "nav.applications": "Applications",
    "nav.safety": "Safety",
    "nav.history": "History",
    "nav.visualizations": "Visualizations",
    "nav.tools": "Tools",
    "nav.learningLab": "Learning Lab",
    "nav.glossary": "Glossary",
    "common.loading": "Loading…",
    "common.error": "Error",
    "common.refresh": "Refresh",
    "common.search": "Search",
    "common.filter": "Filter",
    "common.reset": "Reset",
    "common.export": "Export",
    "common.download": "Download",
    "common.print": "Print",
    "common.share": "Share",
    "common.close": "Close",
    "common.next": "Next",
    "common.previous": "Previous",
    "common.skip": "Skip",
    "home.title": "NuclearEdu",
    "home.subtitle": "Interactive Nuclear Science & Engineering",
    "home.explore": "Explore",
    "tools.calculate": "Calculate",
    "tools.result": "Result",
    "tools.input": "Input",
    "tools.output": "Output",
    "learning.progress": "Progress",
    "learning.score": "Score",
    "learning.attempts": "Attempts",
    "learning.quiz": "Quiz",
    "learning.startQuiz": "Start Quiz",
    "learning.badge": "Badge",
  },
  fr: {
    "nav.home": "Accueil",
    "nav.basics": "Fondamentaux",
    "nav.reactions": "Réactions",
    "nav.reactors": "Réacteurs",
    "nav.radiation": "Radiation",
    "nav.applications": "Applications",
    "nav.safety": "Sécurité",
    "nav.history": "Histoire",
    "nav.visualizations": "Visualisations",
    "nav.tools": "Outils",
    "nav.learningLab": "Laboratoire",
    "nav.glossary": "Glossaire",
    "common.loading": "Chargement…",
    "common.error": "Erreur",
    "common.refresh": "Actualiser",
    "common.search": "Rechercher",
    "common.filter": "Filtrer",
    "common.reset": "Réinitialiser",
    "common.export": "Exporter",
    "common.download": "Télécharger",
    "common.print": "Imprimer",
    "common.share": "Partager",
    "common.close": "Fermer",
    "common.next": "Suivant",
    "common.previous": "Précédent",
    "common.skip": "Passer",
    "home.title": "NuclearEdu",
    "home.subtitle": "Science Nucléaire Interactive",
    "home.explore": "Explorer",
    "tools.calculate": "Calculer",
    "tools.result": "Résultat",
    "tools.input": "Entrée",
    "tools.output": "Sortie",
    "learning.progress": "Progrès",
    "learning.score": "Score",
    "learning.attempts": "Tentatives",
    "learning.quiz": "Quiz",
    "learning.startQuiz": "Commencer",
    "learning.badge": "Badge",
  },
  es: {
    "nav.home": "Inicio",
    "nav.basics": "Fundamentos",
    "nav.reactions": "Reacciones",
    "nav.reactors": "Reactores",
    "nav.radiation": "Radiación",
    "nav.applications": "Aplicaciones",
    "nav.safety": "Seguridad",
    "nav.history": "Historia",
    "nav.visualizations": "Visualizaciones",
    "nav.tools": "Herramientas",
    "nav.learningLab": "Laboratorio",
    "nav.glossary": "Glosario",
    "common.loading": "Cargando…",
    "common.error": "Error",
    "common.refresh": "Actualizar",
    "common.search": "Buscar",
    "common.filter": "Filtrar",
    "common.reset": "Restablecer",
    "common.export": "Exportar",
    "common.download": "Descargar",
    "common.print": "Imprimir",
    "common.share": "Compartir",
    "common.close": "Cerrar",
    "common.next": "Siguiente",
    "common.previous": "Anterior",
    "common.skip": "Omitir",
    "home.title": "NuclearEdu",
    "home.subtitle": "Ciencia Nuclear Interactiva",
    "home.explore": "Explorar",
    "tools.calculate": "Calcular",
    "tools.result": "Resultado",
    "tools.input": "Entrada",
    "tools.output": "Salida",
    "learning.progress": "Progreso",
    "learning.score": "Puntuación",
    "learning.attempts": "Intentos",
    "learning.quiz": "Cuestionario",
    "learning.startQuiz": "Iniciar",
    "learning.badge": "Insignia",
  },
};

export function getLanguage(): Language {
  if (typeof window === "undefined") return "en";
  const stored = localStorage.getItem("language") as Language | null;
  if (stored && translations[stored]) return stored;
  const browserLang = navigator.language.slice(0, 2) as Language;
  if (translations[browserLang]) return browserLang;
  return "en";
}

export function setLanguage(lang: Language) {
  if (typeof window === "undefined") return;
  localStorage.setItem("language", lang);
  window.dispatchEvent(new Event("languagechange"));
}

export function t(key: string, lang?: Language): string {
  const language = lang ?? getLanguage();
  return translations[language]?.[key] ?? translations.en[key] ?? key;
}

export function useTranslation() {
  const [lang, setLangState] = useState<Language>(getLanguage());

  useEffect(() => {
    const handler = () => setLangState(getLanguage());
    window.addEventListener("languagechange", handler);
    return () => window.removeEventListener("languagechange", handler);
  }, []);

  const translate = useCallback((key: string) => t(key, lang), [lang]);

  return { t: translate, lang, setLanguage };
}

export function LanguageSelector() {
  const { lang, setLanguage } = useTranslation();

  return (
    <div className="flex items-center gap-1 rounded-lg border border-border bg-card/80 px-1.5 py-1">
      {(["en", "fr", "es"] as Language[]).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLanguage(code)}
          className={`rounded-md px-2 py-0.5 text-xs font-semibold transition-colors ${
            lang === code
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
          aria-pressed={lang === code}
          aria-label={`Switch to ${code.toUpperCase()}`}
          data-ocid={`language.selector.${code}`}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export default translations;
