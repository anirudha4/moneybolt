export const manifest = {
    registerType: 'prompt',
    includeAssests: ['favicon.ico', "apple-touch-icon.png", "masked-icon.svg"],
    manifest: {
        name: "Moneybolt",
        short_name: "Moneybolt",
        description: "Gain Financial Clarity and track expenses with moneybolt.",
        icons: [{
            src: './public/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'favicon'
        },
        {
            src: './public/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'favicon'
        },
        {
            src: './public/apple-touch-icon.png',
            sizes: '180x180',
            type: 'image/png',
            purpose: 'apple touch icon',
        },
        {
            src: './public/maskable_icon.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
        }
        ],
        theme_color: '#2563EB',
        background_color: '#fff',
        display: "standalone",
        scope: '/',
        start_url: "/",
        orientation: 'portrait'
    }
}