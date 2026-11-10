import type { TarotCard } from "@/types/tarot";
import manifest from "./cards.json";
import { buildNumerology, imageFor, resolveColors } from "./shared";

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
  1: {
    centralConcept: "La voluntad que se convierte en acción",
    generalMeaning:
      "El Mago representa el momento en que la intención encuentra sus herramientas. Habla de iniciativa, habilidad y de la capacidad de reunir los recursos necesarios para dar forma a una idea. En clave egipcia se vincula con Thot, la palabra y la fuerza mágica que ordena la realidad.",
    message:
      "No esperes a tenerlo todo: lo que ya sabes, si lo pones en movimiento, es suficiente para comenzar.",
    keywords: ["Voluntad", "Iniciativa", "Habilidad", "Palabra", "Manifestación"],
    symbolism: [
      {
        title: "La figura oficiante",
        description:
          "El gesto de quien oficia un rito recuerda que toda creación comienza con una decisión consciente.",
      },
      {
        title: "Los cuatro recursos",
        description:
          "Los instrumentos de la tradición aluden a cuatro herramientas internas: voluntad, emoción, pensamiento y materia.",
      },
      {
        title: "El nombre y la palabra",
        description:
          "En la tradición egipcia, nombrar una cosa es reconocer su esencia y adquirir responsabilidad sobre ella.",
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
        label: "Tradición egipcia",
        value: "Thot · Heka",
        description:
          "Thot es el dios de la escritura y la sabiduría; heka, la fuerza mágica que da eficacia al rito.",
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
    colorKeys: ["gold", "lapis", "carnelian"],
    isFeatured: true,
  },
  2: {
    centralConcept: "La sabiduría que se escucha en el silencio",
    generalMeaning:
      "La Sacerdotisa guarda lo que aún no está listo para nombrarse. Su energía es receptiva, intuitiva y profunda; invita a observar antes de actuar. En la iconografía egipcia se relaciona con Isis y el velo que protege los misterios del templo.",
    message:
      "No todas las respuestas llegan por la razón. Haz espacio al silencio y escucha lo que ya sabes sin palabras.",
    keywords: ["Intuición", "Misterio", "Silencio", "Memoria", "Receptividad"],
    symbolism: [
      {
        title: "El velo",
        description:
          "Lo que se oculta no es un engaño: es un conocimiento que necesita un tiempo y una madurez para ser comprendido.",
      },
      {
        title: "Las dos columnas",
        description:
          "Los dos pilares del templo representan la tensión entre opuestos y el umbral que se cruza para acceder a otra mirada.",
      },
      {
        title: "La luna y las aguas",
        description:
          "La luz lunar y las aguas reflejan la vida interior. Su mensaje llega por imágenes, sueños y sensaciones más que por conceptos.",
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
        label: "Tradición egipcia",
        value: "Isis · El velo",
        description:
          "Isis encarna la magia, la protección y el conocimiento iniciático. Su velo recuerda que no todo se revela al mismo tiempo.",
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
    colorKeys: ["lapis", "silver", "black"],
    isFeatured: true,
  },
  3: {
    centralConcept: "La vida que se vuelve forma y abundancia",
    generalMeaning:
      "La Emperatriz habla de fertilidad, creatividad y cuidado. Representa la capacidad de convertir los recursos disponibles en algo que crece y nutre a otros. En clave egipcia se asocia con Hathor y con la abundancia del Nilo, que hace fértil la tierra.",
    message:
      "Nutre lo que quieres ver crecer; la abundancia no se fuerza, se cultiva con presencia y constancia.",
    keywords: ["Abundancia", "Creatividad", "Cuidado", "Fertilidad", "Cuerpo"],
    symbolism: [
      {
        title: "La figura sedente",
        description:
          "Su postura estable sugiere que la creación necesita un lugar donde apoyarse: un cuerpo, un hogar, una rutina.",
      },
      {
        title: "La corona de estrellas",
        description:
          "Las estrellas conectan la fecundidad terrestre con el orden celeste; lo que crece abajo refleja una intención más amplia.",
      },
      {
        title: "La vegetación y el agua",
        description:
          "Los motivos naturales recuerdan que la abundancia es un ciclo: recibir, cuidar, dar y volver a sembrar.",
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
        label: "Tradición egipcia",
        value: "Hathor · La vaca celeste",
        description:
          "Hathor es la diosa del amor, la música y la alegría. Su leche nutre y su música sostiene la armonía del mundo.",
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
    colorKeys: ["emerald", "gold", "papyrus"],
    isFeatured: true,
  },
  4: {
    centralConcept: "El orden que sostiene la vida",
    generalMeaning:
      "El Emperador representa la estructura, la autoridad y la capacidad de poner límites. No habla solo del poder externo, sino del orden interno que permite que algo dure. En la tradición egipcia se vincula con el faraón, Osiris y el principio de Ma'at.",
    message:
      "La libertad sin estructura se dispersa. Construye una base clara y sostén lo que has decidido proteger.",
    keywords: ["Estructura", "Autoridad", "Límites", "Estabilidad", "Responsabilidad"],
    symbolism: [
      {
        title: "El trono",
        description:
          "El asiento del poder recuerda que toda autoridad necesita un lugar firme y una responsabilidad que la justifique.",
      },
      {
        title: "El cetro y el flagelo",
        description:
          "Los atributos reales egipcios unen el impulso que guía y la disciplina que corrige. Gobernar es equilibrar ambas fuerzas.",
      },
      {
        title: "La montaña",
        description:
          "El paisaje estable sugiere una visión de largo plazo: lo que se construye bien sobrevive a los cambios de corto plazo.",
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
        label: "Tradición egipcia",
        value: "Osiris · Ma'at",
        description:
          "Osiris representa el orden que renace; Ma'at, la verdad y la justicia que mantienen el cosmos.",
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
    colorKeys: ["carnelian", "gold", "black"],
  },
  5: {
    centralConcept: "La enseñanza que transmite una tradición",
    generalMeaning:
      "El Hierofante habla de aprendizaje, transmisión y pertenencia. Representa las estructuras de conocimiento que nos preceden y la posibilidad de recibir una enseñanza o de convertirnos en quienes la comparten. En clave egipcia se asocia con el templo y los sacerdotes de Thot.",
    message:
      "Toda tradición es una puerta, no una jaula. Aprende de ella, cuestiónala y encuentra tu propia forma de transmitirla.",
    keywords: ["Enseñanza", "Tradición", "Guía", "Ética", "Pertenencia"],
    symbolism: [
      {
        title: "La tiara",
        description:
          "La triple corona sugiere tres niveles de conocimiento: el que se recibe, el que se comprende y el que se vive.",
      },
      {
        title: "Las llaves",
        description:
          "Las llaves del templo representan el acceso al saber y la responsabilidad de quien decide qué abrir y cuándo.",
      },
      {
        title: "Los discípulos",
        description:
          "Las dos figuras que escuchan recuerdan que el conocimiento se completa en la relación entre maestro y estudiante.",
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
        label: "Tradición egipcia",
        value: "El templo · La palabra",
        description:
          "El templo egipcio era un espacio de transmisión y conservación del conocimiento. La palabra escrita era parte del rito.",
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
    colorKeys: ["gold", "ivory", "violet"],
  },
  6: {
    centralConcept: "La elección que compromete el corazón",
    generalMeaning:
      "Los Enamorados hablan de unión, deseo y elección. No solo de amor de pareja: también de los valores que nos definen cuando debemos decidir entre dos caminos. En la tradición egipcia se la conoce como La Encrucijada, la carta del cruce que exige conciencia.",
    message:
      "Elegir es renunciar a algo. Que tu decisión nazca de tus valores y no solo del miedo a perder.",
    keywords: ["Elección", "Unión", "Deseo", "Valores", "Encuentro"],
    symbolism: [
      {
        title: "Las dos figuras",
        description:
          "El encuentro entre dos personas representa toda relación: la atracción, la diferencia y la posibilidad de complementarse.",
      },
      {
        title: "El mediador",
        description:
          "La figura central sugiere que entre dos polos existe una instancia de conciencia que puede bendecir o confundir la elección.",
      },
      {
        title: "Los dos caminos",
        description:
          "La encrucijada recuerda que elegir un camino implica dejar otro atrás. La libertad se ejerce en la decisión, no en la indecisión indefinida.",
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
        label: "Tradición egipcia",
        value: "La encrucijada",
        description:
          "El cruce de caminos era un lugar de decisión y de encuentro con el destino. Elegir con conciencia era parte del aprendizaje.",
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
    colorKeys: ["carnelian", "gold", "turquoise"],
  },
  7: {
    centralConcept: "El impulso que aprende a dirigirse",
    generalMeaning:
      "El Carro representa el triunfo de la voluntad cuando logra reunir fuerzas diversas bajo una misma dirección. Habla de avance, disciplina y confianza, pero también de la necesidad de controlar el impulso para no perder el rumbo. En clave egipcia se vincula con la barca solar que atraviesa el cielo y el inframundo.",
    message:
      "No basta con tener fuerza: necesitas un destino claro y la disciplina para sostener las riendas.",
    keywords: ["Victoria", "Dirección", "Disciplina", "Viaje", "Confianza"],
    symbolism: [
      {
        title: "El carro solar",
        description:
          "La barca que atraviesa el cielo representa el recorrido de la conciencia a través de la luz y de la sombra.",
      },
      {
        title: "Las dos fuerzas",
        description:
          "Los animales que tiran del carro encarnan impulsos opuestos que deben ser conducidos, no negados.",
      },
      {
        title: "La estrella",
        description:
          "La estrella sobre el carro recuerda que la dirección nace de una visión que trasciende el esfuerzo inmediato.",
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
        label: "Tradición egipcia",
        value: "La barca solar",
        description:
          "La barca de Ra recorre el cielo y el inframundo. Su viaje simboliza el gobierno de las fuerzas vitales a lo largo del ciclo.",
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
    colorKeys: ["gold", "carnelian", "lapis"],
  },
  8: {
    centralConcept: "El equilibrio que exige verdad",
    generalMeaning:
      "La Justicia representa la ley de causa y efecto, la responsabilidad y la búsqueda de equilibrio. No habla solo de tribunales: habla de la honestidad con la que miras tus actos y sus consecuencias. En clave egipcia se asocia con Ma'at, la pluma que pesa el corazón.",
    message:
      "La verdad te libera, aunque al principio incomode. Asume lo que te corresponde y ajusta lo que ya no está en equilibrio.",
    keywords: ["Equilibrio", "Verdad", "Responsabilidad", "Decisión", "Consecuencia"],
    symbolism: [
      {
        title: "La balanza",
        description:
          "La balanza pesa sin castigar. Su función es mostrar la realidad de una situación para que puedas decidir con justicia.",
      },
      {
        title: "La espada",
        description:
          "La espada corta lo que sobra y defiende lo que es justo. Es la claridad que pone fin a la ambigüedad.",
      },
      {
        title: "La pluma de Ma'at",
        description:
          "La pluma egipcia representa la verdad y el orden cósmico. Su ligereza recuerda que la honestidad no necesita peso.",
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
        label: "Tradición egipcia",
        value: "Ma'at",
        description:
          "Ma'at es la verdad, el orden y la justicia que sostienen el cosmos. En el juicio del alma, el corazón se pesa contra su pluma.",
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
    colorKeys: ["gold", "ivory", "lapis"],
  },
  9: {
    centralConcept: "La luz que se encuentra al caminar solo",
    generalMeaning:
      "El Ermitaño representa la búsqueda interior, la soledad elegida y la sabiduría que madura en silencio. No es una carta de aislamiento permanente, sino de retiro necesario para escuchar la propia voz. En la tradición egipcia se la vincula con la lámpara velada y el iniciado que atraviesa la noche.",
    message:
      "A veces hay que alejarse del ruido para encontrar la luz que se lleva dentro. La soledad puede ser un método, no un destino.",
    keywords: ["Introspección", "Soledad", "Sabiduría", "Paciencia", "Guía"],
    symbolism: [
      {
        title: "La lámpara",
        description:
          "La luz no ilumina todo el camino, solo el siguiente paso. La sabiduría se construye en la experiencia, no en la certeza total.",
      },
      {
        title: "El bastón",
        description:
          "El apoyo simboliza la experiencia acumulada y la disciplina que sostiene el caminar.",
      },
      {
        title: "La cumbre",
        description:
          "La altura sugiere perspectiva: ver el conjunto exige distancia y, a veces, renunciar a la compañía inmediata.",
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
        label: "Tradición egipcia",
        value: "La lámpara velada",
        description:
          "El iniciado camina con una luz que no debe exhibir. La discreción protege el proceso de maduración.",
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
    colorKeys: ["black", "gold", "silver"],
  },
  10: {
    centralConcept: "El ciclo que devuelve cada causa a su efecto",
    generalMeaning:
      "La Rueda de la Fortuna representa el movimiento de los ciclos, los cambios de suerte y la ley de causa y efecto. Recuerda que nada permanece igual y que la posición desde la que miras también cambiará. En clave egipcia se asocia con los ciclos del Nilo y la rueda del devenir.",
    message:
      "No te aferres a la cima ni te identifiques con el fondo. Todo se mueve; lo importante es cómo sostienes tu centro mientras gira.",
    keywords: ["Ciclos", "Cambio", "Fortuna", "Movimiento", "Apertura"],
    symbolism: [
      {
        title: "La rueda",
        description:
          "La rueda recuerda que las circunstancias cambian y que la posición de privilegio o de dificultad es temporal.",
      },
      {
        title: "Las cuatro estaciones",
        description:
          "Las figuras que rodean la rueda representan los ciclos de la naturaleza y la necesidad de adaptarse a cada estación.",
      },
      {
        title: "La serpiente",
        description:
          "La serpiente que se muerde la cola simboliza el eterno retorno y la continuidad de la vida más allá de una sola vuelta.",
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
        label: "Tradición egipcia",
        value: "El ciclo del Nilo",
        description:
          "La crecida y el descenso del río marcaban el tiempo de la siembra y la cosecha. La vida depende de esos ritmos.",
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
    colorKeys: ["gold", "lapis", "emerald"],
    isFeatured: true,
  },
  11: {
    centralConcept: "La fuerza que se ejerce con ternura",
    generalMeaning:
      "La Fuerza representa el coraje sereno, la paciencia y la capacidad de integrar los impulsos sin negarlos. No es la violencia del dominio, sino la potencia de quien sabe sostener. En la tradición egipcia se vincula con Sekhmet, la diosa leona que protege y también puede arrasar.",
    message:
      "La verdadera fuerza no consiste en vencer al otro, sino en acompañar tu propio impulso hasta que deje de ser una amenaza.",
    keywords: ["Coraje", "Paciencia", "Dominio de sí", "Deseo", "Compasión"],
    symbolism: [
      {
        title: "La figura y el león",
        description:
          "La relación entre la persona y el animal simboliza el diálogo con la propia fuerza instintiva. No se trata de matarla, sino de escucharla.",
      },
      {
        title: "El lazo infinito",
        description:
          "El ocho acostado recuerda que la energía circula: lo que se reprime vuelve, lo que se integra se transforma.",
      },
      {
        title: "La guirnalda",
        description:
          "La corona vegetal sugiere que la fuerza sostenida con cuidado produce vida y no destrucción.",
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
        label: "Tradición egipcia",
        value: "Sekhmet",
        description:
          "Sekhmet es la leona protectora, diosa de la fuerza y la sanación. Su poder recuerda que la ferocidad también puede cuidar.",
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
    colorKeys: ["carnelian", "gold", "emerald"],
  },
  12: {
    centralConcept: "La pausa que cambia la mirada",
    generalMeaning:
      "El Colgado representa la suspensión, el sacrificio y la inversión de perspectiva. Hay momentos en que avanzar exige detenerse y mirar el mundo desde otro ángulo. En clave egipcia se vincula con el iniciado que se ofrece a una transformación.",
    message:
      "No toda pausa es un retroceso. A veces hay que soltar el control para ver lo que la prisa ocultaba.",
    keywords: ["Pausa", "Entrega", "Perspectiva", "Sacrificio", "Revelación"],
    symbolism: [
      {
        title: "La figura invertida",
        description:
          "La posición invertida no es un castigo: es una forma de ver desde un lugar al que la postura habitual no llega.",
      },
      {
        title: "La cuerda y el árbol",
        description:
          "El vínculo con el árbol sugiere que la entrega tiene raíces. Se suelta una posición para recibir otra.",
      },
      {
        title: "El halo",
        description:
          "La luz alrededor de la cabeza indica que la comprensión surge en la quietud, no en la agitación.",
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
        label: "Tradición egipcia",
        value: "La ofrenda",
        description:
          "La entrega ritual no es pérdida: es el gesto que abre un canal entre quien ofrece y aquello que recibe.",
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
    colorKeys: ["lapis", "silver", "gold"],
  },
  13: {
    centralConcept: "La transformación que abre paso a otra vida",
    generalMeaning:
      "La Muerte no anuncia un final literal, sino una transformación profunda. Habla de cerrar ciclos, soltar lo que ya no puede sostenerse y permitir que algo nuevo nazca. En la tradición egipcia se la conoce como La Inmortalidad y se vincula con Osiris y el ciclo de muerte y resurrección.",
    message:
      "Lo que termina deja espacio. No le temas al final: pregúntate qué está naciendo debajo.",
    keywords: ["Transformación", "Final", "Renacimiento", "Soltar", "Ciclo"],
    symbolism: [
      {
        title: "La figura segadora",
        description:
          "La guadaña corta lo que ya maduró. No es crueldad: es la ley del ciclo que permite que la vida continúe.",
      },
      {
        title: "La bandera",
        description:
          "La bandera blanca con la flor recuerda que en todo final hay una promesa de renovación.",
      },
      {
        title: "El sol que nace",
        description:
          "El sol entre las torres sugiere que la transformación no conduce a la nada, sino a una nueva forma de luz.",
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
        label: "Tradición egipcia",
        value: "Osiris · La inmortalidad",
        description:
          "Osiris muere, es restaurado y se convierte en señor del más allá. Su mito enseña que la vida atraviesa la muerte.",
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
    colorKeys: ["black", "ivory", "emerald"],
  },
  14: {
    centralConcept: "El arte de mezclar sin perder el centro",
    generalMeaning:
      "La Templanza representa la medida justa, la integración y la sanación. Habla de combinar elementos distintos sin que uno anule al otro, de encontrar el punto en que la emoción y la razón colaboran. En clave egipcia se vincula con las dos urnas y el flujo del Nilo.",
    message:
      "La armonía no es ausencia de tensión: es la forma de mantenerte en el centro mientras las fuerzas se mueven.",
    keywords: ["Equilibrio", "Medida", "Sanación", "Integración", "Paciencia"],
    symbolism: [
      {
        title: "Las dos urnas",
        description:
          "El agua que pasa de una vasija a otra representa la circulación entre polos: nada se retiene para siempre.",
      },
      {
        title: "El camino",
        description:
          "El sendero que se abre entre las aguas sugiere que el equilibrio es un tránsito, no un lugar fijo.",
      },
      {
        title: "El triángulo",
        description:
          "La forma triangular recuerda la síntesis: dos fuerzas encuentran una tercera posibilidad.",
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
        label: "Tradición egipcia",
        value: "La doble corriente",
        description:
          "La unión de las aguas del Alto y el Bajo Egipto simboliza la integración de dos mundos en un mismo cauce.",
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
    colorKeys: ["turquoise", "gold", "ivory"],
  },
  15: {
    centralConcept: "La sombra que pide ser reconocida",
    generalMeaning:
      "El Diablo representa los apegos, el deseo y la sombra que no queremos mirar. No es una carta de maldad, sino de ataduras que se vuelven invisibles cuando las negamos. En clave egipcia se vincula con Set y las fuerzas que desordenan para que algo más profundo pueda ser integrado.",
    message:
      "Lo que niegas te gobierna. Mira tu deseo de frente y pregúntate si lo eliges o si él te elige a ti.",
    keywords: ["Deseo", "Apego", "Sombra", "Poder", "Tentación"],
    symbolism: [
      {
        title: "La figura con cuernos",
        description:
          "La imagen de la sombra no es un enemigo externo: es una parte de la psique que ha quedado fuera de la luz.",
      },
      {
        title: "Las cadenas",
        description:
          "Las cadenas suelen estar flojas. El mensaje es que muchas ataduras se sostienen porque no nos atrevemos a soltarlas.",
      },
      {
        title: "La antorcha",
        description:
          "El fuego del deseo puede iluminar o consumir. La diferencia está en la conciencia con que se sostiene.",
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
        label: "Tradición egipcia",
        value: "Set · La prueba",
        description:
          "Set representa la fuerza que desordena y pone a prueba. No se elimina: se reconoce y se canaliza.",
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
    colorKeys: ["carnelian", "black", "violet"],
  },
  16: {
    centralConcept: "La verdad que derriba lo que no sostiene",
    generalMeaning:
      "La Torre representa el derrumbe de una estructura falsa y la irrupción de una verdad que no se puede ignorar. Es una carta incómoda pero liberadora: lo que cae deja al descubierto lo que sí era real. En la tradición egipcia se la vincula con el obelisco quebrado y la fragilidad de lo construido sobre el orgullo.",
    message:
      "Lo que se rompe no siempre se pierde. A veces cae una cárcel que llamabas seguridad.",
    keywords: ["Ruptura", "Revelación", "Cambio súbito", "Liberación", "Verdad"],
    symbolism: [
      {
        title: "La torre",
        description:
          "La construcción elevada representa una estructura de creencias o de poder que se sostenía sobre una base frágil.",
      },
      {
        title: "El rayo",
        description:
          "La descarga es la irrupción de una verdad repentina que interrumpe la rutina y obliga a reorganizarlo todo.",
      },
      {
        title: "Las coronas que caen",
        description:
          "Los símbolos de estatus que se precipitan recuerdan que ningún cargo ni imagen nos hace invulnerables.",
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
        label: "Tradición egipcia",
        value: "El obelisco quebrado",
        description:
          "El obelisco herido recuerda que incluso los símbolos de permanencia pueden fracturarse. La reconstrucción exige otra base.",
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
    colorKeys: ["carnelian", "gold", "black"],
  },
  17: {
    centralConcept: "La esperanza que se derrama después de la tormenta",
    generalMeaning:
      "La Estrella representa la esperanza, la inspiración y la posibilidad de sanar después de una etapa difícil. Su energía es serena, generosa y confiada. En la tradición egipcia se la asocia con Sopdet, la estrella Sirio, cuya aparición anunciaba la crecida del Nilo.",
    message:
      "La esperanza no es una promesa de que todo será fácil, sino la confianza de que el agua volverá a la tierra.",
    keywords: ["Esperanza", "Sanación", "Inspiración", "Futuro", "Confianza"],
    symbolism: [
      {
        title: "La estrella",
        description:
          "La luz que orienta en la noche recuerda que la esperanza no elimina la oscuridad, pero ofrece una dirección.",
      },
      {
        title: "Las vasijas",
        description:
          "El agua que se derrama sobre la tierra y el agua simboliza la sanación que se comparte y vuelve a la vida.",
      },
      {
        title: "El ave",
        description:
          "El pájaro que sobrevuela el paisaje representa la perspectiva que se recupera después de una crisis.",
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
        label: "Tradición egipcia",
        value: "Sopdet · Sirio",
        description:
          "La aparición de Sirio anunciaba la crecida del Nilo. La estrella era una señal de renovación y abundancia.",
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
    colorKeys: ["turquoise", "silver", "gold"],
    isFeatured: true,
  },
  18: {
    centralConcept: "El camino que se recorre con poca luz",
    generalMeaning:
      "La Luna representa la intuición, los sueños, los miedos y la ambigüedad. No es una carta de engaño deliberado, sino de una realidad que aún no se deja ver con claridad. En la tradición egipcia se asocia con Selket y con el viaje nocturno de la conciencia.",
    message:
      "No confundas la niebla con el abismo. Avanza despacio, verifica lo que puedes y confía en lo que tu cuerpo sabe antes que tu mente.",
    keywords: ["Intuición", "Sueños", "Miedo", "Ambigüedad", "Inconsciente"],
    symbolism: [
      {
        title: "La luna",
        description:
          "La luz reflejada muestra solo una parte de la realidad. La carta pide distinguir lo que ves de lo que imaginas.",
      },
      {
        title: "Los dos animales",
        description:
          "Las fuerzas doméstica y salvaje representan impulsos que conviven en ti y que la niebla puede confundir.",
      },
      {
        title: "El camino entre torres",
        description:
          "El sendero que se pierde en la distancia recuerda que avanzar no siempre es ver todo el trayecto.",
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
        label: "Tradición egipcia",
        value: "Selket · La noche",
        description:
          "Selket protege el sueño y acompaña a las almas en la oscuridad. Su presencia recuerda que la noche también cuida.",
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
    colorKeys: ["silver", "lapis", "black"],
  },
  19: {
    centralConcept: "La claridad que permite ver y celebrar",
    generalMeaning:
      "El Sol representa la claridad, la vitalidad y la alegría de estar vivo. Es una de las cartas más luminosas del tarot: habla de éxito, verdad y celebración. En la tradición egipcia se vincula con Ra, el sol que atraviesa el cielo y sostiene la vida.",
    message:
      "Permítete brillar sin pedir disculpas. La claridad también es una forma de generosidad.",
    keywords: ["Claridad", "Alegría", "Vitalidad", "Éxito", "Verdad"],
    symbolism: [
      {
        title: "El sol",
        description:
          "El disco solar ilumina sin elegir a quién. Su luz representa la verdad que se vuelve evidente y la energía que sostiene la vida.",
      },
      {
        title: "La figura radiante",
        description:
          "La persona bajo el sol encarna la alegría de habitar el propio cuerpo y de mostrarse sin máscaras.",
      },
      {
        title: "Los girasoles",
        description:
          "Las flores que buscan la luz recuerdan que también nosotros crecemos hacia aquello que nos hace bien.",
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
        label: "Tradición egipcia",
        value: "Ra",
        description:
          "Ra recorre el cielo en su barca y atraviesa la noche para renacer. Su luz es orden, calor y continuidad.",
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
    colorKeys: ["gold", "carnelian", "emerald"],
    isFeatured: true,
  },
  20: {
    centralConcept: "El llamado que despierta la conciencia",
    generalMeaning:
      "El Juicio representa el despertar, la revisión del camino y la posibilidad de renacer desde una comprensión más amplia. Habla de escuchar un llamado y de responder con responsabilidad. En la tradición egipcia se vincula con la resurrección de Osiris y el libro de Thot.",
    message:
      "Hay llamadas que no se pueden ignorar. Escucha lo que la vida te está pidiendo y responde con honestidad.",
    keywords: ["Despertar", "Llamado", "Renacimiento", "Revisión", "Perdón"],
    symbolism: [
      {
        title: "La trompeta",
        description:
          "El sonido que convoca representa una verdad que irrumpe y convoca a la conciencia a despertar.",
      },
      {
        title: "Los féretros",
        description:
          "Las figuras que se levantan simbolizan partes de ti que estaban dormidas y que ahora piden participación.",
      },
      {
        title: "El libro",
        description:
          "El libro abierto recuerda que la vida se lee y se revisa. También se puede escribir de nuevo.",
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
        label: "Tradición egipcia",
        value: "Osiris · El libro de Thot",
        description:
          "La resurrección de Osiris y el juicio del alma recuerdan que toda conciencia es llamada a rendir cuentas y renacer.",
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
    colorKeys: ["gold", "ivory", "violet"],
  },
  21: {
    centralConcept: "La obra que se completa y se abre a un nuevo ciclo",
    generalMeaning:
      "El Mundo representa la culminación, la integración y la alegría de una obra terminada. Habla de haber atravesado un proceso y de poder mirarlo en conjunto. En la tradición egipcia se la conoce como La Transmutación y se vincula con la corona de los magos y el ciclo completo.",
    message:
      "Cierra con gratitud lo que ya está completo. El final de una obra es también la puerta de otra.",
    keywords: ["Culminación", "Integración", "Logro", "Plenitud", "Ciclo"],
    symbolism: [
      {
        title: "La corona y la elipse",
        description:
          "La forma que rodea la figura representa el ciclo completo: lo que empezó en un punto vuelve a él con más conciencia.",
      },
      {
        title: "Las cuatro esquinas",
        description:
          "Los cuatro elementos reunidos recuerdan que la plenitud integra todas las dimensiones de la vida.",
      },
      {
        title: "La danza",
        description:
          "La figura en movimiento sugiere que el logro no es estático: se celebra participando de la vida.",
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
        label: "Tradición egipcia",
        value: "La corona de los magos",
        description:
          "La corona simboliza el dominio de los cuatro mundos y la integración del conocimiento en una sola conciencia.",
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
    colorKeys: ["gold", "emerald", "lapis"],
    isFeatured: true,
  },
  22: {
    centralConcept: "La libertad que se atreve a comenzar de nuevo",
    generalMeaning:
      "El Loco representa el inicio, la inocencia y el salto hacia lo desconocido. En esta baraja cierra la serie con el número 22, bajo el nombre de El Regreso: no es un final, sino la vuelta al principio con una mirada nueva. En la tradición egipcia se le asocia con el cocodrilo y el viajero que confía en el camino.",
    message:
      "No necesitas tener todas las respuestas para dar el primer paso. La confianza también se construye caminando.",
    keywords: ["Comienzo", "Libertad", "Confianza", "Inocencia", "Riesgo"],
    symbolism: [
      {
        title: "El caminante",
        description:
          "La figura que avanza sin armadura representa la disposición a aprender y a equivocarse como parte del camino.",
      },
      {
        title: "El perro o el cocodrilo",
        description:
          "El animal que acompaña o acecha recuerda que el riesgo forma parte del viaje; la conciencia consiste en no ignorarlo.",
      },
      {
        title: "El precipicio",
        description:
          "El borde del camino no es una amenaza absoluta: es el lugar donde la confianza se pone a prueba.",
      },
    ],
    numerology: buildNumerology(
      22,
      "El retorno a la unidad",
      "El veintidós reduce a cuatro: el final de la serie se apoya en una estructura nueva. Regresar no es repetir; es volver con experiencia.",
    ),
    astrology: {
      planet: "Urano",
      element: "Aire",
      description:
        "Urano representa la liberación, lo inesperado y la ruptura de patrones. La carta añade la chispa del comienzo y la libertad de elegir.",
    },
    esoteric: [
      {
        label: "Letra hebrea",
        value: "Aleph (א)",
        description:
          "Aleph es el aliento, el principio silencioso que contiene todas las letras. El camino empieza antes de saber.",
      },
      {
        label: "Tradición egipcia",
        value: "El cocodrilo",
        description:
          "En algunas versiones egipcias, El Loco se asocia al cocodrilo: una fuerza antigua que puede devorar o enseñar a cruzar el río.",
      },
    ],
    spiritualPlane:
      "En el plano espiritual, la carta invita a confiar en la vida y a dejar de esperar una garantía absoluta para empezar.",
    mentalPlane:
      "En el plano mental, pide curiosidad y apertura. La mente que lo sabe todo no puede aprender.",
    materialPlane:
      "En lo material, favorece los nuevos comienzos, los viajes, los cambios de rumbo y los proyectos que nacen sin un plan perfecto.",
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
    colorKeys: ["turquoise", "gold", "ivory"],
  },
};

export const egyptianMajors: TarotCard[] = manifest
  .filter((base) => base.category === "major")
  .map((base) => {
    const content = majorsContent[base.number];
    const { colorKeys, ...rest } = content;
    return {
      ...rest,
      colors: resolveColors(colorKeys),
      id: base.id,
      deckId: "tarot-egipcio",
      number: base.number,
      name: base.name,
      alternateName: base.alternateName,
      image: imageFor(base.number, base.slug),
      category: "major",
      contentStatus: "complete",
    } as TarotCard;
  });
