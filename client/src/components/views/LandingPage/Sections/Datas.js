export const classifications = [
    { id: 1, name: '패션의류ㆍ잡화ㆍ뷰티' },
    { id: 2, name: '식품ㆍ생필품' },
    { id: 3, name: '컴퓨터ㆍ디지털ㆍ가전' },
    { id: 4, name: '스포츠ㆍ건강ㆍ렌탈' },
    { id: 5, name: '자동차ㆍ공구' },
    { id: 6, name: '여행ㆍ도서ㆍ티켓ㆍe쿠폰' },
    { id: 7, name: '홈데코ㆍ문구ㆍ취미ㆍ반려' }
];

export const price = [
    { id: 0, name: '전체', array: [] },
    { id: 1, name: '10,000원 이하', array: [0, 10000] },
    { id: 2, name: '10,000원 ~ 20,000원', array: [10000, 20000] },
    { id: 3, name: '20,000원 ~ 30,000원', array: [20000, 30000] },
    { id: 4, name: '30,000원 ~ 40,000원', array: [30000, 40000] },
    { id: 5, name: '40,000원 ~ 50,000원', array: [40000, 50000] },
    { id: 6, name: '50,000원 ~ 100,000원', array: [50000, 100000] },
    { id: 7, name: '100,000원 이상', array: [100000, 1000000000] },
];

export const more_btn_limit = 8;