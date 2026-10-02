import type { TeamMember } from '~/types'

/**
 * Single source of truth for team members.
 *
 * Previously `pages/about/index.vue` and `pages/about/[section].vue` each held their own
 * hardcoded array that disagreed on names and roles (audit H9). Both now read from here.
 *
 * `roleKey` is an i18n key rather than a literal so roles translate with the locale.
 * Names are proper nouns and stay untranslated.
 *
 * NOTE FOR THE SITE OWNER: the two previous lists conflicted. `about/index.vue` listed
 * Fode Soumah as "Chef Atelier Mobilier"; `about/[section].vue` listed
 * "M. Fodé Moussa Soumah" as "Directeur Général". The richer roles from `about/index.vue`
 * were kept and the "Directeur Général" entry dropped. Confirm the real roster here.
 */
const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 1,
    name: 'Ismael Camara',
    roleKey: 'team.roles.creativeDirector',
    image: 'https://i.pravatar.cc/300?u=amadou'
  },
  {
    id: 2,
    name: 'Ibrahima Sory Savané',
    roleKey: 'team.roles.trainingManager',
    image: 'https://i.pravatar.cc/300?u=mariama2'
  },
  {
    id: 3,
    name: 'Fode Soumah',
    roleKey: 'team.roles.furnitureLead',
    image: 'https://i.pravatar.cc/300?u=ibrahima'
  }
]

export const useTeam = () => ({
  teamMembers: TEAM_MEMBERS
})
