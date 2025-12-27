# 🚀 Agente Redactor Perú21 Pro

Aplicación profesional para generar artículos periodísticos optimizados para SEO con el estilo de Perú21.

## ✨ Características

- ✅ **Backend seguro** - API key protegida en el servidor
- ✅ **Autenticación simple** - Contraseña de equipo
- ✅ **Optimizado para SEO** - Genera títulos, meta descripciones y contenido optimizado
- ✅ **Estilo Perú21 auténtico** - Titulares impactantes, párrafos cortos, lenguaje directo
- ✅ **Sin costos de hosting** - Gratis en Vercel

## 📦 Despliegue en Vercel

### Opción 1: Despliegue con CLI (Recomendado)

1. **Instala Vercel CLI**
```bash
npm i -g vercel
```

2. **Ve a la carpeta del proyecto**
```bash
cd agente-peru21-pro
```

3. **Inicia sesión en Vercel**
```bash
vercel login
```

4. **Despliega**
```bash
vercel
```

5. **Configura las variables de entorno** cuando te lo pida:
   - `ANTHROPIC_API_KEY`: Tu API key de Anthropic (obtener en https://console.anthropic.com)
   - `APP_PASSWORD`: La contraseña que usará tu equipo (ej: `peru21_2025`)

6. **¡Listo!** Vercel te dará una URL como `https://agente-peru21-pro.vercel.app`

### Opción 2: Despliegue con GitHub

1. **Sube el proyecto a GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/agente-peru21-pro.git
git push -u origin main
```

2. **Ve a Vercel.com**
   - Clic en "New Project"
   - Importa tu repositorio de GitHub
   - Vercel detectará automáticamente la configuración

3. **Configura las variables de entorno**
   - En el dashboard de Vercel → Settings → Environment Variables
   - Agrega:
     - `ANTHROPIC_API_KEY`: sk-ant-api03-xxxxx...
     - `APP_PASSWORD`: peru21_2025 (o la que prefieras)

4. **Despliega**
   - Clic en "Deploy"
   - ¡Listo en menos de 1 minuto!

## 🔐 Configuración de Seguridad

### Variables de Entorno

En Vercel, ve a **Settings → Environment Variables** y agrega:

| Variable | Valor | Descripción |
|----------|-------|-------------|
| `ANTHROPIC_API_KEY` | `sk-ant-api03-...` | Tu API key de Anthropic |
| `APP_PASSWORD` | `peru21_2025` | Contraseña de acceso para el equipo |

### Cambiar la Contraseña

Para cambiar la contraseña del equipo:
1. Ve a Vercel → Tu proyecto → Settings → Environment Variables
2. Edita `APP_PASSWORD`
3. Guarda y redespliega

## 📝 Uso de la Aplicación

1. **Abre la URL** de tu despliegue
2. **Ingresa la contraseña** de acceso
3. **Agrega URLs** de noticias como fuentes
4. **Configura** tono y extensión
5. **Genera** el artículo
6. **Copia** o descarga el resultado

## 💰 Costos

### Vercel (Hosting)
- ✅ **GRATIS** en el plan gratuito
- Límites generosos para equipos pequeños

### Anthropic API
- ~$0.01 - $0.03 por artículo generado
- $5 de crédito gratis al registrarte
- Monitorea uso en: https://console.anthropic.com

## 🔄 Actualizar la Aplicación

### Con GitHub
1. Edita los archivos en tu repositorio
2. Haz commit y push
3. Vercel redespliega automáticamente

### Con CLI
```bash
vercel --prod
```

## 🛠️ Desarrollo Local

1. **Instala dependencias**
```bash
npm install vercel -g
```

2. **Crea .env.local**
```bash
cp .env.example .env.local
```

3. **Edita .env.local** con tus credenciales

4. **Ejecuta en desarrollo**
```bash
vercel dev
```

5. **Abre** http://localhost:3000

## 📧 Soporte

Si tienes problemas:
1. Revisa que las variables de entorno estén bien configuradas
2. Verifica que tu API key de Anthropic sea válida
3. Checa los logs en Vercel → Tu proyecto → Deployments → View Function Logs

## 🔒 Seguridad

- ✅ API key nunca se expone al cliente
- ✅ Todas las peticiones pasan por el backend
- ✅ Autenticación con contraseña
- ✅ HTTPS automático en Vercel

## 📄 Licencia

Uso interno de Perú21.
