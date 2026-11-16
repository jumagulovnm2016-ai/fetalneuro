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
  },
  "smfm-2018-vm": {
    organization: "Society for Maternal-Fetal Medicine (SMFM)",
    title: "Mild fetal ventriculomegaly: diagnosis, evaluation, and management",
    authors: "Fox NS, Monteagudo A, Kuller JA, Craigo S, Norton ME",
    journal: "Am J Obstet Gynecol", year: 2018, volume: "219", issue: "1", pages: "B2–B9",
    doi: "10.1016/j.ajog.2018.04.039", pmid: "29705191", url: "https://doi.org/10.1016/j.ajog.2018.04.039"
  },
  "pagani-2014-vm": {
    title: "Neurodevelopmental outcome in isolated mild fetal ventriculomegaly: systematic review and meta-analysis",
    authors: "Pagani G, Thilaganathan B, Prefumo F",
    journal: "Ultrasound Obstet Gynecol", year: 2014, volume: "44", issue: "3", pages: "254–260",
    doi: "10.1002/uog.13364", pmid: "24623452", url: "https://doi.org/10.1002/uog.13364"
  },
  "santo-2012-acc": {
    title: "Counseling in fetal medicine: agenesis of the corpus callosum",
    authors: "Santo S, D'Antonio F, Homfray T, et al.",
    journal: "Ultrasound Obstet Gynecol", year: 2012, volume: "40", issue: "5", pages: "513–521",
    doi: "10.1002/uog.12315", pmid: "23024003", url: "https://doi.org/10.1002/uog.12315"
  },
  "dantonio-2016-pf1": {
    title: "Systematic review and meta-analysis of isolated posterior fossa malformations on prenatal ultrasound imaging (part 1): nomenclature, diagnostic accuracy and associated anomalies",
    authors: "D'Antonio F, Khalil A, Garel C, et al.",
    journal: "Ultrasound Obstet Gynecol", year: 2016, volume: "47", issue: "6", pages: "690–697",
    doi: "10.1002/uog.14900", pmid: "25970099", url: "https://doi.org/10.1002/uog.14900"
  },
  "parisi-2025-pf": {
    title: "Outcome of apparently isolated fetal posterior fossa anomalies: systematic review and meta-analysis",
    authors: "Parisi N, Rizzo G, Cecchini F, et al.",
    journal: "Ultrasound Obstet Gynecol", year: 2025, volume: "66", issue: "5", pages: "571–581",
    doi: "10.1002/uog.29309", pmid: "40785453", url: "https://doi.org/10.1002/uog.29309"
  },
  "toi-2004-sulci": {
    title: "How early are fetal cerebral sulci visible at prenatal ultrasound and what is the normal pattern of early fetal sulcal development?",
    authors: "Toi A, Lister WS, Fong KW",
    journal: "Ultrasound Obstet Gynecol", year: 2004, volume: "24", issue: "7", pages: "706–715",
    doi: "10.1002/uog.1802", pmid: "15586358", url: "https://doi.org/10.1002/uog.1802"
  },
  "chaithanya-2022-sulci": {
    title: "Role of Ultrasonography in the Evaluation of Normal Developmental Pattern of Fetal Cerebral Sulci Between 18 and 32 Weeks of Gestational Age",
    authors: "Chaithanya A, Sakalecha AK, Srinivasa BCR",
    journal: "Cureus", year: 2022, volume: "14", issue: "2", pages: "e22581",
    doi: "10.7759/cureus.22581", pmid: "35355543", url: "https://doi.org/10.7759/cureus.22581"
  },
  "mappa-2024-cortex": {
    title: "Sonographic Cortical Development and Anomalies in the Fetus: A Systematic Review and Meta-Analysis",
    authors: "Mappa I, Di Mascio D, Carbone L, et al.",
    journal: "Biomedicines", year: 2024, volume: "12", issue: "7", pages: "1397",
    doi: "10.3390/biomedicines12071397", pmid: "39061971", url: "https://doi.org/10.3390/biomedicines12071397"
  },
  "lermansagie-2021-mcd": {
    title: "A practical approach to prenatal diagnosis of malformations of cortical development",
    authors: "Lerman-Sagie T, Pogledic I, Leibovitz Z, Malinger G",
    journal: "Eur J Paediatr Neurol", year: 2021, volume: "34", pages: "50–61",
    doi: "10.1016/j.ejpn.2021.08.001", pmid: "34390998", url: "https://doi.org/10.1016/j.ejpn.2021.08.001"
  },
  "fong-2004-mds": {
    title: "Prenatal ultrasound findings of lissencephaly associated with Miller-Dieker syndrome and comparison with pre- and postnatal magnetic resonance imaging",
    authors: "Fong KW, Ghai S, Toi A, Blaser S, Winsor EJT, Chitayat D",
    journal: "Ultrasound Obstet Gynecol", year: 2004, volume: "24", issue: "7", pages: "716–723",
    doi: "10.1002/uog.1777", pmid: "15586369", url: "https://doi.org/10.1002/uog.1777"
  },
  "peero-2023-sf": {
    title: "Diagnosis of fetal cortical abnormalities by new reference charts for assessment of sylvian fissure biometry",
    authors: "Peero EK, Kugelman N, Gindes L, et al.",
    journal: "Prenat Diagn", year: 2023, volume: "43", issue: "8", pages: "1066–1078",
    doi: "10.1002/pd.6359", pmid: "37115172", url: "https://doi.org/10.1002/pd.6359"
  },
  "hadi-2026-lvbi": {
    title: "Morphological patterns of fetal lateral ventricular border irregularities: descriptive study",
    authors: "Hadi E, Sorotzkin A, Haddad L, et al.",
    journal: "Ultrasound Obstet Gynecol", year: 2026, volume: "67", issue: "5", pages: "635–645",
    doi: "10.1002/uog.70217", pmid: "41987549", url: "https://doi.org/10.1002/uog.70217"
  }
};
