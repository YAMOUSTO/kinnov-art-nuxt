/**
 * Le site n'a pas de backend : WhatsApp est le moyen le plus direct pour un
 * visiteur de joindre l'atelier (message pré-rempli envoyé depuis son
 * application, sans formulaire serveur).
 *
 * Le numéro vit dans `runtimeConfig.public.whatsapp` (format international, sans
 * « + » ni espaces, requis par les liens wa.me) et peut être surchargé par
 * déploiement via `NUXT_PUBLIC_WHATSAPP`.
 */
export const useWhatsapp = () => {
  const config = useRuntimeConfig()
  const number = String(config.public.whatsapp || '').replace(/\D/g, '')

  /** Construit un lien wa.me ; renvoie '' si aucun numéro n'est configuré. */
  const link = (text = '') =>
    number ? `https://wa.me/${number}${text ? `?text=${encodeURIComponent(text)}` : ''}` : ''

  return { number, link }
}
