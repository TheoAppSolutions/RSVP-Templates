export type Pair = readonly [string, string];

export const ENTOURAGE = {
  principalSponsors: [
    ["DR. GREG L. GALOS", "DR. ROLENE PEÑAFRANCIA GALOS"],
    ["DR. MIGUEL V. DUMAS JR.", "MRS. LILY JULIANA T. DUMAS"],
    ["MR. EDWIN S. ESCULTOR", "MRS. VIVIAN G. ESCULTOR"],
    ["MR. MARK CHESTER ANTHONY G. TAMAYO", "DR. FRANCISCA SOFIA V. LILAGAN"],
    ["MR. IRWIN ROBERTO C. VILLACARILLO", "MRS. ROSANA C. VILLACARILLO"],
    ["MR. ALBERTO G. BALDESCO JR.", "MRS. MARLYN G. BALDESCO"],
    ["MR. MORTEN SAETRE", "MRS. MARIBEL N. SAETRE"],
    ["MR. YONGCHUN CAI", "MRS. MARIA MARGARITA J. CAI"],
    ["MR. PEDRO JOHN V. JATULAN", "MRS. MARGARET KIMBERLY D. CABOTE-JATULAN"],
    ["MR. EMMANUEL O. CHONG", "MRS. MONICAR M. CHONG"],
    ["MR. JOFRE M. RUALES", "MRS. JOSEPHINE M. RUALES"],
  ] satisfies Pair[],
  secondarySponsors: [
    { role: "Candle", pair: ["MR. OLIVER L. COLARTE", "MRS. ANNALIZA C. COLARTE"] },
    { role: "Veil", pair: ["MR. MARK DAANTOS", "MRS. MORENA B. DAANTOS"] },
    { role: "Cord", pair: ["MR. RODERICK V. NAVERA", "MRS. JOSELITA E. NAVERA"] },
  ] satisfies { role: string; pair: Pair }[],
  honor: [["MR. AARON A. PEREZ", "MS. HARLENE G. CASTAÑARES"]] satisfies Pair[],
  weddingParty: [
    ["MR. ISIDRO VALENTINE V. JATULAN", "MS. CHERRY L. DACUNES"],
    ["MR. FRANCIS LLOYD O. NAVERA", "MS. MA. ANGELIE Q. ANINO"],
    ["MR. CHRISTIAN O. NAVERA", "MS. CARRIE KATHLYN S. IBAÑEZ"],
    ["MR. JOHN ARTHUR L. URSAL", "MS. NORAFE O. NAVERA"],
    ["MR. PAUL GIDEON D. GADUGDUG", "MS. FAITH NATHALIE D. MACABUS"],
    ["MR. EMELIO D. GADUGDUG JR.", "MS. ZEPHANIAH PRAISE D. MACABUS"],
  ] satisfies Pair[],
  bearers: [
    { role: "Ring Bearer", names: ["KENNETH FELIX D. QUIREQUIRE"] },
    { role: "Coin Bearer", names: ["ZERR ADAM J. CRUZ"] },
    { role: "Bible Bearer", names: ["DJ T. PACAANAS"] },
    {
      role: "Flower Girls",
      names: [
        "MIREILLE A. NAVERA",
        "ELICIA VERON G. GUMBA",
        "VIRCEL Y. CABACABA",
        "BERNICE MIRACLE KYRYN A. PALATINO",
        "ELISHA ANGELY DACUNES",
      ],
    },
  ],
} as const;
