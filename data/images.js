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
    authors: "Ungureanu DR, Drăgușin RC, Căpitănescu RG, et al.",
    title: "First Trimester Ultrasound Detection of Fetal Central Nervous System Anomalies",
    journal: "Brain Sci", year: 2023, figure: "рис. 1",
    doi: "10.3390/brainsci13010118", url: "https://doi.org/10.3390/brainsci13010118",
    license: "CC BY 4.0", licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
    changes: "панель вырезана из составного рисунка, подписи и буква панели — авторов"
  };
  const XUE = {
    authors: "Xue X, Tu P, Zhang X, Ran S, Zhang X",
    title: "First-trimester choroid plexus-to-head ratio: a novel sonographic marker for the early detection of fetal central nervous system malformations",
    journal: "Front Med (Lausanne)", year: 2025, figure: "рис. 2",
    doi: "10.3389/fmed.2025.1637954", url: "https://doi.org/10.3389/fmed.2025.1637954",
    license: "CC BY 4.0", licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
    changes: "оставлен нижний ряд (эхограммы D–F), схемы A–C убраны"
  };
  const UNG_CASE = fig => Object.assign({}, UNG, { figure: fig, changes: "оставлены только эхограммы; фотографии после прерывания беременности убраны; подписи и буквы — авторов" });
  const CAST = {
    authors: "Castellanos Gutierrez AS, Schmitz R, Hammer K, et al.",
    title: "Central nervous system biometry in fetuses with and without congenital heart diseases",
    journal: "Arch Gynecol Obstet", year: 2022, figure: "рис. 1",
    doi: "10.1007/s00404-022-06484-6", url: "https://doi.org/10.1007/s00404-022-06484-6",
    license: "CC BY 4.0", licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
    changes: "без изменений"
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
    },
    {
      id: "ungureanu2023-f6a", file: "img/ungureanu2023-f6a.jpg", cards: ["anom:acrania"], status: "draft",
      label: "Анэнцефалия, 12 нед 4 дня",
      caption: "A case of anencephaly diagnosed at 12 weeks + 4 days weeks (Case7): (A) sagittal view of the absence of cranial bones ossification (arrow)",
      captionRu: "Анэнцефалия, диагностирована в 12 нед 4 дня: сагиттальный срез, нет окостенения костей свода черепа (стрелка).",
      source: UNG_CASE("рис. 6")
    },
    {
      id: "ungureanu2023-f7ab", file: "img/ungureanu2023-f7ab.jpg", cards: ["anom:hpe"], status: "draft",
      label: "Алобарная голопрозэнцефалия, 12 нед 5 дней",
      caption: "A case of alobar holoprosencephaly diagnosed at 12 weeks + 5 days (Case 9): (A) transverse view of the abnormal brain cavities; (B) sagittal view of the fetal head showing proboscis (arrow)",
      captionRu: "Алобарная голопрозэнцефалия, 12 нед 5 дней: (A) поперечный срез — аномальные полости мозга; (B) сагиттальный срез головы — хоботок (стрелка).",
      source: UNG_CASE("рис. 7")
    },
    {
      id: "ungureanu2023-f3abc", file: "img/ungureanu2023-f3abc.jpg", cards: ["anom:osb"], status: "draft",
      label: "Открытая spina bifida, 12 нед 3 дня: признаки в голове",
      caption: "A case of OSB diagnosed at 12 weeks + 3 days (Case 1): (A) transverse view of enlarged choroid plexus (the 'dried up' brain sign, arrow); (B) displacement of mesencephalon and aqueduct of Sylvius and deformation against occipital bone ('the crash sign', arrow); (C) mid-sagittal view of the fetal face showing the displacement of BS, which appears thicker (arrow) and with an increased BS/BSOB ratio",
      captionRu: "Открытая spina bifida, 12 нед 3 дня: (A) поперечный срез — крупные сосудистые сплетения, признак «сухого мозга» (стрелка); (B) смещение среднего мозга и сильвиева водопровода и деформация о затылочную кость — «crash sign» (стрелка); (C) срединный сагиттальный срез — смещённый, утолщённый ствол мозга, увеличенное отношение BS/BSOB (стрелка).",
      source: UNG_CASE("рис. 3")
    },
    {
      id: "ungureanu2023-f3d", file: "img/ungureanu2023-f3d.jpg", cards: ["anom:osb"], status: "draft",
      label: "Открытая spina bifida, 12 нед 3 дня: позвоночник",
      caption: "(D) sagittal view by transvaginal approach demonstrating the abnormal aspect of the spine—kyphoscoliosis (arrow)",
      captionRu: "Тот же случай: сагиттальный срез трансвагинальным доступом — изменённый позвоночник, кифосколиоз (стрелка).",
      source: UNG_CASE("рис. 3")
    },
    {
      id: "xue2025-f2def", file: "img/xue2025-f2def.jpg", cards: ["anom:osb"], status: "draft",
      label: "«Бабочка» при вентрикуломегалии, spina bifida и микроцефалии",
      caption: "Illustration and two-dimensional view of the standard axial butterfly plane in fetus with nervous system abnormalities. (A,D) Fetus with ventriculomegaly (VM). (B,E) Fetus with open spina bifida (OSB). (C,F) Fetus with microcephaly. ▲, the lateral ventricles; ✽, the choroid plexus.",
      captionRu: "Стандартный аксиальный срез «бабочки» в I триместре при патологии: (D) вентрикуломегалия, (E) открытая spina bifida, (F) микроцефалия. ▲ — боковые желудочки, ✽ — сосудистые сплетения.",
      source: XUE
    },
    {
      id: "castellanos2022-f1", file: "img/castellanos2022-f1.jpg", cards: ["view:b-transventricular"], status: "draft",
      label: "Трансвентрикулярная плоскость, 24 нед",
      caption: "Transventricular plane of a fetus in a normal pregnancy at the 24th week of gestation. The size of the cavum septi pellucidi (CSP: 4.3 mm) and the size of the lateral ventricle (PV: 6.7 mm) were measured",
      captionRu: "Трансвентрикулярная плоскость, нормальная беременность, 24 нед. Измерены полость прозрачной перегородки (CSP: 4,3 мм) и ширина бокового желудочка (PV: 6,7 мм).",
      source: CAST
    }
  ];
})();
