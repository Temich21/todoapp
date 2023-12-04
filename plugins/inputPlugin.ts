const plugin = require('tailwindcss/plugin')

module.exports = plugin(function ({ addComponents }) {
    const inputs = {
        '.input': {
            padding: '.5rem .75rem',
            borderRadius: '.25rem',
            fontWeight: '600',
            border: 'none',
            '&:focus': {
                outline: 'none',
                boxShadow: '0 0 0 2px rgba(66, 153, 225, 0.5)',
            },
        },
        '.textarea': {
            padding: '.5rem .75rem',
            borderRadius: '.25rem',
            fontWeight: '400',
            border: 'none',
            resize: 'vertical',
            '&:focus': {
                outline: 'none',
                boxShadow: '0 0 0 2px rgba(66, 153, 225, 0.5)',
            },
        },
        '.input-datetime': {
            padding: '.5rem .75rem',
            borderRadius: '.25rem',
            fontWeight: '600',
            border: 'none',
            width: '190px',
            backgroundColor: '#dee1e6',
            color: 'black',
            '&:focus': {
                outline: 'none',
                borderColor: '#2563eb',
                boxShadow: '0 0 0 2px rgba(66, 153, 225, 0.5)',
            },
            '&:hover': {
                borderColor: '#9ca3af',
                backgroundColor: '#9ca3af',
            },
        },
        '.select-option': {
            padding: '.5rem .75rem',
            borderRadius: '.25rem',
            fontWeight: '600',
            border: 'none',
            width: '120px',
            backgroundColor: '#d1d5db',
            color: 'black',
            '&:focus': {
                outline: 'none',
                borderColor: '#2563eb',
                boxShadow: '0 0 0 2px rgba(66, 153, 225, 0.5)',
            },
            '&:hover': {
                borderColor: '#9ca3af',
            },
        },
    }

    addComponents(inputs)
})