
export interface Phrase {
  id: string;
  japanese: string;
  kana: string;
  romaji: string;
  en: string;
  zh: string;
}

export interface Chapter {
  id: string;
  titleEn: string;
  titleZh: string;
  icon: string;
  phrases: Phrase[];
}

export const PHRASE_CHAPTERS: Chapter[] = [
  {
    id: 'intro',
    titleEn: 'Self Introduction',
    titleZh: '自我介紹',
    icon: 'User',
    phrases: [
      { id: 'i1', japanese: 'はじめまして。', kana: 'はじめまして', romaji: 'Hajimemashite', en: 'Nice to meet you', zh: '初次見面' },
      { id: 'i2', japanese: '〜です。', kana: '〜です', romaji: '... desu', en: 'I am ...', zh: '我是...' },
      { id: 'i3', japanese: 'よろしくお願いします。', kana: 'よろしくおねがいします', romaji: 'Yoroshiku onegaishimasu', en: 'Please be kind to me', zh: '請多指教' },
      { id: 'i4', japanese: '出身はどこですか？', kana: 'しゅっしんはどこですか？', romaji: 'Shusshin wa doko desu ka?', en: 'Where are you from?', zh: '你出身哪裡？' },
      { id: 'i5', japanese: '台湾出身です。', kana: 'たいわんしゅっしんです', romaji: 'Taiwan shusshin desu', en: 'I am from Taiwan', zh: '我來自台灣' },
      { id: 'i6', japanese: 'お名前は何ですか？', kana: 'おなまえはなんですか？', romaji: 'Onamae wa nan desu ka?', en: 'What is your name?', zh: '你叫什麼名字？' },
      { id: 'i7', japanese: '私は学生です。', kana: 'わたしはがくせいです', romaji: 'Watashi wa gakusei desu', en: 'I am a student', zh: '我是學生' },
      { id: 'i8', japanese: '趣味は何ですか？', kana: 'しゅみはなんですか？', romaji: 'Shumi wa nan desu ka?', en: 'What is your hobby?', zh: '你的興趣是什麼？' },
      { id: 'i9', japanese: '映画を見ることです。', kana: 'えいがをみることです', romaji: 'Eiga o miru koto desu', en: 'It is watching movies', zh: '是看電影' },
      { id: 'i10', japanese: 'おはようございます。', kana: 'おはようございます', romaji: 'Ohayou gozaimasu', en: 'Good morning', zh: '早安' },
      { id: 'i11', japanese: 'こんにちは。', kana: 'こんにちは', romaji: 'Konnichiwa', en: 'Good afternoon', zh: '你好' },
      { id: 'i12', japanese: 'こんばんは。', kana: 'こんばんは', romaji: 'Konbanwa', en: 'Good evening', zh: '晚安' },
      { id: 'i13', japanese: 'おやすみなさい。', kana: 'おやすみなさい', romaji: 'Oyasuminasai', en: 'Good night', zh: '晚安 (睡前)' },
      { id: 'i14', japanese: 'さようなら。', kana: 'さようなら', romaji: 'Sayounara', en: 'Goodbye', zh: '再見' },
      { id: 'i15', japanese: 'また会いましょう。', kana: 'またあいましょう', romaji: 'Mata aimashou', en: 'Let\'s meet again', zh: '再會' },
      { id: 'i16', japanese: 'お元気ですか？', kana: 'おげんきですか？', romaji: 'Ogenki desu ka?', en: 'How are you?', zh: '你好嗎？' },
      { id: 'i17', japanese: 'はい、元気です。', kana: 'はい、げんきです', romaji: 'Hai, genki desu', en: 'Yes, I am fine', zh: '是的，我很好' },
      { id: 'i18', japanese: '何歳ですか？', kana: 'なんさいですか？', romaji: 'Nansai desu ka?', en: 'How old are you?', zh: '你幾歲？' },
      { id: 'i19', japanese: '会社員です。', kana: 'かいしゃいんです', romaji: 'Kaishayin desu', en: 'I am an office worker', zh: '我是上班族' },
      { id: 'i20', japanese: '日本が好きです。', kana: 'にほんがすきです', romaji: 'Nihon ga suki desu', en: 'I like Japan', zh: '我喜歡日本' },
      { id: 'i21', japanese: '独身です。', kana: 'どくしんです', romaji: 'Dokushin desu', en: 'I am single', zh: '我單身' }
    ]
  },
  {
    id: 'travel',
    titleEn: 'Food & Shopping',
    titleZh: '飲食購物',
    icon: 'Plane',
    phrases: [
      { id: 't1', japanese: 'すみません。', kana: 'すみません', romaji: 'Sumimasen', en: 'Excuse me / Sorry', zh: '不好意思 / 抱歉' },
      { id: 't2', japanese: 'ありがとうございます。', kana: 'ありがとうございます', romaji: 'Arigatou gozaimasu', en: 'Thank you very much', zh: '非常感謝' },
      { id: 't3', japanese: 'これはいくらですか？', kana: 'これはいくらですか？', romaji: 'Kore wa ikura desu ka?', en: 'How much is this?', zh: '這個多少錢？' },
      { id: 't4', japanese: 'メニューをお願いします。', kana: 'メニューをおねがいします', romaji: 'Menyuu o onegaishimasu', en: 'Menu, please', zh: '請給我菜單' },
      { id: 't5', japanese: 'お会計をお願いします。', kana: 'おかいけいをおねがいします', romaji: 'Okaikei o onegaishimasu', en: 'Check, please', zh: '請結帳' },
      { id: 't6', japanese: 'これをください。', kana: 'これをください', romaji: 'Kore o kudasai', en: 'I\'ll take this', zh: '我要這個' },
      { id: 't7', japanese: 'クレジットカードは使えますか？', kana: 'クレジットカードはつかえますか？', romaji: 'Kurejitto kaado wa tsukaemasu ka?', en: 'Can I use a credit card?', zh: '可以用信用卡嗎？' },
      { id: 't8', japanese: 'おいしいです。', kana: 'おいしいです', romaji: 'Oishii desu', en: 'It is delicious', zh: '很好吃' },
      { id: 't9', japanese: 'ごちそうさまでした。', kana: 'ごちそうさまでした', romaji: 'Gochisousama deshita', en: 'Thanks for the meal', zh: '謝謝招待 (餐後)' },
      { id: 't10', japanese: 'いただきます。', kana: 'いただきます', romaji: 'Itadakimasu', en: 'Let\'s eat', zh: '開動了 (餐前)' },
      { id: 't11', japanese: '水をお願いします。', kana: 'みずをおねがいします', romaji: 'Mizu o onegaishimasu', en: 'Water, please', zh: '請給我水' },
      { id: 't12', japanese: 'トイレはどこですか？', kana: 'トイレはどこですか？', romaji: 'Toire wa doko desu ka?', en: 'Where is the bathroom?', zh: '廁所在哪裡？' },
      { id: 't13', japanese: '免税できますか？', kana: 'めんぜいできますか？', romaji: 'Menzei dekimasu ka?', en: 'Tax free?', zh: '可以免稅嗎？' },
      { id: 't14', japanese: '袋はいりません。', kana: 'ふくろはいりません', romaji: 'Fukuro wa irimasen', en: 'I don\'t need a bag', zh: '我不需要袋子' },
      { id: 't15', japanese: '試着してもいいですか？', kana: 'しちゃくしてもいいですか？', romaji: 'Shichaku shite mo ii desu ka?', en: 'Can I try this on?', zh: '我可以試穿嗎？' },
      { id: 't16', japanese: 'もっと大きいサイズはありますか？', kana: 'もっとおおきいサイズはありますか？', romaji: 'Motto ookii saizu wa arimasu ka?', en: 'Is there a bigger size?', zh: '有大一點的尺寸嗎？' },
      { id: 't17', japanese: 'おすすめは何ですか？', kana: 'おすすめはなんですか？', romaji: 'Osusume wa nan desu ka?', en: 'What do you recommend?', zh: '你有什麼推薦的嗎？' },
      { id: 't18', japanese: 'アレルギーがあります。', kana: 'アレルギーがあります', romaji: 'Arerugii ga arimasu', en: 'I have allergies', zh: '我有過敏' },
      { id: 't19', japanese: '領収書をください。', kana: 'りょうしゅうしょをください', romaji: 'Ryoushuusho o kudasai', en: 'Receipt, please', zh: '請給我收據' },
      { id: 't20', japanese: '安くしてください。', kana: 'やすくしてください', romaji: 'Yasuku shite kudasai', en: 'Can you make it cheaper?', zh: '可以便宜一點嗎？' },
      { id: 't21', japanese: 'これをラップしてください。', kana: 'これをラップしてください', romaji: 'Kore o rappu shite kudasai', en: 'Wrap this, please', zh: '請幫我包裝' }
    ]
  },
  {
    id: 'transport',
    titleEn: 'Transport & Directions',
    titleZh: '交通方位',
    icon: 'Train',
    phrases: [
      { id: 'tr1', japanese: '駅はどこですか？', kana: 'えきはどこですか？', romaji: 'Eki wa doko desu ka?', en: 'Where is the station?', zh: '車站在哪裡？' },
      { id: 'tr2', japanese: '切符売り場はどこですか？', kana: 'きっぷうりばはどこですか？', romaji: 'Kippu uriba wa doko desu ka?', en: 'Where is the ticket office?', zh: '售票處在哪裡？' },
      { id: 'tr3', japanese: '成田空港までお願いします。', kana: 'なりたくうこうまでおねがいします', romaji: 'Narita kuukou made onegaishimasu', en: 'To Narita Airport, please', zh: '請到成田機場' },
      { id: 'tr4', japanese: '次の電車は何時ですか？', kana: 'つぎのでんしゃはなんじですか？', romaji: 'Tsugi no densha wa nanji desu ka?', en: 'What time is the next train?', zh: '下一班電車是幾點？' },
      { id: 'tr5', japanese: '出口はどこですか？', kana: 'でぐちはどこですか？', romaji: 'Deguchi wa doko desu ka?', en: 'Where is the exit?', zh: '出口在哪裡？' },
      { id: 'tr6', japanese: '真っ直ぐ行ってください。', kana: 'まっすぐいってください', romaji: 'Massugu itte kudasai', en: 'Go straight ahead', zh: '請直走' },
      { id: 'tr7', japanese: '右に曲がってください。', kana: 'みぎにまがってください', romaji: 'Migi ni magatte kudasai', en: 'Turn right', zh: '請右轉' },
      { id: 'tr8', japanese: '左に曲がってください。', kana: 'ひだりにまがってください', romaji: 'Hidari ni magatte kudasai', en: 'Turn left', zh: '請左轉' },
      { id: 'tr9', japanese: 'ここから遠いですか？', kana: 'ここからとおいですか？', romaji: 'Koko kara tooi desu ka?', en: 'Is it far from here?', zh: '離這裡遠嗎？' },
      { id: 'tr10', japanese: '歩いて行けますか？', kana: 'あるいていけますか？', romaji: 'Aruite ikemasu ka?', en: 'Can I go by foot?', zh: '可以走路去嗎？' },
      { id: 'tr11', japanese: '地図を書いてください。', kana: 'ちずをかいてください', romaji: 'Chizu o kaite kudasai', en: 'Please draw a map', zh: '請畫地圖給我' },
      { id: 'tr12', japanese: 'バス停はどこですか？', kana: 'ばしていはどこですか？', romaji: 'Bashitei wa doko desu ka?', en: 'Where is the bus stop?', zh: '公車站在哪裡？' },
      { id: 'tr13', japanese: 'タクシーを呼んでください。', kana: 'タクシーをよんでください', romaji: 'Takushii o yonde kudasai', en: 'Call a taxi, please', zh: '請幫我叫計程車' },
      { id: 'tr14', japanese: 'いくらかかりますか？', kana: 'いくらかかりますか？', romaji: 'Ikura kakarimasu ka?', en: 'How much does it cost?', zh: '要花多少錢？' },
      { id: 'tr15', japanese: 'どのくらいかかりますか？', kana: 'どのくらいかかりますか？', romaji: 'Dono kurai kakarimasu ka?', en: 'How long does it take?', zh: '要花多久時間？' },
      { id: 'tr16', japanese: '反対側です。', kana: 'はんたいがわです', romaji: 'Hantaigawa desu', en: 'It\'s on the other side', zh: '在對面' },
      { id: 'tr17', japanese: 'ここで止めてください。', kana: 'ここでとめてください', romaji: 'Koko de tomete kudasai', en: 'Please stop here', zh: '請停在這裡' },
      { id: 'tr18', japanese: '忘れ物をしました。', kana: 'わすれものをしました', romaji: 'Wasuremono o shimashita', en: 'I forgot something', zh: '我忘了東西' },
      { id: 'tr19', japanese: '急いでください。', kana: 'いそいでください', romaji: 'Isoide kudasai', en: 'Please hurry', zh: '請快一點' },
      { id: 'tr20', japanese: '新幹線はどこですか？', kana: 'しんかんせんはどこですか？', romaji: 'Shinkansen wa doko desu ka?', en: 'Where is the Shinkansen?', zh: '新幹線在哪裡？' },
      { id: 'tr21', japanese: '自由席はありますか？', kana: 'じゆうせきはありますか？', romaji: 'Jiyuuseki wa arimasu ka?', en: 'Is there a non-reserved seat?', zh: '有自由席嗎？' }
    ]
  }
];
