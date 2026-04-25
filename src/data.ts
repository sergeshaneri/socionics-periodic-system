import type { Tim, AboutContent } from './types';

export const TRAITS_EN: string[] = [
  "Existence", "Extraverts", "Carefree", "Intuitives", "Democrats", "Positivists", "Yielding", "Logicians",
  "Merry", "Constructivists", "Right/Process", "Questors", "Judicious", "Tacticians", "Irrationals", "Statics"
];

export const TRAITS_RU: string[] = [
  "Существование", "Экстраверты", "Беспечные", "Интуиты", "Демократы", "Позитивисты", "Уступчивые", "Логики",
  "Весёлые", "Конструктивисты", "Правые", "Квестимы", "Рассудительные", "Тактики", "Иррационалы", "Статики"
];

export const POLES_EN: string[][] = [
  ["Existents", "Non-existents"],
  ["Extravert", "Introvert"],
  ["Carefree", "Farsighted"],
  ["Intuitive", "Sensory"],
  ["Democratic", "Aristocratic"],
  ["Positivist", "Negativist"],
  ["Yielding", "Obstinate"],
  ["Logical", "Ethical"],
  ["Merry (Subjectivist)", "Serious (Objectivist)"],
  ["Constructivist", "Emotivst"],
  ["Right (Process)", "Left (Result)"],
  ["Questor (Asking)", "Declarer (Declaring)"],
  ["Judicious", "Decisive"],
  ["Tactical", "Strategic"],
  ["Irrational", "Rational"],
  ["Static", "Dynamic"]
];

export const POLES_RU: string[][] = [
  ["Существующие", "Несуществующие"],
  ["Экстраверты", "Интроверты"],
  ["Беспечные", "Предусмотрительные"],
  ["Интуиты", "Сенсорики"],
  ["Демократы", "Аристократы"],
  ["Позитивисты", "Негативисты"],
  ["Уступчивые", "Упрямые"],
  ["Логики", "Этики"],
  ["Весёлые", "Серьёзные"],
  ["Конструктивисты", "Эмотивисты"],
  ["Правые", "Левые"],
  ["Квестимы", "Деклатимы"],
  ["Рассудительные", "Решительные"],
  ["Тактики", "Стратеги"],
  ["Иррационалы", "Рационалы"],
  ["Статики", "Динамики"]
];

export const POLES_ADJ_RU: string[][] = [
  ["Существующие", "Несуществующие"],
  ["Экстравертные", "Интровертные"],
  ["Беспечные", "Предусмотрительные"],
  ["Интуитивные", "Сенсорные"],
  ["Демократические", "Аристократические"],
  ["Позитивистские", "Негативистские"],
  ["Уступчивые", "Упрямые"],
  ["Логические", "Этические"],
  ["Весёлые", "Серьёзные"],
  ["Конструктивистские", "Эмотивистские"],
  ["Правые", "Левые"],
  ["Квестимные", "Деклатимные"],
  ["Рассудительные", "Решительные"],
  ["Тактические", "Стратегические"],
  ["Иррациональные", "Рациональные"],
  ["Статические", "Динамические"]
];

export const POLES_ADJ_EN: string[][] = [
  ["Existential", "Non-existential"],
  ["Extraverted", "Introverted"],
  ["Carefree", "Farsighted"],
  ["Intuitive", "Sensory"],
  ["Democratic", "Aristocratic"],
  ["Positivist", "Negativist"],
  ["Yielding", "Obstinate"],
  ["Logical", "Ethical"],
  ["Merry", "Serious"],
  ["Constructivist", "Emotive"],
  ["Right", "Left"],
  ["Questing", "Declaring"],
  ["Judicious", "Decisive"],
  ["Tactical", "Strategic"],
  ["Irrational", "Rational"],
  ["Static", "Dynamic"]
];

/** Singular noun form, masculine — used as subject pole label (e.g. "БЕСПЕЧНЫЙ", "Аристократ"). */
export const POLES_NOUN_RU: string[][] = [
  ["Существующий", "Несуществующий"],
  ["Экстраверт", "Интроверт"],
  ["Беспечный", "Предусмотрительный"],
  ["Интуит", "Сенсорик"],
  ["Демократ", "Аристократ"],
  ["Позитивист", "Негативист"],
  ["Уступчивый", "Упрямый"],
  ["Логик", "Этик"],
  ["Весёлый", "Серьёзный"],
  ["Конструктивист", "Эмотивист"],
  ["Правый", "Левый"],
  ["Квестим", "Деклатим"],
  ["Рассудительный", "Решительный"],
  ["Тактик", "Стратег"],
  ["Иррационал", "Рационал"],
  ["Статик", "Динамик"]
];

