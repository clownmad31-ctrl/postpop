// Page de téléchargement de PostPop : bascule français / anglais, et inscription à la liste d'attente.
// Aucun traceur, aucun cookie : seule la langue choisie est retenue, dans le navigateur du visiteur.

const CONFIG = window.POSTPOP_SITE ?? {}

const EN = {
  'nav.features': 'Features', 'nav.pricing': 'Pricing', 'nav.faq': 'FAQ', 'nav.cta': 'Save my spot',
  'hero.tag': 'For creators of Shorts and Reels',
  'hero.title': 'One video. Three networks. One click.',
  'hero.lead': 'PostPop posts your videos to YouTube, Instagram and Facebook on its own, on the day and at the time you pick. Plan your week in ten minutes, then switch off your PC.',
  'form.label': 'Your email address', 'form.placeholder': 'you@email.com', 'form.button': 'Tell me at launch',
  'form.consent': 'I agree to receive one email from PostPop at launch. Nothing else, and I can opt out any time.',
  'hero.founder': 'The first 200 sign-ups get access to the Founder offer: Pro for life for €79.',
  'trio.1.t': 'Free, for real', 'trio.1.p': 'Three networks, scheduling and stats, no credit card. Online tools often charge for each network.',
  'trio.2.t': 'Your videos stay with you', 'trio.2.p': 'PostPop runs on your PC. It sends your videos straight to YouTube, Instagram and Facebook, never through our servers: we have none.',
  'trio.3.t': 'Built by a creator', 'trio.3.p': 'I built it for my own channels, because posting the same video by hand on three networks was eating my evenings.',
  'feat.title': 'Everything you need to post without thinking about it',
  'feat.1.t': '📅 Schedule your whole week at once', 'feat.1.p': 'Drop your videos in, pick the days and times. YouTube, Instagram and Facebook publish on time, even with your computer off.',
  'feat.2.t': '📊 All your stats in one place', 'feat.2.p': 'Followers, views, likes and comments from all three networks on one screen, or network by network.',
  'feat.3.t': '🧭 An advisor that reads your numbers', 'feat.3.p': 'Your best hour, your best day, the video that took off and why. Plain sentences, with what to do next.',
  'feat.4.t': '✨ Titles and captions written by AI', 'feat.4.p': 'The AI watches your video and suggests three texts in your style, with hashtags and a first comment.',
  'feat.5.t': '💬 Automatic replies to comments', 'feat.5.p': 'PostPop replies to new comments in each person’s language, and skips insults and scams.',
  'feat.6.t': '🌍 In ten languages', 'feat.6.p': 'English, French, Spanish, Portuguese, Russian, Chinese, Hindi, Bengali, Arabic and Urdu. Switch in one click.',
  'feat.caption': 'Sample figures.',
  'price.title': 'Simple pricing', 'price.sub': 'Online tools often cost $15 to $25 a month for three networks. PostPop starts at zero.',
  'price.free.t': 'Free', 'price.free.1': 'YouTube, Instagram and Facebook on autopilot', 'price.free.2': 'TikTok in assisted mode', 'price.free.3': 'Up to 20 pending posts', 'price.free.4': 'Stats and advisor',
  'price.pro.ribbon': 'Most popular', 'price.pro.per': 'per month', 'price.pro.or': 'or €59 per year',
  'price.pro.1': 'Unlimited posts', 'price.pro.2': 'AI titles, captions and hashtags', 'price.pro.3': 'Automatic replies to comments', 'price.pro.4': 'In-depth analysis of your numbers',
  'price.founder.t': 'Founder', 'price.founder.per': 'once', 'price.founder.or': '200 spots, at launch only',
  'price.founder.1': 'Everything in Pro, for life', 'price.founder.2': 'No subscription', 'price.founder.3': 'Reserved for the waitlist',
  'faq.title': 'Frequently asked questions',
  'faq.1.q': 'Which computers does it run on?', 'faq.1.a': 'Windows 10 and Windows 11. No Mac version yet.',
  'faq.2.q': 'Does PostPop see my password?', 'faq.2.a': 'No. You sign in on the official Google and Meta pages, and PostPop only receives permission to post. You can revoke it any time.',
  'faq.3.q': 'Does my PC have to stay on?', 'faq.3.a': 'Not for YouTube and Facebook: they hold your video and publish it on time. For Instagram, a small free relay on your own Google account takes care of it.',
  'faq.4.q': 'What about TikTok?', 'faq.4.a': 'TikTok does not let a small app post for you. PostPop reminds you on time, copies your caption and opens the right page: twenty seconds by hand.',
  'faq.5.q': 'What do you do with my email?', 'faq.5.a': 'One thing only: tell you when PostPop launches. It is never sold or shared, and you can have it deleted at any time. Details are in the privacy policy.',
  'final.title': 'Get told on launch day', 'final.sub': 'One email, the day PostPop is ready to download.',
  'foot.privacy': 'Privacy policy', 'foot.api': 'PostPop uses YouTube API Services.',
  'foot.legal': 'PostPop is independent software. YouTube, Instagram, Facebook and TikTok are trademarks of their respective owners.',
}
const MESSAGES = {
  fr: { email: 'Cette adresse e-mail ne semble pas complète.', consent: 'Coche la case pour qu’on puisse t’écrire.', sending: 'Un instant…', ok: 'C’est noté ! Tu recevras un e-mail le jour du lancement.', founder: 'C’est noté, et tu fais partie des 200 premiers : l’offre Fondateur t’attend.', already: 'Tu es déjà inscrit. À très vite !', fail: 'L’inscription n’a pas pu partir. Réessaie dans un instant.', demo: 'Formulaire en démonstration : rien n’a été envoyé.', left: n => `Encore ${n} places.`, lang: 'English', download: 'Télécharger PostPop' },
  en: { email: 'This email address looks incomplete.', consent: 'Tick the box so we can write to you.', sending: 'One moment…', ok: 'Done! You will get an email on launch day.', founder: 'Done, and you are among the first 200: the Founder offer is waiting for you.', already: 'You are already on the list. See you soon!', fail: 'The sign-up could not be sent. Try again in a moment.', demo: 'Demo form: nothing was sent.', left: n => `${n} spots left.`, lang: 'Français', download: 'Download PostPop' },
}

