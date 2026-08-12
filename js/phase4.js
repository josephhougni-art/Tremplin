const PHASE_4 = { title:"Plan d'affaires", desc:"Business plan, plan financier, plan marketing.", free:false,
    blocks:[
      {label:"Bloc 1", title:"Business plan", questions:[
        {id:"q1", label:"Quelle est la mission et la vision de ton entreprise ?", type:"textarea"},
        {id:"q2", label:"Quel est ton modèle d'affaires détaillé (comment tu crées, délivres et captures de la valeur) ?", type:"textarea"},
        {id:"q3", label:"Quelle est ta stratégie de développement à 1-3 ans ?", type:"textarea"},
      ]},
      {label:"Bloc 2", title:"Plan financier", questions:[
        {id:"q4", label:"Quel est ton investissement de départ nécessaire (grandes lignes) ?", type:"textarea"},
        {id:"q5", label:"Quelles sont tes principales charges mensuelles ou récurrentes ?", type:"textarea"},
        {id:"q6", label:"Quel chiffre d'affaires vises-tu pour atteindre le seuil de rentabilité ?", type:"textarea"},
      ]},
      {label:"Bloc 3", title:"Plan marketing", questions:[
        {id:"q7", label:"Quels canaux comptes-tu utiliser pour acquérir tes premiers clients ?", type:"textarea"},
        {id:"q8", label:"Quel budget marketing envisages-tu (ordre de grandeur) ?", type:"input"},
        {id:"q9", label:"Quel message clé veux-tu faire passer dans ta communication ?", type:"textarea"},
      ]},
    ],
    docs:[
      {key:"business_plan", label:"Business plan"},
      {key:"plan_financier", label:"Plan financier"},
      {key:"plan_marketing", label:"Plan marketing"},
    ],
    role:"consultant expert en stratégie d'entreprise pour l'Afrique francophone",
    docSpec:'{"business_plan":"business plan structuré : mission, vision, modèle d\'affaires, stratégie de développement 1-3 ans","plan_financier":"plan financier synthétique : investissement de départ, charges récurrentes, estimation du seuil de rentabilité, présenté clairement","plan_marketing":"plan marketing structuré : canaux d\'acquisition, budget indicatif, message clé, positionnement"}'
  };
