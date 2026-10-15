/**
 * Chiffres clés de la page d'accueil (bloc de la section « Kinnov'art »).
 *
 * Les chiffres ci-dessous viennent du propriétaire :
 *   - 18 clips réalisés (liste des artistes et titres fournie par le
 *     propriétaire, voir `home.testimonials` dans les fichiers de locale) ;
 *   - activité depuis 2020 (année de création) → le nombre d'années est calculé
 *     automatiquement, il n'a donc pas besoin d'être mis à jour chaque année ;
 *   - plus de 200 jeunes formés.
 *
 * Les libellés vivent dans les fichiers de locale (`home.stats.*`, FR + EN) pour
 * rester traduisibles ; seul le chiffre est stocké ici.
 */

export interface HomeStat {
  /** Clé i18n du libellé, ex. `home.stats.clips`. */
  labelKey: string
  /** Valeur affichée (fournie par le propriétaire). */
  value: string
}

/** Année de création de l'atelier — sert à calculer les années d'activité. */
const FOUNDED_YEAR = 2020

export const useStats = (): { stats: HomeStat[] } => ({
  stats: [
    // 18 clips produits pour les artistes listés par le propriétaire.
    { labelKey: 'home.stats.clips', value: '18' },
    // « Années d'activité » : dérivé de 2020, donc toujours à jour.
    { labelKey: 'home.stats.years', value: String(new Date().getFullYear() - FOUNDED_YEAR) },
    // « plus de 200 jeunes formés ».
    { labelKey: 'home.stats.trained', value: '200+' }
  ]
})
