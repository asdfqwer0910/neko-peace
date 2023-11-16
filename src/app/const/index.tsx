// Navbar
export const NAV_LINKS = [
    { href: '/', key: 'home', label: 'ホーム' },
    { href: '/transfer', key: 'transfer', label: '譲渡猫' },
    { href: '/', key: 'stray', label: '迷子情報' },
    { href: '/', key: 'consider', label: '検討中' },
    { href: '/', key: 'contact', label: 'お問い合わせ' },
];

export const NEWS_DATA = [
    { href: '/', key: 'date1', label1: '2023/10/27', label2: 'サイトオープンしました' },
    { href: '/', key: 'date2', label1: '2023/10/30', label2: '開発中＞＜ がんばります＞＜；' },
];

export const FOOTER_LINKS = [
    {
        title: 'ねこぴーすについて',
        links: [
            '会社概要',
            '採用情報',
            'プレスリリース',
        ],
    },
    {
        title: 'ヘルプ' ,
        links: [
            'お問い合わせ',
        ],
    },
    {
        title: 'プライバシーと利用規約',
        links: [
            'プライバシーポリシー',
            '利用規約',
        ],
    },
];

export const CAT_CARD = [
    {
        key: '1',
        catName: 'うずめ',
        breed: 'ミックス',
        birth: '2023/08/23',
        sex: 'メス',
        detail: '生後2カ月程、とてもお利口さんです。',
    },
    {
        key: '2',
        catName: 'ジョウ',
        breed: 'アメリカンショートヘアー',
        birth: '2021/12/08',
        sex: 'オス',
        detail: 'かっこいい',
    },
    {
        key: '3',
        catName: 'タマ',
        breed: 'ミックス',
        birth: '2023/02/27',
        sex: 'オス',
        detail: 'とても穏やかな性格で人懐っこいです。',
    },
    {
        key: '4',
        catName: 'タマ',
        breed: 'ミックス',
        birth: '2023/02/27',
        sex: 'オス',
        detail: 'とても穏やかな性格で人懐っこいです。',
    },
    {
        key: '5',
        catName: 'ずみん',
        breed: 'ミックス',
        birth: '2023/02/27',
        sex: 'オス',
        detail: '野次馬',
    },
];

export const DROPDOWN = [
    {
        href: '/settings/profile',
        label: 'プロフィール',
        image: '/UserCircle.svg',
    },
    {
        href: '/settings/email',
        label: 'メールアドレス',
        image: '/Mail.svg',
    },
    {
        href: '/settings/password',
        label: 'パスワード',
        image: '/Password.svg',
    },
    {
        href: '/settings/logout',
        label: 'ログアウト',
        image: '/Logout.svg',
    },
]