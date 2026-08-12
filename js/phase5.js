const PHASE_5 = { title:"Structuration juridique", desc:"Statuts, documents d'enregistrement.", free:false,
    blocks:[
      {label:"Bloc unique", title:"Structuration juridique et administrative", questions:[
        {id:"q1", label:"Dans quel pays et quelle ville comptes-tu enregistrer ton entreprise ?", type:"input"},
        {id:"q2", label:"Quelle forme juridique envisages-tu (entreprise individuelle, SARL, SA, autre) ?", type:"input"},
        {id:"q3", label:"Seras-tu seul(e) ou avec des associés (et dans quelles proportions) ?", type:"textarea"},
        {id:"q4", label:"As-tu déjà commencé des démarches administratives ? Si oui, lesquelles ?", type:"textarea"},
      ]},
    ],
    docs:[
      {key:"statuts", label:"Statuts de l'entreprise"},
      {key:"documents_enregistrement", label:"Documents d'enregistrement"},
    ],
    role:"consultant expert en structuration juridique d'entreprises en Afrique francophone",
    docSpec:'{"statuts":"projet de statuts simplifié adapté à la forme juridique et au pays indiqués, avec les clauses essentielles (objet social, capital, gérance, répartition entre associés) — préciser que ceci est un point de départ à faire valider par un juriste local","documents_enregistrement":"liste des documents et démarches d\'enregistrement généralement nécessaires dans le pays indiqué, avec un avertissement que la réglementation doit être vérifiée localement"}'
  };
