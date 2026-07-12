export type PageLink = {
  label: string
  href: string
}

export type ContentSection = {
  title: string
  paragraphs: string[]
  items?: string[]
}

export type StandardPage = {
  path: string
  title: string
  eyebrow: string
  summary: string
  sections: ContentSection[]
  actions?: PageLink[]
}

export type ArticleSection = {
  title: string
  paragraphs: string[]
  items?: string[]
}

export type BlogPost = {
  slug: string
  title: string
  summary: string
  category: string
  publishedAt: string
  displayDate: string
  readingTime: string
  sections: ArticleSection[]
}

export const googlePlayUrl =
  'https://play.google.com/store/apps/details?id=com.dottra.app'

export const pricingReviewedAt = '12 July 2026'

export const processingFeeRate = 0.05
export const fixedChargeRate = 0.2
export const packageTermDays = 30

export const salariedPackageAmounts = [
  50,
  75,
  100,
  150,
  200,
  250,
  300,
  350,
  400,
  500,
  750,
  1000,
  1500,
  2000,
  2500,
  3000,
]

export const studentPackageAmounts = [75, 100, 150, 200, 250, 300, 350, 400]

export const standardPages: StandardPage[] = [
  {
    path: 'product',
    title: 'A credit line built to be used again.',
    eyebrow: 'Product',
    summary:
      'Dottra gives eligible Zambians an approved credit limit they can draw from, repay, and make available again.',
    sections: [
      {
        title: 'One account. Reusable access.',
        paragraphs: [
          'After verification and approval, your Dottra account shows an available credit limit. Choose an active credit package within that limit whenever you need to make a draw.',
          'Each completed draw reduces your available credit. When the scheduled repayment is successfully posted, that amount becomes available again, subject to account eligibility and current package availability.',
        ],
      },
      {
        title: 'The complete cost comes first.',
        paragraphs: [
          'Before you confirm, Dottra shows the draw amount, Processing Fee, amount sent to your mobile-money wallet, one-time Fixed Charge, repayment date, and total to repay.',
          'You can stop before confirmation. The transaction PIN or biometric step is your final authorisation.',
        ],
      },
      {
        title: 'Designed around income cycles.',
        paragraphs: [
          'Credit-limit decisions are informed by verified employment income or supported government sponsorship, together with an affordability review.',
          'Approval is not guaranteed, and the approved limit may be lower than the maximum offered by the service.',
        ],
      },
    ],
    actions: [
      { label: 'See how it works', href: '/how-it-works/' },
      { label: 'View current pricing', href: '/pricing/' },
    ],
  },
  {
    path: 'how-it-works',
    title: 'How Dottra works.',
    eyebrow: 'Process',
    summary:
      'Verify once, receive a credit-limit decision, choose an available package, review the complete cost, and authorise in the app.',
    sections: [
      {
        title: '1. Create and secure your account',
        paragraphs: [
          'Register with your details, secure the app with a transaction PIN, and add biometric authorisation when your device supports it.',
        ],
      },
      {
        title: '2. Complete verification in the app',
        paragraphs: [
          'Submit a valid NRC and selfie, then provide a current payslip or the supported student documents requested in the app. Document review usually takes one to two business days.',
        ],
      },
      {
        title: '3. Receive your credit-limit decision',
        paragraphs: [
          'Dottra reviews the submitted information and affordability before assigning a limit. Not every verified account receives a limit, and individual limits vary.',
        ],
      },
      {
        title: '4. Choose an available credit package',
        paragraphs: [
          'The app shows fixed package amounts that fit within your available credit. Package availability can differ by customer type and may change for future draws.',
        ],
      },
      {
        title: '5. Review and authorise',
        paragraphs: [
          'Check the Processing Fee, amount you will receive, one-time Fixed Charge, repayment date, and total to repay. Confirm only when every figure is clear.',
        ],
      },
      {
        title: '6. Receive and repay',
        paragraphs: [
          'After approval and provider processing, the amount shown is sent to your registered supported mobile-money wallet. Repayment is scheduled through your registered bank mandate on the date shown in the app.',
          'Once repayment is successfully posted, the corresponding credit becomes available again, subject to the account remaining eligible.',
        ],
      },
    ],
    actions: [
      { label: 'View current pricing', href: '/pricing/' },
      { label: 'Check eligibility', href: '/eligibility/' },
    ],
  },
  {
    path: 'eligibility',
    title: 'Who can apply for Dottra.',
    eyebrow: 'Eligibility',
    summary:
      'Dottra currently serves eligible salaried workers and government-sponsored students in Zambia.',
    sections: [
      {
        title: 'Basic requirements',
        paragraphs: [
          'To apply, you must meet the service requirements and complete verification in the app.',
        ],
        items: [
          'Be at least 18 years old.',
          'Be a Zambian citizen or lawful resident.',
          'Have a valid National Registration Card.',
          'Have a supported Zambian mobile-money wallet registered in your name.',
          'Have verifiable salaried employment or supported government-sponsored student status.',
          'Complete identity and employment or student verification.',
          'Register the bank mandate requested during verification.',
        ],
      },
      {
        title: 'For salaried workers',
        paragraphs: [
          'Dottra supports verified public- and private-sector employment. You will be asked for a current payslip and may be asked for additional information needed for an affordability review.',
          'Current salaried credit packages range from K50 to K3,000, but your approved limit determines which packages you can see and select.',
        ],
      },
      {
        title: 'For sponsored students',
        paragraphs: [
          'Eligible adults receiving government sponsorship at a supported Zambian university can complete the student verification route in the app.',
          'Current student credit packages range from K75 to K400. Supported institutions and documentation requirements are shown during verification.',
        ],
      },
      {
        title: 'Approval and limits',
        paragraphs: [
          'Meeting the basic requirements does not guarantee approval or a particular limit. Every draw remains subject to available credit, account status, package availability, and current eligibility checks.',
        ],
      },
    ],
    actions: [
      { label: 'Get Dottra on Google Play', href: googlePlayUrl },
      { label: 'Read how it works', href: '/how-it-works/' },
    ],
  },
  {
    path: 'about',
    title: 'About Dottra.',
    eyebrow: 'Company',
    summary:
      'Dottra builds practical digital credit infrastructure for people whose income arrives in cycles while everyday costs do not.',
    sections: [
      {
        title: 'Why Dottra exists',
        paragraphs: [
          'Many Zambians have dependable income or sponsorship and still face timing gaps between what must be paid today and when money arrives. Dottra was created to make those moments more manageable through a clear, reusable credit line.',
          'The product is built around account visibility, complete cost disclosure before confirmation, secure authorisation, and a repeatable draw-repay-reuse cycle.',
        ],
      },
      {
        title: 'Built in Zambia',
        paragraphs: [
          'Dottra is designed for the realities of Zambian salary, sponsorship, mobile-money, and bank-payment systems. The service currently focuses on eligible salaried workers and government-sponsored students.',
        ],
      },
      {
        title: 'Company and partnership enquiries',
        paragraphs: [
          'For employer, institution, media, or commercial enquiries, contact hello@dottra.co. Account-specific questions should go through in-app support or support@dottra.co.',
        ],
      },
    ],
    actions: [
      { label: 'Contact Dottra', href: '/contact/' },
      { label: 'Read the product overview', href: '/product/' },
    ],
  },
  {
    path: 'support',
    title: 'Dottra support.',
    eyebrow: 'Help',
    summary:
      'Get help with your Dottra account, app access, verification, activity, or anything that does not look right.',
    sections: [
      {
        title: 'Start in the app when you can',
        paragraphs: [
          'For account-specific help, open Dottra and use the support option from your account. This connects your request to the account you are asking about.',
          'Use in-app support for questions about available credit, account activity, verification, access, or security.',
        ],
      },
      {
        title: 'If you cannot access the app',
        paragraphs: [
          'Email support@dottra.co or call +260 973 400 223. Include a short description and the phone number or email address connected to your account.',
          'Never send your password, transaction PIN, one-time code, card details, or full identity documents by email.',
        ],
      },
      {
        title: 'What to include',
        paragraphs: [
          'Tell us what you were trying to do, what happened, and when it happened. A screenshot can help when it does not reveal private codes or identity documents.',
          'If you believe someone else is accessing your account, say that clearly at the beginning of the message.',
        ],
      },
      {
        title: 'Stay safe',
        paragraphs: [
          'Dottra will not ask you to share your password, transaction PIN, or one-time code by email, social media, or phone call. Only use the official app and links from dottra.co.',
        ],
      },
    ],
    actions: [
      { label: 'Email support', href: 'mailto:support@dottra.co' },
      { label: 'Contact the company', href: '/contact/' },
    ],
  },
  {
    path: 'contact',
    title: 'Contact Dottra.',
    eyebrow: 'Contact',
    summary: 'Use the right channel for account help, company enquiries, privacy, or complaints.',
    sections: [
      {
        title: 'Account support',
        paragraphs: [
          'Use support inside the app when possible, email support@dottra.co, or call +260 973 400 223. Do not send security codes or full identity documents through email.',
        ],
      },
      {
        title: 'Company enquiries',
        paragraphs: [
          'For partnerships, employer or institution enquiries, media, legal, and general company contact, email hello@dottra.co.',
        ],
      },
      {
        title: 'Privacy enquiries',
        paragraphs: [
          'For questions about personal information or data rights, email dpo@dottra.co and review the current Privacy Policy.',
        ],
      },
      {
        title: 'Registered office',
        paragraphs: [
          'Dottra Lending Services Limited, Chingwere 31651, Chunga East, Lusaka 10101, Zambia. PACRA registration number 120251028871.',
        ],
      },
    ],
    actions: [
      { label: 'Get account support', href: '/support/' },
      { label: 'Read the Privacy Policy', href: '/privacy/' },
    ],
  },
]

