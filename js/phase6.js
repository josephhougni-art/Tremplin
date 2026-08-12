const PHASE_6 = { title:"Mise en place / lancement", desc:"Plan de lancement, roadmap, supports de vente.", free:false,
    blocks:[
      {label:"Bloc 1", title:"Plan de lancement", questions:[
        {id:"q1", label:"Quelle date ou période vises-tu pour le lancement ?", type:"input"},
        {id:"q2", label:"Quelles sont les grandes actions à mener avant le lancement ?", type:"textarea"},
        {id:"q3", label:"Qui est responsable de quoi dans ton équipe (ou toi seul) ?", type:"textarea"},
      ]},
      {label:"Bloc 2", title:"Roadmap produit", questions:[
        {id:"q4", label:"Quelles sont les prochaines versions ou évolutions prévues après le lancement ?", type:"textarea"},
      ]},
      {label:"Bloc 3", title:"Supports de vente", questions:[
        {id:"q5", label:"As-tu besoin d'un pitch deck pour des investisseurs ? Si oui, quel montant recherches-tu ?", type:"textarea"},
        {id:"q6", label:"Quel est l'argument de vente principal à mettre en avant sur ta page de vente ?", type:"textarea"},
      ]},
    ],
    docs:[
      {key:"plan_lancement", label:"Plan de lancement"},
      {key:"roadmap", label:"Roadmap produit"},
      {key:"supports_vente", label:"Supports de vente"},
    ],
    role:"consultant expert en lancement de produit pour l'Afrique francophone",
    docSpec:'{"plan_lancement":"plan de lancement structuré : calendrier, actions clés, responsables, incluant les processus opérationnels essentiels au jour du lancement","roadmap":"roadmap produit synthétique par jalons/versions successives","supports_vente":"texte court pour une page de vente ou un pitch deck : accroche, argument de vente principal, appel à l\'action"}'
  };
