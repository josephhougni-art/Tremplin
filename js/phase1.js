const PHASE_1 = { title:"Idéation", desc:"Note de concept, canvas d'idée, hypothèses à valider.", free:true,
    blocks:[
      {label:"Bloc 1", title:"Le problème", questions:[
        {id:"q1", label:"Quel problème précis rencontrent tes clients potentiels aujourd'hui ?", type:"textarea"},
        {id:"q2", label:"Comment font-ils actuellement pour y faire face ?", type:"textarea"},
        {id:"q3", label:"Pourquoi ces solutions actuelles ne suffisent pas ?", type:"textarea"},
      ]},
      {label:"Bloc 2", title:"La cible", questions:[
        {id:"q4", label:"Qui est concerné par ce problème (profil) ?", type:"textarea"},
        {id:"q5", label:"Où peux-tu atteindre ces personnes (canaux, lieux, communautés) ?", type:"textarea"},
        {id:"q6", label:"Ce problème les touche-t-il souvent, ou est-ce occasionnel ?", type:"input"},
      ]},
      {label:"Bloc 3", title:"La solution", questions:[
        {id:"q7", label:"Quelle est ton idée de solution, en une phrase ?", type:"textarea"},
        {id:"q8", label:"Qu'est-ce qui la rend différente ou meilleure que l'existant ?", type:"textarea"},
        {id:"q9", label:"Quelle est la killer feature — ce qui ferait dire j'en ai besoin ?", type:"textarea"},
      ]},
      {label:"Bloc 4", title:"Le modèle économique", questions:[
        {id:"q10", label:"Comment comptes-tu générer des revenus ?", type:"textarea"},
        {id:"q11", label:"Qui paiera : le client final, un tiers, ou les deux ?", type:"input"},
        {id:"q12", label:"As-tu une idée du prix ou de la fourchette de prix envisagée ?", type:"input"},
      ]},
      {label:"Bloc 5", title:"Les incertitudes", questions:[
        {id:"q13", label:"Qu'est-ce que tu supposes vrai mais que tu n'as jamais vérifié ?", type:"textarea"},
        {id:"q14", label:"Quel est le plus gros risque qui pourrait faire échouer ce projet ?", type:"textarea"},
        {id:"q15", label:"Si tu devais tester une seule chose en premier, ce serait quoi ?", type:"textarea"},
      ]},
    ],
    docs:[
      {key:"note_concept", label:"Note de concept"},
      {key:"canvas", label:"Canvas d'idée"},
      {key:"hypotheses", label:"Hypothèses à valider"},
    ],
    role:"consultant expert en création d'entreprise en Afrique francophone",
    docSpec:'{"note_concept":"texte complet de la note de concept (1 page : problème, cible, solution en résumé)","canvas":"texte complet du canvas d\'idée (type Lean Canvas) avec chaque section titrée : Problème, Segments clients, Proposition de valeur, Solution, Canaux, Revenus, Coûts, Indicateurs clés, Avantage déloyal","hypotheses":"liste numérotée des hypothèses à valider en priorité, avec pour chacune une courte explication de comment la valider"}'
  };
