import type { IconType } from "react-icons";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import type { Lang } from "../i18n/translations";

type L<T = string> = Record<Lang, T>;

export interface NavLink {
  href: string;
  label: string;
}

export const NAV_LINKS: NavLink[] = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export const SECTION_IDS = NAV_LINKS.map((link) => link.href.slice(1));

export const GITHUB_USERNAME = "metincontact";

export interface Project {
  title: string;
  description: L;
  why: L;
  learned: L<string[]>;
  image: string;
  live: string;
  github: string;
  tags: string[];
}

export const PROJECTS: Project[] = [
  {
    title: "Personal Finance Tracker",
    description: {
      en: "Full-stack finance dashboard that tracks, categorises, and visualises personal spending. REST API backend, PostgreSQL database, and a test suite covering all three layers.",
      tr: "Harcamaları takip eden, kategorize eden ve görselleştiren full-stack finans panosu. REST API backend, PostgreSQL veritabanı ve üç katmanı kapsayan test suite.",
      pl: "Pełnostackowy panel finansowy śledzący, kategoryzujący i wizualizujący wydatki. Backend REST API, baza danych PostgreSQL i testy obejmujące wszystkie trzy warstwy.",
    },
    why: {
      en: "I wanted to go beyond frontend-only projects and ship a real production system — a proper API, a cloud database, deployments on two separate platforms, and a test suite I could actually trust.",
      tr: "Yalnızca frontend projelerinin ötesine geçip gerçek bir production sistemi inşa etmek istedim — düzgün bir API, bulut veritabanı, iki ayrı platformda deploy ve gerçekten güvenebileceğim bir test suite.",
      pl: "Chciałem wyjść poza projekty czysto frontendowe i zbudować prawdziwy system produkcyjny — porządne API, bazę danych w chmurze, wdrożenie na dwóch platformach i testy, którym można ufać.",
    },
    learned: {
      en: [
        "Building a REST API from scratch with Node.js, Express, and TypeScript",
        "Database modelling and queries with Prisma ORM and PostgreSQL on Neon",
        "Full test coverage: Jest/Supertest for the API, Vitest/RTL for components, Playwright for E2E",
      ],
      tr: [
        "Node.js, Express ve TypeScript ile sıfırdan REST API geliştirme",
        "Neon üzerinde Prisma ORM ve PostgreSQL ile veritabanı modelleme ve sorgular",
        "Tam test kapsamı: API için Jest/Supertest, component'ler için Vitest/RTL, E2E için Playwright",
      ],
      pl: [
        "Budowanie REST API od zera z Node.js, Express i TypeScript",
        "Modelowanie bazy danych i zapytania z Prisma ORM i PostgreSQL na Neon",
        "Pełne pokrycie testami: Jest/Supertest dla API, Vitest/RTL dla komponentów, Playwright dla E2E",
      ],
    },
    image: "/finance-tracker.webp",
    live: "https://finance-tracker-matin.vercel.app",
    github: "https://github.com/metincontact/personal-finance-tracker",
    tags: ["React", "TypeScript", "Node.js", "PostgreSQL", "Recharts"],
  },
  {
    title: "E-Commerce Website",
    description: {
      en: "Full-featured e-commerce app with product listing, cart, and checkout flow.",
      tr: "Ürün listeleme, sepet ve ödeme akışına sahip tam donanımlı e-ticaret uygulaması.",
      pl: "W pełni funkcjonalny sklep internetowy z listą produktów, koszykiem i procesem zakupu.",
    },
    why: {
      en: "I wanted to master the fundamentals of state-heavy UIs: a cart that survives refreshes, quantity management, and a realistic checkout flow.",
      tr: "Durum yönetimi ağır arayüzlerin temellerini öğrenmek istedim: yenilemeye dayanıklı sepet, adet yönetimi ve gerçekçi bir ödeme akışı.",
      pl: "Chciałem opanować podstawy interfejsów opartych na stanie: koszyk odporny na odświeżenie, zarządzanie ilością i realistyczny proces zakupu.",
    },
    learned: {
      en: [
        "Cart state management with localStorage persistence",
        "Product filtering and search across categories",
        "Designing a multi-step checkout UX",
      ],
      tr: [
        "localStorage kalıcılığıyla sepet durum yönetimi",
        "Kategoriler arası ürün filtreleme ve arama",
        "Çok adımlı ödeme deneyimi tasarımı",
      ],
      pl: [
        "Zarządzanie stanem koszyka z zapisem w localStorage",
        "Filtrowanie i wyszukiwanie produktów w kategoriach",
        "Projektowanie wieloetapowego procesu zakupu",
      ],
    },
    image: "/ecommerce.webp",
    live: "https://metin-ecommerce.vercel.app",
    github: "https://github.com/metincontact/ecommerce-frontend",
    tags: ["React", "JavaScript", "CSS"],
  },
  {
    title: "Chatbot",
    description: {
      en: "AI-powered chatbot built with React and Google Gemini API. Supports real-time conversation with context memory.",
      tr: "React ve Google Gemini API ile geliştirilen yapay zekâ sohbet botu. Bağlam hafızalı gerçek zamanlı sohbet desteği.",
      pl: "Chatbot AI zbudowany w React z Google Gemini API. Rozmowa w czasie rzeczywistym z pamięcią kontekstu.",
    },
    why: {
      en: "LLM APIs are everywhere now — I wanted hands-on experience integrating one properly: streaming responses, conversation history, and graceful error states.",
      tr: "LLM API'leri artık her yerde — birini düzgünce entegre etme deneyimi istedim: akış halinde yanıtlar, sohbet geçmişi ve zarif hata durumları.",
      pl: "API modeli językowych są wszędzie — chciałem zdobyć praktyczne doświadczenie w ich integracji: strumieniowanie odpowiedzi, historia rozmowy i obsługa błędów.",
    },
    learned: {
      en: [
        "Integrating the Gemini API with conversation context",
        "Handling loading, streaming, and error UI states",
        "Prompt design and response formatting",
      ],
      tr: [
        "Gemini API'yi sohbet bağlamıyla entegre etme",
        "Yükleme, akış ve hata arayüz durumlarını yönetme",
        "Prompt tasarımı ve yanıt biçimlendirme",
      ],
      pl: [
        "Integracja Gemini API z kontekstem rozmowy",
        "Obsługa stanów ładowania, strumieniowania i błędów",
        "Projektowanie promptów i formatowanie odpowiedzi",
      ],
    },
    image: "/chatbot.webp",
    live: "https://metin-chatbot.vercel.app",
    github: "https://github.com/metincontact/chatbot",
    tags: ["React", "Gemini API", "Tailwind CSS"],
  },
  {
    title: "Job Tracker",
    description: {
      en: "Personal job application tracker with status management, filtering, and Supabase authentication.",
      tr: "Durum yönetimi, filtreleme ve Supabase kimlik doğrulamalı kişisel iş başvurusu takipçisi.",
      pl: "Osobisty tracker aplikacji o pracę ze statusami, filtrowaniem i uwierzytelnianiem Supabase.",
    },
    why: {
      en: "I was applying to jobs and spreadsheets weren't cutting it. Building my own tool meant learning auth and a real database while solving my own problem.",
      tr: "İş başvuruları yapıyordum ve tablolar yetmiyordu. Kendi aracımı yapmak, kendi sorunumu çözerken kimlik doğrulama ve gerçek bir veritabanı öğrenmek demekti.",
      pl: "Aplikowałem o pracę, a arkusze nie wystarczały. Własne narzędzie to nauka uwierzytelniania i prawdziwej bazy danych przy rozwiązywaniu własnego problemu.",
    },
    learned: {
      en: [
        "Supabase authentication and row-level security",
        "CRUD operations with optimistic UI updates",
        "Protected routes and session handling",
      ],
      tr: [
        "Supabase kimlik doğrulama ve satır düzeyi güvenlik",
        "İyimser arayüz güncellemeleriyle CRUD işlemleri",
        "Korumalı rotalar ve oturum yönetimi",
      ],
      pl: [
        "Uwierzytelnianie Supabase i zabezpieczenia na poziomie wierszy",
        "Operacje CRUD z optymistycznymi aktualizacjami UI",
        "Chronione trasy i obsługa sesji",
      ],
    },
    image: "/job-tracker.webp",
    live: "https://job-tracker-matin.vercel.app",
    github: "https://github.com/metincontact/job-tracker",
    tags: ["React", "TypeScript", "Supabase"],
  },
  {
    title: "GitHub Explorer",
    description: {
      en: "Search any GitHub profile and explore repositories with stars, forks, and language filter.",
      tr: "Herhangi bir GitHub profilini arayın; yıldız, fork ve dil filtresiyle depoları keşfedin.",
      pl: "Wyszukaj dowolny profil GitHub i przeglądaj repozytoria z gwiazdkami, forkami i filtrem języka.",
    },
    why: {
      en: "A focused exercise in consuming a public REST API well: pagination, rate limits, URL-driven state with React Router, and fast perceived performance.",
      tr: "Halka açık bir REST API'yi iyi kullanma alıştırması: sayfalama, istek limitleri, React Router ile URL tabanlı durum ve hızlı hissedilen performans.",
      pl: "Ćwiczenie z dobrego korzystania z publicznego REST API: paginacja, limity zapytań, stan w URL z React Router i szybkość działania.",
    },
    learned: {
      en: [
        "REST pagination and API rate-limit handling",
        "URL-driven state with React Router params",
        "Debounced search input for fewer requests",
      ],
      tr: [
        "REST sayfalama ve API istek limiti yönetimi",
        "React Router parametreleriyle URL tabanlı durum",
        "Daha az istek için debounce'lu arama",
      ],
      pl: [
        "Paginacja REST i obsługa limitów API",
        "Stan oparty na URL z parametrami React Router",
        "Wyszukiwanie z debounce dla mniejszej liczby zapytań",
      ],
    },
    image: "/github-explorer.webp",
    live: "https://github-explorer-matin.vercel.app",
    github: "https://github.com/metincontact/github-explorer",
    tags: ["React", "TypeScript", "React Router", "API"],
  },
  {
    title: "Weather Dashboard",
    description: {
      en: "Real-time weather app with 5-day forecast chart, search history, and location support.",
      tr: "5 günlük tahmin grafiği, arama geçmişi ve konum destekli gerçek zamanlı hava durumu uygulaması.",
      pl: "Aplikacja pogodowa w czasie rzeczywistym z 5-dniową prognozą, historią wyszukiwań i geolokalizacją.",
    },
    why: {
      en: "I wanted to work with messy real-world API data and turn it into clean visualizations — plus geolocation and persistent search history.",
      tr: "Gerçek dünyanın dağınık API verisiyle çalışıp onu temiz görselleştirmelere dönüştürmek istedim — ayrıca konum ve kalıcı arama geçmişi.",
      pl: "Chciałem pracować z nieuporządkowanymi danymi z prawdziwego API i zamieniać je w czytelne wizualizacje — plus geolokalizacja i historia wyszukiwań.",
    },
    learned: {
      en: [
        "Normalizing third-party API responses",
        "Charting forecast data with Recharts",
        "Browser geolocation with permission fallbacks",
      ],
      tr: [
        "Üçüncü taraf API yanıtlarını normalize etme",
        "Recharts ile tahmin verisi grafikleme",
        "İzin geri dönüşleriyle tarayıcı konumu",
      ],
      pl: [
        "Normalizacja odpowiedzi zewnętrznych API",
        "Wykresy prognozy z Recharts",
        "Geolokalizacja w przeglądarce z obsługą braku zgody",
      ],
    },
    image: "/weather-dashboard.webp",
    live: "https://weather-dashboard-matin.vercel.app",
    github: "https://github.com/metincontact/weather-dashboard",
    tags: ["React", "TypeScript", "Recharts", "API"],
  },
  {
    title: "Crypto Tracker",
    description: {
      en: "Real-time crypto tracker with price charts, portfolio tracking, favorites, and sorting.",
      tr: "Fiyat grafikleri, portföy takibi, favoriler ve sıralamalı gerçek zamanlı kripto takipçisi.",
      pl: "Tracker kryptowalut w czasie rzeczywistym z wykresami cen, portfelem, ulubionymi i sortowaniem.",
    },
    why: {
      en: "Live-updating data is a different beast: polling without jank, sorting large lists, and keeping favorites in sync across sessions.",
      tr: "Canlı güncellenen veri bambaşka bir konu: takılmadan polling, büyük listeleri sıralama ve favorileri oturumlar arası senkron tutma.",
      pl: "Dane aktualizowane na żywo to inne wyzwanie: odpytywanie bez zacięć, sortowanie dużych list i synchronizacja ulubionych między sesjami.",
    },
    learned: {
      en: [
        "Polling live market data efficiently",
        "Sorting and filtering large datasets in the UI",
        "Persisting favorites with localStorage",
      ],
      tr: [
        "Canlı piyasa verisini verimli şekilde çekme",
        "Arayüzde büyük veri setlerini sıralama ve filtreleme",
        "Favorileri localStorage ile kalıcı hale getirme",
      ],
      pl: [
        "Wydajne odpytywanie danych rynkowych na żywo",
        "Sortowanie i filtrowanie dużych zbiorów danych w UI",
        "Zapisywanie ulubionych w localStorage",
      ],
    },
    image: "/crypto-tracker.webp",
    live: "https://crypto-tracker-matin.vercel.app",
    github: "https://github.com/metincontact/crypto-tracker",
    tags: ["React", "TypeScript", "Recharts", "API"],
  },
];

