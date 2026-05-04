GLI lookup data source
======================

The local spirometry engine uses lookup tables extracted from the CRAN `rspiro`
package version 0.5.

Package: `rspiro`
Author/Maintainer: Theodore Lytras
License: GPL (>= 2)
CRAN/GitHub description: implementation of GLI-2012 and GLI Global 2022
spirometry equations using lookup tables provided by the GLI initiative.

Clinical references:
- Quanjer et al. 2012, European Respiratory Journal, GLI-2012 spirometry equations.
- Bowerman et al. 2023, AJRCCM, GLI Global 2022 race-neutral equations.

Distribution note:
Because the lookup tables and implementation source are taken from a GPL-licensed
package, distribution of this app/module must remain GPL-compatible unless the
project later obtains and uses a separately licensed official GLI dataset/API.

Safety note:
The local engine should be validated against the official GLI calculator before
clinical use. This module remains an educational/reference tool and does not
replace formal spirometry interpretation.
