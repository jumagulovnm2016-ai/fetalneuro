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
  FN.IMAGES = [
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
      id: "hu2023-f1c", file: "img/hu2023-f1c.jpg", cards: ["view:t1-axial"], status: "draft",
      label: "Трансвентрикулярный срез",
      caption: "the transventricular plane",
      captionRu: "Трансвентрикулярный срез (по авторам: сосудистые сплетения, боковые желудочки, серп мозга).",
      source: HU
    },
    {
      id: "hu2023-f1d", file: "img/hu2023-f1d.jpg", cards: ["view:t1-axial"], status: "draft",
      label: "Трансталамический срез",
      caption: "the transthalamus plane",
      captionRu: "Трансталамический срез (по авторам: таламусы и целостность костей черепа).",
      source: HU
    },
    {
      id: "hu2023-f1a", file: "img/hu2023-f1a.jpg", cards: ["view:t1-spine"], status: "draft",
      label: "Срединный сагиттальный срез плода",
      caption: "midsagittal plane of the fetus",
      captionRu: "Срединный сагиттальный срез плода (в статье — для измерения КТР). Это не прицельный срез позвоночника: позвоночник и кожа спины видны вдоль всего плода.",
      source: HU
    }
  ];
})();
