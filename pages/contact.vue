<template>
  <div class="contact-page">
    <Section bg="primary" padding="md">
      <div class="text-center">
        <h1 class="page-title" style="color: var(--color-accent);">{{ $t('contact.title') }}</h1>
        <p class="page-subtitle" style="color: rgba(255, 255, 255, 0.9);">{{ $t('contact.subtitle') }}</p>
      </div>
    </Section>

    <Section bg="white">
      <div class="contact-grid">
        <!-- Contact Info -->
        <div class="contact-info scroll-reveal">
          <div class="info-item">
            <div class="info-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div>
              <h3 class="info-title">{{ $t('contact.location') }}</h3>
              <p class="info-text">{{ $t('contact.locationDetails') }}</p>
            </div>
          </div>

          <div class="info-item">
            <div class="info-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div>
              <h3 class="info-title">{{ $t('contact.directEmail') }}</h3>
              <p class="info-text">
                <a href="mailto:contact@kinnovart.com">contact@kinnovart.com</a>
              </p>
            </div>
          </div>

          <div class="info-item">
            <div class="info-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div>
              <h3 class="info-title">{{ $t('contact.phone') }}</h3>
              <p class="info-text">
                <a href="tel:+224621000000">+224 621 00 00 00</a>
              </p>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="contact-form scroll-reveal">
          <form @submit.prevent="handleSubmit">
            <div class="form-group">
              <label for="name">{{ $t('contact.name') }}</label>
              <input 
                type="text" 
                id="name"
                v-model="form.name"
                required
              />
            </div>

            <div class="form-group">
              <label for="email">{{ $t('contact.email') }}</label>
              <input 
                type="email" 
                id="email"
                v-model="form.email"
                required
              />
            </div>

            <div class="form-group">
              <label for="message">{{ $t('contact.message') }}</label>
              <textarea 
                id="message"
                v-model="form.message"
                rows="5"
                required
              ></textarea>
            </div>

            <Button type="submit" variant="secondary" size="lg" block :loading="isSubmitting">
              {{ $t('contact.send') }}
            </Button>
          </form>
        </div>
      </div>
    </Section>

    <!-- Map Section -->
    <Section bg="gray" padding="none">
      <div class="map-section">
        <NuxtImg 
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1920"
          alt="Map"
          class="map-bg"
        />
        <div class="map-overlay">
          <div class="map-marker">
            <div class="marker-pin">📍</div>
            <span class="marker-text">Kinnov'art Nongo</span>
          </div>
        </div>
      </div>
    </Section>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const form = reactive({
  name: '',
  email: '',
  message: ''
})

const isSubmitting = ref(false)

const handleSubmit = async () => {
  isSubmitting.value = true
  
  // Simulate form submission
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  console.log('Form submitted:', form)
  
  // Reset form
  form.name = ''
  form.email = ''
  form.message = ''
  
  isSubmitting.value = false
  
  alert('Message envoyé avec succès!')
}

useHead({
  title: 'Contact - Kinnov\'art',
  meta: [
    { name: 'description', content: 'Contactez Kinnov\'art à Nongo, Conakry' }
  ]
})
</script>

<style lang="scss" scoped>
.page-title {
  font-size: $font-size-4xl;
  font-weight: $font-weight-bold;
  margin-bottom: $spacing-4;

  @include respond-to('md') {
    font-size: $font-size-5xl;
  }
}

.page-subtitle {
  font-size: $font-size-lg;
  max-width: 700px;
  margin: 0 auto;

  @include respond-to('md') {
    font-size: $font-size-xl;
  }
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: $spacing-12;

  @include respond-to('lg') {
    grid-template-columns: 1fr 1.5fr;
  }
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: $spacing-8;
}

.info-item {
  display: flex;
  gap: $spacing-4;
}

.info-icon {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  @include flex-center;
  background-color: rgba($color-accent, 0.2);
  color: $color-primary;
  border-radius: $radius-lg;
}

.info-title {
  font-family: $font-heading;
  font-size: $font-size-sm;
  font-weight: $font-weight-bold;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: $color-primary;
  margin-bottom: $spacing-2;
}

.info-text {
  font-size: $font-size-base;
  color: $color-gray-700;
  line-height: $line-height-relaxed;

  a {
    color: $color-secondary;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}

.contact-form {
  background-color: $color-gray-100;
  padding: $spacing-8;
  border-radius: $radius-2xl;
  box-shadow: $shadow-lg;
}

.form-group {
  margin-bottom: $spacing-6;

  label {
    display: block;
    font-family: $font-heading;
    font-size: $font-size-xs;
    font-weight: $font-weight-bold;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: $color-primary;
    margin-bottom: $spacing-2;
  }

  input,
  textarea {
    width: 100%;
  }
}

.map-section {
  position: relative;
  height: 400px;
  overflow: hidden;
}

.map-bg {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(0.5);
}

.map-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  @include flex-center;
}

.map-marker {
  text-align: center;
  animation: bounce 2s infinite;
}

.marker-pin {
  font-size: $font-size-5xl;
  filter: drop-shadow(0 4px 8px rgba($color-black, 0.3));
}

.marker-text {
  display: block;
  margin-top: $spacing-2;
  padding: $spacing-3 $spacing-6;
  background-color: $color-white;
  color: $color-primary;
  font-family: $font-heading;
  font-size: $font-size-base;
  font-weight: $font-weight-bold;
  text-transform: uppercase;
  border-radius: $radius-lg;
  box-shadow: $shadow-xl;
}
</style>
