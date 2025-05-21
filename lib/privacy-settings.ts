export type VisibilityLevel = "public" | "traders" | "private"

export interface PrivacySettings {
  // Profile visibility
  profileVisibility: VisibilityLevel
  displayName: boolean
  displayBio: boolean
  displayAvatar: boolean
  displayLocation: boolean
  displayJoinDate: boolean

  // Trading data visibility
  tradingStatsVisibility: VisibilityLevel
  displayWinRate: boolean
  displayProfitFactor: boolean
  displayTotalTrades: boolean
  displayProfitLoss: boolean
  displayRiskRewardRatio: boolean
  displayAverageTrade: boolean

  // Account visibility
  accountVisibility: VisibilityLevel
  displayAccountNames: boolean
  displayBrokers: boolean
  displayBalances: boolean
  displayEquity: boolean

  // Journal visibility
  journalVisibility: VisibilityLevel
  displayJournalEntries: boolean
  displayTradingNotes: boolean
  displayScreenshots: boolean

  // Social settings
  allowComments: boolean
  allowMentions: boolean
  allowFollowers: boolean
  showOnLeaderboard: boolean

  // Data usage
  allowAnonymousDataUsage: boolean
  allowPersonalizedContent: boolean
}

// Default privacy settings
export const defaultPrivacySettings: PrivacySettings = {
  // Profile visibility
  profileVisibility: "public",
  displayName: true,
  displayBio: true,
  displayAvatar: true,
  displayLocation: true,
  displayJoinDate: true,

  // Trading data visibility
  tradingStatsVisibility: "traders",
  displayWinRate: true,
  displayProfitFactor: true,
  displayTotalTrades: true,
  displayProfitLoss: false,
  displayRiskRewardRatio: true,
  displayAverageTrade: true,

  // Account visibility
  accountVisibility: "private",
  displayAccountNames: false,
  displayBrokers: true,
  displayBalances: false,
  displayEquity: false,

  // Journal visibility
  journalVisibility: "traders",
  displayJournalEntries: true,
  displayTradingNotes: true,
  displayScreenshots: true,

  // Social settings
  allowComments: true,
  allowMentions: true,
  allowFollowers: true,
  showOnLeaderboard: true,

  // Data usage
  allowAnonymousDataUsage: true,
  allowPersonalizedContent: true,
}

// Get user's privacy settings
export async function getUserPrivacySettings(userId: string): Promise<PrivacySettings> {
  // In a real app, this would fetch from an API or database
  // For now, return default settings
  return defaultPrivacySettings
}

// Save user's privacy settings
export async function saveUserPrivacySettings(userId: string, settings: PrivacySettings): Promise<boolean> {
  // In a real app, this would save to an API or database
  console.log("Saving privacy settings for user", userId, settings)
  return true
}

// Check if a user can view another user's content based on privacy settings
export function canViewContent(
  contentType: keyof Pick<
    PrivacySettings,
    "profileVisibility" | "tradingStatsVisibility" | "accountVisibility" | "journalVisibility"
  >,
  settings: PrivacySettings,
  viewerType: "public" | "trader" | "self",
): boolean {
  const visibilityLevel = settings[contentType]

  if (viewerType === "self") return true
  if (viewerType === "trader" && (visibilityLevel === "traders" || visibilityLevel === "public")) return true
  if (viewerType === "public" && visibilityLevel === "public") return true

  return false
}

// Check if a specific field should be displayed based on privacy settings
export function shouldDisplayField(
  field: keyof Omit<
    PrivacySettings,
    | "profileVisibility"
    | "tradingStatsVisibility"
    | "accountVisibility"
    | "journalVisibility"
    | "allowComments"
    | "allowMentions"
    | "allowFollowers"
    | "showOnLeaderboard"
    | "allowAnonymousDataUsage"
    | "allowPersonalizedContent"
  >,
  settings: PrivacySettings,
): boolean {
  return settings[field]
}
