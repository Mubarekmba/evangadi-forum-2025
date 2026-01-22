import React, { useState } from "react";
import styles from "./HowItWorks.module.css";

const translations = {
  en: {
    title: "How It Works",
    subtitle: "Join our community and start learning together",
    step1Title: "Create Your Account",
    step1Desc: "Sign up for free and become part of our growing community of learners and mentors.",
    step2Title: "Ask Questions",
    step2Desc: "Post your questions and get answers from experienced community members.",
    step3Title: "Share Knowledge",
    step3Desc: "Help others by answering questions and sharing your expertise.",
    step4Title: "Connect & Learn",
    step4Desc: "Build connections, learn from peers, and grow your skills together.",
    featuresTitle: "Why Choose Us?",
    feature1Title: "Expert Community",
    feature1Desc: "Connect with experienced professionals and learners",
    feature2Title: "Quick Answers",
    feature2Desc: "Get fast and accurate responses to your questions",
    feature3Title: "Free Forever",
    feature3Desc: "No hidden fees, completely free to use",
    feature4Title: "24/7 Support",
    feature4Desc: "Our community is always here to help you",
    ctaTitle: "Ready to Get Started?",
    ctaButton: "Join Now",
    ctaSubtext: "Join thousands of learners already using our platform"
  },
  am: {
    title: "እንዴት ይሠራል",
    subtitle: "የእኛን ማህበረሰብ ይቀላቀሉ እና አንድ ላይ መማር ይጀምሩ",
    step1Title: "መለያዎን ይፍጠሩ",
    step1Desc: "ነጻ ይመዝግቡ እና ከሚያድጉ የተማሪዎች እና አማካሪዎች ማህበረሰብ አካል ይሁኑ።",
    step2Title: "ጥያቄዎችን ይጠይቁ",
    step2Desc: "ጥያቄዎችዎን ይለጥፉ እና ከተሞክሮ ያላቸው የማህበረሰብ አባላት መልሶች ያግኙ።",
    step3Title: "እውቀት ያጋሩ",
    step3Desc: "ጥያቄዎችን በመመለስ እና እውቀትዎን በማጋራት ሌሎችን ይርዱ።",
    step4Title: "ይገናኙ እና ይማሩ",
    step4Desc: "አገናኞች ይገንቡ፣ ከጓደኞችዎ ይማሩ፣ እና አቅምዎን አንድ ላይ ያድጉ።",
    featuresTitle: "ለምን እኛን ይመርጣሉ?",
    feature1Title: "የባለሙያ ማህበረሰብ",
    feature1Desc: "ከተሞክሮ ያላቸው ባለሙያዎች እና ተማሪዎች ይገናኙ",
    feature2Title: "ፈጣን መልሶች",
    feature2Desc: "ለጥያቄዎችዎ ፈጣን እና ትክክለኛ መልሶች ያግኙ",
    feature3Title: "ለዘለአለም ነጻ",
    feature3Desc: "ምንም የተደበቁ ክፍያዎች የሉም፣ ሙሉ በሙሉ ነጻ",
    feature4Title: "24/7 ድጋፍ",
    feature4Desc: "ማህበረሰባችን ሁልጊዜ እርስዎን ለመርዳት እዚህ ነው",
    ctaTitle: "ለመጀመር ዝግጁ ነዎት?",
    ctaButton: "አሁን ይቀላቀሉ",
    ctaSubtext: "አሁን የእኛን መድረክ የሚጠቀሙ በሺዎች የሚቆጠሩ ተማሪዎች ይቀላቀሉ"
  }
};

const HowItWorks = () => {
  const [language, setLanguage] = useState("en");
  const t = translations[language];

  return (
    <div className={styles.container}>
      {/* Language Switcher */}
      <div className={styles.languageSwitcher}>
        <button
          className={`${styles.langButton} ${language === "en" ? styles.active : ""}`}
          onClick={() => setLanguage("en")}
        >
          English
        </button>
        <button
          className={`${styles.langButton} ${language === "am" ? styles.active : ""}`}
          onClick={() => setLanguage("am")}
        >
          አማርኛ
        </button>
      </div>

      {/* Hero Section */}
      <div className={styles.hero}>
        <h1 className={styles.title}>{t.title}</h1>
        <p className={styles.subtitle}>{t.subtitle}</p>
      </div>

      {/* Steps Section */}
      <div className={styles.stepsSection}>
        <div className={styles.step}>
          <div className={styles.stepNumber}>1</div>
          <div className={styles.stepContent}>
            <h3 className={styles.stepTitle}>{t.step1Title}</h3>
            <p className={styles.stepDesc}>{t.step1Desc}</p>
          </div>
        </div>

        <div className={styles.step}>
          <div className={styles.stepNumber}>2</div>
          <div className={styles.stepContent}>
            <h3 className={styles.stepTitle}>{t.step2Title}</h3>
            <p className={styles.stepDesc}>{t.step2Desc}</p>
          </div>
        </div>

        <div className={styles.step}>
          <div className={styles.stepNumber}>3</div>
          <div className={styles.stepContent}>
            <h3 className={styles.stepTitle}>{t.step3Title}</h3>
            <p className={styles.stepDesc}>{t.step3Desc}</p>
          </div>
        </div>

        <div className={styles.step}>
          <div className={styles.stepNumber}>4</div>
          <div className={styles.stepContent}>
            <h3 className={styles.stepTitle}>{t.step4Title}</h3>
            <p className={styles.stepDesc}>{t.step4Desc}</p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className={styles.featuresSection}>
        <h2 className={styles.featuresTitle}>{t.featuresTitle}</h2>
        <div className={styles.featuresGrid}>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>👥</div>
            <h3 className={styles.featureTitle}>{t.feature1Title}</h3>
            <p className={styles.featureDesc}>{t.feature1Desc}</p>
          </div>

          <div className={styles.feature}>
            <div className={styles.featureIcon}>⚡</div>
            <h3 className={styles.featureTitle}>{t.feature2Title}</h3>
            <p className={styles.featureDesc}>{t.feature2Desc}</p>
          </div>

          <div className={styles.feature}>
            <div className={styles.featureIcon}>🆓</div>
            <h3 className={styles.featureTitle}>{t.feature3Title}</h3>
            <p className={styles.featureDesc}>{t.feature3Desc}</p>
          </div>

          <div className={styles.feature}>
            <div className={styles.featureIcon}>🕐</div>
            <h3 className={styles.featureTitle}>{t.feature4Title}</h3>
            <p className={styles.featureDesc}>{t.feature4Desc}</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className={styles.ctaSection}>
        <h2 className={styles.ctaTitle}>{t.ctaTitle}</h2>
        <p className={styles.ctaSubtext}>{t.ctaSubtext}</p>
        <a href="/register" className={styles.ctaButton}>
          {t.ctaButton}
        </a>
      </div>
    </div>
  );
};

export default HowItWorks;

