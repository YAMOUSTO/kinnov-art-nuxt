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

  /**
   * Numéro lisible pour l'affichage (3 chiffres d'indicatif pays + numéro
   * national regroupé) ; '' si non configuré. Dérivé du même `number` que les
   * liens, donc l'affichage ne peut pas diverger du numéro réellement composé.
   */
  const display = !number
    ? ''
    : number.length === 12
      ? `+${number.slice(0, 3)} ${number.slice(3, 6)} ${number.slice(6, 8)} ${number.slice(8, 10)} ${number.slice(10, 12)}`
      : `+${number}`

  /** Lien `tel:` ; '' si aucun numéro n'est configuré. */
  const tel = number ? `tel:+${number}` : ''

  return { number, link, display, tel }
}
