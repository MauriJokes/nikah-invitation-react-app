// ─── Translation dictionary ───────────────────────────────────────────────────
// All UI strings live here. Add new language keys by extending the `langs` object.
// Components import `useT()` and access strings by key — no hardcoded text in JSX.

export type Lang = "ms" | "en";

const langs = {
  ms: {
    // ── App shell ──────────────────────────────────────────────────────────────
    cordiallyInvited: "Kami menjemput anda ke Majlis Perkahwinan",
    footer: "Direka oleh Nik Adam Danish",
    langToggle: "EN",
    langLabel: "BM",

    // ── Envelope ──────────────────────────────────────────────────────────────
    tapToOpen: "tekan untuk buka",

    // ── Card labels (scattered layout) ────────────────────────────────────────
    cardLabel_hero: "Jemptulan Majlis",
    cardLabel_story: "Kisah Kami",
    cardLabel_details: "Butiran Majlis",
    cardLabel_greeting: "Ucapan",
    cardLabel_rsvp: "RSVP",
    cardClickHint: "klik untuk lihat →",

    // ── Card preview (scattered layout) ────────────────────────────────────────
    cardLabel_hero_preview: "Majlis Jemputan",
    cardLabel_details_preview: "Tarikh & Tempat",

    // ── Hero card ─────────────────────────────────────────────────────────────
    hero_salutation: "ASSALAMU'ALAIKUM WR. WB.",
    hero_grace: "Dengan izin Allah S.W.T dan rahmatnya, kami:",
    hero_parents: [
      "Pengiran Haji Mohamad Jaludin bin Pengiran Haji Puteh",
      "Dayang Masdiah binti Awang Haji Tuah",
      "Nik Joharris bin Nik Ahmad",
      "Nerisa binti Nawi",
    ],
    hero_invite:
      "Dengan segala hormat dan takzim sukacita menjunjung Pengiran berangkat / mempersilakan Pehin / Tan Sri / Puan Sri / Dato / Datin / Awang / Dayang / Tuan / Puan / Encik dan Cik untuk hadir ke Majlis-Majlis bagi anakanda kami:",
    hero_bride_first_name: "Dayangku Izyan Naqiyah",
    hero_bride_last_name: "binti Pengiran Haji Mohd Jaludin",
    hero_groom_first_name: "Nik Adam Danish",
    hero_groom_last_name: "bin Nik Joharris",
    hero_date: "28 Disember 2026M / 18 Rejab 1448H",
    // kept for cards that still reference these
    hero_subtitle: "Bersama keluarga kami",
    hero_quote:
      '"Detik ini bermula ikatan yang murni, Melangkah seiring sebagai suami isteri."',

    // ── Our Story card ────────────────────────────────────────────────────────
    story_subtitle: "Bagaimana segalanya bermula",
    story_heading: "Kisah Kami",
    story_events: [
      {
        year: "2024",
        month: "Mac",
        title: "Pertemuan Pertama",
        description:
          "Satu pertemuan yang tidak dirancang, namun seolah-olah telah ditakdirkan. Ketika Izyan sedang mengulang kaji pelajaran di rumah rakan sekelasnya, Adam mendekati dan memulakan perbualan. Segalanya bermula dengan minat yang sama terhadap sebuah permainan dalam talian, League of Legends, yang dengan mudah merapatkan mereka. Dari perkenalan yang sederhana itu, terbitnya sesuatu yang lebih bermakna.",
      },
      {
        year: "2024",
        month: "Mei",
        title: "Bermulanya Kami",
        description:
          "Seiring waktu yang diluangkan bersama, hubungan mereka berkembang dengan begitu semula jadi. Mereka memilih untuk melangkah lebih serius, dengan niat yang tulus untuk mengenali dan menerima satu sama lain. Izyan menemui ketenangan dalam sifat Adam yang memahami, manakala Adam tertarik dengan keikhlasan hati Izyan — satu keseimbangan yang terasa begitu sempurna.",
      },
      {
        year: "2025",
        month: "Jan",
        title: "Bersama Mengukuh Cinta",
        description:
          "Hari demi hari, kasih yang terjalin semakin mendalam. Dari perjalanan bersama hingga ke detik-detik indah yang dicipta, setiap kenangan menguatkan lagi ikatan mereka. Sebagai tanda komitmen, mereka bertukar cincin janji — simbol kesetiaan dan janji untuk sentiasa ada di sisi, dalam apa jua keadaan.",
      },
      {
        year: "2026",
        month: "Mac",
        title: "Lamaran Penuh Makna",
        description:
          "Walau jarak memisahkan secara fizikal, hati mereka tetap dekat. Dalam satu panggilan lewat malam, gurauan ringan bertukar menjadi momen yang tidak dilupakan. Soalan ringkas, “When can can you marry me ah?” disambut dengan jawapan penuh keikhlasan, “As soon as you said YES.” Saat itu, segalanya terasa nyata dan bermakna.",
      },
      {
        year: "2026",
        month: "Mac",
        title: "Majlis Pertunangan",
        description:
          "Dengan penuh keyakinan dan kasih, Adam mendapatkan restu daripada kedua-dua keluarga. Perancangan yang pada awalnya disangka lebih lambat, bertukar menjadi sebuah majlis pertunangan yang indah dan penuh kejutan di Brunei — hanya seminggu selepas Hari Raya. Suasana dipenuhi kegembiraan, diserikan dengan gelak tawa dan restu daripada kedua-dua belah keluarga.",
      },
      {
        year: "2026",
        month: "Dis",
        title: "Permulaan Selamanya",
        description:
          "Kini, mereka melangkah ke fasa baharu dalam hidup, merancang masa depan bersama. Dengan penuh cinta, harapan, dan sokongan daripada insan tersayang, Izyan dan Adam menantikan hari untuk disatukan sebagai suami isteri — memulakan perjalanan hidup yang diberkati bersama.",
      },
    ],

    // ── Event Details card ────────────────────────────────────────────────────
    details_preview: "Tarikh & Tempat",
    details_subtitle: "Tandakan di kalendar anda",
    details_heading: "Butiran Majlis",
    details_countdownLabel: "Masa tinggal",
    details_expired: "Majlis telah bermula",
    details_today: "Hari ini!",
    details_units: {
      days: "Hari",
      hours: "Jam",
      minutes: "Minit",
      seconds: "Saat",
    },
    details_scheduleHeading: "Aturcara Majlis",
    details_events: [
      {
        icon: "🌹",
        title: "Majlis Bersanding",
        title_ics: "Majlis Bersanding Izyan & Adam",
        isoDate: "2026-12-28T19:00:00",
        date: "Isnin, 28 Disember 2026M / 18 Rejab 1448H",
        time: "7:00 petang – 10:00 malam",
        venue: "Tarindak D\u2019Polo, Royal Berkshire Hall",
        address:
          "Jerudong Park Polo & Riding Park, Kg. Jerudong, BG3122, Brunei Darussalam",
        schedule: [
          "Menerima Jemputan",
          "Majlis Persandingan",
          "Bacaan Doa Selamat",
          "Menikmati Jamuan",
        ],
      },
    ],

    // ── Dress Code card ───────────────────────────────────────────────────────
    dresscode_subtitle: "Berpakaian untuk meraikan",
    dresscode_heading: "Kod Pakaian",
    dresscode_items: [
      {
        event: "Majlis Akad Nikah",
        for: "Perempuan",
        suggestion:
          "Pakaian formal sopan — abaya, salwar kameez, atau gaun elegant. Tudung amat digalakkan.",
        avoid:
          "Elakkan pakaian tanpa lengan, hemline pendek, atau warna neon terang.",
        emoji: "🌷",
        palette: ["#E8D5C4", "#C4B5A5", "#8B7355"],
      },
      {
        event: "Majlis Akad Nikah",
        for: "Lelaki",
        suggestion:
          "Kurta-pyjama, sherwani formal, atau pakaian barat yang kemas.",
        avoid: "Sila elakkan seluar pendek atau pakaian kasual.",
        emoji: "🕌",
        palette: ["#3D3530", "#6B5C50", "#9B8B7E"],
      },
      {
        event: "Majlis Walimah",
        for: "Perempuan",
        suggestion:
          "Lehenga, sari, gaun formal atau anarkali elegant dalam warna permata yang lembut.",
        avoid: "",
        emoji: "✨",
        palette: ["#D4A8C7", "#B8849E", "#8B5B77"],
      },
      {
        event: "Majlis Walimah",
        for: "Lelaki",
        suggestion:
          "Sherwani, sut formal atau bandhgala. Warna navy, gading, dan biru tua digalakkan.",
        avoid: "",
        emoji: "🎩",
        palette: ["#1A2B5C", "#2D4A8A", "#4B6CB7"],
      },
    ],

    // ── Greeting card ─────────────────────────────────────────────────────────
    greeting_subtitle: "Daripada orang-orang tersayang",
    greeting_heading: "Ucapan & Doa Restu",
    greeting_from: "Daripada",
    greeting_wish_label: "wish",
    greeting_divider: "Tinggalkan ucapan",
    greeting_toast: "✨ Ucapan anda telah ditambah — terima kasih!",
    greeting_namePlaceholder: "Nama anda",
    greeting_messagePlaceholder: "Tuliskan ucapan perkahwinan untuk pasangan…",
    greeting_submit: "Hantar Ucapan 💌",
    greeting_anonymous: "Hantar secara rahsia",
    greeting_counter: (cur: number, total: number) =>
      `${cur} daripada ${total} ucapan`,
    greeting_prev: "Sebelumnya",
    greeting_next: "Seterusnya",
    greeting_initial: [
      {
        id: "seed-1",
        name: "Keluarga Pengiran Jaludin",
        message:
          "Semoga Allah memberkati perkahwinan Izyan dan Adam dengan cinta yang tidak terhingga, kesabaran, dan kebahagiaan abadi. MashaAllah! 🤲",
      },
      {
        id: "seed-2",
        name: "Keluarga Nik Joharris",
        message:
          "Semoga Izyan dan Adam sentiasa bahagia, penuh tawa, dan diberkati dengan kenangan indah bersama. Rumah tangga yang sakinah, mawaddah, wa rahmah. 💕",
      },
      {
        id: "seed-3",
        name: "Rakan-Rakan Tersayang",
        message:
          "Izyan & Adam, kalian sungguh serasi! Tak sabar untuk meraikan bersama di Majlis Bersanding. Penuh kasih sayang untuk kalian berdua. 🎉",
      },
    ],

    // ── RSVP card ─────────────────────────────────────────────────────────────
    rsvp_subtitle: "Sila sahkan kehadiran",
    rsvp_heading: "RSVP",
    rsvp_deadline: "Sila balas sebelum 1hb Disember 2026",
    rsvp_labelName: "Nama Penuh",
    rsvp_labelEmail: "E-mel",
    rsvp_labelAttending: "Adakah anda hadir?",
    rsvp_labelGuests: "Bilangan tetamu (termasuk anda)",
    rsvp_labelDietary: "Keperluan Pemakanan",
    rsvp_labelMessage: "Mesej untuk Izyan & Adam (pilihan)",
    rsvp_placeholderName: "Nama penuh anda",
    rsvp_placeholderDietary: "cth. vegetarian, alahan kacang…",
    rsvp_placeholderMessage: "Kongsi ucapan anda…",
    rsvp_accept: "✓ Hadir",
    rsvp_decline: "✗ Tidak hadir",
    rsvp_guestSingular: "tetamu",
    rsvp_guestPlural: "tetamu",
    rsvp_submit: "Hantar RSVP 💌",
    rsvp_anonymous: "Hantar secara rahsia",
    rsvp_thankYou: (name: string) => `Terima kasih, ${name}!`,
    rsvp_confirmYes:
      "Kami tidak sabar untuk meraikan bersama anda. Jumpa pada 28 Disember 2026! 🎉",
    rsvp_confirmNo:
      "Kami faham dan akan merindui kehadiran anda. Terima kasih kerana memaklumkan.",
  },

  en: {
    // ── App shell ──────────────────────────────────────────────────────────────
    cordiallyInvited: "You are cordially invited to the Wedding of",
    footer: "Powered by Nik Adam Danish",
    langToggle: "BM",
    langLabel: "EN",

    // ── Envelope ──────────────────────────────────────────────────────────────
    tapToOpen: "tap to open",

    // ── Card labels ───────────────────────────────────────────────────────────
    cardLabel_hero: "Invitation",
    cardLabel_story: "Our Story",
    cardLabel_details: "Event Details",
    cardLabel_greeting: "Greetings",
    cardLabel_rsvp: "RSVP",
    cardClickHint: "click to view →",

    // ── Card preview (scattered layout) ────────────────────────────────────────
    cardLabel_hero_preview: "Wedding Ceremony",
    cardLabel_details_preview: "Date & Location",

    // ── Hero card ─────────────────────────────────────────────────────────────
    hero_salutation: "ASSALAMU'ALAIKUM WR. WB.",
    hero_grace: "By the grace and blessings of Allah S.W.T, we",
    hero_parents: [
      "Pengiran Haji Mohamad Jaludin bin Pengiran Haji Puteh",
      "Dayang Masdiah binti Awang Haji Tuah",
      "Nik Joharris bin Nik Ahmad",
      "Nerisa binti Nawi",
    ],
    hero_invite:
      "With utmost respect and honor, we humbly invite Pengiran / Pehin / Tan Sri / Puan Sri / Dato / Datin / Sir / Madam / Mr / Ms to attend the wedding ceremony of our beloved children:",
    hero_bride_first_name: "Dayangku Izyan Naqiyah",
    hero_bride_last_name: "binti Pengiran Haji Mohd Jaludin",
    hero_groom_first_name: "Nik Adam Danish",
    hero_groom_last_name: "bin Nik Joharris",
    hero_date: "28 December 2026 / 18 Rajab 1448 AH",
    // kept for cards that still reference these
    hero_subtitle: "Together with their families",
    hero_quote:
      '"From this moment onwards in our lives, we walk together as husband and wife."',

    // ── Our Story card ────────────────────────────────────────────────────────
    story_subtitle: "How it began",
    story_heading: "Our Story",
    story_events: [
      {
        year: "2024",
        month: "Mar",
        title: "First Meeting",
        description:
          "A moment not planned, yet meant to be. While Izyan was studying at a classmate's apartment during finals, Adam approached and sparked a conversation — all over a shared love for League of Legends. What seemed like a small connection quickly became the beginning of something meaningful.",
      },
      {
        year: "2024",
        month: "May",
        title: "Becoming Us",
        description:
          "As they spent more time together, their bond grew naturally. They made things official with sincerity. Izyan found comfort in Adam's understanding nature, while Adam was drawn to Izyan's genuine heart — a balance that felt just right.",
      },
      {
        year: "2025",
        month: "Jan",
        title: "Growing Together",
        description:
          "With time, their love only deepened. From travelling to creating countless memories together, every moment strengthened their connection. They exchanged promise rings — a symbol of their commitment and a quiet promise to always stand by each other.",
      },
      {
        year: "2026",
        month: "Mar",
        title: "A Simple, Honest Proposal",
        description:
          'During a late-night call, what began as a lighthearted question — "When can you marry me?" — turned unforgettable. Adam\'s sincere reply, "As soon as you say YES," changed everything. In that moment, it all became real.',
      },
      {
        year: "2026",
        month: "Mar",
        title: "The Engagement",
        description:
          "With love and certainty, Adam sought blessings from both families. What was expected to happen later quickly became a beautiful, spontaneous engagement in Brunei — just one week after Raya, filled with happiness and laughter from both families.",
      },
      {
        year: "2026",
        month: "Dec",
        title: "Forever Begins",
        description:
          "Now, with love, excitement, and the support of those around them, Izyan and Adam look forward to beginning a lifetime together — and finally tying the knot.",
      },
    ],

    // ── Event Details card ────────────────────────────────────────────────────
    details_preview: "Date & Location",
    details_subtitle: "Mark your calendar",
    details_heading: "Event Details",
    details_countdownLabel: "Time remaining",
    details_expired: "The celebration has begun",
    details_today: "Today!",
    details_units: {
      days: "Days",
      hours: "Hours",
      minutes: "Mins",
      seconds: "Secs",
    },
    details_scheduleHeading: "Event Schedule",
    details_events: [
      {
        icon: "🌹",
        title: "Wedding Reception",
        title_ics: "Izyan & Adam's Wedding Reception",
        isoDate: "2026-12-28T19:00:00",
        date: "Monday, 28 December 2026 / 18 Rajab 1448 AH",
        time: "7:00 PM – 10:00 PM",
        venue: "Tarindak D\u2019Polo, Royal Berkshire Hall",
        address:
          "Jerudong Park Polo & Riding Park, Kg. Jerudong, BG3122, Brunei Darussalam",
        schedule: [
          "Arrival of Guests & Invitees",
          "Izyan and Adam's Wedding Reception",
          "Prayer (Doa Selamat)",
          "Dining",
        ],
      },
    ],

    // ── Dress Code card ───────────────────────────────────────────────────────
    dresscode_subtitle: "Dress to celebrate",
    dresscode_heading: "Dress Code",
    dresscode_items: [
      {
        event: "Nikkah Ceremony",
        for: "Ladies",
        suggestion:
          "Modest formal wear — abayas, salwar kameez, or elegant dresses. Headscarves respectfully encouraged.",
        avoid: "Avoid sleeveless, short hemlines, or bright neon colours.",
        emoji: "🌷",
        palette: ["#E8D5C4", "#C4B5A5", "#8B7355"],
      },
      {
        event: "Nikkah Ceremony",
        for: "Gentlemen",
        suggestion: "Kurta-pyjama, formal sherwanis, or neat western formals.",
        avoid: "Please avoid shorts or casual attire.",
        emoji: "🕌",
        palette: ["#3D3530", "#6B5C50", "#9B8B7E"],
      },
      {
        event: "Walima Reception",
        for: "Ladies",
        suggestion:
          "Lehengas, sarees, formal gowns or elegant anarkalis in soft jewel tones.",
        avoid: "",
        emoji: "✨",
        palette: ["#D4A8C7", "#B8849E", "#8B5B77"],
      },
      {
        event: "Walima Reception",
        for: "Gentlemen",
        suggestion:
          "Sherwanis, formal suits or bandhgalas. Navy, ivory, and deep blues encouraged.",
        avoid: "",
        emoji: "🎩",
        palette: ["#1A2B5C", "#2D4A8A", "#4B6CB7"],
      },
    ],

    // ── Greeting card ─────────────────────────────────────────────────────────
    greeting_subtitle: "From loved ones",
    greeting_heading: "Greetings & Wishes",
    greeting_from: "From",
    greeting_wish_label: "wish",
    greeting_divider: "Leave a wish",
    greeting_toast: "✨ Your wish has been added — thank you!",
    greeting_namePlaceholder: "Your name",
    greeting_messagePlaceholder: "Write your wedding wish for the couple…",
    greeting_submit: "Send Wish 💌",
    greeting_anonymous: "Submit privately",
    greeting_counter: (cur: number, total: number) =>
      `${cur} of ${total} wishes`,
    greeting_prev: "Previous",
    greeting_next: "Next",
    greeting_initial: [
      {
        id: "seed-1",
        name: "The Pengiran Jaludin Family",
        message:
          "May Allah bless the union of Izyan and Adam with boundless love, patience, and eternal happiness. MashaAllah! 🤲",
      },
      {
        id: "seed-2",
        name: "The Nik Joharris Family",
        message:
          "Wishing Izyan and Adam a lifetime of joy, laughter, and beautiful memories together. May their home always be full of love and blessings. 💕",
      },
      {
        id: "seed-3",
        name: "Dearest Friends",
        message:
          "Izyan & Adam, you are absolutely perfect for each other! Can't wait to celebrate at the reception. So much love for you both. 🎉",
      },
    ],

    // ── RSVP card ─────────────────────────────────────────────────────────────
    rsvp_subtitle: "Kindly confirm",
    rsvp_heading: "RSVP",
    rsvp_deadline: "Kindly respond by 1st December 2026",
    rsvp_labelName: "Full Name",
    rsvp_labelEmail: "Email",
    rsvp_labelAttending: "Will you be attending?",
    rsvp_labelGuests: "Number of Guests (including you)",
    rsvp_labelDietary: "Dietary Requirements",
    rsvp_labelMessage: "Message for Izyan & Adam (optional)",
    rsvp_placeholderName: "Your full name",
    rsvp_placeholderDietary: "e.g. vegetarian, nut allergy...",
    rsvp_placeholderMessage: "Share your wishes...",
    rsvp_accept: "✓ Accept",
    rsvp_decline: "✗ Decline",
    rsvp_guestSingular: "guest",
    rsvp_guestPlural: "guests",
    rsvp_submit: "Send RSVP 💌",
    rsvp_anonymous: "Submit privately",
    rsvp_thankYou: (name: string) => `Thank you, ${name}!`,
    rsvp_confirmYes:
      "We can't wait to celebrate with you. See you on 28 December 2026! 🎉",
    rsvp_confirmNo:
      "We understand and will miss your presence. Thank you for letting us know.",
  },
} as const;

export type Translations = (typeof langs)["ms"];

export default langs;
