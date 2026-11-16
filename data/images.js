/* FetalNeuro — эхограммы из открытых источников.
   Только рисунки из статей под CC BY 4.0, сделанные самими авторами (без пометки «reproduced/adapted from»).
   caption — подпись авторов к панели без изменений; captionRu — перевод (черновик).
   Изменения: исходный рисунок разрезан на отдельные панели, буквы панелей убраны.
   source — атрибуция изображения, а не источник медицинских утверждений карточки.
   cards — привязка к срезам ("view:<id>"). status: draft — привязку проверяет автор. */
var FN = globalThis.FN = globalThis.FN || {};
(function () {
  const HU = {
    authors: "Hu Y, Sun L, Feng L, Wang J, Zhu Y, Wu Q",
    title: "The role of routine first-trimester ultrasound screening for central nervous system abnormalities: a longitudinal single-center study using an unselected cohort with 3-year experience",
    journal: "BMC Pregnancy Childbirth", year: 2023, figure: "рис. 1",
    doi: "10.1186/s12884-023-05644-z", url: "https://doi.org/10.1186/s12884-023-05644-z",
    license: "CC BY 4.0", licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
    changes: "панель вырезана из составного рисунка, буква панели удалена"
  };
  const FENG = {
    authors: "Feng L, Sun L, Wang J, Sun C, Lu L, Zhang Z, Hu Y, Wu Q",
    title: "Qualitative and quantitative study of fetal posterior fossa during the first trimester in a Chinese population",
    journal: "BMC Pregnancy Childbirth", year: 2022, figure: "рис. 2",
    doi: "10.1186/s12884-022-05086-z", url: "https://doi.org/10.1186/s12884-022-05086-z",
    license: "CC BY 4.0", licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
    changes: "без изменений"
  };
  const UNG = {
    authors: "Ungureanu, Drăgușin, Căpitănescu и соавт.",
    title: "First Trimester Ultrasound Detection of Fetal Central Nervous System Anomalies",
    journal: "Brain Sci", year: 2023, figure: "рис. 1",
    doi: "10.3390/brainsci13010118", url: "https://doi.org/10.3390/brainsci13010118",
    license: "CC BY 4.0", licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
    changes: "панель вырезана из составного рисунка, подписи и буква панели — авторов"
  };
  FN.IMAGES = [
    {
      id: "ungureanu2023-f1a", file: "img/ungureanu2023-f1a.jpg", cards: ["view:t1-axial"], status: "draft",
      label: "Аксиальный срез: сосудистые сплетения",
      caption: "transverse view of the brain showing the contour and shape of the fetal skull, choroid plexus (arrow) and the filling of lateral cerebral ventricles (arrow)",
      captionRu: "Поперечный срез головы: контур и форма черепа, сосудистое сплетение (стрелка) и заполнение боковых желудочков (стрелка).",
      source: UNG
    },
    {
      id: "ungureanu2023-f1b", file: "img/ungureanu2023-f1b.jpg", cards: ["view:t1-axial"], status: "draft",
      label: "Поперечный срез: III желудочек",
      caption: "further evaluation of the cerebral ventricular system, in transverse planes of the brain showing the third ventricle",
      captionRu: "Дальнейшая оценка желудочковой системы в поперечном срезе: III желудочек.",
      source: UNG
    },
    {
      id: "ungureanu2023-f1c", file: "img/ungureanu2023-f1c.jpg", cards: ["view:t1-axial"], status: "draft",
      label: "Поперечный срез: сильвиев водопровод",
      caption: "transverse planes of the brain showing the aqueduct of Sylvius (arrow)",
      captionRu: "Поперечный срез головы: сильвиев водопровод (стрелка).",
      source: UNG
    },
    {
      id: "ungureanu2023-f1d", file: "img/ungureanu2023-f1d.jpg", cards: ["view:t1-midsag"], status: "draft",
      label: "Срединный сагиттальный срез: измерения",
      caption: "mid-sagittal view of the brain showing the thalamus (Tha) and the measurements for the brain stem (BS), the fourth ventricle (IT), cisterna magna (CM), the nuchal translucency (NT) and the brain stem–occipital bone ratio (BSOB)",
      captionRu: "Срединный сагиттальный срез головы: таламус (Tha) и измерения ствола мозга (BS), IV желудочка (IT), большой цистерны (CM), ТВП (NT) и BSOB.",
      source: UNG
    },
    {
      id: "feng2022-f2", file: "img/feng2022-f2.jpg", cards: ["view:t1-midsag"], status: "draft",
      label: "Срез для ТВП и задний мозг",
      caption: "NT standard section (a) and measurement standards of related parameters (b)",
      captionRu: "Стандартный срез для измерения ТВП (a) и правила измерения связанных параметров (b): BS, IT, CM, BSOB, NT. Подписи на снимке — авторов статьи.",
      source: FENG
    },
    {
      id: "hu2023-f1b", file: "img/hu2023-f1b.jpg", cards: ["view:t1-midsag"], status: "draft",
      label: "Срединный сагиттальный срез головы",
      caption: "midsagittal view of fetal brain",
      captionRu: "Срединный сагиттальный срез головы плода.",
      source: HU
    },
    {
      id: "ungureanu2023-f1e", file: "img/ungureanu2023-f1e.jpg", cards: ["view:t1-spine"], status: "draft",
      label: "Продольный срез позвоночника",
      caption: "longitudinal view of the spine regularity and underlying skin (arrow)",
      captionRu: "Продольный срез позвоночника: правильность ряда позвонков и покрывающая кожа (стрелка).",
      source: UNG
    }
  ];
})();
