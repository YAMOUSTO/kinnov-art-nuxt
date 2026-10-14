<template>
  <div class="contact-page">
    <PageHeader
      bg="primary"
      image="/images/webp/jaunefonce-1600.webp"
      :title="$t('contact.title')"
      :subtitle="$t('contact.subtitle')"
    />

    <Section bg="white">
      <div class="contact-grid">
        <!-- Contact Info -->
        <div class="contact-info scroll-reveal">
          <div class="info-item">
            <div class="info-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
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
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div>
              <h3 class="info-title">{{ $t('contact.directEmail') }}</h3>
              <p class="info-text">
                <a :href="`mailto:${config.public.contactEmail}`">{{ config.public.contactEmail }}</a>
              </p>
            </div>
          </div>

          <div v-if="whatsappDisplay" class="info-item">
            <div class="info-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
                <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div>
              <h3 class="info-title">{{ $t('contact.phone') }}</h3>
              <p class="info-text">
                <a :href="whatsappTel">{{ whatsappDisplay }}</a>
              </p>
            </div>
          </div>

          <div v-if="whatsappDisplay" class="info-item">
            <div class="info-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>
            <div>
              <h3 class="info-title">{{ $t('contact.whatsapp') }}</h3>
              <p class="info-text">
                <a :href="whatsappHref" target="_blank" rel="noopener noreferrer">
                  {{ whatsappDisplay }}
                </a>
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
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
                class="form-submit__icon"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              {{ $t('contact.sendWhatsapp') }}
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
import { ref, reactive, computed } from 'vue'

const { t } = useI18n()
const { link: whatsappLink, display: whatsappDisplay, tel: whatsappTel } = useWhatsapp()
const config = useRuntimeConfig()

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const form = reactive({
  name: '',
  email: '',
  message: ''
})

const submitSuccess = ref(false)
const submitError = ref('')

// Lien « discuter » de la colonne infos (message générique).
const whatsappHref = computed(() => whatsappLink(t('contact.whatsappMessage')))

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

  // Le site n'a pas de backend : le formulaire ouvre WhatsApp avec le message
  // déjà rédigé, que le visiteur envoie depuis son application. Repli sur le
  // client mail si aucun numéro WhatsApp n'est configuré.
  const whatsappUrl = whatsappLink(
    [
      t('contact.whatsappIntro', { name }),
      '',
      message,
      '',
      `${t('contact.email')}: ${email}`
    ].join('\n')
  )

  if (whatsappUrl) {
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
  } else {
    const subject = t('contact.mailSubject', { name })
    const body = `${message}\n\n---\n${t('contact.mailFrom')}: ${name}\n${t('contact.email')}: ${email}`
    window.location.href = `mailto:${config.public.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  form.name = ''
  form.email = ''
  form.message = ''

  submitSuccess.value = true
  setTimeout(() => { submitSuccess.value = false }, 8000)
}

usePageSeo({
  titleKey: 'pageMeta.contact.title',
  descriptionKey: 'pageMeta.contact.description',
  image: '/og/og-contact.jpg'
})
</script>

<style lang="scss" scoped>
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
  color: var(--color-primary-text);
  border-radius: $radius-lg;
}

.info-title {
  font-family: $font-heading;
  font-size: $font-size-sm;
  font-weight: $font-weight-bold;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-primary-text);
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
    color: var(--color-primary-text);
    margin-bottom: $spacing-2;
  }

  input,
  textarea {
    width: 100%;
  }
}

.form-submit__icon {
  margin-right: $spacing-2;
  vertical-align: middle;
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
