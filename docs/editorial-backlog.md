# Revisión editorial del sitio

## Decisiones

- El Inicio funciona como carta de presentación. El contacto queda abierto a clientes y empleadores. Los proyectos y los posts aparecen antes de los servicios.
- «Sobre mí» funciona como CV web. Consulta los hechos confirmados de abajo al revisar la trayectoria o las fichas de proyectos.
- En Servicios queda un enlace a Tanques Australianos en el servicio web. El cierre invita a conversar sobre el trabajo.
- Los cuatro posts seleccionados salen primero en inglés. El contenido de las demás publicaciones queda guardado como borrador.
- Elías revisó el sitio en inglés y aprobó las cinco fichas de proyectos y los cuatro posts de esa versión.

## Hechos confirmados

- Elías empezó haciendo sitios en WordPress con un amigo. Vortex Robotics fue su primer empleador como desarrollador web. Kavak fue el segundo y la etapa en la que más creció como desarrollador.
- En Kavak fue desarrollador de NetSuite. Creó y mantuvo scripts User Event, Client, Scheduled, Portlet y RESTlet en SuiteScript. Integró sistemas, administró roles y permisos, coordinó trabajo del equipo de desarrollo y revisó código. El hito de unicornio de Kavak da contexto a esa etapa.
- Después de Kavak empezó a trabajar por su cuenta y amplió su experiencia en servidores Linux, Docker, redes, protocolos y DNS.
- El catálogo de Tanques Australianos y la red de oficina con Windows Server, VPN y acceso remoto corresponden al mismo cliente. Autosfront es un proyecto propio con datos de demostración para negocios de carros a consignación en Caracas.

## Proyectos seleccionados

| Pieza                | Trabajo incorporado                                                                                  | Pendiente para futuros tickets                                                                                                                                                                                            |
| -------------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Autosfront           | Nueva ficha bilingüe con captura del catálogo, demo y post en inglés.                                | Ampliar el caso con una decisión de implementación verificable, como el modelo de publicaciones o el flujo de consultas. Preparar la versión en español del post si se prioriza llegar a negocios de Caracas por esa vía. |
| Tanques Australianos | Caso bilingüe centrado en especificaciones, catálogo editable y cotizaciones.                        | Incorporar métricas si el cliente puede acreditar y compartir la atribución de consultas o ventas.                                                                                                                        |
| Hono Chat            | Ficha bilingüe y demo en el dominio nuevo.                                                           | Contrastar el manejo de desconexiones y los límites de las salas en memoria con el código antes de retomar su post.                                                                                                       |
| Crypto Dashboard     | Ficha bilingüe con demo en el dominio nuevo y contexto sobre pares de cotización y datos de Binance. | Documentar cómo se obtienen las series históricas y se actualizan las cotizaciones en vivo.                                                                                                                               |
| Skybound PvE         | Ficha bilingüe y enlace al post en inglés sobre el paso de multijugador a un arcade de un jugador.   | Actualizar la ficha y el post cuando cambien el modo de juego o la persistencia de puntuaciones.                                                                                                                          |

Autosfront toma el lugar de Autos Marketplace en la selección. Autos Marketplace, Solar, Carwash App, Notes AI, Corotos Store, IA Coders y Futy quedan como borradores.

## Posts seleccionados

| Pieza                  | Enfoque                                                                                                                    |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| NetSuite en Kavak      | Trabajo en equipo sobre software en producción, pruebas, rollbacks, registro en Jira y Slack, y comunicación con usuarios. |
| Skybound PvE           | Desarrollo asistido por Gemini y Codex, recorte de alcance y validación de una partida completa.                           |
| Autosfront             | Dos flujos de la demo: buscar y consultar por un carro, y gestionar publicaciones y consultas desde el panel.              |
| Linux y Windows Server | Identidades, permisos, acceso remoto y recuperación durante la renovación de una red de oficina.                           |

Los posts sobre Hono Chat, Sanity, SEO técnico, Dokploy, Omarchy, zsh, Claude Code con Obsidian y los skills de Matt Pocock quedan como borradores. También quedan en borrador los de Sanity Visual Page Builder y la versión en español de Skybound PvE.

## Rutas y publicación

- Conservar las rutas existentes de los posts que se retitularon. Si se cambia una ruta publicada en el futuro, añadir una redirección permanente y actualizar enlaces internos y alternativos de idioma.
- El sitio ya declara `eablan.dev` como dominio canónico. Las demos de Hono Chat y Crypto Dashboard pasan a los subdominios del dominio nuevo.
- Las dos nuevas rutas de proyecto son `/en/projects/autosfront` y `/es/proyectos/autosfront`. El post está en `/en/blog/building-autosfront`.
- Los posts que vuelven a borrador dejan de aparecer en los archivos y sus rutas dejan de generarse.
