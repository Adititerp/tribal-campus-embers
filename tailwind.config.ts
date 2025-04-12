
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				ember: {
					DEFAULT: '#FF4500',
					light: '#FF7F50',
					dark: '#CC3700'
				},
				stone: {
					light: '#CCBFB3',
					DEFAULT: '#A39A8F',
					dark: '#7A736B'
				},
				dirt: {
					light: '#9B7653',
					DEFAULT: '#8B4513',
					dark: '#5E2F0D'
				},
				leaf: {
					light: '#90EE90',
					DEFAULT: '#228B22',
					dark: '#006400'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fire-pulse': {
					'0%, 100%': { 
						opacity: '1',
						transform: 'scale(1)'
					},
					'50%': { 
						opacity: '0.8',
						transform: 'scale(1.05)'
					}
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'walk': {
					'0%': { transform: 'translateX(0) rotateY(0deg)' },
					'25%': { transform: 'translateX(5px) rotateY(0deg)' },
					'50%': { transform: 'translateX(10px) rotateY(0deg)' },
					'51%': { transform: 'translateX(10px) rotateY(180deg)' },
					'75%': { transform: 'translateX(5px) rotateY(180deg)' },
					'100%': { transform: 'translateX(0) rotateY(180deg)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fire-pulse': 'fire-pulse 2s ease-in-out infinite',
				'float': 'float 3s ease-in-out infinite',
				'walk': 'walk 4s infinite alternate'
			},
			fontFamily: {
				'pixel': ['"Press Start 2P"', 'cursive'],
			},
			boxShadow: {
				'ember-glow': '0 0 15px #FF4500',
				'stone': '0 2px 0 #7A736B',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
