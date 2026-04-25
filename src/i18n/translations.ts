// ─── Translation dictionary ───────────────────────────────────────────────────
// All UI strings live here. Add new language keys by extending the `langs` object.
// Components import `useT()` and access strings by key — no hardcoded text in JSX.

export type Lang = 'ms' | 'en'

const langs = {
  ms: {
    // ── App shell ──────────────────────────────────────────────────────────────
    cordiallyInvited: 'Dengan segala hormat, kami menjemput anda ke majlis perkahwinan',
    dateLocation: '28 · 12 · 2026 · Brunei Darussalam',
    langToggle: 'EN',
    langLabel: 'BM',

    // ── Envelope ──────────────────────────────────────────────────────────────
    tapToOpen: 'tekan untuk buka',

    // ── Card labels (scattered layout) ────────────────────────────────────────
    cardLabel_hero: 'Jemptulan Majlis',
    cardLabel_story: 'Kisah Kami',
    cardLabel_details: 'Butiran Majlis',
    cardLabel_dresscode: 'Kod Pakaian',
    cardLabel_greeting: 'Ucapan',
    cardLabel_rsvp: 'RSVP',
    cardClickHint: 'klik untuk lihat →',

    // ── Hero card ─────────────────────────────────────────────────────────────
    hero_salutation: "ASSALAMU'ALAIKUM WR. WB.",
    hero_grace: 'Dengan izin Allah S.W.T dan rahmatnya, kami:',
    hero_parents: [
      'Pengiran Haji Mohamad Jaludin bin Pengiran Haji Puteh',
      'Dayang Masdiah binti Awang Haji Tuah',
      'Nik Joharris bin Nik Ahmad',
      'Nerisa binti Nawi',
    ],
    hero_invite:
      'Dengan segala hormat dan takzim sukacita menjunjung Pengiran berangkat / mempersilakan Pehin / Tan Sri / Puan Sri / Dato / Datin / Awang / Dayang / Tuan / Puan / Encik dan Cik untuk hadir ke Majlis-Majlis bagi anakanda kami:',
    hero_bride: 'Dayangku Izyan Naqiyah Pengiran binti Haji Mohd Jaludin',
    hero_groom: 'Nik Adam Danish bin Nik Joharris',
    hero_date: 'Isnin, 28 Disember 2026',
    // kept for cards that still reference these
    hero_subtitle: 'Bersama keluarga kami',
    hero_quote: '"Dari saat ini, kami melangkah bersama sebagai suami dan isteri."',

    // ── Our Story card ────────────────────────────────────────────────────────
    story_subtitle: 'Bagaimana segalanya bermula',
    story_heading: 'Kisah Kami',
    story_events: [
      {
        year: '2019',
        title: 'Pertemuan Pertama',
        description:
          'Pertemuan kebetulan yang telah ditakdirkan — Izyan dan Adam mula mengenali antara satu sama lain, dan seolah-olah alam semesta telah merancangnya.',
      },
      {
        year: '2021',
        title: 'Ikatan Persahabatan',
        description:
          'Perbualan tanpa henti, tawa yang bersama, dan kesedaran bahawa masa berlalu begitu berbeza apabila kita bersama orang yang tepat.',
      },
      {
        year: '2024',
        title: 'Lamaran',
        description:
          'Dengan restu keluarga dan niat yang tulus, Adam melamar Izyan — memulakan babak baharu yang paling indah dalam hidup mereka.',
      },
      {
        year: '2026',
        title: 'Permulaan Abadi',
        description:
          'Dan kini, dikelilingi oleh mereka yang dikasihi, Izyan dan Adam melangkah bersama menuju kehidupan baharu yang diberkati.',
      },
    ],

    // ── Event Details card ────────────────────────────────────────────────────
    details_subtitle: 'Tandakan di kalendar anda',
    details_heading: 'Butiran Majlis',
    details_countdownLabel: 'Masa tinggal',
    details_expired: 'Majlis telah bermula',
    details_today: 'Hari ini!',
    details_units: { days: 'Hari', hours: 'Jam', minutes: 'Minit', seconds: 'Saat' },
    details_scheduleHeading: 'Aturcara Majlis',
    details_events: [
      {
        icon: '🌹',
        title: 'Majlis Bersanding',
        isoDate: '2026-12-28T10:00:00',
        date: 'Isnin, 28 Disember 2026M / 18 Rejab 1448H',
        time: 'Ketibaan Tetamu & Jemputan',
        venue: 'Tarindak D\u2019Polo, Royal Berkshire Hall',
        address: 'Jerudong Park Polo & Riding Park, Kg. Jerudong, BG3122, Brunei Darussalam',
        schedule: [
          'Menerima Jemputan',
          'Majlis Persandingan',
          'Bacaan Doa Selamat',
          'Menikmati Jamuan'
        ],
      },
    ],

    // ── Dress Code card ───────────────────────────────────────────────────────
    dresscode_subtitle: 'Berpakaian untuk meraikan',
    dresscode_heading: 'Kod Pakaian',
    dresscode_items: [
      {
        event: 'Majlis Akad Nikah',
        for: 'Wanita',
        suggestion: 'Pakaian formal sopan — abaya, salwar kameez, atau gaun elegant. Tudung amat digalakkan.',
        avoid: 'Elakkan pakaian tanpa lengan, hemline pendek, atau warna neon terang.',
        emoji: '🌷',
        palette: ['#E8D5C4', '#C4B5A5', '#8B7355'],
      },
      {
        event: 'Majlis Akad Nikah',
        for: 'Lelaki',
        suggestion: 'Kurta-pyjama, sherwani formal, atau pakaian barat yang kemas.',
        avoid: 'Sila elakkan seluar pendek atau pakaian kasual.',
        emoji: '🕌',
        palette: ['#3D3530', '#6B5C50', '#9B8B7E'],
      },
      {
        event: 'Majlis Walimah',
        for: 'Wanita',
        suggestion: 'Lehenga, sari, gaun formal atau anarkali elegant dalam warna permata yang lembut.',
        avoid: '',
        emoji: '✨',
        palette: ['#D4A8C7', '#B8849E', '#8B5B77'],
      },
      {
        event: 'Majlis Walimah',
        for: 'Lelaki',
        suggestion: 'Sherwani, sut formal atau bandhgala. Warna navy, gading, dan biru tua digalakkan.',
        avoid: '',
        emoji: '🎩',
        palette: ['#1A2B5C', '#2D4A8A', '#4B6CB7'],
      },
    ],

    // ── Greeting card ─────────────────────────────────────────────────────────
    greeting_subtitle: 'Daripada orang-orang tersayang',
    greeting_heading: 'Ucapan & Doa Restu',
    greeting_from: 'Daripada',
    greeting_wish_label: 'wish',
    greeting_divider: 'Tinggalkan ucapan',
    greeting_toast: '✨ Ucapan anda telah ditambah — terima kasih!',
    greeting_namePlaceholder: 'Nama anda',
    greeting_messagePlaceholder: 'Tuliskan ucapan perkahwinan untuk pasangan…',
    greeting_submit: 'Hantar Ucapan 💌',
    greeting_counter: (cur: number, total: number) => `${cur} daripada ${total} ucapan`,
    greeting_prev: 'Sebelumnya',
    greeting_next: 'Seterusnya',
    greeting_initial: [
      {
        id: 'seed-1',
        name: 'Keluarga Pengiran Jaludin',
        message:
          'Semoga Allah memberkati perkahwinan Izyan dan Adam dengan cinta yang tidak terhingga, kesabaran, dan kebahagiaan abadi. MashaAllah! 🤲',
      },
      {
        id: 'seed-2',
        name: 'Keluarga Nik Joharris',
        message:
          'Semoga Izyan dan Adam sentiasa bahagia, penuh tawa, dan diberkati dengan kenangan indah bersama. Rumah tangga yang sakinah, mawaddah, wa rahmah. 💕',
      },
      {
        id: 'seed-3',
        name: 'Rakan-Rakan Tersayang',
        message:
          'Izyan & Adam, kalian sungguh serasi! Tak sabar untuk meraikan bersama di Majlis Bersanding. Penuh kasih sayang untuk kalian berdua. 🎉',
      },
    ],

    // ── RSVP card ─────────────────────────────────────────────────────────────
    rsvp_subtitle: 'Sila sahkan kehadiran',
    rsvp_heading: 'RSVP',
    rsvp_deadline: 'Sila balas sebelum 1 Disember 2026',
    rsvp_labelName: 'Nama Penuh',
    rsvp_labelEmail: 'E-mel',
    rsvp_labelAttending: 'Adakah anda hadir?',
    rsvp_labelGuests: 'Bilangan tetamu (termasuk anda)',
    rsvp_labelDietary: 'Keperluan Pemakanan',
    rsvp_labelMessage: 'Mesej untuk Izyan & Adam (pilihan)',
    rsvp_placeholderName: 'Nama penuh anda',
    rsvp_placeholderDietary: 'cth. vegetarian, alahan kacang…',
    rsvp_placeholderMessage: 'Kongsi ucapan anda…',
    rsvp_accept: '✓ Dengan gembira hadir',
    rsvp_decline: '✗ Dengan rasa kesal tidak dapat hadir',
    rsvp_guestSingular: 'tetamu',
    rsvp_guestPlural: 'tetamu',
    rsvp_submit: 'Hantar RSVP 💌',
    rsvp_thankYou: (name: string) => `Terima kasih, ${name}!`,
    rsvp_confirmYes: 'Kami tidak sabar untuk meraikan bersama anda. Jumpa pada 28 Disember 2026! 🎉',
    rsvp_confirmNo: 'Kami faham dan akan merindui kehadiran anda. Terima kasih kerana memaklumkan.',
  },

  en: {
    // ── App shell ──────────────────────────────────────────────────────────────
    cordiallyInvited: 'You are cordially invited to the wedding of',
    dateLocation: '28 · 12 · 2026 · Brunei Darussalam',
    langToggle: 'BM',
    langLabel: 'EN',

    // ── Envelope ──────────────────────────────────────────────────────────────
    tapToOpen: 'tap to open',

    // ── Card labels ───────────────────────────────────────────────────────────
    cardLabel_hero: 'Invitation',
    cardLabel_story: 'Our Story',
    cardLabel_details: 'Event Details',
    cardLabel_dresscode: 'Dress Code',
    cardLabel_greeting: 'Greetings',
    cardLabel_rsvp: 'RSVP',
    cardClickHint: 'click to view →',

    // ── Hero card ─────────────────────────────────────────────────────────────
    hero_salutation: "ASSALAMU'ALAIKUM WR. WB.",
    hero_grace: 'By the grace and blessings of Allah S.W.T, we:',
    hero_parents: [
      'Pengiran Haji Mohamad Jaludin bin Pengiran Haji Puteh',
      'Dayang Masdiah binti Awang Haji Tuah',
      'Nik Joharris bin Nik Ahmad',
      'Nerisa binti Nawi',
    ],
    hero_invite:
      'With utmost respect and honor, we humbly invite Pehin / Tan Sri / Puan Sri / Dato / Datin / Sir / Madam / Mr / Ms to attend the wedding ceremony of our beloved children:',
    hero_bride: 'Dayangku Izyan Naqiyah Pengiran binti Haji Mohd Jaludin',
    hero_groom: 'Nik Adam Danish bin Nik Joharris',
    hero_date: 'Monday, 28 December 2026',
    // kept for cards that still reference these
    hero_subtitle: 'Together with their families',
    hero_quote: '"From this moment onwards in our lives, we walk together as husband and wife."',

    // ── Our Story card ────────────────────────────────────────────────────────
    story_subtitle: 'How it began',
    story_heading: 'Our Story',
    story_events: [
      {
        year: '2019',
        title: 'First Meeting',
        description:
          'A fateful encounter that was meant to be — Izyan and Adam began to know each other, and it felt as though the universe had planned it all along.',
      },
      {
        year: '2021',
        title: 'A Growing Bond',
        description:
          'Endless conversations, shared laughter, and the realisation that time moves differently when you are with the right person.',
      },
      {
        year: '2024',
        title: 'The Proposal',
        description:
          'With family blessings and sincere intentions, Adam proposed to Izyan — beginning the most beautiful new chapter of their lives.',
      },
      {
        year: '2026',
        title: 'Forever Begins',
        description:
          'And now, surrounded by everyone they love, Izyan and Adam step together into a new life filled with blessings.',
      },
    ],

    // ── Event Details card ────────────────────────────────────────────────────
    details_subtitle: 'Mark your calendar',
    details_heading: 'Event Details',
    details_countdownLabel: 'Time remaining',
    details_expired: 'The celebration has begun',
    details_today: 'Today!',
    details_units: { days: 'Days', hours: 'Hours', minutes: 'Mins', seconds: 'Secs' },
    details_scheduleHeading: 'Event Schedule',
    details_events: [
      {
        icon: '🌹',
        title: 'Wedding Reception',
        isoDate: '2026-12-28T10:00:00',
        date: 'Monday, 28 December 2026 / 18 Rejab 1448H',
        time: 'Arrival of Guests & Invitees',
        venue: 'Tarindak D\u2019Polo, Royal Berkshire Hall',
        address: 'Jerudong Park Polo & Riding Park, Kg. Jerudong, BG3122, Brunei Darussalam',
        schedule: [
          'Arrival of Guests & Invitees',
          'Wedding Reception',
          'Prayer (Doa Selamat)',
          'Dining',
        ],
      },
    ],

    // ── Dress Code card ───────────────────────────────────────────────────────
    dresscode_subtitle: 'Dress to celebrate',
    dresscode_heading: 'Dress Code',
    dresscode_items: [
      {
        event: 'Nikkah Ceremony',
        for: 'Ladies',
        suggestion: 'Modest formal wear — abayas, salwar kameez, or elegant dresses. Headscarves respectfully encouraged.',
        avoid: 'Avoid sleeveless, short hemlines, or bright neon colours.',
        emoji: '🌷',
        palette: ['#E8D5C4', '#C4B5A5', '#8B7355'],
      },
      {
        event: 'Nikkah Ceremony',
        for: 'Gentlemen',
        suggestion: 'Kurta-pyjama, formal sherwanis, or neat western formals.',
        avoid: 'Please avoid shorts or casual attire.',
        emoji: '🕌',
        palette: ['#3D3530', '#6B5C50', '#9B8B7E'],
      },
      {
        event: 'Walima Reception',
        for: 'Ladies',
        suggestion: 'Lehengas, sarees, formal gowns or elegant anarkalis in soft jewel tones.',
        avoid: '',
        emoji: '✨',
        palette: ['#D4A8C7', '#B8849E', '#8B5B77'],
      },
      {
        event: 'Walima Reception',
        for: 'Gentlemen',
        suggestion: 'Sherwanis, formal suits or bandhgalas. Navy, ivory, and deep blues encouraged.',
        avoid: '',
        emoji: '🎩',
        palette: ['#1A2B5C', '#2D4A8A', '#4B6CB7'],
      },
    ],

    // ── Greeting card ─────────────────────────────────────────────────────────
    greeting_subtitle: 'From loved ones',
    greeting_heading: 'Greetings & Wishes',
    greeting_from: 'From',
    greeting_wish_label: 'wish',
    greeting_divider: 'Leave a wish',
    greeting_toast: '✨ Your wish has been added — thank you!',
    greeting_namePlaceholder: 'Your name',
    greeting_messagePlaceholder: 'Write your wedding wish for the couple…',
    greeting_submit: 'Send Wish 💌',
    greeting_counter: (cur: number, total: number) => `${cur} of ${total} wishes`,
    greeting_prev: 'Previous',
    greeting_next: 'Next',
    greeting_initial: [
      {
        id: 'seed-1',
        name: 'The Pengiran Jaludin Family',
        message:
          'May Allah bless the union of Izyan and Adam with boundless love, patience, and eternal happiness. MashaAllah! 🤲',
      },
      {
        id: 'seed-2',
        name: 'The Nik Joharris Family',
        message:
          'Wishing Izyan and Adam a lifetime of joy, laughter, and beautiful memories together. May their home always be full of love and blessings. 💕',
      },
      {
        id: 'seed-3',
        name: 'Dearest Friends',
        message:
          "Izyan & Adam, you are absolutely perfect for each other! Can't wait to celebrate at the reception. So much love for you both. 🎉",
      },
    ],

    // ── RSVP card ─────────────────────────────────────────────────────────────
    rsvp_subtitle: 'Kindly confirm',
    rsvp_heading: 'RSVP',
    rsvp_deadline: 'Kindly respond by 1st December 2026',
    rsvp_labelName: 'Full Name',
    rsvp_labelEmail: 'Email',
    rsvp_labelAttending: 'Will you be attending?',
    rsvp_labelGuests: 'Number of Guests (including you)',
    rsvp_labelDietary: 'Dietary Requirements',
    rsvp_labelMessage: 'Message for Izyan & Adam (optional)',
    rsvp_placeholderName: 'Your full name',
    rsvp_placeholderDietary: 'e.g. vegetarian, nut allergy...',
    rsvp_placeholderMessage: 'Share your wishes...',
    rsvp_accept: '✓ Joyfully accept',
    rsvp_decline: '✗ Regretfully decline',
    rsvp_guestSingular: 'guest',
    rsvp_guestPlural: 'guests',
    rsvp_submit: 'Send RSVP 💌',
    rsvp_thankYou: (name: string) => `Thank you, ${name}!`,
    rsvp_confirmYes: "We can't wait to celebrate with you. See you on 28 December 2026! 🎉",
    rsvp_confirmNo: 'We understand and will miss your presence. Thank you for letting us know.',
  },
} as const

export type Translations = (typeof langs)['ms']

export default langs
