/* FetalNeuro — модуль данных. Подключается до app.js. */
var FN = globalThis.FN = globalThis.FN || {};
FN.META = {
  "title": "FetalNeuro",
  "subtitle": "Нейросонография плода с 11 недель",
  "author": "Жумагулов Н.М., врач ультразвуковой диагностики",
  "version": "0.1 (пилот)",
  "updated": "ноябрь 2026"
};

/* Периоды исследования. Срезы в FN.VIEWS ссылаются на id периода. */
FN.PERIODS = [
  { "id": "t1", "name": "11–14 недель", "sub": "Ранняя оценка ЦНС при скрининге I триместра" },
  { "id": "basic", "name": "II–III триместр: базовое исследование", "sub": "Скрининговая оценка головного мозга и позвоночника (ISUOG, часть 1)" },
  { "id": "targeted", "name": "Прицельная нейросонография", "sub": "Экспертное исследование: корональные и сагиттальные срезы (ISUOG, часть 2)" }
];

/* План разделов, которые ещё не написаны. Показываются как «в разработке».
   type: view — срез, anomaly — порок. */
FN.PLAN = [
  { "period": "basic", "type": "view", "name": "Трансвентрикулярная плоскость" },
  { "period": "basic", "type": "view", "name": "Трансталамическая плоскость" },
  { "period": "basic", "type": "view", "name": "Трансцеребеллярная плоскость" },
  { "period": "basic", "type": "view", "name": "Позвоночник во II–III триместре" },
  { "period": "targeted", "type": "view", "name": "Корональные срезы" },
  { "period": "targeted", "type": "view", "name": "Сагиттальные срезы: срединный и парасагиттальные" },
  { "period": "targeted", "type": "view", "name": "Мозолистое тело и срединные структуры" },
  { "period": "targeted", "type": "view", "name": "Кора: борозды и извилины по срокам" },
  { "period": "t1", "type": "anomaly", "name": "Акрания — экзэнцефалия — анэнцефалия" },
  { "period": "t1", "type": "anomaly", "name": "Голопрозэнцефалия" },
  { "period": "t1", "type": "anomaly", "name": "Открытая spina bifida и мальформация Киари II" },
  { "period": "t1", "type": "anomaly", "name": "Кистозные пороки задней черепной ямки" },
  { "period": "basic", "type": "anomaly", "name": "Вентрикуломегалия" },
  { "period": "basic", "type": "anomaly", "name": "Агенезия мозолистого тела" },
  { "period": "basic", "type": "anomaly", "name": "Порок Денди–Уокера, киста кармана Блейка, гипоплазия червя" },
  { "period": "basic", "type": "anomaly", "name": "Цефалоцеле" },
  { "period": "targeted", "type": "anomaly", "name": "Нарушения развития коры" },
  { "period": "targeted", "type": "anomaly", "name": "Микроцефалия" }
];
