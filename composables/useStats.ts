/**
 * Chiffres clés de la page d'accueil (bloc de la section « Kinnov'art »).
 *
 * IMPORTANT : aucun chiffre n'est inventé. Chaque `value` est un placeholder
 * « À confirmer » que le propriétaire doit remplacer par le chiffre réel avant
 * la mise en ligne.
 *
 * Les libellés vivent dans les fichiers de locale (`home.stats.*`, FR + EN) pour
 * rester traduisibles ; seul le chiffre est stocké ici.
 */

export interface HomeStat {
  /** Clé i18n du libellé, ex. `home.stats.clips`. */
  labelKey: string
  /** Valeur affichée (placeholder tant que le propriétaire n'a pas fourni le chiffre). */
  value: string
}

export const useStats = (): { stats: HomeStat[] } => ({
  stats: [
    // TODO propriétaire : remplacer « À confirmer » par le nombre de clips réalisés.
    { labelKey: 'home.stats.clips', value: 'À confirmer' },
    // TODO propriétaire : remplacer « À confirmer » par le nombre d'années d'activité.
    { labelKey: 'home.stats.years', value: 'À confirmer' },
    // TODO propriétaire : remplacer « À confirmer » par le nombre de jeunes formés.
    { labelKey: 'home.stats.trained', value: 'À confirmer' }
  ]
})
