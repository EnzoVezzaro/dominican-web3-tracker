"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "es"

type LanguageContextType = {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    "nav.home": "Home",
    "nav.dashboard": "Dashboard",
    "nav.marketplace": "NFT Marketplace",
    "nav.community": "Community",
    "nav.education": "Education",
    "hero.title": "Dominican Web3 Tracker",
    "hero.subtitle": "Track Dominican cryptocurrencies, NFTs, and community projects",
    "hero.cta": "Get Started",
    "features.coins.title": "Coin Tracker",
    "features.coins.description": "Track Dominican-based cryptocurrencies and tokens in real-time",
    "features.nft.title": "NFT Marketplace",
    "features.nft.description": "Discover, buy, and sell NFTs from Dominican creators",
    "features.community.title": "Community Projects",
    "features.community.description": "Explore and participate in Dominican Web3 community initiatives",
    "features.analytics.title": "Analytics & Insights",
    "features.analytics.description": "Get detailed analytics on your Web3 assets and investments",
    "auth.login": "Login",
    "auth.signup": "Sign Up",
    "auth.email": "Email",
    "auth.emailPlaceholder": "Enter your email",
    "auth.continue": "Continue",
    "auth.magicLink": "We'll send you a magic link to log in",
    "footer.rights": "All rights reserved",
  },
  es: {
    "nav.home": "Inicio",
    "nav.dashboard": "Panel",
    "nav.marketplace": "Mercado NFT",
    "nav.community": "Comunidad",
    "nav.education": "Educación",
    "hero.title": "Rastreador Web3 Dominicano",
    "hero.subtitle": "Rastrea criptomonedas, NFTs y proyectos comunitarios dominicanos",
    "hero.cta": "Comenzar",
    "features.coins.title": "Rastreador de Monedas",
    "features.coins.description": "Rastrea criptomonedas y tokens dominicanos en tiempo real",
    "features.nft.title": "Mercado NFT",
    "features.nft.description": "Descubre, compra y vende NFTs de creadores dominicanos",
    "features.community.title": "Proyectos Comunitarios",
    "features.community.description": "Explora y participa en iniciativas comunitarias Web3 dominicanas",
    "features.analytics.title": "Análisis y Estadísticas",
    "features.analytics.description": "Obtén análisis detallados de tus activos e inversiones Web3",
    "auth.login": "Iniciar Sesión",
    "auth.signup": "Registrarse",
    "auth.email": "Correo Electrónico",
    "auth.emailPlaceholder": "Ingresa tu correo electrónico",
    "auth.continue": "Continuar",
    "auth.magicLink": "Te enviaremos un enlace mágico para iniciar sesión",
    "footer.rights": "Todos los derechos reservados",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "es")) {
      setLanguage(savedLanguage)
    } else {
      // Default to browser language if available and supported
      const browserLang = navigator.language.split("-")[0]
      if (browserLang === "es") {
        setLanguage("es")
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("language", language)
  }, [language])

  const t = (key: string) => {
    return translations[language][key] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

