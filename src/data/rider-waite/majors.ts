import type { TarotCard } from "@/types/tarot";
import manifest from "./cards.json";
import {
  buildNumerology,
  riderWaiteImageFor,
  riderWaiteMajorNames,
  resolveRiderWaiteColors,
} from "./shared";

type MajorContent = Omit<
  TarotCard,
  | "id"
  | "deckId"
  | "number"
  | "name"
  | "alternateName"
  | "image"
  | "category"
  | "series"
  | "contentStatus"
  | "colors"
> & { colorKeys?: string[] };

const majorsContent: Record<number, MajorContent> = {
  0: {
    centralConcept: "La libertad de comenzar sin tener todas las respuestas",
    generalMeaning:
      "El Loco camina hacia el borde de un acantilado con la mirada en el cielo, una pequeña bolsa al hombro y un perro blanco a sus pies. En el Rider-Waite-Smith no lleva número visible: es el cero, el punto anterior a toda forma. Su paso no es ciego, es confiado; el riesgo existe, pero también la promesa de un camino que solo se revela al caminar.",
    message:
      "No necesitas un mapa completo para dar el primer paso. La confianza también se construye en movimiento.",
    keywords: ["Comienzo", "Libertad", "Confianza", "Inocencia", "Riesgo", "Espontaneidad"],
    symbolism: [
      {
        title: "El acantilado",
        description:
          "El borde del mundo conocido. Saltar no es obligatorio, pero quedarse tampoco garantiza seguridad.",
      },
      {
        title: "El perro blanco",
        description:
          "El instinto que acompaña y advierte. Puede ladrar para frenar o para animar a seguir.",
      },
      {
        title: "La bolsa pequeña",
        description:
          "Lo esencial cabe en poco. El Loco viaja ligero porque no confunde equipaje con identidad.",
      },
      {
        title: "La rosa blanca",
        description:
          "La pureza de intención. Lo que se inicia desde el corazón tiene una brújula distinta a la del miedo.",
      },
    ],
    numerology: buildNumerology(
      0,
      "El vacío fértil",
      "El cero contiene todas las posibilidades y ninguna forma. Es el espacio previo a la elección.",
    ),
    astrology: {
      planet: "Urano",
      element: "Aire",
      description:
        "Urano rompe patrones y abre lo inesperado. El Loco encarna la chispa que inicia un ciclo sin pedir permiso.",
    },
    esoteric: [
      {
        label: "Letra hebrea",
        value: "Aleph (א)",
        description:
          "El aliento silencioso, la unidad que precede a la dualidad. El principio invisible que todo lo sostiene.",
      },
      {
        label: "Tradición Rider-Waite-Smith",
        value: "The Fool · El cero",
        description:
          "Pamela Colman Smith lo pinta como un viajero medieval. En la secuencia dorada ocupa el cero: el que contiene al veintidós y regresa al uno.",
      },
    ],
    spiritualPlane:
      "En el plano espiritual, la carta invita a confiar en la vida sin exigir garantías absolutas. La fe no es certeza: es movimiento.",
    mentalPlane:
      "En el plano mental, pide curiosidad y apertura. La mente que ya lo sabe todo no puede aprender; el Loco pregunta sin vergüenza.",
    materialPlane:
      "En lo material, favorece los comienzos, los viajes, los cambios de rumbo y los proyectos que nacen sin un plan perfecto.",
    uprightMeaning:
      "Un nuevo comienzo, una libertad recuperada o un salto de fe. La carta favorece la espontaneidad, la curiosidad y la confianza. No es imprudencia si hay conciencia del riesgo.",
    reversedMeaning:
      "Puede indicar impulsividad, miedo a empezar o una huida disfrazada de libertad. También habla de falta de dirección. Antes de saltar, revisa qué dejas atrás y qué necesitas aprender.",
    loveMeaning:
      "Un comienzo fresco, una atracción inesperada o una relación que pide menos control y más juego. También puede señalar miedo al compromiso.",
    workMeaning:
      "Nuevos proyectos, cambios de rumbo o la posibilidad de aprender desde cero. La flexibilidad es tu mejor herramienta.",
    healthMeaning:
      "La energía del comienzo favorece el movimiento y la espontaneidad. No descuides las precauciones básicas.",
    personalDevelopment:
      "Recupera la curiosidad y permítete no saber. El aprendizaje también es una forma de libertad.",
    advice:
      "Elige una experiencia nueva que te intrigue y prueba una versión pequeña de ella. La libertad se entrena.",
    colorKeys: ["sky", "ivory", "gold"],
  },
  1: {
    centralConcept: "La voluntad que reúne sus herramientas y las pone en movimiento",
    generalMeaning:
      "El Mago está de pie ante una mesa con los cuatro palos del tarot: basto, copa, espada y oro. Una mano señala el cielo y la otra la tierra, mientras sobre su cabeza flota el lemniscata. No es un ilusionista: es el artesano que sabe que la intención necesita materia, método y palabra.",
    message:
      "Lo que ya sabes, si lo pones en movimiento, es suficiente para comenzar. La magia empieza cuando la idea toca el mundo.",
    keywords: ["Voluntad", "Iniciativa", "Habilidad", "Manifestación", "Herramientas", "Palabra"],
    symbolism: [
      {
        title: "Los cuatro palos sobre la mesa",
        description:
          "Basto, copa, espada y oro representan los recursos disponibles: energía, emoción, pensamiento y materia.",
      },
      {
        title: "El gesto de las manos",
        description:
          "Una recibe del cielo, la otra proyecta hacia la tierra. El Mago canaliza; no retiene la energía.",
      },
      {
        title: "El lemniscata",
        description:
          "El ocho acostado sobre su cabeza simboliza la circulación infinita entre lo alto y lo bajo.",
      },
      {
        title: "El jardín florecido",
        description:
          "Lo que se trabaja con conciencia florece. La voluntad bien dirigida no destruye: cultiva.",
      },
    ],
    numerology: buildNumerology(
      1,
      "La unidad",
      "El uno inaugura la serie: es el punto de partida, la identidad y la voluntad que se afirma.",
    ),
    astrology: {
      planet: "Mercurio",
      element: "Aire",
      description:
        "Mercurio rige la comunicación, el ingenio y el aprendizaje. La carta favorece la palabra precisa y la destreza para conectar ideas.",
    },
    esoteric: [
      {
        label: "Letra hebrea",
        value: "Bet (ב)",
        description:
          "Bet significa casa o recipiente: la conciencia se convierte en un espacio donde la idea puede habitar.",
      },
      {
        label: "Tradición Rider-Waite-Smith",
        value: "The Magician · El operador",
        description:
          "Waite lo vincula con la voluntad consciente. No hay truco: hay preparación, presencia y una intención que se vuelve acción.",
      },
    ],
    spiritualPlane:
      "En el plano espiritual, la carta recuerda que la voluntad es una forma de servicio: crear también es asumir una responsabilidad.",
    mentalPlane:
      "En el plano mental, pide claridad de intención y foco. La dispersión es el principal obstáculo para que una idea se materialice.",
    materialPlane:
      "En lo material, favorece iniciar proyectos, presentar propuestas y reunir los recursos que ya están disponibles.",
    uprightMeaning:
      "Etapa de iniciativa y confianza en las propias capacidades. Es momento de actuar, aprender haciendo y comunicar lo que deseas. Las herramientas están a tu alcance.",
    reversedMeaning:
      "La energía se dispersa o se usa para manipular. Puede indicar inseguridad, promesas sin sustento o talento que no se pone en práctica. Revisa tus intenciones y vuelve a lo concreto.",
    loveMeaning:
      "Atracción, iniciativa y deseo de conquistar. Si ya hay vínculo, invita a expresar lo que sientes con palabras claras y gestos coherentes.",
    workMeaning:
      "Buen momento para presentar ideas, negociar, aprender una herramienta nueva o tomar la iniciativa en un proyecto.",
    healthMeaning:
      "La vitalidad acompaña, pero conviene no confundir entusiasmo con exceso. Dosifica la energía y respeta las pausas.",
    personalDevelopment:
      "Fortalece la confianza en tu criterio y practica la coherencia entre lo que piensas, dices y haces.",
    advice:
      "Elige una intención clara y da hoy un primer paso pequeño y verificable. La magia empieza cuando la idea toca el mundo.",
    colorKeys: ["gold", "crimson", "ivory"],
  },
  2: {
    centralConcept: "La sabiduría que se guarda en el silencio y se ofrece a quien sabe esperar",
    generalMeaning:
      "La Sacerdotisa está sentada entre dos columnas, con un libro cerrado en el regazo y una luna creciente a sus pies. Detrás de ella cuelga un velo bordado con granadas y palmeras. No enseña en voz alta: custodia. Su conocimiento no es académico, es iniciático, y se transmite cuando el estudiante está listo para escuchar.",
    message:
      "No todas las respuestas llegan por la razón. Haz espacio al silencio y escucha lo que ya sabes sin palabras.",
    keywords: ["Intuición", "Misterio", "Silencio", "Memoria", "Receptividad", "Guardián"],
    symbolism: [
      {
        title: "El libro cerrado",
        description:
          "No se lee con los ojos: se accede a él con la atención interior. Su contenido cambia según quien lo consulta.",
      },
      {
        title: "Las columnas J y B",
        description:
          "Joachim y Boaz: la fuerza y la estabilidad. El conocimiento requiere tensión entre opuestos.",
      },
      {
        title: "El velo de granadas",
        description:
          "La fecundidad oculta y el umbral entre lo visible y lo que aún no se puede nombrar.",
      },
      {
        title: "La luna creciente",
        description:
          "La intuición crece por fases. No se fuerza: se acompaña con paciencia.",
      },
    ],
    numerology: buildNumerology(
      2,
      "La dualidad",
      "El dos introduce la relación, la escucha y la tensión creativa entre dos polos. Su sabiduría está en no apresurar la síntesis.",
    ),
    astrology: {
      planet: "Luna",
      element: "Agua",
      description:
        "La Luna gobierna la intuición, los ciclos y la memoria emocional. La carta invita a confiar en la información que llega por lo sutil.",
    },
    esoteric: [
      {
        label: "Letra hebrea",
        value: "Gimel (ג)",
        description:
          "Gimel significa camello: el viaje que cruza el desierto interior y acerca el conocimiento a la vida.",
      },
      {
        label: "Tradición Rider-Waite-Smith",
        value: "The High Priestess · La guardiana",
        description:
          "Waite la relaciona con la Shekinah y la luna. Su autoridad no se impone: se reconoce en quien sabe guardar silencio.",
      },
    ],
    spiritualPlane:
      "En el plano espiritual, la carta pide receptividad y paciencia. La verdad se muestra cuando la mente deja de exigir respuestas inmediatas.",
    mentalPlane:
      "En el plano mental, sugiere observar los sueños, las intuiciones y las asociaciones espontáneas sin interpretarlas demasiado rápido.",
    materialPlane:
      "En lo material, puede indicar información reservada, tiempos de espera o la necesidad de escuchar antes de firmar o decidir.",
    uprightMeaning:
      "Un saber profundo se está gestando. Confía en tu intuición, investiga sin presionar y reserva parte de lo que descubres. No es tiempo de exposición, sino de escucha.",
    reversedMeaning:
      "Puede señalar desconexión con la intuición, secretos que pesan o miedo a mirar lo que se siente. La salida no es forzar la respuesta, sino recuperar el contacto con el cuerpo y con el silencio.",
    loveMeaning:
      "Vínculo profundo y a veces reservado. Hay emociones que no se expresan todavía; conviene escuchar más y suponer menos.",
    workMeaning:
      "Investigación, estudio, confidencialidad o una decisión que necesita más información. No conviene apresurar una firma.",
    healthMeaning:
      "Escucha las señales del cuerpo y las alteraciones del descanso. El reposo y la observación son parte del cuidado.",
    personalDevelopment:
      "Desarrolla la confianza en tu voz interior y aprende a distinguir intuición de miedo.",
    advice:
      "Antes de decidir, pasa un día sin buscar respuestas. Anota lo que aparece cuando no estás intentando controlarlo.",
    colorKeys: ["indigo", "silver", "ivory"],
  },
  3: {
    centralConcept: "La vida que se vuelve forma, abundancia y cuidado",
    generalMeaning:
      "La Emperatriz está sentada en un trono rodeado de trigo maduro, con un cetro de globo en la mano y una corona de doce estrellas. A sus pies, un escudo con el símbolo de Venus. El bosque y la cascada al fondo hablan de fertilidad, belleza y creatividad que se manifiestan en el mundo material.",
    message:
      "Nutre lo que quieres ver crecer. La abundancia no se fuerza: se cultiva con presencia, placer y constancia.",
    keywords: ["Abundancia", "Creatividad", "Cuidado", "Fertilidad", "Belleza", "Cuerpo"],
    symbolism: [
      {
        title: "El trigo y la cascada",
        description:
          "La cosecha y el agua en movimiento. La abundancia necesita tanto raíz como flujo.",
      },
      {
        title: "El escudo de Venus",
        description:
          "La energía del amor y del placer como fuerza creadora, no como adorno.",
      },
      {
        title: "La corona de doce estrellas",
        description:
          "Los ciclos del año y del zodíaco. La creación se inscribe en el tiempo y en la naturaleza.",
      },
      {
        title: "El trono mullido",
        description:
          "El poder que se permite descansar. Cuidar también es una forma de gobernar.",
      },
    ],
    numerology: buildNumerology(
      3,
      "La creación",
      "El tres es el primer fruto: la idea y su opuesto generan una tercera posibilidad. Es la energía de la expresión.",
    ),
    astrology: {
      planet: "Venus",
      element: "Tierra",
      description:
        "Venus rige el amor, la belleza y los valores. La carta vincula la creatividad con el placer y con la capacidad de disfrutar lo cotidiano.",
    },
    esoteric: [
      {
        label: "Letra hebrea",
        value: "Dalet (ד)",
        description:
          "Dalet significa puerta: la energía creadora se convierte en umbral hacia una vida más plena.",
      },
      {
        label: "Tradición Rider-Waite-Smith",
        value: "The Empress · La madre",
        description:
          "Waite la asocia con la naturaleza y la fecundidad. Su poder no está en dominar el jardín, sino en hacerlo posible.",
      },
    ],
    spiritualPlane:
      "En el plano espiritual, la carta celebra la encarnación: el cuerpo y la materia no son obstáculos, sino lugares donde la vida se expresa.",
    mentalPlane:
      "En el plano mental, invita a pensar desde la abundancia y no desde la escasez. La creatividad necesita confianza y juego.",
    materialPlane:
      "En lo material, favorece proyectos creativos, el hogar, la alimentación, el cuidado de otros y la prosperidad construida con paciencia.",
    uprightMeaning:
      "Ciclo de crecimiento, creatividad y disfrute. Hay recursos disponibles y capacidad de nutrir un proyecto o un vínculo. La carta pide presencia y cuidado, no solo producción.",
    reversedMeaning:
      "Puede indicar bloqueo creativo, descuido de uno mismo o una abundancia que se mide solo por lo material. Revisa si estás dando demasiado sin recibir o si el miedo a carecer te impide disfrutar.",
    loveMeaning:
      "Amor cálido, sensual y protector. Favorece la intimidad, el cuidado mutuo y la construcción de un espacio compartido.",
    workMeaning:
      "Un proyecto puede florecer. Valora lo que ya tienes, cuida el ambiente de trabajo y permite que la creatividad tenga un lugar concreto.",
    healthMeaning:
      "Invita a cuidar el cuerpo con alimentos, descanso y placer. La salud también se construye con pequeños rituales cotidianos.",
    personalDevelopment:
      "Reconoce tus dones y permite que otros te cuiden. La generosidad sostenible empieza por no abandonarte a ti.",
    advice:
      "Haz algo tangible que nutra un proyecto o un vínculo: prepara el espacio, cuida el detalle, riega lo que sembraste.",
    colorKeys: ["emerald", "gold", "rose"],
  },
  4: {
    centralConcept: "El orden que sostiene y da forma a la vida",
    generalMeaning:
      "El Emperador está sentado en un trono de piedra decorado con cabezas de carnero, símbolo de Aries. Sostiene el cetro y el orbe, y tras él se alzan montañas áridas. No mira al espectador: gobierna. Representa la autoridad que establece límites, la ley que protege y la estructura que permite que la libertad no se disperse.",
    message:
      "La libertad sin estructura se dispersa. Construye una base clara y sostén lo que has decidido proteger.",
    keywords: ["Estructura", "Autoridad", "Límites", "Estabilidad", "Responsabilidad", "Ley"],
    symbolism: [
      {
        title: "El trono de piedra",
        description:
          "La autoridad se apoya en algo más duradero que el impulso: la constancia y la memoria.",
      },
      {
        title: "El cetro y el orbe",
        description:
          "El impulso que dirige y el dominio que sostiene. Gobernar es equilibrar acción y contención.",
      },
      {
        title: "Las montañas",
        description:
          "El territorio conquistado y también el límite. Toda estructura recorta un espacio y lo protege.",
      },
      {
        title: "La armadura bajo el manto",
        description:
          "La protección no se muestra pero está ahí. El orden requiere defensa frente al caos.",
      },
    ],
    numerology: buildNumerology(
      4,
      "La estructura",
      "El cuatro aporta límites, método y una base estable sobre la que construir. Es el número de la materia organizada.",
    ),
    astrology: {
      sign: "Aries",
      element: "Fuego",
      description:
        "Aries aporta iniciativa y coraje. El Emperador añade dirección y estructura a esa energía, para que no se quede en impulso.",
    },
    esoteric: [
      {
        label: "Letra hebrea",
        value: "He (ה)",
        description:
          "He significa ventana o respiración: la estructura no encierra, sino que ofrece una abertura por donde entra la vida.",
      },
      {
        label: "Tradición Rider-Waite-Smith",
        value: "The Emperor · El padre",
        description:
          "Waite lo vincula con la ley y el gobierno. Su trono no es un adorno: es la forma visible de una responsabilidad asumida.",
      },
    ],
    spiritualPlane:
      "En el plano espiritual, la carta invita a asumir responsabilidad por el propio mundo interior y a sostener una práctica.",
    mentalPlane:
      "En el plano mental, pide método, prioridades y límites claros. La dispersión se combate con decisiones sostenidas.",
    materialPlane:
      "En lo material, favorece la organización, la planificación, la autoridad bien ejercida y la construcción de estructuras duraderas.",
    uprightMeaning:
      "Es momento de organizar, decidir y asumir el mando de una situación. La carta favorece la estabilidad, los acuerdos claros y la protección de lo que has construido.",
    reversedMeaning:
      "Puede señalar rigidez, abuso de autoridad o miedo a perder el control. También habla de falta de estructura y de límites que no se sostienen. Revisa dónde el orden se volvió jaula.",
    loveMeaning:
      "Vínculo estable y comprometido, pero necesita espacio para la ternura. Evita que la necesidad de control sustituya a la escucha.",
    workMeaning:
      "Favorece asumir un rol de liderazgo, ordenar procesos y establecer reglas claras. La autoridad se gana con coherencia.",
    healthMeaning:
      "La rutina sostenida ayuda, pero la rigidez puede generar tensión. Equilibra disciplina con flexibilidad.",
    personalDevelopment:
      "Aprende a decir que no sin culpa y a sostener tus decisiones sin necesidad de imponerlas.",
    advice:
      "Elige un límite que necesites poner y comunícalo con claridad. La estructura que te cuida también protege a otros.",
    colorKeys: ["crimson", "gold", "earth"],
  },
  5: {
    centralConcept: "La enseñanza que une tradición y conciencia",
    generalMeaning:
      "El Hierofante se sienta entre dos columnas, con la tiara triple y la mano derecha levantada en bendición. A sus pies, dos acólitos: uno mira hacia él, el otro hacia el libro. No es solo dogma: es la función de transmitir lo recibido y de ser puente entre lo sagrado y lo humano.",
    message:
      "Toda tradición es una puerta, no una jaula. Aprende de ella, cuestiónala y encuentra tu propia forma de transmitirla.",
    keywords: ["Enseñanza", "Tradición", "Guía", "Ética", "Pertenencia", "Ritual"],
    symbolism: [
      {
        title: "La tiara triple",
        description:
          "Poder espiritual, temporal y moral. La autoridad completa integra las tres dimensiones.",
      },
      {
        title: "Las llaves cruzadas",
        description:
          "El acceso al misterio está disponible, pero hay que aprender a usarlo con responsabilidad.",
      },
      {
        title: "Los dos acólitos",
        description:
          "Uno escucha la transmisión oral; el otro estudia el libro. El conocimiento se completa entre ambas vías.",
      },
      {
        title: "El gesto de bendición",
        description:
          "La mano abierta no impone: ofrece. Enseñar es crear condiciones para que otro encuentre su verdad.",
      },
    ],
    numerology: buildNumerology(
      5,
      "El movimiento",
      "El cinco rompe la estabilidad y abre la puerta al cambio, la experiencia y el aprendizaje vivido.",
    ),
    astrology: {
      sign: "Tauro",
      element: "Tierra",
      description:
        "Tauro aporta paciencia y sentido práctico. El Hierofante convierte esa estabilidad en una enseñanza que puede encarnarse en la vida diaria.",
    },
    esoteric: [
      {
        label: "Letra hebrea",
        value: "Vav (ו)",
        description:
          "Vav significa clavo o gancho: aquello que une el cielo y la tierra, la enseñanza y la experiencia.",
      },
      {
        label: "Tradición Rider-Waite-Smith",
        value: "The Hierophant · El pontífice",
        description:
          "Pontífice viene de pontifex: constructor de puentes. Su función es conectar, no separar.",
      },
    ],
    spiritualPlane:
      "En el plano espiritual, la carta invita a encontrar una práctica o una comunidad que sostenga tu aprendizaje sin renunciar al pensamiento propio.",
    mentalPlane:
      "En el plano mental, pide estudiar las bases, ordenar lo aprendido y distinguir la tradición viva del dogma repetido.",
    materialPlane:
      "En lo material, favorece la formación, los exámenes, las instituciones y los acuerdos formales.",
    uprightMeaning:
      "Una enseñanza está disponible. Puede aparecer un maestro, una formación o una estructura que te ayude a crecer. La carta también invita a compartir lo que sabes con generosidad.",
    reversedMeaning:
      "Puede indicar rigidez, obediencia ciega o una tradición que ya no responde a tus preguntas. También habla de miedo a mostrar tu propia voz. No se trata de romper por romper, sino de revisar qué sigue teniendo sentido.",
    loveMeaning:
      "Vínculo con valores compartidos y proyectos de largo plazo. Puede aparecer la pregunta por el compromiso o por las expectativas familiares.",
    workMeaning:
      "Formación, docencia, mentoría o trabajo dentro de una estructura. Conviene conocer las reglas antes de cambiarlas.",
    healthMeaning:
      "Los hábitos y las rutinas tienen peso. Revisa qué costumbres heredadas ya no te hacen bien.",
    personalDevelopment:
      "Estudia a fondo aquello que te interesa y atrévete a formular tus propias preguntas.",
    advice:
      "Busca una fuente confiable, estudia sus fundamentos y escribe qué parte de esa enseñanza quieres conservar.",
    colorKeys: ["indigo", "gold", "ivory"],
  },
  6: {
    centralConcept: "La elección que compromete el corazón y los valores",
    generalMeaning:
      "Los Enamorados muestran a dos figuras desnudas bajo un ángel con las alas abiertas. Detrás de la mujer crece un árbol con frutos; detrás del hombre, un árbol en llamas. No es solo romance: es la encrucijada donde se elige un camino y se deja otro, con conciencia de que la decisión transforma.",
    message:
      "Elegir es renunciar a algo. Que tu decisión nazca de tus valores y no solo del miedo a perder.",
    keywords: ["Elección", "Unión", "Deseo", "Valores", "Encuentro", "Conciencia"],
    symbolism: [
      {
        title: "El ángel",
        description:
          "La dimensión que trasciende el deseo personal. La elección se hace ante algo más grande que el capricho.",
      },
      {
        title: "Los dos árboles",
        description:
          "Uno florece y otro arde. Cada camino tiene su fruto y su costo; ninguno es gratis.",
      },
      {
        title: "La desnudez",
        description:
          "No hay máscaras ni armaduras. Elegir desde la verdad exige mostrarse tal como se es.",
      },
      {
        title: "La montaña al fondo",
        description:
          "La consecuencia duradera. La decisión de hoy dibuja el paisaje de mañana.",
      },
    ],
    numerology: buildNumerology(
      6,
      "La armonía",
      "El seis busca equilibrio, cuidado y reciprocidad. Su desafío es no sacrificar la propia voz para conservar la unión.",
    ),
    astrology: {
      sign: "Géminis",
      element: "Aire",
      description:
        "Géminis aporta curiosidad, diálogo y la capacidad de ver dos versiones. La carta pide integrar la comunicación en la elección.",
    },
    esoteric: [
      {
        label: "Letra hebrea",
        value: "Zayin (ז)",
        description:
          "Zayin significa espada o adorno: la palabra que corta y la belleza que une. Toda elección tiene un filo.",
      },
      {
        label: "Tradición Rider-Waite-Smith",
        value: "The Lovers · La elección",
        description:
          "Waite lo vincula con la unión de opuestos y la decisión consciente. El amor también es una forma de discernimiento.",
      },
    ],
    spiritualPlane:
      "En el plano espiritual, la carta invita a preguntarte qué versión de ti misma o de ti mismo elige cada camino.",
    mentalPlane:
      "En el plano mental, pide distinguir deseo de idealización y escuchar los valores que sostienen la decisión.",
    materialPlane:
      "En lo material, puede indicar una elección de pareja, sociedad, trabajo o estilo de vida que tendrá consecuencias concretas.",
    uprightMeaning:
      "Una elección significativa está ante ti. Hay atracción, afinidad y deseo de unión. La carta favorece los acuerdos honestos y las decisiones tomadas desde el corazón y la conciencia.",
    reversedMeaning:
      "Puede indicar indecisión, deseo de tenerlo todo sin elegir o una relación que no está alineada con tus valores. También habla de tentación y de promesas que no se sostienen. Vuelve a preguntarte qué es realmente importante.",
    loveMeaning:
      "Encuentro intenso y deseo de unión. Si hay conflicto, la clave está en hablar de valores y expectativas, no solo de sentimientos.",
    workMeaning:
      "Debes elegir entre dos opciones o negociar una colaboración. Revisa que los intereses estén alineados antes de comprometerte.",
    healthMeaning:
      "La indecisión y el conflicto emocional pueden afectar el descanso. Busca claridad antes de exigirle más a tu cuerpo.",
    personalDevelopment:
      "Define tus valores y úsalos como brújula. Una elección coherente vale más que una suma de opciones abiertas.",
    advice:
      "Escribe los dos caminos y, debajo de cada uno, los valores que activa. Decide desde lo que quieres sostener a largo plazo.",
    colorKeys: ["crimson", "gold", "rose"],
  },
  7: {
    centralConcept: "La victoria que nace de dirigir fuerzas opuestas",
    generalMeaning:
      "El Carro avanza con un auriga de pie bajo un dosel estrellado. Dos esfinges, una negra y una blanca, tiran en direcciones distintas sin riendas visibles. La victoria no llega por fuerza bruta, sino por una voluntad que integra los contrarios y sostiene el rumbo.",
    message:
      "No basta con tener fuerza: necesitas un destino claro y la disciplina para sostener las riendas.",
    keywords: ["Victoria", "Dirección", "Disciplina", "Viaje", "Confianza", "Control"],
    symbolism: [
      {
        title: "Las esfinges blanca y negra",
        description:
          "Fuerzas opuestas que deben ser conducidas, no eliminadas. La integración es la clave del avance.",
      },
      {
        title: "El dosel estrellado",
        description:
          "La protección y la guía vienen de una visión que trasciende el esfuerzo inmediato.",
      },
      {
        title: "La armadura",
        description:
          "Está preparado para el desafío, pero no ataca. La victoria ya se ganó en el plano interior.",
      },
      {
        title: "La ciudad al fondo",
        description:
          "El destino no es un lugar lejano: es la vida que se organiza alrededor de un propósito.",
      },
    ],
    numerology: buildNumerology(
      7,
      "La reflexión",
      "El siete invita a mirar hacia dentro, a estudiar y a distinguir lo esencial de lo accesorio antes de avanzar.",
    ),
    astrology: {
      sign: "Cáncer",
      element: "Agua",
      description:
        "Cáncer aporta memoria, protección y sensibilidad. El Carro añade dirección y coraje para avanzar sin perder el vínculo con el origen.",
    },
    esoteric: [
      {
        label: "Letra hebrea",
        value: "Chet (ח)",
        description:
          "Chet significa cerca o recinto: la protección que permite crecer y, a la vez, el límite que hay que atravesar.",
      },
      {
        label: "Tradición Rider-Waite-Smith",
        value: "The Chariot · El triunfo",
        description:
          "Waite lo asocia con el dominio de sí y el viaje iniciático. El auriga no vence a las esfinges: las conduce.",
      },
    ],
    spiritualPlane:
      "En el plano espiritual, la carta habla de dirigir la energía hacia un propósito que esté por encima del impulso inmediato.",
    mentalPlane:
      "En el plano mental, pide foco, estrategia y capacidad de sostener una decisión cuando aparecen las distracciones.",
    materialPlane:
      "En lo material, favorece los viajes, los traslados, los proyectos en marcha y la defensa de una posición conquistada.",
    uprightMeaning:
      "Avance y victoria si mantienes la disciplina. La carta indica que puedes tomar el control de una situación y moverte con determinación. También favorece los viajes y los cambios de rumbo planificados.",
    reversedMeaning:
      "Puede indicar precipitación, pérdida de dirección o un esfuerzo que se agota en la resistencia. Revisa si estás conduciendo tu vida o si solo reaccionas. La fuerza sin propósito se vuelve dispersión.",
    loveMeaning:
      "Una relación que avanza, aunque requiere acuerdos claros y capacidad de adaptación. También puede hablar de una conquista o de un viaje compartido.",
    workMeaning:
      "Buen momento para asumir un reto, defender un proyecto o tomar el mando de un equipo. La constancia importa más que la velocidad.",
    healthMeaning:
      "La energía está disponible, pero el exceso de exigencia puede pasar factura. Alterna movimiento y recuperación.",
    personalDevelopment:
      "Entrena la disciplina con metas pequeñas y visibles. La confianza se construye al cumplir lo que te prometes.",
    advice:
      "Escribe tu objetivo en una frase y define la próxima acción concreta. Después, elimina una distracción que no te acerque a él.",
    colorKeys: ["sky", "gold", "indigo"],
  },
  8: {
    centralConcept: "La fuerza que se ejerce con ternura y persistencia",
    generalMeaning:
      "La Fuerza muestra a una mujer vestida de blanco que abre con suavidad las fauces de un león. Sobre su cabeza flota el lemniscata y a su alrededor crecen flores. No lo doma a golpes: lo guía. Es el coraje sereno que integra el deseo en lugar de reprimirlo.",
    message:
      "La verdadera fuerza no consiste en vencer al otro, sino en acompañar tu propio impulso hasta que deje de ser una amenaza.",
    keywords: ["Coraje", "Paciencia", "Dominio de sí", "Deseo", "Compasión", "Persistencia"],
    symbolism: [
      {
        title: "Las manos sobre el león",
        description:
          "Una mano arriba y otra abajo: abre con suavidad pero con firmeza. El control no es aplastamiento.",
      },
      {
        title: "El lemniscata",
        description:
          "La energía circula entre lo alto y lo bajo. La fuerza sostenida con conciencia se vuelve creativa.",
      },
      {
        title: "Las flores",
        description:
          "La fuerza que cuida produce vida. La ferocidad integrada se vuelve belleza.",
      },
      {
        title: "El paisaje abierto",
        description:
          "No hay jaula ni torre. El dominio de sí ocurre en la vida, no en el retiro.",
      },
    ],
    numerology: buildNumerology(
      8,
      "El equilibrio de poder",
      "El ocho pone en juego la fuerza y la responsabilidad. Su equilibrio depende de que el poder esté al servicio de la justicia.",
    ),
    astrology: {
      sign: "Leo",
      element: "Fuego",
      description:
        "Leo aporta vitalidad, expresión y deseo de reconocimiento. La Fuerza añade la madurez necesaria para que ese fuego ilumine sin quemar.",
    },
    esoteric: [
      {
        label: "Letra hebrea",
        value: "Tet (ט)",
        description:
          "Tet significa serpiente o cesta: la energía oculta que se contiene y se transforma.",
      },
      {
        label: "Tradición Rider-Waite-Smith",
        value: "Strength · La domadora",
        description:
          "En el Rider-Waite-Smith la Fuerza ocupa el VIII y la Justicia el XI, al revés que en el Marsella clásico. La fuerza interior precede al juicio.",
      },
    ],
    spiritualPlane:
      "En el plano espiritual, la carta invita a reconciliarte con tu deseo y con tu sombra sin convertirlos en enemigos.",
    mentalPlane:
      "En el plano mental, pide paciencia y regulación emocional. La claridad llega cuando dejas de pelear con lo que sientes.",
    materialPlane:
      "En lo material, favorece la constancia, el cuidado del cuerpo y la defensa serena de tus límites.",
    uprightMeaning:
      "Tienes más recursos de los que crees. La carta indica coraje, autocontrol y capacidad de sostener una situación difícil con calma. El deseo puede integrarse de forma creativa.",
    reversedMeaning:
      "Puede indicar fuerza mal dirigida, impulsividad, miedo a tu propio poder o desgaste por resistir demasiado. También habla de baja autoestima. Vuelve al cuerpo y recupera el ritmo.",
    loveMeaning:
      "Pasión intensa que necesita ternura y límites claros. La carta invita a expresar el deseo sin manipular ni someter.",
    workMeaning:
      "Un desafío requiere paciencia y persistencia. No fuerces resultados; sostén el proceso y cuida tu energía.",
    healthMeaning:
      "La fuerza vital está presente, pero necesita cauces. El movimiento consciente, la respiración y el descanso son aliados.",
    personalDevelopment:
      "Aprende a regular la intensidad sin apagarla. La serenidad también es una forma de poder.",
    advice:
      "Identifica una emoción intensa y pregúntale qué necesita. Responde con un gesto concreto de cuidado, no con represión.",
    colorKeys: ["ivory", "sunflower", "emerald"],
  },
  9: {
    centralConcept: "La luz que se encuentra al caminar solo",
    generalMeaning:
      "El Ermitaño avanza por una cumbre nevada, cubierto con un manto gris y apoyado en un bastón. En la mano alza una lámpara con una estrella de seis puntas. No huye del mundo: se retira para escuchar. La soledad elegida se convierte en método de claridad.",
    message:
      "A veces hay que alejarse del ruido para encontrar la luz que se lleva dentro. La soledad puede ser un método, no un destino.",
    keywords: ["Introspección", "Soledad", "Sabiduría", "Paciencia", "Guía", "Búsqueda"],
    symbolism: [
      {
        title: "La lámpara",
        description:
          "La luz no alumbra todo el horizonte, solo el siguiente paso. La sabiduría se construye en la experiencia.",
      },
      {
        title: "La cumbre nevada",
        description:
          "La altura y el frío de la introspección. Subir también es aceptar la intemperie.",
      },
      {
        title: "El bastón",
        description:
          "El apoyo de la experiencia. No está desamparado: se basta, pero se sostiene en lo aprendido.",
      },
      {
        title: "La estrella de seis puntas",
        description:
          "La síntesis de lo alto y lo bajo. La claridad que se busca también se lleva dentro.",
      },
    ],
    numerology: buildNumerology(
      9,
      "La culminación",
      "El nueve cierra un ciclo y prepara la entrega de lo aprendido antes de volver a empezar.",
    ),
    astrology: {
      sign: "Virgo",
      element: "Tierra",
      description:
        "Virgo aporta análisis, método y atención al detalle. El Ermitaño añade la pausa y la mirada interior necesarias para que ese análisis no se vuelva ansiedad.",
    },
    esoteric: [
      {
        label: "Letra hebrea",
        value: "Yod (י)",
        description:
          "Yod es la semilla, el punto de luz que contiene el potencial de todo el árbol. La sabiduría comienza en lo pequeño.",
      },
      {
        label: "Tradición Rider-Waite-Smith",
        value: "The Hermit · El buscador",
        description:
          "Waite lo relaciona con la prudencia y la búsqueda interior. Su lámpara no ilumina a otros: les enseña a encender la propia.",
      },
    ],
    spiritualPlane:
      "En el plano espiritual, la carta invita a un retiro consciente: oración, meditación o simplemente silencio para escuchar.",
    mentalPlane:
      "En el plano mental, pide estudiar, revisar creencias y no confundir la soledad con el abandono.",
    materialPlane:
      "En lo material, puede indicar un proyecto que necesita concentración, un viaje interior o una etapa de menor vida social.",
    uprightMeaning:
      "Un período de introspección y aprendizaje. La carta pide bajar el ruido, revisar el camino recorrido y confiar en la propia experiencia. También puede señalar la aparición de un guía o mentor.",
    reversedMeaning:
      "Puede indicar aislamiento, desconexión o una búsqueda que se volvió huida. También habla de exceso de análisis y de perder el contacto con la vida cotidiana. Revisa si la soledad te nutre o te encierra.",
    loveMeaning:
      "Un momento de pausa o de mirada interior. Si hay pareja, conviene respetar los espacios; si no la hay, la carta invita a no buscar compañía desde la carencia.",
    workMeaning:
      "Estudio, especialización, trabajo solitario o revisión de objetivos. No es el mejor momento para la exposición pública; sí para la preparación.",
    healthMeaning:
      "El descanso, el silencio y el contacto con la naturaleza ayudan. No descuides la vida social por completo.",
    personalDevelopment:
      "Aprende a estar contigo sin distracciones. La claridad suele aparecer cuando dejas de llenar cada silencio.",
    advice:
      "Reserva un momento de silencio sin pantallas y escribe qué has aprendido en los últimos meses.",
    colorKeys: ["silver", "gold", "black"],
  },
  10: {
    centralConcept: "El ciclo que gira y devuelve cada causa a su efecto",
    generalMeaning:
      "La Rueda de la Fortuna gira en el centro de un cielo azul, rodeada de símbolos alquímicos y de cuatro criaturas en las esquinas. Una serpiente desciende, un Anubis asciende y una esfinge corona la rueda. No hay justicia aparente en el movimiento: la rueda gira porque esa es su naturaleza.",
    message:
      "No te aferres a la cima ni te identifiques con el fondo. Todo se mueve; lo importante es cómo sostienes tu centro mientras gira.",
    keywords: ["Ciclos", "Cambio", "Fortuna", "Movimiento", "Apertura", "Impermanencia"],
    symbolism: [
      {
        title: "La rueda",
        description:
          "Las posiciones cambian, pero el eje permanece. Tu conciencia puede ser ese centro que no gira.",
      },
      {
        title: "La esfinge",
        description:
          "El observador que sostiene la mirada. La sabiduría no consiste en detener el cambio, sino en habitarlo.",
      },
      {
        title: "Las cuatro criaturas",
        description:
          "Los cuatro elementos y los cuatro evangelistas. El ciclo afecta a todo lo que existe.",
      },
      {
        title: "Las letras y símbolos",
        description:
          "T-A-R-O, R-O-T-A, O-R-A-T, A-T-O-R: la palabra gira y revela sus sentidos. El conocimiento también cicla.",
      },
    ],
    numerology: buildNumerology(
      10,
      "El retorno a la unidad",
      "El diez contiene al uno y al cero: un ciclo se completa y, al mismo tiempo, contiene la semilla de un nuevo comienzo.",
    ),
    astrology: {
      planet: "Júpiter",
      element: "Fuego",
      description:
        "Júpiter amplía, protege y abre oportunidades. La carta recuerda que la suerte también necesita una actitud dispuesta a recibirla.",
    },
    esoteric: [
      {
        label: "Letra hebrea",
        value: "Kaf (כ)",
        description:
          "Kaf significa palma de la mano: aquello que se recibe, se sostiene y también se puede soltar.",
      },
      {
        label: "Tradición Rider-Waite-Smith",
        value: "Wheel of Fortune · La rueda",
        description:
          "Waite la vincula con los ciclos de la vida y la providencia. La rueda no premia ni castiga: enseña impermanencia.",
      },
    ],
    spiritualPlane:
      "En el plano espiritual, la carta invita a confiar en el proceso y a no convertir una etapa difícil en una identidad.",
    mentalPlane:
      "En el plano mental, pide flexibilidad y lectura de contexto. Lo que funciona hoy puede necesitar ajustes mañana.",
    materialPlane:
      "En lo material, favorece los cambios de situación, las oportunidades inesperadas y los movimientos que abren nuevas posibilidades.",
    uprightMeaning:
      "Un ciclo se mueve y trae nuevas oportunidades. La carta favorece la adaptación, los cambios de suerte y la capacidad de aprovechar el momento. También recuerda que la fortuna cambia.",
    reversedMeaning:
      "Puede indicar resistencia al cambio, sensación de estancamiento o repetir un patrón sin aprender de él. Revisa tu parte en el ciclo y suelta lo que ya no depende de ti.",
    loveMeaning:
      "La relación entra en una nueva etapa. Puede ser un cambio de ritmo, una reconciliación o la necesidad de adaptarse a las circunstancias.",
    workMeaning:
      "Cambios en el trabajo, oportunidades imprevistas o un proyecto que entra en otra fase. Mantente atento a los movimientos del entorno.",
    healthMeaning:
      "Los ciclos del cuerpo también cambian. Ajusta tus hábitos a la etapa actual en lugar de exigirte el mismo rendimiento siempre.",
    personalDevelopment:
      "Observa qué patrón se repite en tu vida. La rueda no cambia sola si la mirada sigue igual.",
    advice:
      "Haz una lista de lo que está cambiando y de lo que intentas controlar. Suelta una cosa que ya no depende de ti.",
    colorKeys: ["gold", "sky", "violet"],
  },
  11: {
    centralConcept: "El equilibrio que exige verdad y responsabilidad",
    generalMeaning:
      "La Justicia está sentada entre dos columnas, con una espada en la mano derecha y una balanza en la izquierda. La corona y el manto rojo hablan de autoridad y acción. No es venganza: es proporción. La carta pesa los hechos y corta lo que sobra para que el orden pueda sostenerse.",
    message:
      "La verdad te libera, aunque al principio incomode. Asume lo que te corresponde y ajusta lo que ya no está en equilibrio.",
    keywords: ["Equilibrio", "Verdad", "Responsabilidad", "Decisión", "Consecuencia", "Ley"],
    symbolism: [
      {
        title: "La espada",
        description:
          "Corta lo que sobra y separa lo verdadero de lo ilusorio. Decidir también es renunciar.",
      },
      {
        title: "La balanza",
        description:
          "La medida justa. Justicia no es castigo: es proporción entre lo que se da y lo que se recibe.",
      },
      {
        title: "Las dos columnas",
        description:
          "El equilibrio entre opuestos no se impone: se sostiene con deliberación y escucha.",
      },
      {
        title: "El manto rojo",
        description:
          "La acción asumida. Juzgar es un acto de poder, no de pasividad.",
      },
    ],
    numerology: buildNumerology(
      11,
      "La intuición",
      "El once es un número maestro: une la iniciativa del uno con la sensibilidad del dos. Su fuerza es la inspiración que se vuelve presencia.",
    ),
    astrology: {
      sign: "Libra",
      element: "Aire",
      description:
        "Libra busca armonía, proporción y relación. La Justicia añade el rigor necesario para que la armonía no sea solo apariencia.",
    },
    esoteric: [
      {
        label: "Letra hebrea",
        value: "Lamed (ל)",
        description:
          "Lamed significa aguijón o enseñanza: la experiencia que corrige y orienta el camino.",
      },
      {
        label: "Tradición Rider-Waite-Smith",
        value: "Justice · La que pesa",
        description:
          "En el Rider-Waite-Smith la Justicia ocupa el XI y la Fuerza el VIII. El equilibrio llega después de haber integrado el deseo.",
      },
    ],
    spiritualPlane:
      "En el plano espiritual, la carta invita a revisar la coherencia entre lo que crees, lo que haces y lo que recibes.",
    mentalPlane:
      "En el plano mental, pide objetividad y responsabilidad. Evita justificarte o culpar a otros por lo que puedes cambiar.",
    materialPlane:
      "En lo material, favorece los contratos, los trámites, las decisiones legales y la resolución justa de un conflicto.",
    uprightMeaning:
      "Es momento de decidir con honestidad y asumir las consecuencias. La carta favorece los acuerdos justos, los trámites y la claridad. Lo que siembras vuelve a ti.",
    reversedMeaning:
      "Puede indicar injusticia, evasión de responsabilidad o una balanza inclinada por el interés. También habla de autoexigencia excesiva. Revisa dónde estás juzgando sin escuchar o callando una verdad necesaria.",
    loveMeaning:
      "La relación pide honestidad y acuerdos claros. Es un buen momento para hablar de lo que no está equilibrado y reparar la confianza.",
    workMeaning:
      "Contratos, evaluaciones o decisiones laborales. La transparencia y el cumplimiento de lo pactado son claves.",
    healthMeaning:
      "El cuerpo también busca equilibrio. Revisa los excesos y los descuidos, sin caer en la rigidez.",
    personalDevelopment:
      "Practica la honestidad contigo y la responsabilidad sin castigo. La justicia empieza por el modo en que te tratas.",
    advice:
      "Haz una lista de lo que das y de lo que recibes en una situación concreta. Ajusta una cosa que ya no esté en equilibrio.",
    colorKeys: ["crimson", "gold", "sky"],
  },
  12: {
    centralConcept: "La pausa que invierte la mirada y revela lo oculto",
    generalMeaning:
      "El Colgado cuelga de un pie atado a una rama en forma de T, con la otra pierna cruzada y las manos detrás de la espalda. Su rostro está sereno y una luz rodea su cabeza. La inversión no es castigo: es un método para ver lo que la postura habitual oculta.",
    message:
      "No toda pausa es un retroceso. A veces hay que soltar el control para ver lo que la prisa ocultaba.",
    keywords: ["Pausa", "Entrega", "Perspectiva", "Sacrificio", "Revelación", "Inversión"],
    symbolism: [
      {
        title: "La pierna atada y la libre",
        description:
          "Una sujeción, una libertad. La paradoja: atado de un pie, libre de toda prisa.",
      },
      {
        title: "Las manos detrás de la espalda",
        description:
          "No puede aferrarse ni defenderse. La rendición voluntaria abre una percepción distinta.",
      },
      {
        title: "La luz alrededor de la cabeza",
        description:
          "La comprensión surge en la quietud, no en la agitación. La inversión ilumina.",
      },
      {
        title: "El árbol en T",
        description:
          "El eje del mundo y el sacrificio que fecunda. Lo que se suelta también alimenta.",
      },
    ],
    numerology: buildNumerology(
      12,
      "La síntesis en movimiento",
      "El doce reúne los ciclos del tiempo y la posibilidad de una nueva comprensión. Su energía pide paciencia para que el proceso madure.",
    ),
    astrology: {
      planet: "Neptuno",
      element: "Agua",
      description:
        "Neptuno disuelve los límites y abre la percepción a lo sutil. La carta invita a confiar en un proceso que no se controla del todo.",
    },
    esoteric: [
      {
        label: "Letra hebrea",
        value: "Mem (מ)",
        description:
          "Mem significa agua: la disolución que permite renacer. La pausa también es una forma de gestación.",
      },
      {
        label: "Tradición Rider-Waite-Smith",
        value: "The Hanged Man · El suspendido",
        description:
          "Waite lo vincula con el sacrificio voluntario y la inversión de la mirada. No hay víctima: hay un iniciado que elige esperar.",
      },
    ],
    spiritualPlane:
      "En el plano espiritual, la carta invita a soltar el control y a confiar en que la pausa también trabaja.",
    mentalPlane:
      "En el plano mental, pide cambiar de perspectiva. La misma situación, mirada desde otro ángulo, puede revelar una salida.",
    materialPlane:
      "En lo material, puede indicar una espera, un proyecto suspendido o la necesidad de renunciar a algo para ganar otra cosa.",
    uprightMeaning:
      "Una pausa necesaria. La carta indica que el avance no siempre es movimiento: a veces es cambiar de perspectiva. Favorece la entrega consciente, los sacrificios con sentido y la paciencia.",
    reversedMeaning:
      "Puede señalar resistencia a soltar, victimismo o una espera que ya no tiene propósito. También habla de estancamiento por miedo al cambio. Revisa si estás esperando o simplemente evitando decidir.",
    loveMeaning:
      "Un momento de suspensión o de revisión. Puede indicar una relación que necesita pausa, o una entrega que no está siendo correspondida.",
    workMeaning:
      "Un proyecto detenido o una decisión que requiere más tiempo. Usa la espera para observar y preparar el siguiente paso.",
    healthMeaning:
      "El cuerpo pide pausa. El descanso no es pereza: es parte del proceso de recuperación.",
    personalDevelopment:
      "Aprende a estar en la incertidumbre sin llenarla de respuestas. La entrega también es una forma de confianza.",
    advice:
      "Elige una situación que intentas forzar y observa qué cambia si la miras desde la vereda opuesta. No actúes hoy: escucha.",
    colorKeys: ["indigo", "silver", "gold"],
  },
  13: {
    centralConcept: "La transformación que abre paso a lo que todavía no tiene forma",
    generalMeaning:
      "La Muerte avanza sobre un caballo blanco, con una bandera negra y una rosa blanca. A su paso, reyes y niños caen; al fondo, el sol sale entre dos torres. No es el final absoluto: es el corte necesario para que algo nuevo pueda nacer.",
    message:
      "Lo que termina deja espacio para lo que viene. No te aferres a una forma que ya cumplió su ciclo.",
    keywords: ["Transformación", "Final", "Renacimiento", "Poda", "Aceptación", "Ciclo"],
    symbolism: [
      {
        title: "El caballo blanco",
        description:
          "La energía que avanza sin detenerse. La transformación no pide permiso: pide presencia.",
      },
      {
        title: "La bandera negra con la rosa",
        description:
          "La muerte y la vida en el mismo estandarte. Todo final contiene una promesa.",
      },
      {
        title: "El sol naciente",
        description:
          "Detrás de las torres, un nuevo ciclo comienza. La luz no niega la pérdida: la atraviesa.",
      },
      {
        title: "Las figuras que caen",
        description:
          "Nadie está exento del cambio. La resistencia solo alarga el dolor.",
      },
    ],
    numerology: buildNumerology(
      13,
      "La transformación",
      "El trece reduce a cuatro: la estructura que se disuelve para volver a construirse. Su energía es la poda que permite crecer.",
    ),
    astrology: {
      sign: "Escorpio",
      element: "Agua",
      description:
        "Escorpio rige los procesos profundos, la muerte simbólica y la regeneración. La carta invita a mirar lo que ya no puede seguir igual.",
    },
    esoteric: [
      {
        label: "Letra hebrea",
        value: "Nun (נ)",
        description:
          "Nun significa pez: la vida que se mueve en las profundidades y emerge transformada.",
      },
      {
        label: "Tradición Rider-Waite-Smith",
        value: "Death · La poda",
        description:
          "Waite la relaciona con la transformación y no con la muerte física. La guadaña corta lo que impide el siguiente ciclo.",
      },
    ],
    spiritualPlane:
      "En el plano espiritual, la carta invita a morir a una identidad que ya no te contiene y a confiar en la vida que sigue.",
    mentalPlane:
      "En el plano mental, pide soltar creencias, planes o imágenes de ti que ya no responden a la realidad.",
    materialPlane:
      "En lo material, puede indicar cierres, mudanzas, cambios de trabajo o la necesidad de despejar lo que ocupa demasiado espacio.",
    uprightMeaning:
      "Un ciclo termina y otro comienza. La carta favorece los cierres conscientes, la limpieza y la aceptación de lo irreversible. No es un castigo: es una liberación.",
    reversedMeaning:
      "Puede indicar resistencia al cambio, apego a lo conocido o una transformación que se pospone. También habla de miedo a la pérdida. Lo que no se suelta se vuelve peso.",
    loveMeaning:
      "Una relación cambia de forma o termina para dar paso a otra etapa. La carta invita a despedirse con honestidad y sin dramatismo.",
    workMeaning:
      "Cierre de un proyecto, reestructuración o cambio de rumbo. Lo que se termina libera energía para lo que viene.",
    healthMeaning:
      "El cuerpo pide una limpieza profunda: hábitos, descanso, alimentación. No ignores las señales de que algo debe cambiar.",
    personalDevelopment:
      "Acepta que algunas versiones de ti ya cumplieron su función. La madurez también es saber despedirse.",
    advice:
      "Identifica una cosa que ya terminó pero sigues sosteniendo. Haz un gesto concreto para cerrarla y liberar ese espacio.",
    colorKeys: ["black", "ivory", "crimson"],
  },
  14: {
    centralConcept: "La alquimia que mezcla los contrarios con paciencia",
    generalMeaning:
      "La Templanza vierte agua de una copa a otra, con un pie en la tierra y otro en el agua. Un camino conduce hacia una corona de luz y a sus espaldas crece un lirio. No busca eliminar los extremos: los mezcla en la medida justa.",
    message:
      "El equilibrio no es un punto fijo, es una mezcla que se ajusta cada día. Dosifica sin perder el deseo.",
    keywords: ["Equilibrio", "Alquimia", "Paciencia", "Medida", "Integración", "Sanación"],
    symbolism: [
      {
        title: "Las dos copas",
        description:
          "El agua pasa de una a otra sin derramarse. La integración requiere atención y ritmo.",
      },
      {
        title: "Un pie en el agua y otro en la tierra",
        description:
          "La conciencia que habita lo emocional sin abandonar lo concreto.",
      },
      {
        title: "El camino hacia la luz",
        description:
          "La meta no está en el extremo, sino en el recorrido que aprende a sostener los contrastes.",
      },
      {
        title: "El lirio",
        description:
          "La pureza que nace de la mezcla bien hecha. No hay virtud sin sombra integrada.",
      },
    ],
    numerology: buildNumerology(
      14,
      "La síntesis",
      "El catorce reduce a cinco: la estabilidad que se abre al cambio. Su energía pide flexibilidad dentro de un propósito.",
    ),
    astrology: {
      sign: "Sagitario",
      element: "Fuego",
      description:
        "Sagitario busca sentido y expansión. La Templanza añade la medida necesaria para que el viaje no se convierta en fuga.",
    },
    esoteric: [
      {
        label: "Letra hebrea",
        value: "Samekh (ס)",
        description:
          "Samekh significa apoyo o sostén: la paciencia que mantiene el proceso mientras madura.",
      },
      {
        label: "Tradición Rider-Waite-Smith",
        value: "Temperance · La alquimista",
        description:
          "Waite la vincula con la moderación y la armonía de los contrarios. Su magia no es espectacular: es constante.",
      },
    ],
    spiritualPlane:
      "En el plano espiritual, la carta invita a integrar lo que se vive como opuesto: razón y emoción, deseo y deber, acción y descanso.",
    mentalPlane:
      "En el plano mental, pide paciencia y matices. Las respuestas absolutas suelen ser menos útiles que las proporciones justas.",
    materialPlane:
      "En lo material, favorece la conciliación, la negociación, la salud sostenida y los procesos que requieren constancia.",
    uprightMeaning:
      "Un proceso de equilibrio y sanación. La carta favorece la moderación, la paciencia y la integración de partes que parecían incompatibles. Es un buen momento para ajustar ritmos.",
    reversedMeaning:
      "Puede indicar desequilibrio, excesos o impaciencia por resultados inmediatos. También habla de mezclar mal los tiempos: ni todo ya, ni todo después. Vuelve a la medida.",
    loveMeaning:
      "Una relación que encuentra su ritmo. La carta invita a conciliar diferencias sin borrar a ninguno de los dos.",
    workMeaning:
      "Negociaciones, mediaciones o proyectos que requieren constancia. La prisa puede arruinar una mezcla delicada.",
    healthMeaning:
      "El cuerpo agradece la moderación: descanso, alimentación y movimiento en dosis sostenibles.",
    personalDevelopment:
      "Aprende a sostener la tensión entre lo que quieres y lo que puedes. La sabiduría también es dosificación.",
    advice:
      "Elige un exceso que puedas reducir hoy y un descanso que puedas aumentar. Ajusta una sola cosa.",
    colorKeys: ["sky", "ivory", "emerald"],
  },
  15: {
    centralConcept: "La sombra que se vuelve cadena cuando no se mira",
    generalMeaning:
      "El Diablo se alza sobre un pedestal con dos figuras encadenadas a sus pies. Las cadenas son holgadas: podrían quitárselas, pero no lo hacen. La carta habla de apegos, deseo y poder, y de la facilidad con que confundimos lo que nos ata con lo que nos define.",
    message:
      "Mira qué cadena sostienes por costumbre. Lo que se nombra pierde parte de su poder.",
    keywords: ["Sombra", "Apego", "Deseo", "Poder", "Tentación", "Conciencia"],
    symbolism: [
      {
        title: "Las cadenas holgadas",
        description:
          "No están apretadas. La mayor parte del tiempo, la jaula es una elección que no se revisa.",
      },
      {
        title: "La antorcha invertida",
        description:
          "La energía que se dirige hacia abajo: el deseo que consume sin iluminar.",
      },
      {
        title: "La desnudez",
        description:
          "La verdad de la sombra sin disfraces. Lo que se oculta sigue actuando desde el sótano.",
      },
      {
        title: "El pedestal",
        description:
          "El lugar que le damos a aquello que nos domina. Quitarle altura también es posible.",
      },
    ],
    numerology: buildNumerology(
      15,
      "La materia y el deseo",
      "El quince reduce a seis: el vínculo que puede liberar o atar. Su energía pide distinguir amor de dependencia.",
    ),
    astrology: {
      sign: "Capricornio",
      element: "Tierra",
      description:
        "Capricornio rige la estructura, el poder y el tiempo. El Diablo muestra el lado oscuro de la ambición cuando se vuelve dueña de la vida.",
    },
    esoteric: [
      {
        label: "Letra hebrea",
        value: "Ayin (ע)",
        description:
          "Ayin significa ojo: la mirada que puede ver la trampa y también quedar fascinada por ella.",
      },
      {
        label: "Tradición Rider-Waite-Smith",
        value: "The Devil · La sombra",
        description:
          "Waite lo vincula con el apego y la ignorancia, no con un ser externo. El diablo es lo que no queremos mirar de nosotros.",
      },
    ],
    spiritualPlane:
      "En el plano espiritual, la carta invita a reconocer la sombra sin identificarte con ella. Lo que se integra deja de gobernar en secreto.",
    mentalPlane:
      "En el plano mental, pide observar los pensamientos repetitivos y las justificaciones que sostienen un hábito.",
    materialPlane:
      "En lo material, puede indicar deudas, excesos, dependencias o una relación de poder que necesita límites claros.",
    uprightMeaning:
      "Un apego o una dependencia se hace visible. La carta no condena: muestra dónde estás cediendo tu poder. También puede hablar de deseo intenso, ambición y magnetismo.",
    reversedMeaning:
      "Puede indicar liberación, ruptura de un patrón o, al contrario, negación de la sombra. También habla de miedo a mirar lo que se desea. La conciencia es el primer eslabón que se suelta.",
    loveMeaning:
      "Atracción intensa que puede volverse dependencia. La carta invita a revisar si el vínculo te amplía o te reduce.",
    workMeaning:
      "Ambición, competencia o una estructura de poder que pide negociación. No confundas compromiso con sometimiento.",
    healthMeaning:
      "Los excesos y las adicciones afectan el cuerpo. La carta pide honestidad y ayuda concreta, no solo fuerza de voluntad.",
    personalDevelopment:
      "Nombra un deseo que te avergüenza y pregúntale qué necesita. La sombra integrada se vuelve energía disponible.",
    advice:
      "Escribe una cadena que sostienes por costumbre y una acción pequeña para aflojarla. No se trata de romperla hoy, sino de verla.",
    colorKeys: ["black", "crimson", "earth"],
  },
  16: {
    centralConcept: "La estructura que cae para que la verdad encuentre espacio",
    generalMeaning:
      "La Torre se alza sobre una roca y es alcanzada por un rayo. La corona salta, dos figuras caen y las llamas se propagan. No es un castigo gratuito: es el derrumbe de una construcción que ya no sostenía la vida. Lo que cae libera el terreno.",
    message:
      "Lo que se derrumba no siempre se pierde. A veces cae la cárcel, no la persona.",
    keywords: ["Ruptura", "Revelación", "Liberación", "Crisis", "Verdad", "Reconstrucción"],
    symbolism: [
      {
        title: "El rayo",
        description:
          "La verdad que irrumpe sin aviso. Lo que se construyó sobre una base falsa no puede sostenerse.",
      },
      {
        title: "La corona que cae",
        description:
          "El orgullo y la falsa autoridad se desploman. La humildad es el nuevo cimiento.",
      },
      {
        title: "Las llamas",
        description:
          "La purificación por el fuego. Lo esencial sobrevive; lo accesorio se consume.",
      },
      {
        title: "La roca",
        description:
          "El suelo firme que queda después del derrumbe. La crisis también revela lo que sí es real.",
      },
    ],
    numerology: buildNumerology(
      16,
      "La ruptura",
      "El dieciséis reduce a siete: la crisis que obliga a mirar hacia dentro. Su energía es la verdad que desarma.",
    ),
    astrology: {
      planet: "Marte",
      element: "Fuego",
      description:
        "Marte aporta impulso, corte y conflicto. La Torre muestra su cara más súbita: la acción que rompe la inercia.",
    },
    esoteric: [
      {
        label: "Letra hebrea",
        value: "Pe (פ)",
        description:
          "Pe significa boca: la palabra que revela y derriba. La verdad dicha a tiempo también es un rayo.",
      },
      {
        label: "Tradición Rider-Waite-Smith",
        value: "The Tower · El derrumbe",
        description:
          "Waite la vincula con la liberación y la corrección. La torre no cae por azar: cae porque estaba mal construida.",
      },
    ],
    spiritualPlane:
      "En el plano espiritual, la carta invita a confiar en que la crisis también puede ser una forma de gracia: algo falso se cae para que lo verdadero respire.",
    mentalPlane:
      "En el plano mental, pide revisar las creencias que sostenían una seguridad aparente. La humildad intelectual abre espacio.",
    materialPlane:
      "En lo material, puede indicar cambios bruscos, pérdidas, reestructuraciones o la caída de un plan que necesitaba revisión.",
    uprightMeaning:
      "Una ruptura súbita que revela la verdad. La carta favorece la liberación de estructuras falsas, aunque el proceso sea incómodo. Lo que cae no estaba sosteniendo la vida.",
    reversedMeaning:
      "Puede indicar resistencia al cambio, miedo a la crisis o un derrumbe que se evita a medias. También habla de catástrofes internas que no se nombran. La reconstrucción empieza por aceptar lo que ya no se sostiene.",
    loveMeaning:
      "Una crisis que puede romper la relación o revelar su verdad. La carta invita a hablar claro antes de que el rayo lo haga por ti.",
    workMeaning:
      "Cambios bruscos, despidos o proyectos que se caen. Revisa los cimientos antes de reconstruir.",
    healthMeaning:
      "El cuerpo puede dar un aviso contundente. No ignores los síntomas ni los límites: la crisis también es información.",
    personalDevelopment:
      "Acepta que algunas seguridades eran jaulas. La libertad empieza cuando dejas de sostener lo que ya se cayó.",
    advice:
      "Identifica una estructura que sostienes por miedo y pregúntate qué pasaría si la dejaras caer. Prepara un plan de reconstrucción.",
    colorKeys: ["crimson", "gold", "black"],
  },
  17: {
    centralConcept: "La esperanza que se enciende después de la tormenta",
    generalMeaning:
      "La Estrella muestra a una mujer desnuda que vierte agua sobre la tierra y sobre el estanque, bajo un cielo con una estrella grande y siete pequeñas. No hay promesas de comodidad: hay una confianza serena en que el ciclo vuelve a abrirse.",
    message:
      "Después de la tormenta, la luz no vuelve con ruido: vuelve como una presencia silenciosa que te invita a seguir.",
    keywords: ["Esperanza", "Renovación", "Fe", "Curación", "Inspiración", "Serenidad"],
    symbolism: [
      {
        title: "La estrella central",
        description:
          "La guía que no necesita pruebas inmediatas. La esperanza es una forma de orientación.",
      },
      {
        title: "Las siete estrellas",
        description:
          "Los ciclos y las correspondencias celestes. La vida se reordena después del caos.",
      },
      {
        title: "El agua que se vierte",
        description:
          "Lo que se comparte sin cálculo: la tierra recibe y el estanque devuelve el reflejo.",
      },
      {
        title: "La desnudez",
        description:
          "No hay armadura. Después de la crisis, mostrarse tal cual es se vuelve posible.",
      },
    ],
    numerology: buildNumerology(
      17,
      "La renovación",
      "El diecisiete reduce a ocho: el equilibrio que se recupera después del desorden. Su energía es la confianza que se reconstruye.",
    ),
    astrology: {
      sign: "Acuario",
      element: "Aire",
      description:
        "Acuario aporta visión, futuro y deseo de compartir. La Estrella invita a confiar en lo que todavía no se ve.",
    },
    esoteric: [
      {
        label: "Letra hebrea",
        value: "Tzadi (צ)",
        description:
          "Tzadi significa anzuelo o justicia: la esperanza que atrae lo que necesita llegar.",
      },
      {
        label: "Tradición Rider-Waite-Smith",
        value: "The Star · La guía",
        description:
          "Waite la vincula con la esperanza y la inspiración. Su luz no elimina el pasado: lo atraviesa.",
      },
    ],
    spiritualPlane:
      "En el plano espiritual, la carta invita a recuperar la fe en algo más grande que el miedo. La esperanza no es ingenuidad: es una decisión de mirar.",
    mentalPlane:
      "En el plano mental, pide salir de la rumiación y volver a imaginar posibilidades. La mente también necesita cielo abierto.",
    materialPlane:
      "En lo material, favorece la recuperación, los nuevos proyectos y las oportunidades que llegan después de una etapa difícil.",
    uprightMeaning:
      "Una etapa de renovación y esperanza. La carta favorece la curación, la inspiración y la confianza en el futuro. Es momento de cuidar lo que empieza a brotar.",
    reversedMeaning:
      "Puede indicar desilusión, falta de fe o una esperanza que se apoya en la negación. También habla de desconexión con la propia luz. La salida no es forzar el optimismo, sino recuperar un gesto pequeño de cuidado.",
    loveMeaning:
      "Un vínculo que se renueva o una esperanza amorosa que vuelve. La carta invita a mostrarse sin armadura y a confiar de nuevo.",
    workMeaning:
      "Nuevas oportunidades, inspiración o un proyecto que se recupera. La claridad llega de a poco: no la apures.",
    healthMeaning:
      "Proceso de recuperación y renovación. El descanso, el agua y el contacto con la naturaleza acompañan.",
    personalDevelopment:
      "Recupera la confianza en tu propia luz. La esperanza también se practica con pequeños actos de cuidado.",
    advice:
      "Haz una cosa hoy que te devuelva la sensación de futuro: escribe un deseo, riega una planta, camina mirando el cielo.",
    colorKeys: ["sky", "silver", "gold"],
  },
  18: {
    centralConcept: "La noche del alma que pide atravesar la niebla",
    generalMeaning:
      "La Luna ilumina un paisaje inquietante: un perro y un lobo aúllan, un cangrejo emerge del agua y un camino se pierde entre dos torres. No es una carta de peligro absoluto, sino de percepción alterada. Lo que ves puede ser real o puede ser el reflejo de tus miedos.",
    message:
      "No todo lo que sientes es un hecho. Atraviesa la niebla sin dejar de caminar, pero no tomes decisiones definitivas en plena noche.",
    keywords: ["Misterio", "Miedo", "Ilusión", "Intuición", "Sueños", "Incertidumbre"],
    symbolism: [
      {
        title: "La luna",
        description:
          "La luz indirecta que revela y distorsiona a la vez. La intuición también necesita contraste.",
      },
      {
        title: "El perro y el lobo",
        description:
          "Lo domesticado y lo salvaje. Ambos reaccionan a la noche; ninguno tiene toda la verdad.",
      },
      {
        title: "El cangrejo",
        description:
          "Lo que emerge desde las profundidades. Los instintos también traen información.",
      },
      {
        title: "El camino entre torres",
        description:
          "El umbral que hay que cruzar sin ver el final. La confianza se pone a prueba en la penumbra.",
      },
    ],
    numerology: buildNumerology(
      18,
      "La noche",
      "El dieciocho reduce a nueve: el cierre de un ciclo que todavía no se comprende del todo. Su energía pide paciencia con lo incierto.",
    ),
    astrology: {
      sign: "Piscis",
      element: "Agua",
      description:
        "Piscis disuelve los contornos y abre la percepción a lo sutil. La Luna invita a distinguir intuición de fantasía.",
    },
    esoteric: [
      {
        label: "Letra hebrea",
        value: "Qof (ק)",
        description:
          "Qof significa nuca o hacha: lo que está detrás de la mirada y lo que hay que cortar para avanzar.",
      },
      {
        label: "Tradición Rider-Waite-Smith",
        value: "The Moon · La noche",
        description:
          "Waite la vincula con los sueños, el miedo y la imaginación. La niebla no se disipa a golpes: se atraviesa con paciencia.",
      },
    ],
    spiritualPlane:
      "En el plano espiritual, la carta invita a caminar en la incertidumbre sin perder la orientación interior. La fe también se ejerce a oscuras.",
    mentalPlane:
      "En el plano mental, pide distinguir entre lo que observas y lo que imaginas. Los miedos suelen hablar más fuerte de noche.",
    materialPlane:
      "En lo material, puede indicar información confusa, trámites que se demoran o decisiones que necesitan más claridad.",
    uprightMeaning:
      "Un período de incertidumbre y sensibilidad. La carta favorece la intuición, los sueños y la exploración de lo inconsciente. No es momento de conclusiones definitivas, sino de observar.",
    reversedMeaning:
      "Puede indicar claridad que regresa, miedos que se disipan o, al contrario, autoengaño y negación. También habla de ansiedad y confusión. Contrasta lo que sientes con los hechos.",
    loveMeaning:
      "Atracción intensa pero confusa. Puede haber secretos, celos o idealización. La carta pide hablar claro y no llenar los silencios con suposiciones.",
    workMeaning:
      "Información incompleta o un ambiente poco transparente. Espera a tener más datos antes de firmar o comprometerte.",
    healthMeaning:
      "El descanso y la salud emocional son claves. La ansiedad y el insomnio piden atención, no más exigencia.",
    personalDevelopment:
      "Aprende a sostener la incertidumbre sin convertir cada sensación en una sentencia. La noche también enseña.",
    advice:
      "Escribe lo que crees que está pasando y, al lado, lo que realmente sabes. Espera un día antes de decidir.",
    colorKeys: ["indigo", "silver", "violet"],
  },
  19: {
    centralConcept: "La claridad que se comparte sin reservas",
    generalMeaning:
      "El Sol brilla sobre un niño que monta un caballo blanco y sostiene una bandera roja. Detrás, un muro con girasoles. La escena es simple y luminosa: no hay sombra que oculte la alegría. La carta habla de verdad, vitalidad y de la confianza que se recupera al estar en el mundo sin miedo.",
    message:
      "La luz no necesita defensa. Muéstrate tal como eres y deja que la vida te devuelva el calor.",
    keywords: ["Alegría", "Claridad", "Vitalidad", "Éxito", "Verdad", "Confianza"],
    symbolism: [
      {
        title: "El sol",
        description:
          "La conciencia plena que ilumina sin distorsionar. Lo que se ve con claridad puede atenderse.",
      },
      {
        title: "El niño",
        description:
          "La inocencia recuperada, no la ingenuidad. La alegría de estar vivo sin pedir permiso.",
      },
      {
        title: "El caballo blanco",
        description:
          "La energía vital que se mueve con confianza. El cuerpo también sabe celebrar.",
      },
      {
        title: "Los girasoles",
        description:
          "La vida que se orienta hacia la luz. Lo que se cuida florece en dirección a su bien.",
      },
    ],
    numerology: buildNumerology(
      19,
      "La plenitud",
      "El diecinueve reduce a diez y luego a uno: el ciclo que se completa y vuelve a empezar con luz renovada.",
    ),
    astrology: {
      planet: "Sol",
      element: "Fuego",
      description:
        "El Sol rige la identidad, la vitalidad y la expresión. La carta invita a mostrarte sin esconder tu luz.",
    },
    esoteric: [
      {
        label: "Letra hebrea",
        value: "Resh (ר)",
        description:
          "Resh significa cabeza o rostro: la conciencia que se vuelve visible en el mundo.",
      },
      {
        label: "Tradición Rider-Waite-Smith",
        value: "The Sun · La claridad",
        description:
          "Waite la vincula con la felicidad y el éxito. Su luz no es ingenua: es el resultado de haber atravesado la noche.",
      },
    ],
    spiritualPlane:
      "En el plano espiritual, la carta celebra la presencia plena. La alegría también es una forma de gratitud.",
    mentalPlane:
      "En el plano mental, pide claridad y pensamiento positivo sin negar lo difícil. La luz no borra la sombra: la integra.",
    materialPlane:
      "En lo material, favorece el éxito, el reconocimiento, la salud y los proyectos que maduran a la vista de todos.",
    uprightMeaning:
      "Un período de claridad, alegría y logro. La carta favorece la confianza, la expresión y el éxito. Es momento de disfrutar y compartir lo que has construido.",
    reversedMeaning:
      "Puede indicar alegría bloqueada, exceso de optimismo o miedo a brillar. También habla de cansancio y de una luz que se fuerza. Revisa si estás viviendo para la imagen o para la vida.",
    loveMeaning:
      "Amor luminoso, sincero y visible. La carta favorece la alegría compartida y la confianza sin juegos.",
    workMeaning:
      "Reconocimiento, éxito y proyectos que salen adelante. Disfruta el logro sin olvidar a quienes te acompañaron.",
    healthMeaning:
      "Vitalidad y recuperación. El sol, el movimiento y la alegría son buenos aliados.",
    personalDevelopment:
      "Permítete disfrutar sin culpa y mostrarte sin pedir perdón. La confianza también se cultiva.",
    advice:
      "Comparte hoy algo que te hace bien con alguien. La alegría se multiplica cuando se dice.",
    colorKeys: ["sunflower", "gold", "sky"],
  },
  20: {
    centralConcept: "El llamado que despierta y pide una respuesta consciente",
    generalMeaning:
      "El Juicio muestra a un ángel que toca la trompeta desde el cielo, mientras hombres, mujeres y niños se alzan de sus tumbas con los brazos abiertos. No es una condena: es un despertar. Algo llama a la vida y cada figura decide responder.",
    message:
      "Hay un llamado que ya no puedes ignorar. Escucha qué parte de ti está pidiendo nacer de nuevo.",
    keywords: ["Despertar", "Llamado", "Renacimiento", "Evaluación", "Verdad", "Respuesta"],
    symbolism: [
      {
        title: "La trompeta",
        description:
          "El sonido que rompe el sueño. La verdad también puede ser un llamado incómodo.",
      },
      {
        title: "Las tumbas abiertas",
        description:
          "Lo que estaba enterrado vuelve a la superficie. La vida pide ser atendida.",
      },
      {
        title: "Los brazos abiertos",
        description:
          "La respuesta al llamado. Nadie es arrastrado: cada uno elige levantarse.",
      },
      {
        title: "El ángel",
        description:
          "La instancia superior que convoca. La conciencia también tiene una voz que llama.",
      },
    ],
    numerology: buildNumerology(
      20,
      "El despertar",
      "El veinte reduce a dos: el encuentro con otro que te devuelve a ti. Su energía es la respuesta consciente.",
    ),
    astrology: {
      planet: "Plutón",
      element: "Fuego",
      description:
        "Plutón rige la muerte simbólica y la regeneración. El Juicio invita a responder a lo que ya no puede seguir dormido.",
    },
    esoteric: [
      {
        label: "Letra hebrea",
        value: "Shin (ש)",
        description:
          "Shin significa diente o fuego: la transformación que consume lo viejo y enciende lo nuevo.",
      },
      {
        label: "Tradición Rider-Waite-Smith",
        value: "Judgement · El llamado",
        description:
          "Waite la vincula con la resurrección y la conciencia. No es un juicio externo: es la verdad que te llama por tu nombre.",
      },
    ],
    spiritualPlane:
      "En el plano espiritual, la carta invita a escuchar el llamado de la conciencia y a responder con la vida, no solo con palabras.",
    mentalPlane:
      "En el plano mental, pide evaluar el camino recorrido sin castigarte. El balance también puede ser una forma de liberación.",
    materialPlane:
      "En lo material, puede indicar una decisión importante, un cambio de rumbo o la oportunidad de reparar algo del pasado.",
    uprightMeaning:
      "Un despertar y una llamada a la acción. La carta favorece la evaluación honesta, el renacimiento y la respuesta valiente. Algo está listo para volver a la vida.",
    reversedMeaning:
      "Puede indicar miedo a responder, autoexigencia o un llamado que se ignora. También habla de quedarse en la culpa sin pasar a la acción. El perdón también forma parte del juicio.",
    loveMeaning:
      "Una relación que pide una conversación decisiva o un renacer. La carta invita a decir la verdad y a escuchar la respuesta.",
    workMeaning:
      "Evaluación, cambio de rumbo o una oportunidad de reparar un proyecto. Responde a lo que el contexto te está pidiendo.",
    healthMeaning:
      "El cuerpo pide una revisión honesta. Un cambio de hábitos puede ser una forma de renacimiento.",
    personalDevelopment:
      "Escucha qué parte de ti pide ser vista. La respuesta consciente es el primer paso del cambio.",
    advice:
      "Escribe un llamado que llevas tiempo escuchando y una respuesta concreta que puedas dar esta semana.",
    colorKeys: ["sky", "gold", "ivory"],
  },
  21: {
    centralConcept: "La realización que integra todo lo vivido",
    generalMeaning:
      "El Mundo muestra a una figura danzante dentro de una corona de laurel, con dos varitas en las manos. En las esquinas, los cuatro seres simbólicos. La danza no es estática: es el movimiento de un ciclo que se completa y se abre a otro. Todo lo vivido encuentra su lugar.",
    message:
      "Has llegado a un punto de integración. Celebra lo recorrido y prepárate para un nuevo ciclo desde una versión más completa de ti.",
    keywords: ["Realización", "Integración", "Cierre", "Plenitud", "Viaje", "Totalidad"],
    symbolism: [
      {
        title: "La corona de laurel",
        description:
          "El ciclo completado. La victoria no es un trofeo: es una forma de habitar el mundo.",
      },
      {
        title: "La danza",
        description:
          "La vida que sigue moviéndose dentro del orden. La plenitud no es quietud.",
      },
      {
        title: "Las dos varitas",
        description:
          "El equilibrio entre los polos. La realización integra lo que antes parecía separado.",
      },
      {
        title: "Los cuatro seres",
        description:
          "Los elementos y las direcciones. El mundo se sostiene en la diversidad integrada.",
      },
    ],
    numerology: buildNumerology(
      21,
      "La totalidad",
      "El veintiuno reduce a tres: la creación que se expresa en plenitud. Su energía es la síntesis de todo el recorrido.",
    ),
    astrology: {
      planet: "Saturno",
      element: "Tierra",
      description:
        "Saturno rige el tiempo, la estructura y la madurez. El Mundo muestra el fruto de un proceso sostenido.",
    },
    esoteric: [
      {
        label: "Letra hebrea",
        value: "Tav (ת)",
        description:
          "Tav significa marca o sello: el cierre que deja una huella y abre un nuevo comienzo.",
      },
      {
        label: "Tradición Rider-Waite-Smith",
        value: "The World · La danza",
        description:
          "Waite la vincula con la realización y el universo. No es el final: es el umbral de un ciclo más amplio.",
      },
    ],
    spiritualPlane:
      "En el plano espiritual, la carta celebra la integración de lo vivido. La totalidad no niega las grietas: las incluye.",
    mentalPlane:
      "En el plano mental, pide reconocer lo aprendido y soltar la necesidad de perfección. El ciclo se cierra mejor cuando se acepta tal como fue.",
    materialPlane:
      "En lo material, favorece los logros, los viajes, la expansión y los proyectos que alcanzan su forma madura.",
    uprightMeaning:
      "Un ciclo se completa con éxito. La carta favorece la realización, la integración y la sensación de plenitud. Es momento de celebrar y de preparar el siguiente paso.",
    reversedMeaning:
      "Puede indicar un cierre que se resiste, una meta que se posterga o la sensación de que falta algo. También habla de éxito externo con vacío interno. Revisa qué parte del recorrido aún no has integrado.",
    loveMeaning:
      "Una relación que alcanza madurez o un vínculo que se integra en la vida cotidiana. También puede hablar de un amor que trasciende fronteras.",
    workMeaning:
      "Un proyecto llega a buen término o se expande. Es buen momento para cerrar etapas y presentar resultados.",
    healthMeaning:
      "Equilibrio y vitalidad integrada. El cuerpo agradece la armonía entre descanso, movimiento y propósito.",
    personalDevelopment:
      "Reconoce todo lo que has recorrido. La plenitud también es saber mirar atrás sin quedarte ahí.",
    advice:
      "Celebra un ciclo que hayas completado y escribe qué aprendiste. Después, elige una semilla para el próximo.",
    colorKeys: ["gold", "emerald", "sky"],
  },
};

export const riderWaiteMajors: TarotCard[] = manifest
  .filter((base) => base.category === "major")
  .map((base) => {
    const content = majorsContent[base.number];
    const names = riderWaiteMajorNames[base.number];

    if (!content || !names) {
      throw new Error(`Falta el contenido del arcano mayor ${base.number}`);
    }

    return {
      ...content,
      id: base.id,
      deckId: "rider-waite",
      number: base.number,
      name: names.name,
      alternateName: names.alternateName,
      image: riderWaiteImageFor(base.number),
      category: "major",
      contentStatus: "complete",
      colors: resolveRiderWaiteColors(content.colorKeys),
    } as TarotCard;
  });
