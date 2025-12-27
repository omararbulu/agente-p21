export default async function handler(req, res) {
  // Solo permitir POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { sources, tono, extension, enfoque, password } = req.body;

    // Validar contraseña (cámbiala por la que quieras)
    const VALID_PASSWORD = process.env.APP_PASSWORD || 'peru21_2025';
    
    if (password !== VALID_PASSWORD) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    // Validar que tengamos fuentes
    if (!sources || sources.length === 0) {
      return res.status(400).json({ error: 'Debes proporcionar al menos una fuente' });
    }

    // API Key de Anthropic (desde variables de entorno)
    const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
    
    if (!ANTHROPIC_API_KEY) {
      return res.status(500).json({ error: 'API Key no configurada en el servidor' });
    }

    // Construir el prompt
    const prompt = buildPrompt(sources, tono, extension, enfoque);

    // Llamar a la API de Anthropic
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 4000,
        messages: [{
          role: 'user',
          content: prompt
        }]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Error en la API de Anthropic');
    }

    const data = await response.json();
    
    // Extraer el texto de la respuesta
    const articleText = data.content
      .filter(block => block.type === 'text')
      .map(block => block.text)
      .join('\n');

    // Devolver el artículo
    return res.status(200).json({ 
      article: articleText,
      usage: data.usage // Para tracking de costos
    });

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ 
      error: error.message || 'Error al generar el artículo' 
    });
  }
}

function buildPrompt(urls, tono, extension, enfoque) {
  const extensionMap = {
    'corta': '300-400 palabras',
    'media': '500-700 palabras',
    'larga': '800-1000 palabras'
  };

  return `Eres un redactor profesional del medio periodístico Perú21. Debes crear un artículo completo optimizado para SEO y listo para publicar.

FUENTES:
${urls.map((url, i) => `${i + 1}. ${url}`).join('\n')}

PARÁMETROS:
- Tono: ${tono}
- Extensión del cuerpo: ${extensionMap[extension]}
${enfoque ? `- Enfoque: ${enfoque}` : ''}

GENERA EL ARTÍCULO EN ESTE FORMATO EXACTO:

✅ Título (visible en la web)
[Titular impactante estilo Perú21 con MAYÚSCULAS en palabras clave. Ejemplos:
- "ADIÓS, 'TUKI TUKI': Matan a balazos a payasito en Ate"
- "¿Temes estar ahí? Crean REGISTRO NACIONAL DE INFIELES"
- "Oficializan AUMENTO DE LA UIT para el 2026: ¿Ahora cuánto valdrá?"
Máximo 15 palabras, SIN punto final, debe generar curiosidad y urgencia]

✅ Título SEO (máx. 60 caracteres, incluye palabra clave)
[Versión optimizada para buscadores, más natural, con palabras clave que la gente buscaría en Google. Ejemplos:
- Titular web: "ADIÓS, 'TUKI TUKI': Matan a balazos a payasito en Ate"
  SEO: "Asesinan a payasito Tuki Tuki en Ate: detalles"
- Titular web: "Oficializan AUMENTO DE LA UIT para el 2026: ¿Ahora cuánto valdrá?"
  SEO: "UIT 2026: nuevo valor y cómo te afecta"]

✅ Entradilla (resumen breve, visible en la nota)
[Lead de 1-2 oraciones con lo MÁS importante. Datos concretos: nombres completos, cifras exactas, lugares específicos, horarios. Responde: ¿Quién? ¿Qué? ¿Cuándo? ¿Dónde? Tono directo.]

✅ Descripción SEO (máx. 155 caracteres)
[Meta descripción para Google. Incluye: gancho + dato clave + beneficio para el lector. Debe incentivar el clic.]

✅ Cuerpo (estructura periodística)
[Desarrollo completo con estas características:

ESTRUCTURA:
- Subtítulos descriptivos en negritas para cada sección
- Párrafos MUY cortos: 2-4 oraciones máximo
- Usa viñetas (*) cuando enumeres puntos
- Una línea en blanco entre párrafos y secciones

ESTILO:
- Lenguaje directo y coloquial peruano
- Nombres importantes en **negritas**
- Cifras exactas en **negritas**
- Citas textuales de autoridades cuando estén disponibles
- Detalles específicos: edades, direcciones, horarios
- Contexto local relevante para peruanos

CONTENIDO:
1. Amplía la información de la entradilla
2. Desarrollo por secciones temáticas con subtítulos
3. Contexto y antecedentes relevantes
4. Declaraciones de fuentes (si aplica)
5. Impacto o consecuencias
6. Cierre con proyección o pregunta final

Ejemplo de formato del cuerpo:
**Subtítulo de la primera sección**
Texto del primer párrafo con información relevante. Incluye **datos importantes en negritas**.

Segunda oración del párrafo complementando la información.

**Segundo subtítulo**
Nuevo párrafo sobre otro aspecto. Cuando hay listas:
* Primer punto importante
* Segundo punto relevante
* Tercer punto clave

**Tercer subtítulo**
Continuación con más detalles...

**¿Qué sigue?** o **Conclusión**
Cierre con proyección o dato final.]

✅ Etiquetas sugeridas
[3-5 palabras clave separadas por comas. Incluye: tema principal, nombres relevantes, ubicación, conceptos clave]

REGLAS CRÍTICAS:
✅ TODO 100% parafraseado (máximo 5-7 palabras literales seguidas de las fuentes)
✅ Estilo Perú21: directo, impactante, cercano al lector peruano
✅ Títulos optimizados para CTR y SEO
✅ Datos verificables y coherentes entre fuentes
✅ Citas apropiadas: "según [medio]", "informó [entidad]", "de acuerdo con..."

NO incluyas ningún texto adicional, SOLO el formato solicitado con los checkmarks ✅`;
}
