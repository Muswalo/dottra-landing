import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'

const page = (path: string) => fileURLToPath(new URL(path, import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: page('./index.html'),
        product: page('./product/index.html'),
        howItWorks: page('./how-it-works/index.html'),
        pricing: page('./pricing/index.html'),
        eligibility: page('./eligibility/index.html'),
        blog: page('./blog/index.html'),
        blogIntroducingDottra: page('./blog/introducing-dottra/index.html'),
        blogDebtPlan: page('./blog/how-to-get-out-of-debt/index.html'),
        blogMonthlyBudget: page('./blog/a-monthly-budget-you-can-keep/index.html'),
        blogEmergencyFund: page('./blog/build-an-emergency-fund/index.html'),
        blogAnnualExpenses: page('./blog/plan-for-annual-expenses/index.html'),
        blogCreditPlan: page('./blog/use-a-credit-line-with-a-plan/index.html'),
        privacy: page('./privacy/index.html'),
        terms: page('./terms/index.html'),
        cookies: page('./cookies/index.html'),
        licences: page('./licences/index.html'),
        about: page('./about/index.html'),
        support: page('./support/index.html'),
        contact: page('./contact/index.html'),
        deleteAccount: page('./delete-account/index.html'),
      },
    },
  },
})
