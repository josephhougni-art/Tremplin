const PHASE_7 = { title:"Suivi post-lancement", desc:"Tableau de bord KPIs, rapport de bilan.", free:false,
    blocks:[
      {label:"Bloc 1", title:"Tableau de bord", questions:[
        {id:"q1", label:"Quels indicateurs veux-tu suivre en priorité (ventes, conversion, satisfaction, autre) ?", type:"textarea"},
        {id:"q2", label:"Quels sont tes objectifs chiffrés pour le premier mois ou trimestre ?", type:"textarea"},
      ]},
      {label:"Bloc 2", title:"Rapport de bilan", questions:[
        {id:"q3", label:"Depuis le lancement, qu'est-ce qui fonctionne bien ?", type:"textarea"},
        {id:"q4", label:"Qu'est-ce qui ne fonctionne pas comme prévu ?", type:"textarea"},
        {id:"q5", label:"Quels ajustements comptes-tu faire suite à ce bilan ?", type:"textarea"},
      ]},
    ],
    docs:[
      {key:"tableau_bord", label:"Tableau de bord KPIs"},
      {key:"rapport_bilan", label:"Rapport de bilan"},
    ],
    role:"consultant expert en pilotage de performance pour startups en Afrique francophone",
    docSpec:'{"tableau_bord":"description d\'un tableau de bord avec la liste des indicateurs clés à suivre, leur fréquence de suivi et les objectifs chiffrés associés","rapport_bilan":"rapport de bilan structuré : points forts, points faibles, ajustements décidés, prochaines priorités"}'
  };
