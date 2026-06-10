export type Lang = "en" | "tr" | "pl";

export interface Translation {
  nav: { about: string; skills: string; projects: string; contact: string };
  hero: {
    badge: string;
    greeting: string;
    description: string;
    viewProjects: string;
    contactMe: string;
    photoBadge: string;
  };
  about: {
    eyebrow: string;
    title: string;
    p1: string;
    p2: string;
    whatIDoLabel: string;
    whatIDoText: string;
    educationLabel: string;
    education1: string;
    education2: string;
    locationLabel: string;
    locationText: string;
  };
  skills: {
    eyebrow: string;
    title: string;
    categories: { frontend: string; tools: string; learning: string };
  };
  projects: {
    eyebrow: string;
    title: string;
    all: string;
    noPreview: string;
    live: string;
    caseStudy: string;
    why: string;
    learned: string;
    close: string;
  };
  github: {
    eyebrow: string;
    title: string;
    blurb: string;
    error: string;
    viewProfile: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    blurb: string;
    name: string;
    email: string;
    message: string;
    send: string;
    sending: string;
    success: string;
    error: string;
  };
  footer: { built: string };
}

export const TRANSLATIONS: Record<Lang, Translation> = {
  en: {
    nav: {
      about: "About",
      skills: "Skills",
      projects: "Projects",
      contact: "Contact",
    },
    hero: {
      badge: "Open to opportunities",
      greeting: "Hi, I'm",
      description:
        "I build modern, responsive and user-focused web applications using React and JavaScript.",
      viewProjects: "View Projects",
      contactMe: "Contact Me",
      photoBadge: "based in poland 🇵🇱",
    },
    about: {
      eyebrow: "01 — who i am",
      title: "About Me",
      p1: "I'm a Frontend Developer with a Computer Engineering degree from TED University. I build modern, responsive web applications with a focus on clean code, performance, and great user experience.",
      p2: "Currently pursuing an MSc in Business Management in Poland, I combine technical depth with business thinking. I'm actively looking for internship and junior developer opportunities where I can contribute and grow.",
      whatIDoLabel: "What I do",
      whatIDoText:
        "Frontend development with React, TypeScript, and Tailwind CSS. Building real projects with REST APIs and modern tooling.",
      educationLabel: "Education",
      education1: "BSc Computer Engineering — TED University, Ankara",
      education2: "MSc Business Management — UITM, Rzeszów (2025–2027)",
      locationLabel: "Location",
      locationText: "Rzeszów, Poland — Open to remote & hybrid opportunities",
    },
    skills: {
      eyebrow: "02 — stack",
      title: "Skills",
      categories: {
        frontend: "Frontend",
        tools: "Tools & Workflow",
        learning: "Currently Learning",
      },
    },
    projects: {
      eyebrow: "03 — selected work",
      title: "Projects",
      all: "All",
      noPreview: "No Preview",
      live: "Live",
      caseStudy: "Case Study",
      why: "Why I built it",
      learned: "What I learned",
      close: "Close",
    },
    github: {
      eyebrow: "04 — open source",
      title: "GitHub Activity",
      blurb: "Live from the GitHub API — my most recently updated repositories.",
      error: "Couldn't load repositories right now.",
      viewProfile: "View profile",
    },
    contact: {
      eyebrow: "05 — get in touch",
      title: "Contact",
      blurb: "Have a project in mind or just want to say hi? Fill the form below.",
      name: "Your Name",
      email: "Your Email",
      message: "Your Message",
      send: "Send Message",
      sending: "Sending...",
      success: "Message sent! I'll get back to you soon.",
      error: "Something went wrong. Please try emailing directly.",
    },
    footer: { built: "Built with React & Tailwind CSS" },
  },
  tr: {
    nav: {
      about: "Hakkımda",
      skills: "Yetenekler",
      projects: "Projeler",
      contact: "İletişim",
    },
    hero: {
      badge: "Fırsatlara açığım",
      greeting: "Merhaba, ben",
      description:
        "React ve JavaScript ile modern, duyarlı ve kullanıcı odaklı web uygulamaları geliştiriyorum.",
      viewProjects: "Projeleri Gör",
      contactMe: "Bana Ulaş",
      photoBadge: "polonya'da yaşıyorum 🇵🇱",
    },
    about: {
      eyebrow: "01 — ben kimim",
      title: "Hakkımda",
      p1: "TED Üniversitesi Bilgisayar Mühendisliği mezunu bir Frontend Developer'ım. Temiz kod, performans ve iyi kullanıcı deneyimi odağıyla modern, duyarlı web uygulamaları geliştiriyorum.",
      p2: "Şu anda Polonya'da İşletme Yönetimi yüksek lisansı yapıyorum; teknik derinliği iş bakış açısıyla birleştiriyorum. Katkı sağlayıp gelişebileceğim staj ve junior developer fırsatları arıyorum.",
      whatIDoLabel: "Ne yapıyorum",
      whatIDoText:
        "React, TypeScript ve Tailwind CSS ile frontend geliştirme. REST API'ler ve modern araçlarla gerçek projeler.",
      educationLabel: "Eğitim",
      education1: "Bilgisayar Mühendisliği Lisansı — TED Üniversitesi, Ankara",
      education2: "İşletme Yönetimi Yüksek Lisansı — UITM, Rzeszów (2025–2027)",
      locationLabel: "Konum",
      locationText: "Rzeszów, Polonya — Uzaktan ve hibrit çalışmaya açığım",
    },
    skills: {
      eyebrow: "02 — teknolojiler",
      title: "Yetenekler",
      categories: {
        frontend: "Frontend",
        tools: "Araçlar & İş Akışı",
        learning: "Şu An Öğreniyorum",
      },
    },
    projects: {
      eyebrow: "03 — seçili işler",
      title: "Projeler",
      all: "Tümü",
      noPreview: "Önizleme Yok",
      live: "Canlı",
      caseStudy: "İncele",
      why: "Neden yaptım",
      learned: "Neler öğrendim",
      close: "Kapat",
    },
    github: {
      eyebrow: "04 — açık kaynak",
      title: "GitHub Aktivitesi",
      blurb: "GitHub API'den canlı — en son güncellediğim depolar.",
      error: "Depolar şu anda yüklenemedi.",
      viewProfile: "Profili gör",
    },
    contact: {
      eyebrow: "05 — iletişime geç",
      title: "İletişim",
      blurb:
        "Aklınızda bir proje mi var ya da merhaba mı demek istiyorsunuz? Formu doldurun.",
      name: "Adınız",
      email: "E-posta Adresiniz",
      message: "Mesajınız",
      send: "Mesaj Gönder",
      sending: "Gönderiliyor...",
      success: "Mesajınız gönderildi! En kısa sürede dönüş yapacağım.",
      error: "Bir şeyler ters gitti. Lütfen doğrudan e-posta gönderin.",
    },
    footer: { built: "React & Tailwind CSS ile geliştirildi" },
  },
  pl: {
    nav: {
      about: "O mnie",
      skills: "Umiejętności",
      projects: "Projekty",
      contact: "Kontakt",
    },
    hero: {
      badge: "Otwarty na nowe możliwości",
      greeting: "Cześć, jestem",
      description:
        "Tworzę nowoczesne, responsywne i zorientowane na użytkownika aplikacje internetowe w React i JavaScript.",
      viewProjects: "Zobacz projekty",
      contactMe: "Skontaktuj się",
      photoBadge: "mieszkam w polsce 🇵🇱",
    },
    about: {
      eyebrow: "01 — kim jestem",
      title: "O mnie",
      p1: "Jestem Frontend Developerem z dyplomem inżyniera informatyki Uniwersytetu TED. Tworzę nowoczesne, responsywne aplikacje internetowe, dbając o czysty kod, wydajność i świetne doświadczenie użytkownika.",
      p2: "Obecnie studiuję zarządzanie biznesem (MSc) w Polsce, łącząc wiedzę techniczną z myśleniem biznesowym. Aktywnie szukam stażu lub pracy jako junior developer, gdzie mogę się rozwijać i wnosić wartość.",
      whatIDoLabel: "Czym się zajmuję",
      whatIDoText:
        "Frontend w React, TypeScript i Tailwind CSS. Realne projekty z REST API i nowoczesnymi narzędziami.",
      educationLabel: "Edukacja",
      education1: "Inżynieria komputerowa (BSc) — Uniwersytet TED, Ankara",
      education2: "Zarządzanie biznesem (MSc) — UITM, Rzeszów (2025–2027)",
      locationLabel: "Lokalizacja",
      locationText: "Rzeszów, Polska — Otwarty na pracę zdalną i hybrydową",
    },
    skills: {
      eyebrow: "02 — technologie",
      title: "Umiejętności",
      categories: {
        frontend: "Frontend",
        tools: "Narzędzia",
        learning: "Obecnie się uczę",
      },
    },
    projects: {
      eyebrow: "03 — wybrane prace",
      title: "Projekty",
      all: "Wszystkie",
      noPreview: "Brak podglądu",
      live: "Podgląd",
      caseStudy: "Szczegóły",
      why: "Dlaczego to zbudowałem",
      learned: "Czego się nauczyłem",
      close: "Zamknij",
    },
    github: {
      eyebrow: "04 — open source",
      title: "Aktywność na GitHubie",
      blurb: "Na żywo z API GitHuba — moje ostatnio aktualizowane repozytoria.",
      error: "Nie udało się załadować repozytoriów.",
      viewProfile: "Zobacz profil",
    },
    contact: {
      eyebrow: "05 — napisz do mnie",
      title: "Kontakt",
      blurb: "Masz projekt lub chcesz się przywitać? Wypełnij formularz.",
      name: "Twoje imię",
      email: "Twój e-mail",
      message: "Twoja wiadomość",
      send: "Wyślij wiadomość",
      sending: "Wysyłanie...",
      success: "Wiadomość wysłana! Odezwę się wkrótce.",
      error: "Coś poszło nie tak. Napisz bezpośrednio na e-mail.",
    },
    footer: { built: "Zbudowane w React i Tailwind CSS" },
  },
};