export const blogPosts: BlogPost[] = [
  {
    slug: 'introducing-dottra',
    title: 'Introducing Dottra: your reusable credit line.',
    summary:
      'Why we built Dottra, how the reusable credit cycle works, and what customers can expect from the app.',
    category: 'Dottra',
    publishedAt: '2026-07-12',
    displayDate: '12 July 2026',
    readingTime: '5 min read',
    sections: [
      {
        title: 'Built for the timing gap',
        paragraphs: [
          'A steady salary or sponsorship does not make every month predictable. Transport, food, school costs, family commitments, and household bills can arrive before the next income cycle does.',
          'Dottra was built for that timing gap. It gives eligible customers a reusable digital credit line they can manage from their phone, with the complete cost shown before every confirmation.',
        ],
      },
      {
        title: 'What makes the account reusable',
        paragraphs: [
          'Once verification and affordability review are complete, approved customers receive a credit limit. The app shows the amount currently available and the fixed credit packages that fit within it.',
          'A completed draw reduces available credit. Once the scheduled repayment is successfully posted, that amount becomes available again, subject to the account remaining eligible. There is no need to complete a full application for every draw, although each transaction still passes current eligibility and availability checks.',
        ],
      },
      {
        title: 'Clarity before confirmation',
        paragraphs: [
          'The confirmation screen shows the selected amount, the Processing Fee, the amount sent to mobile money, the one-time Fixed Charge, the repayment date, and the total to repay.',
          'Current packages run for 30 days. There is no registration, membership, or subscription fee. Current rates and complete package tables are published on the Dottra pricing page, while the figures shown in the app at confirmation remain the final terms for that draw.',
        ],
      },
      {
        title: 'Designed for Zambia',
        paragraphs: [
          'Dottra supports eligible salaried workers and government-sponsored students in Zambia. Verification, mobile-money delivery, and the registered bank mandate are handled as part of one connected account journey.',
          'The app is now available on Google Play. We will continue improving account visibility, support, and the way customers understand every stage of their credit line.',
        ],
      },
    ],
  },
  {
    slug: 'how-to-get-out-of-debt',
    title: 'How to get out of debt: a practical plan.',
    summary:
      'A clear way to list what you owe, protect essential costs, choose a repayment method, and measure progress.',
    category: 'Money management',
    publishedAt: '2026-07-10',
    displayDate: '10 July 2026',
    readingTime: '8 min read',
    sections: [
      {
        title: 'Start with one complete list',
        paragraphs: [
          'Debt feels harder to manage when the information is spread across messages, statements, and memory. Put every balance in one place. Record who is owed, the outstanding amount, the required payment, the due date, and any charge that changes over time.',
          'Do not estimate when a statement or account screen can give you the actual figure. A complete list turns a general problem into a set of specific decisions.',
        ],
      },
      {
        title: 'Protect essentials first',
        paragraphs: [
          'Before planning extra payments, reserve enough for food, housing, transport to work or school, utilities, medicine, and the minimum payments already due. A plan that removes essential spending is unlikely to last.',
          'If required payments are already more than you can meet, contact each provider early. Ask what formal payment arrangements are available and get any agreed change in writing.',
        ],
      },
      {
        title: 'Choose one priority method',
        paragraphs: [
          'Keep making required payments on every account, then direct any extra amount to one balance at a time. Two common methods can work:',
        ],
        items: [
          'Highest-cost first: prioritise the balance with the most expensive ongoing charge. This usually reduces total cost fastest.',
          'Smallest balance first: clear the lowest balance to create an early win, then move that full payment to the next balance.',
        ],
      },
      {
        title: 'Create a fixed repayment amount',
        paragraphs: [
          'Choose an amount you can repeat each income cycle and schedule it as soon as income arrives. When one balance is cleared, keep the same total repayment amount and redirect it to the next priority instead of absorbing it into everyday spending.',
          'Use windfalls carefully. A bonus, refund, or extra piece of income can accelerate the plan, but keep a small buffer so the next unexpected cost does not reverse your progress.',
        ],
      },
      {
        title: 'Avoid adding new balances',
        paragraphs: [
          'Pause non-essential credit use while the plan is active. Remove saved payment details, unsubscribe from promotional messages, and wait at least 24 hours before an unplanned purchase.',
          'A new balance can be reasonable only when the alternative creates a more serious cost and the repayment is already covered in your budget. Treat that as an exception, not part of the routine.',
        ],
      },
      {
        title: 'Review once a month',
        paragraphs: [
          'Update every balance, total what has been cleared, and check whether your payment amount is still realistic. Progress may be uneven, but the direction should be visible.',
          'This article is general financial education. For a complex situation, disputed balance, court process, or formal insolvency question, speak with a qualified adviser who can review your circumstances.',
        ],
      },
    ],
  },
  {
    slug: 'a-monthly-budget-you-can-keep',
    title: 'A monthly budget you can actually keep.',
    summary:
      'Build a simple salary-cycle budget around essentials, commitments, future costs, and flexible spending.',
    category: 'Budgeting',
    publishedAt: '2026-07-08',
    displayDate: '8 July 2026',
    readingTime: '6 min read',
    sections: [
      {
        title: 'Budget from take-home income',
        paragraphs: [
          'Start with the amount that reaches your account, not the figure before deductions. Add only income you can reasonably expect during the cycle. Irregular side income can be assigned after it arrives rather than used to make the basic plan work.',
        ],
      },
      {
        title: 'Give every kwacha one of four jobs',
        paragraphs: [
          'A useful budget does not need dozens of categories. Divide the cycle into four groups:',
        ],
        items: [
          'Essentials: housing, food, transport, utilities, medicine, and school needs.',
          'Commitments: scheduled repayments, support for dependants, insurance, and other fixed obligations.',
          'Future costs: savings for emergencies and known annual or seasonal expenses.',
          'Flexible spending: everything that can be reduced or delayed when the month changes.',
        ],
      },
      {
        title: 'Plan by week, not only by month',
        paragraphs: [
          'After fixed commitments are covered, divide the remaining essential and flexible money across the weeks until the next income date. A weekly limit makes overspending visible earlier, when there is still time to adjust.',
          'Keep transport and food separate from general spending. They are usually the first categories affected when several small purchases accumulate.',
        ],
      },
      {
        title: 'Use actual spending to improve the plan',
        paragraphs: [
          'Track spending for one full cycle without judging it. At the end, compare what happened with the plan. If a category is consistently higher, correct the budget or change the routine that drives it.',
          'A budget that reflects real life is more useful than an ideal plan that fails by the second week.',
        ],
      },
      {
        title: 'Keep a small margin',
        paragraphs: [
          'Do not assign every kwacha in advance. Even a small unallocated amount gives the plan room to absorb a price change or overlooked expense without taking money from an essential category.',
        ],
      },
    ],
  },
  {
    slug: 'build-an-emergency-fund',
    title: 'Build an emergency fund one salary cycle at a time.',
    summary:
      'Start with a small target, automate the habit, and keep emergency money separate from everyday spending.',
    category: 'Saving',
    publishedAt: '2026-07-06',
    displayDate: '6 July 2026',
    readingTime: '6 min read',
    sections: [
      {
        title: 'Begin with a useful first target',
        paragraphs: [
          'A large savings target can make starting feel pointless. Choose a first amount that would cover one common disruption, such as urgent transport, a basic medical cost, or an essential household repair.',
          'Once that amount is in place, work toward one month of essential expenses. The longer-term goal can grow from there.',
        ],
      },
      {
        title: 'Move the money when income arrives',
        paragraphs: [
          'Treat emergency saving as the first transfer of the cycle, even when the amount is small. Waiting to save what remains at the end usually means the decision competes with every other purchase during the month.',
          'A consistent K20 or K50 is more valuable than an ambitious amount that is skipped most months.',
        ],
      },
      {
        title: 'Keep it separate and accessible',
        paragraphs: [
          'Use a separate account or wallet that is easy to reach in a real emergency but not part of your normal spending routine. Give it a clear name so the purpose is visible before you transfer money out.',
        ],
      },
      {
        title: 'Define what counts as an emergency',
        paragraphs: [
          'An emergency is urgent, necessary, and not already covered by the monthly plan. A sale, celebration, upgrade, or predictable annual payment does not meet that test.',
          'Write your rule before pressure arrives. It is easier to protect the fund when the decision was made calmly.',
        ],
      },
      {
        title: 'Refill after using it',
        paragraphs: [
          'Using the fund for its intended purpose is not failure. When the immediate issue is resolved, temporarily direct the regular savings amount and any extra income toward restoring the target.',
        ],
      },
    ],
  },
  {
    slug: 'plan-for-annual-expenses',
    title: 'Plan for annual expenses before they arrive.',
    summary:
      'Turn school costs, renewals, travel, and celebrations into manageable monthly amounts.',
    category: 'Planning',
    publishedAt: '2026-07-04',
    displayDate: '4 July 2026',
    readingTime: '5 min read',
    sections: [
      {
        title: 'Look back before looking forward',
        paragraphs: [
          'Review the last twelve months of account activity, receipts, and calendar events. List costs that did not happen every month but were still predictable: school requirements, insurance, licences, maintenance, family travel, holidays, and major celebrations.',
        ],
      },
      {
        title: 'Convert each cost into a monthly amount',
        paragraphs: [
          'Estimate the total, subtract anything already saved, and divide the remainder by the number of salary cycles before the due date. A K1,200 cost due in six months becomes a K200 monthly target.',
          'When prices are uncertain, add a small margin rather than relying on the lowest possible estimate.',
        ],
      },
      {
        title: 'Keep named savings pots',
        paragraphs: [
          'Separate each major goal in your notes, spreadsheet, or savings account labels. A single unlabelled balance is easy to count twice.',
          'If you must reduce a contribution one month, record the shortfall and recalculate the amount needed over the remaining cycles.',
        ],
      },
      {
        title: 'Book early where it reduces cost',
        paragraphs: [
          'Some expenses become more expensive when left to the last minute. Once the money is available and the date is firm, early booking can protect the budget. Check cancellation terms before committing.',
        ],
      },
      {
        title: 'Review the calendar every quarter',
        paragraphs: [
          'A short quarterly review catches changed dates, new responsibilities, and price increases. It also gives you time to reduce a target, extend the schedule, or change the plan before the cost becomes urgent.',
        ],
      },
    ],
  },
  {
    slug: 'use-a-credit-line-with-a-plan',
    title: 'Use a credit line without losing sight of your budget.',
    summary:
      'Decide the purpose, complete cost, repayment source, and effect on next month before you confirm a draw.',
    category: 'Credit',
    publishedAt: '2026-07-02',
    displayDate: '2 July 2026',
    readingTime: '6 min read',
    sections: [
      {
        title: 'Start with the problem, not the available limit',
        paragraphs: [
          'An available limit is not a spending target. Write down the specific cost you are trying to cover and choose the smallest available package that addresses it.',
          'If the purpose can wait until the next income cycle without creating another cost, waiting may be the better decision.',
        ],
      },
      {
        title: 'Read every figure on the confirmation screen',
        paragraphs: [
          'Check the selected amount, Processing Fee, amount you will receive, one-time Fixed Charge, repayment date, and total to repay. The amount received can be lower than the selected amount because the Processing Fee is deducted before payout.',
          'Do not confirm when the amount received will not cover the intended expense or when the total repayment is unclear.',
        ],
      },
      {
        title: 'Name the repayment source',
        paragraphs: [
          'Identify which income cycle will cover the scheduled repayment and place that amount in the next budget before authorising. Check what essential costs are due in the same cycle.',
          'A draw can solve today\'s timing gap while creating pressure next month if the repayment has no assigned source.',
        ],
      },
      {
        title: 'Leave room below the limit',
        paragraphs: [
          'Using the full available limit removes flexibility. When possible, keep part of the line available for a genuinely urgent cost and avoid making several draws without reviewing the combined total to repay.',
        ],
      },
      {
        title: 'Review the result after repayment',
        paragraphs: [
          'Ask whether the draw prevented a larger cost, whether repayment fitted the next budget, and what could reduce the same timing gap in future. The answer might be a new savings category, an earlier bill reminder, or a change in when a regular payment is made.',
          'Reusable credit is most useful when each decision remains connected to a wider money plan.',
        ],
      },
    ],
  },
]