export const POLES_NOUN_EN: string[][] = [
  ["Existent", "Non-existent"],
  ["Extravert", "Introvert"],
  ["Carefree", "Farsighted"],
  ["Intuitive", "Sensor"],
  ["Democrat", "Aristocrat"],
  ["Positivist", "Negativist"],
  ["Yielding", "Obstinate"],
  ["Logician", "Ethicist"],
  ["Merry", "Serious"],
  ["Constructivist", "Emotivist"],
  ["Right", "Left"],
  ["Questor", "Declarer"],
  ["Judicious", "Decisive"],
  ["Tactician", "Strategist"],
  ["Irrational", "Rational"],
  ["Static", "Dynamic"]
];

export const SEMANTICS_RU: string[] = [
  "Внимание экстравертов больше направлено на внешний мир, интровертов — на внутренний.",
  "Беспечные верят в новый опыт, предусмотрительные опираются на старый.",
  "Интуиты воспринимают мир умозрительно, сенсорики — через ощущения.",
  "Демократы ищут уникальные черты, аристократы — принадлежность к группе.",
  "Позитивисты видят то, что есть, негативисты — то, чего не хватает.",
  "Уступчивые готовы менять цели ради отношений, упрямые стоят на своем.",
  "Логики опираются на объективный анализ, этики — на чувства и ценности.",
  "Веселые ценят концепции и эмоции, серьезные — практику и нормы.",
  "Конструктивисты сначала видят суть сообщения, эмотивисты — эмоциональный фон.",
  "Процессники развиваются последовательно, результатники — скачками к цели.",
  "Квестимы склонны задавать вопросы и усложнять, деклатимы — утверждать и упрощать.",
  "Рассудительные ценят обдумывание вариантов, решительные — скорость воплощения.",
  "Тактики видят путь и шаги, стратеги — конечную цель.",
  "Иррационалы действуют по ситуации, рационалы — следуют плану.",
  "Статики видят мир как серию кадров, динамики — как непрерывный поток."
];

export const SEMANTICS_EN: string[] = [
  "Extraverts focus on the outside world/objects; Introverts focus on the internal world/relations.",
  "Carefree types believe in new experiences; Farsighted types rely on past experience and planning.",
  "Intuitives perceive through abstract ideas/possibilities; Sensors through concrete facts/sensations.",
  "Democrats look for unique individual traits; Aristocrats for group membership/categories.",
  "Positivists notice what is present/good; Negativists notice what is absent/missing.",
  "Yielding types prioritize resources and flexibility; Obstinate types stick to their goals and principles.",
  "Logicians rely on objective analysis and rules; Ethicians on feelings and personal values.",
  "Merry types value concepts and shared emotions; Serious types value practical methods and norms.",
  "Constructivists first grasp the logical gist of a message; Emotivists feel the tone and motive first.",
  "Process types develop evolve sequentially; Result types jump to the outcome/goal.",
  "Questors tend to ask questions and complicate details; Declarers speak affirmatively and simplify.",
  "Judicious types value deliberate consideration; Decisive types value speed of implementation.",
  "Tacticians see the next steps/path; Strategists focus on the ultimate goal.",
  "Irrational types act according to the situation; Rational types follow a consistent plan.",
  "Statics see the world as a series of snapshots; Dynamics see it as a continuous stream/process."
];

export const TIMS_EN: Tim[] = [
  { id: "ILE", name: "ILE", value: "Cognition", quadra: 0 },
  { id: "SEI", name: "SEI", value: "Consumption", quadra: 0 },
  { id: "ESE", name: "ESE", value: "Activation", quadra: 0 },
  { id: "LII", name: "LII", value: "Invention", quadra: 0 },
  { id: "EIE", name: "EIE", value: "Ideology", quadra: 1 },
  { id: "LSI", name: "LSI", value: "Order", quadra: 1 },
  { id: "SLE", name: "SLE", value: "Dominion", quadra: 1 },
  { id: "IEI", name: "IEI", value: "Freedom", quadra: 1 },
  { id: "LIE", name: "LIE", value: "Enterprise", quadra: 2 },
  { id: "ESI", name: "ESI", value: "Preservation", quadra: 2 },
  { id: "SEE", name: "SEE", value: "Influence", quadra: 2 },
  { id: "ILI", name: "ILI", value: "Doubt", quadra: 2 },
  { id: "IEE", name: "IEE", value: "Conversance", quadra: 3 },
  { id: "SLI", name: "SLI", value: "Mastery", quadra: 3 },
  { id: "LSE", name: "LSE", value: "Technology", quadra: 3 },
  { id: "EII", name: "EII", value: "Humanism", quadra: 3 }
];

