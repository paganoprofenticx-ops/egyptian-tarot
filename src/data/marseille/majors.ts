import type { TarotCard } from "@/types/tarot";
import manifest from "./cards.json";
import {
  buildNumerology,
  marseilleImageFor,
  marseilleMajorNames,
  resolveMarseilleColors,
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
    centralConcept: "La libertad que se atreve a comenzar sin mapa",
    generalMeaning:
      "El Loco (Le Mat) es la carta sin número, el caminante que inicia el recorrido portando solo lo esencial. En el Tarot de Marsella no lleva nombre escrito: su figura basta. Representa el impulso primario, la inocencia que no ignora el riesgo sino que lo abraza como parte del viaje. El perro a sus pies puede ser instinto que avisa o compañero que sigue.",
    message:
      "No necesitas tener todas las respuestas para dar el primer paso. La confianza también se construye caminando.",
    keywords: ["Comienzo", "Libertad", "Confianza", "Inocencia", "Riesgo", "Instinto"],
    symbolism: [
      {
        title: "El caminante descalzo",
        description:
          "Avance sin armadura ni provisiones visibles. La vulnerabilidad es su única protección real.",
      },
      {
        title: "El perro",
        description:
          "Muerde o ladra: el instinto que protege o el miedo que frena. Ambos forman parte del camino.",
      },
      {
        title: "El precipicio y el bastón",
        description:
          "El borde no es un final, es el umbral. El bastón sostiene pero no decide el rumbo.",
      },
      {
        title: "La ausencia de número",
        description:
          "El Loco precede y sigue a la serie. Es el cero que contiene todo y el veintidós que regresa al uno.",
      },
    ],
    numerology: buildNumerology(
      0,
      "El vacío fértil",
      "El cero no es nada: es la potencialidad antes de la forma. El Loco habita ese espacio.",
    ),
    astrology: {
      planet: "Urano",
      element: "Aire",
      description:
        "Urano rompe patrones y abre lo inesperado. El Loco encarna la chispa que inicia un nuevo ciclo sin pedir permiso.",
    },
    esoteric: [
      {
        label: "Letra hebrea",
        value: "Aleph (א)",
        description:
          "Aleph es el aliento silencioso, la unidad que precede a la dualidad. El principio que no se ve pero todo lo contiene.",
      },
      {
        label: "Tradición marsellesa",
        value: "Le Mat · El excéntrico",
        description:
          "En los grabados antiguos, el Loco camina hacia la izquierda: vuelve al origen. Su número implícito es el 0 o el 22, el alfa y el omega.",
      },
    ],
    spiritualPlane:
      "En el plano espiritual, la carta invita a confiar en la vida y a dejar de esperar una garantía absoluta para empezar. La fe no es certeza: es movimiento.",
    mentalPlane:
      "En el plano mental, pide curiosidad y apertura. La mente que lo sabe todo no puede aprender. El Loco pregunta sin saber la respuesta.",
    materialPlane:
      "En lo material, favorece los nuevos comienzos, los viajes, los cambios de rumbo y los proyectos que nacen sin un plan perfecto. La improvisación consciente.",
    uprightMeaning:
      "Un nuevo comienzo, una libertad recuperada o un salto de fe. La carta favorece la espontaneidad, la curiosidad y la confianza en el camino. No es imprudencia si hay conciencia del riesgo.",
    reversedMeaning:
      "Puede indicar impulsividad, miedo a empezar o una huida disfrazada de libertad. También habla de falta de dirección. Antes de saltar, revisa qué estás dejando atrás y qué necesitas aprender.",
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
    colorKeys: ["terracotta", "ivory", "sage"],
  },
  1: {
    centralConcept: "La voluntad que reúne sus herramientas y comienza",
    generalMeaning:
      "El Mago (Le Bateleur) se para detrás de su mesa y muestra lo que tiene: las cuatro suites del tarot —bastos, copas, espadas, oros— convertidas en instrumentos. No es un ilusionista: es el artesano que sabe que la intención necesita materia. El lemniscata (el ocho acostado) sobre su cabeza indica que la energía circula entre lo alto y lo bajo.",
    message:
      "No esperes a tenerlo todo: lo que ya sabes, si lo pones en movimiento, es suficiente para comenzar.",
    keywords: ["Voluntad", "Iniciativa", "Habilidad", "Manifestación", "Herramientas", "Palabra"],
    symbolism: [
      {
        title: "La mesa de trabajo",
        description:
          "Los cuatro palos expuestos no son decoración: son los recursos con los que se construye cualquier realidad.",
      },
      {
        title: "El gesto de la mano",
        description:
          "Una mano apunta al cielo, la otra a la tierra. El mago canaliza: recibe y proyecta, no retiene.",
      },
      {
        title: "El sombrero de ala ancha (lemniscata)",
        description:
          "El ocho horizontal simboliza el infinito y la circulación continua de la energía entre planos.",
      },
      {
        title: "La postura de pie",
        description:
          "Está listo para actuar. La inmovilidad sería el fracaso; el oficio se ejerce en movimiento.",
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
        label: "Tradición marsellesa",
        value: "Le Bateleur · El oficiante",
        description:
          "Bateleur alude al que hace trucos, pero en la tradición es quien bate (golpea, trabaja) la materia. Es el operador del ritual.",
      },
    ],
    spiritualPlane:
      "En el plano espiritual, la carta recuerda que la voluntad es una forma de servicio: crear también es asumir una responsabilidad.",
    mentalPlane:
      "En el plano mental, pide claridad de intención y foco. La dispersión es el principal obstáculo para que una idea se materialice.",
    materialPlane:
      "En lo material, favorece iniciar proyectos, presentar propuestas y reunir los recursos que ya están disponibles.",
    uprightMeaning:
      "Etapa de iniciativa y confianza en las propias capacidades. Es momento de actuar, aprender haciendo y comunicar lo que deseas. La carta sugiere que las herramientas están a tu alcance.",
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
    colorKeys: ["terracotta", "gold", "vermilion"],
  },
  2: {
    centralConcept: "La sabiduría que se guarda en el silencio",
    generalMeaning:
      "La Papisa (La Papesse) está sentada entre dos columnas, con un libro en el regazo y una llave a sus pies. No enseña en voz alta: custodia. Su conocimiento no es académico, es iniciático —lo que se transmite cuando el estudiante está listo. El velo detrás de ella separa lo visible de lo que aún no se puede nombrar.",
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
        title: "Las dos columnas (J y B)",
        description:
          "Joachim y Boaz: la fuerza y la estabilidad, el opuesto que sostiene el templo. El conocimiento requiere tensión.",
      },
      {
        title: "La llave a sus pies",
        description:
          "El acceso no se entrega: se gana. La llave está ahí, pero hay que agacharse a recogerla.",
      },
      {
        title: "La corona y el velo",
        description:
          "Reina de lo oculto. Su autoridad no se impone: se reconoce por quien sabe esperar.",
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
        label: "Tradición marsellesa",
        value: "La Papesse · La Suma Sacerdotisa",
        description:
          "Única figura femenina con autoridad espiritual en el mazo. En algunos mazos antiguos lleva tiara papal: el poder secreto que no se muestra.",
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
    colorKeys: ["indigo", "ivory", "lapis"],
  },
  3: {
    centralConcept: "La vida que se vuelve forma, abundancia y cuidado",
    generalMeaning:
      "La Emperatriz (L'Impératrice) porta cetro y escudo con el águila imperial. Está sentada, no de rodillas: su poder no se arrodilla. Representa la fecundidad que organiza, la creatividad que produce resultados tangibles. En el Marsella, su mirada va hacia el espectador: te incluye en su dominio.",
    message:
      "Nutre lo que quieres ver crecer; la abundancia no se fuerza, se cultiva con presencia y constancia.",
    keywords: ["Abundancia", "Creatividad", "Cuidado", "Fertilidad", "Autoridad", "Cuerpo"],
    symbolism: [
      {
        title: "El cetro y el escudo",
        description:
          "Gobierna y protege. La autoridad que cuida no es tiranía: es la forma que permite que la vida florezca.",
      },
      {
        title: "El águila en el escudo",
        description:
          "Visión de águila: ve el todo y el detalle. La abundancia necesita perspectiva, no solo impulso.",
      },
      {
        title: "La postura sedente y frontal",
        description:
          "No huye ni se esconde. Su poder es visible, asumido y responsable.",
      },
      {
        title: "La corona y el manto",
        description:
          "La realeza no es un adorno: es la carga de sostener un reino. Lo que creces, también lo sostienes.",
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
        label: "Tradición marsellesa",
        value: "L'Impératrice · La que manda",
        description:
          "En el juego de naipes, la Emperatriz vale más que el Emperador en algunos trucos. El poder femenino no es secundario: es complementario y a veces superior.",
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
    colorKeys: ["vermilion", "gold", "sage"],
  },
  4: {
    centralConcept: "El orden que sostiene y da forma a la vida",
    generalMeaning:
      "El Emperador (L'Empereur) está sentado de perfil, rígido, con el cetro en una mano y el globo terráqueo en la otra. Su pierna cruzada forma un cuatro con el cuerpo: la estructura hecha carne. No mira al espectador: gobierna. Representa la autoridad que establece límites, la ley que protege, la estructura que permite la libertad.",
    message:
      "La libertad sin estructura se dispersa. Construye una base clara y sostén lo que has decidido proteger.",
    keywords: ["Estructura", "Autoridad", "Límites", "Estabilidad", "Responsabilidad", "Ley"],
    symbolism: [
      {
        title: "El cetro y el orbe",
        description:
          "El impulso que dirige (cetro) y el dominio que sostiene (orbe). Gobernar es equilibrar acción y contención.",
      },
      {
        title: "La pierna cruzada (el cuatro corporal)",
        description:
          "Su propio cuerpo dibuja el número: la estructura no es externa, es su forma de habitar el mundo.",
      },
      {
        title: "La armadura bajo el manto",
        description:
          "La protección no se muestra pero está ahí. El orden requiere defensa frente al caos.",
      },
      {
        title: "La barba y la corona",
        description:
          "La madurez y la investidura. La autoridad no se improvisa: se gana con tiempo y decisiones.",
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
        label: "Tradición marsellesa",
        value: "L'Empereur · El que manda",
        description:
          "Forma pareja con la Emperatriz: el poder masculino (estructura, ley) y el femenino (vida, sustento). Juntos sostienen el orden del mundo.",
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
    colorKeys: ["terracotta", "gold", "charcoal"],
  },
  5: {
    centralConcept: "La enseñanza que une tradición y conciencia",
    generalMeaning:
      "El Papa (Le Pape) bendice con una mano y sostiene la cruz triple con la dos. Dos acólitos arrodillados reciben la transmisión. No es solo dogma: es la función de transmitir lo recibido, de ser puente entre lo sagrado y lo humano. En el Marsella, su gesto es amplio: invita a entrar, no a obedecer ciegamente.",
    message:
      "Toda tradición es una puerta, no una jaula. Aprende de ella, cuestiónala y encuentra tu propia forma de transmitirla.",
    keywords: ["Enseñanza", "Tradición", "Guía", "Ética", "Pertenencia", "Ritual"],
    symbolism: [
      {
        title: "La triple cruz y la mano bendiciendo",
        description:
          "Tres niveles de realidad (cuerpo, alma, espíritu) unidos en un gesto. La bendición no impone: abre.",
      },
      {
        title: "Los dos acólitos",
        description:
          "Uno mira al Papa, el otro mira al libro. El conocimiento se completa entre la transmisión oral y la escrita.",
      },
      {
        title: "Las llaves a los pies",
        description:
          "El acceso al misterio está a disposición, pero hay que inclinarse para tomarlo. La humildad precede al saber.",
      },
      {
        title: "La tiara de tres coronas",
        description:
          "Poder espiritual, temporal y moral. La autoridad completa integra las tres dimensiones.",
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
        "Tauro aporta paciencia y sentido práctico. El Papa convierte esa estabilidad en una enseñanza que puede encarnarse en la vida diaria.",
    },
    esoteric: [
      {
        label: "Letra hebrea",
        value: "Vav (ו)",
        description:
          "Vav significa clavo o gancho: aquello que une el cielo y la tierra, la enseñanza y la experiencia.",
      },
      {
        label: "Tradición marsellesa",
        value: "Le Pape · El Pontífice",
        description:
          "Pontífice viene de 'pontifex': constructor de puentes. Su función es conectar, no separar. En la corte del tarot, es el consejero espiritual del Emperador.",
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
    colorKeys: ["indigo", "ivory", "gold"],
  },
  6: {
    centralConcept: "La elección que compromete el corazón y los valores",
    generalMeaning:
      "Los Enamorados (L'Amoureux) muestra a un joven entre dos mujeres, con Cupido disparando desde arriba. No es solo romance: es la encrucijada donde se elige un camino y se deja otro. La presencia del ángel sugiere que la elección trasciende el deseo personal: implica valores, destino y consecuencia.",
    message:
      "Elegir es renunciar a algo. Que tu decisión nazca de tus valores y no solo del miedo a perder.",
    keywords: ["Elección", "Unión", "Deseo", "Valores", "Encuentro", "Destino"],
    symbolism: [
      {
        title: "El joven en el centro",
        description:
          "No eligen por él: él debe elegir. La libertad se ejerce en la decisión, no en la indecisión indefinida.",
      },
      {
        title: "Las dos mujeres",
        description:
          "Representan dos caminos, dos naturalezas, dos futuros posibles. No son 'buena y mala': son distintas.",
      },
      {
        title: "Cupido / El ángel sobre ellos",
        description:
          "La flecha viene de arriba: el deseo tiene una dimensión que escapa al control. El destino participa.",
      },
      {
        title: "Los árboles y la montaña",
        description:
          "Un árbol florecido, otro con frutos. La montaña al fondo: la elección tiene consecuencias duraderas.",
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
        label: "Tradición marsellesa",
        value: "L'Amoureux · El Enamorado",
        description:
          "En singular en el nombre original: el que ama, el que elige amando. La carta no se llama 'Los Enamorados' (pareja) sino 'El Enamorado' (quien ama y elige).",
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
    colorKeys: ["vermilion", "gold", "rose"],
  },
  7: {
    centralConcept: "La victoria que nace de dirigir fuerzas opuestas",
    generalMeaning:
      "El Carro (Le Chariot) no tiene riendas: el auriga gobierna con la voluntad. Dos esfinges (o caballos) de distinto color tiran en direcciones opuestas; el dosel estrellado sobre él indica que su dirección viene de una visión superior. Es la carta del triunfo mediante la disciplina, no por la fuerza bruta.",
    message:
      "No basta con tener fuerza: necesitas un destino claro y la disciplina para sostener las riendas.",
    keywords: ["Victoria", "Dirección", "Disciplina", "Viaje", "Confianza", "Control"],
    symbolism: [
      {
        title: "El auriga sin riendas",
        description:
          "Gobierna con la postura y la mirada. El control verdadero no necesita correas visibles.",
      },
      {
        title: "Las dos esfinges / caballos",
        description:
          "Fuerzas opuestas (instinto/razón, deseo/deber) que deben ser conducidas, no eliminadas.",
      },
      {
        title: "El dosel con estrellas",
        description:
          "La cobertura celeste: la protección y la guía vienen de una visión que trasciende el esfuerzo inmediato.",
      },
      {
        title: "Las alabardas y la armadura",
        description:
          "Está armado pero no ataca. La victoria ya se ganó en el plano interior; el carro la manifiesta.",
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
        label: "Tradición marsellesa",
        value: "Le Chariot · El Triunfo",
        description:
          "En los mazos antiguos, el carro a veces es tirado por dos esfinges aladas: la victoria sobre la dualidad mediante la inteligencia, no la fuerza.",
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
    colorKeys: ["terracotta", "gold", "indigo"],
  },
  8: {
    centralConcept: "El equilibrio que exige verdad y responsabilidad",
    generalMeaning:
      "La Justicia (La Justice) sostiene la espada en una mano y la balanza en la otra. Está sentada entre dos columnas, como la Papisa, pero su mirada es frontal y su gesto es activo: corta y pesa. Representa la ley de causa y efecto, la responsabilidad personal y la honestidad como única base para el orden.",
    message:
      "La verdad te libera, aunque al principio incomode. Asume lo que te corresponde y ajusta lo que ya no está en equilibrio.",
    keywords: ["Equilibrio", "Verdad", "Responsabilidad", "Decisión", "Consecuencia", "Ley"],
    symbolism: [
      {
        title: "La espada y la balanza",
        description:
          "La espada corta lo que sobra; la balanza muestra la medida justa. Justicia no es venganza: es proporción.",
      },
      {
        title: "La postura sentada y frontal",
        description:
          "No se esconde ni se apresura. La justicia requiere tiempo, testigos y deliberación.",
      },
      {
        title: "La corona y el manto rojo",
        description:
          "La autoridad (corona) y la acción (rojo). Juzgar es un acto de poder, no de pasividad.",
      },
      {
        title: "El número VIII entre Force y L'Hermite",
        description:
          "En el Marsella clásico, la Justicia es el 8 y la Fuerza el 11. El equilibrio precede a la fuerza interior.",
      },
    ],
    numerology: buildNumerology(
      8,
      "El equilibrio de poder",
      "El ocho pone en juego la fuerza y la responsabilidad. Su equilibrio depende de que el poder esté al servicio de la justicia.",
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
        label: "Tradición marsellesa",
        value: "La Justice · La que juzga",
        description:
          "Única figura femenina con espada y balanza. En el orden del mazo, sigue al Carro: la victoria necesita ser juzgada para ser legítima.",
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
    colorKeys: ["indigo", "ivory", "gold"],
  },
  9: {
    centralConcept: "La luz que se encuentra al caminar solo",
    generalMeaning:
      "El Ermitaño (L'Hermite) camina apoyado en su bastón, cubierto por su manto, portando una lámpara que solo ilumina el suelo inmediato. No huye del mundo: se retira para escuchar. La nieve bajo sus pies y la montaña al fondo indican altura, frío y soledad elegida como método.",
    message:
      "A veces hay que alejarse del ruido para encontrar la luz que se lleva dentro. La soledad puede ser un método, no un destino.",
    keywords: ["Introspección", "Soledad", "Sabiduría", "Paciencia", "Guía", "Búsqueda"],
    symbolism: [
      {
        title: "La lámpara cerrada",
        description:
          "La luz no alumbra el horizonte, solo el siguiente paso. La sabiduría se construye en la experiencia, no en la certeza total.",
      },
      {
        title: "El bastón y el manto",
        description:
          "El apoyo de la experiencia y la protección del silencio. No está desamparado: se basta.",
      },
      {
        title: "La barba y la mirada baja",
        description:
          "El tiempo acumulado y la atención interior. No busca aprobación externa.",
      },
      {
        title: "El número IX tras La Justice",
        description:
          "Después del juicio (8), viene la introspección (9). La culminación del ciclo pide retirada.",
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
        label: "Tradición marsellesa",
        value: "L'Hermite · El Ermitaño",
        description:
          "En algunos mazos antiguos lleva un reloj de arena: el tiempo como compañero. La soledad mide la madurez.",
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
    colorKeys: ["charcoal", "gold", "sage"],
  },
  10: {
    centralConcept: "El ciclo que gira y devuelve cada causa a su efecto",
    generalMeaning:
      "La Rueda de la Fortuna (La Roue de Fortune) gira sostenida por tres figuras: una sube, otra está en la cima, otra baja. La esfinge en el eje observa impasible. No hay justicia aparente en el movimiento: la rueda gira porque esa es su naturaleza. La carta recuerda que la posición es temporal y el centro es lo único estable.",
    message:
      "No te aferres a la cima ni te identifiques con el fondo. Todo se mueve; lo importante es cómo sostienes tu centro mientras gira.",
    keywords: ["Ciclos", "Cambio", "Fortuna", "Movimiento", "Apertura", "Impermanencia"],
    symbolism: [
      {
        title: "La rueda y sus tres figuras",
        description:
          "El mono (baja), el humano con corona (cumbre), el anubis/jackal (sube). Los roles cambian; la rueda permanece.",
      },
      {
        title: "La esfinge en el centro",
        description:
          "El observador inmóvil. Tu conciencia puede ser ese centro que no gira con las circunstancias.",
      },
      {
        title: "Las letras T-A-R-O / R-O-T-A",
        description:
          "En el aro de la rueda: Taro, Rota, Orat, Ator. La palabra gira y revela sus sentidos. El conocimiento también cicla.",
      },
      {
        title: "Las nubes y el cielo",
        description:
          "El fondo inmutable. Sobre la rueda, el cielo no gira. Hay un testigo que no cambia.",
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
        label: "Tradición marsellesa",
        value: "La Roue de Fortune · La Rueda",
        description:
          "A diferencia del Rider-Waite, en el Marsella las figuras son animales/híbridos: la fortuna no distingue entre humanos y bestias. Todos suben y bajan.",
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
    colorKeys: ["gold", "indigo", "sage"],
  },
  11: {
    centralConcept: "La fuerza que se ejerce con ternura y persistencia",
    generalMeaning:
      "La Fuerza (La Force) abre la boca del león con las manos desnudas. No lo doma a golpes: lo guía. El lemniscata sobre su cabeza (como en El Mago) indica que la energía circula: lo que se integra se transforma, lo que se reprime regresa. Es el coraje sereno, no la violencia.",
    message:
      "La verdadera fuerza no consiste en vencer al otro, sino en acompañar tu propio impulso hasta que deje de ser una amenaza.",
    keywords: ["Coraje", "Paciencia", "Dominio de sí", "Deseo", "Compasión", "Persistencia"],
    symbolism: [
      {
        title: "Las manos sobre la mandíbula del león",
        description:
          "Una mano arriba, otra abajo: abre con suavidad pero con firmeza. El control no es aplastamiento.",
      },
      {
        title: "El lemniscata (el ocho acostado)",
        description:
          "La energía circula entre lo alto y lo bajo. La fuerza sostenida con conciencia se vuelve creativa.",
      },
      {
        title: "La guirnalda de flores",
        description:
          "La corona vegetal: la fuerza que cuida produce vida. La ferocidad integrada se vuelve belleza.",
      },
      {
        title: "El paisaje abierto",
        description:
          "No hay jaula ni torre. El dominio de sí ocurre en la vida, no en el retiro.",
      },
    ],
    numerology: buildNumerology(
      11,
      "La intuición",
      "El once es un número maestro: une la iniciativa del uno con la sensibilidad del dos. Su fuerza es la inspiración que se vuelve presencia.",
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
        label: "Tradición marsellesa",
        value: "La Force · La Fortaleza",
        description:
          "En el Marsella clásico, la Fuerza es el XI (la Justicia es VIII). La fuerza interior sigue al Ermitaño: la reflexión precede al dominio de sí.",
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
    colorKeys: ["vermilion", "gold", "sage"],
  },
  12: {
    centralConcept: "La pausa que invierte la mirada y revela lo oculto",
    generalMeaning:
      "El Colgado (Le Pendu) cuelga de un pie atado a un árbol, con las manos cruzadas detrás de la espalda. No sufre: su rostro es sereno. La inversión no es castigo: es método. Desde esa posición ve lo que la postura habitual oculta. La bolsa de monedas que a veces se le cae indica que lo material ya no rige.",
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
        title: "El halo o la luz alrededor de la cabeza",
        description:
          "La comprensión surge en la quietud, no en la agitación. La inversión ilumina.",
      },
      {
        title: "El árbol y las ramas podadas",
        description:
          "El árbol vivo con cortes: el sacrificio tiene raíces. Se suelta lo muerto para que viva lo verde.",
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
          "Mem significa agua: lo que fluye, lo que limpia y lo que enseña a rendirse a una corriente mayor.",
      },
      {
        label: "Tradición marsellesa",
        value: "Le Pendu · El Ahorcado",
        description:
          "En francés 'Pendu' no implica suicidio: es el que cuelga. En mazos antiguos a veces sonríe. La inversión es voluntaria y lúcida.",
      },
    ],
    spiritualPlane:
      "En el plano espiritual, la carta habla de entrega y confianza. Soltar el resultado no significa abandonar el camino.",
    mentalPlane:
      "En el plano mental, pide cuestionar la propia mirada y aceptar que una explicación nueva puede tardar en llegar.",
    materialPlane:
      "En lo material, puede indicar una espera, un proyecto en pausa o un sacrificio necesario para conseguir algo mayor.",
    uprightMeaning:
      "Una pausa fértil. La carta invita a detenerte, cambiar de perspectiva y aceptar que no todo se resuelve con acción. Puede señalar una entrega o un aprendizaje que llega desde la vulnerabilidad.",
    reversedMeaning:
      "Puede indicar resistencia a soltar, martirio o una pausa que se convirtió en parálisis. También habla de sacrificios que ya no tienen sentido. Revisa qué estás sosteniendo solo por miedo al cambio.",
    loveMeaning:
      "La relación pide paciencia y una mirada nueva. Puede haber una espera o la necesidad de soltar una expectativa para encontrarse de verdad.",
    workMeaning:
      "Un proyecto está en pausa o requiere otra estrategia. No fuerces una respuesta; usa el tiempo para observar.",
    healthMeaning:
      "El descanso es prioritario. Escucha los límites del cuerpo y no los interpretes como fracaso.",
    personalDevelopment:
      "Practica la entrega de lo que no puedes controlar. La flexibilidad también es una forma de fuerza.",
    advice:
      "Elige una situación que te frustra y descríbela desde el punto de vista de otra persona. Deja que esa mirada te informe.",
    colorKeys: ["indigo", "sage", "gold"],
  },
  13: {
    centralConcept: "La transformación que corta lo viejo para que nazca lo nuevo",
    generalMeaning:
      "La Muerte (L'Arcane sans nom / La Mort) no tiene nombre en el Marsella clásico: es el Arcano XIII. Un esqueleto con guadaña siega cabezas coronadas y humildes por igual. No distingue rangos. El suelo muestra miembros amputados y brotes nuevos. No es el final: es la ley del ciclo que permite la renovación.",
    message:
      "Lo que termina deja espacio. No le temas al final: pregúntate qué está naciendo debajo.",
    keywords: ["Transformación", "Final", "Renacimiento", "Soltar", "Ciclo", "Igualdad"],
    symbolism: [
      {
        title: "La guadaña siegando",
        description:
          "Corta lo que maduró. No es crueldad: es la ley del ciclo que permite que la vida continúe.",
      },
      {
        title: "Cabezas coronadas y humildes en el suelo",
        description:
          "La muerte no respeta jerarquías. Todos los poderes temporales caen ante ella.",
      },
      {
        title: "Los brotes y las plantas entre los restos",
        description:
          "La vida ya está brotando de lo que fue. La transformación no conduce a la nada.",
      },
      {
        title: "La ausencia de nombre en la carta",
        description:
          "En el Marsella no lleva título. Lo innombrable no se define: se vive. El XIII es el número de la transformación.",
      },
    ],
    numerology: buildNumerology(
      13,
      "La muerte del yo antiguo",
      "El trece reduce a cuatro: la estructura que se desmorona para que otra más verdadera pueda ocupar su lugar.",
    ),
    astrology: {
      sign: "Escorpio",
      element: "Agua",
      description:
        "Escorpio profundiza, transforma y regenera. La carta comparte su energía de muerte simbólica y renacimiento.",
    },
    esoteric: [
      {
        label: "Letra hebrea",
        value: "Nun (נ)",
        description:
          "Nun significa pez: la vida que se mueve en las profundidades y renace después de sumergirse.",
      },
      {
        label: "Tradición marsellesa",
        value: "L'Arcane XIII · La Mort",
        description:
          "Único arcano mayor sin nombre escrito en el mazo clásico. Su número (13) y su imagen bastan. El miedo al nombre le da poder.",
      },
    ],
    spiritualPlane:
      "En el plano espiritual, la carta invita a morir a una identidad que ya no te contiene y a confiar en la continuidad de lo esencial.",
    mentalPlane:
      "En el plano mental, pide aceptar que una creencia o una etapa terminó. La resistencia al final solo prolonga el dolor.",
    materialPlane:
      "En lo material, puede indicar cambios profundos, ventas, mudanzas, cierres de proyectos o transformaciones del cuerpo.",
    uprightMeaning:
      "Un ciclo llega a su fin y es necesario soltarlo. La carta favorece las transformaciones profundas, la limpieza y el renacimiento. Lo que se va ya cumplió su función.",
    reversedMeaning:
      "Puede indicar resistencia al cambio, miedo a perder o una etapa que se prolonga artificialmente. También habla de duelos no resueltos. Permite que el final ocurra para que algo nuevo tenga espacio.",
    loveMeaning:
      "La relación se transforma o un vínculo termina. No es una sentencia: es la invitación a dejar de sostener lo que ya no está vivo.",
    workMeaning:
      "Un proyecto, un puesto o una forma de trabajar llega a su fin. Aprovecha el cierre para evaluar qué quieres construir después.",
    healthMeaning:
      "La carta puede señalar la necesidad de una transformación de hábitos. No sustituye una consulta médica; escucha las señales de tu cuerpo.",
    personalDevelopment:
      "Despide lo que ya no eres. La identidad también necesita renovarse para seguir creciendo.",
    advice:
      "Haz una lista de lo que necesitas cerrar y despide una cosa con un gesto concreto. Después, escribe qué quieres recibir en su lugar.",
    colorKeys: ["charcoal", "ivory", "sage"],
  },
  14: {
    centralConcept: "El arte de mezclar sin perder la medida",
    generalMeaning:
      "La Templanza (Tempérance) vierte líquido de una copa a otra, sin derramar. Un pie en tierra, otro en agua (o en el recipiente). Alas en la espalda, triángulo en el pecho. Representa la alquimia práctica: combinar opuestos (caliente/frío, seco/húmedo, acción/reposo) para crear una tercera sustancia. No es compromiso: es síntesis.",
    message:
      "La armonía no es ausencia de tensión: es la forma de mantenerte en el centro mientras las fuerzas se mueven.",
    keywords: ["Equilibrio", "Medida", "Sanación", "Integración", "Paciencia", "Alquimia"],
    symbolism: [
      {
        title: "Las dos copas y el líquido que pasa",
        description:
          "La circulación entre polos. Nada se retiene para siempre; el equilibrio es flujo, no estática.",
      },
      {
        title: "Un pie en tierra, otro en el agua/copa",
        description:
          "Anclaje y fluidez a la vez. La templanza necesita ambos: raíces y corriente.",
      },
      {
        title: "Las alas y el triángulo en el pecho",
        description:
          "El triángulo (síntesis) sobre el corazón. Las alas: lo que se integra eleva.",
      },
      {
        title: "El camino y las montañas al fondo",
        description:
          "El proceso continúa. La templanza no es la meta: es el modo de caminar.",
      },
    ],
    numerology: buildNumerology(
      14,
      "La medida que integra",
      "El catorce reduce a cinco: la estabilidad se pone a prueba para que el equilibrio sea flexible y no una simple costumbre.",
    ),
    astrology: {
      sign: "Sagitario",
      element: "Fuego",
      description:
        "Sagitario busca sentido, horizonte y expansión. La Templanza añade medida para que el fuego ilumine sin desbordarse.",
    },
    esoteric: [
      {
        label: "Letra hebrea",
        value: "Samekh (ס)",
        description:
          "Samekh significa apoyo o sostén: el equilibrio que permite que algo se mantenga mientras crece.",
      },
      {
        label: "Tradición marsellesa",
        value: "Tempérance · La Moderación",
        description:
          "En el Marsella, a veces tiene alas de ángel y el triángulo con el ojo divino. La virtud cardinal que media entre el exceso y la falta.",
      },
    ],
    spiritualPlane:
      "En el plano espiritual, la carta invita a integrar las contradicciones sin negarlas y a confiar en un proceso de maduración lenta.",
    mentalPlane:
      "En el plano mental, pide moderación, escucha y capacidad de matizar. La verdad rara vez está solo en uno de los extremos.",
    materialPlane:
      "En lo material, favorece la salud, los tratamientos, la conciliación y los procesos que requieren constancia.",
    uprightMeaning:
      "Integración y equilibrio. La carta favorece la sanación, la moderación y la capacidad de encontrar un acuerdo entre partes opuestas. Es tiempo de paciencia y de mezclar sabiamente.",
    reversedMeaning:
      "Puede indicar desequilibrio, excesos o dificultad para encontrar un punto medio. También habla de impaciencia con un proceso de sanación. Revisa qué estás intentando resolver demasiado rápido.",
    loveMeaning:
      "Un vínculo que busca armonía y complementariedad. La carta favorece la reconciliación y el diálogo, siempre que ambos cedan algo real.",
    workMeaning:
      "Mediación, trabajo en equipo y proyectos que requieren coordinar intereses distintos. La paciencia rinde más que la imposición.",
    healthMeaning:
      "Muy favorable para procesos de recuperación, cambios de hábitos y equilibrio emocional. La constancia importa.",
    personalDevelopment:
      "Aprende a sostener dos verdades a la vez. La madurez no siempre consiste en elegir, sino en integrar.",
    advice:
      "Identifica dos extremos que te dividen y busca una acción pequeña que honre a ambos. La medida justa se practica.",
    colorKeys: ["sage", "gold", "ivory"],
  },
  15: {
    centralConcept: "La sombra que encadena cuando no se mira de frente",
    generalMeaning:
      "El Diable (Le Diable) tiene alas de murciélago, cuernos, garras y un rostro en el vientre. Dos figuras encadenadas a su pedestal —pero las cadenas están sueltas al cuello. No las atan: ellos se quedan. Representa el apego, la adicción, la proyección de la sombra fuera de uno. El poder del Diablo es el que le das al no mirar.",
    message:
      "Lo que niegas te gobierna. Mira tu deseo de frente y pregúntate si lo eliges o si él te elige a ti.",
    keywords: ["Deseo", "Apego", "Sombra", "Poder", "Tentación", "Ilusión"],
    symbolism: [
      {
        title: "Las cadenas sueltas al cuello",
        description:
          "No están cerradas con candado. La esclavitud es voluntaria: se sostiene por miedo a la libertad.",
      },
      {
        title: "El rostro en el vientre",
        description:
          "El instinto hecho cara. Lo que reprimes en la cabeza baja al cuerpo y te gobierna desde ahí.",
      },
      {
        title: "La antorcha en la mano izquierda",
        description:
          "Fuego invertido: la luz que quema en lugar de iluminar. El deseo sin conciencia consume.",
      },
      {
        title: "Los cuernos y las alas de murciélago",
        description:
          "La inversión de lo angélico. La sombra usa los mismos atributos que la luz, pero torcidos.",
      },
    ],
    numerology: buildNumerology(
      15,
      "La fuerza del deseo",
      "El quince reduce a seis: el deseo busca vínculo y satisfacción. Su desafío es no confundir amor con posesión.",
    ),
    astrology: {
      sign: "Capricornio",
      element: "Tierra",
      description:
        "Capricornio aporta ambición y estructura. El Diablo muestra el costado oscuro de esa búsqueda: el control, la rigidez y el miedo a perder estatus.",
    },
    esoteric: [
      {
        label: "Letra hebrea",
        value: "Ayin (ע)",
        description:
          "Ayin significa ojo: la mirada que puede ver la sombra o quedar atrapada por ella.",
      },
      {
        label: "Tradición marsellesa",
        value: "Le Diable · El Diablo",
        description:
          "En el Marsella, a veces tiene pechos femeninos y genitales masculinos: la ambigüedad total. La sombra no tiene género: tiene poder si la ignoras.",
      },
    ],
    spiritualPlane:
      "En el plano espiritual, la carta invita a reconocer la sombra sin identificarte con ella. La lucidez empieza por dejar de fingir que no existe.",
    mentalPlane:
      "En el plano mental, pide revisar creencias de escasez, obsesiones y pensamientos repetitivos que limitan la libertad.",
    materialPlane:
      "En lo material, puede indicar apego al dinero, al estatus o al placer, así como situaciones de dependencia que requieren atención.",
    uprightMeaning:
      "Un deseo o un apego ocupa un lugar central. La carta invita a mirarlo con honestidad y a recuperar el poder de elegir. También puede señalar una relación intensa o una situación de dependencia.",
    reversedMeaning:
      "Puede indicar liberación progresiva, conciencia de una atadura o, al contrario, una sombra que actúa desde lo oculto. Es momento de nombrar lo que te condiciona y pedir ayuda si hace falta.",
    loveMeaning:
      "Pasión intensa, atracción magnética o dependencia. La carta pide distinguir deseo de posesión y revisar si la relación te libera o te encadena.",
    workMeaning:
      "Ambición, competencia o una situación de poder desigual. No sacrifiques tus valores por un beneficio inmediato.",
    healthMeaning:
      "Atención a los excesos y a las conductas compulsivas. La conciencia es el primer paso; el acompañamiento profesional puede ser necesario.",
    personalDevelopment:
      "Integra tu sombra sin castigarte. Lo que reconoces deja de actuar a tus espaldas.",
    advice:
      "Nombra un deseo que te condiciona y pregúntate qué obtienes de él. Después, imagina una forma más libre de buscarlo.",
    colorKeys: ["vermilion", "charcoal", "rose"],
  },
  16: {
    centralConcept: "La verdad que derriba lo que no tiene cimientos reales",
    generalMeaning:
      "La Torre (La Maison Dieu / La Tour) es golpeada por un rayo que arranca su corona. Dos figuras caen al vacío entre escombros. No es castigo divino: es la física de lo construido sobre arena. Lo que se derrumba era una estructura falsa, una seguridad ilusoria, un orgullo sin base. El rayo es la claridad que no se puede evitar.",
    message:
      "Lo que se rompe no siempre se pierde. A veces cae una cárcel que llamabas seguridad.",
    keywords: ["Ruptura", "Revelación", "Cambio súbito", "Liberación", "Verdad", "Despertar"],
    symbolism: [
      {
        title: "El rayo y la corona arrancada",
        description:
          "La descarga viene de arriba: una verdad repentina que interrumpe la rutina y obliga a reorganizarlo todo.",
      },
      {
        title: "Las dos figuras cayendo",
        description:
          "El ego y la máscara social precipitándose. No mueren: se despojan de lo que no era real.",
      },
      {
        title: "Los ladrillos y yugos esparcidos",
        description:
          "Los materiales de la construcción falsa. Lo que parecía sólido era solo apariencia.",
      },
      {
        title: "El nombre 'Maison Dieu' (Casa de Dios)",
        description:
          "Irónico: la casa de Dios no la protege el hombre. Lo sagrado no se encierra en torres humanas.",
      },
    ],
    numerology: buildNumerology(
      16,
      "La estructura que se prueba",
      "El dieciséis reduce a siete: la crisis obliga a revisar, a estudiar y a reconstruir desde una comprensión más profunda.",
    ),
    astrology: {
      planet: "Marte",
      element: "Fuego",
      description:
        "Marte aporta impulso, corte y confrontación. La Torre canaliza esa energía en una ruptura que despeja el terreno.",
    },
    esoteric: [
      {
        label: "Letra hebrea",
        value: "Pe (פ)",
        description:
          "Pe significa boca: la palabra que irrumpe, revela y transforma. También el golpe que abre.",
      },
      {
        label: "Tradición marsellesa",
        value: "La Maison Dieu · La Torre",
        description:
          "En el Marsella a veces se llama 'La Maison Dieu' (Casa de Dios). El rayo cae sobre lo que el hombre llamó sagrado pero no lo era.",
      },
    ],
    spiritualPlane:
      "En el plano espiritual, la carta invita a derribar las imágenes falsas de ti y a confiar en lo que permanece cuando cae la máscara.",
    mentalPlane:
      "En el plano mental, pide revisar las creencias que sostenían una seguridad aparente. La crisis también es una oportunidad de lucidez.",
    materialPlane:
      "En lo material, puede indicar cambios bruscos, pérdidas, mudanzas o conflictos que obligan a reorganizar la vida.",
    uprightMeaning:
      "Una verdad irrumpe y lo que parecía estable se tambalea. La carta favorece la liberación de estructuras falsas, aunque el proceso sea incómodo. Después del derrumbe hay espacio para reconstruir mejor.",
    reversedMeaning:
      "Puede indicar resistencia al cambio, una crisis evitada o un derrumbe interno que aún no se ha expresado. También habla de miedo a perder el control. No retengas lo que ya está cayendo.",
    loveMeaning:
      "Una revelación sacude la relación. Puede ser una crisis, una verdad que sale a la luz o la caída de una idealización. La honestidad es el único camino.",
    workMeaning:
      "Cambios súbitos, reestructuraciones o un proyecto que se cae. Aprovecha para revisar los cimientos y no solo la fachada.",
    healthMeaning:
      "El estrés puede manifestarse de forma repentina. La carta pide atender las señales y no postergar el cuidado.",
    personalDevelopment:
      "Suelta la necesidad de tener siempre el control. La vulnerabilidad también puede ser una puerta.",
    advice:
      "Identifica una estructura de tu vida que ya no se sostiene y pregúntate qué necesitas conservar de verdad.",
    colorKeys: ["vermilion", "gold", "charcoal"],
  },
  17: {
    centralConcept: "La esperanza que mana después de la noche más oscura",
    generalMeaning:
      "La Estrella (L'Étoile) muestra a una mujer desnuda arrodillada junto a un estanque, vertiendo agua de dos jarras: una sobre la tierra, otra en el agua. Ocho estrellas brillan sobre ella (una grande, siete pequeñas). Un pájaro en una rama observa. Es la carta de la sanación, la inspiración y la fe tranquila tras la catástrofe de La Torre.",
    message:
      "La esperanza no es una promesa de que todo será fácil, sino la confianza de que el agua volverá a la tierra.",
    keywords: ["Esperanza", "Sanación", "Inspiración", "Futuro", "Confianza", "Renovación"],
    symbolism: [
      {
        title: "Las dos jarras y el agua que fluye",
        description:
          "Dar y recibir, tierra y agua, consciente e inconsciente. La sanación circula: no se estanca.",
      },
      {
        title: "Ocho estrellas (una polar, siete menores)",
        description:
          "La guía principal y las luces secundarias. La esperanza tiene jerarquía: una dirección clara y muchos pasos.",
      },
      {
        title: "La desnudez y la rodilla en tierra",
        description:
          "Sin máscaras, en contacto directo con la vida. La vulnerabilidad es la forma de la confianza.",
      },
      {
        title: "El pájaro (ibis / ave del conocimiento)",
        description:
          "El testigo que no interviene pero valida. La naturaleza acompaña el proceso.",
      },
    ],
    numerology: buildNumerology(
      17,
      "La esperanza que renueva",
      "El diecisiete reduce a ocho: la confianza se convierte en una fuerza capaz de reorganizar la vida.",
    ),
    astrology: {
      sign: "Acuario",
      element: "Aire",
      description:
        "Acuario aporta visión de futuro, comunidad y deseo de libertad. La Estrella añade la confianza necesaria para sostener esa visión.",
    },
    esoteric: [
      {
        label: "Letra hebrea",
        value: "Tsadi (צ)",
        description:
          "Tsadi significa anzuelo: la capacidad de atraer hacia ti lo que necesitas para continuar.",
      },
      {
        label: "Tradición marsellesa",
        value: "L'Étoile · La Estrella",
        description:
          "En el Marsella, a veces la mujer tiene una jarra en cada mano y las estrellas forman una constelación reconocible. La esperanza es astronómica: se orienta por el cielo.",
      },
    ],
    spiritualPlane:
      "En el plano espiritual, la carta invita a confiar en el proceso y a recuperar la fe en lo que todavía no se ve.",
    mentalPlane:
      "En el plano mental, pide esperanza activa: imaginar posibilidades y darles un cauce concreto.",
    materialPlane:
      "En lo material, favorece la sanación, los proyectos inspirados y la llegada de ayuda después de una etapa de sequía.",
    uprightMeaning:
      "Un período de esperanza y renovación. La carta favorece la sanación, la inspiración y la confianza en el futuro. Es momento de mirar hacia adelante sin olvidar lo aprendido.",
    reversedMeaning:
      "Puede indicar desilusión, desconexión de la propia inspiración o miedo a esperar algo bueno. También habla de una esperanza que se apoya en ilusiones poco realistas. Vuelve a lo pequeño y a lo concreto.",
    loveMeaning:
      "Un vínculo que se sana o una nueva confianza después de una decepción. La carta favorece la ternura y la honestidad emocional.",
    workMeaning:
      "Inspiración, nuevos horizontes y proyectos que ilusionan. Mantén los pies en la tierra y da pasos sostenibles.",
    healthMeaning:
      "Favorable para la recuperación y el bienestar emocional. La calma y la confianza acompañan el proceso.",
    personalDevelopment:
      "Recupera la confianza en ti sin exigirte certezas absolutas. La esperanza se practica.",
    advice:
      "Escribe una posibilidad que te ilusione y da hoy un paso pequeño hacia ella. La esperanza necesita un cauce.",
    colorKeys: ["sage", "ivory", "gold"],
  },
  18: {
    centralConcept: "El camino que se recorre con la luz reflejada, no directa",
    generalMeaning:
      "La Luna (La Lune) muestra un rostro en la luna creciente, gotas que caen como lágrimas/rocío, un perro y un lobo ladrando a la luna, un cangrejo saliendo del agua, y un sendero que se pierde entre dos torres. Es la carta de la intuición, los sueños, los miedos y la ambigüedad. No hay claridad solar: solo la luz prestada que deforma y revela a la vez.",
    message:
      "No confundas la niebla con el abismo. Avanza despacio, verifica lo que puedes y confía en lo que tu cuerpo sabe antes que tu mente.",
    keywords: ["Intuición", "Sueños", "Miedo", "Ambigüedad", "Inconsciente", "Ciclos"],
    symbolism: [
      {
        title: "El rostro en la luna y las gotas",
        description:
          "La luz reflejada muestra solo una parte. Las gotas: la influencia lunar sobre los fluidos (mareas, emociones, ciclos).",
      },
      {
        title: "El perro y el lobo",
        description:
          "Lo domesticado y lo salvaje en ti. Ambos ladran a lo que no entienden. La carta pide integrar ambos, no elegir uno.",
      },
      {
        title: "El cangrejo saliendo del agua",
        description:
          "Lo profundo emerge. El cangrejo camina de lado: el avance no es lineal en la noche.",
      },
      {
        title: "Las dos torres y el sendero",
        description:
          "Los límites de lo conocido. El camino se pierde: no hay mapa para esta travesía, solo brújula interior.",
      },
    ],
    numerology: buildNumerology(
      18,
      "El umbral de la intuición",
      "El dieciocho reduce a nueve: un ciclo emocional se completa y pide ser integrado antes de dar el siguiente paso.",
    ),
    astrology: {
      sign: "Piscis",
      element: "Agua",
      description:
        "Piscis aporta sensibilidad, imaginación y permeabilidad. La Luna muestra su lado luminoso y su tendencia a la confusión.",
    },
    esoteric: [
      {
        label: "Letra hebrea",
        value: "Qof (ק)",
        description:
          "Qof significa aguja de la nuca: la parte del cuerpo que no vemos y que también necesita ser atendida.",
      },
      {
        label: "Tradición marsellesa",
        value: "La Lune · La Luna",
        description:
          "En el Marsella, la luna siempre es creciente (nunca llena). El rostro a veces tiene expresión serena, a veces melancólica. La luz nunca es total.",
      },
    ],
    spiritualPlane:
      "En el plano espiritual, la carta invita a escuchar los sueños y las imágenes internas sin convertirlas automáticamente en certezas.",
    mentalPlane:
      "En el plano mental, pide verificar supuestos y no tomar decisiones importantes en medio de la confusión.",
    materialPlane:
      "En lo material, puede indicar información incompleta, malentendidos o situaciones que necesitan más tiempo para aclararse.",
    uprightMeaning:
      "Una etapa de intuición y ambigüedad. La carta favorece la escucha interior, la creatividad y el trabajo con los sueños. No es momento de exigencias absolutas; sí de observar y verificar.",
    reversedMeaning:
      "Puede indicar miedo, confusión o una ilusión que se deshace. También habla de intuición que se confunde con ansiedad. Contrasta tus percepciones con datos concretos y con personas de confianza.",
    loveMeaning:
      "Atracción intensa pero poco clara. Puede haber secretos, idealización o miedo a mostrar lo que se siente. La transparencia es necesaria.",
    workMeaning:
      "Información incompleta, cambios de rumbo o un ambiente confuso. No firmes ni prometas sin verificar los detalles.",
    healthMeaning:
      "El descanso y la salud emocional son claves. La ansiedad puede distorsionar la percepción; busca rutinas que te anclen.",
    personalDevelopment:
      "Aprende a convivir con la incertidumbre sin abandonar el discernimiento. La intuición se afina con silencio y contraste.",
    advice:
      "Antes de decidir, escribe los hechos comprobables y sepáralos de lo que temes o imaginas. Pide una segunda mirada.",
    colorKeys: ["indigo", "ivory", "charcoal"],
  },
  19: {
    centralConcept: "La claridad plena que permite ver y celebrar la vida",
    generalMeaning:
      "El Sol (Le Soleil) irradia gotas rectas y onduladas (calor y luz). Dos niños desnudos juegan o se abrazan junto a un muro bajo girasoles. No hay sombras. Es la carta de la vitalidad, la verdad evidente, el éxito y la alegría sin culpa. Después de la noche de La Luna, amanece.",
    message:
      "Permítete brillar sin pedir disculpas. La claridad también es una forma de generosidad.",
    keywords: ["Claridad", "Alegría", "Vitalidad", "Éxito", "Verdad", "Plenitud"],
    symbolism: [
      {
        title: "El sol con gotas rectas y onduladas",
        description:
          "Luz y calor, espíritu y materia, lo directo y lo sutil. La totalidad del espectro vital.",
      },
      {
        title: "Los dos niños y el muro bajo",
        description:
          "La inocencia y la unión sin barreras altas. El muro protege pero no aísla: delimita el jardín.",
      },
      {
        title: "Los girasoles",
        description:
          "Las flores que buscan la luz. Nosotros también crecemos hacia aquello que nos hace bien.",
      },
      {
        title: "La ausencia de nubes y sombras",
        description:
          "La claridad total. No significa que no haya problemas: significa que se ven con luz nítida.",
      },
    ],
    numerology: buildNumerology(
      19,
      "La luz que se comparte",
      "El diecinueve reduce a diez y luego a uno: la plenitud vuelve al principio, pero con la experiencia acumulada.",
    ),
    astrology: {
      planet: "Sol",
      element: "Fuego",
      description:
        "El Sol rige la identidad, la vitalidad y la expresión. La carta invita a reconocer tu centro y a mostrarlo con confianza.",
    },
    esoteric: [
      {
        label: "Letra hebrea",
        value: "Resh (ר)",
        description:
          "Resh significa cabeza: la conciencia que se eleva y ocupa su lugar en el mundo.",
      },
      {
        label: "Tradición marsellesa",
        value: "Le Soleil · El Sol",
        description:
          "En el Marsella, a veces los niños son un niño y una niña, a veces dos gemelos. La dualidad resuelta en juego. El muro sugiere un espacio sagrado.",
      },
    ],
    spiritualPlane:
      "En el plano espiritual, la carta invita a reconocer tu luz sin compararla con la de otros. La claridad también es una responsabilidad.",
    mentalPlane:
      "En el plano mental, favorece la lucidez, la confianza y la capacidad de ver las cosas como son.",
    materialPlane:
      "En lo material, favorece el éxito, el reconocimiento, la salud y los proyectos que salen a la luz.",
    uprightMeaning:
      "Claridad, alegría y éxito. La carta indica que una situación se ilumina y que puedes mostrarte con confianza. Es un momento de cosecha y celebración.",
    reversedMeaning:
      "Puede indicar una alegría apagada, exceso de optimismo o miedo a brillar. También habla de una verdad que se oculta. No confundas la luz con la obligación de estar siempre bien.",
    loveMeaning:
      "Amor luminoso, alegre y sincero. Favorece la expresión de los sentimientos y los vínculos que celebran la vida.",
    workMeaning:
      "Reconocimiento, éxito y proyectos que avanzan con claridad. Aprovecha para mostrar tu trabajo y asumir mayor visibilidad.",
    healthMeaning:
      "Vitalidad y recuperación. La luz, el movimiento y el contacto con la naturaleza favorecen el bienestar.",
    personalDevelopment:
      "Permítete ocupar tu lugar y disfrutar de lo logrado. La autoestima también se cultiva con celebración.",
    advice:
      "Comparte algo que hayas logrado y agradécelo en voz alta. La alegría también se riega.",
    colorKeys: ["gold", "vermilion", "sage"],
  },
  20: {
    centralConcept: "El llamado que despierta a la responsabilidad y al renacimiento",
    generalMeaning:
      "El Juicio (Le Jugement) muestra a un ángel tocando la trompeta, y tres figuras (hombre, mujer, niño) surgiendo de tumbas con los brazos extendidos. No es un tribunal punitivo: es una convocatoria. La vida pide cuentas y ofrece una nueva oportunidad. El océano al fondo sugiere que el pasado se disuelve en algo mayor.",
    message:
      "Hay llamadas que no se pueden ignorar. Escucha lo que la vida te está pidiendo y responde con honestidad.",
    keywords: ["Despertar", "Llamado", "Renacimiento", "Revisión", "Perdón", "Responsabilidad"],
    symbolism: [
      {
        title: "La trompeta y el ángel",
        description:
          "El sonido que convoca no es amenaza: es verdad que irrumpe. El ángel no juzga: anuncia.",
      },
      {
        title: "Las tres figuras saliendo de las tumbas",
        description:
          "Hombre, mujer, niño: lo adulto, lo receptivo, lo inocente en ti. Todas las partes despiertan.",
      },
      {
        title: "Los brazos extendidos hacia arriba",
        description:
          "La respuesta al llamado. No se defienden: se ofrecen. La rendición consciente es la que libera.",
      },
      {
        title: "El océano y las montañas lejanas",
        description:
          "El pasado se vuelve mar. La geografía cambia: lo que era sólido se disuelve en agua.",
      },
    ],
    numerology: buildNumerology(
      20,
      "El despertar de la conciencia",
      "El veinte reduce a dos: la revisión abre una nueva relación con uno mismo y con los demás.",
    ),
    astrology: {
      planet: "Plutón",
      element: "Fuego",
      description:
        "Plutón representa la transformación profunda y el poder de regeneración. La carta añade el llamado a renacer con conciencia.",
    },
    esoteric: [
      {
        label: "Letra hebrea",
        value: "Shin (ש)",
        description:
          "Shin significa diente: lo que corta, muerde y transforma. También evoca el fuego sagrado.",
      },
      {
        label: "Tradición marsellesa",
        value: "Le Jugement · El Juicio",
        description:
          "En el Marsella, a veces el ángel tiene los pies sobre nubes y la trompeta lleva una bandera con cruz. El llamado es espiritual, no legal.",
      },
    ],
    spiritualPlane:
      "En el plano espiritual, la carta invita a escuchar el llamado de tu propósito y a responder sin postergarlo.",
    mentalPlane:
      "En el plano mental, pide revisar el pasado sin quedarte atrapado en la culpa. Comprender es distinto de castigarse.",
    materialPlane:
      "En lo material, puede indicar decisiones que cambian el rumbo, reconciliaciones o el cierre de una etapa importante.",
    uprightMeaning:
      "Un despertar y una llamada a la renovación. La carta favorece la revisión honesta, el perdón y las decisiones que cambian el rumbo. Es momento de responder a lo que ya no puedes ignorar.",
    reversedMeaning:
      "Puede indicar autoexigencia, culpa o miedo a escuchar el llamado. También habla de postergar una decisión que ya sabes que necesitas tomar. Suelta la sentencia y vuelve a la responsabilidad.",
    loveMeaning:
      "Una relación puede renacer o pasar a una etapa más consciente. El perdón y la honestidad son claves.",
    workMeaning:
      "Un proyecto o una vocación pide una decisión importante. Escucha lo que te entusiasma y evalúa las consecuencias.",
    healthMeaning:
      "La renovación de hábitos y la reconciliación con el cuerpo son favorables. No te castigues por el pasado.",
    personalDevelopment:
      "Revisa tu historia sin reducirte a ella. La conciencia te permite elegir de nuevo.",
    advice:
      "Escribe una decisión que has estado postergando y el primer paso que depende solo de ti. Después, dálo.",
    colorKeys: ["gold", "ivory", "rose"],
  },
  21: {
    centralConcept: "La obra completada que integra todo el recorrido",
    generalMeaning:
      "El Mundo (Le Monde) muestra a una mujer desnuda danzando dentro de una guirnalda ovalada (la mandorla), sostenida por las cuatro bestias del tetramorfos (ángel, águila, león, toro) en las esquinas. Tiene una vara en cada mano. Es la culminación: los cuatro elementos integrados, el ciclo cerrado, la danza de quien ha recorrido el camino y puede celebrarlo.",
    message:
      "Cierra con gratitud lo que ya está completo. El final de una obra es también la puerta de otra.",
    keywords: ["Culminación", "Integración", "Logro", "Plenitud", "Ciclo", "Maestría"],
    symbolism: [
      {
        title: "La mandorla (guirnalda ovalada) y la danzante",
        description:
          "El espacio sagrado donde todo encaja. La danza: el logro no es estático, se celebra moviéndose.",
      },
      {
        title: "Las cuatro bestias en las esquinas",
        description:
          "Ángel (Aire/Copas), Águila (Agua/Espadas), León (Fuego/Bastos), Toro (Tierra/Oros). Los cuatro mundos unificados.",
      },
      {
        title: "Las dos varas en las manos",
        description:
          "El bastón del principio (El Mago) y el del final. Ahora las sostiene ambas: el dominio completo.",
      },
      {
        title: "La desnudez y la corona de laurel",
        description:
          "Sin disfraz, coronada por la propia obra. La maestría no necesita adornos.",
      },
    ],
    numerology: buildNumerology(
      21,
      "La síntesis",
      "El veintiuno reduce a tres: la culminación se convierte en una nueva creación. El ciclo se cierra y se abre.",
    ),
    astrology: {
      planet: "Saturno",
      element: "Tierra",
      description:
        "Saturno representa el tiempo, los límites y la madurez. La carta muestra el fruto de lo que se construyó con paciencia.",
    },
    esoteric: [
      {
        label: "Letra hebrea",
        value: "Tav (ת)",
        description:
          "Tav significa marca o cruz: el sello final que cierra una obra y la distingue de las demás.",
      },
      {
        label: "Tradición marsellesa",
        value: "Le Monde · El Mundo",
        description:
          "Último arcano numerado. En el Marsella, la figura a veces tiene un pie sobre la guirnalda: trasciende el ciclo que completó.",
      },
    ],
    spiritualPlane:
      "En el plano espiritual, la carta invita a reconocer lo aprendido y a integrarlo en una visión más amplia de ti.",
    mentalPlane:
      "En el plano mental, pide mirar el conjunto sin quedarte en el detalle que falta. La obra ya tiene sentido.",
    materialPlane:
      "En lo material, favorece el reconocimiento, los viajes, los cierres de proyectos y la expansión hacia nuevos horizontes.",
    uprightMeaning:
      "Un ciclo se completa con éxito e integración. La carta favorece la celebración, el reconocimiento y la apertura a una nueva etapa. Has llegado a un punto de madurez.",
    reversedMeaning:
      "Puede indicar un cierre que se resiste, una obra inconclusa o la sensación de que falta algo para sentirse completo. También habla de miedo a empezar de nuevo. Reconoce lo logrado antes de exigirte más.",
    loveMeaning:
      "Un vínculo maduro y completo, o la integración de una experiencia amorosa. Favorece los proyectos compartidos y la armonía.",
    workMeaning:
      "Reconocimiento, cierre exitoso de un proyecto o expansión profesional. Buen momento para mostrar el resultado de tu trabajo.",
    healthMeaning:
      "La integración de hábitos y el bienestar sostenido. Celebra los avances en lugar de mirar solo lo que falta.",
    personalDevelopment:
      "Reconoce tu recorrido y date permiso para disfrutar. La plenitud también se practica.",
    advice:
      "Haz un balance de lo que completaste y celébralo. Después, elige una sola cosa que quieras empezar en el nuevo ciclo.",
    colorKeys: ["gold", "sage", "indigo"],
  },
};

export const marseilleMajors: TarotCard[] = manifest
  .filter((base) => base.category === "major")
  .map((base) => {
    const content = majorsContent[base.number];
    const { colorKeys, ...rest } = content;
    const nameInfo = marseilleMajorNames[base.number];
    return {
      ...rest,
      colors: resolveMarseilleColors(colorKeys),
      id: base.id,
      deckId: "marseille",
      number: base.number,
      name: nameInfo?.name ?? base.name,
      alternateName: nameInfo?.alternateName ?? base.alternateName,
      image: marseilleImageFor(base.number, nameInfo?.slug ?? base.slug),
      category: "major",
      contentStatus: "complete",
    } as TarotCard;
  });