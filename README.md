# Allan Pizza - Guía de Instalación

## Comandos de Instalación

### 3. Instalar dependencias principales

```shellscript
npm install lucide-react clsx tailwind-merge class-variance-authority tailwindcss-animate
```

### 4. Instalar shadcn/ui CLI

```shellscript
npm install -D @shadcn/ui
```

### 5. Inicializar shadcn/uinpm uninstall date-fns
npm install date-fns@3.6.0 --legacy-peer-deps

```shellscript
npx shadcn@latest init
```

Configuración recomendada:

- Estilo: Default
- Base color: Slate
- Radius global: 0.5rem
- Color para el tema oscuro: Sí
- Ruta de componentes: @/components
- Ruta de utilidades: @/lib/utils
- Prefijo de CSS: (deja en blanco)
- Ruta de CSS: app/globals.css
- Incluir reset CSS: Sí


### 6. Instalar componentes de shadcn/ui

```shellscript
npx shadcn@latest add button input label textarea toast skeleton tabs radio-group
```

### 7. Instalar dependencias de Radix UI

```shellscript
npm install @radix-ui/react-slot @radix-ui/react-tabs @radix-ui/react-radio-group @radix-ui/react-toast @radix-ui/react-label @radix-ui/react-dialog --legacy-peer-deps
```

### 8. Crear estructura de directorios

```shellscript
mkdir -p app/login app/registro app/carrito app/checkout components context services lib public
```

### 9. Configurar variables de entorno

Crear archivo `.env.local`:

```shellscript
echo "NEXT_PUBLIC_API_URL=http://localhost:3001/api" > .env.local
```

### 10. Descargar imágenes

```shellscript
mkdir -p public
curl -o public/familiar-pizza-combo.png https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/familiar-pizza-combo-7d7J4Zwq5LpNoyKTwkYCJMtNgL8EXQ.png
curl -o public/pizzeria-logo-black-background.png https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/pizzeria-logo-black-background-eW7o1XjIzhQaSSaDCUEXWRsKm5ek4n.png
curl -o public/pizza-flute-cheese-mushrooms.png https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/pizza-flute-cheese-mushrooms-gCoQcanDlrDEFLnvXVO5YMBX62tXDK.png
```

### 11. Ejecutar el proyecto

```shellscript
npm run dev
```

## Lista completa de dependencias

```json
{
  "dependencies": {
    "@radix-ui/react-dialog": "^1.0.5",
    "@radix-ui/react-label": "^2.0.2",
    "@radix-ui/react-radio-group": "^1.1.3",
    "@radix-ui/react-slot": "^1.0.2",
    "@radix-ui/react-tabs": "^1.0.4",
    "@radix-ui/react-toast": "^1.1.5",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "lucide-react": "^0.363.0",
    "next": "14.2.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "tailwind-merge": "^2.2.2",
    "tailwindcss-animate": "^1.0.7"
  },
  "devDependencies": {
    "@shadcn/ui": "^0.0.4",
    "@types/node": "^20.11.30",
    "@types/react": "^18.2.67",
    "@types/react-dom": "^18.2.22",
    "autoprefixer": "^10.4.19",
    "eslint": "^8.57.0",
    "eslint-config-next": "14.2.0",
    "postcss": "^8.4.38",
    "tailwindcss": "^3.4.1",
    "typescript": "^5.4.5"
  }
}
```

## Solución de problemas comunes

### Error de dependencias

Si encuentras errores de dependencias, usa:

```shellscript
npm install --legacy-peer-deps
```

### Error con date-fns

Si hay conflicto con date-fns:

```shellscript
npm uninstall date-fns
npm install date-fns@3.0.0 --legacy-peer-deps
```
