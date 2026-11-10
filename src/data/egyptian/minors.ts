import type { CardSeries, TarotCard } from "@/types/tarot";
import manifest from "./cards.json";
import {
  capitalize,
  imageFor,
  lowerFirst,
  numberDescriptions,
  numberTitles,
  reduceNumber,
  seriesInfo,
} from "./shared";

interface MinorSeed {
  n: number;
  essence: string;
  shadow: string;
  general: string;
  message: string;
  keywords: string[];
  love: string;
  work: string;
  health: string;
  personal: string;
  advice: string;
}

const minorSeeds: MinorSeed[] = [
  {
    n: 23,
    essence: "el valor del trabajo constante",
    shadow: "la fatiga que borra el sentido del esfuerzo",
    general:
      "Representa el trabajo que se realiza con constancia y sin necesidad de aplausos. Su enseñanza está en cultivar la propia tierra y confiar en el tiempo de la cosecha.",
    message: "Lo que siembras con paciencia hoy sostendrá tu mañana.",
    keywords: ["Constancia", "Trabajo", "Servicio", "Paciencia"],
    love:
      "El amor se construye con gestos repetidos y presencia cotidiana, más que con grandes promesas.",
    work:
      "Reconoce el valor de tu esfuerzo y organiza el trabajo para que no te consuma. La constancia abre puertas.",
    health:
      "El descanso forma parte del cultivo: el cuerpo no es una máquina de rendimiento.",
    personal:
      "Aprende a medir tu progreso por lo que sostienes, no solo por lo que consigues.",
    advice:
      "Elige una tarea que hayas abandonado y devuélvele veinte minutos diarios durante una semana.",
  },
  {
    n: 24,
    essence: "el cuidado que une los hilos de la vida cotidiana",
    shadow: "la entrega excesiva a los demás que descuida el propio centro",
    general:
      "Habla de la paciencia artesanal, del hogar como espacio de creación y de la capacidad de sostener la vida cotidiana con amor. Cada hilo cuenta, aunque no se vea el dibujo completo.",
    message: "Lo que haces en lo pequeño también está tejiendo tu vida.",
    keywords: ["Cuidado", "Hogar", "Paciencia", "Detalle"],
    love:
      "La intimidad se alimenta de detalles y de tiempo compartido; valora los gestos sencillos.",
    work:
      "El trabajo bien hecho y la organización paciente dan frutos. Evita asumir más de lo que puedes sostener.",
    health:
      "Los rituales de cuidado y el orden en el entorno favorecen la calma.",
    personal:
      "Reconoce el valor de lo que sostienes cada día, aunque no siempre se vea.",
    advice:
      "Elige un espacio de tu casa y dedícale diez minutos de cuidado consciente.",
  },
  {
    n: 25,
    essence: "el coraje de navegar hacia lo desconocido",
    shadow: "la huida que se disfraza de aventura",
    general:
      "Representa el viaje, la iniciativa y la confianza en la propia capacidad de navegar. Habla de dejar un puerto seguro para descubrir algo nuevo, con los riesgos que eso implica.",
    message:
      "El mapa no sustituye al viaje. Zarpa con lo que sabes y ajusta el rumbo en el camino.",
    keywords: ["Viaje", "Coraje", "Exploración", "Riesgo"],
    love:
      "Una relación puede abrir horizontes o poner a prueba la confianza. Habla de lo que buscas antes de partir.",
    work:
      "Nuevos horizontes, traslados o proyectos que exigen iniciativa. Prepara lo esencial y no esperes la certeza total.",
    health:
      "El movimiento te sienta bien, pero necesitas rutinas que te anclen.",
    personal:
      "Atrévete a salir de lo conocido sin perder el contacto con tus raíces.",
    advice:
      "Define qué puerto quieres dejar y qué necesitas llevar contigo. Da un paso real hacia ese viaje.",
  },
  {
    n: 26,
    essence: "el talento que sorprende y abre posibilidades",
    shadow: "la necesidad de admiración que vacía el logro",
    general:
      "Habla de un acontecimiento inesperado, de un talento que se revela o de una oportunidad que llega sin aviso. Su energía es brillante y algo teatral; pide ser recibida sin perder la humildad.",
    message:
      "Lo extraordinario también necesita raíces. Disfruta el asombro sin convertirlo en identidad.",
    keywords: ["Talento", "Sorpresa", "Oportunidad", "Admiración"],
    love:
      "Puede aparecer un encuentro que deslumbra. Distingue la atracción del enamoramiento idealizado.",
    work:
      "Un logro o una oportunidad inesperada puede dar visibilidad. Muéstralo, pero cuida los detalles.",
    health: "La energía es alta; evita los excesos y el ritmo acelerado.",
    personal:
      "Reconoce tu talento sin depender de la mirada ajena para validarlo.",
    advice:
      "Comparte un talento que sueles esconder y observa qué sientes cuando te ven.",
  },
  {
    n: 27,
    essence: "la irrupción de lo que no estaba en el plan",
    shadow: "la inestabilidad que impide construir",
    general:
      "Representa el cambio súbito, la oportunidad que aparece fuera de guion y la necesidad de adaptarse. No es buena ni mala por sí misma: su valor depende de cómo la recibes.",
    message: "La vida también habla cuando interrumpe. Escucha qué te está mostrando.",
    keywords: ["Cambio", "Imprevisto", "Adaptación", "Apertura"],
    love:
      "Un encuentro o una noticia puede alterar el vínculo. Evita reaccionar desde el primer impulso.",
    work:
      "Surgirán cambios o imprevistos. Mantén un margen de flexibilidad y revisa prioridades.",
    health: "El cuerpo puede resentir la falta de rutina. Crea anclajes sencillos.",
    personal: "Entrena la capacidad de responder en lugar de solo reaccionar.",
    advice:
      "Ante el próximo imprevisto, respira antes de decidir y pregunta qué oportunidad contiene.",
  },
  {
    n: 28,
    essence: "el arte de sostener la pregunta sin cerrarla demasiado pronto",
    shadow: "la duda que paraliza y alimenta la ansiedad",
    general:
      "Habla de la falta de claridad, de los tiempos de espera y de la tentación de llenar el vacío con respuestas apresuradas. Su enseñanza es aprender a convivir con lo que aún no se sabe.",
    message: "No toda pregunta necesita respuesta hoy. A veces el camino se aclara al caminar.",
    keywords: ["Duda", "Espera", "Paciencia", "Pregunta"],
    love:
      "Puede haber ambigüedad o falta de definición. Pide claridad sin exigir una respuesta inmediata.",
    work:
      "Un proyecto o una decisión sigue abierta. Reúne información y evita firmar por presión.",
    health:
      "La ansiedad por el futuro puede afectar el descanso. Vuelve a lo que sí puedes controlar.",
    personal: "Aprende a tolerar la incertidumbre sin abandonar el discernimiento.",
    advice:
      "Escribe lo que sabes, lo que no sabes y lo que puedes averiguar esta semana. Actúa solo sobre lo último.",
  },
  {
    n: 29,
    essence: "el valor de un lugar al que pertenecer",
    shadow: "la rutina que se vuelve encierro",
    general:
      "Representa el hogar, los vínculos cotidianos y la construcción de un espacio seguro. Habla de la importancia de lo doméstico y de la necesidad de pertenecer sin desaparecer.",
    message:
      "Un hogar no es solo un lugar: es la forma en que te tratas y tratas a quienes viven contigo.",
    keywords: ["Hogar", "Pertenencia", "Rutina", "Familia"],
    love:
      "La relación busca estabilidad y complicidad cotidiana. Cuida que la comodidad no apague el deseo.",
    work:
      "El trabajo desde casa, el equipo como familia o la necesidad de un entorno estable. Pon límites claros.",
    health:
      "El entorno influye en tu bienestar. Ordena y ventila los espacios que habitas.",
    personal:
      "Revisa qué tradiciones heredadas quieres conservar y cuáles necesitas transformar.",
    advice: "Haz un pequeño cambio en tu espacio que haga tu día más amable.",
  },
  {
    n: 30,
    essence: "la reciprocidad que hace posible la vida en común",
    shadow: "la negociación que olvida el valor de lo que se entrega",
    general:
      "Representa el comercio, el trueque y todo vínculo basado en dar y recibir. Su enseñanza está en la justicia del intercambio: no se trata de ganar siempre, sino de que ambas partes puedan sostenerse.",
    message:
      "Revisa qué estás dando y qué estás recibiendo. La reciprocidad también necesita límites.",
    keywords: ["Intercambio", "Negociación", "Reciprocidad", "Acuerdo"],
    love:
      "El vínculo pide equilibrio entre dar y recibir. Habla de expectativas y de lo que cada parte necesita.",
    work:
      "Negociaciones, acuerdos o colaboraciones. Deja todo claro por escrito y cuida el valor de tu trabajo.",
    health: "El equilibrio entre actividad y descanso es parte del intercambio con la vida.",
    personal: "Aprende a pedir sin culpa y a dar sin perderte.",
    advice:
      "Revisa un acuerdo que te incomoda y propón una condición más justa para ambas partes.",
  },
  {
    n: 31,
    essence: "el obstáculo que obliga a cambiar de estrategia",
    shadow: "la resistencia que convierte el retraso en excusa",
    general:
      "Habla de un bloqueo, una demora o una fuerza que se opone al avance. No es una condena: es una invitación a revisar el camino y a buscar otra forma de pasar.",
    message:
      "Si la puerta no se abre, no significa que no haya salida. Quizá necesitas otra entrada.",
    keywords: ["Obstáculo", "Pausa", "Estrategia", "Resistencia"],
    love:
      "Puede haber distancia, malentendidos o un tema que no avanza. No fuerces; busca otra forma de comunicarte.",
    work:
      "Un proyecto se retrasa o encuentra resistencia. Revisa el plan y pide apoyo si hace falta.",
    health: "El cuerpo pide una pausa o un cambio de hábito. No ignores las señales.",
    personal: "Distingue lo que no depende de ti de lo que sí puedes modificar.",
    advice:
      "Escribe el obstáculo con precisión y propón tres caminos alternativos. Prueba el más pequeño.",
  },
  {
    n: 32,
    essence: "la generosidad que se expresa con plenitud",
    shadow: "la necesidad de brillar a costa de los demás",
    general:
      "Representa la abundancia compartida, el reconocimiento y la capacidad de dar desde la riqueza interior. Su energía es generosa, pero también pide humildad y responsabilidad.",
    message:
      "Lo que brilla con más fuerza es lo que ilumina a otros. Comparte tu abundancia sin miedo.",
    keywords: ["Abundancia", "Generosidad", "Reconocimiento", "Brillo"],
    love:
      "Un vínculo generoso y visible. Cuida que el reconocimiento externo no sustituya la intimidad.",
    work:
      "Éxito, visibilidad o una oportunidad de liderar. Aprovecha para abrir puertas a otros.",
    health:
      "La energía vital está disponible; no la gastes toda en la imagen externa.",
    personal:
      "Reconoce tus logros sin minimizarlos y compártelos con generosidad.",
    advice:
      "Haz un gesto de generosidad que no espere nada a cambio y observa cómo te sienta.",
  },
  {
    n: 33,
    essence: "el compromiso que une fuerzas distintas",
    shadow: "el pacto que se sostiene por miedo a estar solo",
    general:
      "Habla de acuerdos, alianzas y compromisos. Su enseñanza está en la confianza: una unión verdadera no elimina las diferencias, sino que las pone a trabajar juntas.",
    message: "Elige aliados que respeten tu voz. Una buena alianza no te hace más pequeño.",
    keywords: ["Alianza", "Compromiso", "Confianza", "Unión"],
    love:
      "Compromiso, proyecto compartido o una unión que pide claridad. Revisa que los valores estén alineados.",
    work:
      "Sociedades, equipos o colaboraciones. Define roles y expectativas desde el inicio.",
    health: "El apoyo de otros favorece el bienestar. No cargues todo en soledad.",
    personal: "Aprende a comprometerte sin perder autonomía.",
    advice:
      "Revisa un compromiso importante y pregúntate si lo eliges o si solo temes perderlo.",
  },
  {
    n: 34,
    essence: "la chispa de lo nuevo que rompe la repetición",
    shadow: "la novedad compulsiva que impide profundizar",
    general:
      "Representa la creatividad, la invención y la capacidad de encontrar soluciones distintas. Su energía abre caminos, pero necesita constancia para que la idea no se quede en chispa.",
    message: "La novedad vale cuando encuentra un cauce. Prueba, ajusta y vuelve a intentarlo.",
    keywords: ["Creatividad", "Novedad", "Invención", "Cambio"],
    love:
      "Una relación puede renovarse o aparecer alguien que rompe el esquema. Date tiempo para conocer.",
    work:
      "Buen momento para proponer ideas, innovar o cambiar métodos. Acompaña la idea con un plan.",
    health:
      "Prueba nuevas rutinas de movimiento o alimentación sin caer en modas.",
    personal: "Recupera el juego y la curiosidad; no todo tiene que estar resuelto.",
    advice:
      "Elige una idea que te entusiasme y conviértela en un experimento de siete días.",
  },
  {
    n: 35,
    essence: "el vacío que abre espacio a una nueva sensibilidad",
    shadow: "el desánimo que se instala como única mirada",
    general:
      "Habla de pérdida, cansancio o sensación de sequedad. No es una carta de castigo: reconoce un dolor real y recuerda que incluso la tierra seca guarda semillas.",
    message:
      "No te exijas florecer en el desierto. Primero necesitas sombra, agua y tiempo.",
    keywords: ["Pérdida", "Cansancio", "Vacío", "Duelo"],
    love:
      "Puede haber distancia o desilusión. No busques llenar el vacío con otra persona.",
    work: "Un proyecto se agota o falta motivación. Reduce el ritmo y busca apoyo.",
    health:
      "La energía está baja; el descanso y el acompañamiento son prioritarios.",
    personal: "Permítete sentir el cansancio sin convertirlo en identidad.",
    advice:
      "Haz una sola cosa que te devuelva un poco de agua: descanso, compañía o naturaleza.",
  },
  {
    n: 36,
    essence: "el primer paso de un camino que transforma",
    shadow: "el miedo a empezar que se esconde en la preparación infinita",
    general:
      "Representa el comienzo de un aprendizaje o de una etapa. Su energía es la de la semilla que se abre: hay entusiasmo, pero también incertidumbre. Iniciarse es aceptar que se empieza sin saber todo.",
    message:
      "El umbral se cruza caminando. No necesitas sentirte preparado para comenzar.",
    keywords: ["Comienzo", "Aprendizaje", "Umbral", "Decisión"],
    love:
      "Un nuevo ciclo afectivo o una relación que pide otro nivel de compromiso. Empieza por la honestidad.",
    work:
      "Nuevos estudios, un puesto o un proyecto que te entusiasma. Aprende las reglas y luego crea las tuyas.",
    health:
      "Buen momento para iniciar un cambio de hábitos. Empieza pequeño y celebra el primer paso.",
    personal:
      "Permítete ser principiante y equivocarte como parte del aprendizaje.",
    advice:
      "Elige un inicio que has postergado y da el primer paso hoy, aunque sea imperfecto.",
  },
  {
    n: 37,
    essence: "el conocimiento que se convierte en maestría",
    shadow: "la erudición que se aleja de la vida",
    general:
      "Habla de la unión entre intuición y método, entre la sensibilidad del arte y el rigor de la ciencia. Su enseñanza está en aprender, practicar y comprender sin perder la curiosidad.",
    message:
      "El conocimiento se completa cuando se vive. Aprende con rigor y aplica con sensibilidad.",
    keywords: ["Conocimiento", "Método", "Creatividad", "Maestría"],
    love:
      "La relación puede crecer a través del diálogo y de intereses compartidos. No todo se resuelve con lógica.",
    work:
      "Formación, especialización o un proyecto que requiere método y creatividad. Documenta lo que haces.",
    health:
      "La información ayuda, pero el cuerpo necesita práctica y atención personalizada.",
    personal:
      "Combina estudio y experiencia: ninguna de las dos es suficiente por separado.",
    advice:
      "Elige un tema que quieras dominar y diseña un plan de estudio y práctica de dos semanas.",
  },
  {
    n: 38,
    essence: "la ambigüedad que obliga a leer entre líneas",
    shadow: "el engaño que se vuelve hábito",
    general:
      "Habla de mensajes contradictorios, máscaras y situaciones que no se muestran completas. Su enseñanza no es volverse paranoico, sino aprender a verificar y a confiar en la coherencia entre palabras y actos.",
    message:
      "Lo que no se dice también comunica. Mira los actos, no solo las promesas.",
    keywords: ["Ambigüedad", "Máscara", "Cautela", "Verdad"],
    love:
      "Puede haber secretos, celos o mensajes confusos. Pide claridad y observa la coherencia.",
    work:
      "Cuidado con acuerdos ambiguos o información incompleta. Verifica antes de confiar.",
    health:
      "La contradicción interna puede generar tensión. Nombra lo que sientes sin dramatizar.",
    personal: "Revisa dónde te estás diciendo una cosa y haciendo otra.",
    advice:
      "Escribe una situación que te confunde y separa los hechos de las interpretaciones. Pide una aclaración concreta.",
  },
  {
    n: 39,
    essence: "la verdad que se hace visible a través de los hechos",
    shadow: "la necesidad de demostrar que oculta la propia duda",
    general:
      "Representa la evidencia, la memoria y el acto de dar fe de algo. Su energía pide honestidad y coherencia: lo que haces deja un registro, aunque nadie lo vea.",
    message:
      "Tus actos son tu testimonio. No necesitas convencer a nadie de lo que eres.",
    keywords: ["Evidencia", "Verdad", "Memoria", "Coherencia"],
    love:
      "La confianza se construye con hechos. Una conversación puede aclarar lo que estaba implícito.",
    work:
      "Evaluaciones, informes o reconocimiento por el trabajo hecho. Documenta tus logros.",
    health:
      "El historial del cuerpo cuenta una historia. Escucha los patrones que se repiten.",
    personal: "Revisa si tu vida diaria es testimonio de lo que dices valorar.",
    advice:
      "Elige un valor importante para ti y realiza una acción visible que lo demuestre.",
  },
  {
    n: 40,
    essence: "la información sutil que llega antes de la evidencia",
    shadow: "la ansiedad que se disfraza de intuición",
    general:
      "Habla de corazonadas, señales y percepciones que aún no tienen confirmación. Su enseñanza es recibir la intuición sin convertirla en sentencia.",
    message:
      "Escucha lo que presientes, pero contrasta con la realidad. La intuición también necesita verificación.",
    keywords: ["Intuición", "Señal", "Anticipación", "Escucha"],
    love:
      "Puede haber una conexión que se percibe antes de ser evidente. No idealices lo que aún no se ha mostrado.",
    work:
      "Una corazonada sobre un proyecto o una persona merece atención, pero investiga antes de decidir.",
    health:
      "El cuerpo a veces avisa antes que la mente. Atiende las señales y consulta si algo persiste.",
    personal:
      "Aprende a distinguir la intuición serena del miedo que anticipa catástrofes.",
    advice:
      "Anota un presentimiento y espera unos días antes de actuar. Observa si se confirma o cambia.",
  },
  {
    n: 41,
    essence: "el conflicto que hace visible una diferencia",
    shadow: "la pelea que busca tener razón a cualquier precio",
    general:
      "Representa desacuerdos, tensiones y la dificultad de conciliar intereses. Su enseñanza está en la escucha: el conflicto puede destruir o abrir una conversación necesaria.",
    message:
      "No todas las diferencias son un ataque. A veces el conflicto señala algo que necesita cambiar.",
    keywords: ["Conflicto", "Desacuerdo", "Tensión", "Escucha"],
    love:
      "Discusiones o roces por expectativas distintas. Baja el tono y habla de necesidades, no de culpas.",
    work:
      "Tensión en el equipo o intereses enfrentados. Ordena los hechos y busca una mediación.",
    health: "El conflicto sostenido desgasta. Pon límites y reserva espacios de calma.",
    personal:
      "Revisa qué parte del conflicto te pertenece y qué parte solo estás respondiendo.",
    advice:
      "Elige una conversación pendiente y empieza con una pregunta en lugar de una acusación.",
  },
  {
    n: 42,
    essence: "el reconocimiento que llega con la responsabilidad",
    shadow: "la competencia que mide el valor propio contra el de otros",
    general:
      "Habla de liderazgo, estatus y reconocimiento. Su energía puede ser estimulante, pero recuerda que el verdadero lugar se sostiene con coherencia, no con comparación.",
    message:
      "Ocupa tu lugar sin necesidad de quitarle el suyo a nadie. El liderazgo también es servicio.",
    keywords: ["Reconocimiento", "Liderazgo", "Estatus", "Responsabilidad"],
    love:
      "Una relación puede pasar a un lugar más visible o implicar decisiones de estatus. Cuida el equilibrio de poder.",
    work:
      "Reconocimiento, ascenso o competencia. Lidera con ejemplo y no confundas autoridad con superioridad.",
    health: "El exceso de exigencia por rendir puede agotar. La salud también es prioridad.",
    personal: "Reconoce tu valor sin compararlo constantemente con el de los demás.",
    advice:
      "Haz una lista de tus logros recientes y otra de las responsabilidades que vienen con ellos. Elige una para asumir mejor.",
  },
  {
    n: 43,
    essence: "la imaginación que puede crear o confundir",
    shadow: "la fantasía que sustituye a la realidad",
    general:
      "Representa sueños, proyecciones y espejismos. Su enseñanza no es renunciar a la imaginación, sino distinguir cuándo una imagen interna te inspira y cuándo te impide ver lo que realmente hay.",
    message:
      "Los sueños son un buen punto de partida, pero no un lugar para vivir. Vuelve a la realidad con lo que aprendiste.",
    keywords: ["Ilusión", "Sueño", "Proyección", "Desengaño"],
    love:
      "Puedes estar idealizando a alguien o viendo solo lo que quieres ver. Contrasta la fantasía con los hechos.",
    work:
      "Un proyecto ilusionante necesita un plan realista. No confundas entusiasmo con viabilidad.",
    health:
      "El estrés onírico o la confusión mental piden rutinas de anclaje y descanso.",
    personal:
      "Reconoce qué historia te estás contando para no mirar una verdad incómoda.",
    advice:
      "Escribe lo que imaginas y lo que sabes de una situación. Pregúntate qué decisión tomarías solo con los hechos.",
  },
  {
    n: 44,
    essence: "la voz que comunica lo que vive dentro",
    shadow: "la palabra que se dispersa o se usa para impresionar",
    general:
      "Habla de comunicación, creatividad y expresión personal. Su energía necesita un cauce: decir lo que importa, en el momento adecuado y con la persona adecuada.",
    message: "Tu voz importa. Dila con claridad, no solo con intensidad.",
    keywords: ["Comunicación", "Creatividad", "Voz", "Expresión"],
    love:
      "La relación pide conversaciones sinceras y juego. Expresar lo que sientes puede acercar más que suponer.",
    work:
      "Presentaciones, escritura, docencia o negociación. Organiza tu mensaje antes de lanzarlo.",
    health:
      "La expresión emocional alivia tensiones. Busca formas creativas de canalizar lo que sientes.",
    personal: "Practica decir lo que necesitas sin adornarlo demasiado.",
    advice:
      "Elige una conversación que has evitado y prepárala con tres ideas claras. Luego, tenla.",
  },
  {
    n: 45,
    essence: "la capacidad de volver a empezar después de una pérdida",
    shadow: "la resistencia a soltar lo que ya terminó",
    general:
      "Representa la recuperación, la sanación y el renacimiento después de una etapa difícil. Su energía no borra el pasado: lo integra y lo convierte en abono para lo que viene.",
    message: "No estás empezando de cero: estás empezando de nuevo con lo aprendido.",
    keywords: ["Sanación", "Renacimiento", "Recuperación", "Esperanza"],
    love:
      "Un vínculo puede sanar o una herida puede cerrarse. Date tiempo y no fuerces el perdón.",
    work:
      "Recuperación de un proyecto, cambio de estrategia o regreso después de una pausa.",
    health: "Muy favorable para procesos de recuperación. Respeta los tiempos del cuerpo.",
    personal: "Reconoce lo que has sobrevivido y date crédito por seguir aquí.",
    advice:
      "Escribe una herida que esté sanando y una señal de que ya no duele igual.",
  },
  {
    n: 46,
    essence: "los recursos y la historia que recibes como herencia",
    shadow: "la carga del pasado que se confunde con obligación",
    general:
      "Habla de herencias, recursos acumulados y legados familiares. No solo de dinero: también de creencias, costumbres y dones que se transmiten.",
    message:
      "Recibes más de lo que crees. Revisa qué legado quieres conservar y qué parte necesitas devolver.",
    keywords: ["Herencia", "Recursos", "Familia", "Legado"],
    love:
      "La relación puede verse influida por historias familiares. Distingue lo tuyo de lo heredado.",
    work:
      "Recursos, propiedades o ventajas que vienen del pasado. Adminístralos con responsabilidad.",
    health:
      "La historia familiar también influye en el cuerpo. Conocerla puede ayudar a cuidarte mejor.",
    personal: "Revisa qué creencias heredadas ya no te representan.",
    advice:
      "Elige una tradición familiar que valores y una que quieras transformar. Escribe por qué.",
  },
  {
    n: 47,
    essence: "la interpretación que intenta comprender lo que aún no es claro",
    shadow: "la suposición que se toma como verdad",
    general:
      "Representa hipótesis, conjeturas y la necesidad de interpretar una situación con información parcial. Su enseñanza está en mantener la mente abierta sin renunciar al análisis.",
    message:
      "Puedes tener una hipótesis sin convertirla en sentencia. Deja espacio para estar equivocado.",
    keywords: ["Hipótesis", "Análisis", "Duda", "Interpretación"],
    love:
      "Puedes estar interpretando señales ambiguas. Pregunta en lugar de suponer.",
    work:
      "Evaluaciones, investigaciones o decisiones con datos incompletos. Verifica antes de concluir.",
    health:
      "La interpretación de síntomas debe acompañarse de criterio profesional.",
    personal: "Observa cuántas veces confundes una posibilidad con una certeza.",
    advice:
      "Elige una suposición que te preocupa y escribe tres explicaciones alternativas. Busca evidencia.",
  },
  {
    n: 48,
    essence: "la plenitud de un deseo que se realiza",
    shadow: "la búsqueda de satisfacción que nunca se detiene",
    general:
      "Habla de la realización de un deseo, del disfrute y de la culminación de un proceso. Su energía es intensa y gratificante, pero invita a preguntarse qué viene después del goce.",
    message:
      "Permítete disfrutar lo conseguido. La plenitud también necesita ser habitada.",
    keywords: ["Realización", "Deseo", "Disfrute", "Culminación"],
    love:
      "Un deseo se cumple o una relación alcanza un momento de plenitud. Cuida que la intensidad no se confunda con posesión.",
    work: "Un objetivo se logra. Reconoce el resultado y evalúa qué aprendiste.",
    health:
      "El bienestar emocional favorece el cuerpo. Evita los excesos con los que celebras.",
    personal:
      "Date permiso para disfrutar sin culpa y sin buscar inmediatamente la siguiente meta.",
    advice:
      "Celebra un logro reciente de forma consciente y date un día sin exigirte nada.",
  },
  {
    n: 49,
    essence: "la capacidad de adaptarse sin perder la propia esencia",
    shadow: "la dispersión que no permite terminar nada",
    general:
      "Habla de flexibilidad, múltiples talentos y facilidad para moverse entre contextos. Su enseñanza está en elegir dónde poner el foco para que la versatilidad no se convierta en fuga.",
    message:
      "Puedes adaptarte sin desaparecer. Elige qué parte de ti quieres sostener en cada cambio.",
    keywords: ["Adaptación", "Flexibilidad", "Talento", "Cambio"],
    love:
      "La relación necesita variedad y capacidad de ajustarse a etapas distintas. La novedad no lo es todo.",
    work:
      "Varios frentes o roles. Prioriza y evita prometer más de lo que puedes cumplir.",
    health:
      "Rutinas flexibles, no rígidas. Encuentra un ritmo que puedas sostener.",
    personal: "Reconoce tus talentos y elige uno para profundizar.",
    advice:
      "Haz una lista de tus intereses actuales y elige uno para sostener durante un mes.",
  },
  {
    n: 50,
    essence: "la fuerza que acerca y crea vínculo",
    shadow: "la dependencia que confunde atracción con necesidad",
    general:
      "Representa el magnetismo, la afinidad y el deseo de unión. Su energía es poderosa y puede ser creativa o absorbente según la conciencia con que se viva.",
    message: "Atraer no es retener. Deja que el vínculo se mueva con libertad.",
    keywords: ["Atracción", "Afinidad", "Deseo", "Vínculo"],
    love:
      "Atracción intensa o encuentro significativo. Disfruta sin perderte en la idealización.",
    work:
      "Un proyecto o una persona genera entusiasmo. Aprovecha la conexión sin depender de ella.",
    health:
      "El deseo también es vitalidad. Cuida el equilibrio entre placer y descanso.",
    personal:
      "Observa qué te atrae y qué necesidad intenta satisfacer esa atracción.",
    advice:
      "Escribe qué te atrae de una persona o proyecto y qué parte de eso también quieres cultivar en ti.",
  },
  {
    n: 51,
    essence: "la palabra que orienta sin decidir por otro",
    shadow: "la intromisión que disfraza de ayuda",
    general:
      "Habla de consejos, estrategias y personas que ofrecen orientación. Su enseñanza está en escuchar sin ceder la propia responsabilidad y en aconsejar sin apropiarse de la vida ajena.",
    message:
      "Escucha a quien sabe, pero decide tú. Un buen consejo devuelve el poder a quien lo recibe.",
    keywords: ["Consejo", "Guía", "Estrategia", "Discernimiento"],
    love:
      "Puedes recibir opiniones sobre tu relación. Escucha, pero no permitas que otros decidan por ti.",
    work:
      "Un mentor o una estrategia pueden ayudar. Verifica que el consejo se adapte a tu situación.",
    health:
      "Busca una segunda opinión ante una duda importante, sin sustituir el criterio profesional.",
    personal: "Distingue entre pedir ayuda y delegar tu vida.",
    advice:
      "Pide un consejo a alguien que admiras y pregúntale también cómo llegó a esa conclusión.",
  },
  {
    n: 52,
    essence: "la intención que se organiza antes de actuar",
    shadow: "el cálculo que paraliza o manipula",
    general:
      "Representa la planificación, la estrategia y la intención consciente. Su energía es útil cuando está al servicio de un propósito claro, pero puede volverse rígida o fría si olvida la vida.",
    message:
      "Planifica sin dejar de escuchar. La estrategia es un medio, no un fin.",
    keywords: ["Planificación", "Estrategia", "Intención", "Cálculo"],
    love:
      "Una conversación o decisión requiere preparación. No guiones cada palabra; deja espacio a la espontaneidad.",
    work:
      "Buen momento para planificar, presupuestar y prever riesgos. Documenta los acuerdos.",
    health:
      "Un plan de cuidado funciona mejor que la improvisación constante. Revísalo con flexibilidad.",
    personal:
      "Revisa si estás planificando para avanzar o para evitar el riesgo de vivir.",
    advice:
      "Elige un objetivo y escribe un plan de tres pasos. Define qué señales te dirán que debes ajustarlo.",
  },
  {
    n: 53,
    essence: "la fuerza que se opone y exige límites",
    shadow: "la agresión que se vuelve identidad",
    general:
      "Habla de conflicto abierto, oposición y defensa. Su energía puede proteger o destruir. La clave está en no confundir firmeza con violencia y en elegir bien las batallas.",
    message:
      "No tienes que responder a cada provocación. Tu límite también puede ser un silencio.",
    keywords: ["Conflicto", "Defensa", "Límite", "Tensión"],
    love:
      "Puede haber agresividad, celos o una lucha de poder. La seguridad y el respeto no se negocian.",
    work:
      "Ambiente tenso o competencia agresiva. Documenta los hechos y protege tu posición sin escalar.",
    health:
      "La hostilidad sostenida afecta el cuerpo. Busca espacios de descarga y apoyo.",
    personal:
      "Revisa qué te hace sentir atacado y qué respuesta necesitas de verdad.",
    advice:
      "Ante una provocación, espera diez minutos antes de responder. Pregúntate si quieres tener razón o resolver.",
  },
  {
    n: 54,
    essence: "la mirada atenta que evalúa y aprende",
    shadow: "la autocrítica que convierte el examen en castigo",
    general:
      "Representa pruebas, evaluaciones y escrutinio. Su enseñanza está en la honestidad: mirar lo que hay, reconocer errores y aprender sin reducirse a la nota.",
    message:
      "Una prueba mide algo, no todo. Aprende de lo que ves sin convertir el resultado en identidad.",
    keywords: ["Evaluación", "Prueba", "Atención", "Aprendizaje"],
    love:
      "La relación pide revisar con honestidad lo que funciona y lo que no. Evita el juicio constante.",
    work:
      "Evaluaciones, entrevistas o auditorías. Prepara tu caso con hechos y acepta las correcciones.",
    health:
      "Revisiones y análisis pueden aportar claridad. No te obsesiones con cada resultado.",
    personal: "Obsérvate con curiosidad y no con crueldad.",
    advice:
      "Revisa un área de tu vida como si fueras un observador amable. Anota un aprendizaje y una acción.",
  },
  {
    n: 55,
    essence: "el arrepentimiento que repara y libera",
    shadow: "la culpa que se queda dando vueltas sin cambiar nada",
    general:
      "Habla de remordimiento, responsabilidad y reparación. Su energía es incómoda, pero necesaria: reconocer el daño permite pedir perdón, aprender y empezar de nuevo.",
    message:
      "El arrepentimiento sincero no se queda en el dolor: se convierte en reparación.",
    keywords: ["Arrepentimiento", "Responsabilidad", "Perdón", "Reparación"],
    love:
      "Puede haber una disculpa pendiente o una herida que pide reparación. Habla desde la responsabilidad, no desde la culpa.",
    work:
      "Reconoce un error y corrige lo que puedas. La honestidad sostiene la confianza.",
    health:
      "La culpa crónica desgasta. Trabájala con acompañamiento si ocupa demasiado espacio.",
    personal:
      "Distingue responsabilidad de autocastigo. Puedes aprender sin destruirte.",
    advice:
      "Escribe una disculpa honesta para alguien o para ti, sin justificaciones. Después, realiza un gesto de reparación.",
  },
  {
    n: 56,
    essence: "la búsqueda que da sentido al camino",
    shadow: "la huida que se viste de búsqueda espiritual",
    general:
      "Representa el viaje interior, la búsqueda de sentido y la disposición a salir de lo conocido. Su energía es la del peregrino que no busca solo un destino, sino una transformación en el trayecto.",
    message:
      "El sentido no está solo al final del camino. También se revela en cada paso.",
    keywords: ["Búsqueda", "Viaje", "Sentido", "Peregrinación"],
    love:
      "Puede aparecer una conexión que cambia la mirada o la necesidad de un espacio propio. No huyas de ti en el otro.",
    work:
      "Un proyecto con propósito o un cambio de rumbo. Pregúntate qué quieres aprender, no solo qué quieres conseguir.",
    health:
      "El movimiento y el contacto con la naturaleza ayudan. No descuides el descanso.",
    personal: "Camina hacia lo que te importa, aunque no puedas ver el final.",
    advice:
      "Elige una pregunta que te acompañe y da un paso concreto esta semana en dirección a ella.",
  },
  {
    n: 57,
    essence: "la comparación que impulsa o desgasta",
    shadow: "la envidia que impide reconocer el propio camino",
    general:
      "Habla de competencia, comparación y deseo de superar a otro. Su energía puede motivar, pero también hacerte perder de vista lo que realmente quieres.",
    message: "Mira el camino de otros para aprender, no para medir tu valor.",
    keywords: ["Competencia", "Comparación", "Tensión", "Superación"],
    love:
      "Puede haber celos o comparaciones con otras relaciones. La seguridad se construye desde dentro.",
    work:
      "Competencia o rivalidad en el equipo. Compite con tus propios estándares y evita sabotear.",
    health:
      "La comparación constante genera estrés. Limita el ruido de las redes si te afecta.",
    personal: "Pregúntate contra quién compites de verdad y por qué.",
    advice:
      "Identifica a quién envidias sanamente y escribe qué cualidad de esa persona quieres cultivar.",
  },
  {
    n: 58,
    essence: "la pausa que permite ver con claridad",
    shadow: "la reflexión que se convierte en rumiación",
    general:
      "Representa la introspección, el silencio y el estudio interior. Su energía es serena y fértil cuando hay un espacio real para pensar, y estéril cuando se repite la misma idea sin salida.",
    message: "Piensa, pero también suelta. La claridad llega cuando la mente deja de dar vueltas.",
    keywords: ["Reflexión", "Silencio", "Análisis", "Calma"],
    love:
      "Necesitas espacio para entender lo que sientes. La reflexión es útil si luego se traduce en conversación.",
    work:
      "Buen momento para revisar estrategias, estudiar o analizar un problema con calma.",
    health:
      "La meditación y el descanso mental son favorables. Busca ayuda si la rumiación se vuelve constante.",
    personal: "Observa tus pensamientos sin creerlos todos.",
    advice:
      "Dedica diez minutos a sostener una pregunta sin buscar la respuesta. Después escribe lo que aparezca.",
  },
  {
    n: 59,
    essence: "la verdad que se muestra de forma repentina",
    shadow: "la certeza que se impone sin escuchar",
    general:
      "Habla de descubrimientos, intuiciones súbitas y verdades que salen a la luz. Su energía es transformadora: una vez que ves algo, ya no puedes mirar como antes.",
    message:
      "La verdad transforma, pero necesita tiempo para integrarse. No confundas la revelación con la prisa.",
    keywords: ["Revelación", "Verdad", "Descubrimiento", "Claridad"],
    love:
      "Una conversación o un descubrimiento puede cambiar la relación. Habla con honestidad y cuidado.",
    work:
      "Una idea o un dato nuevo puede modificar el proyecto. Verifica la información y ajusta el plan.",
    health:
      "Un diagnóstico o una señal del cuerpo pide atención. Busca acompañamiento profesional.",
    personal:
      "Permítete revisar una creencia a la luz de lo que acabas de comprender.",
    advice:
      "Escribe la verdad que acabas de ver y una acción coherente para integrarla en tu vida.",
  },
  {
    n: 60,
    essence: "el crecimiento gradual que no necesita aplausos",
    shadow: "la impaciencia que quiere resultados antes de tiempo",
    general:
      "Representa el progreso lento, la maduración y los cambios que se acumulan sin hacer ruido. Su enseñanza está en confiar en el proceso y no comparar tu ritmo con el de otros.",
    message: "Estás cambiando, aunque no siempre lo notes. La evolución trabaja en silencio.",
    keywords: ["Progreso", "Crecimiento", "Paciencia", "Proceso"],
    love:
      "La relación evoluciona a su ritmo. No forces etapas ni interpretes cada silencio como retroceso.",
    work: "Los resultados llegan de forma gradual. Mantén la constancia y revisa el rumbo.",
    health: "Los cambios sostenidos valen más que los esfuerzos intensos y breves.",
    personal:
      "Reconoce tus avances y no te castigues por no estar donde crees que deberías.",
    advice:
      "Compara dónde estabas hace tres meses con dónde estás hoy. Anota una mejora que no habías reconocido.",
  },
  {
    n: 61,
    essence: "el silencio necesario para escucharse",
    shadow: "el aislamiento que se vuelve trinchera",
    general:
      "Habla de soledad elegida, independencia y necesidad de espacio propio. Su energía puede ser reparadora cuando hay un centro interior, y dolorosa cuando se convierte en desconexión.",
    message:
      "Estar solo y sentirse solo no son lo mismo. Aprende a distinguir qué necesitas.",
    keywords: ["Soledad", "Independencia", "Silencio", "Espacio"],
    love:
      "Necesitas espacio propio o una relación está pidiendo distancia. Aclara si es pausa o evitación.",
    work:
      "Trabajo solitario, concentración o una etapa de menos vida social. No te aísles por completo.",
    health: "El silencio ayuda a escuchar el cuerpo. Busca compañía si la soledad pesa.",
    personal: "Distingue la soledad fértil del aislamiento defensivo.",
    advice:
      "Reserva un rato de soledad sin pantallas y pregúntate qué necesitas de los demás.",
  },
  {
    n: 62,
    essence: "el límite que obliga a vivir fuera de lo esperado",
    shadow: "el resentimiento que se instala en la exclusión",
    general:
      "Representa la exclusión, el destierro y las situaciones en que una persona queda al margen de un grupo o de una norma. Su enseñanza está en encontrar dignidad y pertenencia más allá de la aprobación externa.",
    message:
      "No necesitas que todos te acepten para tener un lugar. Construye el tuyo sin rencor.",
    keywords: ["Exclusión", "Límite", "Margen", "Dignidad"],
    love:
      "Puedes sentirte excluido o juzgado por otros. Habla de lo que necesitas y no aceptes maltrato.",
    work:
      "Una situación de marginación o de reglas que te dejan fuera. Documenta y busca apoyo.",
    health:
      "El aislamiento afecta la salud emocional. Busca una comunidad donde puedas ser tú.",
    personal: "Revisa si estás intentando pertenecer a un lugar que te niega.",
    advice:
      "Escribe qué grupo o aprobación estás persiguiendo y qué pasaría si dejaras de hacerlo.",
  },
  {
    n: 63,
    essence: "la unión que se construye desde un propósito compartido",
    shadow: "la fusión que disuelve la individualidad",
    general:
      "Habla de encuentro, pertenencia y participación en algo mayor que uno mismo. Su energía es cálida y sostenedora, pero necesita reconocer las diferencias dentro del grupo.",
    message: "Compartir no significa desaparecer. La comunión verdadera incluye tu voz.",
    keywords: ["Unión", "Pertenencia", "Compromiso", "Comunidad"],
    love:
      "Un vínculo profundo y compartido. Cuida que la intimidad no se convierta en fusión.",
    work:
      "Trabajo en equipo, comunidad o un proyecto colectivo. Define tu aporte y escucha el de otros.",
    health: "Los vínculos sostienen la salud. Participa sin olvidar tus límites.",
    personal: "Encuentra un grupo donde puedas pertenecer sin dejar de ser tú.",
    advice:
      "Participa en una actividad comunitaria y observa cómo te sientes al compartir sin desaparecer.",
  },
  {
    n: 64,
    essence: "la pasión que empuja a actuar ahora",
    shadow: "la impaciencia que atropella lo que necesita tiempo",
    general:
      "Representa la intensidad, el deseo y la urgencia de avanzar. Su energía es poderosa y puede ser creativa, pero también arrasar con lo que no se ha cuidado.",
    message:
      "La pasión mueve montañas, pero no construye solo con prisa. Ponle dirección.",
    keywords: ["Pasión", "Intensidad", "Urgencia", "Impulso"],
    love:
      "Deseo intenso o una relación que se acelera. Revisa si la prisa viene del amor o del miedo.",
    work:
      "Un proyecto pide acción inmediata. Canaliza la energía sin atropellar a otros.",
    health: "La intensidad puede agotar. Incluye pausas y descarga física.",
    personal: "Aprende a sostener la pasión sin quemarte ni quemar a otros.",
    advice:
      "Elige una urgencia que sientes y pregúntate si es realmente para hoy. Actúa solo si lo es.",
  },
  {
    n: 65,
    essence: "la humildad de volver a ser principiante",
    shadow: "la vergüenza de no saber que impide aprender",
    general:
      "Habla de estudio, aprendizaje y experiencia guiada. Su energía es la del aprendiz que se acerca a un oficio con respeto y curiosidad. El conocimiento se construye paso a paso.",
    message: "Nadie nace sabiendo. Preguntar también es una forma de avanzar.",
    keywords: ["Aprendizaje", "Estudio", "Humildad", "Curiosidad"],
    love:
      "La relación puede enseñarte algo sobre ti. Escucha y permite que el otro también aprenda.",
    work:
      "Formación, prácticas o un nuevo rol. Haz preguntas y no finjas saberlo todo.",
    health: "Aprender sobre tu cuerpo y tus hábitos es parte del cuidado.",
    personal:
      "Elige una habilidad que quieras desarrollar y practícala sin exigirte maestría inmediata.",
    advice: "Pide ayuda a alguien que sepa más que tú y haz una pregunta concreta.",
  },
  {
    n: 66,
    essence: "la sorpresa que desordena las certezas",
    shadow: "la parálisis ante lo que no se comprende",
    general:
      "Representa la confusión, el asombro y la dificultad de decidir cuando la información no encaja. Su energía invita a hacer una pausa y a no forzar una conclusión prematura.",
    message:
      "No tener claro el siguiente paso también es información. Detente y mira de nuevo.",
    keywords: ["Confusión", "Sorpresa", "Pausa", "Decisión"],
    love:
      "Malentendidos o sorpresas en el vínculo. Pide claridad antes de sacar conclusiones.",
    work:
      "Un proyecto se desordena o cambia de dirección. Revisa los datos y consulta antes de actuar.",
    health:
      "La confusión mental puede ser señal de estrés o cansancio. Descansa y simplifica.",
    personal: "Reconoce cuándo necesitas pausa en lugar de más información.",
    advice:
      "Escribe la decisión que te bloquea y divídela en preguntas más pequeñas. Responde solo una hoy.",
  },
  {
    n: 67,
    essence: "el respeto que reconoce algo más grande que uno",
    shadow: "la admiración que se convierte en dependencia",
    general:
      "Habla de devoción, respeto y reconocimiento de lo sagrado en alguien o algo. Su energía eleva y une, pero también pide no depositar todo el poder fuera de ti.",
    message: "Honra lo que admiras sin dejar de habitar tu propio centro.",
    keywords: ["Devoción", "Respeto", "Admiración", "Fe"],
    love:
      "Una relación con admiración y respeto. Evita idealizar al otro hasta perder tu criterio.",
    work: "Un mentor o una institución que inspira. Aprende sin renunciar a tu voz.",
    health:
      "La fe y la confianza pueden sostener procesos de sanación, sin sustituir la atención profesional.",
    personal:
      "Reconoce qué valores encarnan las personas que admiras y cultívalos en ti.",
    advice:
      "Escribe tres cualidades de alguien que admiras y una forma de practicarlas esta semana.",
  },
  {
    n: 68,
    essence: "el cálculo que busca comprender el valor real",
    shadow: "la codicia que solo mira la ganancia",
    general:
      "Habla de inversión, análisis y evaluación de riesgos. Su energía es mental y estratégica; puede generar prosperidad cuando se apoya en información y ética.",
    message: "Calcula, pero no olvides el valor de lo que no tiene precio.",
    keywords: ["Inversión", "Riesgo", "Valor", "Estrategia"],
    love:
      "Puedes estar midiendo demasiado una relación. El vínculo también necesita confianza.",
    work:
      "Buen momento para presupuestar, invertir o analizar oportunidades. Verifica los datos.",
    health:
      "La preocupación por el futuro puede afectar el presente. Ocúpate sin obsesionarte.",
    personal: "Revisa qué estás dispuesto a arriesgar y por qué.",
    advice:
      "Haz números concretos de una decisión y define tu límite de riesgo antes de actuar.",
  },
  {
    n: 69,
    essence: "la casualidad que abre una puerta inesperada",
    shadow: "el azar que se usa como excusa para no decidir",
    general:
      "Representa lo que sucede sin planificación: un encuentro, una oportunidad o un golpe de suerte. Su enseñanza está en estar disponible sin depender del azar.",
    message: "La suerte llega, pero necesita una puerta abierta. Mantente dispuesto.",
    keywords: ["Azar", "Oportunidad", "Suerte", "Apertura"],
    love:
      "Un encuentro inesperado o un cambio de circunstancias. No lo fuerces; deja que se revele.",
    work:
      "Una oportunidad imprevista puede abrir camino. Está atento y preparado para responder.",
    health:
      "El cuerpo también tiene sus tiempos. Aprovecha las ventanas de energía sin exigirte.",
    personal: "Acepta que no todo está en tus manos y elige cómo responder.",
    advice: "Haz espacio en tu agenda para una oportunidad que no habías previsto.",
  },
  {
    n: 70,
    essence: "la fuerza que aparece cuando se trabaja con otros",
    shadow: "la dependencia que espera que otros hagan lo propio",
    general:
      "Habla de trabajo en equipo, ayuda mutua y proyectos compartidos. Su energía multiplica los recursos cuando cada parte aporta desde su lugar.",
    message: "Nadie construye un templo solo. Pide ayuda y ofrece la tuya.",
    keywords: ["Cooperación", "Equipo", "Ayuda", "Colaboración"],
    love:
      "La relación funciona cuando ambas partes aportan. Revisa si la carga está equilibrada.",
    work:
      "Trabajo en equipo, alianzas o un proyecto que necesita colaboración. Define roles con claridad.",
    health: "Apoyarte en otros también es cuidarte. No cargues todo en soledad.",
    personal:
      "Aprende a recibir ayuda sin sentir que debes compensarla permanentemente.",
    advice: "Identifica una tarea que te cuesta y pide colaboración concreta a alguien.",
  },
  {
    n: 71,
    essence: "el miedo a perder que se disfraza de previsión",
    shadow: "la acumulación que no deja circular la vida",
    general:
      "Representa el apego a los recursos, el miedo a la escasez y la dificultad de compartir. Su energía no es solo material: también se acumulan afectos, información y poder.",
    message:
      "Guardar puede proteger, pero también encierra. Pregúntate qué necesitas conservar de verdad.",
    keywords: ["Apego", "Escasez", "Acumulación", "Miedo"],
    love:
      "Puede haber posesividad o miedo a entregar. Revisa si estás protegiendo o controlando.",
    work:
      "Retención de información, tacañería o miedo a perder el puesto. La generosidad también construye.",
    health:
      "La tensión por la escasez afecta el cuerpo. Distingue necesidad real de miedo.",
    personal: "Observa dónde estás acumulando por miedo y qué podrías soltar.",
    advice:
      "Elige algo que puedas compartir hoy sin que te falte: tiempo, conocimiento o un recurso.",
  },
  {
    n: 72,
    essence: "la limpieza que devuelve claridad al cuerpo y al alma",
    shadow: "la exigencia de pureza que rechaza la imperfección",
    general:
      "Habla de limpieza, honestidad y simplificación. Su energía invita a soltar lo que pesa y a recuperar la claridad, sin caer en la obsesión de eliminar toda sombra.",
    message:
      "Limpiar no es borrar: es dejar espacio para que lo esencial respire.",
    keywords: ["Limpieza", "Claridad", "Honestidad", "Renovación"],
    love: "Una conversación sincera puede limpiar malentendidos. No exijas perfección.",
    work: "Ordena procesos, documentos y acuerdos. La transparencia evita problemas.",
    health:
      "Buen momento para depurar hábitos, ordenar la alimentación y descansar.",
    personal: "Suelta una culpa o un hábito que ya no te representa.",
    advice:
      "Elige un espacio, una relación o una rutina y ordénala con un gesto concreto.",
  },
  {
    n: 73,
    essence: "la fuerza del deseo que busca encuentro",
    shadow: "la pasión que se confunde con posesión",
    general:
      "Representa el amor, la atracción y el impulso de unirse a otro. Su energía es intensa y creativa, pero pide conciencia para no convertir el deseo en necesidad.",
    message:
      "Desea sin aferrarte. El amor más libre también puede ser el más profundo.",
    keywords: ["Amor", "Deseo", "Pasión", "Encuentro"],
    love:
      "Atracción intensa, enamoramiento o pasión. Disfruta y distingue lo que sientes de lo que imaginas.",
    work:
      "Un proyecto puede despertar pasión. Cuida que el entusiasmo no te haga perder perspectiva.",
    health:
      "La energía del deseo es vital. Equilibra placer, descanso y límites.",
    personal:
      "Reconoce lo que deseas sin juzgarte y sin convertir el deseo en obligación.",
    advice:
      "Escribe qué deseas y qué necesidad hay debajo. Pregúntate si estás eligiendo o necesitando.",
  },
  {
    n: 74,
    essence: "el gesto de dar que reconoce algo sagrado",
    shadow: "el sacrificio que espera una recompensa",
    general:
      "Habla de ofrendas, rituales y gestos de entrega. Su enseñanza está en la calidad de la intención: dar puede ser un acto de amor o una forma de control.",
    message:
      "Ofrece lo que nazca de una intención limpia, no lo que espera ser devuelto.",
    keywords: ["Ofrenda", "Entrega", "Ritual", "Intención"],
    love:
      "Un gesto de amor puede acercar. Revisa si das para compartir o para asegurar.",
    work:
      "Contribuir a un proyecto o reconocer el trabajo de otros. Hazlo sin esperar protagonismo.",
    health:
      "Los rituales de cuidado ayudan. Elige los que te nutren y no los que te exigen.",
    personal: "Pregúntate qué ofreces y desde qué lugar lo haces.",
    advice:
      "Haz una ofrenda simbólica: tiempo, atención o un gesto de cuidado, sin esperar respuesta.",
  },
  {
    n: 75,
    essence: "la abundancia que circula y se comparte",
    shadow: "la entrega que se olvida de sí misma",
    general:
      "Representa la generosidad, la ayuda y la capacidad de compartir lo que se tiene. Su energía es cálida y expansiva, pero también necesita límites para no vaciarse.",
    message:
      "Dar también es elegir. La generosidad sostenible empieza por no abandonarte.",
    keywords: ["Generosidad", "Ayuda", "Abundancia", "Límites"],
    love:
      "Un vínculo generoso y atento. Evita dar tanto que el otro no tenga espacio para corresponder.",
    work:
      "Colaboración, mentoría o apoyo a otros. Comparte tu conocimiento sin regalarlo todo.",
    health: "Cuidar a otros no debe impedir cuidarte. Reserva energía para ti.",
    personal: "Reconoce que recibir también es una forma de generosidad.",
    advice:
      "Haz un gesto amable por alguien y otro por ti. La generosidad incluye tu nombre.",
  },
  {
    n: 76,
    essence: "la responsabilidad de repartir lo que se ha recibido",
    shadow: "el control que decide quién merece y quién no",
    general:
      "Representa a quien distribuye recursos, conocimiento o cuidado. Su energía es la de la provisión y la justicia: no basta con tener, hay que saber repartir.",
    message:
      "Lo que administras no te pertenece del todo. Reparte con criterio y con corazón.",
    keywords: ["Reparto", "Provisión", "Justicia", "Responsabilidad"],
    love:
      "La relación puede requerir repartir tiempo y cuidado de forma más justa. Habla de cargas.",
    work:
      "Administración, liderazgo o distribución de tareas. Revisa que el reparto sea equitativo.",
    health:
      "Reparte tu energía entre lo que das y lo que necesitas recuperar.",
    personal:
      "Pregúntate si estás usando tu poder para servir o para controlar.",
    advice:
      "Revisa un reparto que te parezca injusto y propón una distribución más equitativa.",
  },
  {
    n: 77,
    essence: "la niebla mental que pide simplificar",
    shadow: "la dispersión que impide elegir",
    general:
      "Habla de desorientación, ideas encontradas y señales contradictorias. Su enseñanza está en reducir el ruido y volver a lo básico antes de decidir.",
    message:
      "Cuando todo se mezcla, no busques más información: busca una sola claridad.",
    keywords: ["Confusión", "Dispersión", "Ruido", "Simplificar"],
    love:
      "Malentendidos o sentimientos encontrados. No tomes decisiones definitivas en medio de la confusión.",
    work:
      "Prioridades poco claras o información contradictoria. Detente y ordena.",
    health:
      "El exceso de estímulos puede saturar. Reduce pantallas y recupera rutinas simples.",
    personal: "Escribe lo que sientes sin intentar resolverlo todo a la vez.",
    advice:
      "Elige una sola pregunta y elimina temporalmente todo lo que no esté relacionado con ella.",
  },
  {
    n: 78,
    essence: "la renovación que llega después del invierno",
    shadow: "la resistencia a nacer a una vida distinta",
    general:
      "Representa el final de un ciclo y el comienzo de otro con más conciencia. Su energía es festiva y profunda: hay algo que muere para que otra cosa pueda vivir.",
    message:
      "La vida vuelve a empezar. Deja que lo nuevo te encuentre sin exigirle que sea igual a lo anterior.",
    keywords: ["Renacimiento", "Renovación", "Alegría", "Ciclo"],
    love:
      "Un vínculo puede renacer o aparecer un amor que abre una etapa. Permite que sea distinto.",
    work:
      "Un nuevo ciclo profesional o el regreso a algo que te apasiona. Empieza con gratitud.",
    health:
      "La recuperación y la renovación son favorables. Escucha los nuevos ritmos de tu cuerpo.",
    personal: "Agradece lo que termina y recibe lo que empieza sin miedo.",
    advice:
      "Celebra un cierre y escribe una intención para el nuevo ciclo. Después, da el primer paso.",
  },
];

