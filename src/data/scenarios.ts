import type { Scenario } from "../types/simulation";

export const SCENARIOS: Scenario[] = [
  {
    id: "promo-kilat",
    moduleLabel: "Modul 01 / Tekanan Diskon",
    title: "Promo Kilat",
    situation:
      "Kamu melihat barang yang sudah lama kamu incar sedang diskon sampai malam ini. Kalau dibeli sekarang, uang minggu ini jadi lebih sempit.",
    reflectionPrompt:
      "Apa yang biasanya kamu pertimbangkan saat sebuah promo terasa harus diambil hari itu juga?",
    measures: "Impulsivitas / Anggaran / Kemampuan Jeda",
    choices: [
      {
        id: "ambil-sekarang",
        text: "Beli sekarang saat diskonnya masih aktif.",
        statEffects: { money: -80000, mood: -3, targetProgress: -6 },
        riskEffects: { impulsivity: 3, rewardSensitivity: 1 },
        protectiveEffects: { budgeting: -1, pauseAbility: -1 },
        feedback:
          "Keputusan ini memberi rasa lega singkat, tapi ruang uangmu langsung ikut menyempit. Saat jeda untuk berpikir tidak dipakai, kamu jadi lebih mudah menyesal setelahnya karena dampaknya muncul lebih lama daripada rasa senangnya.",
        principle:
          "Keputusan yang diambil terlalu cepat sering terasa aman di awal, padahal beban utamanya baru kelihatan setelah uang terpakai.",
      },
      {
        id: "versi-murah",
        text: "Pilih versi yang lebih murah dari barang itu.",
        statEffects: { money: -35000, mood: 1, targetProgress: -2 },
        riskEffects: { impulsivity: 1, rewardSensitivity: 1 },
        protectiveEffects: { budgeting: -1 },
        feedback:
          "Kamu tetap ikut momen promosinya, tetapi tetap ada biaya yang keluar. Pilihan ini memang terasa lebih ringan, namun tetap mengurangi ruang gerak untuk kebutuhan lain di minggu yang sama.",
        principle:
          "Kompromi kecil bisa terasa wajar, tetapi tetap perlu dihitung supaya tidak membuat anggaran menyempit tanpa sadar.",
      },
      {
        id: "cek-budget",
        text: "Bandingkan harga dan cek sisa budget dulu.",
        statEffects: { money: 0, mood: 2, targetProgress: 4 },
        riskEffects: {},
        protectiveEffects: { budgeting: 3, pauseAbility: 2, riskChecking: 1 },
        feedback:
          "Langkah ini menahan keputusan agar tidak cuma mengikuti rasa ingin punya. Dengan membandingkan harga, kamu memberi diri sendiri kesempatan untuk memilih berdasarkan kebutuhan dan kondisi nyata, bukan hanya dorongan sesaat.",
        principle:
          "Mengecek angka dulu membantu menjaga uang, karena keputusan jadi lebih dekat ke kebutuhan daripada ke dorongan.",
      },
      {
        id: "tunda-cerita",
        text: "Tunda sebentar dan minta pendapat teman.",
        statEffects: { money: 0, mood: 1, relationship: 1, targetProgress: 5 },
        riskEffects: {},
        protectiveEffects: {
          pauseAbility: 3,
          helpSeeking: 2,
          budgeting: 1,
        },
        feedback:
          "Dengan menunda, kamu memutus arus keputusan yang terlalu spontan. Masukan dari teman bisa membantu melihat apakah barang itu benar-benar perlu atau cuma terasa mendesak karena waktunya terbatas.",
        principle:
          "Menunda sebentar dan minta sudut pandang lain sering lebih aman daripada langsung ikut dorongan pertama.",
      },
    ],
  },
  {
    id: "ajakan-teman",
    moduleLabel: "Modul 02 / Tekanan Sosial",
    title: "Ajakan Teman",
    situation:
      "Teman-teman mengajak ikut kegiatan berbayar yang kelihatannya seru. Banyak yang sudah ikut, tapi kamu belum sempat cek budget.",
    reflectionPrompt:
      "Saat ada ajakan seperti ini, apa yang biasanya paling dulu kamu pikirkan?",
    measures: "Tekanan Teman / Anggaran / Pengecekan Risiko",
    choices: [
      {
        id: "ikut-langsung",
        text: "Ikut kegiatan itu bersama teman-teman.",
        statEffects: { money: -90000, mood: 2, targetProgress: -4 },
        riskEffects: { peerPressure: 3, impulsivity: 1 },
        protectiveEffects: { budgeting: -1, riskChecking: -1 },
        feedback:
          "Kamu mendapat rasa kebersamaan, tetapi belum sempat menimbang efeknya ke saldo. Saat keputusan dibuat karena tidak ingin ketinggalan, biaya sosialnya sering baru terasa setelah acara selesai dan uang mulai dihitung ulang.",
        principle:
          "Ikut bersama teman memang menyenangkan, tapi keputusan yang lahir dari tekanan kelompok tetap bisa menguras uang lebih cepat dari yang terasa.",
      },
      {
        id: "iuran-kecil",
        text: "Ikut dengan porsi biaya yang lebih kecil.",
        statEffects: { money: -35000, mood: 3, relationship: 1, targetProgress: -1 },
        riskEffects: { peerPressure: 1 },
        protectiveEffects: {},
        feedback:
          "Pilihan ini menjaga kamu tetap terhubung dengan grup, dan biayanya tidak sebesar ikut penuh. Meski begitu, tetap ada pengeluaran yang perlu kamu pikirkan supaya kebiasaan 'ambil sedikit saja' tidak berubah jadi pola yang terus berulang.",
        principle:
          "Porsi kecil bisa jadi jalan tengah, asalkan benar-benar masih cocok dengan kondisi uangmu.",
      },
      {
        id: "cek-dulu",
        text: "Cek budget dulu sebelum membalas ajakan.",
        statEffects: { money: 0, mood: 1, targetProgress: 2 },
        riskEffects: {},
        protectiveEffects: {
          budgeting: 2,
          riskChecking: 2,
          pauseAbility: 1,
        },
        feedback:
          "Kamu memberi jarak sebentar antara ajakan dan respons. Jeda ini penting karena membantu kamu menilai apakah partisipasi itu cocok dengan keuanganmu, bukan sekadar cocok dengan suasana grup.",
        principle:
          "Balas pelan tidak sama dengan menolak; itu justru cara menjaga keputusan tetap selaras dengan keadaanmu.",
      },
      {
        id: "bilang-jujur",
        text: "Sampaikan bahwa kamu perlu cek uang dulu.",
        statEffects: { money: 0, mood: 1, relationship: 2, targetProgress: 3 },
        riskEffects: { peerPressure: -1 },
        protectiveEffects: {
          pauseAbility: 2,
          helpSeeking: 2,
          riskChecking: 1,
        },
        feedback:
          "Kejujuran seperti ini sering meringankan tekanan, karena kamu tidak memaksakan diri menjawab cepat. Hubungan juga bisa tetap hangat saat kamu bilang dulu bahwa kamu ingin memastikan kondisi uangmu aman.",
        principle:
          "Kalimat yang sopan dan jujur sering lebih kuat daripada ikut demi terlihat aman di mata orang lain.",
      },
    ],
  },
  {
    id: "cara-cepat-uang",
    moduleLabel: "Modul 03 / Tawaran Cepat",
    title: "Cara Cepat Dapat Uang",
    situation:
      "Seorang teman cerita soal event online yang katanya bisa memberi uang dengan cepat. Detailnya belum jelas, tapi dia menyebut beberapa orang sudah berhasil.",
    reflectionPrompt:
      "Apa yang membuat sebuah tawaran terdengar menarik walau informasinya masih belum lengkap?",
    measures: "Sensitivitas Hadiah / Pengecekan Risiko / Tekanan Teman",
    choices: [
      {
        id: "coba-langsung",
        text: "Coba ikut dengan modal sendiri.",
        statEffects: { money: -100000, mood: -5, targetProgress: -3 },
        riskEffects: { rewardSensitivity: 3, illusionOfControl: 2, peerPressure: 1 },
        protectiveEffects: { riskChecking: -1 },
        feedback:
          "Kamu bergerak cepat karena tertarik pada hasil yang dijanjikan. Masalahnya, tanpa verifikasi yang cukup, peluang rugi menjadi lebih besar daripada peluang untung, dan itu biasanya ikut menekan mood setelahnya.",
        principle:
          "Tawaran yang terdengar meyakinkan tetap perlu dicek, karena rasa optimis tidak selalu berarti risikonya kecil.",
      },
      {
        id: "coba-gratis",
        text: "Coba versi gratis atau baca infonya dulu.",
        statEffects: { money: -15000, mood: 1, targetProgress: 1 },
        riskEffects: { rewardSensitivity: 1 },
        protectiveEffects: { riskChecking: 1 },
        feedback:
          "Kamu masih memberi ruang untuk penasaran, tetapi tidak langsung masuk terlalu dalam. Langkah kecil seperti ini membantu mengurangi risiko karena kamu bisa menilai dulu apakah tawarannya masuk akal sebelum menghabiskan uang lebih banyak.",
        principle:
          "Riset awal memang tidak selalu seru, tapi sering jauh lebih murah daripada salah melangkah lebih jauh.",
      },
      {
        id: "verifikasi",
        text: "Cari info dari beberapa sumber lain.",
        statEffects: { money: 0, mood: 2, targetProgress: 4 },
        riskEffects: { rewardSensitivity: -1 },
        protectiveEffects: { riskChecking: 3, pauseAbility: 1 },
        feedback:
          "Kamu memilih memisahkan cerita orang dari bukti yang bisa dicek. Cara ini biasanya membuat keputusan lebih tenang, karena kamu tidak hanya bergantung pada satu versi cerita yang mungkin terlalu bagus untuk dipercaya bulat-bulat.",
        principle:
          "Semakin penting tawarannya, semakin wajar kalau kamu minta bukti yang lebih jelas dulu.",
      },
      {
        id: "tanya-orang",
        text: "Tanya orang yang lebih paham dulu.",
        statEffects: { money: 0, mood: 2, relationship: 1, targetProgress: 3 },
        riskEffects: { rewardSensitivity: -1 },
        protectiveEffects: { riskChecking: 2, helpSeeking: 2 },
        feedback:
          "Kamu tidak memaksa diri menebak sendiri. Dengan minta pendapat orang yang paham, kamu punya kesempatan untuk melihat sisi yang mungkin terlewat, sekaligus mengurangi keputusan yang lahir dari rasa ingin cepat selesai.",
        principle:
          "Minta pendapat bukan tanda ragu berlebihan; itu cara sederhana untuk mengurangi salah langkah.",
      },
    ],
  },
  {
    id: "sudah-keluar-uang",
    moduleLabel: "Modul 04 / Saat Rugi",
    title: "Sudah Keluar Uang",
    situation:
      "Kamu sudah keluar uang untuk sesuatu yang ternyata tidak sesuai harapan. Ada opsi menambah uang supaya hasilnya 'mungkin' membaik.",
    reflectionPrompt:
      "Saat merasa rugi, langkah apa yang paling sering terasa paling masuk akal buatmu?",
    measures: "Mengejar Kerugian / Kemampuan Berhenti / Pengaturan Emosi",
    choices: [
      {
        id: "tambah-modal",
        text: "Tambah uang agar hasilnya punya peluang membaik.",
        statEffects: { money: -90000, mood: -10, targetProgress: -5 },
        riskEffects: {
          lossChasing: 3,
          impulsivity: 1,
          emotionCoping: 1,
        },
        protectiveEffects: { stoppingAbility: -1 },
        feedback:
          "Dorongan untuk menutup rugi membuat kamu menambah beban baru. Biasanya ini justru memperpanjang rasa kecewa, karena keputusan tambahan dibuat untuk mengejar sesuatu yang sudah tidak berjalan seperti yang diharapkan.",
        principle:
          "Mengejar kerugian sering membuat masalah membesar, karena fokusnya pindah dari evaluasi ke keinginan menebus.",
      },
      {
        id: "lihat-dulu",
        text: "Tunggu sebentar sebelum menentukan langkah.",
        statEffects: { mood: -3, targetProgress: 0 },
        riskEffects: { lossChasing: 1 },
        protectiveEffects: { pauseAbility: 1, stoppingAbility: 1 },
        feedback:
          "Kamu belum langsung masuk lagi, dan itu membantu menahan keputusan yang terburu-buru. Meski emosinya masih ada, jeda seperti ini bisa mencegah langkah tambahan yang tidak perlu saat kepala belum sepenuhnya dingin.",
        principle:
          "Jeda singkat sering berguna untuk menghindari keputusan lanjutan yang hanya lahir dari rasa kesal.",
      },
      {
        id: "stop-evaluasi",
        text: "Berhenti dulu dan hitung posisi sekarang.",
        statEffects: { mood: -2, targetProgress: 3 },
        riskEffects: { lossChasing: -1, emotionCoping: -1 },
        protectiveEffects: { stoppingAbility: 2, budgeting: 1 },
        feedback:
          "Kamu memilih berhenti sebelum kerugian bertambah. Evaluasi seperti ini membantu karena kamu memindahkan fokus dari 'menyelamatkan keadaan' ke 'belajar dari kejadian', dan itu biasanya lebih aman untuk uang maupun pikiran.",
        principle:
          "Berhenti memang tidak enak di awal, tetapi sering lebih sehat daripada memaksa lanjut hanya demi menutup rasa rugi.",
      },
      {
        id: "cerita-orang",
        text: "Ceritakan situasinya ke orang yang dipercaya.",
        statEffects: { mood: 5, relationship: 2, targetProgress: 2 },
        riskEffects: { secrecy: -1, lossChasing: -1 },
        protectiveEffects: { helpSeeking: 2, stoppingAbility: 2, pauseAbility: 1 },
        feedback:
          "Menceritakan situasinya bisa mengurangi beban yang kamu pikul sendiri. Selain menenangkan, cara ini juga memberi ruang buat orang lain melihat kondisi yang mungkin sulit kamu nilai saat emosi masih kuat.",
        principle:
          "Perspektif dari orang yang kamu percaya sering membantu mematahkan dorongan untuk terus mengejar kerugian.",
      },
    ],
  },
  {
    id: "hari-berat",
    moduleLabel: "Modul 05 / Emosi & Uang",
    title: "Hari yang Berat",
    situation:
      "Hari ini kamu dapat nilai atau feedback yang tidak sesuai harapan. Mood turun dan kamu ingin melakukan sesuatu yang cepat bikin lega.",
    reflectionPrompt:
      "Saat mood turun, biasanya kamu paling ingin melakukan apa dulu?",
    measures: "Pengaturan Emosi / Impulsivitas / Kemampuan Jeda",
    choices: [
      {
        id: "beli-penghiburan",
        text: "Beli sesuatu yang sudah lama diinginkan.",
        statEffects: { money: -120000, mood: 5, focus: -3, targetProgress: -4 },
        riskEffects: { emotionCoping: 3, impulsivity: 2 },
        protectiveEffects: { budgeting: -1 },
        feedback:
          "Belanja seperti ini bisa memberi dorongan lega singkat, tetapi biasanya tidak menyelesaikan sumber sedihnya. Setelah efek awal mereda, kamu masih harus menghadapi perasaan yang sama sambil memikirkan uang yang sudah terpakai.",
        principle:
          "Penghiburan yang cepat tidak selalu menenangkan dalam jangka lebih panjang, apalagi kalau biayanya cukup besar.",
      },
      {
        id: "jajan-online",
        text: "Pilih jajan atau hiburan ringan.",
        statEffects: { money: -45000, mood: 3, targetProgress: -1 },
        riskEffects: { emotionCoping: 1, impulsivity: 1 },
        protectiveEffects: {},
        feedback:
          "Cara ini terasa lebih ringan dibanding belanja besar, dan wajar kalau mood sedikit terangkat. Tetap saja, kalau dipakai terus setiap kali capek atau kecewa, pengeluaran kecil yang berulang bisa pelan-pelan menggerus saldo.",
        principle:
          "Hiburan kecil tidak salah, tetapi tetap perlu batas supaya tidak berubah jadi pelarian yang mahal.",
      },
      {
        id: "resep-non-uang",
        text: "Ambil waktu untuk jurnal, jalan kaki, atau musik.",
        statEffects: { mood: 6, focus: 3, targetProgress: 2 },
        riskEffects: { emotionCoping: -1 },
        protectiveEffects: {
          pauseAbility: 3,
          budgeting: 1,
          stoppingAbility: 1,
        },
        feedback:
          "Kamu memilih cara yang memberi jeda tanpa memotong saldo. Ini membantu karena emosi tetap diberi ruang, tetapi tidak langsung diterjemahkan jadi pengeluaran, sehingga kepala lebih mudah kembali tenang dan fokus pelan-pelan pulih.",
        principle:
          "Cara menenangkan diri yang tidak memakai uang sering lebih stabil karena tidak menambah beban baru.",
      },
      {
        id: "cerita-cerita",
        text: "Cerita ke teman atau orang yang dipercaya.",
        statEffects: { mood: 8, relationship: 2, targetProgress: 2 },
        riskEffects: { secrecy: -1, emotionCoping: -1 },
        protectiveEffects: {
          helpSeeking: 3,
          pauseAbility: 2,
        },
        feedback:
          "Bercerita membuat beban emosinya lebih ringan, karena kamu tidak menahan semuanya sendirian. Saat perasaan sudah didengar, dorongan untuk mencari pelarian cepat biasanya ikut berkurang dan keputusan uang jadi lebih jernih.",
        principle:
          "Berbagi cerita sering lebih efektif daripada menunggu mood membaik sendirian.",
      },
    ],
  },
  {
    id: "sudah-paham-pola",
    moduleLabel: "Modul 06 / Feeling vs Data",
    title: "Merasa Sudah Paham Polanya",
    situation:
      "Kamu merasa sudah bisa menebak kapan sebuah promo atau kesempatan itu paling menguntungkan. Padahal kamu baru melihat polanya dari beberapa contoh saja.",
    reflectionPrompt:
      "Apa yang membuatmu merasa cukup yakin meski data yang kamu lihat masih sedikit?",
    measures: "Ilusi Kontrol / Pengecekan Risiko",
    choices: [
      {
        id: "naikkan-komitmen",
        text: "Naikkan komitmen sesuai keyakinanmu.",
        statEffects: { money: -150000, mood: -5, targetProgress: -6 },
        riskEffects: { illusionOfControl: 3, rewardSensitivity: 1 },
        protectiveEffects: { riskChecking: -2 },
        feedback:
          "Saat feeling terasa terlalu yakin, kamu jadi mudah menutup mata pada data yang belum cukup. Masalahnya, keyakinan yang tidak diuji sering membuat keputusan terlihat mantap di awal tetapi rapuh saat hasil nyata muncul.",
        principle:
          "Keyakinan yang belum ditopang data cukup rawan menyesatkan, terutama kalau nominalnya mulai besar.",
      },
      {
        id: "jumlah-sedang",
        text: "Ikut dengan jumlah yang lebih terbatas.",
        statEffects: { money: -60000, mood: -2, targetProgress: -2 },
        riskEffects: { illusionOfControl: 1 },
        protectiveEffects: {},
        feedback:
          "Membatasi jumlah memang sedikit menahan risiko, tetapi belum menyentuh soal utama: apakah asumsi dasarnya benar. Kalau dasar pikirannya masih lemah, nominal yang sedang sekalipun tetap bisa terasa berat ketika hasilnya tidak sesuai.",
        principle:
          "Mengurangi besar kecilnya langkah membantu, tapi tetap belum menggantikan kebutuhan untuk cek data.",
      },
      {
        id: "cek-data",
        text: "Cek data historis dan opsi pembanding.",
        statEffects: { mood: 2, focus: 2, targetProgress: 3 },
        riskEffects: { illusionOfControl: -1 },
        protectiveEffects: { riskChecking: 3, stoppingAbility: 1 },
        feedback:
          "Kamu memilih melihat pola yang bisa diperiksa, bukan hanya sensasi yang terasa meyakinkan. Ini membantu karena keputusan jadi lebih dekat ke kenyataan, sehingga kamu tidak mudah tertipu oleh cerita yang kebetulan terdengar pas.",
        principle:
          "Data yang cukup sering menyelamatkan kamu dari rasa yakin yang datang terlalu cepat.",
      },
      {
        id: "second-opinion",
        text: "Tunda keputusan dan minta pendapat lain.",
        statEffects: { mood: 1, relationship: 1, targetProgress: 2 },
        riskEffects: { illusionOfControl: -1 },
        protectiveEffects: {
          pauseAbility: 2,
          helpSeeking: 2,
          riskChecking: 2,
        },
        feedback:
          "Menunda memberi ruang untuk cek ulang sebelum mengikat diri. Orang lain kadang bisa melihat pola yang kita abaikan karena sudah terlalu percaya pada tebakan sendiri, jadi masukan tambahan sering berguna saat datanya belum kuat.",
        principle:
          "Second opinion membantu menahan keputusan yang terasa pintar tapi belum cukup terbukti.",
      },
    ],
  },
  {
    id: "target-hampir-tercapai",
    moduleLabel: "Modul 07 / Menjaga Target",
    title: "Target Hampir Tercapai",
    situation:
      "Target tabunganmu hampir tercapai. Ada tawaran baru yang bisa menghabiskan sebagian uang, tapi rasanya sayang dilewatkan.",
    reflectionPrompt:
      "Apa yang kamu rasakan saat target sudah dekat tetapi ada godaan baru muncul?",
    measures: "Kemampuan Berhenti / Sensitivitas Hadiah / Anggaran",
    choices: [
      {
        id: "pakai-target",
        text: "Pakai sebagian uang target untuk tawaran itu.",
        statEffects: { money: -200000, mood: -3, targetProgress: -15 },
        riskEffects: { rewardSensitivity: 2, impulsivity: 1 },
        protectiveEffects: { stoppingAbility: -2, budgeting: -1 },
        feedback:
          "Saat target sudah dekat, tawaran baru bisa terasa sangat menggoda. Namun begitu uang target dipakai, jarak ke tujuan melebar lagi, dan itu sering membuat semangat menabung ikut turun karena kemajuannya terasa mundur.",
        principle:
          "Godaan yang terlihat menguntungkan bisa menghapus progres yang sudah susah payah dibangun.",
      },
      {
        id: "pakai-sebagian",
        text: "Pakai porsi kecil dari uang yang ada.",
        statEffects: { money: -80000, mood: 1, targetProgress: -5 },
        riskEffects: { rewardSensitivity: 1 },
        protectiveEffects: {},
        feedback:
          "Pilihan ini menjaga sebagian target, tetapi tetap membuka pintu pengeluaran tambahan. Kalau dilakukan berulang, kebiasaan 'sedikit saja' bisa menjadi cara halus untuk terus menggeser batas yang seharusnya dijaga.",
        principle:
          "Porsi kecil masih perlu dilihat sebagai keputusan nyata, bukan sekadar versi aman dari pengeluaran besar.",
      },
      {
        id: "jaga-target",
        text: "Simpan target dan lewati tawaran ini.",
        statEffects: { mood: 3, targetProgress: 8 },
        riskEffects: { rewardSensitivity: -1 },
        protectiveEffects: {
          stoppingAbility: 3,
          budgeting: 1,
          pauseAbility: 1,
        },
        feedback:
          "Kamu menjaga arah yang sudah dibangun dari awal. Meski terasa menahan diri, keputusan seperti ini sering membuat target lebih cepat tercapai karena uang tidak pecah ke banyak arah yang belum tentu penting.",
        principle:
          "Berhenti di waktu yang tepat adalah bagian penting dari menjaga progres tetap utuh.",
      },
      {
        id: "diskusi",
        text: "Bahas dulu tawaran itu dengan orang terpercaya.",
        statEffects: { mood: 2, relationship: 2, targetProgress: 3 },
        riskEffects: {},
        protectiveEffects: {
          helpSeeking: 3,
          riskChecking: 2,
          stoppingAbility: 3,
        },
        feedback:
          "Melibatkan orang lain bisa membantu kamu menimbang apakah tawaran itu memang layak atau hanya terasa sayang dilewatkan. Saat keputusan dibahas bersama, kamu biasanya lebih mudah melihat nilai target yang sudah mendekat dan tidak buru-buru mengorbankannya.",
        principle:
          "Percakapan yang jujur sering membantu menjaga target tetap aman saat godaan muncul.",
      },
    ],
  },
  {
    id: "sembunyi-cerita",
    moduleLabel: "Modul 08 / Cerita atau Simpan",
    title: "Sembunyi atau Cerita",
    situation:
      "Beberapa waktu lalu kamu mengambil keputusan uang yang kamu sesali. Kamu takut dinilai boros kalau cerita.",
    reflectionPrompt:
      "Kalau menghadapi keputusan yang kamu sesali, biasanya kamu cenderung diam atau cerita?",
    measures: "Kerahasiaan / Meminta Bantuan",
    choices: [
      {
        id: "simpan-sendiri",
        text: "Simpan dulu untuk diri sendiri.",
        statEffects: { mood: -3, relationship: -1, targetProgress: 0 },
        riskEffects: { secrecy: 3, emotionCoping: 1 },
        protectiveEffects: { helpSeeking: -1 },
        feedback:
          "Menahan semuanya sendiri sering terasa lebih aman di awal, tetapi beban emosinya tetap ikut dibawa. Kalau hal yang disesali tidak dibicarakan atau ditulis ulang, pikiran biasanya terus kembali ke situ dan bikin kepala lebih penuh.",
        principle:
          "Masalah yang disimpan memang tidak terlihat, tapi belum tentu berkurang bebannya.",
      },
      {
        id: "cerita-sebagian",
        text: "Ceritakan garis besarnya saja.",
        statEffects: { mood: 0, relationship: 1 },
        riskEffects: { secrecy: 1 },
        protectiveEffects: {},
        feedback:
          "Kamu mulai membuka ruang, walau belum sepenuhnya. Ini bisa membantu sedikit karena beban tidak disimpan rapat-rapat, tetapi kalau informasinya terlalu kabur, orang lain juga jadi sulit memberi masukan yang benar-benar berguna.",
        principle:
          "Cerita setengah jalan kadang membantu, tetapi belum tentu cukup untuk mengurai masalah dengan jelas.",
      },
      {
        id: "tulis-pribadi",
        text: "Tulis di catatan pribadi dan evaluasi sendiri.",
        statEffects: { mood: 2, focus: 1, targetProgress: 2 },
        riskEffects: { secrecy: -1 },
        protectiveEffects: { budgeting: 2, stoppingAbility: 1 },
        feedback:
          "Menulis membantu kamu melihat kejadian dengan lebih pelan. Saat pengalaman itu dipindahkan ke catatan, kamu punya jarak untuk menilai apa yang sebenarnya terjadi, tanpa harus langsung menanggung rasa malu di depan orang lain.",
        principle:
          "Mencatat ulang kejadian bisa membantu kamu belajar tanpa harus membuka semuanya ke banyak orang.",
      },
      {
        id: "cerita-aman",
        text: "Cerita ke orang yang terasa aman.",
        statEffects: { mood: 5, relationship: 3, targetProgress: 2 },
        riskEffects: { secrecy: -2, emotionCoping: -1 },
        protectiveEffects: {
          helpSeeking: 3,
          budgeting: 2,
        },
        feedback:
          "Memilih orang yang aman membuat cerita lebih mudah dibawa. Selain mengurangi rasa sendirian, percakapan seperti ini juga sering membantu kamu melihat keputusan yang sama dari sudut yang lebih tenang daripada saat dipikirkan sendirian.",
        principle:
          "Membuka cerita ke orang yang tepat sering lebih menenangkan daripada menanggung semuanya sendiri.",
      },
    ],
  },
  {
    id: "deadline-fokus",
    moduleLabel: "Modul 09 / Fokus & Prioritas",
    title: "Deadline dan Fokus",
    situation:
      "Kamu punya deadline tugas besar. Di saat yang sama, pikiranmu juga tertuju pada cara mendapat uang tambahan cepat karena saldo mulai menipis.",
    reflectionPrompt:
      "Saat dua hal penting bersaing, apa yang biasanya paling mudah terdorong ke belakang?",
    measures: "Gangguan Fungsional / Fokus / Pengecekan Risiko",
    choices: [
      {
        id: "ambil-tawaran",
        text: "Ambil peluang uang cepat yang sedang muncul.",
        statEffects: { money: -150000, mood: -5, focus: -15, targetProgress: -6 },
        riskEffects: {
          functionalImpairment: 3,
          rewardSensitivity: 1,
          impulsivity: 1,
        },
        protectiveEffects: { riskChecking: -1 },
        feedback:
          "Saat fokus pecah, dua hal yang sama-sama penting bisa saling mengganggu. Keputusan yang diambil demi uang cepat sering membuat tugas terbengkalai dan hasil akhirnya justru menambah stres, karena kamu kehilangan waktu dan energi di dua arah sekaligus.",
        principle:
          "Kalau terlalu banyak hal didorong bersamaan, fokus mudah pecah dan dampaknya merembet ke mana-mana.",
      },
      {
        id: "sambil-cek",
        text: "Kerjakan tugas sambil memantau peluang uang.",
        statEffects: { money: -20000, focus: -8, targetProgress: -1 },
        riskEffects: { functionalImpairment: 1 },
        protectiveEffects: {},
        feedback:
          "Kamu masih bergerak di dua arah, tapi perhatianmu jadi terpecah. Hasilnya biasanya tidak seefektif yang terlihat, karena otak harus bolak-balik pindah konteks dan itu menguras fokus lebih cepat.",
        principle:
          "Multitasking sering terasa produktif, padahal kadang justru membuat hasil dua hal sama-sama turun.",
      },
      {
        id: "fokus-tugas",
        text: "Selesaikan tugas dulu, urus yang lain setelahnya.",
        statEffects: { mood: 2, focus: 6, targetProgress: 3 },
        riskEffects: { functionalImpairment: -1 },
        protectiveEffects: {
          stoppingAbility: 3,
          budgeting: 1,
          pauseAbility: 1,
        },
        feedback:
          "Kamu memberi urutan yang jelas pada prioritasmu. Dengan satu hal dikerjakan penuh terlebih dahulu, energi mental tidak terbagi terlalu banyak, dan itu biasanya membuat hasil akhir lebih rapi serta keputusan keuangan lebih tenang setelah deadline selesai.",
        principle:
          "Memilih prioritas bukan berarti mengabaikan yang lain; kadang itu cara paling sehat untuk menjaga fokus.",
      },
      {
        id: "minta-waktu",
        text: "Minta waktu tambahan atau jelaskan situasi.",
        statEffects: { mood: 3, focus: 5, relationship: 2, targetProgress: 2 },
        riskEffects: { functionalImpairment: -1 },
        protectiveEffects: {
          helpSeeking: 3,
          pauseAbility: 2,
        },
        feedback:
          "Minta waktu atau menjelaskan situasi bisa mengurangi tekanan yang kamu tanggung sendirian. Saat orang lain memahami kondisi nyata yang kamu hadapi, beban mental biasanya turun dan kamu punya ruang lebih baik untuk menyusun langkah berikutnya.",
        principle:
          "Meminta waktu yang wajar adalah cara praktis untuk menjaga fokus dan mencegah salah langkah.",
      },
    ],
  },
  {
    id: "akhir-bulan",
    moduleLabel: "Modul 10 / Sampai Akhir Bulan",
    title: "Akhir Bulan",
    situation:
      "Sisa uangmu terbatas. Beberapa hari ke depan akan jadi masa paling ketat, dan kamu harus memilih strategi untuk bertahan sampai periode ini selesai.",
    reflectionPrompt:
      "Strategi apa yang paling mungkin kamu andalkan saat kondisi keuangan lagi ketat?",
    measures: "Integrasi Keseluruhan / Anggaran / Meminta Bantuan / Kemampuan Berhenti",
    choices: [
      {
        id: "coba-cepat",
        text: "Coba cara cepat untuk menambah uang.",
        statEffects: { money: -50000, mood: -5, focus: -5, targetProgress: -3 },
        riskEffects: {
          functionalImpairment: 2,
          rewardSensitivity: 2,
          impulsivity: 1,
        },
        protectiveEffects: { stoppingAbility: -1 },
        feedback:
          "Saat kondisi sudah ketat, jalan pintas sering terlihat paling menggoda. Masalahnya, langkah cepat seperti ini bisa menambah beban baru jika hasilnya tidak jelas, sementara energi yang tersisa justru makin menipis.",
        principle:
          "Di masa serba sempit, keputusan yang terlalu cepat lebih mudah mengganggu stabilitas yang sudah dibangun.",
      },
      {
        id: "hemat-keras",
        text: "Atur pengeluaran dengan batas yang ketat.",
        statEffects: { money: -10000, mood: -15, focus: -5, relationship: -3, targetProgress: 2 },
        riskEffects: { functionalImpairment: 1 },
        protectiveEffects: { budgeting: 1 },
        feedback:
          "Kamu bertahan, tetapi batas yang terlalu ketat bisa ikut membebani tubuh dan pikiran. Kalau kebutuhan dasar terlalu ditekan, fokus turun, mood ikut turun, dan keputusan berikutnya jadi lebih mudah goyah karena kamu sudah kelelahan duluan.",
        principle:
          "Hemat itu penting, tetapi tetap perlu realistis supaya tidak merusak kondisi tubuh dan pikiran.",
      },
      {
        id: "rencana-masak",
        text: "Buat prioritas dan rencana makan minggu ini.",
        statEffects: { mood: 3, focus: 3, targetProgress: 8 },
        riskEffects: {},
        protectiveEffects: {
          budgeting: 3,
          stoppingAbility: 2,
          pauseAbility: 1,
        },
        feedback:
          "Perencanaan sederhana membantu kamu melihat mana yang harus dijaga dulu. Saat uang terbatas, strategi seperti ini biasanya efektif karena mengurangi pengeluaran acak dan memberi rasa kendali yang lebih stabil sepanjang minggu.",
        principle:
          "Rencana yang jelas sering lebih menenangkan daripada reaksi spontan saat kondisi sudah mepet.",
      },
      {
        id: "minta-bantuan",
        text: "Minta bantuan atau cerita ke orang tua atau wali.",
        statEffects: { mood: 5, relationship: 3, targetProgress: 3 },
        riskEffects: { secrecy: -1, functionalImpairment: -1 },
        protectiveEffects: {
          helpSeeking: 3,
          budgeting: 2,
          stoppingAbility: 1,
        },
        feedback:
          "Minta bantuan bisa jadi titik balik yang paling ringan untuk melewati periode ketat. Selain mengurangi beban, cara ini juga membuka peluang untuk mendapat masukan yang lebih masuk akal tentang apa yang benar-benar perlu dipangkas dan apa yang masih bisa dijaga.",
        principle:
          "Minta bantuan saat kondisi sulit bukan tanda gagal; itu cara menjaga situasi tetap terkendali.",
      },
    ],
  },
];

export function getScenarioByIndex(index: number): Scenario {
  return SCENARIOS[index];
}
