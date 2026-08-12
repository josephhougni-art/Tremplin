const PHASE_2 = { title:"Validation / étude de marché", desc:"Entretiens clients, analyse concurrentielle, synthèse.", free:false,
    blocks:[
      {label:"Bloc 1", title:"Entretiens clients", questions:[
        {id:"q1", label:"Combien de personnes as-tu interviewées et qui sont-elles (profils) ?", type:"textarea"},
        {id:"q2", label:"Quelles étaient les principales questions posées ?", type:"textarea"},
        {id:"q3", label:"Quels retours reviennent le plus souvent (points communs) ?", type:"textarea"},
        {id:"q4", label:"Quelles surprises ou objections as-tu rencontrées ?", type:"textarea"},
      ]},
      {label:"Bloc 2", title:"Analyse concurrentielle", questions:[
        {id:"q5", label:"Quels sont tes 3 à 5 concurrents directs ou indirects ?", type:"textarea"},
        {id:"q6", label:"Que proposent-ils (offre, prix) ?", type:"textarea"},
        {id:"q7", label:"Quelles sont leurs forces ?", type:"textarea"},
        {id:"q8", label:"Quelles sont leurs faiblesses, ou ce qu'ils ne couvrent pas ?", type:"textarea"},
      ]},
      {label:"Bloc 3", title:"Synthèse de validation", questions:[
        {id:"q9", label:"Qu'est-ce que ces retours confirment de ton idée initiale ?", type:"textarea"},
        {id:"q10", label:"Qu'est-ce qu'ils remettent en question ou infirment ?", type:"textarea"},
        {id:"q11", label:"Que vas-tu ajuster dans ton idée suite à cette phase ?", type:"textarea"},
      ]},
    ],
    docs:[
      {key:"compte_rendu", label:"Compte-rendu d'entretiens"},
      {key:"analyse_concurrentielle", label:"Analyse concurrentielle"},
      {key:"synthese_validation", label:"Synthèse de validation"},
    ],
    role:"consultant expert en études de marché pour l'Afrique francophone",
    docSpec:'{"compte_rendu":"compte-rendu structuré des entretiens clients : méthodologie, profils interviewés, principaux enseignements, verbatims reformulés","analyse_concurrentielle":"analyse sous forme de tableau texte comparatif : concurrent, offre, prix, forces, faiblesses","synthese_validation":"synthèse claire de ce qui est confirmé, infirmé, et des ajustements à apporter à l\'idée"}'
  };
