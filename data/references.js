/* FetalNeuro — реестр источников.
   Каждый источник сверен с записью PubMed (PMID и DOI, 16.11.2026).
   Карточки ссылаются на источник по id и указывают раздел (section).
   verified: true — утверждение раздела сверено с резюме (abstract) источника, обычно это цифры;
   verified: false, section: "card" — документ по теме, соответствие конкретным утверждениям
   не сверено: это делает автор при рецензии. */
var FN = globalThis.FN = globalThis.FN || {};
FN.REFS = {
  "isuog-2023-11-14": {
    organization: "International Society of Ultrasound in Obstetrics and Gynecology (ISUOG)",
    title: "ISUOG Practice Guidelines (updated): performance of 11–14-week ultrasound scan",
    authors: "Bilardo CM, Chaoui R, Hyett JA, et al.",
    journal: "Ultrasound Obstet Gynecol", year: 2023, volume: "61", issue: "1", pages: "127–143",
    doi: "10.1002/uog.26106", pmid: "36594739", url: "https://doi.org/10.1002/uog.26106"
  },
  "isuog-2020-cns-1": {
    organization: "International Society of Ultrasound in Obstetrics and Gynecology (ISUOG)",
    title: "ISUOG Practice Guidelines (updated): sonographic examination of the fetal central nervous system. Part 1: performance of screening examination and indications for targeted neurosonography",
    authors: "Malinger G, Paladini D, Haratz KK, et al.",
    journal: "Ultrasound Obstet Gynecol", year: 2020, volume: "56", issue: "3", pages: "476–484",
    doi: "10.1002/uog.22145", pmid: "32870591", url: "https://doi.org/10.1002/uog.22145"
  },
  "isuog-2021-cns-2": {
    organization: "International Society of Ultrasound in Obstetrics and Gynecology (ISUOG)",
    title: "ISUOG Practice Guidelines (updated): sonographic examination of the fetal central nervous system. Part 2: performance of targeted neurosonography",
    authors: "Paladini D, Malinger G, Birnbaum R, et al.",
    journal: "Ultrasound Obstet Gynecol", year: 2021, volume: "57", issue: "4", pages: "661–671",
    doi: "10.1002/uog.23616", pmid: "33734522", url: "https://doi.org/10.1002/uog.23616"
  },
  "chaoui-2009-it": {
    title: "Assessment of intracranial translucency (IT) in the detection of spina bifida at the 11–13-week scan",
    authors: "Chaoui R, Benoit B, Mitkowska-Wozniak H, Heling KS, Nicolaides KH",
    journal: "Ultrasound Obstet Gynecol", year: 2009, volume: "34", issue: "3", pages: "249–252",
    doi: "10.1002/uog.7329", pmid: "19705402", url: "https://doi.org/10.1002/uog.7329"
  },
  "chaoui-2010-editorial": {
    title: "From nuchal translucency to intracranial translucency: towards the early detection of spina bifida",
    authors: "Chaoui R, Nicolaides KH",
    journal: "Ultrasound Obstet Gynecol", year: 2010, volume: "35", issue: "2", pages: "133–138",
    doi: "10.1002/uog.7552", pmid: "20101633", url: "https://doi.org/10.1002/uog.7552"
  },
  "lachmann-2011-bsob": {
    title: "Posterior brain in fetuses with open spina bifida at 11 to 13 weeks",
    authors: "Lachmann R, Chaoui R, Moratalla J, Picciarelli G, Nicolaides KH",
    journal: "Prenat Diagn", year: 2011, volume: "31", issue: "1", pages: "103–106",
    doi: "10.1002/pd.2632", pmid: "21188735", url: "https://doi.org/10.1002/pd.2632"
  },
  "sepulveda-2013-butterfly": {
    title: "First trimester screening for holoprosencephaly with choroid plexus morphology ('butterfly' sign) and biparietal diameter",
    authors: "Sepulveda W, Wong AE",
    journal: "Prenat Diagn", year: 2013, volume: "33", issue: "13", pages: "1233–1237",
    doi: "10.1002/pd.4235", pmid: "24018978", url: "https://doi.org/10.1002/pd.4235"
  },
  "loureiro-2012-ventricles": {
    title: "Cerebral ventricular system in fetuses with open spina bifida at 11–13 weeks' gestation",
    authors: "Loureiro T, Ushakov F, Montenegro N, Gielchinsky Y, Nicolaides KH",
    journal: "Ultrasound Obstet Gynecol", year: 2012, volume: "39", issue: "6", pages: "620–624",
    doi: "10.1002/uog.11079", pmid: "22190387", url: "https://doi.org/10.1002/uog.11079"
  },
  "volpe-2016-pf": {
    title: "Appearance of fetal posterior fossa at 11–14 weeks in fetuses with Dandy-Walker malformation or chromosomal anomalies",
    authors: "Volpe P, Contro E, Fanelli T, Muto B, Pilu G, Gentile M",
    journal: "Ultrasound Obstet Gynecol", year: 2016, volume: "47", issue: "6", pages: "720–725",
    doi: "10.1002/uog.14883", pmid: "25914043", url: "https://doi.org/10.1002/uog.14883"
  },
  "volpe-2019-pf": {
    title: "Prospective detection and differential diagnosis of cystic posterior fossa anomalies by assessing posterior brain at 11–14 weeks",
    authors: "Volpe P, Persico N, Fanelli T, et al.",
    journal: "Am J Obstet Gynecol MFM", year: 2019, volume: "1", issue: "2", pages: "173–181",
    doi: "10.1016/j.ajogmf.2019.06.004", pmid: "33345823", url: "https://doi.org/10.1016/j.ajogmf.2019.06.004"
  },
  "hu-2023-cns": {
    title: "The role of routine first-trimester ultrasound screening for central nervous system abnormalities: a longitudinal single-center study using an unselected cohort with 3-year experience",
    authors: "Hu Y, Sun L, Feng L, Wang J, Zhu Y, Wu Q",
    journal: "BMC Pregnancy Childbirth", year: 2023, volume: "23", issue: "1", pages: "312",
    doi: "10.1186/s12884-023-05644-z", pmid: "37138220", url: "https://doi.org/10.1186/s12884-023-05644-z"
  },
  "syngelaki-2019": {
    title: "Diagnosis of fetal non-chromosomal abnormalities on routine ultrasound examination at 11–13 weeks' gestation",
    authors: "Syngelaki A, Hammami A, Bower S, Zidere V, Akolekar R, Nicolaides KH",
    journal: "Ultrasound Obstet Gynecol", year: 2019, volume: "54", issue: "4", pages: "468–476",
    doi: "10.1002/uog.20844", pmid: "31408229", url: "https://doi.org/10.1002/uog.20844"
  },
  "ushakov-2019-crash": {
    title: "Crash sign: new first-trimester sonographic marker of spina bifida",
    authors: "Ushakov F, Sacco A, Andreeva E, et al.",
    journal: "Ultrasound Obstet Gynecol", year: 2019, volume: "54", issue: "6", pages: "740–745",
    doi: "10.1002/uog.20285", pmid: "30977215", url: "https://doi.org/10.1002/uog.20285"
  },
  "ungureanu-2023": {
    title: "First Trimester Ultrasound Detection of Fetal Central Nervous System Anomalies",
    authors: "Ungureanu DR, Drăgușin RC, Căpitănescu RG, et al.",
    journal: "Brain Sci", year: 2023, volume: "13", issue: "1", pages: "118",
    doi: "10.3390/brainsci13010118", pmid: "36672099", url: "https://doi.org/10.3390/brainsci13010118"
  },
  "xue-2025-cp": {
    title: "First-trimester choroid plexus-to-head ratio: a novel sonographic marker for the early detection of fetal central nervous system malformations",
    authors: "Xue X, Tu P, Zhang X, Ran S, Zhang X",
    journal: "Front Med (Lausanne)", year: 2025, volume: "12", pages: "1637954",
    doi: "10.3389/fmed.2025.1637954", pmid: "41267861", url: "https://doi.org/10.3389/fmed.2025.1637954"
  }
};
