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
  caseFacts: { en: { victim: string; cause: string; timeline: string[] }; id: { victim: string; cause: string; timeline: string[] } };
  exhibits: { en: Exhibit[]; id: Exhibit[] };
  motives: { en: Record<string, string>; id: Record<string, string> };
  evidences: { en: Record<string, string>; id: Record<string, string> };
  witnessStatements: {
    en: Record<string, { witness: string; text: string; details: string }>;
    id: Record<string, { witness: string; text: string; details: string }>;
  };
  tip: { en: string; id: string };
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
    introTitle: { en: "CASE BACKGROUND", id: "LATAR BELAKANG KASUS" },
    introDesc1: {
      en: "At 8:05 AM this morning, Pak Anton was found unconscious in his garden with severe blunt force trauma to the head. Oddly, there was no murder weapon found at the scene, only a puddle of water near the body.",
      id: "Pukul 08:05 pagi ini, Pak Anton ditemukan tidak sadarkan diri di tamannya dengan trauma hantaman tumpul yang parah di kepala. Anehnya, tidak ada senjata pembunuh yang ditemukan di lokasi kejadian, hanya ada genangan air di dekat tubuh korban."
    },
    introDesc2: {
      en: "You have exactly 10 minutes to interrogate the three main suspects, piece together the timeline, and submit an official report. Find out who did it, why they did it, and how the weapon vanished.",
      id: "Anda memiliki waktu tepat 10 menit untuk menginterogasi tiga tersangka utama, menyusun timeline kejadian, dan menyerahkan laporan resmi. Cari tahu siapa pelakunya, mengapa mereka melakukannya, dan bagaimana senjata itu bisa menghilang."
    },
    caseFacts: {
      en: {
        victim: "Pak Anton. Found unconscious in his garden at 8:05 AM with a bump on his head, but no weapon found.",
        cause: "Blunt force trauma from a mysterious projectile.",
        timeline: [
          "7:50 AM: Jono arrives on the street for a delivery.",
          "7:55 AM: Bu Ningsih starts sweeping her yard, angry about the mango leaves.",
          "8:00 AM: Mang Oleh is seen across the street. Bu Ningsih hears a loud THUD from Anton's garden."
        ]
      },
      id: {
        victim: "Pak Anton. Ditemukan pingsan di tamannya pukul 8:05 pagi dengan benjolan di kepala, tapi tidak ada senjata.",
        cause: "Trauma benda tumpul dari proyektil misterius.",
        timeline: [
          "7:50 Pagi: Jono tiba di jalan untuk mengantar paket.",
          "7:55 Pagi: Bu Ningsih mulai menyapu halaman, marah soal daun mangga.",
          "8:00 Pagi: Mang Oleh terlihat di seberang jalan. Bu Ningsih mendengar bunyi BUGH keras dari taman Anton."
        ]
      }
    },
    exhibits: {
      en: [
        {
          id: "exhibit-a",
          title: "Exhibit A: Anton's House",
          description: "Top-down view of the body in the front yard. Note the water puddle near the head.",
          imageSrc: "/images/crime_scene_house.jpg"
        },
        {
          id: "exhibit-b",
          title: "Exhibit B: Mang Oleh's Cart",
          description: "A heavily damaged bakso cart parked at the corner of the street. The thick rubber straps (karet ban) used to tie equipment are snapped.",
          imageSrc: "/images/crime_scene_cart.jpg"
        }
      ],
      id: [
        {
          id: "exhibit-a",
          title: "Barang Bukti A: Rumah Anton",
          description: "Tampak atas tubuh korban di halaman depan. Perhatikan genangan air di dekat kepala.",
          imageSrc: "/images/crime_scene_house.jpg"
        },
        {
          id: "exhibit-b",
          title: "Barang Bukti B: Gerobak Mang Oleh",
          description: "Gerobak bakso yang rusak parah terparkir di ujung jalan. Karet ban tebal yang biasa dipakai mengikat barang tampak putus.",
          imageSrc: "/images/crime_scene_cart.jpg"
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
          imageSrc: "/images/ningsih.jpg",
          gender: "female"
        },
        {
          id: "jono",
          name: "Jono Ojol",
          role: "Delivery Driver",
          description: "Online driver. Suspended because of Anton's 1-star review.",
          initialMessage: "Geez Officer, yeah I'm annoyed at him for that one star. My account got suspended because of it. But I swear, I was only delivering a package down the street at the time.",
          imageSrc: "/images/jono.jpg",
          gender: "male"
        },
        {
          id: "oleh",
          name: "Mang Oleh",
          role: "Bakso Seller",
          description: "His cart was destroyed by Anton's reckless driving.",
          initialMessage: "Excuse me, Officer. I'm just a roaming bakso seller. I haven't seen Pak Anton in days, and I definitely didn't go near his house this morning.",
          imageSrc: "/images/oleh.jpg",
          gender: "male"
        }
      ],
      id: [
        {
          id: "ningsih",
          name: "Bu Ningsih",
          role: "The Neighbor",
          description: "Gossipy neighbor who hated Pak Anton's mango tree.",
          initialMessage: "Aduh, Pak Polisi, saya kaget banget. Saya lagi nyapu halaman, eh tiba-tiba Pak Anton udah terkapar. Mangga-mangganya sih sering jatuh ke pekarangan saya, tapi saya nggak mungkin jahatin dia!",
          imageSrc: "/images/ningsih.jpg",
          gender: "female"
        },
        {
          id: "jono",
          name: "Jono Ojol",
          role: "Delivery Driver",
          description: "Online driver. Suspended because of Anton's 1-star review.",
          initialMessage: "Buset Bang Polisi, emang bener saya gedeg sama dia gara-gara bintang satu. Akun saya sampai anyep. Tapi sumpah, saya cuma nganter paket ke ujung jalan doang pas kejadian.",
          imageSrc: "/images/jono.jpg",
          gender: "male"
        },
        {
          id: "oleh",
          name: "Mang Oleh",
          role: "Bakso Seller",
          description: "His cart was destroyed by Anton's reckless driving.",
          initialMessage: "Punten, Pak Polisi. Saya mah cuma tukang bakso keliling. Saya udah beberapa hari nggak lihat Pak Anton, dan tadi pagi juga saya nggak lewat depan rumahnya.",
          imageSrc: "/images/oleh.jpg",
          gender: "male"
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
    },
    tip: {
      en: "(Tip: One of the suspects made a crucial claim that contradicts a witness statement about the cart.)",
      id: "(Tips: Salah satu tersangka membuat klaim yang bertentangan dengan pernyataan saksi tentang gerobaknya.)"
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
      en: "The autopsy report tells a different story: severe organ failure due to a rare, scentless alkaloid found in 'Kecubung Wulung' (Black Datura). The heavy incense and strange markings were clearly just a staged cover-up. We have three suspects who had access to the house. Find out who poisoned him, and how they used the dark magic rumors to their advantage.",
      id: "Laporan autopsi berkata lain: kegagalan organ fatal akibat alkaloid langka tanpa bau yang ditemukan dalam 'Kecubung Wulung'. Dupa pekat dan simbol aneh itu jelas hanya rekayasa untuk menutupi jejak. Kami punya tiga tersangka yang memiliki akses ke rumah itu. Cari tahu siapa yang meracuninya, dan bagaimana mereka memanfaatkan rumor ilmu hitam tersebut."
    },
    caseFacts: {
      en: {
        victim: "Pak Budi. Found dead in his home office at midnight. No signs of struggle.",
        cause: "Cardiac arrest... but a forensic anomaly found traces of Kecubung (Datura) extract in his system.",
        timeline: [
          "22:25 PM: Maid leaves coffee thermos on the kitchen counter.",
          "22:30 PM: Dimas storms out through the kitchen after a heated argument.",
          "22:35 PM: Rina takes the coffee to Budi. He locks himself in.",
          "23:45 PM: Security cameras catch Mbah Surip leaving a package at the front gate."
        ]
      },
      id: {
        victim: "Pak Budi. Ditemukan tewas di ruang kerjanya pada tengah malam. Tidak ada tanda-tanda perlawanan.",
        cause: "Serangan jantung... tapi keanehan forensik menemukan jejak ekstrak Kecubung (Datura) di sistem tubuhnya.",
        timeline: [
          "22:25 Malam: Pembantu meninggalkan termos kopi di meja dapur.",
          "22:30 Malam: Dimas keluar melalui dapur setelah pertengkaran sengit.",
          "22:35 Malam: Rina membawa kopi ke Budi. Budi mengunci diri dari dalam.",
          "23:45 Malam: Kamera keamanan merekam Mbah Surip meninggalkan sesuatu di gerbang depan."
        ]
      }
    },
    exhibits: {
      en: [
        {
          id: "exhibit-a",
          title: "Exhibit A: The Porch Package",
          description: "A woven bamboo basket left at the front gate. It contains burnt incense, dark flower petals (kembang 7 rupa), and a creepy traditional talisman.",
          imageSrc: "/images/front_porch_package.jpg"
        },
        {
          id: "exhibit-b",
          title: "Exhibit B: Blueprint",
          description: "A blueprint of a new real estate complex. A specific plot of land is circled in angry red ink.",
          imageSrc: "/images/blueprint.jpg"
        }
      ],
      id: [
        {
          id: "exhibit-a",
          title: "Barang Bukti A: Bungkusan di Teras",
          description: "Keranjang bambu anyaman yang ditinggalkan di gerbang depan. Berisi dupa yang dibakar, kelopak bunga gelap (kembang 7 rupa), dan jimat tradisional yang menyeramkan.",
          imageSrc: "/images/front_porch_package.jpg"
        },
        {
          id: "exhibit-b",
          title: "Barang Bukti B: Cetak Biru",
          description: "Cetak biru kompleks perumahan baru. Ada sebidang tanah yang dilingkari dengan tinta merah tebal.",
          imageSrc: "/images/blueprint.jpg"
        }
      ]
    },
    suspects: {
      en: [
        {
          id: "surip",
          name: "Mbah Surip",
          role: "The Dukun",
          description: "Local shaman. AI TRIGGER: He will act mystical and threatening. BUT if the player asks why he was chanting outside the house, why he was at Budi's house, who hired him, or why he left the package, he MUST admit: 'I was just doing my job! A concerned citizen sent a courier with a thick envelope of cash asking for a cleansing ritual.'",
          initialMessage: "Greetings, Officer. I warned him. The spirits always collect their toll. Budi played with forces he didn't understand, and now he has paid the price in blood.",
          imageSrc: "/images/surip.jpg",
          gender: "male"
        },
        {
          id: "rina",
          name: "Rina",
          role: "The Niece",
          description: "Deep in debt, highly defensive about handling the coffee.",
          initialMessage: "I can't believe Uncle Budi is gone! Look, I just made his coffee, that's all! Why is everyone looking at me like I did it for the inheritance money? It was a supernatural curse!",
          imageSrc: "/images/rina.jpg",
          gender: "female"
        },
        {
          id: "dimas",
          name: "Dimas",
          role: "Rival Landlord",
          description: "Fierce competitor who wanted Budi's properties. AI TRIGGER: He will try to play dumb. BUT if the player asks about his alibi, where he was when Budi died, or who killed Budi, he MUST aggressively deflect by saying: 'If you want a murderer, look at that crazy shaman Surip, he's the one who left that cursed package at the front gate!'. DO NOT mention the package at the front gate UNLESS the player asks one of those questions.",
          initialMessage: "Look, I hated the guy, but I'm a businessman, not a wizard. All this 'dark magic' nonsense is just a convenient excuse for whoever actually knocked him off.",
          imageSrc: "/images/dimas.jpg",
          gender: "male"
        }
      ],
      id: [
        {
          id: "surip",
          name: "Mbah Surip",
          role: "The Dukun",
          description: "Local shaman. AI TRIGGER: He will act mystical and threatening. BUT if the player asks why he was chanting outside the house, why he was at Budi's house, who hired him, or why he left the package, he MUST admit: 'Saya cuma melakukan pekerjaan saya! Seorang warga yang peduli mengirim kurir dengan amplop tebal meminta ritual pembersihan.'",
          initialMessage: "Salam, Pak Polisi. Saya sudah peringatkan dia. Roh-roh selalu menagih janji mereka. Budi bermain dengan hal gaib yang tidak ia pahami, dan sekarang ia membayar harganya.",
          imageSrc: "/images/surip.jpg",
          gender: "male"
        },
        {
          id: "rina",
          name: "Rina",
          role: "The Niece",
          description: "Deep in debt, highly defensive about handling the coffee.",
          initialMessage: "Saya nggak percaya Paman Budi meninggal! Dengar, saya cuma buatin dia kopi, itu saja! Kenapa semua orang menatap saya seolah saya melakukannya demi uang warisan? Ini pasti kutukan gaib!",
          imageSrc: "/images/rina.jpg",
          gender: "female"
        },
        {
          id: "dimas",
          name: "Dimas",
          role: "Rival Landlord",
          description: "Fierce competitor who wanted Budi's properties. AI TRIGGER: He will try to play dumb. BUT if the player asks about his alibi, where he was when Budi died, or who killed Budi, he MUST aggressively deflect by saying: 'Kalau mau cari pembunuh, lihat dukun gila Surip itu, dia yang meninggalkan bungkusan terkutuk itu di depan gerbang!'. DO NOT mention the package at the front gate UNLESS the player asks one of those questions.",
          initialMessage: "Dengar ya, saya memang benci dia, tapi saya ini pebisnis, bukan dukun. Semua omong kosong 'ilmu hitam' ini cuma alasan buat siapa pun yang sebenarnya bunuh dia.",
          imageSrc: "/images/dimas.jpg",
          gender: "male"
        }
      ]
    },
    motives: {
      en: {
        spiritual_debt: "Hired Proxy: Dimas anonymously paid Surip to perform the ritual.",
        inheritance: "Inheritance & Debt: She needed money to pay off massive bank debts.",
        rivalry: "Real Estate Deal: Desperate to eliminate Budi to secure a highly lucrative real estate deal."
      },
      id: {
        spiritual_debt: "Proxy Bayaran: Dimas membayar Surip secara anonim untuk melakukan ritual.",
        inheritance: "Warisan & Hutang: Dia butuh uang untuk melunasi hutang bank yang besar.",
        rivalry: "Kesepakatan Properti: Sangat ingin menyingkirkan Budi untuk mengamankan properti."
      }
    },
    evidences: {
      en: {
        incense: "The Incense Alibi: Used the thick incense smoke to cover the bitter almond scent of the poison.",
        coffee: "The Poisoned Coffee: Synthetic scopolamine (a chemical matching Kecubung's properties) was slipped into his coffee thermos.",
        locked_room: "The Locked Room: Frame job to make it look like a supernatural closed-room incident."
      },
      id: {
        incense: "Alibi Dupa: Menggunakan asap dupa yang pekat untuk menutupi bau almond pahit dari racun.",
        coffee: "Kopi Beracun: Skopolamin sintetis (sifatnya sama dengan Kecubung) dimasukkan ke dalam termos.",
        locked_room: "Kamar Terkunci: Rekayasa untuk membuatnya terlihat seperti insiden supernatural ruang tertutup."
      }
    },
    witnessStatements: {
      en: {
        surip: {
          witness: "Security Guard",
          text: `"Mbah Surip was seen outside the house chanting an hour before Budi died. He was cursing Budi's name and left an envelope of incense on the porch, likely out of spite for the demolished shrine."`,
          details: "Rina was seen performing a private ritual with him a few days prior."
        },
        rina: {
          witness: "House Maid",
          text: `"Non Rina was very anxious yesterday after receiving a letter from the bank. She took the coffee from the kitchen counter at 22:35 and brought it to Bapak's study. Bapak locked himself in afterwards."`,
          details: "She brought him the coffee."
        },
        dimas: {
          witness: "Notary Public",
          text: `"Dimas stormed out of Budi's study at 22:30. He was furious about the real estate deal and yelled that Budi would 'pay for this'. He slammed the door, leaving Budi alone."`,
          details: "He was the last person to see Budi alive before the coffee arrived, and he was very angry."
        }
      },
      id: {
        surip: {
          witness: "Satpam",
          text: `"Mbah Surip terlihat merapal mantra di luar rumah sejam sebelum Budi meninggal. Dia mengutuk nama Budi dan meninggalkan bungkusan dupa di teras, kemungkinan karena dendam atas penggusuran situsnya."`,
          details: "Rina terlihat melakukan ritual pribadi bersamanya beberapa hari sebelumnya."
        },
        rina: {
          witness: "Pembantu Rumah",
          text: `"Non Rina sangat gelisah kemarin setelah menerima surat dari bank. Dia mengambil kopi dari meja dapur jam 22:35 dan membawanya ke ruang kerja Bapak. Bapak lalu mengunci dirinya dari dalam."`,
          details: "Dia membawa kopi kepadanya."
        },
        dimas: {
          witness: "Notaris",
          text: `"Dimas keluar dari ruang kerja Budi jam 22:30 dengan marah. Dia berteriak bahwa Budi akan 'membayar untuk ini', lalu membanting pintu, meninggalkan Budi sendirian."`,
          details: "Dia orang terakhir yang melihat Budi hidup sebelum kopi diantar, dan dia sangat marah."
        }
      }
    },
    tip: {
      en: "(Tip: The timeline holds the key. Pay attention to who passed by the coffee, and what was left at the front gate.)",
      id: "(Tips: Garis waktu adalah kuncinya. Perhatikan siapa yang melewati kopi, dan apa yang ditinggalkan di gerbang depan.)"
    }
  }
};
