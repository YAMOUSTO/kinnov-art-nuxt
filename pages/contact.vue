<template>
  <div class="contact-page">
    <Section bg="primary" padding="md">
      <div class="text-center">
        <h1 class="page-title page-title--accent">{{ $t('contact.title') }}</h1>
        <p class="page-subtitle page-subtitle--light">{{ $t('contact.subtitle') }}</p>
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

            <Button type="submit" variant="secondary" size="lg" block>
              {{ $t('contact.send') }}
            </Button>
            <p v-if="submitError" class="form-error" role="alert">{{ submitError }}</p>
            <p v-if="submitSuccess" class="form-success">{{ $t('contact.successMessage') }}</p>
          </form>
        </div>
      </div>
    </Section>

    <!-- Map Section -->
    <Section bg="gray" padding="none">
      <LocationMap />
    </Section>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const { t } = useI18n()

const CONTACT_EMAIL = 'contact@kinnovart.com'
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const form = reactive({
  name: '',
  email: '',
  message: ''
})

const submitSuccess = ref(false)
const submitError = ref('')

const handleSubmit = () => {
  submitSuccess.value = false
  submitError.value = ''

  const name = form.name.trim()
  const email = form.email.trim()
  const message = form.message.trim()

  if (!name || !email || !message) {
    submitError.value = t('contact.errorEmpty')
    return
  }

  if (!EMAIL_PATTERN.test(email)) {
    submitError.value = t('contact.errorEmail')
    return
  }

  const subject = t('contact.mailSubject', { name })
  const body = `${message}\n\n---\n${t('contact.mailFrom')}: ${name}\n${t('contact.email')}: ${email}`

  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

  form.name = ''
  form.email = ''
  form.message = ''

  submitSuccess.value = true
  setTimeout(() => { submitSuccess.value = false }, 8000)
}

useHead(() => ({
  title: t('pageMeta.contact.title'),
  meta: [{ name: 'description', content: t('pageMeta.contact.description') }]
}))
</script>

<style lang="scss" scoped>
.page-title {
  font-size: $font-size-4xl;
  font-weight: $font-weight-bold;
  margin-bottom: $spacing-4;

  @include respond-to('md') {
    font-size: $font-size-5xl;
  }

  &--accent {
    color: var(--color-accent);
  }
}

.page-subtitle {
  font-size: $font-size-lg;
  max-width: 700px;
  margin: 0 auto;

  @include respond-to('md') {
    font-size: $font-size-xl;
  }

  &--light {
    color: rgba(255, 255, 255, 0.9);
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
  background-color: color-mix(in srgb, var(--color-accent) 20%, transparent);
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

.form-success {
  margin-top: $spacing-4;
  padding: $spacing-3 $spacing-4;
  background-color: rgba(34, 197, 94, 0.1);
  color: #16a34a;
  border: 1px solid rgba(34, 197, 94, 0.3);
  border-radius: $radius-md;
  font-size: $font-size-sm;
  font-weight: $font-weight-medium;
  text-align: center;
}

.form-error {
  margin-top: $spacing-4;
  padding: $spacing-3 $spacing-4;
  background-color: rgba(220, 38, 38, 0.1);
  color: $color-accent;
  border: 1px solid rgba(220, 38, 38, 0.3);
  border-radius: $radius-md;
  font-size: $font-size-sm;
  font-weight: $font-weight-medium;
  text-align: center;
}


</style>
