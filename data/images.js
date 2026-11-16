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
  const MAT = {
    authors: "Matasariu DR, Bujor IE, Gireada RM, et al.",
    title: "Challenges in Prenatal Ultrasound Diagnosis of Rubinstein–Taybi Syndrome: A Case Report and Comprehensive Literature Review",
    journal: "Int J Mol Sci", year: 2025, figure: "рис. 2",
    doi: "10.3390/ijms26115142", url: "https://doi.org/10.3390/ijms26115142",
    license: "CC BY 4.0", licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
    changes: "панель вырезана из составного рисунка"
  };
  const TAM = {
    authors: "Tamhankar PM, Kachhadiya T, Tamhankar V, et al.",
    title: "The First Known Case Report of a Novel Homozygous Nonsense Variant in the OSBPL9 Gene Associated With Fetal Cerebral Ventriculomegaly, Cerebellar Hypoplasia, and Arthrogryposis Multiplex",
    journal: "Cureus", year: 2025, figure: "рис. 9",
    doi: "10.7759/cureus.80010", url: "https://doi.org/10.7759/cureus.80010",
    license: "CC BY 4.0", licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
    changes: "без изменений"
  };
  const VIN = {
    authors: "Viñals F, et al.",
    title: "Anomalies on anterior and posterior complex views in fetuses with partial agenesis of corpus callosum",
    journal: "Ultrasound Obstet Gynecol", year: 2025, figure: "рис. 6",
    doi: "10.1002/uog.29292", url: "https://doi.org/10.1002/uog.29292",
    license: "CC BY 4.0", licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
    changes: "оставлена панель (c), увеличена в 2 раза; цифры и буква панели — авторов"
  };
  const BER = {
    authors: "Berbeka K, Świetlicki A, Stefańska K, et al.",
    title: "The Value of Transvaginal Neurosonography in the Detection of Fetal Ganglionic Eminence Abnormalities",
    journal: "Life (Basel)", year: 2026, figure: "рис. 2",
    doi: "10.3390/life16081362", url: "https://doi.org/10.3390/life16081362",
    license: "CC BY 4.0", licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
    changes: "из каждой пары снимков оставлен вариант со стрелкой (без измерений); буквы панелей и стрелки — авторов"
  };
  const CHA = fig => ({
    authors: "Chaithanya A, Sakalecha AK, Srinivasa BCR",
    title: "Role of Ultrasonography in the Evaluation of Normal Developmental Pattern of Fetal Cerebral Sulci Between 18 and 32 Weeks of Gestational Age",
    journal: "Cureus", year: 2022, figure: fig,
    doi: "10.7759/cureus.22581", url: "https://doi.org/10.7759/cureus.22581",
    license: "CC BY", licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
    changes: "без изменений"
  });
  const HADI = fig => ({
    authors: "Hadi E, Sorotzkin A, Haddad L, et al.",
    title: "Morphological patterns of fetal lateral ventricular border irregularities: descriptive study",
    journal: "Ultrasound Obstet Gynecol", year: 2026, figure: fig,
    doi: "10.1002/uog.70217", url: "https://doi.org/10.1002/uog.70217",
    license: "CC BY 4.0", licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
    changes: "без изменений (схемы и МРТ — авторов)"
  });
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
    },
    {
      id: "matasariu2025-f2a", file: "img/matasariu2025-f2a.jpg", cards: ["view:b-transthalamic"], status: "draft",
      label: "Трансталамическая плоскость, 21 нед",
      caption: "Series of second-trimester morphological ultrasound images of the fetus at 21 weeks of gestation, with normal appearance (the first image shows a transthalamic view of the fetal head...)",
      captionRu: "Трансталамическая плоскость в 21 нед 6 дней, описана авторами как нормальная; измерены БПР, ЛЗР, ОГ, CSP. У этого плода позже диагностирован синдром Рубинштейна–Тейби; на снимках ЦНС отклонений нет.",
      source: MAT
    },
    {
      id: "matasariu2025-f2b", file: "img/matasariu2025-f2b.jpg", cards: ["view:b-transcerebellar"], status: "draft",
      label: "Трансцеребеллярная плоскость, 21 нед",
      caption: "...the second one shows a transcerebral view... Abbreviations: CM (cisterna magna); Cereb (Cerebellum); NF/NT (nuchal fold)",
      captionRu: "Трансцеребеллярная плоскость в 21 нед 6 дней, описана авторами как нормальная; измерены мозжечок (Cereb), большая цистерна (CM) и шейная складка (NF). У этого плода позже диагностирован синдром Рубинштейна–Тейби; на снимках ЦНС отклонений нет.",
      source: MAT
    },
    {
      id: "tamhankar2025-f9", file: "img/tamhankar2025-f9.jpg", cards: ["view:b-spine"], status: "draft",
      label: "Сагиттальный срез позвоночника, 21 нед",
      caption: "Antenatal ultrasound of the fetus in the second pregnancy at around 21 weeks 2 days gestation, showing a sagittal view of the spine (ceph: cephalic side, caud: caudal side) with normal anatomy; the cervical (white arrow), thoracic (red arrow), and lumbar (yellow arrow) segments are seen with normal curvature.",
      captionRu: "Сагиттальный срез позвоночника в 21 нед 2 дня, нормальная анатомия: шейный (белая стрелка), грудной (красная) и поясничный (жёлтая) отделы с нормальным изгибом. Ceph — головной конец, Caud — каудальный. У этого плода были вентрикуломегалия, гипоплазия мозжечка и артрогрипоз; позвоночник авторы описывают как нормальный.",
      source: TAM
    },
    {
      id: "tamhankar2025-f7", file: "img/tamhankar2025-f7.jpg", cards: ["anom:vm"], status: "draft",
      label: "Тяжёлая вентрикуломегалия, 21 нед",
      caption: "Antenatal ultrasound of the fetus shows a transverse view of the fetal skull (ant: anterior side, post: posterior side) around 21 weeks 2 days gestation, with dilated cerebral ventricles (blue arrows) (measuring 16.63 mm and 23.75 mm in diameter) showing a dangling choroid plexus (red arrows); the falx cerebri is normal (white arrow).",
      captionRu: "Поперечный срез головы в 21 нед 2 дня: расширенные боковые желудочки (синие стрелки; 16,63 и 23,75 мм), «свисающие» сосудистые сплетения (красные стрелки), серп мозга нормальный (белая стрелка).",
      source: Object.assign({}, TAM, { figure: "рис. 7" })
    },
    {
      id: "tamhankar2025-f8", file: "img/tamhankar2025-f8.jpg", cards: ["anom:pf-2tri", "anom:vm"], status: "draft",
      label: "Гипоплазия мозжечка и вентрикуломегалия, 21 нед",
      caption: "...a transverse view of the fetal skull at the level of the posterior fossa ... around 21 weeks 2 days gestation, showing dilated cerebral ventricles (blue arrows), cerebellar hypoplasia (yellow arrow), the trans-cerebellar diameter was 17.59 mm (6 percentile, z score is minus 1.59), cisterna magna was normal (green arrow), and falx cerebri was normal (white arrow).",
      captionRu: "Поперечный срез на уровне задней черепной ямки в 21 нед 2 дня: расширенные желудочки (синие стрелки), гипоплазия мозжечка (жёлтая стрелка; поперечный размер 17,59 мм — 6-й перцентиль), большая цистерна нормальная (зелёная стрелка), серп нормальный (белая стрелка).",
      source: Object.assign({}, TAM, { figure: "рис. 8" })
    },
    {
      id: "vinals2025-f6c", file: "img/vinals2025-f6c.jpg", cards: ["view:tg-midsag", "anom:acc"], status: "draft",
      label: "Срединный сагиттальный срез, 22 нед (норма, трансвагинально)",
      caption: "(c) Transvaginal image in midsagittal plane showing all parts of the corpus callosum, including rostrum (1), genu (2), body (3) and splenium (4)",
      captionRu: "Нормальный плод, 22 нед, трансвагинальный доступ, срединная сагиттальная плоскость: видны все отделы мозолистого тела — клюв (1), колено (2), тело (3) и валик (4). Значение «**» — см. подпись в оригинале статьи.",
      source: VIN
    },
    {
      id: "berbeka2026-f2a", file: "img/berbeka2026-f2a.jpg", cards: ["view:tg-coronal"], status: "draft",
      label: "Корональный срез: ганглионарные бугорки",
      caption: "(A) Coronal view showing the GE (arrow) located inferolateral to the frontal horns of the lateral ventricles.",
      captionRu: "Корональный срез: ганглионарный бугорок (ГБ, стрелка) расположен книзу и латеральнее передних рогов боковых желудочков.",
      source: BER
    },
    {
      id: "berbeka2026-f2b", file: "img/berbeka2026-f2b.jpg", cards: ["view:tg-parasag"], status: "draft",
      label: "Парасагиттальный срез: ганглионарный бугорок",
      caption: "(B) Parasagittal view demonstrating the normal appearance of the GE (arrow) anterior and inferior to the choroid plexus within the caudothalamic groove.",
      captionRu: "Парасагиттальный срез: нормальный вид ганглионарного бугорка (стрелка) кпереди и книзу от сосудистого сплетения, в каудоталамической борозде.",
      source: BER
    },
    {
      id: "chaithanya2022-f1", file: "img/chaithanya2022-f1.jpg", cards: ["view:tg-cortex"], status: "draft",
      label: "Теменно-затылочная борозда: 18, 20 и 26 нед",
      caption: "(A) Fetus of 18 weeks 1 day gestational age demonstrating POF in the form of a dot pattern (long white arrow). (B) Fetus of 20 weeks 2 days gestational age demonstrating POF in the form of V-shaped indentation (long white arrow). (C) Fetus of 26 weeks 5 days gestational age demonstrating POF in the form of Y-shaped configuration (long white arrow).",
      captionRu: "Аксиальные срезы, теменно-затылочная борозда (стрелка): (A) 18 нед 1 день — точка; (B) 20 нед 2 дня — V-образная вырезка; (C) 26 нед 5 дней — Y-образная борозда.",
      source: CHA("рис. 1")
    },
    {
      id: "chaithanya2022-f2", file: "img/chaithanya2022-f2.jpg", cards: ["view:tg-cortex"], status: "draft",
      label: "Шпорная борозда: 19, 21 и 26 нед",
      caption: "(A) Fetus of 19 weeks 3 days gestational age demonstrating CF in the form of a dot pattern (long white arrow). (B) Fetus of 21 weeks 2 days gestational age demonstrating CF in the form of a V-shaped indentation (long white arrow). (C) Fetus of 25 weeks 6 days gestational age demonstrating CF in the form of a Y-shaped configuration (long white arrow).",
      captionRu: "Корональные срезы, шпорная борозда (стрелка): (A) 19 нед 3 дня — точка; (B) 21 нед 2 дня — V-образная вырезка; (C) 25 нед 6 дней — Y-образная борозда.",
      source: CHA("рис. 2")
    },
    {
      id: "chaithanya2022-f3", file: "img/chaithanya2022-f3.jpg", cards: ["view:tg-cortex"], status: "draft",
      label: "Поясная борозда: 23, 25 и 28 нед",
      caption: "Two-dimensional ultrasound grey-scale images (coronal sections) where cavum septum pellucidum (star) was seen, demonstrating various patterns of CS at different gestational ages. (A) Fetus of 23 weeks 1 day gestational age demonstrating CS in the form of a dot pattern (long white arrow). (B) Fetus of 25 weeks 3 days gestational age demonstrating CS in the form of a V-shaped indentation (long white arrow). (C) Fetus of 28 weeks gestational age demonstrating CS in the form of a Y-shaped configuration (long white arrow).",
      captionRu: "Корональные срезы на уровне полости прозрачной перегородки (звёздочка), поясная борозда (стрелка): (A) 23 нед 1 день — точка; (B) 25 нед 3 дня — V-образная вырезка; (C) 28 нед — Y-образная борозда.",
      source: CHA("рис. 3")
    },
    {
      id: "chaithanya2022-f4", file: "img/chaithanya2022-f4.jpg", cards: ["view:tg-cortex"], status: "draft",
      label: "Сильвиева борозда: оперкуляризация, 19–26 нед",
      caption: "(A) Fetus of 19 weeks 4 days gestational age demonstrating SF in the form of a smooth pattern (long white arrow). (B) Fetus of 22 weeks gestational age demonstrating an obtuse angle (> 90°) between SF and the adjacent temporal lobe (long white arrow). (C) Fetus of 25 weeks 6 days gestational age demonstrating an acute angle (< 90°) between Sylvian fissure and the adjacent temporal lobe (long white arrow).",
      captionRu: "Аксиальные срезы, сильвиева борозда (стрелка): (A) 19 нед 4 дня — гладкий контур; (B) 22 нед — тупой угол (> 90°) с височной долей; (C) 25 нед 6 дней — острый угол (< 90°).",
      source: CHA("рис. 4")
    },
    {
      id: "chaithanya2022-f5", file: "img/chaithanya2022-f5.jpg", cards: ["view:tg-cortex"], status: "draft",
      label: "Борозды выпуклой поверхности: 21 и 28 нед",
      caption: "(A) Fetus of 21 weeks 3 days gestational age showing a smooth lateral brain surface without any sulcal indentations (long white arrow). (B) Fetus of 28 weeks 5 days gestational age demonstrating multiple indentations on the lateral brain surface (white arrowheads) suggestive of convexity sulci.",
      captionRu: "Аксиальные срезы: (A) 21 нед 3 дня — гладкая латеральная поверхность мозга без борозд (стрелка); (B) 28 нед 5 дней — множественные вырезки на латеральной поверхности (наконечники стрелок), это борозды выпуклой поверхности.",
      source: CHA("рис. 5")
    },
    {
      id: "hadi2026-f1", file: "img/hadi2026-f1.jpg", cards: ["anom:mcd", "anom:pvnh", "view:tg-parasag"], status: "draft",
      label: "Типы неровного контура бокового желудочка",
      caption: "Schematic representations and corresponding ultrasound images of four main patterns of fetal lateral ventricular border irregularities (protrusion, indentation, undulation and mixed) compared with normal smooth lateral ventricular borders.",
      captionRu: "Схемы авторов и соответствующие эхограммы (парасагиттальные срезы) четырёх основных типов неровного контура бокового желудочка — выпячивания (узловые и неузловые), вдавления (округлые и клиновидные), волнистость и смешанный тип — в сравнении с нормальным гладким контуром (вверху).",
      source: HADI("рис. 1")
    },
    {
      id: "hadi2026-f3", file: "img/hadi2026-f3.jpg", cards: ["anom:pvnh"], status: "draft",
      label: "Перивентрикулярная узловая гетеротопия (FLNA), 25–37 нед",
      caption: "Nodular protrusion patterns of lateral ventricular border irregularities representing periventricular nodular heterotopia in three female fetuses with FLNA gene mutation, and corresponding schematic diagrams. (a,b) Case NP1 at 37 weeks: (a) axial transvaginal ultrasound shows multiple diffuse, bilateral, contiguous small nodular protrusions along the lateral ventricular border (LVB) (arrows) with intermediate echogenicity; and (b) corresponding T2-weighted magnetic resonance imaging (MRI) shows low-signal nodules isointense to cortex (arrows). (c,d) Case NP3 at 25 weeks: (c) sagittal transvaginal ultrasound shows small nodular protrusions along lower LVB (arrows) and undulating pattern along upper LVB (arrowheads); and (d) coronal transvaginal ultrasound demonstrates a squared anterior horn (arrowhead). (e,f) Case NP4: (e) sagittal transvaginal ultrasound at 26 weeks shows undulating LVB pattern (arrowheads); and (f) T2-weighted MRI at 28 weeks demonstrates multiple small nodular protrusions along the upper LVB (arrows).",
      captionRu: "Перивентрикулярная узловая гетеротопия у трёх плодов женского пола с мутацией FLNA. (a) 37 нед, аксиальный трансвагинальный срез: множественные мелкие узловые выпячивания вдоль стенок обоих желудочков (стрелки), средней эхогенности; (b) МРТ T2 — узлы изоинтенсивны коре. (c) 25 нед, сагиттальный срез: узелки по нижней стенке (стрелки) и волнистость верхней (наконечники); (d) корональный срез — «квадратный» передний рог. (e) 26 нед: волнистый контур (наконечники); (f) МРТ в 28 нед — множественные узелки по верхней стенке.",
      source: HADI("рис. 3")
    },
    {
      id: "hadi2026-f6", file: "img/hadi2026-f6.jpg", cards: ["anom:mcd", "anom:schizencephaly", "anom:pvnh"], status: "draft",
      label: "Контур желудочков при пороках коры; шизэнцефалия, 24–35 нед",
      caption: "Patterns of lateral ventricular border irregularities (LVBI) observed with malformations of cortical development, and corresponding schematic diagrams. (a–c) Case M2, diagnosed prenatally with atretic posterior encephalocele. Sagittal (a,b) and coronal (c) transvaginal ultrasound at 24 weeks shows a mixed LVBI pattern including undulations (arrow heads), wedge-shaped indentation (hollow arrow) and abnormal sulcation (curved line). Autopsy demonstrated periventricular nodular heterotopia (PNH) and subcortical heterotopia. (d,e) Case M1. ... (f,g) Case M3. ... (h–j) Case WI13. (h) Coronal transvaginal ultrasound at 32 weeks shows a deep wedge-shaped indentation (hollow arrow), extending into unilateral cleft schizencephaly. (i,j) Coronal T2-weighted MRI at 32 weeks (i) better delineates the transmantle cleft (hollow arrow), with a corresponding wedge-shaped indentation in the sagittal view (j) (hollow arrow). Ipsilateral perisylvian polymicrogyria is evident (curved line).",
      captionRu: "Контур желудочков при пороках коры. (a–c) 24 нед: смешанный тип — волнистость (наконечники), клиновидное вдавление (полая стрелка), аномальная сулькация (изогнутая линия); на аутопсии — перивентрикулярная и субкортикальная гетеротопия. (d,e) 24 нед: смешанный тип и аномальная сулькация над стенкой желудочка; сочетание с агенезией мозолистого тела и колобомой сетчатки — вероятен синдром Айкарди. (f,g) 35 нед: клиновидные вдавления и узловые выпячивания; МРТ подтверждает гетеротопию. (h–j) 32 нед: глубокое клиновидное вдавление, переходящее в одностороннюю шизэнцефалию; на МРТ — сквозная расщелина и полимикрогирия вокруг сильвиевой борозды на той же стороне.",
      source: HADI("рис. 6")
    }
  ];
})();