const FR = {}
let lang = 'fr'

function apply(next) {
  lang = next === 'en' ? 'en' : 'fr'
  document.documentElement.lang = lang
  for (const el of document.querySelectorAll('[data-t]')) {
    const key = el.dataset.t
    FR[key] ??= el.textContent
    el.textContent = lang === 'en' ? (EN[key] ?? FR[key]) : FR[key]
  }
  for (const el of document.querySelectorAll('[data-tp]')) {
    const key = el.dataset.tp
    FR[key] ??= el.placeholder
    el.placeholder = lang === 'en' ? (EN[key] ?? FR[key]) : FR[key]
  }
  for (const img of document.querySelectorAll('[data-img]')) img.src = `img/${img.dataset.img}-${lang}.png`
  document.getElementById('lang').textContent = MESSAGES[lang].lang
  document.title = lang === 'en' ? 'PostPop: one video, three networks, one click' : 'PostPop : une vidéo, trois réseaux, un clic'
  try {
    localStorage.setItem('postpop-langue', lang)
  } catch {
    /* navigation privée : la langue n'est simplement pas retenue */
  }
}

async function join(form) {
  const m = MESSAGES[lang]
  const out = form.querySelector('.form-msg')
  const say = (text, cls = '') => ((out.textContent = text), (out.className = `form-msg ${cls}`))
  const email = form.email.value.trim()
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/u.test(email)) return say(m.email, 'bad'), form.email.focus()
  if (!form.consent.checked) return say(m.consent, 'bad')
  if (!CONFIG.waitlistApi) return say(m.demo, 'ok')
  const button = form.querySelector('button')
  button.disabled = true
  say(m.sending)
  try {
    // Envoi en texte simple : le service (un script Google) n'accepte pas d'autre forme depuis une page web.
    const response = await fetch(CONFIG.waitlistApi, { method: 'POST', headers: { 'content-type': 'text/plain;charset=utf-8' }, body: JSON.stringify({ action: 'waitlist_join', email, lang, consent: true, source: 'page', hp: form.site.value }) })
    const answer = await response.json()
    if (!answer.ok) throw new Error(answer.error)
    say(answer.already ? m.already : answer.founder ? m.founder : m.ok, 'ok')
    form.reset()
  } catch {
    say(m.fail, 'bad')
  }
  button.disabled = false
}

function start() {
  let saved = ''
  try {
    saved = localStorage.getItem('postpop-langue') ?? ''
  } catch {
    saved = ''
  }
  apply(saved || (navigator.language?.toLowerCase().startsWith('fr') ? 'fr' : 'en'))
  document.getElementById('lang').addEventListener('click', () => apply(lang === 'fr' ? 'en' : 'fr'))
  for (const form of document.querySelectorAll('[data-form]')) form.addEventListener('submit', e => (e.preventDefault(), void join(form)))
  if (CONFIG.legal) document.querySelector('[data-legal]').textContent = CONFIG.legal
  // Le jour du lancement : le bouton du haut mène au téléchargement.
  if (CONFIG.downloadUrl) {
    const cta = document.querySelector('.cta')
    cta.href = CONFIG.downloadUrl
    cta.removeAttribute('data-t')
    cta.textContent = MESSAGES[lang].download
  }
  // Places « Fondateur » restantes : affichées seulement quand le service répond et qu'il en reste moins de 150.
  if (CONFIG.waitlistApi) {
    fetch(CONFIG.waitlistApi)
      .then(r => r.json())
      .then(d => {
        const left = Number(d?.founderLeft)
        const el = document.querySelector('[data-left]')
        if (Number.isFinite(left) && left > 0 && left < 150) ((el.textContent = MESSAGES[lang].left(left)), (el.hidden = false))
      })
      .catch(() => {})
  }
}
start()
