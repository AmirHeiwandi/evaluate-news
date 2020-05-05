import {splitObject} from './splitObject.js'

// Create array to use when testing function
let list = {
    text: `McFoible sang happily to himself. The sun was shining.`,
    language: 'en',
    hashtags: [
        'first',
        'second',
        'third',
        'fourth',
        'fifth',
        'sixth'
    ]
}

test('Properly split the object', () => {
    expect(splitObject(list)).toEqual([
        `McFoible sang happily to himself. The su...`,
        'en',
        [
            'first',
            'second',
            'third',
            'fourth',
            'fifth'
        ]
    ])
})