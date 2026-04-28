export interface KanaInfo {
  id: string;
  hiragana: string;
  katakana: string;
  romaji: string;
  ipa: string;
  hiraganaOrigin: string;
  katakanaOrigin: string;
  row: string;
  col: string;
}

export const KANA_DATA: KanaInfo[] = [
  // A row
  { id: 'a', hiragana: 'あ', katakana: 'ア', romaji: 'a', ipa: '[a]', hiraganaOrigin: '安', katakanaOrigin: '阿', row: '', col: 'a' },
  { id: 'i', hiragana: 'い', katakana: 'イ', romaji: 'i', ipa: '[i]', hiraganaOrigin: '以', katakanaOrigin: '伊', row: '', col: 'i' },
  { id: 'u', hiragana: 'う', katakana: 'ウ', romaji: 'u', ipa: '[ɯᵝ]', hiraganaOrigin: '宇', katakanaOrigin: '宇', row: '', col: 'u' },
  { id: 'e', hiragana: 'え', katakana: 'エ', romaji: 'e', ipa: '[e]', hiraganaOrigin: '衣', katakanaOrigin: '江', row: '', col: 'e' },
  { id: 'o', hiragana: 'お', katakana: 'オ', romaji: 'o', ipa: '[o]', hiraganaOrigin: '於', katakanaOrigin: '於', row: '', col: 'o' },

  // K row
  { id: 'ka', hiragana: 'か', katakana: 'カ', romaji: 'ka', ipa: '[ka]', hiraganaOrigin: '加', katakanaOrigin: '加', row: 'k', col: 'a' },
  { id: 'ki', hiragana: 'き', katakana: 'キ', romaji: 'ki', ipa: '[ki]', hiraganaOrigin: '幾', katakanaOrigin: '幾', row: 'k', col: 'i' },
  { id: 'ku', hiragana: 'く', katakana: 'ク', romaji: 'ku', ipa: '[kɯᵝ]', hiraganaOrigin: '久', katakanaOrigin: '久', row: 'k', col: 'u' },
  { id: 'ke', hiragana: 'け', katakana: 'ケ', romaji: 'ke', ipa: '[ke]', hiraganaOrigin: '計', katakanaOrigin: '介', row: 'k', col: 'e' },
  { id: 'ko', hiragana: 'こ', katakana: 'コ', romaji: 'ko', ipa: '[ko]', hiraganaOrigin: '己', katakanaOrigin: '己', row: 'k', col: 'o' },

  // S row
  { id: 'sa', hiragana: 'さ', katakana: 'サ', romaji: 'sa', ipa: '[sa]', hiraganaOrigin: '左', katakanaOrigin: '左', row: 's', col: 'a' },
  { id: 'shi', hiragana: 'し', katakana: 'シ', romaji: 'shi', ipa: '[ɕi]', hiraganaOrigin: '之', katakanaOrigin: '之', row: 's', col: 'i' },
  { id: 'su', hiragana: 'す', katakana: 'ス', romaji: 'su', ipa: '[sɯᵝ]', hiraganaOrigin: '寸', katakanaOrigin: '須', row: 's', col: 'u' },
  { id: 'se', hiragana: 'せ', katakana: 'セ', romaji: 'se', ipa: '[se]', hiraganaOrigin: '世', katakanaOrigin: '世', row: 's', col: 'e' },
  { id: 'so', hiragana: 'そ', katakana: 'ソ', romaji: 'so', ipa: '[so]', hiraganaOrigin: '曽', katakanaOrigin: '曽', row: 's', col: 'o' },

  // T row
  { id: 'ta', hiragana: 'た', katakana: 'タ', romaji: 'ta', ipa: '[ta]', hiraganaOrigin: '太', katakanaOrigin: '多', row: 't', col: 'a' },
  { id: 'chi', hiragana: 'ち', katakana: 'チ', romaji: 'chi', ipa: '[t͡ɕi]', hiraganaOrigin: '知', katakanaOrigin: '千', row: 't', col: 'i' },
  { id: 'tsu', hiragana: 'つ', katakana: 'ツ', romaji: 'tsu', ipa: '[t͡sɯᵝ]', hiraganaOrigin: '川', katakanaOrigin: '川', row: 't', col: 'u' },
  { id: 'te', hiragana: 'て', katakana: 'テ', romaji: 'te', ipa: '[te]', hiraganaOrigin: '天', katakanaOrigin: '天', row: 't', col: 'e' },
  { id: 'to', hiragana: 'と', katakana: 'ト', romaji: 'to', ipa: '[to]', hiraganaOrigin: '止', katakanaOrigin: '止', row: 't', col: 'o' },

  // N row
  { id: 'na', hiragana: 'な', katakana: 'ナ', romaji: 'na', ipa: '[na]', hiraganaOrigin: '奈', katakanaOrigin: '奈', row: 'n', col: 'a' },
  { id: 'ni', hiragana: 'に', katakana: 'ニ', romaji: 'ni', ipa: '[ɲi]', hiraganaOrigin: '仁', katakanaOrigin: '仁', row: 'n', col: 'i' },
  { id: 'nu', hiragana: 'ぬ', katakana: 'ヌ', romaji: 'nu', ipa: '[nɯᵝ]', hiraganaOrigin: '奴', katakanaOrigin: '奴', row: 'n', col: 'u' },
  { id: 'ne', hiragana: 'ね', katakana: 'ネ', romaji: 'ne', ipa: '[ne]', hiraganaOrigin: '祢', katakanaOrigin: '祢', row: 'n', col: 'e' },
  { id: 'no', hiragana: 'の', katakana: 'ノ', romaji: 'no', ipa: '[no]', hiraganaOrigin: '乃', katakanaOrigin: '乃', row: 'n', col: 'o' },

  // H row
  { id: 'ha', hiragana: 'は', katakana: 'ハ', romaji: 'ha', ipa: '[ha]', hiraganaOrigin: '波', katakanaOrigin: '八', row: 'h', col: 'a' },
  { id: 'hi', hiragana: 'ひ', katakana: 'ヒ', romaji: 'hi', ipa: '[çi]', hiraganaOrigin: '比', katakanaOrigin: '比', row: 'h', col: 'i' },
  { id: 'fu', hiragana: 'ふ', katakana: 'フ', romaji: 'fu', ipa: '[ɸɯᵝ]', hiraganaOrigin: '不', katakanaOrigin: '不', row: 'h', col: 'u' },
  { id: 'he', hiragana: 'へ', katakana: 'ヘ', romaji: 'he', ipa: '[he]', hiraganaOrigin: '部', katakanaOrigin: '部', row: 'h', col: 'e' },
  { id: 'ho', hiragana: 'ほ', katakana: 'ホ', romaji: 'ho', ipa: '[ho]', hiraganaOrigin: '保', katakanaOrigin: '保', row: 'h', col: 'o' },

  // M row
  { id: 'ma', hiragana: 'ま', katakana: 'マ', romaji: 'ma', ipa: '[ma]', hiraganaOrigin: '末', katakanaOrigin: '末', row: 'm', col: 'a' },
  { id: 'mi', hiragana: 'み', katakana: 'ミ', romaji: 'mi', ipa: '[mi]', hiraganaOrigin: '美', katakanaOrigin: '三', row: 'm', col: 'i' },
  { id: 'mu', hiragana: 'む', katakana: 'ム', romaji: 'mu', ipa: '[mɯᵝ]', hiraganaOrigin: '武', katakanaOrigin: '牟', row: 'm', col: 'u' },
  { id: 'me', hiragana: 'め', katakana: 'メ', romaji: 'me', ipa: '[me]', hiraganaOrigin: '女', katakanaOrigin: '〆', row: 'm', col: 'e' },
  { id: 'mo', hiragana: 'も', katakana: 'モ', romaji: 'mo', ipa: '[mo]', hiraganaOrigin: '毛', katakanaOrigin: '毛', row: 'm', col: 'o' },

  // Y row
  { id: 'ya', hiragana: 'や', katakana: 'ヤ', romaji: 'ya', ipa: '[ja]', hiraganaOrigin: '也', katakanaOrigin: '也', row: 'y', col: 'a' },
  { id: 'yu', hiragana: 'ゆ', katakana: 'ユ', romaji: 'yu', ipa: '[jɯᵝ]', hiraganaOrigin: '由', katakanaOrigin: '由', row: 'y', col: 'u' },
  { id: 'yo', hiragana: 'よ', katakana: 'ヨ', romaji: 'yo', ipa: '[jo]', hiraganaOrigin: '与', katakanaOrigin: '与', row: 'y', col: 'o' },

  // R row
  { id: 'ra', hiragana: 'ら', katakana: 'ラ', romaji: 'ra', ipa: '[ɾa]', hiraganaOrigin: '良', katakanaOrigin: '良', row: 'r', col: 'a' },
  { id: 'ri', hiragana: 'り', katakana: 'リ', romaji: 'ri', ipa: '[ɾi]', hiraganaOrigin: '利', katakanaOrigin: '利', row: 'r', col: 'i' },
  { id: 'ru', hiragana: 'る', katakana: 'ル', romaji: 'ru', ipa: '[ɾɯᵝ]', hiraganaOrigin: '留', katakanaOrigin: '流', row: 'r', col: 'u' },
  { id: 're', hiragana: 'れ', katakana: 'レ', romaji: 're', ipa: '[ɾe]', hiraganaOrigin: '礼', katakanaOrigin: '礼', row: 'r', col: 'e' },
  { id: 'ro', hiragana: 'ろ', katakana: 'ロ', romaji: 'ro', ipa: '[ɾo]', hiraganaOrigin: '呂', katakanaOrigin: '呂', row: 'r', col: 'o' },

  // W row
  { id: 'wa', hiragana: 'わ', katakana: 'ワ', romaji: 'wa', ipa: '[wa]', hiraganaOrigin: '和', katakanaOrigin: '和', row: 'w', col: 'a' },
  { id: 'wo', hiragana: 'を', katakana: 'ヲ', romaji: 'wo', ipa: '[o]', hiraganaOrigin: '遠', katakanaOrigin: '乎', row: 'w', col: 'o' },

  // N
  { id: 'n', hiragana: 'ん', katakana: 'ン', romaji: 'n', ipa: '[ɴ]', hiraganaOrigin: '无', katakanaOrigin: '尓', row: 'n_final', col: 'n' },
];

export const ROWS = ['', 'k', 's', 't', 'n', 'h', 'm', 'y', 'r', 'w', 'n_final'];
export const COLS = ['a', 'i', 'u', 'e', 'o'];