const seriesByNumber = (number: number): CardSeries => {
  if (number <= 36) return "bastos";
  if (number <= 50) return "copas";
  if (number <= 64) return "espadas";
  return "oros";
};

export const egyptianMinors: TarotCard[] = manifest
  .filter((base) => base.category === "minor")
  .map((base) => {
    const seed = minorSeeds.find((entry) => entry.n === base.number);

    if (!seed) {
      throw new Error(`Falta el contenido del arcano menor ${base.number}`);
    }

    const series = seriesByNumber(base.number);
    const seriesData = seriesInfo[series];
    const reduced = reduceNumber(base.number);

    return {
      id: base.id,
      deckId: "tarot-egipcio",
      number: base.number,
      name: base.name,
      alternateName: base.alternateName,
      image: imageFor(base.number, base.slug),
      category: "minor",
      series,
      centralConcept: capitalize(seed.essence),
      generalMeaning: seed.general,
      message: seed.message,
      keywords: seed.keywords,
      symbolism: [
        {
          title: "La escena cotidiana",
          description:
            "En el Tarot Egipcio, los arcanos menores se leen a partir de escenas de la vida diaria. La carta invita a reconocer lo simbólico dentro de lo concreto.",
        },
        {
          title: "El nombre de la carta",
          description: `El título condensa la virtud o la situación que la lámina propone observar: ${seed.essence}.`,
        },
        {
          title: "Los tres mundos",
          description:
            "La estructura de la baraja distribuye claves de conciencia, vida terrenal y memoria en distintos niveles de la lámina. Aquí se leen como planos de interpretación.",
        },
      ],
      numerology: {
        number: base.number,
        reduced,
        title: numberTitles[reduced],
        description: `${numberDescriptions[reduced]} En esta carta, el ${base.number} reduce a ${reduced}.`,
      },
      astrology: {
        element: seriesData.element,
        description: `Correspondencia de estudio: esta carta se aproxima a la ${seriesData.label.toLowerCase()} y al elemento ${seriesData.element}, que aporta la clave de ${seriesData.theme}. En la baraja egipcia los arcanos menores no llevan palos impresos; esta serie es una herramienta didáctica.`,
        isStudyCorrespondence: true,
      },
      esoteric: [
        {
          label: "Tradición egipcia",
          value: "Arcano menor",
          description:
            "Los 56 arcanos menores de esta baraja son escenas cotidianas numeradas del 23 al 78. No se dividen en palos ni en cartas de corte como en el tarot europeo.",
        },
      ],
      spiritualPlane: `En el plano espiritual, la carta invita a comprender ${seed.essence} como una experiencia de conciencia, no solo como un resultado externo.`,
      mentalPlane: `En el plano mental, propone observar las ideas y expectativas que rodean ${seed.essence}, y detectar cuándo aparece ${seed.shadow}.`,
      materialPlane: `En lo material, se traduce en gestos concretos: ${lowerFirst(seed.advice)}`,
      uprightMeaning: `${seed.general} ${seed.message}`,
      reversedMeaning: `La energía se invierte cuando ${seed.shadow} toma el control. No se trata de un castigo, sino de una invitación a revisar el modo en que estás sosteniendo ${seed.essence}.`,
      loveMeaning: seed.love,
      workMeaning: seed.work,
      healthMeaning: seed.health,
      personalDevelopment: seed.personal,
      advice: seed.advice,
      contentStatus: "didactic",
    } as TarotCard;
  });
