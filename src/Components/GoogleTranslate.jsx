import { useEffect } from "react";

const GoogleTranslate = () => {
  useEffect(() => {
    // If widget is already initialized, do nothing
    if (window.googleTranslateInitialized) return;

    window.googleTranslateInitialized = false;

    // Define callback globally
    window.googleTranslateElementInit = () => {
      if (!window.googleTranslateInitialized) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,fr,es",
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          },
          "google_translate_element"
        );
        window.googleTranslateInitialized = true;
      }
    };

    // Check if the script is already loaded
    const existingScript = document.querySelector(
      'script[src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"]'
    );

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    } else if (window.google && window.google.translate) {
      // If script already loaded, initialize directly
      window.googleTranslateElementInit();
    }

    return () => {
    };
  }, []);

  return <div id="google_translate_element"></div>;
};

export default GoogleTranslate;