export const PROJECT_FILTER_TAGS = [
  "All",
  "React",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "PostgreSQL",
  "API",
  "Supabase",
  "Recharts",
];

export type SkillCategoryKey = "frontend" | "tools" | "learning";

export interface SkillCategory {
  key: SkillCategoryKey;
  skills: string[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    key: "frontend",
    skills: [
      "React",
      "TypeScript",
      "JavaScript",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Framer Motion",
    ],
  },
  {
    key: "tools",
    skills: ["Git", "GitHub", "Vite", "REST API", "React Router", "Recharts", "Node.js", "Express", "PostgreSQL", "Prisma"],
  },
  {
    key: "learning",
    skills: ["Next.js", "Angular", ".NET basics"],
  },
];

export interface SocialLink {
  icon: IconType;
  label: string;
  href: string;
}

export const SOCIALS: SocialLink[] = [
  {
    icon: FaEnvelope,
    label: "metinmemmedlicontact@gmail.com",
    href: "mailto:metinmemmedlicontact@gmail.com",
  },
  {
    icon: FaGithub,
    label: "github.com/metincontact",
    href: "https://github.com/metincontact",
  },
  {
    icon: FaLinkedin,
    label: "linkedin.com/in/matin-mammadli-dev",
    href: "https://www.linkedin.com/in/matin-mammadli-dev/",
  },
];
