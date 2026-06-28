import type { Suspect, Exhibit, StoryId } from "../investigation/types";

export interface StoryConfig {
  id: StoryId;
  title: { en: string; id: string };
  description: { en: string; id: string };
  victim: string;
  introTitle: { en: string; id: string };
  introDesc1: { en: string; id: string };
  introDesc2: { en: string; id: string };
  suspects: {
    en: Suspect[];
    id: Suspect[];
  };
  facts: { en: string[]; id: string[] };
  exhibits: { en: Exhibit[]; id: Exhibit[] };
  motives: { en: Record<string, string>; id: Record<string, string> };
  evidences: { en: Record<string, string>; id: Record<string, string> };
  witnessStatements: {
    en: Record<string, { witness: string; text: string; details: string }>;
    id: Record<string, { witness: string; text: string; details: string }>;
  };
}

export const STORIES: Record<StoryId, StoryConfig> = {
  "1948": {
    id: "1948",
    title: { 
      en: "Case #1948: The Melting Projectile", 
      id: "Kasus #1948: Proyektil Mencair" 
    },
    description: { 
      en: "A grumpy neighbor found dead in his yard with a blunt force head trauma, but no weapon in sight.", 
      id: "Seorang tetangga galak ditemukan tewas di halamannya dengan luka hantaman tumpul di kepala, namun tidak ada senjata." 
    },
    victim: "Pak Anton",
    introTitle: { en: "Case Background", id: "Latar Belakang Kasus" },
    introDesc1: {
      en: "At 8:15 AM today, Pak Anton was found dead in his front yard. Cause of death: a severe blunt force trauma to the forehead. However, a thorough sweep of the property revealed NO WEAPON. No rocks, no baseball bats, no golf clubs. Just a small puddle of water near his head, and a broken branch from his beloved mango tree.",
      id: "Pukul 08:15 pagi ini, Pak Anton ditemukan tewas di halaman depannya. Penyebab kematian: trauma hantaman tumpul yang parah di dahi. Namun, penyisiran TKP sama sekali TIDAK MENEMUKAN SENJATA. Tidak ada batu, pemukul bisbol, atau tongkat golf. Hanya ada genangan air kecil di dekat kepalanya, dan patahan dahan dari pohon mangga kesayangannya."
    },
    introDesc2: {
      en: "The neighborhood hated him. Three people were seen in the vicinity around 8:00 AM. We have brought them into the interrogation room. We need you to figure out WHO did it, WHAT weapon they used that seemingly vanished, and WHY.",
      id: "Semua tetangga membencinya. Tiga orang terlihat berada di sekitar TKP pada pukul 08:00 pagi. Kami telah membawa mereka ke ruang interogasi. Kami butuh Anda untuk mencari tahu SIAPA pelakunya, senjata APA yang digunakan hingga bisa menghilang, dan MENGAPA."
    },
    facts: {
      en: [
        "Victim: Pak Anton (62), found dead at 8:15 AM.",
        "Cause of Death: Blunt force trauma to the forehead.",
        "Anomaly: No blunt weapon found anywhere near the scene.",
        "Scene Detail 1: A small puddle of plain water found near the victim's head.",
        "Scene Detail 2: A broken mango tree branch near the body.",
        "Weather: It was a very hot, sunny morning."
      ],
      id: [
        "Korban: Pak Anton (62), ditemukan tewas pukul 08:15 pagi.",
        "Penyebab Kematian: Trauma hantaman tumpul di dahi.",
        "Kejanggalan: Tidak ada senjata tumpul yang ditemukan di sekitar TKP.",
        "Detail TKP 1: Terdapat genangan air biasa (bukan hujan) di dekat kepala korban.",
        "Detail TKP 2: Dahan pohon mangga yang patah di dekat tubuh korban.",
        "Cuaca: Pagi yang sangat panas dan terik."
      ]
    },
    exhibits: {
      en: [
        {
          id: "exhibit-a",
          title: "Crime Scene",
          description: "Top-down view of the body in the front yard. Note the water puddle near the head.",
          imageSrc: "/images/crime_scene.jpg"
        },
        {
          id: "exhibit-b",
          title: "Abandoned Cart",
          description: "A heavily damaged bakso cart parked at the corner of the street. The thick rubber straps (karet ban) used to tie equipment are snapped.",
          imageSrc: "/images/cart.jpg"
        }
      ],
      id: [
        {
          id: "exhibit-a",
          title: "TKP",
          description: "Tampak atas tubuh korban di halaman depan. Perhatikan genangan air di dekat kepala.",
          imageSrc: "/images/crime_scene.jpg"
        },
        {
          id: "exhibit-b",
          title: "Gerobak Ditinggalkan",
          description: "Gerobak bakso yang rusak parah terparkir di ujung jalan. Karet ban tebal yang biasa dipakai mengikat barang tampak putus.",
          imageSrc: "/images/cart.jpg"
        }
      ]
    },
    suspects: {
      en: [
        {
          id: "ningsih",
          name: "Bu Ningsih",
          role: "The Neighbor",
          description: "Gossipy neighbor who hated Pak Anton's mango tree.",
          initialMessage: "Oh my goodness, Officer, I was so shocked. I was just sweeping my yard when suddenly Pak Anton was already lying there. His mangoes do fall into my yard often, but I wouldn't ever hurt him!",
          imageSrc: "/images/ningsih.jpg"
        },
        {
          id: "jono",
          name: "Jono Ojol",
          role: "Delivery Driver",
          description: "Online driver. Suspended because of Anton's 1-star review.",
          initialMessage: "Geez Officer, yeah I'm annoyed at him for that one star. My account got suspended because of it. But I swear, I was only delivering a package down the street at the time.",
          imageSrc: "/images/jono.jpg"
        },
        {
          id: "oleh",
          name: "Mang Oleh",
          role: "Bakso Seller",
          description: "His cart was destroyed by Anton's reckless driving.",
          initialMessage: "Excuse me, Officer. I'm just a roaming bakso seller. I haven't seen Pak Anton in days, and I definitely didn't go near his house this morning.",
          imageSrc: "/images/oleh.jpg"
        }
      ],
      id: [
        {
          id: "ningsih",
          name: "Bu Ningsih",
          role: "The Neighbor",
          description: "Gossipy neighbor who hated Pak Anton's mango tree.",
          initialMessage: "Aduh, Pak Polisi, saya kaget banget. Saya lagi nyapu halaman, eh tiba-tiba Pak Anton udah terkapar. Mangga-mangganya sih sering jatuh ke pekarangan saya, tapi saya nggak mungkin jahatin dia!",
          imageSrc: "/images/ningsih.jpg"
        },
        {
          id: "jono",
          name: "Jono Ojol",
          role: "Delivery Driver",
          description: "Online driver. Suspended because of Anton's 1-star review.",
          initialMessage: "Buset Bang Polisi, emang bener saya gedeg sama dia gara-gara bintang satu. Akun saya sampai anyep. Tapi sumpah, saya cuma nganter paket ke ujung jalan doang pas kejadian.",
          imageSrc: "/images/jono.jpg"
        },
        {
          id: "oleh",
          name: "Mang Oleh",
          role: "Bakso Seller",
          description: "His cart was destroyed by Anton's reckless driving.",
          initialMessage: "Punten, Pak Polisi. Saya mah cuma tukang bakso keliling. Saya udah beberapa hari nggak lihat Pak Anton, dan tadi pagi juga saya nggak lewat depan rumahnya.",
          imageSrc: "/images/oleh.jpg"
        }
      ]
    },
    motives: {
      en: {
        mango_tree: "Mango Tree Dispute: Angry about the leaves in her yard.",
        bad_rating: "1-Star Rating: Revenge for getting his driver account suspended.",
        destroyed_cart: "Destroyed Livelihood: Anton crashed into his cart, burned him, and humiliated him."
      },
      id: {
        mango_tree: "Sengketa Pohon Mangga: Marah karena daun di halamannya.",
        bad_rating: "Rating Bintang 1: Balas dendam akun drivernya ditangguhkan.",
        destroyed_cart: "Gerobak Hancur: Anton menabrak gerobaknya, menyiram kuah panas, dan menghinanya."
      }
    },
    evidences: {
      en: {
        sweeping: "The Sweeping Alibi: Claimed she was just sweeping when the thud happened.",
        frozen_bakso: "The Missing Inventory: Mang Oleh's premium oversized meatballs are strangely missing from his freezer, and there is a water stain near the body.",
        delivery: "The Delivery Alibi: Claimed he was just delivering a package down the street."
      },
      id: {
        sweeping: "Alibi Menyapu: Mengaku hanya menyapu saat bunyi bugh terjadi.",
        frozen_bakso: "Stok yang Hilang: Bakso Tenis premium Mang Oleh anehnya hilang dari freezer-nya, dan ada genangan air di dekat tubuh.",
        delivery: "Alibi Mengantar: Mengaku hanya mengantar paket di ujung jalan."
      }
    },
    witnessStatements: {
      en: {
        ningsih: {
          witness: "Pak RT (Neighborhood Head)",
          text: `"Bu Ningsih was sweeping her yard angrily this morning. She's always complaining about Pak Anton's mango tree. I saw her throwing some of the leaves back over the fence."`,
          details: "She has a motive, but she claims she only heard a thud."
        },
        jono: {
          witness: "Satpam (Security Guard)",
          text: `"That Ojol driver, Jono, was hovering near the intersection around 8:00 AM. Also, yesterday afternoon, I saw Pak Anton back his SUV right into Mang Oleh's bakso cart. It was a huge mess, but Anton just laughed."`,
          details: "Provides an alibi for Jono and a major motive for Oleh."
        },
        oleh: {
          witness: "Bu Ningsih (Neighbor)",
          text: `"Just before I heard the thud from Pak Anton's garden, I saw Mang Oleh across the street. He was pulling something really hard on his cart, like stretching a giant rubber band."`,
          details: "He claims his cart's rubber snapped from old age."
        }
      },
      id: {
        ningsih: {
          witness: "Pak RT",
          text: `"Bu Ningsih menyapu halamannya dengan marah pagi ini. Dia selalu mengeluh tentang pohon mangga Pak Anton. Saya melihatnya melempar daun-daun kembali ke seberang pagar."`,
          details: "Dia punya motif, tapi dia mengaku hanya mendengar bunyi 'bugh'."
        },
        jono: {
          witness: "Satpam",
          text: `"Ojol itu, Jono, mondar-mandir dekat perempatan sekitar jam 8:00 pagi. Oh ya, kemarin sore, saya lihat Pak Anton menabrakkan mobilnya ke gerobak Mang Oleh sampai hancur. Anton malah tertawa."`,
          details: "Memberikan alibi Jono dan motif besar untuk Oleh."
        },
        oleh: {
          witness: "Bu Ningsih (Tetangga)",
          text: `"Tepat sebelum saya mendengar bunyi bugh dari taman Pak Anton, saya lihat Mang Oleh di seberang jalan. Dia menarik sesuatu dengan kuat di gerobaknya, seperti merentangkan karet raksasa."`,
          details: "Dia mengaku karet gerobaknya putus karena sudah tua."
        }
      }
    }
  },
  "2024": {
    id: "2024",
    title: { 
      en: "Case #2024: The Dark Ritual", 
      id: "Kasus #2024: Ritual Gelap" 
    },
    description: { 
      en: "A wealthy landlord found dead among mystical incense and offerings. Was it a supernatural curse, or a clever human poison?", 
      id: "Tuan tanah kaya tewas di tengah dupa dan sesajen mistis. Kutukan gaib, atau racun mematikan?" 
    },
    victim: "Pak Budi",
    introTitle: { en: "Case Background", id: "Latar Belakang Kasus" },
    introDesc1: {
      en: "Last night, Pak Budi, a notorious and wealthy landlord, was found dead in his home office. The room was locked from the inside. Budi's body was surrounded by burnt incense, flower petals (kembang 7 rupa), and strange occult markings. The neighborhood is terrified, claiming he was struck by 'Pesugihan' (black magic revenge) for his ruthless evictions.",
      id: "Semalam, Pak Budi, tuan tanah kaya yang kejam, ditemukan tewas di ruang kerjanya. Ruangan terkunci dari dalam. Tubuh Budi dikelilingi dupa yang menyala, kembang 7 rupa, dan simbol okultisme aneh. Warga ketakutan, mengklaim dia kena 'Pesugihan' (kutukan ilmu hitam) karena penggusuran paksa yang dilakukannya."
    },
    introDesc2: {
      en: "The autopsy report tells a different story: severe organ failure due to a rare, fast-acting poison that smells strongly of bitter almonds. The heavy incense in the room completely masked the scent. We have three suspects who had access to the house. Find out who poisoned him, and how they used the dark magic rumors as a cover-up.",
      id: "Laporan autopsi berkata lain: kegagalan organ fatal akibat racun langka yang berbau seperti kacang almond pahit. Bau dupa yang sangat menyengat di ruangan itu sepenuhnya menutupi bau racun tersebut. Kami punya tiga tersangka yang memiliki akses ke rumah itu. Cari tahu siapa yang meracuninya, dan bagaimana mereka menggunakan rumor ilmu hitam sebagai kedok."
    },
    facts: {
      en: [
        "Victim: Pak Budi (55), wealthy landlord.",
        "Cause of Death: Poisoning (bitter almond scent), NOT magic.",
        "Crime Scene: Locked from the inside. Filled with heavy incense smoke and offerings.",
        "Anomaly: The poison was ingested via a cup of black coffee on his desk.",
        "Context: Budi was widely hated and many believed he used dark magic to gain his wealth."
      ],
      id: [
        "Korban: Pak Budi (55), tuan tanah kaya raya.",
        "Penyebab Kematian: Keracunan (bau almond pahit), BUKAN ilmu hitam.",
        "TKP: Terkunci dari dalam. Dipenuhi asap dupa yang pekat dan sesajen.",
        "Kejanggalan: Racun tersebut diminum melalui secangkir kopi hitam di mejanya.",
        "Konteks: Budi sangat dibenci dan banyak yang percaya dia menggunakan pesugihan untuk meraup kekayaan."
      ]
    },
    exhibits: {
      en: [
        {
          id: "exhibit-c",
          title: "Home Office",
          description: "The victim's desk. Notice the half-drank cup of black coffee amidst the burning incense and flower petals.",
          imageSrc: "/images/office_scene.jpg"
        },
        {
          id: "exhibit-d",
          title: "Bank Statement",
          description: "A final notice from the bank addressed to Rina, showing massive unpaid debts.",
          imageSrc: "/images/debt_letter.jpg"
        }
      ],
      id: [
        {
          id: "exhibit-c",
          title: "Ruang Kerja",
          description: "Meja korban. Perhatikan cangkir kopi hitam yang tinggal setengah di antara dupa dan kelopak bunga.",
          imageSrc: "/images/office_scene.jpg"
        },
        {
          id: "exhibit-d",
          title: "Tagihan Bank",
          description: "Surat peringatan terakhir dari bank yang ditujukan untuk Rina, menunjukkan hutang yang sangat besar.",
          imageSrc: "/images/debt_letter.jpg"
        }
      ]
    },
    suspects: {
      en: [
        {
          id: "surip",
          name: "Mbah Surip",
          role: "The Dukun",
          description: "Local shaman claiming Budi owed him a spiritual debt.",
          initialMessage: "Greetings, Officer. I warned him. The spirits always collect their toll. Budi played with forces he didn't understand, and now he has paid the price in blood.",
          imageSrc: "/images/surip.jpg"
        },
        {
          id: "rina",
          name: "Rina",
          role: "The Niece",
          description: "Deep in debt, inherits Budi's wealth upon his death.",
          initialMessage: "I can't believe Uncle Budi is gone! It must be the curse... everyone said his money was cursed! I was just making him his evening coffee when he locked himself in to meditate.",
          imageSrc: "/images/rina.jpg"
        },
        {
          id: "dimas",
          name: "Dimas",
          role: "Rival Landlord",
          description: "Fierce competitor who wanted Budi's properties.",
          initialMessage: "Look, I hated the guy, but I'm a businessman, not a wizard. All this 'dark magic' nonsense is just a convenient excuse for whoever actually knocked him off.",
          imageSrc: "/images/dimas.jpg"
        }
      ],
      id: [
        {
          id: "surip",
          name: "Mbah Surip",
          role: "The Dukun",
          description: "Local shaman claiming Budi owed him a spiritual debt.",
          initialMessage: "Salam, Pak Polisi. Saya sudah peringatkan dia. Roh-roh selalu menagih janji mereka. Budi bermain dengan hal gaib yang tidak ia pahami, dan sekarang ia membayar harganya.",
          imageSrc: "/images/surip.jpg"
        },
        {
          id: "rina",
          name: "Rina",
          role: "The Niece",
          description: "Deep in debt, inherits Budi's wealth upon his death.",
          initialMessage: "Saya nggak percaya Paman Budi meninggal! Pasti ini karena kutukan itu... semua orang bilang uangnya dari hasil pesugihan! Saya cuma buatin dia kopi malam sebelum dia mengunci diri untuk semedi.",
          imageSrc: "/images/rina.jpg"
        },
        {
          id: "dimas",
          name: "Dimas",
          role: "Rival Landlord",
          description: "Fierce competitor who wanted Budi's properties.",
          initialMessage: "Dengar ya, saya memang benci dia, tapi saya ini pebisnis, bukan dukun. Semua omong kosong 'ilmu hitam' ini cuma alasan buat siapa pun yang sebenarnya bunuh dia.",
          imageSrc: "/images/dimas.jpg"
        }
      ]
    },
    motives: {
      en: {
        spiritual_debt: "Spiritual Debt: Claimed Budi owed him his soul.",
        inheritance: "Inheritance & Debt: She needed money to pay off massive bank debts.",
        rivalry: "Business Rivalry: Wanted to eliminate competition for prime real estate."
      },
      id: {
        spiritual_debt: "Hutang Gaib: Mengklaim Budi berhutang nyawa kepadanya.",
        inheritance: "Warisan & Hutang: Dia butuh uang untuk melunasi hutang bank yang besar.",
        rivalry: "Rival Bisnis: Ingin menyingkirkan saingan untuk properti strategis."
      }
    },
    evidences: {
      en: {
        incense: "The Incense Alibi: Used the thick incense smoke to cover the bitter almond scent of the poison.",
        coffee: "The Coffee Cup: The poison was delivered through the evening coffee.",
        locked_room: "The Locked Room: Frame job to make it look like a supernatural closed-room incident."
      },
      id: {
        incense: "Alibi Dupa: Menggunakan asap dupa yang pekat untuk menutupi bau almond pahit dari racun.",
        coffee: "Cangkir Kopi: Racun diberikan melalui kopi malamnya.",
        locked_room: "Kamar Terkunci: Rekayasa untuk membuatnya terlihat seperti insiden supernatural ruang tertutup."
      }
    },
    witnessStatements: {
      en: {
        surip: {
          witness: "Security Guard",
          text: `"Mbah Surip was seen outside the house chanting an hour before Budi died. He left an envelope of incense on the porch."`,
          details: "He provided the incense, but did he enter the house?"
        },
        rina: {
          witness: "House Maid",
          text: `"Non Rina was very anxious yesterday after receiving a letter from the bank. She prepared Bapak's coffee at 7 PM and brought it to his study. She then locked the door from the outside using a master key."`,
          details: "She had direct access to his coffee and locked the door."
        },
        dimas: {
          witness: "Notary Public",
          text: `"Dimas was furious with Budi for outbidding him on the new complex. He openly threatened Budi two days ago."`,
          details: "Strong motive, but no proof of him being at the house."
        }
      },
      id: {
        surip: {
          witness: "Satpam",
          text: `"Mbah Surip terlihat merapal mantra di luar rumah sejam sebelum Budi meninggal. Dia meninggalkan bungkusan dupa di teras."`,
          details: "Dia memberikan dupa, tapi apakah dia masuk ke rumah?"
        },
        rina: {
          witness: "Pembantu Rumah",
          text: `"Non Rina sangat gelisah kemarin setelah menerima surat dari bank. Dia membuatkan kopi Bapak jam 7 malam dan membawanya ke ruang kerja. Dia lalu mengunci pintunya dari luar menggunakan kunci master."`,
          details: "Dia punya akses langsung ke kopi dan mengunci pintu."
        },
        dimas: {
          witness: "Notaris",
          text: `"Dimas sangat marah pada Budi karena kalah tender kompleks baru. Dia terang-terangan mengancam Budi dua hari lalu."`,
          details: "Motif kuat, tapi tidak ada bukti dia berada di rumah itu."
        }
      }
    }
  }
};
