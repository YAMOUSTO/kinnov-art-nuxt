<template>
  <div class="team-grid">
    <article
      v-for="member in members"
      :key="member.id"
      class="team-member scroll-reveal"
    >
      <div class="team-member__image-wrapper">
        <NuxtImg
          :src="member.image"
          :alt="member.name"
          class="team-member__image"
          loading="lazy"
        />
      </div>
      <div class="team-member__content">
        <h3 class="team-member__name">
          {{ member.name }}
        </h3>
        <p class="team-member__role">
          {{ $t(member.roleKey) }}
        </p>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
import type { TeamMember } from '~/types'

withDefaults(defineProps<{
  members: TeamMember[]
}>(), {
  members: () => []
})
</script>

<style lang="scss" scoped>
.team-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: $spacing-6;

  @include respond-to('md') {
    grid-template-columns: repeat(2, 1fr);
  }

  @include respond-to('lg') {
    grid-template-columns: repeat(3, 1fr);
    gap: $spacing-8;
  }
}

.team-member {
  position: relative;
  display: flex;
  align-items: center;
  text-align: left;
  height: 100%;
  overflow: hidden;
  background-color: var(--color-surface);
  border-radius: $radius-xl;
  box-shadow: $shadow-md;
  transition: transform $transition-base $easing-in-out, box-shadow $transition-base $easing-in-out;

  &:hover {
    transform: translateY(-4px);
    box-shadow: $shadow-xl;
  }

  // Gold brand accent kept as a rule rather than the name colour: gold text on
  // --color-surface measures 2.10:1, which fails WCAG AA even at heading size.
  &::before {
    content: '';
    position: absolute;
    inset-block: 0;
    inset-inline-start: 0;
    width: 4px;
    background-color: var(--color-primary);
  }

  &__image-wrapper {
    position: relative;
    flex: 0 0 auto;
    width: 120px;
    height: 100%;
    min-height: 120px;
  }

  &__image {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__content {
    flex-grow: 1;
    padding: $spacing-4;
  }

  &__name {
    font-family: $font-heading;
    font-size: $font-size-lg;
    font-weight: $font-weight-bold;
    line-height: $line-height-tight;
    color: var(--color-text);
    margin-bottom: $spacing-1;
  }

  &__role {
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
    color: var(--color-text-muted);
  }
}
</style>
