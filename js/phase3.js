const PHASE_3 = { title:"Cadrage du produit", desc:"Cahier des charges, persona, proposition de valeur.", free:false,
    blocks:[
      {label:"Bloc 1", title:"Cahier des charges", questions:[
        {id:"q1", label:"Quelles sont les fonctionnalités indispensables (must-have) pour la première version ?", type:"textarea"},
        {id:"q2", label:"Quelles fonctionnalités peuvent attendre (nice-to-have) ?", type:"textarea"},
        {id:"q3", label:"Quelles contraintes techniques, légales ou budgétaires dois-tu respecter ?", type:"textarea"},
      ]},
      {label:"Bloc 2", title:"Persona client", questions:[
        {id:"q4", label:"Décris ton client type (âge, activité, habitudes, niveau de revenu)", type:"textarea"},
        {id:"q5", label:"Quels sont ses objectifs et frustrations au quotidien liés à ton produit ?", type:"textarea"},
        {id:"q6", label:"Comment prend-il ses décisions d'achat ?", type:"textarea"},
      ]},
      {label:"Bloc 3", title:"Proposition de valeur", questions:[
        {id:"q7", label:"En une phrase, quelle transformation ton produit apporte-t-il au client ?", type:"textarea"},
        {id:"q8", label:"Pourquoi choisirait-il ton produit plutôt qu'une alternative ?", type:"textarea"},
      ]},
      {label:"Bloc 4", title:"Parcours utilisateur", questions:[
        {id:"q9", label:"Ton produit est-il digital (site, appli, plateforme) ?", type:"input"},
        {id:"q10", label:"Décris les 3 à 5 écrans ou étapes clés du parcours utilisateur", type:"textarea"},
      ]},
    ],
    docs:[
      {key:"cahier_charges", label:"Cahier des charges"},
      {key:"persona", label:"Persona client"},
      {key:"proposition_valeur", label:"Proposition de valeur"},
      {key:"parcours_utilisateur", label:"Parcours utilisateur"},
    ],
    role:"consultant expert en produit et UX pour startups en Afrique francophone",
    docSpec:'{"cahier_charges":"cahier des charges fonctionnel structuré : contexte, fonctionnalités must-have, fonctionnalités nice-to-have, contraintes","persona":"fiche persona détaillée et vivante : nom fictif, profil, objectifs, frustrations, comportement d\'achat","proposition_valeur":"proposition de valeur claire en quelques phrases, avec les raisons de préférence face aux alternatives","parcours_utilisateur":"description textuelle des écrans ou étapes clés du parcours utilisateur, dans l\'ordre"}'
  };