export const TIMS_RU: Tim[] = [
  { id: "ИЛЭ", name: "Дон Кихот", value: "Познание", quadra: 0 },
  { id: "СЭИ", name: "Дюма", value: "Потребление", quadra: 0 },
  { id: "ЭСЭ", name: "Гюго", value: "Активация", quadra: 0 },
  { id: "ЛИИ", name: "Робеспьер", value: "Изобретение", quadra: 0 },
  { id: "ЭИЭ", name: "Гамлет", value: "Идеология", quadra: 1 },
  { id: "ЛСИ", name: "Максим Горький", value: "Порядок", quadra: 1 },
  { id: "СЛЭ", name: "Жуков", value: "Власть", quadra: 1 },
  { id: "ИЭИ", name: "Есенин", value: "Свобода", quadra: 1 },
  { id: "ЛИЭ", name: "Джек Лондон", value: "Предприимчивость", quadra: 2 },
  { id: "ЭСИ", name: "Драйзер", value: "Сохранение", quadra: 2 },
  { id: "СЭЭ", name: "Наполеон", value: "Влияние", quadra: 2 },
  { id: "ИЛИ", name: "Бальзак", value: "Сомнение", quadra: 2 },
  { id: "ИЭЭ", name: "Гексли", value: "Осведомленность", quadra: 3 },
  { id: "СЛИ", name: "Габен", value: "Мастерство", quadra: 3 },
  { id: "ЛСЭ", name: "Штирлиц", value: "Технология", quadra: 3 },
  { id: "ЭИИ", name: "Достоевский", value: "Гуманизм", quadra: 3 }
];

export const ITR_EN: string[] = [
  "Identity", "Duality", "Activation", "Mirror",
  "Beneficiary", "Supervisee", "Business", "Mirage",
  "Quasi-Identity", "Conflict", "Superego", "Extinguishment",
  "Kindred", "Semi-Dual", "Benefactor", "Supervisor"
];

export const ITR_RU: string[] = [
  "Тождественные", "Дуальные", "Активационные", "Зеркальные",
  "Прием Заказа", "Прием Контроля", "Деловые", "Миражные",
  "Квазитождественные", "Конфликтные", "Суперэго", "Полной Противоположности",
  "Родственные", "Полудуальные", "Передача Заказа", "Передача Контроля"
];

// Hadamard matrix generation
export const HADAMARD_MATRIX: number[][] = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
  [1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
  [1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1],
  [1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
  [1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1],
  [1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1],
  [1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1],
  [1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1],
  [1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0],
  [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
  [1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0],
  [1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0],
  [1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1]
];

export const ABOUT_TEXT_RU: AboutContent = {
  intro: "Система основана на исследованиях Семена Чурюмова, который открыл фрактальные свойства социона и их связь с матрицами Адамара.",
  hadamard: "Матрица Адамара H16 является математическим ядром системы. Она описывает 16-мерное пространство отношений, которое проецируется на плоскость в виде паттернов.",
  fractality: "Фрактальность проявляется в том, что одна и та же структура (диаграмма) описывает разные уровни реальности: ТИМы (типы), ИТО (отношения) и ПР (признаки Рейнина).",
  models: "Проективная модель показывает структуру в виде регулярной сетки. Модель Чурюмова (квадрат) акцентирует внимание на динамике квадр, расположенных по периметру.",
  semantics: "Черный/Цветной квадрат в паттерне означает наличие признака или активное состояние (1), серый — отсутствие или пассивное состояние (0).",
  detailed: "Экстенсивные характеристики описывают социон как целостный математический объект. Каждый ТИМ является вектором в 16-мерном базисе признаков. Система позволяет визуализировать биекцию — взаимно однозначное соответствие между типами и их признаками. Это означает, что зная паттерн признаков, можно однозначно определить тип, и наоборот."
};

export const ABOUT_TEXT_EN: AboutContent = {
  intro: "The system is based on the research of Semyon Churyumov, who discovered the fractal properties of the socion and their connection with Hadamard matrices.",
  hadamard: "The Hadamard H16 matrix is the mathematical core of the system. It describes a 16-dimensional space of relations projected onto a plane as patterns.",
  fractality: "Fractality is revealed in that the same structure (diagram) describes different levels of reality: TIMs (types), ITRs (relations), and RDs (Reinin dichotomies).",
  models: "The Projective model shows the structure as a regular grid. Churyumov's model (the square) focuses on the dynamics of quadras located around the perimeter.",
  semantics: "A Filled/Colored square in a pattern indicates the presence of a trait or an active state (1), while gray indicates its absence or a passive state (0).",
  detailed: "Extensive characteristics describe the socion as a unified mathematical object. Each TIM is a vector in a 16-dimensional trait basis. The system allows visualizing the bijection — a one-to-one correspondence between types and their traits. This means that knowing the trait pattern, one can uniquely identify the type, and vice versa."
};

export const QUADRA_NAMES_RU: string[] = ["Альфа", "Бета", "Гамма", "Дельта"];
export const QUADRA_NAMES_EN: string[] = ["Alpha", "Beta", "Gamma", "Delta"];

export const QUADRA_COLORS: string[] = [
  "#78BFC9", // Alpha — soft teal
  "#D98A8C", // Beta  — dusty rose
  "#CDA870", // Gamma — muted gold
  "#8FB58E"  // Delta — sage
];
